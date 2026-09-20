import { NextResponse } from 'next/server';
import { adminConfigured, makeAdminCookie } from '@/lib/admin-auth';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const username = process.env.ADMIN_USERNAME ?? process.env.PKV_ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD ?? process.env.PKV_ADMIN_PASSWORD;
  if (!username || !password || !adminConfigured()) {
    return NextResponse.json({ error: 'Admin access is not configured. Add ADMIN_USERNAME, ADMIN_PASSWORD and ADMIN_SECRET to .env.local, then restart the server.' }, { status: 503 });
  }
  if (body.username !== username || body.password !== password) return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set('pkv_admin', makeAdminCookie(username), { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 8 });
  return response;
}
