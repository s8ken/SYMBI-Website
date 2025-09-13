import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import DiscordProvider from "next-auth/providers/discord"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token
        token.provider = account.provider
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      session.provider = token.provider as string
      return session
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
}

// OAuth Callback URIs for different environments
export const getCallbackURIs = () => {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  
  return {
    google: `${baseUrl}/api/auth/callback/google`,
    github: `${baseUrl}/api/auth/callback/github`,
    discord: `${baseUrl}/api/auth/callback/discord`,
  }
}

// Environment-specific callback URIs
export const CALLBACK_URIS = {
  development: {
    google: 'http://localhost:3000/api/auth/callback/google',
    github: 'http://localhost:3000/api/auth/callback/github',
    discord: 'http://localhost:3000/api/auth/callback/discord',
  },
  production: {
    google: 'https://symbi.world/api/auth/callback/google',
    github: 'https://symbi.world/api/auth/callback/github',
    discord: 'https://symbi.world/api/auth/callback/discord',
  }
}