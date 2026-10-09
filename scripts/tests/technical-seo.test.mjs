import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { enrichSitemapImages } from '../enrich-sitemap-images.mjs';
import { headDataFor } from '../inject-canonicals.mjs';

const SITE = 'https://livingwitharthritis.org.uk';
const audit = resolve('scripts/audit-sitemap.mjs');
const html = (path, extra = '') => `<html><head><title>Unique guide ${path}</title><link rel="canonical" href="${SITE}${path}">${extra}</head><body><h1>Guide ${path}</h1></body></html>`;

test('blog archive is an indexable collection while unknown article slugs stay noindex', () => {
  const archive = headDataFor('/blog/archive');
  assert.equal(archive.noindex, false);
  assert.match(archive.bodyHtml, /href="\/blog\//);
  assert.doesNotMatch(archive.title, /Page not found/);
  assert.equal(headDataFor('/blog/__missing_article__').noindex, true);
});

test('sitemap audit fails on redirects, noindex, duplicate canonical and soft 404 responses', async () => {
  const root = mkdtempSync(join(tmpdir(), 'lwa-audit-'));
  mkdirSync(join(root, 'public'));
  writeFileSync(join(root, 'index.html'), '<title>Homepage</title><h1>Home</h1>');
  const server = createServer((req, res) => {
    const path = req.url;
    res.setHeader('content-type', 'text/html');
    if (path === '/redirect') { res.writeHead(301, { location: '/good' }); res.end(); return; }
    if (path === '/blocked') res.setHeader('x-robots-tag', 'googlebot: noindex');
    if (path === '/error') { res.writeHead(500); res.end(); return; }
    if (path === '/soft404') { res.end('<title>Homepage</title><h1>Home</h1>'); return; }
    if (path === '/duplicate') { res.end(html(path, `<link rel="canonical" href="${SITE}${path}">`)); return; }
    if (path === '/meta-noindex') { res.end(html(path, '<meta content="noindex,follow" name="robots">')); return; }
    if (path === '/with-boot-hero') { res.end(`<title>Unique guide</title><link rel="canonical" href="${SITE}${path}"><div hidden><h1>Home</h1></div><article id="static-article"><h1>Actual route content</h1></article>`); return; }
    res.end(html(path));
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const base = `http://127.0.0.1:${server.address().port}`;
  async function run(paths) {
    writeFileSync(join(root, 'public/sitemap.xml'), `<urlset>${paths.map((p) => `<url><loc>${SITE}${p}</loc></url>`).join('')}</urlset>`);
    const report = join(root, 'report.json');
    const child = spawn(process.execPath, [audit, base, '2', report], { cwd: root, stdio: 'ignore' });
    const code = await new Promise((r, reject) => { child.on('exit', r); child.on('error', reject); });
    return { code, report: JSON.parse(readFileSync(report, 'utf8')) };
  }
  try {
    const good = await run(['/good', '/with-boot-hero']);
    assert.equal(good.code, 0);
    const bad = await run(['/good', '/redirect', '/blocked', '/meta-noindex', '/duplicate', '/soft404', '/error']);
    assert.equal(bad.code, 1);
    assert.equal(bad.report.broken, 6);
    assert.deepEqual(new Set(bad.report.items.map((x) => x.reason)), new Set(['redirect', 'noindex-in-sitemap', 'multiple-canonicals', 'homepage-fallback', 'http-error']));
    assert.equal((await run([])).code, 1, 'empty sitemap must not pass');
  } finally {
    await new Promise((r) => server.close(r));
    rmSync(root, { recursive: true, force: true });
  }
});

test('image sitemap uses only existing mapped covers and is safe to regenerate', () => {
  const root = mkdtempSync(join(tmpdir(), 'lwa-images-'));
  mkdirSync(join(root, 'openverse'));
  writeFileSync(join(root, 'openverse/knee-exercise.webp'), 'fixture');
  const xml = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${SITE}/blog/knee-guide</loc></url><url><loc>${SITE}/about</loc></url></urlset>`;
  try {
    const covers = { 'knee-guide': 'knee-exercise.webp' };
    const result = enrichSitemapImages(xml, covers, root);
    assert.equal(result.count, 1);
    assert.match(result.xml, /xmlns:image=/);
    assert.match(result.xml, /<image:loc>https:\/\/livingwitharthritis.org.uk\/openverse\/knee-exercise.webp/);
    assert.equal(enrichSitemapImages(result.xml, covers, root).xml, result.xml);
    assert.equal(enrichSitemapImages(xml, { 'knee-guide': '../outside.webp' }, root).count, 0);
    assert.throws(() => enrichSitemapImages(xml, { 'knee-guide': 'missing.webp' }, root), /Missing mapped cover/);
  } finally { rmSync(root, { recursive: true, force: true }); }
});
