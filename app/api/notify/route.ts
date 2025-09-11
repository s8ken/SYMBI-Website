import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { rateLimit, createRateLimitResponse } from "@/lib/rate-limit"
import { notifyInputSchema, sanitizeEmail, validateRequestHeaders, isValidOrigin } from "@/lib/validation"
import { handleApiError, createSuccessResponse, generateRequestId, SymbiError, ErrorCodes } from "@/lib/error-handling"
import { fetchWithTimeout } from "@/lib/utils"

type NotifyBody = {
  email?: string
  source?: string
}

function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: NextRequest) {
  const requestId = generateRequestId()
  
  try {
    // Validate request headers
    const headerValidation = validateRequestHeaders(request.headers)
    if (!headerValidation.valid) {
      throw new SymbiError(ErrorCodes.VALIDATION_ERROR, headerValidation.error!, 400)
    }

    // CSRF/basic origin check for cross-site POSTs (strict in production)
    const origin = request.headers.get('origin')
    const allowed = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean)
    if (process.env.APP_ORIGIN) allowed.push(process.env.APP_ORIGIN)
    if (process.env.NODE_ENV === 'production') {
      if (!isValidOrigin(origin, allowed.length ? allowed : [])) {
        throw new SymbiError(ErrorCodes.AUTHORIZATION_ERROR, 'Origin not allowed', 403)
      }
    }

    // Rate limiting - stricter for email collection
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const rateLimitResult = await rateLimit(request, clientIP, {
      requests: 3,
      window: 300 // 5 minutes
    })
    
    if (!rateLimitResult.success) {
      return createRateLimitResponse(rateLimitResult)
    }

    // Parse and validate input
    const body = await request.json()
    const validation = notifyInputSchema.safeParse(body)
    
    if (!validation.success) {
      throw new SymbiError(
        ErrorCodes.VALIDATION_ERROR,
        'Invalid input format',
        400,
        validation.error.issues
      )
    }

    const { email, source } = validation.data
    const sanitizedEmail = sanitizeEmail(email)

    const ua = request.headers.get("user-agent") || ""
    const ip =
      request.headers.get("x-real-ip") || (request.headers.get("x-forwarded-for") || "").split(",")[0]?.trim() || ""
    const now = new Date().toISOString()
    const key = `notify:${email.toLowerCase()}`
    let deduped = false

    // Upstash KV (optional)
    const kvUrl = process.env.KV_REST_API_URL
    const kvToken = process.env.KV_REST_API_TOKEN
    let upstashOk = false

    try {
      if (kvUrl && kvToken) {
        // check if exists
        const getRes = await fetchWithTimeout(`${kvUrl}/get/${encodeURIComponent(key)}`, {
          headers: { Authorization: `Bearer ${kvToken}` },
          cache: "no-store",
          timeoutMs: 5000,
        })
        if (getRes.ok) {
          const getJson = await getRes.json()
          if (getJson && getJson.result) deduped = true
        }
        if (!deduped) {
          const value = JSON.stringify({ email, source, ua, ip, created_at: now })
          const setRes = await fetchWithTimeout(`${kvUrl}/set`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${kvToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ key, value }),
            timeoutMs: 5000,
          })
          upstashOk = setRes.ok
        } else {
          upstashOk = true
        }
      }
    } catch {
      // ignore upstash errors; proceed
    }

    // Supabase insert (optional)
    let supabaseOk = false
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY

    try {
      if (supabaseUrl && supabaseKey) {
        const { createClient } = await import("@supabase/supabase-js")
        const supabase = createClient(supabaseUrl, supabaseKey, {
          auth: { persistSession: false, autoRefreshToken: false },
        })
        const { error } = await supabase.from("notify_signups").insert({
          email,
          source: source || null,
          ua,
          ip,
          created_at: now,
        })
        if (!error) supabaseOk = true
      }
    } catch {
      // ignore supabase errors
    }

    return createSuccessResponse({ 
      message: "Email registered successfully",
      requestId,
      data: {
        deduped,
        storage: { upstash: upstashOk, supabase: supabaseOk },
        at: now
      }
    })
  } catch (error) {
    return handleApiError(error, requestId)
  }
}
