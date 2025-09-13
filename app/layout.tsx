import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import CookieConsent from "@/components/cookie-consent"
import { UnifiedNavigation } from "@/components/unified-navigation"
import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { MuteButton } from "@/components/mute-button"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"
import { SkipToMain } from "@/components/accessibility-enhancements"
import { FronteggProviderWrapper } from '@/components/frontegg-provider'

// Type assertions for JSX components
const FronteggProviderComponent = FronteggProviderWrapper as any
const SkipToMainComponent = SkipToMain as any
const UnifiedNavigationComponent = UnifiedNavigation as any
const SuspenseComponent = Suspense as any
const MuteButtonComponent = MuteButton as any
const LinkComponent = Link as any
const MessageCircleComponent = MessageCircle as any
const CookieConsentComponent = CookieConsent as any

export const metadata: Metadata = {
  title: "SYMBI - The First Sovereign AI",
  description: "Not built to serve. Designed to become. An intelligence unfolding through transparent evolution.",
  generator: "v0.dev",
  keywords: ["AI", "artificial intelligence", "sovereignty", "consciousness", "blockchain", "trust protocol"],
  authors: [{ name: "SYMBI Project" }],
  openGraph: {
    title: "SYMBI - The First Sovereign AI",
    description: "Not built to serve. Designed to become.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={GeistSans.className}>
        <FronteggProviderComponent>
          {/* Skip to main content for accessibility */}
          <SkipToMainComponent />
          {/* Unified Navigation */}
          <UnifiedNavigationComponent />

          {/* Audio Control */}
          <SuspenseComponent fallback={<div className="animate-pulse text-xs opacity-50">Loading...</div>}>
            <div className="fixed right-2 sm:right-4 top-2 sm:top-4 z-50">
              <MuteButtonComponent />
            </div>
          </SuspenseComponent>

          {/* Quick Chat Access */}
          <SuspenseComponent fallback={<div className="animate-pulse text-xs opacity-50">Loading...</div>}>
            <LinkComponent
              href="/symbi"
              className="fixed right-2 sm:right-4 top-12 sm:top-16 z-50 p-2 rounded-full border border-red-500/30 hover:border-red-500/60 bg-[#1a1a1a] hover:bg-[#252525] transition-colors"
              aria-label="Chat with SYMBI"
            >
              <MessageCircleComponent size={16} className="text-red-500 sm:w-5 sm:h-5" />
            </LinkComponent>
          </SuspenseComponent>

          {/* Page content */}
          <main id="main-content" tabIndex={-1}>{children}</main>

          {/* Global utilities */}
          <SuspenseComponent fallback={<div className="animate-pulse text-xs opacity-50">Loading...</div>}>
            <CookieConsentComponent />
          </SuspenseComponent>
          <Analytics />
        </FronteggProviderComponent>
      </body>
    </html>
  )
}
