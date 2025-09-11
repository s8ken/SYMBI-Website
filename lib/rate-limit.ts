import { NextRequest, NextResponse } from 'next/server'

interface RateLimitConfig {
  requests: number
  window: number // in seconds
  skipSuccessfulRequests?: boolean
}

interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
  error?: string
}

// In-memory rate limiting for development/fallback
const memoryStore = new Map<string, { count: number; resetTime: number }>()

export async function rateLimit(
  request: NextRequest,
  identifier: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const { requests, window, skipSuccessfulRequests = false } = config
  const now = Date.now()
  const windowMs = window * 1000
  const resetTime = now + windowMs

  try {
    // Prefer Upstash Redis (atomic) if configured
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN
    if (redisUrl && redisToken) {
      return await upstashRedisRateLimit(identifier, requests, windowMs, redisUrl, redisToken)
    }

    // Otherwise try Upstash KV
    const kvUrl = process.env.KV_REST_API_URL
    const kvToken = process.env.KV_REST_API_TOKEN

    if (kvUrl && kvToken) {
      return await upstashRateLimit(identifier, requests, windowMs, resetTime, kvUrl, kvToken)
    }

    // Fallback to memory store
    return memoryRateLimit(identifier, requests, windowMs, resetTime)
  } catch (error) {
    console.error('Rate limiting error:', error)
    // On error, allow the request but log it
    return {
      success: true,
      limit: requests,
      remaining: requests - 1,
      reset: resetTime
    }
  }
}

async function upstashRateLimit(
  identifier: string,
  requests: number,
  windowMs: number,
  resetTime: number,
  kvUrl: string,
  kvToken: string
): Promise<RateLimitResult> {
  const key = `rate_limit:${identifier}`
  
  // Get current count
  const getResponse = await fetch(`${kvUrl}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${kvToken}` },
    cache: 'no-store'
  })
  
  let currentCount = 0
  let currentResetTime = resetTime
  
  if (getResponse.ok) {
    const data = await getResponse.json()
    if (data.result) {
      const stored = JSON.parse(data.result)
      if (stored.resetTime > Date.now()) {
        currentCount = stored.count
        currentResetTime = stored.resetTime
      }
    }
  }
  
  if (currentCount >= requests) {
    return {
      success: false,
      limit: requests,
      remaining: 0,
      reset: currentResetTime,
      error: 'Rate limit exceeded'
    }
  }
  
  // Increment count
  const newCount = currentCount + 1
  const newData = JSON.stringify({
    count: newCount,
    resetTime: currentResetTime
  })
  
  await fetch(`${kvUrl}/set`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${kvToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      key,
      value: newData,
      ex: Math.ceil(windowMs / 1000)
    })
  })
  
  return {
    success: true,
    limit: requests,
    remaining: Math.max(0, requests - newCount),
    reset: currentResetTime
  }
}

function memoryRateLimit(
  identifier: string,
  requests: number,
  windowMs: number,
  resetTime: number
): RateLimitResult {
  const now = Date.now()
  const stored = memoryStore.get(identifier)
  
  if (!stored || stored.resetTime <= now) {
    memoryStore.set(identifier, { count: 1, resetTime })
    return {
      success: true,
      limit: requests,
      remaining: requests - 1,
      reset: resetTime
    }
  }
  
  if (stored.count >= requests) {
    return {
      success: false,
      limit: requests,
      remaining: 0,
      reset: stored.resetTime,
      error: 'Rate limit exceeded'
    }
  }
  
  stored.count++
  return {
    success: true,
    limit: requests,
    remaining: Math.max(0, requests - stored.count),
    reset: stored.resetTime
  }
}

// Upstash Redis REST (atomic) implementation via pipeline
async function upstashRedisRateLimit(
  identifier: string,
  requests: number,
  windowMs: number,
  redisUrl: string,
  redisToken: string
): Promise<RateLimitResult> {
  const key = `rate_limit:${identifier}`
  const ttlSeconds = Math.ceil(windowMs / 1000)
  const pipelineBody = {
    commands: [
      ["INCR", key],
      ["EXPIRE", key, ttlSeconds],
      ["PTTL", key]
    ]
  }

  try {
    const res = await fetch(`${redisUrl}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${redisToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pipelineBody)
    })
    if (!res.ok) throw new Error(`Upstash Redis error: ${res.status}`)
    const data = await res.json() as { result: Array<{ result: number }> }
    const incr = Number(data?.result?.[0]?.result ?? 1)
    const pttl = Number(data?.result?.[2]?.result ?? windowMs)
    const reset = Date.now() + (pttl > 0 ? pttl : windowMs)
    if (incr > requests) {
      return { success: false, limit: requests, remaining: 0, reset, error: 'Rate limit exceeded' }
    }
    return { success: true, limit: requests, remaining: Math.max(0, requests - incr), reset }
  } catch (e) {
    // Fallback to memory on error
    const now = Date.now()
    return memoryRateLimit(identifier, requests, windowMs, now + windowMs)
  }
}

// Middleware helper
export function createRateLimitResponse(result: RateLimitResult): NextResponse {
  if (!result.success) {
    return NextResponse.json(
      { error: result.error || 'Too many requests' },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': result.limit.toString(),
          'X-RateLimit-Remaining': result.remaining.toString(),
          'X-RateLimit-Reset': result.reset.toString(),
          'Retry-After': Math.ceil((result.reset - Date.now()) / 1000).toString()
        }
      }
    )
  }
  
  return NextResponse.next({
    headers: {
      'X-RateLimit-Limit': result.limit.toString(),
      'X-RateLimit-Remaining': result.remaining.toString(),
      'X-RateLimit-Reset': result.reset.toString()
    }
  })
}

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of memoryStore.entries()) {
    if (value.resetTime <= now) {
      memoryStore.delete(key)
    }
  }
}, 60000) // Clean up every minute
