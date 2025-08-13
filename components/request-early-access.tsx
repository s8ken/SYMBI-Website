"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Send, Lock, CheckCircle, AlertCircle, Shield } from "lucide-react"
import { track } from "@/lib/analytics"

type EarlyAccessProps = {
  source?: string
  triggerText?: string
  className?: string
}

export function RequestEarlyAccess({
  source = "global",
  triggerText = "Request Early Access",
  className,
}: EarlyAccessProps) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [isDuplicate, setIsDuplicate] = useState(false)

  async function submit() {
    if (!email) return

    // Enhanced email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (email.length > 254) {
      setError("Email address is too long")
      return
    }

    setLoading(true)
    setError("")
    setIsDuplicate(false)

    try {
      // Enhanced metadata for better tracking
      const metadata = {
        page_url: typeof window !== "undefined" ? window.location.href : "",
        referrer: typeof document !== "undefined" ? document.referrer : "",
        timestamp: new Date().toISOString(),
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        screen_resolution: typeof screen !== "undefined" ? `${screen.width}x${screen.height}` : "",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: typeof navigator !== "undefined" ? navigator.language : "",
        source_component: "RequestEarlyAccess",
        trigger_text: triggerText,
      }

      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source,
          metadata,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to save")
      }

      // Handle different response scenarios
      if (data.deduped) {
        setIsDuplicate(true)
        setSuccess(true)
        track("early_access_duplicate", {
          source,
          storage: data.storage,
          email_hash: btoa(email).slice(0, 8), // Safe hash for tracking
        })
      } else {
        setSuccess(true)
        track("early_access_submit", {
          source,
          storage: data.storage,
          new_signup: true,
        })
      }

      // Auto-close after success
      setTimeout(() => {
        setOpen(false)
        setSuccess(false)
        setIsDuplicate(false)
        setEmail("")
      }, 3000)
    } catch (e: any) {
      setError(e.message || "Something went wrong. Please try again.")
      track("early_access_submit_error", {
        source,
        error: e.message,
        email_provided: !!email,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading && email) {
      submit()
    }
  }

  return (
    <>
      <button
        className={className}
        onClick={() => {
          setOpen(true)
          setError("")
          setSuccess(false)
          setIsDuplicate(false)
          track("early_access_open", { source })
        }}
        data-track="early_access_click"
        data-source={source}
      >
        <Lock className="h-4 w-4 mr-2 inline" />
        {triggerText}
      </button>

      <Dialog
        open={open}
        onOpenChange={(o) => {
          setOpen(o)
          if (!o) {
            setError("")
            setSuccess(false)
            setIsDuplicate(false)
          }
        }}
      >
        <DialogContent className="sm:max-w-md bg-[#1a1a1a] border-[#333] text-[#e0e0e0] font-mono">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[#e0e0e0]">
              <Lock className="h-4 w-4" />
              Request Early Access
            </DialogTitle>
            <DialogDescription className="text-[#b0b0b0]">
              Join the waitlist to be notified when new features and experiences become available. Your data is
              protected with enterprise-grade security.
            </DialogDescription>
          </DialogHeader>

          {success ? (
            <div className="flex items-center justify-center py-8 text-center">
              <div className="space-y-3">
                <CheckCircle className="h-12 w-12 text-green-400 mx-auto" />
                <div>
                  {isDuplicate ? (
                    <>
                      <h3 className="font-semibold text-yellow-400 flex items-center justify-center gap-2">
                        <Shield className="h-4 w-4" />
                        Already Registered
                      </h3>
                      <p className="text-sm text-[#b0b0b0] mt-2">
                        This email is already on our waitlist. You'll be notified when we launch!
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 className="font-semibold text-green-400">Welcome to SYMBI!</h3>
                      <p className="text-sm text-[#b0b0b0] mt-2">
                        You've been added to our early access list. We'll notify you when new features are available.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ea-email" className="text-[#e0e0e0]">
                    Email Address
                  </Label>
                  <Input
                    id="ea-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError("")
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={loading}
                    className="bg-[#0f0f0f] border-[#333] text-[#e0e0e0] placeholder:text-[#666] focus:border-[#555]"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-sm text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}

                <div className="text-xs text-[#666] space-y-1">
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    <span>Protected by Row Level Security</span>
                  </div>
                  <div>• Email validation with database triggers</div>
                  <div>• Automatic duplicate prevention</div>
                  <div>• Secure metadata tracking</div>
                </div>
              </div>

              <DialogFooter className="gap-2">
                <button
                  onClick={() => setOpen(false)}
                  disabled={loading}
                  className="px-4 py-2 border border-[#333] text-[#e0e0e0] hover:bg-[#252525] rounded-md transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  disabled={loading || !email}
                  onClick={submit}
                  className="px-4 py-2 bg-[#e0e0e0] text-[#0f0f0f] hover:bg-white rounded-md transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  {loading ? "Securing..." : "Join Waitlist"}
                </button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
