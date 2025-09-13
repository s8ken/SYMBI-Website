import { NextRequest, NextResponse } from 'next/server';

// Server-side agent communication with proper authentication
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    
    // Validate required environment variables
    const agentBackendUrl = process.env.AI_AGENT_URL || 'http://localhost:3001';
    const symbiApiKey = process.env.SYMBI_API_KEY;
    
    if (!symbiApiKey) {
      console.error('SYMBI_API_KEY not configured');
      return NextResponse.json(
        { error: 'Agent service not properly configured' },
        { status: 500 }
      );
    }
    
    // Forward request to agent service with authentication
    const response = await fetch(`${agentBackendUrl}/api/agent/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${symbiApiKey}`,
      },
      body: JSON.stringify(payload),
    });
    
    const data = await response.json();
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Agent API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  try {
    const agentBackendUrl = process.env.AI_AGENT_URL || 'http://localhost:3001';
    
    const response = await fetch(`${agentBackendUrl}/health`);
    const data = await response.json();
    
    return NextResponse.json({
      status: 'ok',
      agent: data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Agent health check failed:', error);
    return NextResponse.json(
      { error: 'Agent service unavailable' },
      { status: 503 }
    );
  }
}