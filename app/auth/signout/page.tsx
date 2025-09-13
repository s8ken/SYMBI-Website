'use client'

import { signOut } from "next-auth/react"
import { useEffect } from "react"

export default function SignOut() {
  useEffect(() => {
    signOut({ callbackUrl: '/' })
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Signing Out</h1>
        <p className="text-gray-600">
          Please wait while we sign you out...
        </p>
      </div>
    </div>
  )
}