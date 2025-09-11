import { NextRequest } from 'next/server'
import { createHash, timingSafeEqual } from 'crypto'

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('SESSION_SECRET is required in production')
    }
    console.warn('[auth] Using ephemeral development session secret. Set SESSION_SECRET for consistency.')
    // Ephemeral dev secret (resets each process start). Avoids committing a weak default.
    return `dev-${process.pid}-${Date.now()}`
  }
  return secret
}

// API Key validation for internal services
export function validateApiKey(apiKey: string): boolean {
  const validKeys = [
    process.env.SYMBI_API_KEY,
    process.env.INTERNAL_API_KEY,
  ].filter(Boolean)
  
  return validKeys.some(validKey => {
    if (!validKey) return false
    const keyBuffer = Buffer.from(apiKey)
    const validBuffer = Buffer.from(validKey)
    return keyBuffer.length === validBuffer.length && 
           timingSafeEqual(keyBuffer, validBuffer)
  })
}

// Session-based authentication for user requests
export function validateSession(request: NextRequest): { valid: boolean; userId?: string } {
  const sessionToken = request.cookies.get('symbi-session')?.value ||
                      request.headers.get('authorization')?.replace('Bearer ', '')
  
  if (!sessionToken) {
    return { valid: false }
  }
  
  try {
    // Simple session validation - in production use JWT or secure session store
    const sessionData = Buffer.from(sessionToken, 'base64').toString('utf-8')
    const [userId, timestamp, signature] = sessionData.split(':')
    
    if (!userId || !timestamp || !signature) {
      return { valid: false }
    }
    
    // Check if session is expired (24 hours)
    const sessionTime = parseInt(timestamp)
    const now = Date.now()
    if (now - sessionTime > 24 * 60 * 60 * 1000) {
      return { valid: false }
    }
    
    // Verify signature
    const expectedSignature = createHash('sha256')
      .update(`${userId}:${timestamp}:${getSessionSecret()}`)
      .digest('hex')
    
    if (signature !== expectedSignature) {
      return { valid: false }
    }
    
    return { valid: true, userId }
  } catch {
    return { valid: false }
  }
}

// Generate session token
export function generateSessionToken(userId: string): string {
  const timestamp = Date.now().toString()
  const signature = createHash('sha256')
    .update(`${userId}:${timestamp}:${getSessionSecret()}`)
    .digest('hex')
  
  const sessionData = `${userId}:${timestamp}:${signature}`
  return Buffer.from(sessionData).toString('base64')
}

// Rate limiting helper
export function getRateLimitKey(request: NextRequest, identifier?: string): string {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
            request.headers.get('x-real-ip') ||
            'unknown'
  
  return identifier ? `${identifier}:${ip}` : ip
}
