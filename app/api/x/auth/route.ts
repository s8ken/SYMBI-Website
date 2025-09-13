import { NextRequest, NextResponse } from 'next/server';
import { xApiClient } from '@/lib/x-api-client';

// GET /api/x/auth - Initiate X OAuth flow
export async function GET(request: NextRequest) {
  try {
    const callbackUrl = process.env.SYMBI_AGENT_CALLBACK_URL || 'http://localhost:3000/api/x/callback';
    
    const { url, codeVerifier, state } = await xApiClient.getAuthUrl(callbackUrl);
    
    // In a production app, you'd store codeVerifier and state in a secure session
    // For this demo, we'll return them (in production, use encrypted cookies or database)
    const response = NextResponse.json({
      success: true,
      authUrl: url,
      message: 'Redirect to authUrl to complete X authentication'
    });
    
    // Store verification data in httpOnly cookies
    response.cookies.set('x_code_verifier', codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 600 // 10 minutes
    });
    
    response.cookies.set('x_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 600 // 10 minutes
    });
    
    return response;
  } catch (error) {
    console.error('Error initiating X auth:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to initiate X authentication' },
      { status: 500 }
    );
  }
}

// POST /api/x/auth - Manual token configuration (for development)
export async function POST(request: NextRequest) {
  try {
    const { accessToken, refreshToken } = await request.json();
    
    if (!accessToken) {
      return NextResponse.json(
        { success: false, error: 'Access token is required' },
        { status: 400 }
      );
    }
    
    // Verify the token by getting user info
    const user = await xApiClient.getCurrentUser(accessToken);
    
    // In a production app, you'd store these tokens securely in a database
    // For this demo, we'll just return success
    return NextResponse.json({
      success: true,
      user: user.data,
      message: 'X API tokens configured successfully. Update your .env.local file with these tokens.'
    });
  } catch (error) {
    console.error('Error configuring X tokens:', error);
    return NextResponse.json(
      { success: false, error: 'Invalid access token or API error' },
      { status: 400 }
    );
  }
}