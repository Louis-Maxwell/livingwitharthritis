#!/usr/bin/env node
/**
 * Runtime JSON-LD validator.
 * Loads each route in a headless browser, waits for hydration, then extracts
 * every <script type="application/ld+json"> from document.head. JSON.parses it
 * and runs Google's required-field checks per @type.
 *
 * Usage:
 *   BASE_URL=https://id-preview--<id>.lovable.app node scripts/validate-jsonld.mjs
 *   BASE_URL=http://localhost:8080 node scripts/validate-jsonld.mjs
 */
import fs from 'fs';
import { execSync } from 'child_process';

const BASE_URL = (process.env.BASE_URL || 'http://localhost:8080').replace(/\/$/, '');
const PROD_HOST = 'https://livingwitharthritis.org.uk';

const routes = execSync("grep -oE '<loc>[^<]+</loc>' public/sitemap.xml | sed 's|</*loc>||g'", { encoding: 'utf8' })
  .trim().split('\n').map(u => u.replace(PROD_HOST, '') || '/');
// Add product route example
if (!routes.includes('/product/comp-1')) routes.push('/product/comp-1');

const REQUIRED = {
  Product: ['name', 'image', 'offers', 'brand', ['sku','gtin','mpn']],
  Article: ['headline', 'author', 'datePublished', 'image'],
  NewsArticle: ['headline', 'author', 'datePublished', 'image'],
  BlogPosting: ['headline', 'author', 'datePublished', 'image'],
  MedicalWebPage: [['name','headline']],
  WebPage: [['name','headline']],
  CollectionPage: [['name','headline']],
  Organization: ['name', 'url'],
  MedicalOrganization: ['name', 'url'],
  NGO: ['name', 'url'],
  WebSite: ['name', 'url'],
  BreadcrumbList: ['itemListElement'],
  FAQPage: ['mainEntity'],
  HowTo: ['name', 'step'],
  ItemList: ['itemListElement'],
  MedicalCondition: ['name'],
};

function checkRequired(item, type) {
  const required = REQUIRED[type];
  if (!required) return [];
  const missing = [];
  for (const f of required) {
    if (Array.isArray(f)) {
      if (!f.some(k => item[k] != null)) missing.push(`one of (${f.join('|')})`);
    } else if (item[f] == null) {
      missing.push(f);
    }
  }
  return missing;
}

async function loadPuppeteer() {
  try {
    const m = await import('puppeteer');
    return m.default;
  } catch {
    console.log('Installing puppeteer...');
    execSync('bun add -d puppeteer', { stdio: 'inherit' });
    const m = await import('puppeteer');
    return m.default;
  }
}

const puppeteer = await loadPuppeteer();
const browser = await puppeteer.launch({ args: ['--no-sandbox'], headless: 'new' });
const page = await browser.newPage();

const report = [];

for (const route of routes) {
  const url = BASE_URL + route;
  const entry = { route, url, blocks: [], errors: [], warnings: [] };
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    // Wait for Helmet/useEffect to finish injecting
    await new Promise(r => setTimeout(r, 800));
    const blocks = await page.$$eval('script[type="application/ld+json"]', els => els.map(e => e.textContent || ''));
    for (const raw of blocks) {
      let parsed;
      try { parsed = JSON.parse(raw); }
      catch (e) {
        entry.errors.push({ kind: 'parse', message: e.message, snippet: raw.slice(0, 200) });
        continue;
      }
      const items = Array.isArray(parsed) ? parsed : [parsed];
      for (const item of items) {
        if (!item || typeof item !== 'object') continue;
        const types = Array.isArray(item['@type']) ? item['@type'] : [item['@type']];
        const summary = { type: types.join('+'), missing: [] };
        if (!item['@context']) summary.missing.push('@context');
        for (const t of types) {
          const m = checkRequired(item, t);
          if (m.length) summary.missing.push(...m.map(x => `${t}.${x}`));
        }
        entry.blocks.push(summary);
        if (summary.missing.length) entry.warnings.push(summary);
      }
    }
  } catch (e) {
    entry.errors.push({ kind: 'load', message: e.message });
  }
  report.push(entry);
  const flag = entry.errors.length ? 'ERR' : entry.warnings.length ? 'WARN' : 'OK';
  console.log(`[${flag}] ${route} — ${entry.blocks.length} blocks, ${entry.errors.length} errors, ${entry.warnings.length} warnings`);
}

await browser.close();

// Write reports
fs.mkdirSync('/mnt/documents', { recursive: true });
fs.writeFileSync('/mnt/documents/jsonld-report.json', JSON.stringify(report, null, 2));

let md = `# JSON-LD Validation Report\n\nBase: ${BASE_URL}\nRoutes scanned: ${report.length}\n\n`;
const errs = report.filter(r => r.errors.length);
const warns = report.filter(r => r.warnings.length);
md += `- Routes with parse errors: **${errs.length}**\n- Routes with missing-field warnings: **${warns.length}**\n\n`;

if (errs.length) {
  md += `## Parse / load errors\n\n`;
  for (const r of errs) {
    md += `### ${r.route}\n`;
    for (const e of r.errors) md += `- (${e.kind}) ${e.message}\n`;
    md += '\n';
  }
}
if (warns.length) {
  md += `## Missing required fields\n\n`;
  for (const r of warns) {
    md += `### ${r.route}\n`;
    for (const w of r.warnings) md += `- **${w.type}** missing: ${w.missing.join(', ')}\n`;
    md += '\n';
  }
}
if (!errs.length && !warns.length) md += `All schemas pass parse + required-field checks.\n`;

fs.writeFileSync('/mnt/documents/jsonld-report.md', md);
console.log(`\nReport: /mnt/documents/jsonld-report.md (${errs.length} err routes, ${warns.length} warn routes)`);
process.exit(errs.length ? 1 : 0);
