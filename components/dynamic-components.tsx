'use client'

import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

// Lazy load heavy components with loading fallbacks
export const LazyKaleidoscope = dynamic(() => import('./kaleidoscope'), {
  loading: () => (
    <div className="flex items-center justify-center h-64 bg-gray-900 rounded-lg">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
    </div>
  ),
  ssr: false // Disable SSR for client-only components
})

export const LazyWolframSecrets = dynamic(() => import('./wolfram-secrets'), {
  loading: () => (
    <div className="flex items-center justify-center h-32 bg-gray-900 rounded-lg">
      <div className="text-gray-400">Loading interactive content...</div>
    </div>
  ),
  ssr: false
})

export const LazyGames = dynamic(() => import('./games'), {
  loading: () => (
    <div className="flex items-center justify-center h-48 bg-gray-900 rounded-lg">
      <div className="text-gray-400">Loading games...</div>
    </div>
  ),
  ssr: false
})

// Higher-order component for lazy loading any component
export function withLazyLoading<T extends object>(
  importFunc: () => Promise<{ default: ComponentType<T> }>,
  fallback?: ComponentType
) {
  const LazyComponent = dynamic(importFunc, {
    loading: fallback ? () => <fallback /> : () => (
      <div className="flex items-center justify-center p-4">
        <div className="animate-pulse bg-gray-800 rounded h-4 w-32"></div>
      </div>
    ),
    ssr: false
  })

  return LazyComponent
}
