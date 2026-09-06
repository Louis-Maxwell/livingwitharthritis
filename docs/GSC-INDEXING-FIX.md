# Google Search Console indexing fix (livingwitharthritis.org.uk)

**Owner:** Louis Maxwell (`info@livingwitharthritis.org.uk`)  
**Last updated:** 2026-09-06 (Europe/London)

## Critical live finding (must read first)

```bash
curl -sI https://livingwitharthritis.org.uk/this-is-not-a-real-page-xyz
# → HTTP 200 (Lovable SPA shell)
```

Unknown paths currently inherit the homepage SPA document with **HTTP 200**. That is exactly why GSC Soft 404 validation fails: Google sees a 200 with thin/homepage-like signals instead of a hard 404 or a real 301.

Code in this repo already prepares the correct edge behaviour:

| Artefact | Role |
|----------|------|
| `wrangler.jsonc` → `assets.not_found_handling: "404-page"` | Real HTTP 404 via nearest `404.html` |
| `scripts/generate-404.mjs` | Emits `dist/404.html` (noindex, unique title) |
| `public/_redirects` | Netlify / Cloudflare Pages 301 + 404 rules |
| `vercel.json` + `functions/_middleware.js` | Host 301 maps (from `sync-host-redirects`) |
| `scripts/write-redirect-html.mjs` | Static noindex+refresh stubs under `dist/<alias>/` for SPA hosts |
| `src/lib/seoRedirects.ts` + `SeoRedirectGate` | Client fallback when the CDN ignores `_redirects` |

**Soft 404 GSC validation will keep failing until production is served from a Cloudflare (or equivalent) deploy that honours `not_found_handling: "404-page"`** — not Lovable’s SPA-fallback CDN alone. See also `docs/STATIC-HOSTING.md`.

Keep: Bytespider `Disallow: /` in `public/robots.txt`, charity identity (1218461), and `seo:blog-guards`.

Do **not** re-add sitewide `link rel=canonical` tags; consolidate with **301s** instead.

---

## Deploy + validation steps for Louis

1. Pull `main`, run a full prerender build:
   ```bash
   bun run build:prerender   # or CI equivalent
   ```
   Confirm `dist/404.html`, hub HTML, and redirect stubs exist (`dist/exercise-hub/index.html`, `dist/blog/mindfulness-meditation-chronic-pain/index.html`, locale glossary stubs, etc.).
2. Deploy `dist/` to Cloudflare Workers/Pages with `wrangler.jsonc` (`not_found_handling: "404-page"`). Do **not** enable SPA fallback for all routes.
3. Smoke-check live (expect **404** / **301**, not soft 200 homepage):
   ```bash
   curl -sI https://livingwitharthritis.org.uk/this-is-not-a-real-page-xyz   # → 404
   curl -sI https://livingwitharthritis.org.uk/exercise-hub                 # → 301 → /exercises
   curl -sI https://livingwitharthritis.org.uk/blog/mindfulness-meditation-chronic-pain  # → 301
   curl -sI https://livingwitharthritis.org.uk/about/                       # → 301 → /about
   curl -sI https://livingwitharthritis.org.uk/es/glossary/nice             # → 301 → /glossary/nice
   curl -sI https://livingwitharthritis.org.uk/blog                         # → 200, unique title
   ```
4. After Cloudflare 404-page is live: in GSC → URL Inspection → **Request indexing** for priority real URLs (`/blog`, `/blog/category/exercise`, `/arthritis-support`, `/supplements/glucosamine`, `/glossary/nice`, `/conditions/hip-arthritis`, `/guides/hip-exercises-for-osteoarthritis`, top blog posts).
5. IndexNow: `INDEXNOW=1 bun run indexnow` (also runs on production `postbuild`).

---

## Soft 404 (32) — URL-by-URL plan

