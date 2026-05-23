## Objective
Fix all four currently failing SEO findings and ensure every page has exactly one concise, relevant `<h1>` heading.

## Current Failing Findings
1. **Page titles & descriptions too long** — /accessibility, /arthritis-starter-guide, /contact, /services titles >60 chars; /ai-safety, /accessibility, /corporate-giving, /expert-articles descriptions >160 chars.
2. **Sitemap needs attention** — Missing entries for /chat, /auth, /admin/*, /admin/appointments, /admin/psi.
3. **Page loads slowly** — Hero element (image or H1) takes too long to appear; needs explicit dimensions, `fetchpriority="high"`, and `font-display: swap`.
4. **Accessibility barriers** — Some text lacks sufficient contrast against its background.

## Plan

### Phase 1: H1 Audit & Fix
Audit every public route for `<h1>` presence and quality:
- Add missing `<h1>` to pages that lack one (e.g., `Auth.tsx` — "Sign In to Your Account"; verify `BlogCategory.tsx` delegates h1 to `BlogIndex`).
- Ensure `ConditionPageTemplate` and `PageHero` consistently render a single `<h1>` per page.
- Review pages with custom h1s for conciseness and keyword relevance.

### Phase 2: Title & Description Length
Edit each affected page to bring titles under 60 characters and descriptions between 50–160 characters, preserving meaning and UK focus.

### Phase 3: Sitemap Update
Update `scripts/generate-sitemap.ts` (or static `public/sitemap.xml`) to include missing routes. For `/admin/*` routes, decide whether to exclude (add `noindex`) or include based on intent. For dynamic routes (`/blog/:slug`, `/conditions/:slug`), verify they are already generated from data sources.

### Phase 4: Performance Fix
- Confirm hero image in `OAHero.tsx` has explicit `width`/`height`, `loading="eager"`, and `fetchpriority="high"`.
- Add `font-display: swap` to `@font-face` declarations in `index.css` or the Google Fonts loader.

### Phase 5: Contrast Fix
- Identify low-contrast arbitrary colors (e.g., `text-gray-300/400`, `text-muted-foreground/50`) and replace with design-system tokens (`text-foreground`, `text-muted-foreground`) that meet WCAG AA.

### Phase 6: Verification
After all edits, run a local build check (`bun run build`) to confirm no TypeScript or build errors. Then mark SEO findings as fixed via `seo_chat--update_findings`.

## Out of Scope
- No new dependencies.
- No redesign of page layouts.
- No changes to business logic or backend.