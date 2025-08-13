"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  RefreshCw,
  Mail,
  Calendar,
  Globe,
  AlertCircle,
  CheckCircle,
  Download,
  Users,
  Shield,
  Database,
  Eye,
  User,
} from "lucide-react"

type Signup = {
  id: number
  email: string
  source: string | null
  user_id: string | null
  ua: string | null
  ip: string | null
  created_at: string
  metadata: Record<string, any> | null
}

type SignupStats = {
  total_signups: number
  unique_emails: number
  source: string | null
  signup_date: string
}

type Metrics = {
  total_count: number
  today_signups: number
  yesterday_signups: number
  unique_sources: number
  authenticated_users: number
  anonymous_signups: number
}

export default function SignupsAdmin() {
  const [signups, setSignups] = useState<Signup[]>([])
  const [stats, setStats] = useState<SignupStats[]>([])
  const [metrics, setMetrics] = useState<Metrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [testEmail, setTestEmail] = useState("")
  const [testLoading, setTestLoading] = useState(false)
  const [testResult, setTestResult] = useState("")
  const [selectedSignup, setSelectedSignup] = useState<Signup | null>(null)

  const fetchSignups = async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/admin/signups")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.details || data.error || "Failed to fetch signups")
      }

      setSignups(data.signups || [])
      setStats(data.stats || [])
      setMetrics(data.metrics || null)
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
        body: JSON.stringify({
          email: testEmail,
          source: "admin-test",
          metadata: {
            test_mode: true,
            admin_initiated: true,
          },
        }),
      })

      const data = await response.json()

      if (response.ok) {
        if (data.deduped) {
          setTestResult(`⚠️ Email already exists in database`)
        } else {
          setTestResult(`✅ Success! New email added to database`)
        }
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
      ["ID", "Email", "Source", "User ID", "Created At", "Browser", "IP", "Metadata"],
      ...signups.map((signup) => [
        signup.id,
        signup.email,
        signup.source || "",
        signup.user_id || "anonymous",
        signup.created_at,
        getBrowserFromUA(signup.ua),
        signup.ip || "",
        JSON.stringify(signup.metadata || {}),
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

  const getGrowthTrend = () => {
    if (!metrics) return { trend: "neutral", text: "No data" }

    if (metrics.today_signups > metrics.yesterday_signups) {
      return { trend: "up", text: `+${metrics.today_signups - metrics.yesterday_signups} vs yesterday` }
    } else if (metrics.today_signups < metrics.yesterday_signups) {
      return { trend: "down", text: `${metrics.today_signups - metrics.yesterday_signups} vs yesterday` }
    }
    return { trend: "neutral", text: "Same as yesterday" }
  }

  const growth = getGrowthTrend()

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#e0e0e0] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
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
                  <li>Check that SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set</li>
                  <li>Verify the notify_signups table exists with proper RLS policies</li>
                  <li>Ensure your Supabase project is active and accessible</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-[#1a1a1a] border-[#333]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#b0b0b0] flex items-center gap-2">
                <Users className="h-4 w-4" />
                Total Signups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#e0e0e0]">{metrics?.total_count || 0}</div>
              <div className="text-xs text-[#666] mt-1">{growth.text}</div>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#333]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#b0b0b0] flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#e0e0e0]">{metrics?.today_signups || 0}</div>
              <div className="text-xs text-[#666] mt-1">New signups today</div>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#333]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#b0b0b0] flex items-center gap-2">
                <User className="h-4 w-4" />
                Authenticated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#e0e0e0]">{metrics?.authenticated_users || 0}</div>
              <div className="text-xs text-[#666] mt-1">With user accounts</div>
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
              <div className="text-2xl font-bold text-[#e0e0e0]">{metrics?.unique_sources || 0}</div>
              <div className="text-xs text-[#666] mt-1">Different sources</div>
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
                    className="border border-[#333] rounded-lg p-4 hover:border-[#555] transition-colors cursor-pointer"
                    onClick={() => setSelectedSignup(selectedSignup?.id === signup.id ? null : signup)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-[#b0b0b0]" />
                          <span className="font-mono text-[#e0e0e0] text-sm">{signup.email}</span>
                          {signup.user_id && (
                            <Badge variant="outline" className="text-xs border-green-500/50 text-green-400">
                              <Shield className="h-3 w-3 mr-1" />
                              Auth
                            </Badge>
                          )}
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

                          {signup.metadata && Object.keys(signup.metadata).length > 0 && (
                            <Badge variant="outline" className="text-xs border-blue-500/50 text-blue-400">
                              <Database className="h-3 w-3 mr-1" />
                              Metadata
                            </Badge>
                          )}
                        </div>

                        {/* Expanded Details */}
                        {selectedSignup?.id === signup.id && (
                          <div className="mt-4 p-3 bg-[#0f0f0f] rounded border border-[#333] space-y-2">
                            {signup.user_id && (
                              <div className="text-xs">
                                <span className="text-[#b0b0b0]">User ID:</span>
                                <span className="font-mono ml-2 text-[#e0e0e0]">{signup.user_id}</span>
                              </div>
                            )}

                            {signup.metadata && Object.keys(signup.metadata).length > 0 && (
                              <div className="text-xs">
                                <span className="text-[#b0b0b0]">Metadata:</span>
                                <pre className="mt-1 text-[#e0e0e0] bg-[#1a1a1a] p-2 rounded text-xs overflow-x-auto">
                                  {JSON.stringify(signup.metadata, null, 2)}
                                </pre>
                              </div>
                            )}

                            {signup.ua && (
                              <div className="text-xs">
                                <span className="text-[#b0b0b0]">User Agent:</span>
                                <div className="font-mono ml-2 text-[#e0e0e0] break-all">{signup.ua}</div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="text-xs text-[#666] font-mono">#{signup.id}</div>
                        <Eye className="h-3 w-3 text-[#666]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Enhanced System Status */}
        <Card className="bg-[#1a1a1a] border-[#333]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              Enhanced System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      <span className="text-green-400 text-sm">Connected with RLS</span>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-[#e0e0e0]">Email Validation</h4>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-400 text-sm">Active (DB Triggers)</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-[#e0e0e0]">Security</h4>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-400 text-sm">RLS Enabled</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-[#e0e0e0]">Enhanced Features:</h4>
              <ul className="text-sm text-[#b0b0b0] space-y-1 ml-4">
                <li>• Row Level Security protects user data</li>
                <li>• Database functions handle signup validation</li>
                <li>• Email triggers prevent invalid formats</li>
                <li>• Metadata tracking for enhanced analytics</li>
                <li>• User authentication integration ready</li>
                <li>• Automatic duplicate prevention</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
