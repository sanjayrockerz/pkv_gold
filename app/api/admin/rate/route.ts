import { NextRequest, NextResponse } from 'next/server';
import { readGoldRate, writeGoldRate } from '@/lib/rate-store';
import { isAdminCookie } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  if (!isAdminCookie(request.cookies.get('pkv_admin')?.value)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(await readGoldRate(), { headers: { 'Cache-Control': 'no-store' } });
}
export async function PUT(request: NextRequest) {
  if (!isAdminCookie(request.cookies.get('pkv_admin')?.value)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const rate = Number(body.rate);
  if (!Number.isFinite(rate) || rate <= 0 || rate > 1000000) return NextResponse.json({ error: 'Enter a valid rate.' }, { status: 400 });
  return NextResponse.json(await writeGoldRate(Math.round(rate * 100) / 100));
}
