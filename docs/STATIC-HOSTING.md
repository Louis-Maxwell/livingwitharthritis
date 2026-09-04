# Static hosting & hard 404s (Cloudflare)

Living With Arthritis UK is a prerendered Vite SPA. Every indexable route should
emit its own file under `dist/` with a unique `<title>`, `<h1>` and
self-referencing canonical. Soft 404s happen when the host answers unknown paths
with `index.html` and HTTP 200 (homepage tags leak onto junk URLs).

## Cloudflare Pages / Workers Assets

`wrangler.jsonc` sets:

```jsonc
"assets": {
  "directory": "./dist",
  "not_found_handling": "404-page"
}
```

That tells Cloudflare to serve the nearest `404.html` with a **real HTTP 404**
when no static file matches. `scripts/generate-404.mjs` runs in `postbuild` /
`postbuild:prerender` and writes `dist/404.html` (noindex, unique title, no
homepage metadata). The React SPA still hydrates so `<NotFound />` renders for
humans.

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

## Deploy checklist

1. `bun run build:prerender` (or CI equivalent) — emits static HTML + `404.html`.
2. Deploy `dist/` to Cloudflare with `not_found_handling: "404-page"` (see
   `wrangler.jsonc`). Do **not** enable SPA single-page fallback for all routes.
3. Smoke-check live:
   - `curl -sI https://livingwitharthritis.org.uk/guides` → **200**, title contains Guides
   - `curl -sI https://livingwitharthritis.org.uk/diet` → **200**, unique diet title
   - `curl -sI https://livingwitharthritis.org.uk/about` → **200**, About title
   - `curl -sI https://livingwitharthritis.org.uk/benefits-pip` → **200**
   - `curl -sI https://livingwitharthritis.org.uk/this-path-should-404` → **404**
4. Confirm `/about-us` returns **301** to `/about`.

Without a Cloudflare (or equivalent) deploy that honours `404-page`, local
prerender alone cannot fix soft 404s on the live edge.
