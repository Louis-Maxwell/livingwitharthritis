# Performance upgrades — v5 bundle changes

## What changed in code (in this bundle)

1. **Google Analytics deferred out of the LCP path.** The gtag.js payload
   (~90 KB, ~200 ms main-thread on mid-range mobile) no longer loads
   eagerly. `dataLayer` still queues every early event, and the real script
   loads on first user interaction *or* 3 s idle, whichever is first — so
   analytics counts remain accurate but Largest Contentful Paint drops.

2. **JSON-LD minified.** Three sitewide structured-data blocks minified
   in place (-797 B in the head). Smaller first packet, faster HTML parse.

3. **Duplicate font stylesheet removed.** Was loading the same Google Fonts
   URL twice (once as preload+onload swap, once as a blocking `<link
   rel="stylesheet">`). Only the non-blocking path remains, plus a
   `<noscript>` fallback.

4. **`public/_headers`** added — immutable caching for hashed `/assets/*`,
   OG images, hero images, woff2 (Lovable/Netlify/Cloudflare Pages respect
   this). Closes the "efficient cache policy" audit and cuts repeat-visit
   bytes to near zero.

## What is *not* in this bundle (needs a Lovable-side change)

These are the highest-impact remaining wins but they live in components
we can't safely rewrite from a static bundle — they need one Lovable
change each after this ships:

- **Route-level code splitting** — every route should use
  `React.lazy(() => import('./pages/Foo'))` in `App.tsx`. Cuts initial JS by
  40–60 %. This is the single biggest remaining mobile win.
- **Hero image dimensions + `srcset`** — the LCP `<img>` in `OAHero.tsx`
  should have explicit `width`/`height` (no CLS) and a `srcset` at
  400/800/1200 with a `sizes` attribute (mobile downloads ~40 % less).
- **Remove Framer Motion from the home page** — it's ~35 KB gz and used
  once above the fold. Replace with CSS `@keyframes`.
- **Purge unused Tailwind classes** — the built CSS should be under 30 KB
  gz; if it's larger the tailwind `content` glob is over-broad.

## Honest score targets after this ships

- **Desktop: 95–100** — realistic
- **Mobile: 85–92 first pass, 92–96 after the four Lovable-side changes**

**100 mobile is not a promise anyone should make.** Lighthouse throttles
CPU to a mid-range phone; a React app of this size will always have some
hydration cost, and the score fluctuates ±3 between runs on the same
build. Anyone offering "guaranteed 100 mobile" is either lying or is
about to strip so much of the site out that you'd lose functionality.

## How to see the impact yourself

After committing this bundle and pressing Publish in Lovable, wait ~3 min
for the CDN to warm and re-run:
https://pagespeed.web.dev/report?url=https%3A%2F%2Flivingwitharthritis.org.uk%2F

Compare mobile "Total Blocking Time" and "Largest Contentful Paint"
before and after. Both should drop noticeably.
