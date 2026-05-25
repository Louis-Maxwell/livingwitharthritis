## Goal

Make sure the sitemap stays valid on every build, and reduce homepage load time.

## Sitemap (integrity safeguards)

Current state — already healthy:
- `public/sitemap.xml` parses as valid XML with 449 URLs.
- `scripts/generate-sitemap.ts` regenerates it on every `predev` and `prebuild`, so routes can never silently drift.
- Internal routes (`/admin/*`, `/auth`, `/chat`, etc.) are excluded and Disallowed in `robots.txt`.

Improvements:
1. Add a CI check (`scripts/validate-sitemap.mjs`) that parses `public/sitemap.xml`, fails the build if XML is malformed, any `<loc>` is missing/duplicated, or the URL count drops below the last committed count. Wire it into `prebuild` after the generator runs.
2. Add the same validation step to the existing `lefthook.yml` pre-push hook so broken sitemaps never reach `main`.

## Performance (homepage speed)

Biggest measurable wins, in priority order:

1. **Convert large hero/landing images to WebP** using `vite-imagetools` (build-time, no runtime cost). Target files: `hero-oa-portrait.jpg` (185 KB+), `forest-balance-pose.jpg` (488 KB), `yoga-monument-group.jpg` (290 KB), `tai-chi-anchor.jpg`. Expected: ~60–70% size reduction on the LCP image.
2. **Preload the LCP image** in `index.html` (`<link rel="preload" as="image" href="..." fetchpriority="high">`) so it starts downloading before React hydrates.
3. **Add responsive `srcSet`** to `<OAHero>` so mobile (1046px viewport seen now, smaller on phones) doesn't download the full 1600px portrait.
4. **Defer non-critical lazy chunks** below the fold: `ChatBotWidget`, `ExitIntentModal`, `DonationNotification`, `EngagementTracker` already use `lazy()`; gate them behind `requestIdleCallback` so they don't compete with hero paint.
5. **Audit third-party scripts** in `index.html` (GA4, fonts) — ensure GA4 loads with `defer`, fonts use `font-display: swap` (already done).

Skipped (already correct in source):
- Hero `<img>` already has `width/height`, `fetchPriority="high"`, `loading="eager"`, `decoding="async"`.
- Fonts load via `preload` + swap.

## Technical details

- `vite-imagetools` plugin in `vite.config.ts`; import with `?format=webp&w=800;1200;1600&as=srcset`.
- Validation script uses Node's built-in `node:sax` or simple regex + `new URL()` checks — no new deps.
- LCP preload `href` must match the hashed asset URL — easiest is to keep the hero in `public/` or use Vite's `?url` import in `index.html` via a small build script.

## Out of scope

- Reworking the visual design of the hero (colors/typography stay per the project memory rules).
- Migrating away from the existing generator script.
- Lighthouse accessibility contrast finding (already addressed — semantic tokens in use).

After approval I'll implement, then prompt you to republish so the Lighthouse-based findings re-measure against the new build.
