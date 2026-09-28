# Technical audit — livingwitharthritis.org.uk (September 2026)

Repository: `Louis-Maxwell/livingwitharthritis` (Vite + React single-page app, published through Lovable).
Audit and fixes: 28 September 2026. Companion roadmap: [`2026-09-roadmap.md`](./2026-09-roadmap.md).

## 1. How the site works (context for every finding)

- **Static SPA, no backend.** Lovable serves the files in `dist/`. The browser renders every page with React. Build scripts write a static HTML copy of each guide, used for crawlers and the no-JS fallback.
- **Nothing runs on a server we control.** There is no server-side logging. Forms either `POST` to FormSubmit or open an email draft (`mailto:`). The chat assistant runs locally in the browser.
- **The host ignores `public/_headers` and `public/_redirects`.** Checked with `curl` against the live site on 28 Sep 2026: the only CSP header returned is `frame-ancestors 'self'`, and cache-control is `no-cache, must-revalidate`. Consequences:
  - The `<meta http-equiv="Content-Security-Policy">` in `index.html` is the policy that actually applies.
  - Retired URLs are handled by static redirect stubs plus a client-side redirect, not by real HTTP 301s.

## 2. Method

| What | How |
|---|---|
| Initial JavaScript | Headless Chrome, 390×844 viewport, the site's own JS files requested before `load` + 800 ms. Build served locally with gzip and the host's routing (`dir/index.html` per route). Reported as gzip transfer and raw size. |
| Lighthouse | Lighthouse 13.5, default mobile preset (simulated slow 4G, 4× CPU). Build served locally over HTTP/2 + TLS to mimic the CDN. Median of 3 runs. |
| Accessibility | axe-core 4.12, WCAG 2.0/2.1 A + AA and 2.2 AA tags. Mobile (390 px) and desktop (1366 px). Serious and critical issues counted. |
| Dead code / deps | knip + manual verification. |
| CSP | Puppeteer with analytics consent granted, listening for `securitypolicyviolation`. |

Pages measured: home `/`, and the guide `/blog/sex-and-intimacy-with-arthritis` (a typical long guide).
**Before** = `main` at `17abfae`, before any fix. **After** = `main` with PRs #104–#108 plus the CI PR.

These are lab numbers from a local server. Field data (Chrome UX Report / GA4 web-vitals) will differ, mostly because of the real CDN and real devices.

## 3. Results against the targets

