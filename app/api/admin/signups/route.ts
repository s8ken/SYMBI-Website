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
          setup_guide: {
            step1: "Go to your Supabase Dashboard > Settings > API",
            step2: "Copy the 'service_role' key (not the anon key)",
            step3: "Add SUPABASE_SERVICE_ROLE_KEY to your Vercel environment variables",
            step4: "Redeploy your application",
          },
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
          troubleshooting: {
            check1: "Verify the notify_signups table exists in your Supabase database",
            check2: "Ensure RLS policies include 'Service role full access' policy",
            check3: "Confirm you're using the SERVICE_ROLE_KEY, not ANON_KEY",
            check4: "Check that your Supabase project is active and accessible",
          },
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
          code: signupsError.code,
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
    const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]

    const todaySignups =
      signups?.filter((s) => new Date(s.created_at).toISOString().split("T")[0] === today).length || 0

    const yesterdaySignups =
      signups?.filter((s) => new Date(s.created_at).toISOString().split("T")[0] === yesterday).length || 0

    const lastWeekSignups =
      signups?.filter((s) => new Date(s.created_at).toISOString().split("T")[0] >= lastWeek).length || 0

    const authenticatedUsers = signups?.filter((s) => s.user_id).length || 0
    const anonymousSignups = signups?.filter((s) => !s.user_id).length || 0

    // Source breakdown
    const sourceBreakdown =
      signups?.reduce((acc: Record<string, number>, signup) => {
        const source = signup.source || "unknown"
        acc[source] = (acc[source] || 0) + 1
        return acc
      }, {}) || {}

    // Browser breakdown
    const browserBreakdown =
      signups?.reduce((acc: Record<string, number>, signup) => {
        const ua = signup.ua || ""
        let browser = "Unknown"
        if (ua.includes("Chrome")) browser = "Chrome"
        else if (ua.includes("Firefox")) browser = "Firefox"
        else if (ua.includes("Safari")) browser = "Safari"
        else if (ua.includes("Edge")) browser = "Edge"

        acc[browser] = (acc[browser] || 0) + 1
        return acc
      }, {}) || {}

    return NextResponse.json({
      signups: signups || [],
      stats: finalStats,
      metrics: {
        total_count: count || 0,
        today_signups: todaySignups,
        yesterday_signups: yesterdaySignups,
        last_week_signups: lastWeekSignups,
        unique_sources: Object.keys(sourceBreakdown).length,
        authenticated_users: authenticatedUsers,
        anonymous_signups: anonymousSignups,
        growth_rate:
          yesterdaySignups > 0 ? (((todaySignups - yesterdaySignups) / yesterdaySignups) * 100).toFixed(1) : "N/A",
      },
      breakdowns: {
        sources: sourceBreakdown,
        browsers: browserBreakdown,
      },
      success: true,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Admin signups API error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error.message || "Unknown error occurred",
        suggestion: "Check server logs for more information",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
