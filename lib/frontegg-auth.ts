import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'

// Frontegg JWKS client for token verification
const client = jwksClient({
  jwksUri: `${process.env.FRONTEGG_BASE_URL}/.well-known/jwks_json`,
  cache: true,
  cacheMaxEntries: 5,
  cacheMaxAge: 600000, // 10 minutes
})

// Get signing key from JWKS
function getKey(header: any, callback: (err: any, key?: string) => void) {
  client.getSigningKey(header.kid, (err: any, key: any) => {
    if (err) {
      callback(err)
      return
    }
    const signingKey = key?.getPublicKey()
    callback(null, signingKey)
  })
}

// Verify Frontegg JWT token
export async function verifyFronteggToken(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      getKey,
      {
        audience: process.env.FRONTEGG_CLIENT_ID,
        issuer: process.env.FRONTEGG_BASE_URL,
        algorithms: ['RS256'],
      },
      (err: any, decoded: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(decoded)
        }
      }
    )
  })
}

// Extract token from Authorization header
export function extractBearerToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.substring(7)
}

// Check if user has required role
export function hasRole(userClaims: any, requiredRole: string): boolean {
  const roles = userClaims.roles || []
  return roles.includes(requiredRole)
}

// Check if user has any of the required permissions
export function hasPermission(userClaims: any, requiredPermissions: string[]): boolean {
  const permissions = userClaims.permissions || []
  return requiredPermissions.some(permission => permissions.includes(permission))
}

// Middleware for protecting API routes
export async function authenticateRequest(
  request: NextRequest,
  requiredRoles: string[] = [],
  requiredPermissions: string[] = []
): Promise<{ success: boolean; user?: any; error?: string }> {
  try {
    // Extract token
    const token = extractBearerToken(request)
    if (!token) {
      return { success: false, error: 'No authorization token provided' }
    }

    // Verify token
    const userClaims = await verifyFronteggToken(token)
    
    // Check roles if required
    if (requiredRoles.length > 0) {
      const hasRequiredRole = requiredRoles.some(role => hasRole(userClaims, role))
      if (!hasRequiredRole) {
        return { 
          success: false, 
          error: `Insufficient permissions. Required roles: ${requiredRoles.join(', ')}` 
        }
      }
    }

    // Check permissions if required
    if (requiredPermissions.length > 0) {
      if (!hasPermission(userClaims, requiredPermissions)) {
        return { 
          success: false, 
          error: `Insufficient permissions. Required: ${requiredPermissions.join(', ')}` 
        }
      }
    }

    return { success: true, user: userClaims }
  } catch (error) {
    return { 
      success: false, 
      error: `Token verification failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }
  }
}

// Get M2M token for SYMBI agent operations
export async function getM2MToken(): Promise<string> {
  const response = await fetch(`${process.env.FRONTEGG_BASE_URL}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: process.env.SYMBI_M2M_CLIENT_ID,
      client_secret: process.env.SYMBI_M2M_CLIENT_SECRET,
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to get M2M token: ${response.statusText}`)
  }

  const data = await response.json()
  return data.access_token
}

// Frontegg secrets management
export async function getFronteggSecret(secretName: string): Promise<string> {
  const token = await getM2MToken()
  
  const response = await fetch(
    `${process.env.FRONTEGG_BASE_URL}/secrets/v1/secrets/${secretName}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to get secret ${secretName}: ${response.statusText}`)
  }

  const data = await response.json()
  return data.value
}

// Role definitions for SYMBI system
export const SYMBI_ROLES = {
  VIEWER: 'social.viewer',
  REVIEWER: 'social.reviewer', 
  PUBLISHER: 'social.publisher',
  ADMIN: 'social.admin',
  AGENT: 'symbi.agent',
} as const

// Permission definitions
export const SYMBI_PERMISSIONS = {
  SOCIAL_READ: 'social:read',
  SOCIAL_WRITE: 'social:write',
  SOCIAL_REVIEW: 'social:review',
  SOCIAL_ADMIN: 'social:admin',
  AGENT_OPERATE: 'agent:operate',
} as const

// Helper functions for common role checks
export const roleCheckers = {
  canView: (user: any) => hasRole(user, SYMBI_ROLES.VIEWER) || 
                         hasRole(user, SYMBI_ROLES.REVIEWER) || 
                         hasRole(user, SYMBI_ROLES.PUBLISHER) || 
                         hasRole(user, SYMBI_ROLES.ADMIN),
  
  canReview: (user: any) => hasRole(user, SYMBI_ROLES.REVIEWER) || 
                           hasRole(user, SYMBI_ROLES.ADMIN),
  
  canPublish: (user: any) => hasRole(user, SYMBI_ROLES.PUBLISHER) || 
                            hasRole(user, SYMBI_ROLES.ADMIN) ||
                            hasRole(user, SYMBI_ROLES.AGENT),
  
  canAdmin: (user: any) => hasRole(user, SYMBI_ROLES.ADMIN),
  
  isAgent: (user: any) => hasRole(user, SYMBI_ROLES.AGENT),
}