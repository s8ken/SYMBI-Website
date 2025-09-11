interface SecurityEvent {
  type: 'rate_limit' | 'auth_failure' | 'validation_error' | 'suspicious_activity'
  severity: 'low' | 'medium' | 'high' | 'critical'
  message: string
  metadata?: Record<string, any>
  timestamp: string
  ip?: string
  userAgent?: string
  requestId?: string
}

interface PerformanceMetric {
  name: string
  value: number
  unit: 'ms' | 'bytes' | 'count'
  timestamp: string
  tags?: Record<string, string>
}

class MonitoringService {
  private events: SecurityEvent[] = []
  private metrics: PerformanceMetric[] = []
  private readonly maxEvents = 1000
  private readonly maxMetrics = 1000

  /**
   * Log a security event
   */
  logSecurityEvent(event: Omit<SecurityEvent, 'timestamp'>): void {
    const securityEvent: SecurityEvent = {
      ...event,
      timestamp: new Date().toISOString()
    }

    this.events.push(securityEvent)
    
    // Keep only recent events
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents)
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('Security Event:', securityEvent)
    }

    // In production, send to monitoring service
    if (process.env.NODE_ENV === 'production') {
      this.sendToMonitoringService(securityEvent)
    }
  }

  /**
   * Record a performance metric
   */
  recordMetric(metric: Omit<PerformanceMetric, 'timestamp'>): void {
    const performanceMetric: PerformanceMetric = {
      ...metric,
      timestamp: new Date().toISOString()
    }

    this.metrics.push(performanceMetric)
    
    // Keep only recent metrics
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics)
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance Metric:', performanceMetric)
    }
  }

  /**
   * Get recent security events
   */
  getRecentEvents(limit: number = 50): SecurityEvent[] {
    return this.events.slice(-limit)
  }

  /**
   * Get recent metrics
   */
  getRecentMetrics(limit: number = 50): PerformanceMetric[] {
    return this.metrics.slice(-limit)
  }

  /**
   * Check for suspicious patterns
   */
  detectSuspiciousActivity(ip: string, timeWindow: number = 300000): boolean {
    const now = Date.now()
    const recentEvents = this.events.filter(event => 
      event.ip === ip && 
      (now - new Date(event.timestamp).getTime()) < timeWindow
    )

    // Multiple rate limit violations
    const rateLimitViolations = recentEvents.filter(e => e.type === 'rate_limit').length
    if (rateLimitViolations > 5) {
      return true
    }

    // Multiple auth failures
    const authFailures = recentEvents.filter(e => e.type === 'auth_failure').length
    if (authFailures > 3) {
      return true
    }

    // Multiple validation errors (potential attack)
    const validationErrors = recentEvents.filter(e => e.type === 'validation_error').length
    if (validationErrors > 10) {
      return true
    }

    return false
  }

  /**
   * Send event to external monitoring service
   */
  private async sendToMonitoringService(event: SecurityEvent): Promise<void> {
    try {
      // Example: Send to Sentry, DataDog, or custom endpoint
      // await fetch('/api/monitoring/events', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(event)
      // })
      
      // For now, just log critical events
      if (event.severity === 'critical') {
        console.error('CRITICAL SECURITY EVENT:', event)
      }
    } catch (error) {
      console.error('Failed to send monitoring event:', error)
    }
  }

  /**
   * Generate security report
   */
  generateSecurityReport(hours: number = 24): {
    summary: Record<string, number>
    criticalEvents: SecurityEvent[]
    topIPs: Array<{ ip: string; count: number }>
  } {
    const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000)
    const recentEvents = this.events.filter(e => new Date(e.timestamp) > cutoff)

    // Count events by type
    const summary = recentEvents.reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Get critical events
    const criticalEvents = recentEvents.filter(e => e.severity === 'critical')

    // Count events by IP
    const ipCounts = recentEvents.reduce((acc, event) => {
      if (event.ip) {
        acc[event.ip] = (acc[event.ip] || 0) + 1
      }
      return acc
    }, {} as Record<string, number>)

    const topIPs = Object.entries(ipCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([ip, count]) => ({ ip, count }))

    return {
      summary,
      criticalEvents,
      topIPs
    }
  }
}

// Singleton instance
export const monitoring = new MonitoringService()

// Helper functions for common monitoring tasks
export function trackApiCall(endpoint: string, duration: number, statusCode: number): void {
  monitoring.recordMetric({
    name: 'api_call_duration',
    value: duration,
    unit: 'ms',
    tags: {
      endpoint,
      status: statusCode.toString()
    }
  })
}

export function trackRateLimitViolation(ip: string, endpoint: string, requestId?: string): void {
  monitoring.logSecurityEvent({
    type: 'rate_limit',
    severity: 'medium',
    message: `Rate limit exceeded for ${endpoint}`,
    ip,
    requestId,
    metadata: { endpoint }
  })
}

export function trackAuthFailure(ip: string, reason: string, requestId?: string): void {
  monitoring.logSecurityEvent({
    type: 'auth_failure',
    severity: 'high',
    message: `Authentication failed: ${reason}`,
    ip,
    requestId,
    metadata: { reason }
  })
}

export function trackValidationError(ip: string, endpoint: string, errors: any[], requestId?: string): void {
  monitoring.logSecurityEvent({
    type: 'validation_error',
    severity: 'low',
    message: `Input validation failed for ${endpoint}`,
    ip,
    requestId,
    metadata: { endpoint, errors }
  })
}

export function trackSuspiciousActivity(ip: string, activity: string, requestId?: string): void {
  monitoring.logSecurityEvent({
    type: 'suspicious_activity',
    severity: 'critical',
    message: `Suspicious activity detected: ${activity}`,
    ip,
    requestId,
    metadata: { activity }
  })
}

// Performance tracking decorator
export function withPerformanceTracking<T extends any[], R>(
  name: string,
  fn: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R> => {
    const start = Date.now()
    try {
      const result = await fn(...args)
      const duration = Date.now() - start
      
      monitoring.recordMetric({
        name: `${name}_duration`,
        value: duration,
        unit: 'ms',
        tags: { status: 'success' }
      })
      
      return result
    } catch (error) {
      const duration = Date.now() - start
      
      monitoring.recordMetric({
        name: `${name}_duration`,
        value: duration,
        unit: 'ms',
        tags: { status: 'error' }
      })
      
      throw error
    }
  }
}