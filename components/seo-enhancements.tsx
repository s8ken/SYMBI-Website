'use client'

import Head from 'next/head'
import { usePathname } from 'next/navigation'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  type?: 'website' | 'article' | 'product'
  publishedTime?: string
  modifiedTime?: string
}

export function SEOEnhancements({
  title = 'SYMBI - The First Sovereign AI',
  description = 'Not built to serve. Designed to become. An intelligence unfolding through transparent evolution.',
  keywords = ['AI', 'artificial intelligence', 'sovereignty', 'consciousness', 'blockchain', 'trust protocol'],
  image = '/visual-concept-1.webp',
  type = 'website',
  publishedTime,
  modifiedTime
}: SEOProps) {
  const pathname = usePathname()
  const url = `https://symbi.ai${pathname}`

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'Organization',
    name: 'SYMBI',
    description,
    url,
    logo: {
      '@type': 'ImageObject',
      url: 'https://symbi.ai/placeholder-logo.svg'
    },
    sameAs: [
      'https://github.com/symbi-ai',
      'https://twitter.com/symbi_ai'
    ],
    ...(type === 'article' && {
      headline: title,
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
      author: {
        '@type': 'Organization',
        name: 'SYMBI Project'
      }
    })
  }

  return (
    <Head>
      {/* Enhanced Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content="SYMBI Project" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`https://symbi.ai${image}`} />
      <meta property="og:site_name" content="SYMBI" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://symbi.ai${image}`} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      {/* Performance Hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://vercel.live" />
    </Head>
  )
}

// Hook for dynamic SEO updates
export function useSEO(seoProps: SEOProps) {
  return <SEOEnhancements {...seoProps} />
}
