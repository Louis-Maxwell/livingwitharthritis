import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sitemapUrls, submitUrls, KEY, ORIGIN } from '../indexnow-ping.mjs';

test('sitemap selection deduplicates canonical URLs and excludes other origins and utility queries', () => {
  const xml = `<urlset>${['/guides/exercise', '/guides/exercise', '/search?q=pain'].map(p => `<url><loc>${ORIGIN}${p}</loc><lastmod>2026-10-11</lastmod></url>`).join('')}<url><loc>https://example.com/</loc></url><url><loc>${ORIGIN}/old</loc><lastmod>2026-01-01</lastmod></url><url><loc>${ORIGIN}/undated</loc></url></urlset>`;
  assert.deepEqual(sitemapUrls(xml, '2026-10-10'), [`${ORIGIN}/guides/exercise`]);
  assert.throws(() => sitemapUrls(xml, 'today'), /YYYY-MM-DD/);
});

test('submission verifies the live key and batches at 10,000 URLs', async () => {
  const batches = [];
  const request = async (url, options) => {
    if (url.endsWith(`${KEY}.txt`)) return new Response(`${KEY}\n`);
    batches.push(JSON.parse(options.body));
    return new Response('', { status: 202 });
  };
  const urls = Array.from({ length: 10001 }, (_, i) => `${ORIGIN}/page-${i}`);
  assert.deepEqual(await submitUrls(urls, request), [202, 202]);
  assert.deepEqual(batches.map(b => b.urlList.length), [10000, 1]);
});

test('invalid live key and rejected submissions fail visibly', async () => {
  await assert.rejects(submitUrls([ORIGIN], async () => new Response('wrong')), /key file/);
  await assert.rejects(submitUrls([ORIGIN], async url => url.endsWith('.txt') ? new Response(KEY) : new Response('', {status: 429})), /HTTP 429/);
});
