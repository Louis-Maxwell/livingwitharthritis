# Plan: Enforce meta title & description length at render time

## Goal
Guarantee that every route emits:
- `<title>` ≤ 60 characters (including any " | Living With Arthritis UK" suffix)
- `<meta name="description">` between 120–160 characters

…regardless of static strings, dynamic slugs, CMS content, or truncated descriptions. Also fix any current offenders surfaced by the audit.

## Approach

### 1. Central enforcement in `src/components/SeoHead.tsx`
`SeoHead` is used by ~all pages. Add a pure helper module and apply it inside the component so enforcement is unavoidable:

- New `src/lib/seoMeta.ts` exporting:
  - `enforceTitle(title: string, opts?: { includeSiteName?: boolean }): string`
    - Reserves space for `" | Living With Arthritis UK"` suffix when `includeSiteName` is true.
    - If the composed title > 60 chars, truncate the raw title on a word boundary, append `…` only if truncation removed a full word; ensures final composed length ≤ 60.
    - If `includeSiteName` is true but there is no room for the suffix (raw title already > ~35 chars), drop the suffix rather than overflow.
  - `enforceDescription(desc: string, min = 120, max = 160): string`
    - If length > max: truncate on word boundary ≤ 157 chars + `…` (final ≤ 160).
    - If length < min: leave as-is but flag via `console.warn` in dev; do NOT pad with filler (padding would be low quality). Under-length is a content bug to fix at source.
  - `assertMetaLengths(route, title, desc)` — dev-only `console.warn` when limits are violated pre-truncation, so future authors see the warning in Vite dev.

- Update `SeoHead` to:
  - Run `enforceTitle` on the composed title (respecting `includeSiteName`).
  - Run `enforceDescription` on `description`.
  - Emit warnings in `import.meta.env.DEV` only.
  - Feed the enforced values into both the primary `<title>`/`<meta description>` and the OG/Twitter mirrors so all social tags stay consistent.

### 2. Cover the non-SeoHead routes
A handful of pages (e.g. `ArthritisSupportIndex.tsx`, some city/service programmatic pages, `ExpertArticle`) build `<Helmet>` directly. Two options — I'll do both:
- Migrate those to `SeoHead` where trivial (preferred).
- For dynamic/templated pages that must keep custom Helmet (city × service matrix, condition subpages, blog articles), import `enforceTitle` / `enforceDescription` and wrap the strings at the point they're passed to `<title>` / `<meta name="description">`.

Target files (based on repo tree):
- `src/pages/ArthritisSupportIndex.tsx`
- `src/pages/ExpertArticle.tsx`
- Programmatic route templates: city-service, city-condition, exercise-joint, condition subpages, blog article template, faq article template.
  (I'll grep for `<title>` / `name="description"` and enforce every occurrence.)

### 3. Audit script + build-time check
Extend `scripts/seo-audit.ts` (already exists) so it:
- Iterates every route emitted into `sitemap.xml`.
- Renders the route via the existing prerender pathway OR reads the static SEO data files/templates that back each route.
- Fails (non-zero exit) if any composed title > 60 or description < 120 or > 160.
- Prints a table of offenders with route, length, and text.

Wire it into the existing `bun run seo:audit` (already run in CI). Since it already exists in CI, this makes the constraint enforced on every PR as well as at render time.

### 4. Fix current offenders
Run the extended audit locally, then patch each offending file — trimming titles, rewriting under-length descriptions to sit in 140–155 chars, keeping UK spelling and existing voice. Expected surface: dynamic templates (city × service, condition subpages), plus any pages missed in the previous meta audit pass. No design changes.

### 5. Verification
- `bunx tsgo --noEmit` stays green.
- `bun run seo:audit` passes with zero length violations.
- `bun run seo:schema` unchanged (should stay green).
- Spot-check 5 routes in the preview and confirm the emitted `<title>` / `<meta description>` in DOM are within limits.

## Out of scope
- No design/content overhaul beyond trimming to length.
- No changes to canonical/OG image logic.
- No changes to the chatbot, sitemap generation, or migrations.

## Deliverables
- `src/lib/seoMeta.ts` (new)
- `src/components/SeoHead.tsx` (enforcement wired in)
- Direct-Helmet route files updated to use the helpers
- `scripts/seo-audit.ts` extended with length check
- Any offending page's title/description trimmed to fit
- Final summary listing every file changed and the audit result