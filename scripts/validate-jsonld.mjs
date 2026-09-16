#!/usr/bin/env node
/**
 * Runtime / prerender JSON-LD validator.
 *
 * Modes:
 *   1) DIST_DIR=dist  — read prerendered HTML from disk (preferred in CI;
 *      no local server, no Puppeteer, completes in seconds).
 *   2) BASE_URL=…     — load each route in Puppeteer (dev / live preview).
 *
 * Usage:
 *   DIST_DIR=dist node scripts/validate-jsonld.mjs
 *   BASE_URL=http://localhost:4173 node scripts/validate-jsonld.mjs
 *   BASE_URL=https://livingwitharthritis.org.uk node scripts/validate-jsonld.mjs
 */
import fs from 'fs';
import { execSync } from 'child_process';
import { join, resolve } from 'path';
import { tmpdir } from 'os';

const DIST_DIR = process.env.DIST_DIR ? resolve(process.env.DIST_DIR) : '';
const BASE_URL = (process.env.BASE_URL || process.env.SITE_URL || 'http://localhost:8080').replace(/\/$/, '');
const PROD_HOST = 'https://livingwitharthritis.org.uk';
const REPORT_DIR = process.env.JSONLD_REPORT_DIR || join(tmpdir(), 'livingwitharthritis-jsonld');

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

function extractLdJsonBlocks(html) {
  const blocks = [];
  const re = /<script\b[^>]*\btype=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    blocks.push(m[1].trim());
  }
  // Also match type attribute after other attrs in alternate order already covered;
  // handle type without quotes rarely used — skip.
  return blocks;
}

function routeToDistFile(route) {
  const clean = (route || '/').replace(/\/$/, '') || '/';
  if (clean === '/') return join(DIST_DIR, 'index.html');
  const rel = clean.replace(/^\//, '');
  const candidates = [
    join(DIST_DIR, rel, 'index.html'),
    join(DIST_DIR, `${rel}.html`),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return null;
}

function validateBlocks(rawBlocks, entry) {
  for (const raw of rawBlocks) {
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
      const summary = { type: types.filter(Boolean).join('+') || '(missing @type)', missing: [] };
      if (!item['@context']) summary.missing.push('@context');
      for (const t of types) {
        if (!t) continue;
        const miss = checkRequired(item, t);
        if (miss.length) summary.missing.push(...miss.map(x => `${t}.${x}`));
      }
      entry.blocks.push(summary);
      if (summary.missing.length) entry.warnings.push(summary);
    }
  }
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

const report = [];
const modeLabel = DIST_DIR ? `DIST_DIR=${DIST_DIR}` : `BASE_URL=${BASE_URL}`;
console.log(`JSON-LD validate mode: ${modeLabel} (${routes.length} routes)`);

if (DIST_DIR) {
  if (!fs.existsSync(DIST_DIR)) {
    console.error(`✗ DIST_DIR does not exist: ${DIST_DIR}`);
    process.exit(1);
  }
  for (const route of routes) {
    const entry = { route, url: `file://${route}`, blocks: [], errors: [], warnings: [] };
    const file = routeToDistFile(route);
    if (!file) {
      entry.errors.push({ kind: 'load', message: `no prerendered HTML under ${DIST_DIR} for ${route}` });
    } else {
      try {
        const html = fs.readFileSync(file, 'utf8');
        validateBlocks(extractLdJsonBlocks(html), entry);
      } catch (e) {
        entry.errors.push({ kind: 'load', message: e.message });
      }
    }
    report.push(entry);
    const flag = entry.errors.length ? 'ERR' : entry.warnings.length ? 'WARN' : 'OK';
    console.log(`[${flag}] ${route} — ${entry.blocks.length} blocks, ${entry.errors.length} errors, ${entry.warnings.length} warnings`);
  }
} else {
  const puppeteer = await loadPuppeteer();
  const browser = await puppeteer.launch({ args: ['--no-sandbox'], headless: 'new' });
  const page = await browser.newPage();

  for (const route of routes) {
    const url = BASE_URL + route;
    const entry = { route, url, blocks: [], errors: [], warnings: [] };
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      // Wait for Helmet/useEffect to finish injecting
      await new Promise(r => setTimeout(r, 800));
      const blocks = await page.$$eval('script[type="application/ld+json"]', els => els.map(e => e.textContent || ''));
      validateBlocks(blocks, entry);
    } catch (e) {
      entry.errors.push({ kind: 'load', message: e.message });
    }
    report.push(entry);
    const flag = entry.errors.length ? 'ERR' : entry.warnings.length ? 'WARN' : 'OK';
    console.log(`[${flag}] ${route} — ${entry.blocks.length} blocks, ${entry.errors.length} errors, ${entry.warnings.length} warnings`);
  }

  await browser.close();
}

// Write reports
fs.mkdirSync(REPORT_DIR, { recursive: true });
fs.writeFileSync(join(REPORT_DIR, 'jsonld-report.json'), JSON.stringify(report, null, 2));

let md = `# JSON-LD Validation Report\n\nMode: ${modeLabel}\nRoutes scanned: ${report.length}\n\n`;
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

const markdownReport = join(REPORT_DIR, 'jsonld-report.md');
fs.writeFileSync(markdownReport, md);
console.log(`\nReport: ${markdownReport} (${errs.length} err routes, ${warns.length} warn routes)`);
process.exit(errs.length ? 1 : 0);
