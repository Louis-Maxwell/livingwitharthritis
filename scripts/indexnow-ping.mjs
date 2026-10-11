/** Run explicitly after publication: INDEXNOW=1 node scripts/indexnow-ping.mjs.
 * Notifications aid discovery; they do not guarantee indexing.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const KEY = 'c98cc1e7f04d43b213d256e243f9ddd6';
const HOST = 'livingwitharthritis.org.uk';
const ORIGIN = `https://${HOST}`;
export function sitemapPageUrls(xml) {
  return [...new Set([...xml.matchAll(/<url>[\s\S]*?<loc>([^<]+)<\/loc>[\s\S]*?<\/url>/g)]
    .map((m) => m[1].replace(/&amp;/g, '&')).filter((s) => {
      try { const u = new URL(s); return u.origin === ORIGIN && !u.search && !u.hash; } catch { return false; }
    }))];
}
async function main() {
  const urls = sitemapPageUrls(readFileSync('public/sitemap.xml', 'utf8'));
  if (process.argv.includes('--dry-run')) {
    console.log(`[indexnow] dry run: ${urls.length} canonical sitemap page URLs; no network request`); return;
  }
  // A build is not a deployment. Never notify engines automatically before
  // updated HTML is publicly available, even when NODE_ENV is production.
  if (process.env.INDEXNOW !== '1') {
    console.log('[indexnow] skipped; run npm run indexnow after publication'); return;
  }
  const keyLocation = `${ORIGIN}/${KEY}.txt`;
  const keyResponse = await fetch(keyLocation, { signal: AbortSignal.timeout(15000) });
  if (!keyResponse.ok || (await keyResponse.text()).trim() !== KEY) throw new Error('Published IndexNow key file could not be verified');
  for (let offset = 0; offset < urls.length; offset += 10000) {
    const urlList = urls.slice(offset, offset + 10000);
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation, urlList }), signal: AbortSignal.timeout(20000),
    });
    if (![200, 202].includes(res.status)) throw new Error(`IndexNow rejected notification: HTTP ${res.status}`);
    console.log(`[indexnow] ${urlList.length} URLs notified — HTTP ${res.status}; indexing is not guaranteed`);
  }
}
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main().catch((err) => { console.error('[indexnow]', err.message); process.exitCode = 1; });
}
