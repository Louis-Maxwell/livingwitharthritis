# Keyword coverage implementation and site audit

All six datasets are now processed by `npm run seo:keywords`. It emits a deduplicated, per-keyword coverage CSV to `.preflight-reports/all-keyword-coverage.csv`, compact site-search aliases and content search pages, and contextual internal links consumed by both static article HTML and the React article view. Prebuild regenerates the map before the search index.

104,565 unique candidates (136,407 source entries): 475 literal phrases in authored content; 27,482 token co-occurrence candidates needing intent review; 76,608 content gaps. 10,163 candidates have at least one declared target outside the canonical sitemap, after exact redirect resolution. This is not a count of broken live URLs: some may be legitimate non-sitemap routes.

421 phrases are used as search aliases, capped at 12 per page. Search also includes 132 authored condition/library/guide records; deduplication yields 733 search records. Header search loads the complete catalog only on demand and preserves its static fallback if loading fails. Related reading is generated for 529 blog pages, at most three real canonical page links each, with actual page titles as anchors. The same links appear in initial HTML and hydrated content.

Generated datasets are candidates, not measured organic search keywords. Literal phrase presence does not establish that the page satisfies intent or meets clinical editorial standards. None of the 76,608 gaps is represented as published or optimised content. Content needs medical review and distinct useful answers before publication. No mass city/condition doorway pages, hidden keyword lists, fabricated medical reviews, or new meta-keywords tags are added.

## Audit commands

- `node scripts/audit-built-site.mjs`: every sitemap page's built response HTML; metadata, H1, canonical, noindex, JSON-LD syntax and duplicate titles/descriptions. Link candidates outside the sitemap are advisory; use the route-aware checker below for broken links.
- `npm run links:check`: built HTML, React routes, sitemap and blog-body internal links.
- `DIST_DIR=dist npm run seo:schema`: schema required-field validation.
- `npm run seo:foundations`: live redirects, HSTS, robots, sitemap and missing-URL HTTP status.
- `python scripts/audit-live-pages.py`: read-only six-worker crawl of all live sitemap URLs, separate from the changed build.

Google documentation: https://developers.google.com/search/docs/essentials/spam-policies and https://developers.google.com/search/docs/crawling-indexing/special-tags. Storing keywords, attaching a search alias, or writing a meta-keywords tag does not establish Google ranking coverage.

## Deployment and remaining work

Ship only when the native hosting project's latest commit matches the merged GitHub change. Live host `www` URLs still require permanent 301/308 redirects; missing URLs must return 404/410 rather than the homepage shell. A static `_redirects` file is already present, but the live host is not applying those response rules. Performance/Lighthouse, rendered accessibility, actual ranking counts, clinical review and intent satisfaction are outside this response-HTML audit. No 95+ or ranking guarantees are claimed.
