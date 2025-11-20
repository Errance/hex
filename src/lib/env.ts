// src/lib/env.ts
// Centralized environment variable management

/**
 * Server-side environment variables
 * Only available in API routes and server components
 */
export const serverEnv = {
  openRouter: {
    apiKey: process.env.OPENROUTER_API_KEY?.trim() || '',
    baseUrl: process.env.OPENROUTER_BASE_URL?.trim() || 'https://openrouter.ai/api/v1',
    model: process.env.OPENROUTER_MODEL?.trim() || 'openai/gpt-4o-mini',
  },
} as const;

/**
 * Client-side environment variables
 * Can be used in both client and server
 */
export const clientEnv = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL?.trim() || 'http://localhost:3000',
} as const;

/**
 * Validate required environment variables
 * Call this in API routes to ensure config is valid
 */
export function validateServerEnv(): { valid: boolean; error?: string } {
  if (!serverEnv.openRouter.apiKey) {
    return {
      valid: false,
      error: 'OPENROUTER_API_KEY is not configured',
    };
  }

  if (serverEnv.openRouter.apiKey.length < 20) {
    return {
      valid: false,
      error: 'OPENROUTER_API_KEY appears to be invalid',
    };
  }

  return { valid: true };
}

/**
 * Get safe config info for logging (without exposing secrets)
 */
export function getConfigInfo() {
  return {
    hasApiKey: !!serverEnv.openRouter.apiKey,
    apiKeyLength: serverEnv.openRouter.apiKey.length,
    apiKeyPrefix: serverEnv.openRouter.apiKey.substring(0, 15) + '...',
    baseUrl: serverEnv.openRouter.baseUrl,
    model: serverEnv.openRouter.model,
    appUrl: clientEnv.appUrl,
  };
}

