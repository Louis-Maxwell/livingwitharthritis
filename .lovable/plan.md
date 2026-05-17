## Goal
Make the landing page more emotionally resonant and visually appealing by adding warm, dignified imagery of elderly people living well with osteoarthritis, plus subtle, premium animations — without breaking the Aevolve/Crimson institutional aesthetic.

## Scope (frontend/presentation only)

### 1. OAHero — visual upgrade
- **Fix bug**: remove the stray `bg-[#ff0000]` debug background on the container (currently makes the hero red).
- **Add hero portrait**: introduce a refined right-side portrait of an elderly person (warm, candid, dignified — e.g. older couple walking, smiling senior gardening). Replace the current "Mission in Numbers" card with a split layout:
  - Left (8 cols): headline + copy + CTAs + trust row (unchanged copy).
  - Right (4 cols): tall portrait image with a crimson-tinted gradient overlay and a floating glass "Mission in Numbers" card layered over the bottom of the image (8.75M / £0 / 100%).
- **Image source**: use `heroLifestyle` (older couple) from `src/data/images.ts` with responsive `srcSet`, `fetchpriority="high"`, explicit width/height, `decoding="async"`.
- **Animation**: reuse the existing CSS-only `hero-stagger` pattern (`HeroSection.css`) for headline → subcopy → CTAs → trust row fade-up. Portrait gets a slow `scale(1.02 → 1)` + fade-in (1.2s). Soft crimson glow pulse behind the portrait.

### 2. New "Faces of the Plan" strip (between Problem Band and Plan Pillars)
- Horizontal 3-card row of elderly people doing real activities (walking, gardening, cooking Mediterranean, gentle stretching).
- Each card: image + one-line caption ("Margaret, 68 — walks daily", etc. — use existing voice; no fabricated stats).
- On-scroll fade-up with stagger (CSS-only, IntersectionObserver-triggered class toggle — no framer-motion in critical path).

### 3. PhotoBreak section
- Swap or add a second `PhotoBreak` lower in the page using an elderly-focused Unsplash image with a quote already in the project's tone (e.g. existing Prophet Muhammad / Khosla quotes per memory).
- Add a slow Ken Burns (scale 1 → 1.06 over 12s) zoom on the background image — CSS only.

### 4. Micro-animations across landing
- Add a shared `.reveal-on-scroll` utility (CSS keyframes + tiny IntersectionObserver hook) applied to section headings and pillar cards for fade-up on enter.
- Add hover lift (`translateY(-4px)` + crimson shadow) to Plan Pillars and Donation Impact cards.
- Respect `prefers-reduced-motion`: all animations disabled via media query.

## Files to touch
- `src/components/landing/OAHero.tsx` — restructure to split layout, add portrait, remove red debug bg.
- `src/components/HeroSection.css` — extend with portrait fade-scale + crimson glow pulse keyframes.
- `src/components/landing/FacesStrip.tsx` *(new)* — 3-card elderly imagery row.
- `src/pages/Index.tsx` — insert `<FacesStrip />` after `OAProblemBand`.
- `src/components/landing/PhotoBreak.tsx` — add Ken Burns animation class.
- `src/index.css` — add `.reveal-on-scroll`, `.hover-lift-crimson`, reduced-motion guard.
- `src/hooks/useRevealOnScroll.ts` *(new, tiny)* — IntersectionObserver hook to toggle `.is-visible`.
- `src/data/images.ts` — add 2–3 new curated elderly Unsplash URLs (dignified, UK-relatable).

## Out of scope
- No backend, no copy rewrites beyond image captions, no routing changes.
- No framer-motion added to critical path (keeps LCP intact — per existing perf work).
- No new fonts or palette changes.

## Acceptance
- Hero shows headline + warm elderly portrait side-by-side on desktop; stacked on mobile.
- Red debug background gone.
- Sections fade up smoothly as you scroll; cards lift on hover.
- `prefers-reduced-motion: reduce` users see no motion.
- No CLS regressions; LCP image has explicit dimensions + `fetchpriority="high"`.
