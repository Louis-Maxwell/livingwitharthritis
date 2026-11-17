/** The existing IndexNow sender, gated by a matching production build identity. */
import { execFileSync } from 'node:child_process';
import { appendFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { ORIGIN, sitemapUrls, submitUrls } from './indexnow-ping.mjs';

const git = (...args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 5 * 1024 * 1024 }).trim();
const summary = (text) => {
  console.log(text);
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, text + '\n');
};

/** Only explicitly changed published blog sources and modification-ledger entries. No blanket resubmit. */
export function changedPaths(files, readCurrent, readPrevious) {
  const paths = new Set();
  for (const file of files) {
    if (/^src\/content\/blog\/posts\/[a-z0-9-]+\.json$/.test(file)) {
      const post = readCurrent(file);
      if (post && post.is_published !== false && /^[a-z0-9-]+$/.test(post.slug || '')) paths.add(`/blog/${post.slug}`);
    }
  }
  const ledger = 'src/data/content-modifications.json';
  if (files.includes(ledger)) {
    const current = readCurrent(ledger) || {};
    const previous = readPrevious(ledger) || {};
    for (const [path, entry] of Object.entries(current)) {
      if (/^\/[a-z0-9/-]+$/.test(path) && !path.includes('//') && JSON.stringify(entry) !== JSON.stringify(previous[path])) paths.add(path);
    }
  }
  return [...paths].sort();
}

export function pageIsPublished(html, url, revision) {
  const canonical = [...html.matchAll(/<link\b[^>]*>/gi)].find(([tag]) => /\brel=["']canonical["']/i.test(tag))?.[0];
  const href = canonical?.match(/\bhref=["']([^"']+)["']/i)?.[1];
  const blocked = [...html.matchAll(/<meta\b[^>]*>/gi)].some(([tag]) => /\bname=["'](?:robots|bingbot)["']/i.test(tag) && /\bcontent=["'][^"']*noindex/i.test(tag));
  const pageRevision = [...html.matchAll(/<meta\b[^>]*>/gi)].find(([tag]) => /\bname=["']lwa-build-revision["']/i.test(tag))?.[0].match(/\bcontent=["']([^"']+)["']/i)?.[1];
  return href === url && !blocked && pageRevision === revision;
}

export async function verifyPublication(revision, urls, request = fetch) {
  if (!/^[a-f0-9]{40}$/.test(revision)) throw new Error('Expected revision must be a full Git SHA');
  const marker = await request(`${ORIGIN}/?revision=${revision}`, { redirect: 'error', cache: 'no-store', signal: AbortSignal.timeout(15000) });
  if (!marker.ok || !pageIsPublished(await marker.text(), `${ORIGIN}/`, revision)) return false;
  const sitemap = await request(`${ORIGIN}/sitemap.xml`, { redirect: 'error', cache: 'no-store', signal: AbortSignal.timeout(15000) });
  if (!sitemap.ok) return false;
  const canonicalUrls = new Set(sitemapUrls(await sitemap.text()));
  for (const url of urls) {
    if (!canonicalUrls.has(url)) return false;
    const page = await request(url, { redirect: 'error', cache: 'no-store', signal: AbortSignal.timeout(15000) });
    if (!page.ok || /noindex/i.test(page.headers.get('x-robots-tag') || '') || !pageIsPublished(await page.text(), url, revision)) return false;
  }
  return true;
}

async function main() {
  const revision = process.env.EXPECTED_REVISION || git('rev-parse', 'HEAD');
  if (!/^[a-f0-9]{40}$/.test(revision) || revision !== git('rev-parse', 'HEAD')) throw new Error('Checkout does not match expected revision');
  const files = git('diff', '--name-only', `${revision}^`, revision).split('\n').filter(Boolean);
  const readAt = (ref, file) => { try { return JSON.parse(git('show', `${ref}:${file}`)); } catch { return null; } };
  const paths = changedPaths(files, file => readAt(revision, file), file => readAt(`${revision}^`, file));
  if (!paths.length) return summary('## IndexNow: no changed blog or modification-ledger URLs to notify.');
  if (paths.length > 100) throw new Error('More than 100 changed URLs: review the batch before submitting');
  const urls = paths.map(path => ORIGIN + path);
  if (process.env.INDEXNOW !== '1') return summary(`## IndexNow dry run: ${urls.length} changed URLs. No submission.\n${urls.join('\n')}`);
  const maxWait = Number(process.env.PUBLICATION_WAIT_SECONDS || 1200);
  if (!Number.isFinite(maxWait) || maxWait < 0 || maxWait > 1200) throw new Error('Publication wait must be 0 to 1200 seconds');
  const deadline = Date.now() + maxWait * 1000;
  do {
    let published = false;
    try {
      published = await verifyPublication(revision, urls);
    } catch (error) { console.log(`[publication check] ${error.message}`); }
    if (published) {
      // Submit only once. An uncertain network response must not cause automatic retries.
      const statuses = await submitUrls(urls);
      return summary(`## IndexNow: ${urls.length} changed, live canonical URLs accepted for processing.\nRevision: ${revision}\nHTTP: ${statuses.join(', ')}\nThis is not a claim of indexing, rankings or visits.\n${urls.join('\n')}`);
    }
    if (Date.now() >= deadline) break;
    await new Promise(done => setTimeout(done, Math.min(60000, deadline - Date.now())));
  } while (Date.now() <= deadline);
  summary(`## IndexNow NOT SENT: production publication of ${revision} was not verified within the bounded wait.\nRe-run Publish readiness after publication. No unpublished URLs were announced.`);
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) main().catch(error => { console.error(error.message); process.exitCode = 1; });
