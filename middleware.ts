import { NextRequest, NextResponse } from 'next/server'

function getAllowedOrigins(): string[] {
  const list = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean)
  const single = process.env.APP_ORIGIN ? [process.env.APP_ORIGIN.trim()] : []
  const devDefaults = process.env.NODE_ENV === 'development' ? ['http://localhost:3000', 'http://localhost:3001'] : []
  return Array.from(new Set([...list, ...single, ...devDefaults]))
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const origin = request.headers.get('origin') || ''
  const allowed = getAllowedOrigins()
  const isDev = process.env.NODE_ENV === 'development'
  const allowOrigin = isDev ? '*' : (allowed.includes(origin) ? origin : (allowed[0] || ''))

  // CSP: drop unsafe-eval in production, keep for dev overlay
  const csp = (isDev
    ? [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://va.vercel-scripts.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: https: blob:",
        "connect-src 'self' https://api.together.xyz https://*.supabase.co https://*.upstash.io ws: wss:",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'"
      ]
    : [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: https: blob:",
        "connect-src 'self' https://api.together.xyz https://*.supabase.co https://*.upstash.io",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'"
      ]
  ).join('; ')

  const headers: Record<string, string> = {
    'Content-Security-Policy': csp,
    ...(allowOrigin && { 'Access-Control-Allow-Origin': allowOrigin }),
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin, Access-Control-Request-Method, Access-Control-Request-Headers',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()'
  }
  if (process.env.NODE_ENV === 'production') {
    headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload'
  }

  Object.entries(headers).forEach(([k, v]) => v && response.headers.set(k, v))

  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200, headers })
  }

  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('X-Request-ID', `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
    response.headers.set('X-RateLimit-Limit', '60')
    response.headers.set('X-RateLimit-Remaining', '59')
    response.headers.set('X-RateLimit-Reset', String(Date.now() + 60000))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
