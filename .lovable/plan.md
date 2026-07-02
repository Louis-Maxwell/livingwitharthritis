## Plan: SEO metadata for new guide + key landing pages

The new guide (`/guides/hip-exercises-for-osteoarthritis`) already ships full Helmet SEO (title, description, canonical, OG, Twitter). I'll verify it and extend the same pattern to the highest-value landing pages that are currently missing per-route head tags.

### 1. Audit (read-only)
Read each candidate page and check whether it already emits `<Helmet>` with title/description/canonical/og:*. Skip anything already covered by `SeoHead` / `SeoDefaults`.

### 2. Target landing pages
Priority routes (high-traffic, high-intent, likely missing or thin metadata):

1. `/` — Home (Index.tsx)
2. `/about-us`
3. `/donate`
4. `/exercise` (Exercise Hub)
5. `/diet` (Nutrition Hub)
6. `/conditions` (Conditions Hub)
7. `/blog-hub` (Guides hub)
8. `/chat` (Help & Support)
9. `/contact`

For any of these already using `SeoHead`, confirm title/description are specific and non-default; otherwise add `<SeoHead>` with:
- Unique `title` (≤60 chars, keyword-led)
- `description` (140–160 chars, UK English, plain)
- `path` (self-referencing canonical via SeoHead + SeoDefaults)
- `type="website"`
- Default OG image (already handled by SeoHead)

### 3. Verify new guide
Confirm `HipExercisesForOsteoarthritis.tsx` already emits:
- `<title>` + description
- `<link rel="canonical">`
- `og:title / og:description / og:url / og:type=article / og:image`
- `twitter:card` summary_large_image

(It does — from the file already in context.) No changes needed to that file.

### 4. Out of scope
- No new imagery / og:image generation
- No JSON-LD changes beyond what pages already emit
- No sitemap or route changes
- No copy rewrites beyond title/description

### Technical notes
- `SeoHead` component already centralises Helmet output; prefer it over hand-rolled Helmet blocks on landing pages.
- `SeoDefaults` handles canonical + hreflang globally, so per-page canonical from SeoHead is compatible (Helmet dedupes `<meta>`, not `<link rel=canonical>` — SeoHead intentionally omits canonical to avoid duplicates; SeoDefaults owns it).
- All titles will use en-GB spelling to match existing site voice.

### Deliverable
Up to 9 small edits adding `<SeoHead …/>` (or tightening existing head tags) on the listed pages. No behavioural or visual changes.
