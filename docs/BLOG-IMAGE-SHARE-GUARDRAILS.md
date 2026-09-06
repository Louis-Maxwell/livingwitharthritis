# Blog image & share preview guardrails

Runbook for Louis and agents. Prevents silent regressions where social crawlers
see "Page not found", homepage `/og/home.png` cards, mid-phrase titles, or
cover/image_url drift.

Related: [BLOG-IMAGES.md](./BLOG-IMAGES.md) (coverImage + Openverse map).

## Source of truth (do not invert)

| Concern | Source of truth | Never do this |
| --- | --- | --- |
| Listing / strip / related covers | `coverImage(category, title, slug)` then cover-map then `public/openverse/<file>.webp` | Prefer `article.image_url` alone for listings |
| In-article hero | `coverImage()` | Reintroduce category-bucket fallbacks for mapped slugs |
| Share / crawler og:image | `scripts/blog-head-data.json` `ogImage` from cover map | Leave blogs on `/og/home.png` |
| Share / crawler title | `blog-head-data.json` via `buildPageTitle()` / full headline | Ship Page-not-found titles or mid-phrase clips like With pipe |
| Static HTML for `/blog/*` | prebuild then generate-blog-head-data then postbuild inject-canonicals | Rely on SPA-only Helmet for crawlers |

`image_url` is **backfilled and guarded**: every published slug must have
non-null `image_url` matching `/openverse/<cover-map file>`. Listings must
still call `coverImage()` — `image_url` is a safety net so accidental reuse
cannot blank cards, not a license to bypass the map.

## Failure modes these guards block

1. Soft 404 / wrong title for crawlers — static HTML missing or still the homepage shell while the SPA worked.
2. Wrong share card image — ogImage missing leads to homepage /og/home.png while the UI showed the Openverse cover.
3. Mid-phrase title clip — e.g. Supporting a Partner With | Living With Arthritis UK.
4. Dual pipeline drift — content image_url null while cover map had files (UI OK via coverImage, fragile if someone reads image_url).
5. Competing agent rewrites — edits that break OptimizedImage / cover pipelines. Prefer map + generators + guards over bulk blog body edits.

## After content or cover changes

See checklist below. Regenerate cover map, head data, then run seo:blog-guards.

## Refresh social caches after deploy

After deploying fixed meta, re-scrape URLs in Meta Sharing Debugger and LinkedIn Post Inspector. Confirm live HTML has the full title and /openverse/ og:image.

## Checklist before merge / publish

- [ ] New slugs in blog-slugs and cover-map generated JSON
- [ ] Matching webp under public/openverse
- [ ] Published image_url non-null and map-aligned
- [ ] blog-head-data regenerated with openverse ogImage and full titles
- [ ] seo:blog-guards passes
- [ ] Listings use coverImage only
- [ ] Avoid bulk blog body rewrites for cover or share fixes
- [ ] Spot-check a few live share cards after deploy

## Automated guards

seo:blog-guards (check-blog-share-guards) asserts: every slug has cover-map + openverse file; every blog-head-data entry has non-empty /openverse/ ogImage and a sane title; published image_url is non-null and map-aligned; partner sample title/ogImage intact.

Vitest mirrors the same rules in blog-share-guards.test.ts, plus existing blog-image-url-backfill, blog-head-social-meta, and articleImages.unique-covers tests (CI via vitest run).

prebuild regenerates blog-head-data then runs seo:blog-guards so broken map or head data fails before vite build.

## Agent rules (identity + safety)

- Commit as Louis Maxwell info@livingwitharthritis.org.uk using GIT_AUTHOR and GIT_COMMITTER env vars only (do not edit git config).
- Do not mass-edit blog JSON for opportunistic fixes.
- Do not replace OptimizedImage or coverImage pipelines with remote CDN or category buckets.
- Prefer regenerating blog-head-data and running guards over hand-editing hundreds of head entries.

Primary Vitest file: src/lib/__tests__/blog-share-guards.test.ts
