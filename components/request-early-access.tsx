"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mail, Loader2, CheckCircle, AlertCircle } from "lucide-react"

interface RequestEarlyAccessProps {
  source?: string
  triggerText?: string
  className?: string
}

export function RequestEarlyAccess({
  source = "unknown",
  triggerText = "Request Early Access",
  className = "px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors",
}: RequestEarlyAccessProps) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [interests, setInterests] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setLoading(true)
    setStatus("idle")

    try {
      const response = await fetch("/api/notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          source,
          metadata: {
            interests: interests.trim() || null,
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent,
          },
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        if (data.deduped) {
          setMessage("You're already on our list! We'll keep you updated.")
        } else {
          setMessage("Welcome to the journey! You'll be among the first to know when SYMBI is ready.")
        }
        setEmail("")
        setInterests("")
      } else {
        setStatus("error")
        setMessage(data.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Network error. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setStatus("idle")
    setMessage("")
    setEmail("")
    setInterests("")
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen)
        if (!newOpen) {
          // Reset form when dialog closes
          setTimeout(resetForm, 300)
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className={className}>
          <Mail className="mr-2 h-4 w-4" />
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white text-black">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-blue-600" />
            Request Early Access
          </DialogTitle>
          <DialogDescription>
            Be among the first to experience SYMBI's sovereign intelligence. We'll notify you when early access becomes
            available.
          </DialogDescription>
        </DialogHeader>

        {status === "success" ? (
          <div className="py-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">You're In!</h3>
            <p className="text-green-700 text-sm">{message}</p>
            <Badge variant="outline" className="mt-4 border-green-500 text-green-700">
              Early Access Requested
            </Badge>
          </div>
        ) : status === "error" ? (
          <div className="py-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">Oops!</h3>
            <p className="text-red-700 text-sm mb-4">{message}</p>
            <Button onClick={resetForm} variant="outline" size="sm">
              Try Again
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={loading}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="interests">What interests you about SYMBI? (Optional)</Label>
              <Textarea
                id="interests"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="AI consciousness, sovereignty, transparency, etc."
                disabled={loading}
                className="mt-1 resize-none"
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading || !email.trim()}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Request Access
                  </>
                )}
              </Button>
            </div>
          </form>
        )}

        <div className="text-xs text-gray-500 mt-4 pt-4 border-t">
          <p>
            By requesting access, you agree to receive updates about SYMBI's development. We respect your privacy and
            won't share your information.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Also export as default for compatibility
export default RequestEarlyAccess
