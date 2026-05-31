## Engagement Layer: Motion, Graphics & Micro-Interactions

Goal: Increase time on site across all major pages by adding a coherent layer of custom SVG illustrations, Lottie hero animations, AI-generated editorial imagery, and tasteful scroll/hover motion — all within the existing white/black/red identity (no palette change).

---

### Design guardrails (locked)

- Background stays white. Body/heading text stays black. Red (HSL 350 85% 42%) only for accents/CTAs.
- Depth comes from: subtle gradients (white→off-white), grain texture, layered SVGs, motion — never new hues.
- Motion respects `prefers-reduced-motion`. Core Web Vitals stay green (lazy-load Lottie, defer below-the-fold).
- No Framer Motion `AnimatePresence` for routing (CSS transitions already in place).

---

### Phase A — Asset library (foundation)

**Custom SVG illustration set** (`src/components/illustrations/`)
- 10 hand-crafted line illustrations in black + red accent: `JointKnee`, `JointHand`, `JointHip`, `JointSpine`, `Movement`, `Plate` (diet), `Heart` (community), `Shield` (safeguarding), `Compass` (self-help), `Spark` (donations).
- Each accepts `className` + animated stroke draw-in (CSS `stroke-dasharray`).

**Lottie animations** (`src/assets/lottie/`)
- `hero-pulse.json` — slow breathing line-art joint (homepage hero accent).
- `scroll-cue.json` — minimal scroll indicator.
- `success-tick.json` — form confirmations (Contact, Donate, Buddy).
- `loading-pulse.json` — replaces spinners.
- Loaded via `lottie-react` with lazy import + IntersectionObserver gate.

**AI-generated editorial imagery** (`src/assets/editorial/`)
- 6 monochrome-leaning photographic hero/section images via `imagegen` (premium): hands kneading dough, walking shoes on pavement, water glass, sunrise stretch, family hands, garden bench. Treated with red duotone overlay on hover.

**Reusable motion primitives** (`src/components/motion/`)
- `RevealOnScroll` (already partial via `useRevealOnScroll`) — formalize with stagger variants.
- `MagneticButton` — subtle cursor-follow on CTAs.
- `TextSplitReveal` — word-by-word reveal for editorial headlines.
- `CountUp` — animates stat numbers when in view (for "12,000 people supported" etc.).
- `ParallaxImage` — gentle 8px Y-parallax on hero photos.
- `DuotoneImage` — wraps editorial imagery with red-tint hover.

---

### Phase B — Page-by-page integration

| Page | Additions |
|---|---|
| **Index** (landing) | Lottie joint-pulse beside H1; TextSplitReveal on hero headline; CountUp on impact stats; SVG section dividers; magnetic primary CTA; DuotoneImage in "Stories" band |
| **About / Governance / Trust** | Editorial photo with parallax; RevealOnScroll on values grid; animated stroke-draw on credential badges |
| **Exercise Hub + joint pages** | JointKnee/Hand/etc SVG with red accent path animating on mount; hover lift on exercise cards with red underline sweep |
| **Diet Hub / Mediterranean** | `Plate` SVG illustration; staggered reveal on food cards; subtle ingredient float animation |
| **Donate / WaysToHelp / Zakat** | Spark SVG; CountUp on £ raised; success-tick Lottie on form submit; magnetic Donate CTA |
| **Contact / Buddy / Self-Help** | Compass/Heart SVG headers; success-tick on submit; gentle field-focus glow (red) |
| **Blog / Library / City pages** | RevealOnScroll on article cards; DuotoneImage on featured images; reading-progress bar (red, top of viewport) |
| **Conditions pages** | JointSpine/etc illustrations as page headers; animated path-draw on first view |

---

### Phase C — Global polish

- **Reading progress bar** — 2px red bar at top of viewport on long-form pages.
- **Section dividers** — 6 reusable SVG dividers (waves, peaks, dots) in black with red accent dot.
- **Cursor accent** — optional subtle red dot trail on desktop hover (respects reduced-motion, disabled on touch).
- **Page enter animation** — formalize existing CSS fade/rise into a single `.page-enter` class.
- **Skeleton shimmer** — replace generic skeletons with branded shimmer (white→off-white).

---

### Technical summary

```text
NEW
  src/components/illustrations/         10 SVG components
  src/components/motion/                RevealOnScroll, MagneticButton,
                                        TextSplitReveal, CountUp,
                                        ParallaxImage, DuotoneImage
  src/components/ui/ReadingProgress.tsx
  src/components/ui/SectionDivider.tsx
  src/assets/lottie/                    4 Lottie JSON files
  src/assets/editorial/                 6 imagegen photos (premium)
  src/hooks/useLottieLazy.ts            IntersectionObserver-gated loader

DEPS
  + lottie-react (~30kb gz, lazy-loaded only on pages that use it)

EDITED
  src/pages/Index.tsx                   hero Lottie + TextSplit + CountUp
  src/pages/ExerciseHub.tsx + joint pages
  src/pages/DietHub.tsx
  src/pages/Donate.tsx, WaysToHelp.tsx, ZakatAppeal.tsx
  src/pages/AboutUs.tsx, Governance.tsx, TrustCredibility.tsx
  src/pages/Contact.tsx, Buddy.tsx, SelfHelpTool.tsx
  src/pages/BlogPost.tsx, BlogHub.tsx, Library.tsx
  src/pages/conditions/*                joint illustrations
  src/pages/CityArthritisPage.tsx       reveal + duotone
  src/index.css                         motion utilities, shimmer, progress bar
  tailwind.config.ts                    stroke-draw keyframes
```

**Performance budget**: Lottie + lottie-react bundle code-split per route; editorial images served as AVIF with `loading="lazy"` and `decoding="async"`; total added JS budget ≤ 45kb gz on any single page.

**Accessibility**: All motion gated by `prefers-reduced-motion: reduce`; all illustrations get `aria-hidden="true"` or descriptive `<title>` where decorative vs informative; focus rings preserved.

---

### Build order

1. Phase A foundation (illustration components, motion primitives, lottie loader, imagegen assets)
2. Phase B Index page integration — validate the look, then roll out
3. Phase B remaining pages in clusters: Exercise → Diet → Donate cluster → About cluster → Blog/Library → Conditions/City
4. Phase C global polish (progress bar, dividers, cursor)

### One confirmation

OK to add `lottie-react` as a dependency, or do you want me to ship pure CSS/SVG animations only (no Lottie)?
