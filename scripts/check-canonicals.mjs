#!/usr/bin/env node
/**
 * Audit: every page component must emit a canonical URL.
 * A page is OK if it imports SeoHead, ConditionPageTemplate, or contains
 * a literal `rel="canonical"` (e.g. inline <Helmet>).
 *
 * Exits non-zero if any page is missing canonical coverage.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOTS = ['src/pages'];
const ALLOW_PATTERNS = [
  /from\s+["'][^"']*SeoHead["']/,
  /from\s+["'][^"']*ConditionPageTemplate["']/,
  /rel=["']canonical["']/,
];

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) {
      if (name === '__tests__' || name === '__mocks__') continue;
      out.push(...walk(p));
    } else if (name.endsWith('.tsx') && !name.endsWith('.test.tsx')) {
      out.push(p);
    }
  }
  return out;
}

const missing = [];
for (const root of ROOTS) {
  for (const file of walk(root)) {
    const src = readFileSync(file, 'utf8');
    if (!ALLOW_PATTERNS.some((re) => re.test(src))) missing.push(file);
  }
}

if (missing.length) {
  console.error(`✗ ${missing.length} page(s) missing canonical:`);
  for (const f of missing) console.error('  - ' + f);
  process.exit(1);
}
console.log('✓ All pages emit a canonical URL.');
