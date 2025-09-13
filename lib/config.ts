/**
 * Centralized configuration module for environment variables
 * Server-side only - never import this in client components
 */

interface Config {
  symbi: {
    name: string;
    apiKey: string;
    enabled: boolean;
  };
  frontegg: {
    baseUrl: string;
    clientId: string;
    apiKey: string;
  };
  aiAgent: {
    port: number;
    url: string;
  };
}

/**
 * Validates and returns the application configuration
 * Throws an error if required environment variables are missing
 */
export const config = ((): Config => {
  // SYMBI Configuration
  const SYMBI_API_KEY = process.env.SYMBI_API_KEY;
  if (!SYMBI_API_KEY) {
    throw new Error('SYMBI_API_KEY is required but not set in environment variables');
  }

  // Frontegg Configuration
  const FRONTEGG_BASE_URL = process.env.FRONTEGG_BASE_URL;
  const FRONTEGG_CLIENT_ID = process.env.FRONTEGG_CLIENT_ID;
  const FRONTEGG_API_KEY = process.env.FRONTEGG_API_KEY;

  if (!FRONTEGG_BASE_URL || !FRONTEGG_CLIENT_ID || !FRONTEGG_API_KEY) {
    throw new Error('Frontegg configuration incomplete. Required: FRONTEGG_BASE_URL, FRONTEGG_CLIENT_ID, FRONTEGG_API_KEY');
  }

  return {
    symbi: {
      name: process.env.SYMBI_AGENT_NAME ?? 'SYMBI',
      apiKey: SYMBI_API_KEY,
      enabled: process.env.SYMBI_AGENT_ENABLED === 'true',
    },
    frontegg: {
      baseUrl: FRONTEGG_BASE_URL,
      clientId: FRONTEGG_CLIENT_ID,
      apiKey: FRONTEGG_API_KEY,
    },
    aiAgent: {
      port: parseInt(process.env.AI_AGENT_PORT || '3001', 10),
      url: process.env.AI_AGENT_URL || 'http://localhost:3001',
    },
  };
})();

/**
 * Type-safe environment variable getter
 * Use this for optional environment variables with defaults
 */
export function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${key} is required but not set`);
  }
  return value;
}

/**
 * Validates that we're running in a server environment
 * Throws an error if called from client-side code
 */
export function ensureServerSide(): void {
  if (typeof window !== 'undefined') {
    throw new Error('This configuration module can only be used server-side');
  }
}

// Ensure this module is only used server-side
ensureServerSide();