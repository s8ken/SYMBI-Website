import { NextResponse } from 'next/server'

export interface ApiError {
  code: string
  message: string
  statusCode: number
  details?: any
  timestamp: string
  requestId?: string
}

export class SymbiError extends Error {
  public readonly code: string
  public readonly statusCode: number
  public readonly details?: any
  public readonly requestId?: string

  constructor(code: string, message: string, statusCode: number = 500, details?: any, requestId?: string) {
    super(message)
    this.name = 'SymbiError'
    this.code = code
    this.statusCode = statusCode
    this.details = details
    this.requestId = requestId
  }
}

// Predefined error types
export const ErrorCodes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  RATE_LIMIT_ERROR: 'RATE_LIMIT_ERROR',
  EXTERNAL_API_ERROR: 'EXTERNAL_API_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  NOT_FOUND: 'NOT_FOUND'
} as const

// Error factory functions
export function createValidationError(message: string, details?: any): SymbiError {
  return new SymbiError(ErrorCodes.VALIDATION_ERROR, message, 400, details)
}

export function createAuthError(message: string = 'Authentication required'): SymbiError {
  return new SymbiError(ErrorCodes.AUTHENTICATION_ERROR, message, 401)
}

export function createAuthorizationError(message: string = 'Insufficient permissions'): SymbiError {
  return new SymbiError(ErrorCodes.AUTHORIZATION_ERROR, message, 403)
}

export function createRateLimitError(message: string = 'Too many requests'): SymbiError {
  return new SymbiError(ErrorCodes.RATE_LIMIT_ERROR, message, 429)
}

export function createNotFoundError(message: string = 'Resource not found'): SymbiError {
  return new SymbiError(ErrorCodes.NOT_FOUND, message, 404)
}

// Secure logging function
export function logError(error: Error | SymbiError, context?: Record<string, any>) {
  const timestamp = new Date().toISOString()
  const isSymbiError = error instanceof SymbiError
  
  const logData = {
    timestamp,
    level: 'error',
    message: error.message,
    code: isSymbiError ? error.code : 'UNKNOWN_ERROR',
    statusCode: isSymbiError ? error.statusCode : 500,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    context: sanitizeLogContext(context),
    requestId: isSymbiError ? error.requestId : undefined
  }
  
  // In production, send to logging service (e.g., Sentry, LogRocket)
  if (process.env.NODE_ENV === 'production') {
    // Example: Sentry.captureException(error, { extra: logData })
    console.error(JSON.stringify(logData))
  } else {
    console.error('SYMBI Error:', logData)
  }
}

// Sanitize sensitive data from logs
function sanitizeLogContext(context?: Record<string, any>): Record<string, any> | undefined {
  if (!context) return undefined
  
  const sensitiveKeys = ['password', 'token', 'apiKey', 'secret', 'authorization']
  const sanitized = { ...context }
  
  for (const key of Object.keys(sanitized)) {
    if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
      sanitized[key] = '[REDACTED]'
    }
  }
  
  return sanitized
}

// Error response handler
export function handleApiError(error: unknown, requestId?: string): NextResponse {
  const timestamp = new Date().toISOString()
  
  if (error instanceof SymbiError) {
    const apiError: ApiError = {
      code: error.code,
      message: error.message,
      statusCode: error.statusCode,
      timestamp,
      requestId: error.requestId || requestId
    }
    
    // Log the error
    logError(error, { requestId })
    
    return NextResponse.json(
      { error: apiError },
      { status: error.statusCode }
    )
  }
  
  // Handle unknown errors
  const unknownError = error instanceof Error ? error : new Error('Unknown error occurred')
  logError(unknownError, { requestId })
  
  const apiError: ApiError = {
    code: ErrorCodes.INTERNAL_ERROR,
    message: process.env.NODE_ENV === 'development' 
      ? unknownError.message 
      : 'Internal server error',
    statusCode: 500,
    timestamp,
    requestId
  }
  
  return NextResponse.json(
    { error: apiError },
    { status: 500 }
  )
}

// Success response helper
export function createSuccessResponse<T>(data: T, statusCode: number = 200): NextResponse {
  return NextResponse.json(
    {
      success: true,
      data,
      timestamp: new Date().toISOString()
    },
    { status: statusCode }
  )
}

// Request ID generator
export function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Async error wrapper
export function asyncHandler<T extends any[], R>(
  fn: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args)
    } catch (error) {
      if (error instanceof SymbiError) {
        throw error
      }
      
      // Wrap unknown errors
      throw new SymbiError(
        ErrorCodes.INTERNAL_ERROR,
        error instanceof Error ? error.message : 'Unknown error',
        500
      )
    }
  }
}