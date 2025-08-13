import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

type NotifyBody = {
  email?: string
  source?: string
  metadata?: Record<string, any>
}

function validEmail(email: string): boolean {
  // Enhanced email validation matching the database trigger
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

function getClientIP(request: Request): string {
  // Try multiple headers to get the real client IP
  const xRealIP = request.headers.get("x-real-ip")
  const xForwardedFor = request.headers.get("x-forwarded-for")
  const cfConnectingIP = request.headers.get("cf-connecting-ip")

  if (cfConnectingIP) return cfConnectingIP
  if (xRealIP) return xRealIP
  if (xForwardedFor) return xForwardedFor.split(",")[0].trim()

  return "unknown"
}

export async function POST(request: Request) {
  try {
    const { email, source, metadata = {} }: NotifyBody = await request.json()

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    if (!validEmail(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Extract request metadata
    const ua = request.headers.get("user-agent") || ""
    const ip = getClientIP(request)
    const now = new Date().toISOString()

    // Enhanced metadata collection
    const enhancedMetadata = {
      ...metadata,
      referral: "symbi_website",
      timestamp: now,
      user_agent: ua,
      ip_address: ip,
      source_page: source || "unknown",
      request_headers: {
        accept: request.headers.get("accept"),
        accept_language: request.headers.get("accept-language"),
        referer: request.headers.get("referer"),
      },
      system_info: {
        platform: "web",
        capture_method: "early_access_form",
        api_version: "v1",
      },
    }

    // Primary storage: Supabase with enhanced RLS and validation
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
    let supabaseResult = { success: false, error: null, deduped: false, data: null }

    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey, {
          auth: { persistSession: false, autoRefreshToken: false },
        })

        // Use the enhanced log_signup function
        const { data, error } = await supabase.rpc("log_signup", {
          p_email: email.toLowerCase().trim(),
          p_source: source || "global",
          p_ua: ua,
          p_ip: ip,
          p_metadata: enhancedMetadata,
        })

        if (error) {
          // Handle specific error cases
          if (error.message?.includes("already registered") || error.message?.includes("duplicate")) {
            supabaseResult = { success: true, error: null, deduped: true, data: null }
          } else if (error.message?.includes("Invalid email")) {
            return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
          } else {
            console.error("Supabase RPC error:", error)
            supabaseResult = { success: false, error: error.message, deduped: false, data: null }
          }
        } else {
          supabaseResult = { success: true, error: null, deduped: false, data }
        }
      } catch (err: any) {
        console.error("Supabase connection error:", err)
        supabaseResult = { success: false, error: err.message, deduped: false, data: null }
      }
    }

    // Fallback storage: Upstash KV (only if Supabase fails)
    let upstashResult = { success: false, error: null, deduped: false }
    const kvUrl = process.env.KV_REST_API_URL
    const kvToken = process.env.KV_REST_API_TOKEN

    if (!supabaseResult.success && kvUrl && kvToken) {
      try {
        const key = `notify:${email.toLowerCase().trim()}`
        const value = JSON.stringify({
          email: email.toLowerCase().trim(),
          source,
          ua,
          ip,
          created_at: now,
          metadata: enhancedMetadata,
        })

        // Check for existing entry
        const getRes = await fetch(`${kvUrl}/get/${encodeURIComponent(key)}`, {
          headers: { Authorization: `Bearer ${kvToken}` },
          cache: "no-store",
        })

        let deduped = false
        if (getRes.ok) {
          const getJson = await getRes.json()
          if (getJson && getJson.result) {
            deduped = true
            upstashResult = { success: true, error: null, deduped: true }
          }
        }

        if (!deduped) {
          const setRes = await fetch(`${kvUrl}/set`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${kvToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ key, value }),
          })

          if (setRes.ok) {
            upstashResult = { success: true, error: null, deduped: false }
          } else {
            upstashResult = { success: false, error: "Failed to store in KV", deduped: false }
          }
        }
      } catch (err: any) {
        console.error("Upstash KV error:", err)
        upstashResult = { success: false, error: err.message, deduped: false }
      }
    }

    // Determine overall success and response
    const overallSuccess = supabaseResult.success || upstashResult.success
    const isDeduped = supabaseResult.deduped || upstashResult.deduped

    if (!overallSuccess) {
      return NextResponse.json(
        {
          error: "Failed to save signup",
          details: {
            supabase: supabaseResult.error,
            upstash: upstashResult.error,
          },
          ok: false,
        },
        { status: 500 },
      )
    }

    // Success response
    return NextResponse.json({
      ok: true,
      deduped: isDeduped,
      message: isDeduped ? "Email already registered - you're on the list!" : "Successfully added to waitlist",
      storage: {
        supabase: supabaseResult.success,
        upstash: upstashResult.success,
      },
      data: supabaseResult.data,
      timestamp: now,
    })
  } catch (err: any) {
    console.error("Notify API error:", err)
    return NextResponse.json(
      {
        error: "Invalid request",
        details: err?.message || "Bad Request",
        ok: false,
        timestamp: new Date().toISOString(),
      },
      { status: 400 },
    )
  }
}
