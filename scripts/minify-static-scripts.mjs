#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { transformSync } from 'esbuild';

// Vite copies public files verbatim. Minify the shipped copies only, preserving
// the readable audited sources and every consent/security decision they contain.
export const STATIC_SCRIPTS = ['analytics-consent.js', 'boot-hero-reveal.js', 'seo-fallback-a11y.js', 'stale-deploy-guard.js'];
export function minifyStaticScripts(dist = resolve('dist')) {
  const result = [];
  for (const name of STATIC_SCRIPTS) {
    const file = resolve(dist, 'security', name);
    const source = readFileSync(file, 'utf8');
    const { code } = transformSync(source, { minify: true, target: 'es2020', legalComments: 'none' });
    writeFileSync(file, code);
    result.push({ name, before: Buffer.byteLength(source), after: Buffer.byteLength(code) });
  }
  return result;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log('[static-scripts]', JSON.stringify(minifyStaticScripts(process.argv[2] || resolve('dist'))));
}
