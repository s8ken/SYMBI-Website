import { NextRequest, NextResponse } from 'next/server';
import { xApiClient } from '@/lib/x-api-client';

// Force dynamic rendering for OAuth callback
export const dynamic = 'force-dynamic';

// GET /api/x/callback - Handle X OAuth callback
export async function GET(request: NextRequest) {
  // Get base URL from environment or fallback
  const baseUrl = process.env.NEXTAUTH_URL || process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000';
    
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');
    
    // Check for OAuth errors
    if (error) {
      return NextResponse.redirect(
        new URL(`/symbi/agent?error=${encodeURIComponent(error)}`, baseUrl)
      );
    }
    
    if (!code || !state) {
      return NextResponse.redirect(
        new URL('/symbi/agent?error=missing_code_or_state', baseUrl)
      );
    }
    
    // Get stored verification data from cookies
    const codeVerifier = request.cookies.get('x_code_verifier')?.value;
    const storedState = request.cookies.get('x_state')?.value;
    
    if (!codeVerifier || !storedState) {
      return NextResponse.redirect(
        new URL('/symbi/agent?error=missing_verification_data', baseUrl)
      );
    }
    
    // Verify state parameter
    if (state !== storedState) {
      return NextResponse.redirect(
        new URL('/symbi/agent?error=invalid_state', baseUrl)
      );
    }
    
    // Exchange code for tokens
    const { accessToken, refreshToken } = await xApiClient.exchangeCodeForToken(code, codeVerifier);
    
    // Get user info to verify the token
    const user = await xApiClient.getCurrentUser(accessToken);
    
    // In a production app, you'd store these tokens securely in a database
    // For this demo, we'll redirect with success and show the tokens
    const successUrl = new URL('/symbi/agent', baseUrl);
    successUrl.searchParams.set('success', 'true');
    successUrl.searchParams.set('username', user.data?.username || 'unknown');
    
    const response = NextResponse.redirect(successUrl);
    
    // Clear the temporary cookies
    response.cookies.delete('x_code_verifier');
    response.cookies.delete('x_state');
    
    // Store tokens in secure cookies (in production, use database)
    response.cookies.set('x_access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7200 // 2 hours
    });
    
    if (refreshToken) {
      response.cookies.set('x_refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 86400 * 30 // 30 days
      });
    }
    
    return response;
  } catch (error) {
    console.error('Error in X OAuth callback:', error);
    return NextResponse.redirect(
      new URL('/symbi/agent?error=oauth_exchange_failed', baseUrl)
    );
  }
}