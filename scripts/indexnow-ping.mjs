/** Notify participating IndexNow engines only after the URLs are published.
 * Explicit opt-in avoids announcing unpublished local builds.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export const KEY = 'c98cc1e7f04d43b213d256e243f9ddd6';
export const HOST = 'livingwitharthritis.org.uk';
export const ORIGIN = `https://${HOST}`;

/** Use the canonical sitemap, not a hand-maintained list of aliases. */
export function sitemapUrls(xml, since) {
  if (since && !/^\d{4}-\d{2}-\d{2}$/.test(since)) throw new Error('INDEXNOW_SINCE must be YYYY-MM-DD');
  const urls = new Set();
  for (const entry of xml.matchAll(/<url\b[^>]*>([\s\S]*?)<\/url>/g)) {
    const loc = entry[1].match(/<loc>\s*([^<]+)\s*<\/loc>/)?.[1]?.trim();
    const modified = entry[1].match(/<lastmod>\s*([^<]+)\s*<\/lastmod>/)?.[1]?.trim();
    if (since && (!modified || modified.slice(0, 10) < since)) continue;
    if (!loc) continue;
    const url = new URL(loc.replace(/&amp;/g, '&'));
    if (url.origin !== ORIGIN || url.username || url.password || url.search || url.hash) continue;
    urls.add(url.href);
  }
  return [...urls];
}

export async function submitUrls(urls, request = fetch) {
  if (!urls.length) return [];
  const keyLocation = `${ORIGIN}/${KEY}.txt`;
  const keyResponse = await request(keyLocation, { redirect: 'error', signal: AbortSignal.timeout(15000) });
  if (!keyResponse.ok || (await keyResponse.text()).trim() !== KEY) {
    throw new Error('Live IndexNow key file is missing or invalid; publish it before submitting');
  }
  const statuses = [];
  for (let i = 0; i < urls.length; i += 10000) {
    const batch = urls.slice(i, i + 10000);
    const response = await request('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      signal: AbortSignal.timeout(20000),
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation, urlList: batch }),
    });
    if (![200, 202].includes(response.status)) throw new Error(`IndexNow rejected ${batch.length} URLs: HTTP ${response.status}`);
    statuses.push(response.status);
    console.log(`[indexnow] ${batch.length} URLs accepted for processing — HTTP ${response.status} (indexing is not guaranteed)`);
  }
  return statuses;
}

async function main() {
  if (process.env.INDEXNOW !== '1' && process.env.INDEXNOW_DRY_RUN !== '1') {
    console.log('[indexnow] skipped; run INDEXNOW=1 after publication');
    return;
  }
  const xml = readFileSync(resolve(process.env.INDEXNOW_SITEMAP || 'public/sitemap.xml'), 'utf8');
  const urls = sitemapUrls(xml, process.env.INDEXNOW_SINCE);
  if (process.env.INDEXNOW_DRY_RUN === '1') {
    console.log(JSON.stringify({ host: HOST, count: urls.length, urlList: urls }, null, 2));
    return;
  }
  await submitUrls(urls);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((error) => { console.error('[indexnow]', error.message); process.exitCode = 1; });
}
