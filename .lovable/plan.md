## Goal
Elevate the landing page hero with a real, dignified photograph; ship the refreshed sitemap & robots; submit to Google Search Console; broaden Organization/Breadcrumb/FAQ JSON-LD coverage; and close any remaining Lighthouse regressions.

## 1. Landing page — institutional "£300M charity" polish
Scope is presentation only; routes and copy stay.
- Replace `src/assets/hero-oa-portrait.jpg` (current AI-styled image) with a real, licensed Unsplash photograph of an older couple (UK-appropriate, warm, candid). Save the 1600w JPEG to `src/assets/hero-oa-portrait.jpg` (same import path → zero code changes) and add 800/1200/1600w `srcset` to `OAHero.tsx`.
- Tighten `OAHero` micro-copy and add a slim trust ribbon under the CTAs (HCPC · CSP · NICE-aligned, already used elsewhere) — single-line on desktop, wraps on mobile. No new sections.
- Raise editorial weight on `MissionStatementBand`, `ChangeLivesStats`, and `FeaturedStoryBand` via spacing, type scale, and one large pull-quote — no new components.

## 2. Publish refreshed sitemap & robots
- Already regenerated locally (456 entries, `/chat` present, zero private leaks). Trigger a publish action so the live host serves the new `public/sitemap.xml` and current `public/robots.txt`.
- Re-curl live `/sitemap.xml` and `/robots.txt` after publish; report counts and verify `/chat` is present, `/auth|/admin|/donation-result|/unsubscribe|/newsletter/confirm|/debug|/site-index` are absent.

## 3. Google Search Console — submit sitemap & verify indexability
- Use the GSC connector (`LOVABLE_API_KEY` + `GOOGLE_SEARCH_CONSOLE_API_KEY` both available) to:
  1. List verified sites; if `https://livingwitharthritis.org.uk/` is unverified, run the META-token flow (insert tag in `index.html`, publish, call `webResource` verify).
  2. PUT the site, then POST sitemap submission: `/webmasters/v3/sites/<encoded>/sitemaps/<encoded-sitemap-url>`.
  3. Run `urlInspection.index.inspect` for `/`, `/chat`, `/auth`, `/admin`, `/donation-result` — confirm `/` and `/chat` are indexable, others return `BLOCKED_ROBOTS_TXT` or noindex.
- Report results in chat (status per URL). User won't need to open GSC manually.

## 4. Structured data (Organization, Breadcrumb, FAQ)
Inject via `useEffect` (per project memory — avoids Helmet crashes). Reuse the existing pattern in `Index.tsx`.
- **Organization** — already present in `index.html` for sitewide. Verify it's complete (logo, sameAs, contactPoint, address). Patch if missing fields.
- **BreadcrumbList** — add a tiny helper `src/lib/jsonLd.ts` exporting `buildBreadcrumb(items)` and inject on: condition pages (`/conditions/*`), blog hub + post pages, diet/exercise hubs, city pages, regions. ~12 routes.
- **FAQPage** — landing `FAQSection.tsx` already renders Q&A; emit matching FAQPage JSON-LD on Index, plus on `ArthritisFlareUps`, `WaitingListHelp`, `ZakatAppeal`, and condition pages that have FAQ blocks.
- Validate locally with `scripts/validate-jsonld.mjs` (already in repo).

## 5. Performance pass
- Add `<link rel="preload" as="image" href="/hero-oa-portrait.jpg" fetchpriority="high">` in `index.html` for hero LCP (image is currently imported by bundler — switch to a hashed asset path in `public/` for direct preload, OR keep the import and rely on `fetchPriority="high"` already set; pick the lower-risk option: keep import + skip preload tag, since path hashing breaks preload).
- Verify all `@font-face` declarations carry `font-display: swap` in `src/index.css`.
- Defer non-critical third-party scripts (GA4 already async — confirm).
- Audit any `loading="lazy"` on above-the-fold images; ensure only the hero is `eager`.
- Run a headless Lighthouse via `browser--performance_profile` on `/`, `/diet`, `/exercises`, `/blog`; report scores and fix any regression > 0.1s LCP or any new CLS.

## 6. Mark SEO findings fixed
- After publish, call `seo_chat--list_findings` and mark sitemap/structured-data/performance items fixed with one-line explanations.

## Out of scope
- New routes, copy rewrites beyond hero ribbon, backend changes, blog content edits, donation flow changes.
- Migrating the static sitemap to the edge function (`supabase/functions/generate-sitemap`).