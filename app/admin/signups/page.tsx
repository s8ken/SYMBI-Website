"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Download,
  Mail,
  Users,
  TrendingUp,
  Calendar,
  RefreshCw,
  TestTube,
  Shield,
  Database,
  AlertCircle,
} from "lucide-react"

interface Signup {
  id: number
  email: string
  source: string
  created_at: string
  ua?: string
  ip?: string
  metadata?: any
}

interface SignupStats {
  total: number
  today: number
  thisWeek: number
  thisMonth: number
  sources: Record<string, number>
}

export default function AdminSignups() {
  const [signups, setSignups] = useState<Signup[]>([])
  const [stats, setStats] = useState<SignupStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [testEmail, setTestEmail] = useState("")
  const [testLoading, setTestLoading] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())

  const fetchSignups = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/signups")
      if (response.ok) {
        const data = await response.json()
        setSignups(data.signups || [])
        setStats(data.stats || null)
      }
    } catch (error) {
      console.error("Failed to fetch signups:", error)
    } finally {
      setLoading(false)
      setLastRefresh(new Date())
    }
  }

  const handleTestSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!testEmail.trim()) return

    setTestLoading(true)
    try {
      const response = await fetch("/api/notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: testEmail,
          source: "admin_test",
        }),
      })

      if (response.ok) {
        setTestEmail("")
        // Refresh the data
        await fetchSignups()
      } else {
        const error = await response.json()
        alert(`Error: ${error.error || "Failed to submit test email"}`)
      }
    } catch (error) {
      console.error("Test submission failed:", error)
      alert("Test submission failed")
    } finally {
      setTestLoading(false)
    }
  }

  const exportCSV = () => {
    if (!signups.length) return

    const headers = ["ID", "Email", "Source", "Created At", "User Agent", "IP", "Metadata"]
    const csvContent = [
      headers.join(","),
      ...signups.map((signup) =>
        [
          signup.id,
          `"${signup.email}"`,
          `"${signup.source}"`,
          `"${signup.created_at}"`,
          `"${signup.ua || ""}"`,
          `"${signup.ip || ""}"`,
          `"${JSON.stringify(signup.metadata || {})}"`,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `symbi-signups-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  useEffect(() => {
    fetchSignups()
  }, [])

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Email Signups Dashboard</h1>
                <p className="text-gray-600">Monitor and manage SYMBI early access signups</p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="border-green-500 text-green-700">
                  <Shield className="mr-1 h-3 w-3" />
                  RLS Protected
                </Badge>
                <Button onClick={fetchSignups} disabled={loading} variant="outline">
                  <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </div>
            </div>

            <p className="text-sm text-gray-500">Last updated: {lastRefresh.toLocaleString()}</p>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Signups</p>
                        <p className="text-2xl font-bold">{stats.total}</p>
                      </div>
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Today</p>
                        <p className="text-2xl font-bold">{stats.today}</p>
                      </div>
                      <Calendar className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">This Week</p>
                        <p className="text-2xl font-bold">{stats.thisWeek}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">This Month</p>
                        <p className="text-2xl font-bold">{stats.thisMonth}</p>
                      </div>
                      <Mail className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              {/* Test Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TestTube className="mr-2 h-5 w-5 text-blue-600" />
                    Test Email Capture
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleTestSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="testEmail">Test Email Address</Label>
                      <Input
                        id="testEmail"
                        type="email"
                        value={testEmail}
                        onChange={(e) => setTestEmail(e.target.value)}
                        placeholder="test@example.com"
                        required
                      />
                    </div>
                    <Button type="submit" disabled={testLoading} className="w-full">
                      {testLoading ? (
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <TestTube className="mr-2 h-4 w-4" />
                      )}
                      Submit Test Email
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Source Breakdown */}
              {stats && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
                      Signup Sources
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(stats.sources).map(([source, count]) => (
                        <div key={source} className="flex items-center justify-between">
                          <span className="text-sm font-medium capitalize">{source.replace("_", " ")}</span>
                          <Badge variant="outline">{count}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Signups Table */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Database className="mr-2 h-5 w-5 text-blue-600" />
                    Recent Signups ({signups.length})
                  </CardTitle>
                  <Button onClick={exportCSV} disabled={!signups.length} variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
                    <span className="ml-2 text-gray-600">Loading signups...</span>
                  </div>
                ) : signups.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No signups found</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Test the email capture system above or check your database connection
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Email</th>
                          <th className="text-left py-3 px-4">Source</th>
                          <th className="text-left py-3 px-4">Date</th>
                          <th className="text-left py-3 px-4">Browser</th>
                        </tr>
                      </thead>
                      <tbody>
                        {signups.map((signup) => (
                          <tr key={signup.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium">{signup.email}</td>
                            <td className="py-3 px-4">
                              <Badge variant="outline" className="text-xs">
                                {signup.source}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              {new Date(signup.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4 text-gray-500 text-xs max-w-xs truncate">
                              {signup.ua ? signup.ua.split(" ")[0] : "Unknown"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Stephen Aitken & SYMBI. All rights reserved. Licensed CC BY-NC-ND 4.0.
          </p>
        </div>
      </footer>
    </div>
  )
}
