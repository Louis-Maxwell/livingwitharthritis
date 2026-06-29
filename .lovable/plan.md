## Goal
Bring the MAP-inspired layout from the reference (HOW YOU CAN HELP / OUR IMPACT / WHAT WE DO / LATEST) to the homepage, with strong readability: large Anton headlines, dark body copy on cream surfaces, no faded greys.

## Sections to add/refresh on `/` (in order)

1. **HOW YOU CAN HELP** — asymmetric mosaic
   - Large feature card (image + dark overlay) with "Donate now" headline, supporting paragraph, red MAKE A DONATION button.
   - Two stacked side cards (thumbnail + headline + 2-line description), e.g. "Join the community", "Take action — share your story".
   - Cream `#F4ECDE` band, Anton uppercase H2, body text in `foreground` (near-black) at 16px / 1.6 line-height.

2. **OUR IMPACT** — 3 stat blocks
   - Coloured blocks (teal tint, deep green, MAP red) with white icon badge, huge Anton number, bold sub-label, small description.
   - Use existing stats (visitors helped, articles published, conditions covered) — no fabricated metrics.
   - Min contrast AA: white text on red/green, near-black on teal tint.

3. **WHAT WE DO** — slider rail
   - Eyebrow + arrow controls, then 2–3 wide cards: image left, headline + underline link + paragraph right.
   - Pulls from existing pillar guides (Exercise, Diet, Self-help).

4. **LATEST** — 3-up press/article grid
   - Red "Article" cover cards for items without thumbnails; photo cards for those with images.
   - Date + tag chips beneath title.
   - Wired to existing `useBlogArticles` top 3.

## Readability fixes (global, applied this pass)
- Body copy color: bump muted paragraph text from `--muted-foreground` to `--foreground` inside these new sections (no light-grey-on-cream).
- Minimum body size 16px; section intros 18px.
- All headlines Anton, tracking-tight, `text-foreground`.
- Buttons keep sharp MAP red with white text + arrow icon.
- Fix the visible "Skip to main content" leak (currently shows as a red pill mid-page in your screenshot context) by restoring `sr-only` + `focus:not-sr-only` behaviour.

## Files to touch
- `src/pages/Index.tsx` — slot the four new sections in place of the current equivalents.
- New components under `src/components/landing/`:
  - `HowYouCanHelp.tsx`
  - `ImpactStats.tsx`
  - `WhatWeDo.tsx`
  - `LatestGrid.tsx`
- `src/index.css` — add `.surface-cream`, `.surface-cream-warm`, ensure `.skip-link` only shows on focus.
- No data/business-logic changes; uses existing `images.ts`, `guideRegistry.ts`, `useBlogArticles`.

## Out of scope
- No new routes, no copy rewrites beyond section headings, no changes to header/footer.

Confirm and I'll build it.
