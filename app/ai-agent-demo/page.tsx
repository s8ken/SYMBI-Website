'use client'

import React from 'react'
import { AIAgentPanel } from '@/components/ai-agent-panel'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Bot, Zap, Shield, Globe } from 'lucide-react'

export default function AIAgentDemoPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Bot className="h-8 w-8 text-blue-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            SYMBI AI Agent Integration
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Experience the power of AI agents integrated with Frontegg authentication.
          This demo showcases real-time communication between your SYMBI app and our AI agent service.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="border-blue-200 hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-2" />
            <CardTitle className="text-lg">Secure Authentication</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              Protected by Frontegg OAuth with JWT token verification
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="border-purple-200 hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <Zap className="h-12 w-12 text-purple-600 mx-auto mb-2" />
            <CardTitle className="text-lg">Real-time Communication</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              Live status updates and instant AI agent responses
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="border-green-200 hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <Globe className="h-12 w-12 text-green-600 mx-auto mb-2" />
            <CardTitle className="text-lg">Localhost Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              AI agent running on localhost:3001 with health monitoring
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Status Badges */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          🟢 Next.js App (localhost:3000)
        </Badge>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          🤖 AI Agent Service (localhost:3001)
        </Badge>
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          🔐 Frontegg OAuth Integration
        </Badge>
      </div>

      {/* Main AI Agent Panel */}
      <div className="max-w-4xl mx-auto">
        <AIAgentPanel />
      </div>

      {/* Footer Info */}
      <div className="mt-12 text-center text-sm text-gray-500">
        <p>
          This integration demonstrates how SYMBI can communicate with AI agents
          while maintaining secure authentication through Frontegg.
        </p>
        <p className="mt-2">
          <strong>API Endpoints:</strong> Health Check, Capabilities, Chat, Status
        </p>
      </div>
    </div>
  );
}