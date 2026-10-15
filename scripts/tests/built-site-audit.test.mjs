import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const auditScript = resolve('scripts/audit-built-site.mjs');
const origin = 'https://livingwitharthritis.org.uk';
function audit(body = '', robots = 'index,follow') {
  const cwd = mkdtempSync(join(tmpdir(), 'lwa-built-audit-'));
  try {
    mkdirSync(join(cwd, 'public')); mkdirSync(join(cwd, 'dist'));
    writeFileSync(join(cwd, 'public/sitemap.xml'), `<urlset><url><loc>${origin}/</loc></url></urlset>`);
    writeFileSync(join(cwd, 'public/_redirects'), '');
    writeFileSync(join(cwd, 'dist/index.html'), `<html><head><title>Arthritis support</title>
      <meta name="description" content="Free arthritis support and guidance">
      <meta name="robots" content="${robots}"><link rel="canonical" href="${origin}/">
      <meta property="og:title" content="Arthritis support"><meta name="twitter:card" content="summary_large_image">
      <script type="application/ld+json">{"@type":"WebPage"}</script>
      </head><body><h1>Arthritis support</h1>${body}</body></html>`);
    const result = spawnSync(process.execPath, [auditScript], { cwd, encoding: 'utf8' });
    assert.ifError(result.error);
    const report = JSON.parse(readFileSync(join(cwd, '.preflight-reports/built-site-audit.json'), 'utf8'));
    return { status: result.status, report };
  } finally { rmSync(cwd, { recursive: true, force: true }); }
}

test('clean metadata and structure pass the build gate', () => {
  const result = audit('<a href="/">Home</a>');
  assert.equal(result.status, 0);
  assert.deepEqual(result.report.issues, []);
});
test('unresolved internal links fail the build with their source and destination', () => {
  const result = audit('<a href="/missing-guide">Read guide</a>');
  assert.equal(result.status, 1);
  assert.ok(result.report.issues.some(i => i.path === '/' && i.href === '/missing-guide'));
});
test('accidentally noindexed sitemap pages fail the build', () => {
  const result = audit('', 'noindex,follow');
  assert.equal(result.status, 1);
  assert.ok(result.report.issues.some(i => i.issue === 'Sitemap page is noindex'));
});
