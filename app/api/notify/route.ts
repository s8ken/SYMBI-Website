import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

type NotifyBody = {
  email?: string
  source?: string
  metadata?: Record<string, any>
}

function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  try {
    const { email, source, metadata = {} }: NotifyBody = await request.json()

    if (!email || !validEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    const ua = request.headers.get("user-agent") || ""
    const ip =
      request.headers.get("x-real-ip") || (request.headers.get("x-forwarded-for") || "").split(",")[0]?.trim() || ""

    const now = new Date().toISOString()

    // Enhanced metadata
    const enhancedMetadata = {
      ...metadata,
      referral: "symbi_website",
      timestamp: now,
      user_agent: ua,
      ip_address: ip,
      source_page: source || "unknown",
    }

    // Try Supabase first (primary storage)
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
    let supabaseResult = { success: false, error: null, deduped: false }

    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey, {
          auth: { persistSession: false, autoRefreshToken: false },
        })

        // Use the log_signup function for better error handling
        const { data, error } = await supabase.rpc("log_signup", {
          p_email: email,
          p_source: source || "global",
          p_ua: ua,
          p_ip: ip,
          p_metadata: enhancedMetadata,
        })

        if (error) {
          // Check if it's a duplicate email error
          if (error.message?.includes("already registered")) {
            supabaseResult = { success: true, error: null, deduped: true }
          } else {
            console.error("Supabase RPC error:", error)
            supabaseResult = { success: false, error: error.message, deduped: false }
          }
        } else {
          supabaseResult = { success: true, error: null, deduped: false }
        }
      } catch (err: any) {
        console.error("Supabase connection error:", err)
        supabaseResult = { success: false, error: err.message, deduped: false }
      }
    }

    // Fallback to Upstash KV if Supabase fails
    let upstashResult = { success: false, error: null }
    const kvUrl = process.env.KV_REST_API_URL
    const kvToken = process.env.KV_REST_API_TOKEN

    if (!supabaseResult.success && kvUrl && kvToken) {
      try {
        const key = `notify:${email.toLowerCase()}`
        const value = JSON.stringify({
          email,
          source,
          ua,
          ip,
          created_at: now,
          metadata: enhancedMetadata,
        })

        // Check if exists
        const getRes = await fetch(`${kvUrl}/get/${encodeURIComponent(key)}`, {
          headers: { Authorization: `Bearer ${kvToken}` },
          cache: "no-store",
        })

        let deduped = false
        if (getRes.ok) {
          const getJson = await getRes.json()
          if (getJson && getJson.result) deduped = true
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
          upstashResult = { success: setRes.ok, error: setRes.ok ? null : "Failed to store in KV" }
        } else {
          upstashResult = { success: true, error: null }
        }
      } catch (err: any) {
        console.error("Upstash KV error:", err)
        upstashResult = { success: false, error: err.message }
      }
    }

    // Determine overall success
    const overallSuccess = supabaseResult.success || upstashResult.success
    const isDeduped = supabaseResult.deduped

    return NextResponse.json({
      ok: overallSuccess,
      deduped: isDeduped,
      storage: {
        supabase: supabaseResult.success,
        upstash: upstashResult.success,
      },
      errors: {
        supabase: supabaseResult.error,
        upstash: upstashResult.error,
      },
      at: now,
    })
  } catch (err: any) {
    console.error("Notify API error:", err)
    return NextResponse.json(
      {
        error: err?.message || "Bad Request",
        ok: false,
      },
      { status: 400 },
    )
  }
}
