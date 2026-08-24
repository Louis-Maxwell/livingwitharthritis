# Improve overall site performance

Measure first, then fix the things that actually move the needle. No visual,
copy, or navigation changes — pages should look identical.

## 1. Baseline measurement

Run the existing budget runner (`scripts/perf-lighthouse.mjs`) on a production
build for mobile and desktop across `/`, `/conditions/osteoarthritis`, `/blog`,
plus an `ANALYZE=1` build to see which chunks the homepage entry really pulls
in. Record LCP, TBT, CLS and first-paint JS so every later change can be shown
as a delta rather than a guess.

## 2. Homepage first paint

The homepage renders roughly 25 separately lazy sections, each behind its own
Suspense boundary, so mobile pays for many small chunk requests during scroll.

- Group below-fold sections into a few Suspense boundaries instead of one per
  section.
- Mount off-screen groups on intersection (reuse the existing
  `DeferredMount`/`useReveal` patterns) so nothing below the fold competes with
  the hero for bandwidth or main thread.
- Confirm nothing above the fold pulls Framer Motion or other heavy libs into
  the entry chunk; move any that do behind a lazy boundary or CSS animation.

## 3. Route-level JS

- Re-check the `manualChunks` list in `vite.config.ts` against the analyzer
  output: any static entry that the homepage does not need synchronously
  (helmet, query, ui-core) should be dropped so Rollup route-splits it.
- Idle-prefetch only the two or three most likely next routes rather than
  broad prefetching.

## 4. Images and fonts

- Verify the hero LCP image srcset/sizes and preload still match what mobile
  actually picks at 390px, and that width/height are set (no CLS).
- Audit remaining large in-repo images and convert to WebP/AVIF variants where
  they are still JPEG/PNG.
- Confirm the self-hosted Inter woff2 is the only font request and is
  preloaded once with `font-display: swap`.

## 5. Backend response time

Check the database health snapshot and slowest queries; add targeted indexes
for anything the blog, chat, or homepage hooks hit on every load. Verify with
query plans before and after.

## 6. Deploy payload hygiene

`public/articles` holds 134 MB of PDFs and `public/data` 20 MB. These do not
affect page speed directly but bloat every deploy and slow builds. Report which
files are unreferenced so you can decide whether to move them to CDN assets —
no deletions without your approval.

## 7. Verification

Re-run the mobile and desktop Lighthouse passes plus the CSS/layout guard
scripts and the production build, and report before/after LCP, TBT, CLS and
transferred JS.

## Technical notes

Expected touch points: `src/pages/Index.tsx` (Suspense grouping only),
`src/components/landing/OAHero.tsx`, `vite.config.ts`, `src/hooks/useLinkPrefetch.ts`,
`public/_headers`, plus one database migration for indexes if the slow-query
data justifies it.

Realistic outcome: desktop 95–100, mobile mid-80s rising toward low 90s. A
guaranteed 100 on mobile is not achievable for a React app this size.
