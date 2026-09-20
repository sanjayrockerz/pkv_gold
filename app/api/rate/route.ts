import { NextResponse } from 'next/server';
import { readGoldRate } from '@/lib/rate-store';

export async function GET() {
  const { rates, updatedAt } = await readGoldRate();
  return NextResponse.json({ rates, updatedAt }, { headers: { 'Cache-Control': 'no-store' } });
}
