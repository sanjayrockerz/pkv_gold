import { NextResponse } from 'next/server';
import { makeAdminCookie } from '@/lib/admin-auth';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const username = process.env.PKV_ADMIN_USERNAME;
  const password = process.env.PKV_ADMIN_PASSWORD;
  if (!username || !password || body.username !== username || body.password !== password) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set('pkv_admin', makeAdminCookie(username), { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 8 });
  return response;
}
