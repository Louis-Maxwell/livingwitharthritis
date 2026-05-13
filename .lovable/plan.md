## Goal
Validate every JSON-LD block actually rendered by the site (sitewide + per route, including the Product schema on `/product/:id`) and fix real parsing errors and missing required fields. Cosmetic / "nice-to-have" warnings will be listed but not auto-fixed unless they block Google rich results.

## What's already in place
- **Sitewide** (`index.html`): inline `<script type="application/ld+json">` blocks for `MedicalOrganization` / `NGO` / `Organization`, `MedicalWebPage`, `BreadcrumbList`, `FAQPage`. JSON-parseable.
- **Per route**: ~40 pages emit JSON-LD via Helmet `<script type="application/ld+json">{JSON.stringify(...)}</script>` or via `useEffect` DOM injection. Schemas in use: `MedicalWebPage`, `WebPage`, `BreadcrumbList`, `FAQPage`, `HowTo`, `Article`, `MedicalCondition`, `CollectionPage`, `ItemList`, `Product`.
- **Static-scan validator** (already run) flagged 77 "errors", but ~75 are false positives — variables (`jsonLd`, `breadcrumbLd`, `faqLd`, `article`, `stories`, `caseStudies`, `FAQS`, `extractFaqs`) are all defined inside the same component scope, just not reachable from a stand-alone eval. Real validation must happen on the rendered DOM.

## Known real issue (worth fixing now)
**`src/pages/ProductDetail.tsx` Product schema** (line 96-116) is missing fields Google requires for Product rich results:
- `brand` — required.
- `sku` *or* `gtin` *or* `mpn` — at least one required.
- `offers.priceValidUntil` — recommended.
- `aggregateRating.reviewCount` falls back to `(product as any).reviewCount ?? 100` — the cast is fine, but the `100` placeholder should be removed since every product in `affiliateProducts.ts` already defines `reviewCount`.

The `AffiliateProduct` type in `src/data/affiliateProducts.ts` does not yet have `brand` or `sku` fields, so we'd extend it (optional fields) and populate where known, falling back to `"Living With Arthritis"` curated selection / the `id` as SKU when not set.

## Plan

### 1. Runtime validation harness (script, not shipped)
Add `scripts/validate-jsonld.mjs` (run locally, not part of build):
- Boots a headless puppeteer/playwright (or just uses `bun --eval` + `fetch` against the running preview URL `https://id-preview--…lovable.app`).
- For each route in `public/sitemap.xml`:
  - Fetch the rendered HTML *and* wait for hydration so Helmet/`useEffect`-injected blocks land in `document.head`.
  - Extract every `script[type="application/ld+json"]`.
  - `JSON.parse` each → records parse errors verbatim.
  - Per-`@type` required-field check (Product, Article, FAQPage, BreadcrumbList, HowTo, Organization, WebSite, MedicalWebPage).
  - Writes a report to `/mnt/documents/jsonld-report.json` and a Markdown summary.
- Output: list of (route, schema type, error/missing-field) tuples.

### 2. Fix real parse errors surfaced by the harness
For each genuine `JSON.parse` failure, edit the source file. Likely culprits if any: stray `undefined` values from optional chaining (these become invalid JSON via `JSON.stringify` only if assigned to an array slot — usually fine because `JSON.stringify` drops `undefined` in objects).

### 3. Patch the Product schema
- Extend `AffiliateProduct` interface in `src/data/affiliateProducts.ts` with optional `brand?: string` and `sku?: string` (default to `id`).
- Update `ProductDetail.tsx` Product JSON-LD to include:
  - `brand: { "@type": "Brand", name: product.brand ?? "Recommended by Living With Arthritis" }`
  - `sku: product.sku ?? product.id`
  - `mpn: product.sku ?? product.id` (Google accepts either)
  - Drop the `?? 100` fallback on `reviewCount`.
  - Keep existing `offers`, `aggregateRating`, `image`, `description`.

### 4. Re-run the harness, confirm zero parse errors and zero missing-required warnings on Product / Article / FAQPage / BreadcrumbList. Output the final report at `/mnt/documents/jsonld-report.md`.

### 5. Mark relevant SEO Review findings as fixed (if any are open for "Structured data" / "Product schema").

## Out of scope
- We won't add `Review` schemas (we don't have first-party reviews — only aggregate rating from Amazon).
- We won't switch existing `useEffect`-injected schemas to Helmet (project memory: useEffect injection is intentional to avoid Helmet crashes).
- Sitemap changes — separate task.

## Files likely touched
- New: `scripts/validate-jsonld.mjs`
- Edit: `src/pages/ProductDetail.tsx`, `src/data/affiliateProducts.ts`
- Edit (only if harness flags real errors): any of the per-route pages
