# Knee, Hand & Shoulder Arthritis Pages

## Goal
Add three SEO-optimised landing pages targeting high-intent UK queries ("knee arthritis", "hand arthritis", "shoulder arthritis") so they rank independently of the generic Osteoarthritis page and feed internal links into existing condition/exercise/diet hubs.

## New routes
- `/conditions/knee-arthritis` → `src/pages/conditions/KneeArthritis.tsx`
- `/conditions/hand-arthritis` → `src/pages/conditions/HandArthritis.tsx`
- `/conditions/shoulder-arthritis` → `src/pages/conditions/ShoulderArthritis.tsx`

Wired into `src/App.tsx` as lazy routes alongside the existing eight condition pages.

## Page structure (each)
Built from the bespoke `Osteoarthritis.tsx` pattern (richer than `ConditionPageTemplate`) so each page has unique copy, stats and graphics — not a thin duplicate.

Sections:
1. Hero with single H1 (e.g. "Knee Arthritis"), intro paragraph, breadcrumb
2. Stats strip (UK prevalence, typical onset age, exercise benefit, weight-loss impact)
3. What is [joint] arthritis — H2 + H3 subheadings
4. Symptoms specific to that joint
5. Causes & risk factors (joint-specific: e.g. meniscus injury for knee, repetitive grip for hand, rotator cuff wear for shoulder)
6. Best exercises for that joint (3-5 named exercises each)
7. Diet & anti-inflammatory guidance (shorter, links to Diet Hub)
8. Treatment options (conservative → medical → surgical)
9. FAQ (5 joint-specific Q&As)
10. Internal links: related conditions, ExerciseHub, DietHub, Self-Help Tool
11. ReadNextCards + CrossLinkBanner

Heading hierarchy: exactly one H1, H2 per section, H3 for sub-topics. No skipped levels.

## SEO head (per page, via `<Helmet>`)
- `<title>` ~55 chars, pattern: `[Joint] Arthritis — Symptoms, Exercises & Treatment | Living With Arthritis`
- `<meta name="description">` ~155 chars, joint-specific
- `<meta name="keywords">` joint-specific long-tail set
- Canonical + `hrefLang="en-GB"` + `geo.region=GB`
- Open Graph: `og:title`, `og:description`, `og:url`, `og:type=article`, `og:locale=en_GB`, `og:site_name`, `og:image` (1200×630) + width/height/alt
- Twitter: `summary_large_image` card with title/description/image
- Three JSON-LD blocks: `MedicalWebPage` (with `about: MedicalCondition` scoped to that joint), `BreadcrumbList` (Home → Conditions → [Joint] Arthritis), `FAQPage`

## Cross-linking
- Add the three new pages to the Conditions section listing on the homepage (`#conditions`) and to `InternalLinks` / `ContextualLinks` so the existing Osteoarthritis page links out to the joint-specific deep dives.
- Update the parent Osteoarthritis page to surface "See also: Knee / Hand / Shoulder arthritis" links.

## Sitemap
Append the three new URLs to `public/sitemap.xml` with `changefreq=monthly`, `priority=0.8`.

## Out of scope
- New OG hero images (will reuse `og-osteoarthritis.jpg` until branded artwork is generated; flagged for follow-up).
- Content for finger/thumb/hip/ankle sub-pages.
- Refactor of existing condition pages.

## Technical notes
- React Router v6 lazy routes, react-helmet-async for per-page head, framer-motion for section reveals — same stack as existing condition pages.
- All copy hand-written per joint; no template re-skin, to avoid thin-content / duplicate-content penalties.
- Strict en-GB spelling; no medical claims beyond NICE/Versus Arthritis-aligned guidance.
