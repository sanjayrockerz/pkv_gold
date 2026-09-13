import fs from 'node:fs/promises';
import path from 'node:path';
import { get, put } from '@vercel/blob';

export type GoldRate = { rate: number; effectiveAt: string; updatedAt: string };
const filePath = path.join(process.cwd(), 'data', 'gold-rate.json');
const blobPath = 'gold-rate.json';

function blobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

export async function readGoldRate(): Promise<GoldRate> {
  if (blobConfigured()) {
    const blob = await get(blobPath, { access: 'private', useCache: false });
    if (blob) return JSON.parse(await new Response(blob.stream).text()) as GoldRate;
  }
  return JSON.parse(await fs.readFile(filePath, 'utf8')) as GoldRate;
}

export async function writeGoldRate(rate: number): Promise<GoldRate> {
  const now = new Date().toISOString();
  const next = { rate, effectiveAt: now, updatedAt: now };
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
