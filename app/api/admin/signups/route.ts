import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        {
          error: "Supabase configuration missing",
          details: "Make sure SUPABASE_URL and SUPABASE_ANON_KEY are set in your environment variables",
        },
        { status: 500 },
      )
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })

    // Test connection first by trying to count records
    const { count, error: countError } = await supabase
      .from("notify_signups")
      .select("*", { count: "exact", head: true })

    if (countError) {
      return NextResponse.json(
        {
          error: "Database table not found",
          details: countError.message,
          suggestion:
            "Make sure you've run the SQL script to create the notify_signups table in your Supabase dashboard",
        },
        { status: 500 },
      )
    }

    // Fetch recent signups
    const { data: signups, error: signupsError } = await supabase
      .from("notify_signups")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100)

    if (signupsError) {
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

    return NextResponse.json({
      signups: signups || [],
      stats: finalStats,
      total_count: count || 0,
      success: true,
    })
  } catch (error: any) {
    console.error("Admin signups error:", error)
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