| URL | Action | Destination / note |
|-----|--------|--------------------|
| `/blog` | Keep real page; enrich unique prerender title/h1/intro | In sitemap |
| `/blog/category/exercise` | Keep real category page (unique meta) | In sitemap |
| `/conditions/ankylosing-spondylitis/exercises` | Keep real condition subpage | In sitemap |
| `/arthritis-support` | Keep real directory; enrich intro | In sitemap |
| `/arthritis-support/stockport` | 301 | `/arthritis-support/manchester` |
| `/arthritis-support/stirling` | 301 | `/arthritis-support/glasgow` |
| `/arthritis-support/winchester` | 301 | `/arthritis-support/southampton` |
| `/exercise-hub` | 301 | `/exercises` |
| `/exercises/pilates-for-knee` | 301 | `/exercises/pilates-for-knee-arthritis` |
| `/exercises/stretching-for-knee` | 301 | `/exercises/stretching-for-knee-arthritis` |
| `/exercises/walking-for-back` | 301 | `/exercises/walking-for-back-arthritis` |
| `/es/corporate-partnerships` | 301 | `/corporate-partnerships` |
| `/de/glossary/facet-joint-injection` | 301 | `/glossary/facet-joint-injection` |
| `/de/glossary/methotrexate` | 301 | `/glossary/methotrexate` |
| `/es/glossary/pain-scale` | 301 | `/glossary/pain-scale` |
| `/de/glossary/ankylosis` | 301 | `/glossary/ankylosis` |
| `/fr/uk/coventry/waiting-list-help` | 301 | `/arthritis-support/coventry` |
| `/de/uk/coventry/waiting-list-help` | 301 | `/arthritis-support/coventry` |
| `/fr/guides/wet-vs-dry-heat-therapy` | 301 | `/guides/wet-vs-dry-heat-therapy` |
| `/es/glossary/self-referral` | 301 | `/glossary/self-referral` |
| `/es/guides/wet-vs-dry-heat-therapy` | 301 | `/guides/wet-vs-dry-heat-therapy` |
| `/de/glossary/bone-density` | 301 | `/glossary/bone-density` |
| `/de/pets/pet-weight-and-joint-health` | 301 | `/pets/pet-weight-and-joint-health` |
| `/es/glossary/bone-density` | 301 | `/glossary/bone-density` |
| `/es/glossary/codeine` | 301 | `/glossary/codeine` |
| `/fr/glossary/nice` | 301 | `/glossary/nice` |
| `/es/glossary/enthesitis` | 301 | `/glossary/enthesitis` |
| `/fr/glossary/bisphosphonates` | 301 | `/glossary/bisphosphonates` |
| `/es/glossary/bisphosphonates` | 301 | `/glossary/bisphosphonates` |
| `/de/glossary/cartilage` | 301 | `/glossary/cartilage` |
| `/es/glossary/hydroxychloroquine` | 301 | `/glossary/hydroxychloroquine` |
| `/fr/glossary/hydroxychloroquine` | 301 | `/glossary/hydroxychloroquine` |

Alias + locale rows are exact entries in `EXACT_SEO_REDIRECTS` / `public/_redirects` so `write-redirect-html` drops stubs. Unknown locale paths that are **not** intentional `/es|/fr|/de|/pt` homes or OA translations splat to English via `_redirects`; do not invent translated pages. Soft-404 junk must not appear in `sitemap.xml` (generator excludes `exactRedirectPathSet()`).

---

## Page with redirect (24)

Expected GSC bucket when 301s are correct. Sources stay **out of sitemap**. Map lives in:

- `src/data/blogRedirects.ts` + `docs/seo/redirect-map.csv`
- City aliases (`stockport` → `manchester`, `milton-keynes` → `cambridge`, …)
- Hub aliases (`/exercise-hub`, `/about-us`, library hubs, short exercise slugs)

Verify with `bun run seo:redirects` and `bunx vitest run src/lib/__tests__/seo-redirects.test.ts src/lib/__tests__/host-redirects.test.ts`.

---

## Alternate canonical (3)

| URL | Fix |
|-----|-----|
| `/about/` | 301 → `/about` (`_redirects`, vercel pattern, client trailing-slash collapse) |
| `/conditions/hip-arthritis/exercises` | 301 → `/guides/hip-exercises-for-osteoarthritis` (no hip subpage content) |
| `/arthritis-support/milton-keynes` | 301 → `/arthritis-support/cambridge` (already in `CITY_HUB_ALIASES`) |

---

## Duplicate without canonical (2)

| URL | Fix |
|-----|-----|
| `/es/glossary/nice` | 301 → `/glossary/nice` |
| `/supplements/glucosamine` | Canonical live page; `/library/glucosamine` 301 → here; sitemap once |

---

## Hard 404 (1)

| URL | Fix |
|-----|-----|
| `/blog/mindfulness-meditation-chronic-pain` | 301 → `/blog/mindfulness-chronic-pain-arthritis-guide` (blogRedirects + `_redirects` + stub) |

---

## Crawled — not indexed

Cannot force Google. After Cloudflare 404-page deploy: IndexNow priority hubs, then Louis requests indexing in GSC for the real enriched URLs. Thin condition subpages should keep unique prerender HTML (title/h1/body) — prefer enriching over noindex.

---

## Maintainer commands

```bash
node scripts/sync-host-redirects.mjs    # rewrite vercel.json + functions/_middleware.js
bun run seo:redirects                   # drift check
bun scripts/generate-sitemap.ts         # drop redirect sources from sitemap
bunx vitest run src/lib/__tests__/seo-redirects.test.ts src/lib/__tests__/host-redirects.test.ts
bun run seo:blog-guards
INDEXNOW=1 bun run indexnow
```
