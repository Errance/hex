// src/app/api/ai/test/route.ts
// Simple health check endpoint to verify API configuration

import { NextResponse } from "next/server";
import { getConfigInfo, validateServerEnv } from "@/lib/env";

export async function GET() {
  const configInfo = getConfigInfo();
  const validation = validateServerEnv();

  return NextResponse.json({
    status: validation.valid ? 'ok' : 'error',
    validation,
    config: configInfo,
    timestamp: new Date().toISOString(),
  });
}

