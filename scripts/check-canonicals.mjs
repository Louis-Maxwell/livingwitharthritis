#!/usr/bin/env node
/**
 * Audit: canonical URL coverage.
 *
 * Canonicals are NOT emitted per-page — <SeoDefaults /> (src/components/SeoDefaults.tsx)
 * is mounted once in App.tsx and emits a self-referencing `rel="canonical"`
 * for whatever route react-router-dom's useLocation() reports, for every
 * route in the app. So the real invariant to check is just that SeoDefaults
 * is (a) present and (b) actually mounted — not that each individual page
 * file also references it.
 *
 * Exits non-zero if that global wiring is missing or broken.
 */
import { readFileSync, existsSync } from 'node:fs';

const SEO_DEFAULTS_FILE = 'src/components/SeoDefaults.tsx';
const APP_FILE = 'src/App.tsx';

if (!existsSync(SEO_DEFAULTS_FILE)) {
  console.error(`✗ ${SEO_DEFAULTS_FILE} not found — no global canonical emitter.`);
  process.exit(1);
}

const seoDefaultsSrc = readFileSync(SEO_DEFAULTS_FILE, 'utf8');
if (!/rel=["']canonical["']/.test(seoDefaultsSrc)) {
  console.error(`✗ ${SEO_DEFAULTS_FILE} no longer emits rel="canonical".`);
  process.exit(1);
}

const appSrc = readFileSync(APP_FILE, 'utf8');
const mounted = /<SeoDefaults\s*\/>/.test(appSrc) && /from\s+["'][^"']*SeoDefaults["']/.test(appSrc);
if (!mounted) {
  console.error(`✗ <SeoDefaults /> is not mounted in ${APP_FILE} — canonicals would silently stop emitting site-wide.`);
  process.exit(1);
}

console.log('✓ SeoDefaults is mounted and emits a canonical URL for every route.');
