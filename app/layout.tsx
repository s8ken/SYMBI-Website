import type React from "react"
import type { Metadata } from "next"
import { Work_Sans, Open_Sans } from "next/font/google"
import "./globals.css"

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
})

export const metadata: Metadata = {
  title: "YseekU - Applied Intelligence for a Shared Future",
  description:
    "Advancing collaborative intelligence through academic research and real-world applications. Building the future of applied AI with institutional partnerships.",
  generator: "v0.dev",
  keywords: [
    "applied intelligence",
    "AI research",
    "academic partnerships",
    "collaborative intelligence",
    "institutional AI",
  ],
  authors: [{ name: "YseekU Research Collective" }],
  openGraph: {
    title: "YseekU - Applied Intelligence for a Shared Future",
    description: "Advancing collaborative intelligence through academic research and real-world applications.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${workSans.variable} ${openSans.variable}`}>
      <body>
        <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-primary academic-heading">YseekU</h1>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a href="#intelligence" className="text-muted-foreground hover:text-primary transition-colors">
                  Intelligence
                </a>
                <a href="#academia" className="text-muted-foreground hover:text-primary transition-colors">
                  Academia
                </a>
                <a href="#creative" className="text-muted-foreground hover:text-primary transition-colors">
                  Creative
                </a>
                <a href="#community" className="text-muted-foreground hover:text-primary transition-colors">
                  Community
                </a>
                <a href="#contact" className="primary-button">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Page content */}
        <main>{children}</main>
      </body>
    </html>
  )
}
