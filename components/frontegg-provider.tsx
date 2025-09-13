'use client'

import { FronteggBaseProvider } from '@frontegg/nextjs'
import { ReactNode } from 'react'

interface FronteggProviderWrapperProps {
  children: ReactNode
}

// Type assertion for Frontegg provider
const FronteggProvider = FronteggBaseProvider as any

export function FronteggProviderWrapper({ children }: FronteggProviderWrapperProps) {
  return (
    <FronteggProvider
      envAppUrl={process.env.NEXT_PUBLIC_FRONTEGG_APP_URL!}
      envBaseUrl={process.env.NEXT_PUBLIC_FRONTEGG_BASE_URL!}
      envClientId={process.env.NEXT_PUBLIC_FRONTEGG_CLIENT_ID!}
      router={{} as any}
    >
      {children}
    </FronteggProvider>
  )
}