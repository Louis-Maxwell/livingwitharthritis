# Move "Our Story" (FounderStoryBand) from landing page to About Us

## What changes

The "Founded by a clinician who lived it" story band currently sits on the homepage (`src/pages/Index.tsx`). Move it to the About Us page (`src/pages/AboutUs.tsx`), placed directly after the PageHero and before the Team section — a natural narrative position, since the hero title ("From a personal mission to a national movement") leads straight into the story.

## Steps

1. **`src/pages/Index.tsx`**
   - Remove the `FounderStoryBand` lazy import (line 37).
   - Remove its render block ("01b — Founder story: why we exist", lines 183–187).
   - Renumber nothing; the remaining `Suspense` sections stay as-is.

2. **`src/pages/AboutUs.tsx`**
   - Add a lazy import of `@/components/landing/FounderStoryBand`.
   - Render it inside a `Suspense` block immediately after the `</PageHero>` closing tag (after line 174), before the Team section.

3. **`src/components/landing/FounderStoryBand.tsx`**
   - Adjust the CTA group so it doesn't point at the page it now lives on: change "Meet the team" to link to `/about#maxwell` (the team section anchor on the same page) — or, simpler, keep the component unchanged and let both buttons still link to `/about` since they will effectively become same-page jumps. Preferred: leave the component copy untouched except that "Read our clinical policy" continues linking to `/editorial-standards`... actually verify its current `to="/about"` targets and repoint them to meaningful destinations:
     - "Meet the team" → `#maxwell` anchor is fragile; instead link to `/about#team`... 
   - **Simpler final decision:** keep the component untouched; both CTAs link to `/about`, which on the About page simply scrolls to top — acceptable, but the better move is to change "Meet the team" to a same-page anchor link to the Team section (add `id="team"` to the Team `<section>` and use `to="#team"` handling via a plain `<a href="#team">`). This is the version that will be implemented.

4. **Verify**
   - Typecheck + production build pass.
   - Landing page no longer shows the founder story; `/about` shows it directly under the hero.

## Notes

- No layout, colour, or navigation changes beyond this move.
- The component file itself stays in `src/components/landing/` (harmless) — only its usage moves.