| Target | Home before | Home after | Article before | Article after | Met? |
|---|---|---|---|---|---|
| Initial JS < 300 KB gzip | 324.6 KB (991 KB raw) | **212.0 KB** (615.5 KB raw) | 549.3 KB (1,853 KB raw) | **276.2 KB** (822.1 KB raw) | ✅ both |
| Mobile Lighthouse performance > 90 | 91 | **98** | 92 | **92** | ✅ both |
| LCP < 2.5 s (mobile lab) | 3.2 s | **2.2 s** | 3.0 s\* | **3.2 s** | ✅ home / ❌ article |
| Lighthouse accessibility | 97 | **100** | 97 | **100** | ✅ |
| Lighthouse best practices / SEO | 100 / 100 | 100 / 100 | 100 / 100 | 100 / 100 | ✅ |
| axe serious/critical page-views | 12 of 12 failing (6 key pages × 2 viewports, build just before #108) | **0 of 28** (14 pages × 2 viewports) | | | ✅ |

\* The "before" article LCP of 3.0 s was measured on the wrong element. The page-enter animation faded the article in from `opacity: 0`, and Chrome ignores transparent paints for LCP, so the cookie banner was reported as the LCP. With the fade fixed, LCP measures the guide text itself.

**Why the article LCP target is not met at repository level:**
- The largest element is the guide's opening paragraph, and React has to download and run before it appears.
- Initial JS on the article is already down 50% (549 → 276 KB gzip), the BlogPost chunk is preloaded from the HTML, and fonts and images are not the bottleneck.
- The remaining ~0.7 s is client-side rendering itself.
- The fix is to show the prerendered guide HTML (already in each page's `#seo-fallback`) before JavaScript runs. That HTML was deliberately hidden in commit `929b5cd` because it caused a flash of unstyled text.
- Doing this properly needs styled static HTML plus hydration, or a host with static-site generation. That is roadmap item P1-1, not a quick change.

## 4. Summary of the eight issues

| # | Issue | PR | Status |
|---|---|---|---|
| 1 | Blank screen after deploys | #104 | Merged |
| 2 | Slow pages / heavy JavaScript | #106 | Merged |
| 3 | Dead code, paused pages, unused deps, fabricated donor data | #105 (+ link fixes in the CI PR) | Merged |
| 4 | No working error monitoring | #107 | Merged (GA4 dashboard setup needs Louis) |
| 5 | Poor LCP / mobile layout | #106 | Merged (article LCP: see §3) |
| 6 | CSP out of date, console errors | #107 | Merged |
| 7 | Accessibility (WCAG AA), contrast, stacked popups | #108 | Merged |
| 8 | CI lets broken code through | CI PR (`fix/health-6-ci`) | Open when this report was written |

## 5. Findings, root causes and fixes

### Issue 1: blank screen after deploys (PR #104)

- **Root cause:**
  - Each publish replaces the hashed JS chunks.
  - A tab (or a CDN edge) still holding the previous `index.html` asks for chunk URLs that no longer exist.
  - The dynamic `import()` rejects, nothing catches it, and React unmounts to a blank page.
  - `_headers` also allowed stale HTML for 10 minutes, though the host ignores that file.
  - No service worker has ever shipped, so a service worker is not the cause.
- **Fix:**
  - `src/lib/chunkRecovery.ts`: `lazyWithRetry` (2 retries), then one guarded reload with a cache-busting parameter. All 42 `React.lazy` call sites now use it.
  - `vite:preloadError` handling, plus a boot guard in `index.html` that reloads once if an `/assets/*` entry file 404s before React starts.
  - ErrorBoundary reloads once on chunk errors and otherwise shows a friendly fallback with a Reload button.
- **Verification:** unit tests, plus a Playwright test that 404s a route chunk and asserts exactly one recovery reload. The test runs in the required smoke job.

### Issue 2 + 5: heavy JavaScript, LCP and mobile layout (PR #106)

- **Root causes:**
  - Home loaded many widgets eagerly: language menu, AEO block, Radix toaster and tooltip, web-vitals, the SEO redirect tables, the full cover-image map, the exercise matrix, and the donation modal (which pulled in framer-motion) on every page.
  - Articles also pulled in the whole 86 KB blog catalog just to read review dates, the `marked` parser (needed by 5 of 524 guides), and all below-the-fold furniture.
  - LCP was distorted by the `opacity: 0` page-enter fade (see §3).
  - On phones, the sticky donation bar took 180–260 px of the header, and the cookie banner covered the page title.
- **Fixes:**
  - Lazy-load or defer each of those widgets until after page load.
  - Mount the donation modal and resource drawer only when opened.
  - Replace the Radix tooltip with CSS (dependency removed).
  - Add a generated review index (`src/data/blogReviewIndex.generated.json`) and a split guide loader. The CodeQL finding on that loader was fixed with slug validation.
  - Load `marked` on demand.
  - Viewport-gate below-the-fold sections.
  - Make the page-enter animation slide-only.
  - Enable modulepreload and preload the article chunk from the static HTML via the Vite manifest.
  - Collapse the donation bar to one row under 640 px and move the cookie banner above the bottom nav.
- **Metrics:** see §3.

### Issue 3: dead code, paused pages, unused dependencies, fabricated data (PR #105 + CI PR)

- **Root cause:** years of prototypes left in the tree:
  - 147 unused files (found by knip)
  - 25 unused dependencies
  - paused or placeholder pages still routable: `/admin/*`, `/auth`, "coming soon" `/shop` and `/product/:handle` (with a Shopify cart sync running on every page), `/buddy`, `/podcasts`, and the paused peer-support forum
  - a live "donation ticker" showing 20 invented donors, and hard-coded "raised" meters
- **Fixes:**
  - Deleted all of the above.
  - 301 map in `src/lib/seoRedirects.ts`, synced to `_redirects` and static redirect stubs:
    - `/shop` and `/product/*` → `/supplements`
    - `/buddy*` → `/community/connect-groups`
    - `/podcasts` → `/community`
  - Admin and auth were `noindex` and now fall through to the 404 page.
  - A guard test blocks fabricated donors and hard-coded totals.
- **Dependencies removed:** `@hookform/resolvers`, 12 unused `@radix-ui/*` packages, `cmdk`, `date-fns`, `embla-carousel-react`, `input-otp`, `react-day-picker`, `react-hook-form`, `react-resizable-panels`, `recharts`, `ts-deepmerge`, `uuid`, `vaul`, `zod`, `zustand`, `@types/dompurify`. Later PRs also removed `@radix-ui/react-tooltip` (#106) and `@sentry/react` / `@sentry/vite-plugin` (#107).
- **Links fixed in the CI PR** (found by the new link checker):
  - Six `/blog/…` slugs linked from site search, the HTML sitemap and hub pages had never existed. Links now point to the real guides, and the old slugs 301 in case they were indexed.
  - `/support` (27 guides) → `/arthritis-support`
  - `/community-hub` (6 guides) → `/community`
  - `/guides/pain-management` → `/guides/arthritis-pain-relief`
  - `/tools/waiting-time-calculator` → `/tools/waiting-time`
  - The region breadcrumb pointed at a non-existent `/regions`; it now goes to `/arthritis-support`.
- **Not removed:** `/debug/schema` is only registered in development builds (`import.meta.env.DEV`), so it never ships to production.

### Issue 4: error monitoring (PR #107)

- **Root cause:** `@sentry/react` was initialised, but no DSN was ever configured, and Sentry's ingest host was not allowed by the CSP. It could never send anything. Front-end errors, failed requests and failed form submissions were invisible.
- **Fix:** a single swappable module, `src/lib/errorReporting.ts`, that sends GA4 `exception` events (GA4 already exists and is consent-gated). It captures:
  - uncaught errors and unhandled promise rejections
  - chunk-load failures
  - React render crashes (fatal)
  - failed `fetch` calls (analytics hosts, aborts and HEAD probes ignored)
  - form submission failures: newsletter, contact, volunteer, corporate giving, partners, comments, and the donation modal (including "Stripe link not configured")
  Descriptions are scrubbed of emails, phone numbers and query strings, capped at 100 characters, deduplicated, and limited to 20 events per page.
- **Honest limits:**
  - There is no backend, so nothing is logged server-side.
  - Visitors who decline analytics cookies are not reported.
  - GA4 is not a real-time alerting tool.
- **Dashboard:** `docs/monitoring/error-reporting.md` lists the one-time GA4 steps: register custom dimensions, build a "Site errors" Free-form exploration, and add an optional custom-insight alert. It also explains how to swap to Sentry or a similar service later. That needs an account (not created, per instructions), and its ingest host must be added to the CSP.

### Issue 6: CSP and console errors (PR #107)

- **Root cause:**
  - The CSP still allowed services the site no longer uses: Stripe.js, PayPal, Resend, the Lovable gateway, `*.lovable.app`, Google Fonts.
  - The `_headers` copy had drifted from the `index.html` copy, and only the meta copy applies (see §1).
  - Every guide fired a HEAD request for a voiceover `.mp3` that doesn't exist, producing a 404 in the console on every article.
- **Fix:**
  - The CSP was rebuilt from real traffic. `index.html` and `_headers` are kept identical, with a parity test.
  - Voiceover availability now comes from a registry (`src/data/articleAudio.ts`, tested against `public/audio`) instead of a network probe.
  - The PDF footer showed the `.lovable.app` domain; it now shows `.org.uk`.
  - The newsletter success message no longer shows visitors an internal admin note.
- **Verification:** no CSP violations on /, the guide, /contact and /zakat-appeal with analytics consent granted.

### Issue 7: accessibility (PR #108)

- **Root causes:**
  - A global `p { color: hsl(var(--foreground)) }` base rule stopped paragraphs inheriting their container's colour, so the red announcement banner showed black text (3.85:1).
  - Brand red `#D60000` text on red-tinted chips dropped to 4.2–4.5:1.
  - The FAQ accordion put a link inside the `<button>` (nested interactive, and a 14 px target). Its hash never matched the handler, so shared FAQ links didn't open the answer.
  - Inline links relied on colour alone.
  - Each popup (help chat, accessibility panel, donation dialog, resource drawer, mobile menu) had its own state, so several could stack. The cookie banner floated above modal backdrops, and two panels ignored Escape.
  - The donation bar's "GB GBP" pill looked like a dropdown but did nothing.
- **Fixes:**
  - Paragraphs inherit colour.
  - New `--primary-text` (`#B80000`) used only for red text: 6.8:1 on white, 5.3:1 on tinted chips. Brand red is kept for fills.
  - The FAQ link moved into the answer and the hash handling was fixed.
  - Inline links are underlined.
  - New overlay coordinator (`src/lib/overlayCoordinator.ts`, `src/hooks/useExclusiveOverlay.ts`): opening a popup closes the others, the cookie banner steps aside while one is open, and Escape closes and returns focus.
  - The currency pill is now a plain label.
- **Also fixed in the CI PR:** after a failed contact-form submit, focus now moves to the first invalid field (it silently didn't before).
- **Guard:** `e2e/a11y-smoke.spec.ts` runs in the required "Blog smoke" job on 6 key pages at both viewports, plus popup-stacking tests.

### Issue 8: CI lets broken code through (CI PR)

- **Root causes:**
  - `npx tsc --noEmit` ran against the root `tsconfig.json`, which has `"files": []`, so **type checking checked nothing** in both CI and "Keep green".
  - ESLint warnings never failed.
  - The E2E job ran against a dev server that was never started, was marked `continue-on-error`, and its specs had gone stale (12 of 42 failing unseen).
  - `npm audit` ended in `|| true`.
  - The Lighthouse job asserted on categories it never ran (so it always failed) and was `continue-on-error`.
  - No internal link checking.
  - The search-index step in `prebuild` could fail silently.
- **Fixes:**
  - `npm run typecheck` checks `tsconfig.app.json` and `tsconfig.node.json`. This also catches missing or misspelled imports; `vite build` fails on them too.
  - `eslint . --max-warnings 0`. The 4 existing warnings were fixed.
  - New `scripts/check-internal-links.mjs` (`npm run links:check`), run in the required `build-and-audit` job after the prerendered build. It checks every internal link in the built HTML, the sitemap, the React source and the guide content against built pages, routes (`/blog/:slug` only for real guides) and the redirect map.
  - The E2E job builds, serves `dist/`, runs every spec and fails on any failure. Stale specs were rewritten against the current pages.
  - `npm audit --audit-level=moderate` enforced (currently 0 vulnerabilities).
  - The Lighthouse config now runs the categories it asserts on and no longer hides failures. Mobile passes locally.
  - The search-index `|| true` was removed.
  - CodeQL: the one open warning (missing regex anchor in a test) was fixed.
- **Still optional by design:**
  - `indexnow-ping.mjs` never fails the build (external ping).
  - `predev` generators stay lenient for local development only.

## 6. Things that cannot be fixed in the repository

| Item | Why | What is needed |
|---|---|---|
| Article LCP < 2.5 s | Client-side rendering (see §3) | Roadmap P1-1 |
| Real HTTP 301s, security headers (HSTS, CSP header, `frame-ancestors`) | Lovable ignores `_headers` / `_redirects` | Host change or Lovable support (P1-2) |
| Hosted error dashboard with alerts | Needs a vendor account; no signup made | Louis: GA4 steps now; optionally Sentry later (P0-3, P1-3) |
| Card donations | `VITE_STRIPE_DONATE_URL` appears unset, so the modal falls back to an email draft and tells donors card payments are "temporarily unavailable" | Louis: set it in Lovable (P0-2) |
| Content claims on some guide pages | Webinars, £1,000–£5,000 grants, helpline, volunteer roles, "Gift Aid coming soon" vs the Gift Aid option | Louis: verify (P0-4) |

## Appendix: files changed per PR

<details><summary>#104: Fix blank screen after deploys (50 files)</summary>

- `M` e2e/route-smoke.spec.ts
- `M` index.html
- `M` public/_headers
- `M` src/App.tsx
- `M` src/components/ChatBotWidget.tsx
- `M` src/components/ErrorBoundary.tsx
- `M` src/components/Header.tsx
- `M` src/components/HeroSection.tsx
- `M` src/components/QuickDonateButton.tsx
- `M` src/components/conditions/ConditionPageTemplate.tsx
- `M` src/components/guides/GuideOnwardJourney.tsx
- `M` src/components/landing/InspiredHeroBand.tsx
- `M` src/components/layouts/GuideLayout.tsx
- `A` src/lib/__tests__/chunkRecovery.test.ts
- `A` src/lib/chunkRecovery.ts
- `M` src/main.tsx
- `M` src/pages/AboutUs.tsx
- `M` src/pages/Accessibility.tsx
- `M` src/pages/BlogHub.tsx
- `M` src/pages/BlogPost.tsx
- `M` src/pages/ComparisonPage.tsx
- `M` src/pages/Contact.tsx
- `M` src/pages/CookiesPolicy.tsx
- `M` src/pages/FAQ.tsx
- `M` src/pages/Glossary.tsx
- `M` src/pages/GlossaryTerm.tsx
- `M` src/pages/Index.tsx
- `M` src/pages/MedicalDisclaimer.tsx
- `M` src/pages/PrivacyPolicy.tsx
- `M` src/pages/SelfHelpTool.tsx
- `M` src/pages/Services.tsx
- `M` src/pages/TermsConditions.tsx
- `M` src/pages/WaysToHelp.tsx
- `M` src/pages/campaigns/ExerciseCircuit500.tsx
- `M` src/pages/guides/CanExerciseMakeOsteoarthritisWorse.tsx
- `M` src/pages/guides/FreeArthritisResourcesUK.tsx
- `M` src/pages/guides/HipExercisesForOsteoarthritis.tsx
- `M` src/pages/guides/KneeExercisesForOsteoarthritis.tsx
- `M` src/pages/guides/ShoulderPainRelief.tsx
- `M` src/pages/pillar/AzathioprineGuide.tsx
- `M` src/pages/pillar/BenefitsPIPGuide.tsx
- `M` src/pages/pillar/DietGuide.tsx
- `M` src/pages/pillar/ExerciseGuide.tsx
- `M` src/pages/pillar/FebuxostatGoutGuide.tsx
- `M` src/pages/pillar/HealthServicesGuide.tsx
- `M` src/pages/pillar/KneeReplacementSurgeryGuide.tsx
- `M` src/pages/pillar/PainkillersNsaidsGuide.tsx
- `M` src/pages/pillar/SteroidsGuide.tsx
- `M` src/pages/pillar/UKArthritisGuide.tsx
- `A` test-results/.last-run.json
</details>

<details><summary>#105: Remove dead code, paused pages, unused deps and fabricated donor data (196 files)</summary>

- `D` DEPLOY_ROUTES.tsx
- `D` HUB_PAGES_BATCH.tsx
- `D` audit-images-node.js
- `M` bun.lock
- `D` e2e/auth.spec.ts
- `M` index.html
- `M` package-lock.json
- `M` package.json
- `M` public/_redirects
- `M` public/sitemap.xml
- `M` scripts/prerender-routes.mjs
- `D` src/App.css
- `M` src/App.tsx
- `D` src/components/AboutSection.tsx
- `D` src/components/AdminPaused.tsx
- `D` src/components/AnalyticsTracker.ts
- `D` src/components/ArticleCard.tsx
- `D` src/components/BookingDiary.tsx
- `D` src/components/CartDrawer.tsx
- `D` src/components/Citation.tsx
- `D` src/components/DonationBanner.tsx
- `D` src/components/DonationNotification.tsx
- `M` src/components/Header.tsx
- `D` src/components/HeaderSocial.tsx
- `D` src/components/HeroSection.css
- `D` src/components/HeroSection.tsx
- `D` src/components/KeywordTargeting.tsx
- `M` src/components/MobileNextStepBar.tsx
- `D` src/components/Navigation/MainNav.tsx
- `D` src/components/PeerSupportForum.tsx
- `D` src/components/PetTypeTag.tsx
- `D` src/components/PetsHub.tsx
- `D` src/components/SEODashboard.tsx
- `D` src/components/VisitorStats.tsx
- `D` src/components/__tests__/CartDrawer.test.tsx
- `D` src/components/ai/AiDisclosureBanner.tsx
- `D` src/components/ai/AiSourcesList.tsx
- `D` src/components/appeal/GazaAppealBand.tsx
- `D` src/components/exercises/ExerciseAnimations.tsx
- `D` src/components/illustrations/index.tsx
- `D` src/components/landing/AboutArthritisCards.tsx
- `D` src/components/landing/ActionPathSection.tsx
- `D` src/components/landing/BlogPreview.tsx
- `D` src/components/landing/ChangeLivesStats.tsx
- `D` src/components/landing/ColourMosaic.tsx
- `D` src/components/landing/ContentDepthSection.tsx
- `D` src/components/landing/DonationImpactSection.tsx
- `D` src/components/landing/EditorialIndex.tsx
- `D` src/components/landing/ExpertContentSection.tsx
- `D` src/components/landing/FacesStrip.tsx
- `D` src/components/landing/FeaturedStoryBand.tsx
- `D` src/components/landing/GalleryStrip.tsx
- `D` src/components/landing/GeometricCubeSection.tsx
- `D` src/components/landing/GlassCard.tsx
- `D` src/components/landing/GridBg.tsx
- `D` src/components/landing/Hero3DBackground.tsx
- `D` src/components/landing/HeroStatsStrip.tsx
- `D` src/components/landing/HowItWorksSection.tsx
- `D` src/components/landing/HowWeAreFundedSection.tsx
- `D` src/components/landing/HowYouCanHelp.tsx
- `D` src/components/landing/ImpactFactBand.tsx
- `M` src/components/landing/ImpactProgressBand.tsx
- `D` src/components/landing/ImpactStats.tsx
- `D` src/components/landing/InspiredHeroBand.tsx
- `D` src/components/landing/IntentChooser.tsx
- `D` src/components/landing/LazySection.tsx
- `D` src/components/landing/MissionEthosBand.tsx
- `D` src/components/landing/MissionStatementBand.tsx
- `D` src/components/landing/MovementMomentSection.tsx
- `D` src/components/landing/OAPlanPillarsSection.tsx
- `D` src/components/landing/OAProblemBand.tsx
- `D` src/components/landing/PageModal.tsx
- `D` src/components/landing/ParticleNetworkSection.tsx
- `D` src/components/landing/PhotoBreak.tsx
- `D` src/components/landing/PortraitGrid.tsx
- `D` src/components/landing/QuickAccessSection.tsx
- `D` src/components/landing/QuoteSection.tsx
- `D` src/components/landing/ResourcesForYouSection.tsx
- `D` src/components/landing/SEOTeaserSection.tsx
- `D` src/components/landing/SearchBar.tsx
- `D` src/components/landing/StartHereBand.tsx
- `D` src/components/landing/StatsBand.tsx
- `M` src/components/landing/StickyDonateBar.tsx
- `D` src/components/landing/TestimonialCollector.tsx
- `D` src/components/landing/TestimonialDisplay.tsx
- `D` src/components/landing/TriageSection.tsx
- `D` src/components/landing/TrustBar.tsx
- `D` src/components/landing/WhatWeDo.tsx
- `D` src/components/landing/WhyUsSection.tsx
- `D` src/components/motion/CountUp.tsx
- `D` src/components/motion/DuotoneImage.tsx
- `D` src/components/motion/MagneticButton.tsx
- `D` src/components/motion/ParallaxImage.tsx
- `D` src/components/motion/TextSplitReveal.tsx
- `D` src/components/seo/AnswerBlock.tsx
- `D` src/components/seo/BreadcrumbSchema.tsx
- `D` src/components/ui/AnimatedSection.tsx
- `D` src/components/ui/BackToTop.tsx
- `D` src/components/ui/ReadingTime.tsx
- `D` src/components/ui/RouteProgressBar.tsx
- `D` src/components/ui/SectionDivider.tsx
- `D` src/components/ui/SkeletonCard.tsx
- `D` src/components/ui/ViewportSection.tsx
- `D` src/components/ui/alert-dialog.tsx
- `D` src/components/ui/alert.tsx
- `D` src/components/ui/aspect-ratio.tsx
- `D` src/components/ui/calendar.tsx
- `D` src/components/ui/carousel.tsx
- `D` src/components/ui/chart.tsx
- `D` src/components/ui/collapsible.tsx
- `D` src/components/ui/command.tsx
- `D` src/components/ui/context-menu.tsx
- `D` src/components/ui/drawer.tsx
- `D` src/components/ui/form.tsx
- `D` src/components/ui/hover-card.tsx
- `D` src/components/ui/input-otp.tsx
- `D` src/components/ui/menubar.tsx
- `D` src/components/ui/navigation-menu.tsx
- `D` src/components/ui/pagination.tsx
- `D` src/components/ui/popover.tsx
- `D` src/components/ui/resizable.tsx
- `D` src/components/ui/separator.tsx
- `D` src/components/ui/sidebar.tsx
- `D` src/components/ui/table.tsx
- `D` src/components/ui/toggle-group.tsx
- `D` src/components/ui/toggle.tsx
- `D` src/components/ui/use-toast.ts
- `D` src/config/emailSequences.ts
- `D` src/data/affiliateProducts.ts
- `D` src/data/article-scaffolds.generated.ts
- `D` src/data/articles.ts
- `D` src/data/city-routes.generated.ts
- `D` src/data/facesOfArthritis.ts
- `D` src/data/keywords-1000.ts
- `D` src/data/keywords-paid.generated.ts
- `D` src/data/keywords.generated.ts
- `M` src/data/prerender-routes.generated.json
- `D` src/hooks/use-mobile.tsx
- `D` src/hooks/useAdmin.ts
- `D` src/hooks/useAdminAppointments.ts
- `D` src/hooks/useAdminDonations.ts
- `D` src/hooks/useArticles.ts
- `D` src/hooks/useCartSync.ts
- `D` src/hooks/useFacesOfArthritis.ts
- `D` src/hooks/useKeywordData.ts
- `D` src/hooks/useKeywords30k.ts
- `D` src/hooks/useKeywords40k.ts
- `D` src/hooks/useReveal.ts
- `D` src/hooks/useRevealOnScroll.ts
- `D` src/hooks/useSafeHtml.ts
- `A` src/lib/__tests__/no-fake-donor-data.test.ts
- `M` src/lib/__tests__/seo-build-safety.test.ts
- `M` src/lib/__tests__/seo-identity.test.ts
- `D` src/lib/apiResponse.ts
- `D` src/lib/ga4-advanced.ts
- `D` src/lib/geo-utils.ts
- `D` src/lib/heroLayoutMonitor.ts
- `D` src/lib/keyword-clustering.ts
- `D` src/lib/ogImage.ts
- `D` src/lib/seo-optimization.ts
- `M` src/lib/seoRedirects.ts
- `D` src/lib/shopify.ts
- `D` src/lib/sitemap-generator.ts
- `D` src/lib/visitor-tracking.ts
- `D` src/pages/AdminAppointments.tsx
- `D` src/pages/AdminBacklinks.tsx
- `D` src/pages/AdminChatFeedback.tsx
- `D` src/pages/AdminContentRefresh.tsx
- `D` src/pages/AdminDashboard.tsx
- `D` src/pages/AdminDistribute.tsx
- `D` src/pages/AdminEmails.tsx
- `D` src/pages/AdminKeywordStrategy.tsx
- `D` src/pages/AdminPsiDashboard.tsx
- `D` src/pages/AdminRankTracker.tsx
- `D` src/pages/AdminSeoHealth.tsx
- `D` src/pages/AllClusterHubs.tsx
- `D` src/pages/Auth.tsx
- `D` src/pages/Buddy.tsx
- `D` src/pages/BuddyMatch.tsx
- `D` src/pages/CityPageOptimized.tsx
- `D` src/pages/ClusterHub.tsx
- `M` src/pages/CommunityHub.tsx
- `M` src/pages/Index.tsx
- `D` src/pages/OAuthConsent.tsx
- `D` src/pages/OsteoarthritisHub.tsx
- `D` src/pages/ProductDetail.tsx
- `D` src/pages/RheumatoidArthritisHub.tsx
- `D` src/pages/Search.tsx
- `M` src/pages/SelfAssessment.tsx
- `D` src/pages/Shop.tsx
- `M` src/pages/Sitemap.tsx
- `D` src/stores/cartStore.ts
- `D` src/types/keyword.ts
- `D` test-app-running.mjs
- `D` test-lovable-live.mjs
- `D` vite-config-optimizations.js
</details>

<details><summary>#106: Perf: initial JS, article LCP, mobile chrome (43 files)</summary>

- `M` bun.lock
- `M` package-lock.json
- `M` package.json
- `M` scripts/blog-head-data.json
- `M` scripts/generate-blog-catalog.ts
- `M` scripts/generate-blog-head-data.mjs
- `M` scripts/inject-canonicals.mjs
- `M` src/App.tsx
- `M` src/components/ChatBotWidget.tsx
- `M` src/components/DeferredMount.tsx
- `M` src/components/DonationQuickBar.tsx
- `M` src/components/Header.tsx
- `M` src/components/LanguageSwitcher.tsx
- `A` src/components/LanguageSwitcherMenu.tsx
- `M` src/components/SeoRedirectGate.tsx
- `M` src/components/SiteSearch.tsx
- `M` src/components/article/ArticleVoiceover.tsx
- `M` src/components/landing/CookieBanner.tsx
- `M` src/components/landing/OAHero.tsx
- `D` src/components/ui/tooltip.tsx
- `A` src/data/blogReviewIndex.generated.json
- `A` src/hooks/useBlogArticle.ts
- `M` src/hooks/useBlogArticles.ts
- `M` src/index.css
- `A` src/lib/__tests__/article-cover-parity.test.ts
- `A` src/lib/__tests__/blog-review-index.test.ts
- `M` src/lib/__tests__/seo-build-safety.test.ts
- `A` src/lib/afterPageLoad.ts
- `A` src/lib/articleImagePicks.ts
- `M` src/lib/articleImages.ts
- `M` src/lib/blog/catalog.ts
- `A` src/lib/blog/postLoader.ts
- `A` src/lib/blog/reviewIndex.ts
- `A` src/lib/coverFallback.ts
- `A` src/lib/markdownParser.ts
- `M` src/main.tsx
- `M` src/pages/BlogPost.tsx
- `M` src/pages/Index.tsx
- `M` src/pages/__tests__/BlogPost.review-status.test.tsx
- `M` src/pages/__tests__/BlogPost.share-buttons.test.tsx
- `M` src/pages/__tests__/BlogPost.test.tsx
- `M` src/pages/__tests__/BlogPost.voiceover.test.tsx
- `M` vite.config.ts
</details>

<details><summary>#107: Error reporting via GA4, CSP, no 404 probe (27 files)</summary>

- `M` bun.lock
- `A` docs/monitoring/error-reporting.md
- `M` index.html
- `M` package-lock.json
- `M` package.json
- `M` public/_headers
- `M` src/components/BlogComments.tsx
- `M` src/components/EmailSignupForm.tsx
- `M` src/components/ErrorBoundary.tsx
- `M` src/components/StripeDonationModal.tsx
- `M` src/components/article/ArticleVoiceover.tsx
- `M` src/components/landing/ContactSection.tsx
- `A` src/data/articleAudio.ts
- `M` src/hooks/useContact.ts
- `A` src/lib/__tests__/article-audio.test.ts
- `A` src/lib/__tests__/csp-policy.test.ts
- `A` src/lib/__tests__/errorReporting.test.ts
- `M` src/lib/__tests__/ga4-events.test.ts
- `M` src/lib/backendSubmit.ts
- `A` src/lib/errorReporting.ts
- `M` src/lib/generatePdf.ts
- `M` src/lib/web-vitals.ts
- `M` src/main.tsx
- `M` src/pages/CorporateGiving.tsx
- `M` src/pages/Partners.tsx
- `M` src/pages/WaysToHelp.tsx
- `M` vite.config.ts
</details>

<details><summary>#108: Accessibility (15 files)</summary>

- `M` .github/workflows/lint-and-test.yml
- `A` e2e/a11y-smoke.spec.ts
- `M` src/components/AccessibilityToolbar.tsx
- `M` src/components/ChatBotWidget.tsx
- `M` src/components/DonationQuickBar.tsx
- `M` src/components/Header.tsx
- `M` src/components/ResourceLibraryDrawer.tsx
- `M` src/components/StripeDonationModal.tsx
- `M` src/components/faq/FaqAccordion.tsx
- `M` src/components/landing/CookieBanner.tsx
- `A` src/hooks/useExclusiveOverlay.ts
- `M` src/index.css
- `A` src/lib/__tests__/overlayCoordinator.test.tsx
- `A` src/lib/overlayCoordinator.ts
- `M` tailwind.config.ts
</details>

<details><summary>CI PR (fix/health-6-ci), excluding this report and the roadmap (66 files)</summary>

- `M` .github/workflows/ci.yml
- `M` .github/workflows/keep-green.yml
- `M` .github/workflows/lighthouse.yml
- `M` .github/workflows/lint-and-test.yml
- `M` docs/seo/redirect-map.csv
- `M` e2e/appointments.spec.ts
- `M` e2e/critical-flows.spec.ts
- `M` e2e/donations.spec.ts
- `M` lighthouserc.json
- `M` package.json
- `M` public/_redirects
- `M` scripts/blog-head-data.json
- `A` scripts/check-internal-links.mjs
- `M` src/components/MedicalDisclaimerStrip.tsx
- `M` src/components/SiteSearch.tsx
- `M` src/components/StripeDonationModal.tsx
- `M` src/components/StubPage.tsx
- `M` src/components/appeal/GazaImpactTiers.tsx
- `M` src/components/disclaimerChrome.tsx
- `A` src/components/disclaimerContext.ts
- `M` src/components/landing/ContactSection.tsx
- `M` src/components/seo/EducationalDisclaimerBox.tsx
- `M` src/content/blog/posts/alcohol-arthritis-uk-guidance.json
- `M` src/content/blog/posts/anxiety-arthritis-uk-guide.json
- `M` src/content/blog/posts/bedtime-routine-arthritis-relief.json
- `M` src/content/blog/posts/best-sleep-positions-joint-pain.json
- `M` src/content/blog/posts/caregiver-burnout-in-arthritis-families-spot-it-early.json
- `M` src/content/blog/posts/cbt-chronic-pain-arthritis.json
- `M` src/content/blog/posts/circadian-rhythm-arthritis-inflammation.json
- `M` src/content/blog/posts/cold-weather-arthritis-uk-winter.json
- `M` src/content/blog/posts/dating-with-arthritis-confidence.json
- `M` src/content/blog/posts/depression-arthritis-when-to-seek-help.json
- `M` src/content/blog/posts/desk-setup-arthritis-uk-workers.json
- `M` src/content/blog/posts/disability-rights-workplace-arthritis.json
- `M` src/content/blog/posts/early-arthritis-intervention-uk.json
- `M` src/content/blog/posts/expert-qa-how-to-ask-for-help-without-feeling-guilty.json
- `M` src/content/blog/posts/flexible-working-arthritis-pacing.json
- `M` src/content/blog/posts/flying-with-arthritis-uk-airports.json
- `M` src/content/blog/posts/hobbies-arthritis-friendly-uk.json
- `M` src/content/blog/posts/hot-weather-arthritis-management.json
- `M` src/content/blog/posts/hotel-rooms-accessibility-arthritis.json
- `M` src/content/blog/posts/longevity-habits-arthritis-patients.json
- `M` src/content/blog/posts/medication-management-travel-arthritis.json
- `M` src/content/blog/posts/mindfulness-arthritis-beginners.json
- `M` src/content/blog/posts/packing-list-arthritis-traveller.json
- `M` src/content/blog/posts/parenting-with-arthritis-hacks-for-babies-and-toddlers.json
- `M` src/content/blog/posts/preventing-knee-osteoarthritis-uk.json
- `M` src/content/blog/posts/relationships-chronic-pain-arthritis.json
- `M` src/content/blog/posts/resistance-training-arthritis-longevity.json
- `M` src/content/blog/posts/school-run-survival-for-parents-with-arthritis.json
- `M` src/content/blog/posts/seasonal-affective-disorder-arthritis.json
- `M` src/content/blog/posts/standing-desk-arthritis-pros-cons.json
- `M` src/content/blog/posts/supporting-a-partner-with-arthritis-a-practical-handbook.json
- `M` src/content/blog/posts/talking-to-children-about-your-arthritis.json
- `M` src/content/blog/posts/vitamin-d-arthritis-uk.json
- `M` src/data/blogRedirects.ts
- `M` src/lib/__tests__/gsc-champions-47-48-28-sep.test.ts
- `M` src/pages/AiHub.tsx
- `M` src/pages/CityArthritisPage.tsx
- `M` src/pages/DietHub.tsx
- `M` src/pages/ExerciseHub.tsx
- `M` src/pages/Sitemap.tsx
- `M` src/pages/WaysToHelp.tsx
- `M` src/pages/conditions/PsoriaticArthritis.tsx
- `M` src/pages/conditions/RheumatoidArthritis.tsx
- `M` src/pages/regions/RegionHub.tsx
</details>
