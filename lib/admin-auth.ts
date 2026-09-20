import { createHmac, timingSafeEqual } from 'node:crypto';

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;
function adminSecret() { return process.env.ADMIN_SECRET ?? process.env.PKV_ADMIN_SECRET; }
function adminUsername() { return process.env.ADMIN_USERNAME ?? process.env.PKV_ADMIN_USERNAME; }
function signature(value: string) {
  const secret = adminSecret();
  if (!secret) throw new Error('ADMIN_SECRET is not configured.');
  return createHmac('sha256', secret).update(value).digest('hex');
}
function valid(value: string, expected: string) { const a = Buffer.from(value); const b = Buffer.from(expected); return a.length === b.length && timingSafeEqual(a, b); }
export function makeAdminCookie(username: string) { const token = `${username}:${Date.now()}`; return `${token}.${signature(token)}`; }
export function adminConfigured() {
  const username = adminUsername();
  const password = process.env.ADMIN_PASSWORD ?? process.env.PKV_ADMIN_PASSWORD;
  const secret = adminSecret();
  return Boolean(username && password && secret && !username.startsWith('choose-') && !password.startsWith('choose-') && !secret.startsWith('choose-') && password !== 'change-this-password' && secret !== 'change-this-to-a-long-random-secret');
}
export function isAdminCookie(value: string | undefined) {
  const username = adminUsername();
  const secret = adminSecret();
  if (!secret || !username || !value) return false;
  const [token, sig] = value.split('.');
  const timestamp = token?.slice(token.lastIndexOf(':') + 1);
  const issuedAt = Number(timestamp);
  return Boolean(token && sig && Number.isFinite(issuedAt) && Date.now() - issuedAt < SESSION_MAX_AGE_SECONDS * 1000 && valid(sig, signature(token)) && token.startsWith(`${username}:`));
}
