import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        {
          error: "Missing Supabase configuration",
          details: "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables are required for admin access",
          suggestion: "Make sure you're using the SERVICE_ROLE_KEY (not ANON_KEY) for admin operations",
        },
        { status: 500 },
      )
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })

    // Test connection and get total count
    const { count, error: countError } = await supabase
      .from("notify_signups")
      .select("*", { count: "exact", head: true })

    if (countError) {
      console.error("Supabase count error:", countError)
      return NextResponse.json(
        {
          error: "Database access failed",
          details: countError.message,
          suggestion: "Ensure the notify_signups table exists and RLS policies allow service_role access",
        },
        { status: 500 },
      )
    }

    // Fetch recent signups with all fields
    const { data: signups, error: signupsError } = await supabase
      .from("notify_signups")
      .select(`
        id,
        email,
        source,
        user_id,
        ua,
        ip,
        created_at,
        metadata
      `)
      .order("created_at", { ascending: false })
      .limit(100)

    if (signupsError) {
      console.error("Supabase signups error:", signupsError)
      return NextResponse.json(
        {
          error: "Failed to fetch signups",
          details: signupsError.message,
        },
        { status: 500 },
      )
    }

    // Process stats from the fetched data
    const stats =
      signups?.reduce((acc: any[], signup) => {
        const date = new Date(signup.created_at).toISOString().split("T")[0]
        const source = signup.source || "unknown"
        const key = `${date}-${source}`

        const existing = acc.find((s) => s.key === key)

        if (existing) {
          existing.total_signups += 1
          existing.emails.add(signup.email)
        } else {
          acc.push({
            key,
            total_signups: 1,
            emails: new Set([signup.email]),
            source: signup.source,
            signup_date: date,
          })
        }

        return acc
      }, []) || []

    // Convert Sets to counts for JSON serialization
    const finalStats = stats.map((stat) => ({
      total_signups: stat.total_signups,
      unique_emails: stat.emails.size,
      source: stat.source,
      signup_date: stat.signup_date,
    }))

    // Calculate additional metrics
    const today = new Date().toISOString().split("T")[0]
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split("T")[0]

    const todaySignups =
      signups?.filter((s) => new Date(s.created_at).toISOString().split("T")[0] === today).length || 0

    const yesterdaySignups =
      signups?.filter((s) => new Date(s.created_at).toISOString().split("T")[0] === yesterday).length || 0

    return NextResponse.json({
      signups: signups || [],
      stats: finalStats,
      metrics: {
        total_count: count || 0,
        today_signups: todaySignups,
        yesterday_signups: yesterdaySignups,
        unique_sources: new Set(signups?.map((s) => s.source)).size,
        authenticated_users: signups?.filter((s) => s.user_id).length || 0,
        anonymous_signups: signups?.filter((s) => !s.user_id).length || 0,
      },
      success: true,
    })
  } catch (error: any) {
    console.error("Admin signups API error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error.message || "Unknown error occurred",
        suggestion: "Check server logs for more information",
      },
      { status: 500 },
    )
  }
}
