#!/usr/bin/env node
/**
 * Validates public/sitemap.xml after generation.
 *
 * Fails the build if:
 *   - The file is missing or empty
 *   - XML is malformed (unmatched <urlset> / <url> / <loc> tags)
 *   - Any <loc> is missing or not a valid absolute URL
 *   - Duplicate <loc> entries exist
 *   - URL count is below MIN_URLS (guards against accidental wipes)
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const SITEMAP_PATH = resolve('public/sitemap.xml');
const MIN_URLS = 50;

function fail(msg) {
  console.error(`✗ sitemap validation failed: ${msg}`);
  process.exit(1);
}

if (!existsSync(SITEMAP_PATH)) fail('public/sitemap.xml not found');

const xml = readFileSync(SITEMAP_PATH, 'utf8');
if (!xml.trim()) fail('public/sitemap.xml is empty');

if (!xml.includes('<urlset') || !xml.includes('</urlset>'))
  fail('missing <urlset> root element');

const openCount = (xml.match(/<url>/g) || []).length;
const closeCount = (xml.match(/<\/url>/g) || []).length;
if (openCount !== closeCount)
  fail(`unmatched <url> tags (open=${openCount}, close=${closeCount})`);

const locs = [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1].trim());
if (locs.length !== openCount)
  fail(`<url> count (${openCount}) does not match <loc> count (${locs.length})`);

if (locs.length < MIN_URLS)
  fail(`only ${locs.length} URLs (expected at least ${MIN_URLS})`);

for (const loc of locs) {
  if (!loc) fail('found empty <loc>');
  try {
    const u = new URL(loc);
    if (!['http:', 'https:'].includes(u.protocol))
      fail(`non-http(s) URL: ${loc}`);
  } catch {
    fail(`invalid URL: ${loc}`);
  }
}

const seen = new Set();
const dupes = [];
for (const loc of locs) {
  if (seen.has(loc)) dupes.push(loc);
  seen.add(loc);
}
if (dupes.length) fail(`duplicate <loc> entries: ${dupes.slice(0, 5).join(', ')}`);

console.log(`✓ sitemap.xml valid (${locs.length} unique URLs)`);
