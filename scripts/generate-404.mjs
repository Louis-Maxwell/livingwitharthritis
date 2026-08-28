/**
 * Emit dist/404.html — a standalone, noindex error document.
 *
 * Static hosting (Lovable / Cloudflare) serves /404.html with a real HTTP 404
 * status for unknown paths instead of falling back to index.html with a 200.
 * That kills the soft-404 problem where junk URLs inherited the homepage
 * title, canonical and OG tags.
 *
 * The document reuses the built JS/CSS assets so the React SPA still hydrates
 * and renders the full <NotFound /> page (React Router's "*" route matches the
 * junk path), but its static head carries none of the homepage metadata.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
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
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="manifest" href="/site.webmanifest" />
${assetTags}
  </head>
  <body>
    <div id="root">
      <main style="max-width:42rem;margin:0 auto;padding:4rem 1.5rem;font-family:Inter,system-ui,sans-serif;">
        <h1>We couldn't find that page</h1>
        <p>The link may be broken, or the page may have moved.</p>
        <p><a href="/">Go to the homepage</a> or <a href="/library">browse the article library</a>.</p>
      </main>
    </div>
    <noscript>
      <p>This page could not be found. <a href="/">Return to the homepage</a>.</p>
    </noscript>
  </body>
</html>
`;

writeFileSync(resolve(DIST, '404.html'), html, 'utf8');
console.log('[404] dist/404.html written (noindex, no homepage metadata)');
