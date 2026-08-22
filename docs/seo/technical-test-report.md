# SEO Technical Test Report

Run date: 22 August 2026

## Release build

- Framework: Vite + React + React Router.
- Canonical sitemap URLs: 959.
- Inventory rows: 978 (959 indexable URLs and 19 documented client-side replacements).
- Full Puppeteer prerender: successful.
- Built HTML pages scanned by metadata gate: 978.
- Generic homepage titles/descriptions/social metadata: 0.
- Unexpected built `noindex`: 0.
- Missing prerender output for sitemap URLs: 0.

## Inventory assertions

| Assertion | Result |
| --- | --- |
| Unique title on every indexable URL | Pass — 0 missing, 0 duplicate |
| Exactly one rendered H1 value per inventory URL | Pass — 0 missing, 0 duplicate |
| Absolute self-canonical | Pass — 0 missing, 0 duplicate |
| Meta description | Pass — 0 missing, 0 duplicate |
| Redirect source absent from sitemap | Pass |
| Redirect destination present in sitemap | Pass |
| Redirect chains or loops | Pass — 0 |

The full machine-readable result is in `docs/seo/content-inventory.csv`.

## Automated verification

- `npx vitest run`: 18 files, 101 tests passed.
- `npx tsc --noEmit -p tsconfig.app.json`: passed.
- `npm run lint`: 0 errors; 25 existing warnings remain.
- `npm run seo:redirects`: 19 mappings checked; no chains, loops, sitemap sources, missing destinations or documentation drift.
- `node scripts/check-prerender-meta.mjs --dist=/tmp/lwa-final-release --max-generic=0`: passed.
- Sitemap generation without private environment variables: uses the active public Supabase configuration and retains the checked-in inventory during an outage.

## Production crawl baseline

Before deployment, a non-JavaScript crawl of the live sitemap found:

- 998 URLs checked.
- 846 homepage-fallback responses.
- 19 wrong-canonical responses.
- 865 total failures.

This is the pre-deployment baseline. The release build resolves the static HTML defects, but the production crawl must be repeated after deployment.

## Live mobile Lighthouse baseline

Three runs per route, median values:

| URL | FCP | LCP | TBT | CLS | Speed Index |
| --- | ---: | ---: | ---: | ---: | ---: |
| `/` | 2.68 s | 2.93 s | 102 ms | 0.128 | 4.02 s |
| `/conditions/osteoarthritis` | 2.81 s | 2.96 s | 100 ms | 0.090 | 5.07 s |
| `/blog` | 2.92 s | 5.57 s | 30 ms | 0.000 | 4.87 s |

The live homepage misses the CLS target and the live blog misses the LCP target. The deployed prerender should remove the blog's client-side loading delay; both routes require a post-deployment measurement before further optimisation.

Lighthouse's accessibility, best-practices and SEO categories did not run under the repository's performance-only configuration, so no category score is claimed.

## Accessibility checks

- Duplicate global/header skip link removed.
- SPA route changes now focus the new H1 without stealing focus on initial load.
- Page transition animation is disabled under `prefers-reduced-motion: reduce`.
- Existing axe/Vitest accessibility tests passed as part of the full suite.

## Structured data

- Manufactured fallback FAQ questions were removed.
- FAQ schema is emitted only when at least two matching visible questions exist.
- Blog Article/MedicalWebPage/Breadcrumb/FAQ entities now have stable page-scoped IDs.
- Generic citations are no longer attached to unrelated articles.
- Unverified generic review boards and placeholder credentials are not emitted as Person/reviewer schema.
- Fabricated regional LocalBusiness/telephone data was removed.

The full browser-based JSON-LD crawler was not rerun across all 959 URLs because it is sequential and expensive. JSON syntax was parsed while generating the inventory; schema eligibility and medical claims still require editorial review.

## Hosting status limitation

Lovable managed hosting currently returns the SPA fallback with HTTP 200 for an unknown path and does not provide a demonstrated repository-controlled path-level 301/404 mechanism. Therefore:

- the custom 404 renders correctly after JavaScript but the transport status is still 200;
- the 19 redirect mappings are documented client-side replacements, not genuine HTTP 301s;
- no claim is made that HTTP status acceptance criteria are complete.

Moving the custom domain behind a configurable edge layer, or obtaining a supported Lovable path-routing feature, is required to finish those transport-level checks.
