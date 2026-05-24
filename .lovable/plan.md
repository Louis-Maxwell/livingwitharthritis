## Goal

Two related changes:

1. Replace the current grouped `/sitemap` page with a clean **A–Z user-facing index** of every public page on the site (the standard HTML "site index" pattern).
2. Resolve the SEO scanner's "Sitemap needs attention" finding, which flags `/chat`, `/auth`, `/admin`, `/admin/appointments`, `/admin/psi` as missing from `sitemap.xml`.

## 1. Rebuild `src/pages/Sitemap.tsx` as an A–Z index

Replace the current sectioned layout ("Main Pages", "Conditions", "Cities"…) with a single alphabetised index, the way large content sites (NHS, BBC, gov.uk) present their A–Z site index.

Structure:

```text
Site Index (A–Z)

[A] [B] [C] [D] … [Z]   ← sticky letter jump-nav

A
  About Us
  Accessibility
  Ankylosing Spondylitis
  Arthritis Flare-Ups
  …

B
  Blog
  Buddy Match
  …
```

Implementation details:

- Build a single flat `entries: { label, href }[]` array assembled from existing data sources already imported in the file:
  - Static curated pages (Home, About, Donate, Diet Hub, Exercise Hub, Self-Help Tool, Health Tools, Blog, Trust, Governance, Finances, Impact, Community, Press, Contact, FAQ, Privacy, Cookies, Terms, Accessibility, Safeguarding, Complaints, Ways to Help, Zakat Appeal, Corporate Giving, Newsletter, Library, Resource Directory, Gallery, etc. — mirrors `scripts/prerender-routes.mjs` plus the currently-listed curated routes).
  - Conditions (from `arthritisConditions` data — full list, not just 3).
  - Exercise×Joint matrix (existing `EXERCISE_TYPES × JOINT_TYPES`).
  - Tai-chi exercise variants and the Mediterranean diet pillar page.
  - Cities (`ukCities`) and City × Condition pages.
- Exclude non-indexable routes from the user-facing index too: `/auth`, `/admin/*`, `/chat`, `/donation-result`, `/unsubscribe`, `/newsletter/confirm`, `/debug/*`.
- Sort `entries` by `label.toLocaleLowerCase("en-GB")`, then `groupBy` first letter (A–Z; non-letter labels into a `#` bucket).
- Render:
  - Page header + intro paragraph ("Every page on Living with Arthritis, listed alphabetically.").
  - Sticky alpha-nav bar with anchor links `#a … #z` (skipped letters rendered as muted/disabled).
  - One `<section id="a">` per letter with an `<h2>` and a 2–3 column responsive `<ul>` of links.
  - Keep `Header`, `Footer`, and the existing `<Helmet>` block (title/description/canonical) — only the body content changes.
- Update the `<Helmet>` title to "Site Index (A–Z) | Living with Arthritis" and the meta description to match.
- Add `BreadcrumbList` JSON-LD via the existing `useEffect` pattern (Home → Site Index).
- Keep the existing route mounting in `src/App.tsx` (`/sitemap` already routes here — no change needed).

## 2. Fix the "Sitemap needs attention" finding

The scanner reports `/chat`, `/auth`, `/admin`, `/admin/appointments`, `/admin/psi` are missing from `public/sitemap.xml`. These are **intentionally excluded** in `scripts/generate-sitemap.ts` (`STATIC_EXCLUDE` set + the `path.startsWith("/admin")` / `"/debug"` guards) because they are auth, admin, and ephemeral utility routes that must not be indexed — the same routes are also `Disallow:`-ed in `public/robots.txt`. That is correct SEO behaviour, not a bug.

Action:

- Verify by re-reading `scripts/generate-sitemap.ts` (already confirmed in context) and `public/robots.txt`.
- Call `seo_chat--update_findings` with `finding_id: "http:sitemap"`, `state: "fixed"`, explaining that those routes are auth/admin/utility surfaces deliberately excluded from both `sitemap.xml` and `robots.txt`, per standard SEO practice.

## Out of scope

- The other open SEO findings (long condition titles, Lighthouse performance/accessibility) are separate issues — not touched here unless you ask.
- No changes to `public/sitemap.xml`, `scripts/generate-sitemap.ts`, or `robots.txt`.

## Files

- **Edit**: `src/pages/Sitemap.tsx` (replace body with A–Z index; keep imports, Header/Footer, Helmet, JSON-LD pattern).
- **No code change**: `scripts/generate-sitemap.ts`, `public/sitemap.xml`, `public/robots.txt`.
- **Tool call after build**: `seo_chat--update_findings` for `http:sitemap`.
