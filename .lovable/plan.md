
# Plan: Sitemap + SEO + Accessibility + Performance + Landing refresh

Scope is bounded to the 3 currently failing SEO findings, a sitewide a11y/perf sweep, and a landing-page polish. No backend or routing changes.

## 1. Sitemap — "needs attention"

The scanner flags `/chat`, `/auth`, `/admin`, `/admin/appointments`, `/admin/psi` as missing from `public/sitemap.xml`. These are **intentionally private** (auth gate, admin-only, chat UI) and are already in `STATIC_EXCLUDE` in `scripts/generate-sitemap.ts` and blocked in `public/robots.txt`. Indexing them would be wrong.

Resolution:
- Verify each route is `Disallow:`-ed in `public/robots.txt` (add any missing).
- Add `<meta name="robots" content="noindex,nofollow">` via `SeoHead` on `Chat.tsx`, `Auth.tsx`, all `Admin*.tsx` pages (belt-and-braces so JS-executing crawlers also see noindex).
- Mark the finding **ignored** (not "fixed") with a clear explanation that these routes are deliberately excluded — and update the security memory so future scanners don't re-flag.
- Re-run `bun scripts/generate-sitemap.ts` to refresh `lastmod` dates.

## 2. Performance — "Page loads slowly" (LCP)

Audit the hero on `src/pages/Index.tsx` / `OAHero`:
- Ensure the LCP `<img>` has explicit `width`/`height`, `fetchpriority="high"`, `decoding="async"`, no `loading="lazy"`.
- Add `<link rel="preload" as="image" href="<hero>" imagesrcset="..." fetchpriority="high">` to `index.html`.
- Confirm `font-display: swap` on every `@font-face` in `src/index.css` (Playfair Display, Inter).
- Defer non-critical CSS (Sonner already lazy; verify no synchronous third-party scripts in `<head>`).
- Convert hero Unsplash URL to `?w=1600&q=75&fm=webp&auto=format` with a 400/800/1200/1600w `srcset` so mobile downloads <200 KB.

## 3. Accessibility — "Has accessibility barriers" (contrast)

Sitewide sweep using ripgrep for low-contrast tokens, replacing per Lovable a11y guidance:
- `text-muted-foreground/[35-70]` → `text-muted-foreground` or `text-foreground`.
- `text-gray-300|400|500` on white → `text-foreground` / `text-muted-foreground`.
- `placeholder:text-gray-*` → `placeholder:text-muted-foreground`.
- Icon-only `<Button size="icon">` without `aria-label` (scan + fix).
- Confirm tap targets ≥44×44 on `MobileBottomNav`, `AccessibilityToolbar`.
- Single `<main>` per route (spot-check landing + condition pages).

## 4. Landing page refresh (`src/pages/Index.tsx` + `src/components/landing/*`)

Visual polish only — no structural rewrite, no new sections:
- Tighten copy in hero, FeaturedStoryBand, ActionPathSection, NewsletterSection.
- Swap any remaining low-res placeholders for 4K Unsplash photos of UK elderly people (warm, dignified, hands/community/movement) using the centralised `src/data/images.ts` with `srcset` 400/800/1200/1920w.
- Verify above-the-fold paint < 2.5 s LCP, no CLS from late-loading images (all images carry width/height or `aspect-*`).
- Keep brand rules from memory: white bg, black headings, red accents (HSL 350 85% 42%), Playfair Display, no AI branding.

## 5. Verify & mark fixed

- Run `bun scripts/generate-sitemap.ts` + `bun scripts/check-canonicals.mjs` + `bun scripts/check-social-meta.mjs` locally as smoke tests.
- Call `seo_chat--update_findings`:
  - `lighthouse:lighthouse_performance` → fixed (hero preload + LCP attrs).
  - `lighthouse:lighthouse_accessibility` → fixed (contrast sweep).
  - `http:sitemap` → **ignored** (private routes intentionally excluded).
- Surface `<presentation-open-publish>` so the new build goes live (findings score the published version).

## Out of scope

- New blog content, copywriting beyond landing tightening.
- SSR/prerender beyond what already exists (`scripts/prerender-routes.mjs`).
- Backend / DB / edge-function changes.
- Net-new sections, routes, or features.
