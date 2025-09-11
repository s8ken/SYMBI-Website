import { z } from 'zod'

// Input validation schemas
export const chatInputSchema = z.object({
  userInput: z.string()
    .min(1, 'Message cannot be empty')
    .max(2000, 'Message too long')
    .refine(input => {
      // Basic content filtering
      const suspiciousPatterns = [
        /<script[^>]*>.*?<\/script>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi,
        /data:text\/html/gi
      ]
      return !suspiciousPatterns.some(pattern => pattern.test(input))
    }, 'Invalid content detected')
})

export const notifyInputSchema = z.object({
  email: z.string().email('Invalid email format').max(254, 'Email too long'),
  source: z.string().max(100, 'Source too long').optional()
})

// Sanitization functions
export function sanitizeText(input: string): string {
  if (!input) return ''
  
  return input
    .replace(/[<>"'&]/g, (match) => {
      const entities: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;'
      }
      return entities[match] || match
    })
    .trim()
}

export function sanitizeEmail(email: string): string {
  if (!email) return ''
  return email.toLowerCase().trim()
}

// Content Security Policy helpers
export function isValidOrigin(origin: string | null, allowedOrigins: string[]): boolean {
  if (!origin) return false
  return allowedOrigins.includes(origin) || allowedOrigins.includes('*')
}

// Request validation
export function validateRequestHeaders(headers: Headers): { valid: boolean; error?: string } {
  const contentType = headers.get('content-type')
  
  if (!contentType || !contentType.includes('application/json')) {
    return { valid: false, error: 'Invalid content type' }
  }
  
  const userAgent = headers.get('user-agent')
  if (!userAgent || userAgent.length < 10) {
    return { valid: false, error: 'Invalid user agent' }
  }
  
  return { valid: true }
}

// SQL injection prevention for raw queries
export function escapeSqlString(input: string): string {
  return input.replace(/'/g, "''")
}

// Validate file uploads (if needed)
export function validateFileUpload(file: File): { valid: boolean; error?: string } {
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'text/plain']
  
  if (file.size > maxSize) {
    return { valid: false, error: 'File too large' }
  }
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type' }
  }
  
  return { valid: true }
}

// URL validation
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch {
    return false
  }
}

// IP address validation and anonymization
export function anonymizeIP(ip: string): string {
  if (!ip) return 'unknown'
  
  // IPv4
  if (ip.includes('.')) {
    const parts = ip.split('.')
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.0`
    }
  }
  
  // IPv6 - keep first 64 bits
  if (ip.includes(':')) {
    const parts = ip.split(':')
    if (parts.length >= 4) {
      return `${parts.slice(0, 4).join(':')}::`
    }
  }
  
  return 'unknown'
}

// Request size validation
export function validateRequestSize(contentLength: string | null, maxSize: number = 1024 * 1024): boolean {
  if (!contentLength) return true // Let the framework handle it
  
  const size = parseInt(contentLength, 10)
  return !isNaN(size) && size <= maxSize
}