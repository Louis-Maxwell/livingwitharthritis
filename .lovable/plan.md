# Get more pages indexed by Google

Search Console shows 261 indexed vs 632 not indexed. Two things drive this: how pages are served to Google, and whether each page is worth indexing. Below is what the code confirms today, and what to change.

## What the code shows now

- The sitemap lists 1,095 URLs, so discovery is not the bottleneck.
- `robots.txt` allows Googlebot everywhere except admin/auth/utility paths — no accidental blocking.
- Prerendering (static HTML for crawlers) exists but is **opt-in**: `vite.config.ts` only enables it when `PRERENDER=1`, and the published build runs plain `vite build`. So the live site most likely serves Google a JavaScript shell for every route, which is the single biggest cause of "Crawled – currently not indexed".
- Unmatched URLs fall through to `index.html` and return HTTP 200 instead of 404 (already noted in `scripts/prerender-routes.mjs`), which creates "Duplicate without user-selected canonical" style reports.

## Plan

1. **Make prerendering part of the published build.** Change the `build` script so the production build always renders static HTML for the routes in `scripts/prerender-routes.mjs` (currently ~1,100 routes). Keep a fast non-prerender path for dev. Verify by checking that `dist/<route>/index.html` contains real headings, text, and JSON-LD without JavaScript.
2. **Cut prerender cost where needed.** If a full 1,100-route render is too slow for the publish pipeline, split it: always prerender the ~130 curated high-value routes plus all condition/guide/blog pages, and cap the long-tail combinatorial families.
3. **Handle unmatched URLs properly.** Add a `404.html` and a hosting-level rule so invalid paths stop returning 200 with duplicate content.
4. **Prune low-value URLs from the sitemap.** Combinatorial families (city x service, exercise x condition, etc.) make up most of the 1,095 URLs. Google indexes selectively; thin near-duplicates suppress the whole site's crawl budget. Keep pages with genuinely unique content, drop or `noindex` the rest so the sitemap reflects pages that deserve indexing.
5. **Re-submit and monitor.** Resubmit `sitemap-index.xml` and use the URL Inspection tool on a sample of previously "not indexed" URLs to confirm Google now sees rendered HTML.

## One thing I need from you

Search Console lists **8 reasons** behind the 632. Open "Pages → Why pages aren't indexed" and paste the reason names and counts (e.g. "Crawled – currently not indexed: 400", "Duplicate without user-selected canonical: 120", "Excluded by noindex tag: 40"). The right mix of steps 1–4 depends on that breakdown — I can start with step 1 regardless, since it is correct in every scenario.

## Honest expectation

No site gets 100% of URLs indexed. For a 1,100-page site, a realistic good outcome is a large majority of substantive pages indexed, with thin combinatorial pages deliberately excluded rather than fought for.

## Technical notes

- Files touched: `package.json` (build script), `vite.config.ts` (prerender gating), `scripts/prerender-routes.mjs` (route set), `scripts/generate-sitemap.ts` (URL pruning), `public/_headers` / `404.html` (status handling).
- No changes to app features, styling, or backend.
