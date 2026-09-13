import { NextResponse } from 'next/server';
import { readGoldRate } from '@/lib/rate-store';

export async function GET() {
  return NextResponse.json(await readGoldRate(), { headers: { 'Cache-Control': 'no-store' } });
}
