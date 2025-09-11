'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// Skip to main content link
export function SkipToMain() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-[9999] font-medium shadow-lg border-2 border-blue-700 hover:bg-blue-700 transition-colors"
    >
      Skip to main content
    </a>
  )
}

// Focus management for route changes
export function FocusManager() {
  const router = useRouter()
  
  useEffect(() => {
    const handleRouteChange = () => {
      // Focus the main content area after route change
      const mainContent = document.getElementById('main-content')
      if (mainContent) {
        mainContent.focus()
      }
    }
    
    // Listen for route changes
    const originalPush = router.push
    router.push = (...args) => {
      const result = originalPush.apply(router, args)
      setTimeout(handleRouteChange, 100)
      return result
    }
    
    return () => {
      router.push = originalPush
    }
  }, [router])
  
  return null
}

// Reduced motion preferences
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])
  
  return prefersReducedMotion
}

// High contrast mode detection
export function useHighContrast() {
  const [highContrast, setHighContrast] = useState(false)
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)')
    setHighContrast(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setHighContrast(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])
  
  return highContrast
}

// Accessible button component
interface AccessibleButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  ariaLabel?: string
  ariaDescribedBy?: string
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export function AccessibleButton({
  children,
  onClick,
  disabled = false,
  ariaLabel,
  ariaDescribedBy,
  className = '',
  type = 'button'
}: AccessibleButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      className={`
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-200
        ${className}
      `}
    >
      {children}
    </button>
  )
}

// Live region for announcements
export function LiveRegion({ message, priority = 'polite' }: { 
  message: string
  priority?: 'polite' | 'assertive' 
}) {
  return (
    <div
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  )
}
