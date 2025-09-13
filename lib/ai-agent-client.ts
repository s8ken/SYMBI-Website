'use client'

import { useState, useEffect } from 'react'

// Mock AI Agent Client for development
export function useAIAgent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ id: string; name: string } | null>(null)

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      // Mock authentication check
      setIsAuthenticated(true)
      setUser({ id: 'demo-user', name: 'Demo User' })
    }
  }, [])

  const sendMessage = async (message: string) => {
    // Mock message sending
    return {
      id: Date.now().toString(),
      content: `Echo: ${message}`,
      sender: 'agent' as const,
      timestamp: new Date().toISOString()
    }
  }

  const getCapabilities = async () => {
    // Mock capabilities
    return {
      version: '1.0.0',
      features: ['chat', 'analysis', 'reasoning'],
      status: 'active'
    }
  }

  const getStatus = async () => {
    // Mock status
    return {
      online: true,
      lastSeen: new Date().toISOString(),
      health: 'good'
    }
  }

  const healthCheck = async () => {
    // Mock health check
    return {
      status: 'healthy',
      uptime: '99.9%',
      responseTime: '50ms'
    }
  }

  const testConnection = async () => {
    // Mock connection test
    return {
      connected: true,
      latency: 45
    }
  }

  return {
    isAuthenticated,
    user,
    sendMessage,
    getCapabilities,
    getStatus,
    healthCheck,
    testConnection
  }
}