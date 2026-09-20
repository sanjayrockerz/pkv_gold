import fs from 'node:fs/promises';
import path from 'node:path';
import { get, put } from '@vercel/blob';

export type GoldKarat = '24' | '22' | '18';
export type GoldRates = Record<GoldKarat, number>;
export type GoldRate = { rates: GoldRates; effectiveAt: string; updatedAt: string };
const filePath = path.join(process.cwd(), 'data', 'gold-rate.json');
const blobPath = 'gold-rate.json';

function blobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

export async function readGoldRate(): Promise<GoldRate> {
  if (blobConfigured()) {
    const blob = await get(blobPath, { access: 'private', useCache: false });
    if (blob) return normalizeGoldRate(JSON.parse(await new Response(blob.stream).text()));
  }
  return normalizeGoldRate(JSON.parse(await fs.readFile(filePath, 'utf8')));
}

export async function writeGoldRate(rates: GoldRates): Promise<GoldRate> {
  const now = new Date().toISOString();
  const next = { rates, effectiveAt: now, updatedAt: now };
  if (blobConfigured()) {
    await put(blobPath, JSON.stringify(next), {
      access: 'private',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json',
      cacheControlMaxAge: 0,
    });
    return next;
  }
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(next, null, 2), 'utf8');
  return next;
}

function normalizeGoldRate(value: Partial<GoldRate> & { rate?: number }): GoldRate {
  const legacyRate = Number(value.rate) || 0;
  const rates = value.rates ?? { '24': legacyRate, '22': Math.round(legacyRate * 0.916 * 100) / 100, '18': Math.round(legacyRate * 0.75 * 100) / 100 };
  return { rates: { '24': Number(rates['24']) || 0, '22': Number(rates['22']) || 0, '18': Number(rates['18']) || 0 }, effectiveAt: value.effectiveAt ?? new Date().toISOString(), updatedAt: value.updatedAt ?? new Date().toISOString() };
}
