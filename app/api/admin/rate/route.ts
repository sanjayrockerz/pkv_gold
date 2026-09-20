import { NextRequest, NextResponse } from 'next/server';
import { readGoldRate, writeGoldRate, type GoldRates } from '@/lib/rate-store';
import { isAdminCookie } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  if (!isAdminCookie(request.cookies.get('pkv_admin')?.value)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(await readGoldRate(), { headers: { 'Cache-Control': 'no-store' } });
}
async function updateRates(request: NextRequest) {
  if (!isAdminCookie(request.cookies.get('pkv_admin')?.value)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  try {
    const rates = ['24', '22', '18'].reduce((result, karat) => {
      const value = Number(body.rates?.[karat]);
      if (!Number.isFinite(value) || value <= 0 || value > 1000000) throw new Error('Enter a valid rate for every karat.');
      result[karat as keyof GoldRates] = Math.round(value * 100) / 100;
      return result;
    }, {} as GoldRates);
    return NextResponse.json(await writeGoldRate(rates));
  } catch { return NextResponse.json({ error: 'Enter a valid rate for every karat.' }, { status: 400 }); }
}
export const POST = updateRates;
export const PUT = updateRates;
