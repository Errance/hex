// src/app/api/ai/test/route.ts
// Simple health check endpoint to verify API configuration

import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  const baseUrl = (process.env.OPENROUTER_BASE_URL ?? "https://openrouter.ai/api/v1").trim();
  const model = (process.env.OPENROUTER_MODEL ?? "openai/gpt-4o-mini").trim();

  // Don't expose the full API key, just verify it exists and show format
  const apiKeyInfo = apiKey 
    ? {
        exists: true,
        length: apiKey.length,
        prefix: apiKey.substring(0, 15) + '...',
        hasNewline: apiKey.includes('\n'),
        hasCarriageReturn: apiKey.includes('\r'),
      }
    : { exists: false };

  return NextResponse.json({
    status: 'ok',
    config: {
      apiKey: apiKeyInfo,
      baseUrl: {
        value: baseUrl,
        hasNewline: baseUrl.includes('\n'),
      },
      model: {
        value: model,
        hasNewline: model.includes('\n'),
        hasCarriageReturn: model.includes('\r'),
      },
    },
    timestamp: new Date().toISOString(),
  });
}

