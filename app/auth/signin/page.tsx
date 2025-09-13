'use client'

import { getProviders, signIn } from "next-auth/react"
import { useEffect, useState } from "react"

type Provider = {
  id: string
  name: string
  type: string
  signinUrl: string
  callbackUrl: string
}

export default function SignIn() {
  const [providers, setProviders] = useState<Record<string, Provider> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders()
      setProviders(res)
      setLoading(false)
    }
    fetchProviders()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Sign in to SYMBI</h1>
          <p className="text-gray-600 mt-2">
            Choose your preferred authentication method
          </p>
        </div>
        
        <div className="space-y-4">
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                key={provider.name}
                className="w-full flex items-center justify-center gap-3 h-12 px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              >
                Sign in with {provider.name}
              </button>
            ))}
        </div>
        
        <div className="text-center pt-6">
          <a 
            href="/" 
            className="text-sm text-gray-600 hover:text-gray-900 underline"
          >
            ← Back to SYMBI
          </a>
        </div>
      </div>
    </div>
  )
}