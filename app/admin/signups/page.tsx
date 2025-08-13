"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, Mail, Calendar, Globe, AlertCircle, CheckCircle, Download, Users } from "lucide-react"

type Signup = {
  id: number
  email: string
  source: string | null
  ua: string | null
  ip: string | null
  created_at: string
}

type SignupStats = {
  total_signups: number
  unique_emails: number
  source: string | null
  signup_date: string
}

export default function SignupsAdmin() {
  const [signups, setSignups] = useState<Signup[]>([])
  const [stats, setStats] = useState<SignupStats[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [testEmail, setTestEmail] = useState("")
  const [testLoading, setTestLoading] = useState(false)
  const [testResult, setTestResult] = useState("")

  const fetchSignups = async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/admin/signups")
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || errorData.error || "Failed to fetch signups")
      }

      const data = await response.json()
      setSignups(data.signups || [])
      setStats(data.stats || [])
    } catch (err: any) {
      setError(err.message || "Failed to load signups")
    } finally {
      setLoading(false)
    }
  }

  const testEmailCapture = async () => {
    if (!testEmail) return

    setTestLoading(true)
    setTestResult("")

    try {
      const response = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: testEmail, source: "admin-test" }),
      })

      const data = await response.json()

      if (response.ok) {
        setTestResult(`✅ Success! ${data.deduped ? "Email was already in database" : "New email added"}`)
        setTestEmail("")
        fetchSignups() // Refresh the list
      } else {
        setTestResult(`❌ Error: ${data.error}`)
      }
    } catch (err: any) {
      setTestResult(`❌ Error: ${err.message}`)
    } finally {
      setTestLoading(false)
    }
  }

  const exportCSV = () => {
    const csvContent = [
      ["ID", "Email", "Source", "Created At", "Browser", "IP"],
      ...signups.map((signup) => [
        signup.id,
        signup.email,
        signup.source || "",
        signup.created_at,
        getBrowserFromUA(signup.ua),
        signup.ip || "",
      ]),
    ]
      .map((row) => row.map((field) => `"${field}"`).join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `symbi-signups-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  useEffect(() => {
    fetchSignups()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const getBrowserFromUA = (ua: string | null) => {
    if (!ua) return "Unknown"
    if (ua.includes("Chrome")) return "Chrome"
    if (ua.includes("Firefox")) return "Firefox"
    if (ua.includes("Safari")) return "Safari"
    if (ua.includes("Edge")) return "Edge"
    return "Other"
  }

  const totalSignups = signups.length
  const uniqueEmails = new Set(signups.map((s) => s.email)).size
  const uniqueSources = new Set(signups.map((s) => s.source)).size

  const recentSignups = signups.filter((s) => {
    const signupDate = new Date(s.created_at)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    return signupDate > oneDayAgo
  }).length

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#e0e0e0] p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">SYMBI Email Dashboard</h1>
            <p className="text-[#b0b0b0]">Monitor early access requests and community growth</p>
          </div>
          <div className="flex gap-2">
            {signups.length > 0 && (
              <Button
                onClick={exportCSV}
                variant="outline"
                className="border-[#333] text-[#e0e0e0] hover:bg-[#1a1a1a] bg-transparent"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            )}
            <Button onClick={fetchSignups} disabled={loading} className="bg-[#e0e0e0] text-[#0f0f0f] hover:bg-white">
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Test Email Capture */}
        <Card className="bg-[#1a1a1a] border-[#333]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Test Email Capture
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="test@example.com"
                className="flex-1 px-3 py-2 bg-[#0f0f0f] border border-[#333] rounded text-[#e0e0e0] placeholder:text-[#666] focus:border-[#555] focus:outline-none"
                onKeyPress={(e) => e.key === "Enter" && testEmailCapture()}
              />
              <Button
                onClick={testEmailCapture}
                disabled={testLoading || !testEmail}
                className="bg-[#e0e0e0] text-[#0f0f0f] hover:bg-white"
              >
                {testLoading ? "Testing..." : "Test Capture"}
              </Button>
            </div>
            {testResult && (
              <div className="text-sm p-3 rounded bg-[#0f0f0f] border border-[#333] font-mono">{testResult}</div>
            )}
          </CardContent>
        </Card>

        {error && (
          <Card className="bg-red-900/20 border-red-500/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle className="h-4 w-4" />
                <p className="font-semibold">Connection Error</p>
              </div>
              <p className="text-sm text-red-300 mt-2">{error}</p>
              <div className="mt-3 text-xs text-red-200">
                <p>Troubleshooting steps:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Check that SUPABASE_URL and SUPABASE_ANON_KEY are set in environment variables</li>
                  <li>Verify the notify_signups table exists in your Supabase database</li>
                  <li>Ensure your Supabase project is active and accessible</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-[#1a1a1a] border-[#333]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#b0b0b0] flex items-center gap-2">
                <Users className="h-4 w-4" />
                Total Signups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#e0e0e0]">{totalSignups}</div>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#333]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#b0b0b0] flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Unique Emails
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#e0e0e0]">{uniqueEmails}</div>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#333]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#b0b0b0] flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#e0e0e0]">{uniqueSources}</div>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#333]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#b0b0b0] flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Last 24h
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#e0e0e0]">{recentSignups}</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Signups */}
        <Card className="bg-[#1a1a1a] border-[#333]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Recent Signups ({signups.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-[#333] rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-[#333] rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : signups.length === 0 ? (
              <div className="text-center py-8 text-[#b0b0b0]">
                <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No signups yet</p>
                <p className="text-sm">
                  Test the email capture using the form above or visit your site and click "Request Early Access"
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {signups.map((signup) => (
                  <div
                    key={signup.id}
                    className="border border-[#333] rounded-lg p-4 hover:border-[#555] transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-[#b0b0b0]" />
                          <span className="font-mono text-[#e0e0e0] text-sm">{signup.email}</span>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-[#b0b0b0] flex-wrap">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(signup.created_at)}
                          </div>

                          {signup.source && (
                            <Badge variant="outline" className="text-xs border-[#555] text-[#b0b0b0]">
                              {signup.source}
                            </Badge>
                          )}

                          {signup.ua && (
                            <div className="flex items-center gap-1">
                              <Globe className="h-3 w-3" />
                              {getBrowserFromUA(signup.ua)}
                            </div>
                          )}

                          {signup.ip && <span className="font-mono text-xs text-[#666]">{signup.ip}</span>}
                        </div>
                      </div>

                      <div className="text-xs text-[#666] font-mono">#{signup.id}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Setup Status */}
        <Card className="bg-[#1a1a1a] border-[#333]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-[#e0e0e0]">Database Connection</h4>
                <div className="flex items-center gap-2">
                  {error ? (
                    <>
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-red-400 text-sm">Connection Failed</span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-400 text-sm">Connected</span>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-[#e0e0e0]">Email Capture API</h4>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-400 text-sm">Active</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-[#e0e0e0]">How Users Sign Up:</h4>
              <ul className="text-sm text-[#b0b0b0] space-y-1 ml-4">
                <li>• Click "Request Early Access" on any page</li>
                <li>• Submit email through the modal form</li>
                <li>• Automatic deduplication prevents duplicates</li>
                <li>• Source page and metadata are tracked</li>
                <li>• Emails appear here and in your Supabase dashboard</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
