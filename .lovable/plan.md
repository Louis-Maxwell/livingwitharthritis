## Goal
Close the 4 open SEO scanner findings and add cheap AEO/GEO wins across shared templates. No AI bulk rewrites, no per-page loops.

## Changes

### 1. Sitemap sync (fix `http:sitemap`)
- In `scripts/generate-sitemap.ts`, add admin/auth routes as `noindex`-friendly OR — since `/auth` and `/admin*` are correctly excluded from indexing via `robots.txt` — instead update the scanner-visible sitemap by ensuring these routes are explicitly not expected. The 5 "stale" `/guides/*` slugs (`paracetamol-vs-ibuprofen-for-arthritis`, `topical-nsaid-vs-oral-nsaid-arthritis`, `physiotherapy-vs-surgery-knee-arthritis`, `nhs-vs-private-rheumatology`, `swimming-vs-walking-arthritis`) are actually served by the dynamic `ComparisonPage` route — verify each resolves via `COMPARISON_ROUTES`; if any truly don't exist, remove them; if they do, the finding is stale and can be marked fixed.
- Regenerate `public/sitemap.xml` once.

### 2. LCP + font-display (fix `lighthouse:lighthouse_performance`)
- In `index.html`: confirm the hero preload has `fetchpriority="high"` and no `loading="lazy"`; add explicit `width`/`height` on the hero `<img>` in `OAHero.tsx`.
- Add `font-display: swap` to every `@font-face` rule (check `src/index.css` / any font import).

### 3. Contrast (fix `lighthouse:lighthouse_accessibility`)
- Grep for `text-gray-300|text-gray-400|text-muted-foreground/50|opacity-50` on text and swap to `text-muted-foreground` or `text-foreground`. Spot-fix, no design overhaul.

### 4. New comparison guide (fix `agent_content:semrush_content_suggestions`)
- Add `/guides/febuxostat-vs-allopurinol` entry to `src/data/comparison-content.ts` with a ~900-word UK-focused article (intro, takeaways, sections, FAQ). Registered automatically via the dynamic comparison route + sitemap regen.

### 5. Low-credit AEO/GEO polish (shared-template only)
- **`SeoHead.tsx`**: add `<meta name="geo.placename" content="United Kingdom">`, `<meta name="geo.position" content="54.7024;-3.2766">`, `<meta name="ICBM" content="54.7024, -3.2766">`. One edit, applies sitewide.
- **`src/lib/jsonLd.ts`**: add a `toIsoDate()` helper and route all schema `dateModified`/`lastReviewed` fields through it so dates validate consistently.
- **Breadcrumb JSON-LD spot-check**: confirm `ComparisonPage`, `CityConditionPage`, `GlossaryTerm` emit `BreadcrumbList` schema; add via existing `PageSchema` if missing.

### 6. Mark stale findings fixed
- After edits, call `seo_chat--update_findings` for each addressed finding with a one-line explanation.

## Verification
- `bun run build` once at the end.
- Regenerate sitemap and spot-check the 5 flagged comparison slugs resolve.

## Explicitly NOT doing
- No bulk blog rewrites.
- No new components beyond the one new comparison entry.
- No design system changes.

## Scope
~6-8 file edits, 1 build, 1 sitemap regen, 4 finding updates.