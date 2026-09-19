/**
 * Emit dist/404.html — a standalone, noindex error document.
 *
 * Static hosting (Lovable) serves /404.html with a real HTTP 404
 * status for unknown paths instead of falling back to index.html with a 200.
 * That kills the soft-404 problem where junk URLs inherited the homepage
 * title, canonical and OG tags.
 *
 * The document reuses the built JS/CSS assets so the React SPA still hydrates
 * and renders the full <NotFound /> page (React Router's "*" route matches the
 * junk path), but its static head carries none of the homepage metadata.
 */

import { readFileSync, existsSync } from 'node:fs';
import { writeFileAtomicSync } from './lib/atomic-write.mjs';
import { resolve } from 'node:path';

const DIST = resolve('dist');
const indexPath = resolve(DIST, 'index.html');

if (!existsSync(indexPath)) {
  console.warn('[404] dist/index.html not found — skipping 404.html generation');
  process.exit(0);
}

const indexHtml = readFileSync(indexPath, 'utf8');

// Pull the hashed asset references straight out of the built index so the
// error page never goes stale after a rebuild.
const assetTags = [
  ...indexHtml.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi),
  ...indexHtml.matchAll(/<link[^>]+rel=["']modulepreload["'][^>]*>/gi),
  ...indexHtml.matchAll(/<script[^>]+type=["']module["'][^>]*><\/script>/gi),
]
  .map((m) => `    ${m[0]}`)
  .join('\n');

const TITLE = 'Page not found | Living With Arthritis UK';
const DESCRIPTION =
  'The page you are looking for could not be found. Search Living With Arthritis UK or pick a popular guide instead.';

const html = `<!DOCTYPE html>
<html lang="en-GB">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${TITLE}</title>
    <meta name="description" content="${DESCRIPTION}" />
    <meta name="robots" content="noindex, nofollow" />
    <meta name="googlebot" content="noindex, nofollow" />
    <meta property="og:title" content="${TITLE}" />
    <meta property="og:description" content="${DESCRIPTION}" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${TITLE}" />
    <meta name="twitter:description" content="${DESCRIPTION}" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="manifest" href="/site.webmanifest" />
${assetTags}
  </head>
  <body>
    <a href="#main-content">Skip to main content</a>
    <div id="root">
      <main id="main-content" role="main" tabindex="-1" style="max-width:42rem;margin:0 auto;padding:4rem 1.5rem;font-family:Inter,system-ui,sans-serif;">
        <h1>We couldn't find that page</h1>
        <p>The link may be broken, or the page may have moved.</p>
        <p><a href="/">Go to the homepage</a>, <a href="/search">search articles</a>, or <a href="/guides">browse guides</a>.</p>
      </main>
    </div>
    <noscript>
      <p>This page could not be found. <a href="/">Return to the homepage</a>.</p>
    </noscript>
  </body>
</html>
`;

writeFileAtomicSync(resolve(DIST, '404.html'), html, 'utf8');
console.log('[404] dist/404.html written (noindex, no homepage metadata)');

/* ------------------------------------------------------------------------ *
 * Hosting rules: unknown routes must return a real HTTP 404, not a 200 SPA
 * shell. Static-hosting rule order is: real file -> _redirects rule -> SPA
 * fallback. Every indexable route is prerendered to a real file, so a final
 * `/* -> /404.html 404` rule only catches genuine junk URLs.
 *
 * Routes that are NOT prerendered (admin, auth, utility screens) still need
 * the SPA shell with a 200, so they are emitted as explicit rewrites above
 * the catch-all.
 * ------------------------------------------------------------------------ */

const appSrc = readFileSync(resolve('src/App.tsx'), 'utf8');
const routePaths = [...appSrc.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1]);

// Prefixes whose sub-paths are app-only (never prerendered, never indexed).
const SPA_PREFIXES = ['/admin', '/auth', '/dashboard', '/checkout', '/callback', '/debug', '/donation-result', '/account'];

// A route that has its own prerendered file must NOT be rewritten to the
// SPA shell — that rewrite is what made ~40 URLs serve the homepage title,
// description and body copy (Semrush's duplicate title/description/content
// errors). Only routes without a real file need the shell.
const hasOwnFile = (p) => existsSync(resolve(DIST, `${p.replace(/^\//, '')}/index.html`));

const spaRules = new Set();
for (const p of SPA_PREFIXES) {
  if (!hasOwnFile(p)) spaRules.add(`${p} /index.html 200`);
  spaRules.add(`${p}/* /index.html 200`);
}
// Soft-404 hardening: unknown values under these prefixes must NOT inherit
// the homepage SPA shell (title/OG). Prerendered files still win as real
// files on disk; only missing slugs hit 404.html.
const HARD_404_PREFIXES = new Set([
  '/blog',
  '/arthritis-support',
  '/uk',
  '/authors',
  '/reviewers',
]);

for (const p of routePaths) {
  if (p === '*' || p === '/') continue;
  if (p.includes(':')) {
    // Parameterised routes (/library/:slug, /blog/:slug, ...): either hard-404
    // unknown values (blog/city) or SPA-rewrite for app screens that need it.
    // Real prerendered files still win over rewrite rules.
    const prefix = p.slice(0, p.indexOf('/:'));
    if (!prefix) continue;
    if (HARD_404_PREFIXES.has(prefix)) {
      spaRules.add(`${prefix}/* /404.html 404`);
    } else {
      spaRules.add(`${prefix}/* /index.html 200`);
    }
    continue;
  }
  if (hasOwnFile(p)) continue;
  spaRules.add(`${p} /index.html 200`);
}


const redirectsPath = resolve(DIST, '_redirects');
const existing = existsSync(redirectsPath) ? readFileSync(redirectsPath, 'utf8') : '';
const block = [
  '',
  '# --- Generated by scripts/generate-404.mjs: do not edit by hand ---',
  '# Known app routes keep the SPA shell (200); everything else is a real 404.',
  ...[...spaRules].sort(),
  '/* /404.html 404',
  '',
].join('\n');

writeFileAtomicSync(redirectsPath, `${existing.trimEnd()}\n${block}`, 'utf8');
console.log(`[404] appended ${spaRules.size} SPA rules + catch-all 404 to dist/_redirects`);
