import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { inspectInventoryHtml } from '../lib/inventory-signals.mjs';

const url = 'https://livingwitharthritis.org.uk/guide';
describe('parser-based inventory signals', () => {
  it('reads DOM attributes and ignores fake tags in scripts, comments and templates', () => {
    const html = `<!doctype html><title>Care &amp; support</title>
      <meta content='noindex,follow' name=robots><meta name=description content='A > B'>
      <link href='/guide' rel='alternate canonical'>
      <main><h1>One <span>heading</span></h1><h2>Two</h2><img alt=''><img src=x>
      <a href=/next>next</a><a href='//other.example/x'>other</a>
      <a href='https://livingwitharthritis.org.uk.evil.example'>trap</a><a href='mailto:a@example.com'>mail</a>
      <script>const fake = '<h2>fake</h2><img><a href="/bad">';</script>
      <!-- <h2>comment</h2><img> --><template><img><h2>hidden</h2></template></main>`;
    const result = inspectInventoryHtml(html, url);
    expect(result).toMatchObject({ title: 'Care & support', h1: 'One heading', description: 'A > B', robots: 'noindex,follow', canonicalMatchesUrl: true, h2Count: 1, imageCount: 2, imagesMissingAlt: 1, internalLinkCount: 1, externalLinkCount: 2 });
    expect(result.htmlBytes).toBe(Buffer.byteLength(html));
  });
  it('handles missing/invalid canonicals and graph or multi-type schemas', () => {
    const html = `<script type='application/ld+json'>{"@graph":[{"@type":["Article","MedicalWebPage"]},{"@type":"Organization"}]}</script><script type='application/ld+json'>invalid</script><main>Safety &amp; advice<script>never count this</script><style>nor this</style></main>`;
    expect(inspectInventoryHtml(html, url)).toMatchObject({ canonicalMatchesUrl: false, articleWordCount: 2, structuredDataTypes: 'Article|MedicalWebPage|Organization' });
    expect(inspectInventoryHtml('<link rel=canonical href="http://[">', url).canonicalMatchesUrl).toBe(false);
    expect(inspectInventoryHtml('<link rel=canonical href="   ">', url).canonicalMatchesUrl).toBe(false);
  });
  it('counts relative and same-origin links without accepting a matching hostname prefix', () => {
    const html = `<a href='../'>root</a><a href='#a'>anchor</a><a href='https://livingwitharthritis.org.uk/next'>same</a><a href='javascript:void(0)'>no</a><a href=''>empty</a>`;
    expect(inspectInventoryHtml(html, url)).toMatchObject({ internalLinkCount: 3, externalLinkCount: 0 });
  });
});


describe('inventory CSV generator wiring', () => {
  it('reads both route directories and direct HTML resources, and pads missing/redirect rows', () => {
    const temp = mkdtempSync(join(tmpdir(), 'lwa-inventory-'));
    try {
      mkdirSync(join(temp, 'public'), { recursive: true });
      mkdirSync(join(temp, 'docs/seo'), { recursive: true });
      mkdirSync(join(temp, 'dist/resources'), { recursive: true });
      writeFileSync(join(temp, 'public/sitemap.xml'), '<urlset><url><loc>https://livingwitharthritis.org.uk/</loc></url><url><loc>https://livingwitharthritis.org.uk/resources/map.html</loc></url><url><loc>https://livingwitharthritis.org.uk/missing</loc></url></urlset>');
      writeFileSync(join(temp, 'docs/seo/redirect-map.csv'), 'from,to,code,type\n/old,/new,301,client-side-replace\n');
      writeFileSync(join(temp, 'dist/index.html'), '<title>Home</title><meta name=robots content=noindex><main><h2>Help</h2></main>');
      writeFileSync(join(temp, 'dist/resources/map.html'), '<title>Map</title><main>Joint map</main>');
      const result = spawnSync(process.execPath, [resolve('scripts/generate-seo-inventory.mjs'), 'dist', 'out.csv'], { cwd: temp, encoding: 'utf8' });
      expect(result.status, result.stderr).toBe(0);
      const rows = readFileSync(join(temp, 'out.csv'), 'utf8').trim().split('\n').map(line => JSON.parse('[' + line + ']'));
      expect(rows).toHaveLength(5);
      expect(rows.every(row => row.length === rows[0].length)).toBe(true);
      const objects = rows.slice(1).map(row => Object.fromEntries(rows[0].map((key, i) => [key, row[i]])));
      expect(objects[0]).toMatchObject({ status: 'present-prerender-output', indexability: 'noindex', h2_count: '1' });
      expect(objects[1]).toMatchObject({ status: 'present-prerender-output', title: 'Map' });
      expect(objects[2].status).toBe('missing-prerender-output');
      expect(objects[3]).toMatchObject({ status: 'client-side-replace', redirect_target: 'https://livingwitharthritis.org.uk/new' });
    } finally { rmSync(temp, { recursive: true, force: true }); }
  });
});
