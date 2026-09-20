#!/usr/bin/env node
/**
 * Fail if any published blog slug is missing from dist/blog/<slug>/index.html
 * or still ships the homepage shell title / heading (share Soft-404).
 *
 * When dist/ is absent (local vitest-only runs), exit 0 with a skip message.
 */
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { HOME_SHELL_HEADING } from './static-article-html.mjs';

const ROOT = resolve('.');
const DIST = resolve(process.argv.find((a) => a.startsWith('--dist='))?.slice(7) ?? 'dist');
const SLUGS_PATH = join(ROOT, 'src/data/blog-slugs.generated.json');

if (!existsSync(DIST)) {
  console.log(`blog:html-gate skip — ${DIST} is missing (ok for vitest-only runs)`);
  process.exit(0);
}

if (!existsSync(SLUGS_PATH)) {
  console.error('✗ src/data/blog-slugs.generated.json missing');
  process.exit(1);
}

const slugs = JSON.parse(readFileSync(SLUGS_PATH, 'utf8'));
if (!Array.isArray(slugs) || slugs.length === 0) {
  console.error('✗ blog-slugs.generated.json is empty');
  process.exit(1);
}

const HOMEPAGE_TITLE_SNIPPETS = [
  'Living With Arthritis | UK charity',
  'Living With Arthritis UK | Evidence-Based Health Guides',
  'Living With Arthritis UK | Registered Charity 1218461',
];

const missing = [];
const shell = [];
const noOg = [];
const noCanonical = [];

for (const slug of slugs) {
  const file = join(DIST, 'blog', slug, 'index.html');
  if (!existsSync(file)) {
    missing.push(slug);
    continue;
  }
  const html = readFileSync(file, 'utf8');
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/\s+/g, ' ').trim() : '';
  const isHomeShell =
    HOMEPAGE_TITLE_SNIPPETS.some((s) => title.includes(s)) ||
    html.includes(HOME_SHELL_HEADING);
  if (isHomeShell) shell.push(slug);

  const ogTitle = /<meta\s+property=["']og:title["'][^>]*content=["']([^"']+)["']/i.exec(html)
    || /<meta\s+content=["']([^"']+)["'][^>]*property=["']og:title["']/i.exec(html);
  if (!ogTitle || !ogTitle[1].trim()) noOg.push(slug);

  const canonical = /rel=["']canonical["'][^>]*href=["']([^"']+)["']/i.exec(html)
    || /href=["']([^"']+)["'][^>]*rel=["']canonical["']/i.exec(html);
  const expected = `https://livingwitharthritis.org.uk/blog/${slug}`;
  if (!canonical || !String(canonical[1]).includes(`/blog/${slug}`)) {
    noCanonical.push(`${slug} => ${canonical?.[1] ?? '(missing)'}`);
  } else if (canonical[1] !== expected && !canonical[1].endsWith(`/blog/${slug}`)) {
    noCanonical.push(`${slug} => ${canonical[1]}`);
  }
}

const fail =
  missing.length > 0 || shell.length > 0 || noOg.length > 0 || noCanonical.length > 0;

if (fail) {
  console.error(`✗ blog:html-gate failed for ${slugs.length} published slugs`);
  if (missing.length) {
    console.error(`  missing HTML (${missing.length}): ${missing.slice(0, 8).join(', ')}`);
  }
  if (shell.length) {
    console.error(`  homepage shell still present (${shell.length}): ${shell.slice(0, 8).join(', ')}`);
  }
  if (noOg.length) {
    console.error(`  missing og:title (${noOg.length}): ${noOg.slice(0, 8).join(', ')}`);
  }
  if (noCanonical.length) {
    console.error(`  bad/missing canonical (${noCanonical.length}): ${noCanonical.slice(0, 5).join('; ')}`);
  }
  process.exit(1);
}

console.log(`✓ blog:html-gate — ${slugs.length} dist/blog/*/index.html files have article head`);
