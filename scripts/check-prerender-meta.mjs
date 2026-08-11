#!/usr/bin/env node
/**
 * Audit: prerendered HTML must not ship the generic homepage head.
 *
 * The static HTML that non-JS crawlers (Google's first pass, GPTBot,
 * Bingbot, social previewers) read is whatever `vite build` +
 * `scripts/inject-canonicals.mjs` froze into `dist/<route>/index.html`.
 * Two failure modes silently destroy indexing:
 *
 *   1. A route keeps the sitewide homepage <title> / description from
 *      index.html — Google sees N identical pages and drops most of them
 *      as "Duplicate without user-selected canonical".
 *   2. A route carries <meta name="robots" content="noindex"> — this
 *      actually happened when the in-page bot-detection script fired
 *      inside the headless prerenderer and baked noindex into every file.
 *
 * This script re-reads the defaults straight out of index.html (so it can
 * never go stale), walks every built page, and reports both classes.
 *
 * noindex is a hard zero-tolerance failure.
 * Generic title/description is gated against a recorded baseline in
 * scripts/prerender-meta-baseline.json so the gate locks in today's number
 * and fails only on regression — override with --max-generic=<n>.
 *
 * Usage:
 *   node scripts/check-prerender-meta.mjs [--json] [--max-generic=N]
 *                                         [--update-baseline] [--dist=dir]
 */
import {
  readFileSync,
  writeFileSync,
  existsSync,
  readdirSync,
  statSync,
  mkdirSync,
} from 'node:fs';
import { join, resolve, relative, sep } from 'node:path';

const ROOT = resolve('.');
const argv = process.argv.slice(2);
const hasFlag = (name) => argv.includes(`--${name}`);
const flagValue = (name) => {
  const hit = argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : undefined;
};

const asJson = hasFlag('json');
const updateBaseline = hasFlag('update-baseline');
const DIST = resolve(flagValue('dist') ?? 'dist');
const BASELINE_FILE = join(ROOT, 'scripts', 'prerender-meta-baseline.json');
const REPORT_DIR = join(ROOT, '.preflight-reports');

// --------------------------------------------------------------------------
// Defaults, read from the source of truth
// --------------------------------------------------------------------------
const indexHtmlPath = join(ROOT, 'index.html');
if (!existsSync(indexHtmlPath)) {
  console.error('✗ index.html not found — cannot determine the generic defaults.');
  process.exit(1);
}
const indexHtml = readFileSync(indexHtmlPath, 'utf8');

const norm = (s) =>
  String(s ?? '')
    .replace(/&amp;/g, '&')
    .replace(/&#38;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const titleOf = (html) => {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? m[1] : '';
};
const metaOf = (html, attr, value) => {
  const re = new RegExp(
    `<meta[^>]*${attr}=["']${value}["'][^>]*content=["']([^"']*)["']`,
    'i',
  );
  const m = html.match(re);
  if (m) return m[1];
  // content-before-name ordering
  const re2 = new RegExp(
    `<meta[^>]*content=["']([^"']*)["'][^>]*${attr}=["']${value}["']`,
    'i',
  );
  const m2 = html.match(re2);
  return m2 ? m2[1] : '';
};

const DEFAULT_TITLE = norm(titleOf(indexHtml));
const DEFAULT_DESCRIPTION = norm(metaOf(indexHtml, 'name', 'description'));
const DEFAULT_OG_TITLE = norm(metaOf(indexHtml, 'property', 'og:title')) || DEFAULT_TITLE;
const DEFAULT_OG_DESCRIPTION =
  norm(metaOf(indexHtml, 'property', 'og:description')) || DEFAULT_DESCRIPTION;

if (!DEFAULT_TITLE) {
  console.error('✗ index.html has no <title> — nothing to compare against.');
  process.exit(1);
}

// --------------------------------------------------------------------------
// Walk dist
// --------------------------------------------------------------------------
if (!existsSync(DIST)) {
  console.error(
    `✗ ${relative(ROOT, DIST) || 'dist'} not found — run \`npm run build:prerender\` first.`,
  );
  process.exit(1);
}

function walkHtml(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walkHtml(p, out);
    else if (name === 'index.html') out.push(p);
  }
  return out;
}

const rootIndex = join(DIST, 'index.html');
const pages = walkHtml(DIST).filter((p) => p !== rootIndex);

