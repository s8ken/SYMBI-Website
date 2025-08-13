// Script to verify Supabase table structure
// This helps debug any table setup issues

async function checkSupabaseTable() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase environment variables")
    console.log("Required: SUPABASE_URL, SUPABASE_ANON_KEY")
    return
  }

  try {
    const { createClient } = await import("@supabase/supabase-js")
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Check if table exists and get structure
    const { data: tableInfo, error: tableError } = await supabase.from("notify_signups").select("*").limit(1)

    if (tableError) {
      console.error("Table check failed:", tableError.message)
      return
    }

    console.log("✅ Table exists and is accessible")

    // Get recent signups
    const { data: signups, error: signupsError } = await supabase
      .from("notify_signups")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5)

    if (signupsError) {
      console.error("Failed to fetch signups:", signupsError.message)
      return
    }

    console.log(`📊 Found ${signups?.length || 0} recent signups`)

    if (signups && signups.length > 0) {
      console.log("Recent signups:")
      signups.forEach((signup, index) => {
        console.log(`${index + 1}. ${signup.email} (${signup.source}) - ${signup.created_at}`)
      })
    }
  } catch (error: any) {
    console.error("Script error:", error.message)
  }
}

// Run the check
checkSupabaseTable()
