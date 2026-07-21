## Goal
Squeeze more AEO/GEO/SEO value out of the existing codebase with minimal credit spend — no bulk AI rewrites, no per-page loops. Every change is a small, high-leverage edit to shared templates/data that lifts many URLs at once.

## Approach: shared-primitive edits only
Instead of touching hundreds of pages, edit the ~8 shared files that render them. One edit = hundreds of URLs improved.

## Changes

### 1. AEO — answer-first primitives already exist, wire them wider
- `AeoEnhancement` is only mapped for ~30 routes in `scripts/apply-aeo.mjs`. Extend `src/data/page-aeo.ts` with concise `question`/`answer` entries for the comparison, glossary, and city templates by deriving them from existing `directAnswer`/`keyTakeaways` fields already in content data (no AI calls — pure JS mapping at module load).
- Render `AeoEnhancement` inside `ComparisonPage.tsx`, `GlossaryTerm.tsx`, `CityConditionPage.tsx`, `CityArthritisPage.tsx` once each — instantly adds answer-box + FAQ schema to ~270 URLs.

### 2. GEO — tighten UK signals in shared head
- In `SeoHead.tsx`: add `geo.placename=United Kingdom`, `geo.position`, `ICBM`, and `og:locale:alternate` (already partly there). Single-file edit, applies everywhere.
- In `SeoDefaults.tsx`: emit `<link rel="alternate" type="application/rss+xml">` pointing at the blog feed if one exists (skip if not).

### 3. SEO — structural fixes in shared code
- **JSON-LD `dateModified` normalisation**: earlier audit flagged inconsistent formats. Add a single `toIsoDate()` helper in `src/lib/jsonLd.ts` and route all schema builders through it.
- **Meta title enforcement**: `enforceTitle` already exists — audit `src/lib/seoMeta.ts` and tighten the 60-char rule + fallback so the 41 "too long" and 28 "missing" titles flagged earlier resolve at render time without touching each page.
- **Internal linking**: add a small `<RelatedLinks>` block (already exists as `relatedClusters.ts`) to `ComparisonPage.tsx` and `GlossaryTerm.tsx` footers — pulls from existing cluster data, no new content.
- **Breadcrumb JSON-LD**: ensure `SchemaBlocks` breadcrumb emits on comparison/city/glossary templates (spot-check; add if missing).

### 4. Housekeeping (near-zero cost)
- Regenerate `sitemap.xml` once at the end.
- Remove any remaining hardcoded `<link rel="canonical">` in templates (SeoDefaults is authoritative).

## Explicitly NOT doing (to stay cheap)
- No AI-driven blog rewrites (the 218-post rewrite is paused; not resuming here).
- No per-page manual edits.
- No new long-form content.
- No image/video regeneration.

## Verification
- `bun run build` once at the end.
- Spot-check 3 URLs (one comparison, one city, one glossary) via `code--view` of rendered template output — no browser session, no Playwright.

## Estimated scope
~8 file edits, 1 build, 0 AI generations. Should complete in a single short turn.