const genericTitle = [];
const genericDescription = [];
const genericSocial = [];
const noindex = [];

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const route =
    '/' + relative(DIST, file).split(sep).slice(0, -1).join('/');

  if (/<meta[^>]+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) {
    noindex.push(route);
  }
  if (norm(titleOf(html)) === DEFAULT_TITLE) genericTitle.push(route);
  if (
    DEFAULT_DESCRIPTION &&
    norm(metaOf(html, 'name', 'description')) === DEFAULT_DESCRIPTION
  ) {
    genericDescription.push(route);
  }
  const ogT = norm(metaOf(html, 'property', 'og:title'));
  const ogD = norm(metaOf(html, 'property', 'og:description'));
  if (
    (ogT && ogT === DEFAULT_OG_TITLE) ||
    (ogD && DEFAULT_OG_DESCRIPTION && ogD === DEFAULT_OG_DESCRIPTION)
  ) {
    genericSocial.push(route);
  }
}

const genericAny = new Set([
  ...genericTitle,
  ...genericDescription,
  ...genericSocial,
]);

// --------------------------------------------------------------------------
// Baseline / threshold
// --------------------------------------------------------------------------
let baseline = { maxGeneric: 0, recordedAt: null, note: '' };
if (existsSync(BASELINE_FILE)) {
  try {
    baseline = { ...baseline, ...JSON.parse(readFileSync(BASELINE_FILE, 'utf8')) };
  } catch {
    /* fall back to defaults */
  }
}
const override = flagValue('max-generic');
const maxGeneric = override !== undefined ? Number(override) : baseline.maxGeneric;

if (updateBaseline) {
  mkdirSync(join(ROOT, 'scripts'), { recursive: true });
  writeFileSync(
    BASELINE_FILE,
    JSON.stringify(
      {
        maxGeneric: genericAny.size,
        recordedAt: new Date().toISOString(),
        note:
          'Pages still carrying the generic homepage head. Drive this number down as ' +
          'more routes get real per-route metadata; never raise it.',
      },
      null,
      2,
    ) + '\n',
  );
  console.log(`Baseline updated: maxGeneric = ${genericAny.size}`);
}

// --------------------------------------------------------------------------
// Report
// --------------------------------------------------------------------------
const sample = (list, n = 15) =>
  list.slice(0, n).map((r) => `    ${r}`).join('\n') +
  (list.length > n ? `\n    … and ${list.length - n} more` : '');

console.log('Prerender meta check');
console.log(`  pages scanned:            ${pages.length}`);
console.log(`  generic <title>:          ${genericTitle.length}`);
console.log(`  generic description:      ${genericDescription.length}`);
console.log(`  generic og:title/desc:    ${genericSocial.length}`);
console.log(`  distinct generic pages:   ${genericAny.size} (allowed: ${maxGeneric})`);
console.log(`  noindex pages:            ${noindex.length} (allowed: 0)`);

let failed = false;

if (noindex.length > 0) {
  failed = true;
  console.error('\n✗ Pages shipping <meta name="robots" content="noindex">:');
  console.error(sample(noindex));
}

if (!updateBaseline && genericAny.size > maxGeneric) {
  failed = true;
  console.error(
    `\n✗ ${genericAny.size} pages keep the generic homepage title/description ` +
      `(baseline allows ${maxGeneric}).`,
  );
  console.error(sample([...genericAny]));
  console.error(
    '\n  Fix by giving these routes real metadata (scripts/ai-head-data.json →\n' +
      '  scripts/inject-canonicals.mjs), or re-record the baseline deliberately with\n' +
      '  `node scripts/check-prerender-meta.mjs --update-baseline`.',
  );
}

if (asJson) {
  mkdirSync(REPORT_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const out = join(REPORT_DIR, `prerender-meta-${stamp}.json`);
  writeFileSync(
    out,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        dist: relative(ROOT, DIST),
        defaults: {
          title: titleOf(indexHtml).trim(),
          description: metaOf(indexHtml, 'name', 'description'),
        },
        totals: {
          pagesScanned: pages.length,
          genericTitle: genericTitle.length,
          genericDescription: genericDescription.length,
          genericSocial: genericSocial.length,
          genericDistinct: genericAny.size,
          noindex: noindex.length,
          maxGenericAllowed: maxGeneric,
        },
        failures: {
          noindex,
          genericTitle,
          genericDescription,
          genericSocial,
        },
        passed: !failed,
      },
      null,
      2,
    ) + '\n',
  );
  console.log(`\nReport written to ${relative(ROOT, out)}`);
}

if (failed) process.exit(1);
console.log('\n✓ No prerendered page regresses to the generic homepage head.');
