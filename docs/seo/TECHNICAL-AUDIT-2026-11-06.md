# Technical SEO and AI Retrieval Audit

**Repository:** `Louis-Maxwell/livingwitharthritis`  
**Branch audited:** `main`  
**Audit date:** 6 November 2026  
**Scope:** read-only repository scan followed by low-risk fixes

## Executive result

The codebase already has a mature SEO foundation. The scan found shared route-level metadata, canonical handling, Open Graph and Twitter card support, JSON-LD builders, sitemap generation, robots directives, internal-linking tests, clinical-review signals, and AI-readable files. No wholesale metadata or schema rewrite was warranted.

## Findings

| Area | Result | Evidence / residual work |
|---|---|---|
| Schema markup | Present | `src/lib/jsonLd.ts`, `src/lib/rootOrganizationSchema.ts`, route JSON-LD injection, and validation tests. Continue monitoring route-specific schema coverage. |
| Metadata | Present | Static fallbacks in `index.html` plus `SeoHead`/page-level Helmet metadata. |
| Canonical tags | Present | Shared canonical emission in `src/components/SeoDefaults.tsx`, build-time injection, and duplicate-canonical tests. |
| Open Graph | Present | Shared fallback and route-specific `og:title`, `og:description`, `og:url`, image, locale, and site-name coverage. |
| Twitter cards | Present | `summary_large_image` plus title, description, image, and the new shared account attribution. |
| Sitemap | Strong | `public/sitemap.xml` contains 994 URLs; `public/sitemap-images.xml` contains 527 image entries; duplicate `<loc>` count is 0; sitemap index is present. Generated from `scripts/generate-sitemap.ts`. |
| Content duplication | Guarded | Redirect/canonical utilities and translated-route noindex handling exist. Locale stubs are excluded from the sitemap. A live crawl is still needed to confirm server redirects and rendered duplicates. |
| Crawl issues | Guarded in code | `public/robots.txt` allows public content and blocks private utility routes. Build-time crawl checks exist. Full rendered crawl could not run because the local environment lacks Bun/Puppeteer. |
| Broken links | Automated checks exist | `npm run links:check` and route/link tests are present. A complete check requires installing the repository dependencies. |
| Internal linking | Strong but ongoing | Hub pages, blog clusters, breadcrumbs, site index, and orphan/cluster tests are present. Orphan-page monitoring should remain part of CI. |
| EEAT signals | Present | Charity Commission identifier, named Operations Director, clinical-review fields, reviewer/author routes, editorial standards, evidence register, corrections policy, and governance pages are present. |
| AI retrieval | Present | `public/llms-full.txt`, `public/ai.txt`, `public/answer-engine.json`, `humans.txt`, explicit AI crawler rules, entity JSON-LD, and AI guidance pages are present. |

## Low-risk change implemented

- Added `twitter:site` and `twitter:creator` to the static fallback metadata in `index.html`.
- Added the same two tags to shared route metadata in `src/components/SeoDefaults.tsx`.
- Added these tags to duplicate-pruning rules so route metadata remains single-valued when Helmet mounts.
- Restored the development-only warning emitted by `src/lib/seoMeta.ts` when titles or descriptions exceed configured limits; this does not alter production output.

The attribution uses the existing verified account configured by the repository: `@ArthritisOrg`.

## Verification limits

- The repository was cloned from the connected GitHub repository at commit `08ea6df` on the `main` branch.
- Static sitemap counts and duplicate URL checks completed successfully.
- The JSON-LD/rendered-site audit could not complete because Bun is unavailable and the validation script attempted to install Puppeteer through Bun.
- No live-site or external Search Console changes were made.

## Recommended follow-up

Install the repository's declared toolchain, then run:

```text
npm ci
npm run lint
npm run typecheck
npm run test
npm run links:check
npm run seo:schema
npm run seo:built-audit
```

These checks should run in CI on every SEO-sensitive change.
