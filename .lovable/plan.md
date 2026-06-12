## Goal
Address the three screenshot items (institutional authority, research-led, "leading arthritis charity") in the cheapest possible way: **copy + reorder only, no new sections, no new images, no design system changes.**

## Scope — 2 files, ~15 min of edits

### 1. `src/components/landing/OAHero.tsx` — copy swap
- **Headline** change: replace "Sore joints, stiff mornings, brighter days ahead." with a research/authority-led line, e.g.:
  > "The UK's clinically-reviewed guide to living well with arthritis."
  (italic accent on "clinically-reviewed")
- **Trust ribbon**: keep HCPC + CSP bullets, add a third — "Aligned with NICE guidance" — so the credibility row reads as institutional, not personal.
- No layout, image, button, or popular-links change.

### 2. `src/pages/Index.tsx` — section reorder (no new code)
Move research/impact-led bands above the personal/stories bands so the page leads with authority:

Current order (relevant slice):
```
OAHero → HeroStatsStrip → OAProblemBand → AboutArthritisCards → FacesStrip → OAPlanPillarsSection → ...
```
New order:
```
OAHero → HeroStatsStrip → OAProblemBand → OAPlanPillarsSection → AboutArthritisCards → FacesStrip → ...
```
Effect: stats + problem framing + clinical plan pillars all appear before the human "Faces" strip. Pure JSX reorder, no component edits.

## Explicitly NOT doing (to keep credits low)
- No hero redesign (locked per memory).
- No new "Research" or "Authority" section/component.
- No new imagery, palette, or typography work.
- No "leading arthritis charity" claim in copy — that would violate the neutrality/no-fabricated-claims memory. Authority is conveyed through clinical alignment (HCPC/CSP/NICE) and reorder, not a self-awarded superlative.
- No backend, no SEO findings sweep, no new routes.

## Files touched
- `src/components/landing/OAHero.tsx`
- `src/pages/Index.tsx`

## Verification
Visual check of homepage after edits — confirm new headline renders, NICE bullet shows, plan pillars appear before Faces strip.

Approve and I'll implement in one pass.
