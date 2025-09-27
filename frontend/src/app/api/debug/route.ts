import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    FASTAPI_BASE_URL: process.env.FASTAPI_BASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    hasEnvVar: !!process.env.FASTAPI_BASE_URL,
    allFastApiEnvs: Object.keys(process.env).filter(key => key.includes('FASTAPI')),
    allEnvKeys: Object.keys(process.env).slice(0, 10) // First 10 env vars for reference
  });
}