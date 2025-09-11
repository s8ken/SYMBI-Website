'use client'

import { useEffect } from 'react'
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

interface VitalMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
}

// Performance monitoring component
export function PerformanceMonitor() {
  useEffect(() => {
    // Function to send metrics to analytics
    const sendToAnalytics = (metric: VitalMetric) => {
      // Send to Vercel Analytics if available
      if (typeof window !== 'undefined' && (window as any).va) {
        (window as any).va('track', 'Web Vital', {
          metric: metric.name,
          value: Math.round(metric.value),
          rating: metric.rating
        })
      }
      
      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Performance] ${metric.name}:`, {
          value: `${Math.round(metric.value)}ms`,
          rating: metric.rating,
          delta: `${Math.round(metric.delta)}ms`
        })
      }
    }

    // Collect Core Web Vitals
    getCLS(sendToAnalytics)
    getFID(sendToAnalytics)
    getFCP(sendToAnalytics)
    getLCP(sendToAnalytics)
    getTTFB(sendToAnalytics)

    // Custom performance metrics
    const measureCustomMetrics = () => {
      if (typeof window !== 'undefined' && window.performance) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        
        if (navigation) {
          // DOM Content Loaded
          const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart
          sendToAnalytics({
            name: 'DCL',
            value: domContentLoaded,
            rating: domContentLoaded < 1600 ? 'good' : domContentLoaded < 2500 ? 'needs-improvement' : 'poor',
            delta: 0
          })

          // Page Load Time
          const pageLoadTime = navigation.loadEventEnd - navigation.loadEventStart
          if (pageLoadTime > 0) {
            sendToAnalytics({
              name: 'PLT',
              value: pageLoadTime,
              rating: pageLoadTime < 2500 ? 'good' : pageLoadTime < 4000 ? 'needs-improvement' : 'poor',
              delta: 0
            })
          }
        }
      }
    }

    // Measure custom metrics after page load
    if (document.readyState === 'complete') {
      measureCustomMetrics()
    } else {
      window.addEventListener('load', measureCustomMetrics)
    }

    return () => {
      window.removeEventListener('load', measureCustomMetrics)
    }
  }, [])

  return null // This component doesn't render anything
}

// Hook for performance monitoring
export function usePerformanceMonitor() {
  useEffect(() => {
    // Monitor resource loading
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'resource') {
          const resource = entry as PerformanceResourceTiming
          
          // Log slow resources in development
          if (process.env.NODE_ENV === 'development' && resource.duration > 1000) {
            console.warn(`[Performance] Slow resource: ${resource.name} (${Math.round(resource.duration)}ms)`)
          }
        }
      })
    })

    observer.observe({ entryTypes: ['resource'] })

    return () => observer.disconnect()
  }, [])
}

// Performance budget checker
export function checkPerformanceBudget() {
  if (typeof window === 'undefined') return

  const budget = {
    javascript: 200 * 1024, // 200KB
    css: 50 * 1024, // 50KB
    images: 500 * 1024, // 500KB
    fonts: 100 * 1024 // 100KB
  }

  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
  const usage = {
    javascript: 0,
    css: 0,
    images: 0,
    fonts: 0
  }

  resources.forEach((resource) => {
    const size = resource.transferSize || 0
    const url = resource.name

    if (url.includes('.js')) usage.javascript += size
    else if (url.includes('.css')) usage.css += size
    else if (url.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/)) usage.images += size
    else if (url.match(/\.(woff|woff2|ttf|otf)$/)) usage.fonts += size
  })

  // Check budget violations
  Object.entries(budget).forEach(([type, limit]) => {
    const used = usage[type as keyof typeof usage]
    if (used > limit) {
      console.warn(`[Performance Budget] ${type} exceeded: ${Math.round(used / 1024)}KB / ${Math.round(limit / 1024)}KB`)
    }
  })
}
