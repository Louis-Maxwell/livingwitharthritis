# Static hosting & hard 404s (Lovable-first)

Living With Arthritis UK is a prerendered Vite SPA. Every indexable route should
emit its own file under `dist/` with a unique `<title>`, `<h1>` and
self-referencing canonical. Soft 404s happen when the host answers unknown paths
with `index.html` and HTTP 200 (homepage tags leak onto junk URLs).

## Lovable (current production)

Production DNS points at **Lovable**. The CDN often serves the SPA shell for
unknown paths (HTTP 200). Mitigations in this repo:

1. `scripts/generate-404.mjs` — emits `dist/404.html` (noindex, unique title).
2. `scripts/write-redirect-html.mjs` — static noindex + canonical + refresh stubs.
3. `public/_redirects` — Netlify/static-compatible 301 + 404 rules when supported.
4. `vercel.json` — optional host redirect map (`scripts/sync-host-redirects.mjs`).
5. `SeoRedirectGate` — client Navigate + refresh when `_redirects` are ignored.

Cloudflare Workers / `wrangler.jsonc` / `not_found_handling: "404-page"` were
**removed**. Do not treat Cloudflare as the required deploy path.

App-only shells (`/admin`, `/auth`, …) keep a 200 via explicit rewrite rules in
`public/_redirects` (copied to `dist/_redirects`). Alias 301s such as
`/about-us → /about` sit at the top of that file.

## Hub pages that must be real files

These routes must prerender to their own HTML (HTTP 200 + unique titles), not
redirect to the homepage or soft-404:

| Path | Page |
|------|------|
| `/guides` | Guides hub |
| `/diet` | Diet hub |
| `/about` | About |
| `/benefits-pip` | Benefits & PIP hub |
| `/search` | Site search |

They are listed in `scripts/prerender-routes.mjs` (curated) and discovered from
`App.tsx` by `scripts/generate-sitemap.ts`. Deploy with a full prerender build
so `dist/guides/index.html`, `dist/diet/index.html`, `dist/about/index.html`,
`dist/benefits-pip/index.html` and `dist/search/index.html` exist on the CDN.

## Sitemap soft-404 footgun

`prebuild` regenerates `public/sitemap.xml` (~513 blog post URLs as of 2026-09-06). `dist/sitemap.xml`
is gitignored build output. Deploying a stale `dist/` without prebuild can omit
blogs and create soft-404 inventory gaps. Always deploy from a fresh prebuild.

## Deploy checklist (Lovable)

1. `bun run build:prerender` (or CI equivalent) — emits static HTML + `404.html`.
2. Publish via **Lovable** from `main` (no Wrangler / Worker deploy).
3. Smoke-check live hubs (**200**, unique titles) and known aliases (prefer **301**).
4. Confirm `/about-us` resolves to `/about`.
5. Soft-404 GSC validation may still fail while Lovable returns SPA 200 for junk
   URLs — keep stubs honest; see `docs/GSC-INDEXING-FIX.md`.
