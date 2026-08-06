# Speed up the site on desktop and mobile

Focus on the things that actually move Lighthouse: the hero image (LCP), font
loading, JavaScript shipped on first paint, and caching. No visual or content
changes — the page should look identical.

## 1. Hero image (biggest mobile win)

The homepage hero currently serves one 158 KB WebP at 800px wide to every
device, including 390px phones, and it is preloaded from `index.html`.

- Generate 400 / 800 / 1200-wide WebP variants of the hero photo.
- Give the hero `<img>` a `srcset` + `sizes` so a phone downloads roughly a
  quarter of the bytes.
- Update the static `<link rel="preload">` in `index.html` to use
  `imagesrcset`/`imagesizes` so the preload matches what the browser picks.

## 2. Fonts

Three Google Fonts families (Anton, Montserrat 600/700/800, Open Sans
400/600/700) are fetched from a third-party origin on every first load.

- Trim to the weights actually used in the CSS/components.
- Self-host the used subsets as `woff2` in `public/fonts` with
  `font-display: swap`, removing the `fonts.googleapis.com` round trip
  entirely (already covered by the immutable `*.woff2` cache rule).

## 3. First-paint JavaScript

- Run a bundle analysis (`ANALYZE=1` build) and confirm which chunks the
  homepage entry actually pulls in.
- Framer Motion is imported in 53 files; verify no eagerly-loaded homepage
  component pulls it above the fold, and move any that do to CSS animation
  or a lazy boundary.
- Review the `manualChunks` list in `vite.config.ts` — every static entry
  there gets modulepreloaded from the root HTML, so anything the homepage
  does not need synchronously (forms, ui-extra, helmet) should be dropped
  and left to Rollup's route splitting.
- The homepage renders ~35 separately lazy sections; batch the below-fold
  ones behind fewer Suspense boundaries so mobile does not pay for dozens of
  tiny chunk requests.

## 4. Caching and payload hygiene

- Add `/openverse/*` and `/fonts/*` immutable rules to `public/_headers`
  (the hero and other photos currently fall into the "must-revalidate"
  catch-all).
- Optional: `public/articles` holds 134 MB of PDFs and `public/data` 20 MB.
  These do not affect page speed but do bloat every deploy; I can report
  which are unreferenced so you can decide whether to move them to CDN
  assets.

## 5. Verification

- `npm run build` plus the existing CSS/layout guards must stay green.
- Measure before/after with a local Lighthouse run on the built output for
  both mobile and desktop, and report LCP, TBT and CLS deltas.

## Technical notes

Changes are confined to: `src/components/landing/OAHero.tsx`, `index.html`,
`vite.config.ts`, `public/_headers`, `src/pages/Index.tsx` (Suspense
grouping only), plus new font/image files under `public/`.

Realistic outcome: desktop 95–100, mobile mid-to-high 80s rising toward
low 90s. A guaranteed 100 on mobile is not achievable for a React app of
this size.
