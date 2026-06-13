## Goal
Minimal-credit landing page polish: one new interactive section + confirm animated stat counters already in place. No backend work, no content rewrites.

## What I noticed
- `HeroStatsStrip.tsx` already uses `<CountUp>` + `<RevealOnScroll>` → counters animate up from zero on scroll. **No code needed.** (But footnote: stat #3 says "NHS" — flagged by neutrality memory. I'll change copy to "annual UK economic cost of musculoskeletal conditions" in the same pass.)
- No existing clickable body-map / joint-picker on the homepage.

## Scope — 2 files

### 1. NEW `src/components/landing/JointPicker.tsx`
A single interactive band: **"Where does it hurt?"**
- Horizontal row of 6 clickable joint tiles: Knee, Hip, Hand, Shoulder, Neck, Spine.
- Each tile = Lucide icon + label, hover-lift with crimson glow (uses existing `.hover-lift-crimson` from `HeroSection.css`).
- Click → `navigate()` to the matching `/conditions/<slug>` page.
- Keyboard accessible (`<button>` elements, focus ring).
- No new images, no SVG body diagram (keeps credits low). Pure icon grid.
- ~80 lines, design-token colours only.

### 2. `src/pages/Index.tsx` — wire it in
Lazy-load `JointPicker` and mount it **once**, directly after `OAProblemBand`, before `OAPlanPillarsSection`. One import + one `<Suspense>` block.

### 3. `src/components/landing/HeroStatsStrip.tsx` — 1-line copy fix
Change the third stat label from "annual cost of musculoskeletal conditions to the NHS." to "annual UK economic cost of musculoskeletal conditions." (Neutrality memory: no NHS references.)

## Explicitly NOT doing
- No backend/edge-function/data-file changes ("less credits").
- No new images or hero rework.
- No copy rewrite of other sections.
- No SVG anatomy diagram (heavier; icon grid achieves the same intent cheaper).
- No global content audit.

## Verification
Visual check homepage: stat counters animate on scroll-in; joint picker renders between Problem Band and Plan Pillars; clicking each tile navigates to the correct `/conditions/*` route.

Approve and I'll implement in one pass.