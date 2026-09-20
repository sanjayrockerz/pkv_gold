import { createHmac, timingSafeEqual } from 'node:crypto';

const secret = process.env.PKV_ADMIN_SECRET;
function signature(value: string) {
  if (!secret) throw new Error('PKV_ADMIN_SECRET is not configured.');
  return createHmac('sha256', secret).update(value).digest('hex');
}
function valid(value: string, expected: string) { const a = Buffer.from(value); const b = Buffer.from(expected); return a.length === b.length && timingSafeEqual(a, b); }
export function makeAdminCookie(username: string) { const token = `${username}:${Date.now()}`; return `${token}.${signature(token)}`; }
export function isAdminCookie(value: string | undefined) { if (!secret || !value) return false; const [token, sig] = value.split('.'); return Boolean(token && sig && valid(sig, signature(token)) && token.startsWith(`${process.env.PKV_ADMIN_USERNAME}:`)); }
