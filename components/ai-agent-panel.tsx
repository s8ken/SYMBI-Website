'use client'

import React, { useState, useEffect } from 'react'
import { useAIAgent } from '@/lib/ai-agent-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, MessageCircle, Cpu, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'agent'
  timestamp: string
}

export function AIAgentPanel() {
  const { isAuthenticated, user, sendMessage, getCapabilities, getStatus, healthCheck, testConnection } = useAIAgent()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [agentStatus, setAgentStatus] = useState<any>(null)
  const [capabilities, setCapabilities] = useState<any>(null)
  const [connectionStatus, setConnectionStatus] = useState<'unknown' | 'connected' | 'disconnected'>('unknown')

  // Check agent health on mount
  useEffect(() => {
    if (isAuthenticated) {
      checkAgentHealth()
      loadCapabilities()
    }
  }, [isAuthenticated])

  const checkAgentHealth = async () => {
    try {
      const health = await healthCheck()
      setConnectionStatus('connected')
      console.log('Agent health:', health)
    } catch (error) {
      setConnectionStatus('disconnected')
      console.error('Agent health check failed:', error)
    }
  }

  const loadCapabilities = async () => {
    try {
      const caps = await getCapabilities()
      setCapabilities(caps)
    } catch (error) {
      console.error('Failed to load capabilities:', error instanceof Error ? error.message : 'Unknown error')
    }
  }

  const loadStatus = async () => {
    try {
      const status = await getStatus()
      setAgentStatus(status)
    } catch (error) {
      console.error('Failed to load status:', error instanceof Error ? error.message : 'Unknown error')
    }
  }

  const testFronteggConnection = async () => {
    try {
      const result = await testConnection()
      console.log('Frontegg connection test:', result)
      return result
    } catch (error) {
      console.error('Frontegg connection test failed:', error)
      return { status: 'error', message: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      content: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await sendMessage(inputMessage, {
        user: user?.email,
        timestamp: new Date().toISOString()
      })

      const agentMessage: Message = {
        id: response.id,
        content: response.message,
        sender: 'agent',
        timestamp: response.timestamp
      }

      setMessages(prev => [...prev, agentMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        content: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        sender: 'agent',
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'disconnected':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
    }
  }

  if (!isAuthenticated) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-5 w-5" />
            SYMBI AI Agent
          </CardTitle>
          <CardDescription>
            Please sign in with Frontegg to access the AI agent
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Status Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-5 w-5" />
            SYMBI AI Agent
            {getStatusIcon()}
          </CardTitle>
          <CardDescription>
            AI Agent running on localhost:3001 with Frontegg integration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant={connectionStatus === 'connected' ? 'default' : 'destructive'}>
              Agent: {connectionStatus}
            </Badge>
            <Badge variant="outline">
              User: {user?.email || 'Unknown'}
            </Badge>
            <Button size="sm" variant="outline" onClick={loadStatus}>
              Refresh Status
            </Button>
            <Button size="sm" variant="outline" onClick={testFronteggConnection}>
              Test Frontegg
            </Button>
          </div>

          {capabilities && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Capabilities:</h4>
              <div className="flex flex-wrap gap-1">
                {capabilities.capabilities?.map((cap: any, index: number) => (
                  <Badge key={index} variant={cap.enabled ? 'default' : 'secondary'}>
                    {cap.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            AI Agent Chat
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Messages */}
          <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
            {messages.length === 0 ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Start a conversation with the SYMBI AI Agent. Try asking about SYMBI protocols, code analysis, or general questions.
                </AlertDescription>
              </Alert>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
          </div>

          <Separator className="mb-4" />

          {/* Input */}
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask the AI agent anything..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isLoading || connectionStatus !== 'connected'}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim() || connectionStatus !== 'connected'}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Agent Status Details */}
      {agentStatus && (
        <Card>
          <CardHeader>
            <CardTitle>Agent Status Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Status:</strong> {agentStatus.status}
              </div>
              <div>
                <strong>Uptime:</strong> {Math.floor(agentStatus.uptime / 60)}m {Math.floor(agentStatus.uptime % 60)}s
              </div>
              <div>
                <strong>Memory Usage:</strong> {Math.round(agentStatus.memory?.heapUsed / 1024 / 1024)}MB
              </div>
              <div>
                <strong>Last Activity:</strong> {new Date(agentStatus.lastActivity).toLocaleTimeString()}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}