## Goal

Show a short, eye-catching caption directly **under each video thumbnail** on every tai chi page, calling out the single key movement cue for that day/move. Today the description sits below the title — the user wants the cue surfaced right under the video so it's visible at a glance and works as a "subtitle" for the muted demo loop.

## Approach

Add a new `cue` field (≤ ~80 chars, imperative voice) to each day/move data record on the three tai chi pages. Render it as a small caption strip immediately under the video thumbnail (above the existing card body). Keep the longer `what`/`how` description where it already lives — the cue is additive, not a replacement.

Caption style: small text, muted background strip, italic, with a subtle Play/Sparkle icon prefix to read clearly as "what to watch for." Reuses existing semantic tokens (`bg-muted/40`, `text-muted-foreground`, `text-foreground`).

## Files

**Edit:**

1. `src/pages/exercises/TaiChiForBeginners.tsx`
   - Add `cue?: string` to the `days` type
   - Add a one-line cue to each of the 7 days (Days 6 & 7 get a cue too — even rest day benefits from a "what to watch for")
   - Render the cue under the thumbnail button, before the `p-5` body block

2. `src/pages/exercises/TaiChiForArthritis.tsx`
   - Add `cue` to each `movementLibrary` entry (5 movements)
   - Render under the thumbnail in the same card pattern

3. `src/pages/exercises/TaiChiForBalance.tsx`
   - Add `cue` to each `moves` entry (5 moves)
   - Render under the thumbnail; replace the existing "Tap to watch full size · loops while you follow along" line with the cue, and move that micro-instruction into the caption's title attribute / aria-label so we don't double up

## Caption microcopy (drafts)

**Beginners (7-day plan):**
- Day 1 — "Crown lifts, knees soft, breathe through the nose."
- Day 2 — "Weight shifts side-to-side. Feet stay flat."
- Day 3 — "Waist leads. Hands float; shoulders stay heavy."
- Day 4 — "Step, brush past the knee, push gently forward."
- Day 5 — "Hands drift down, weight settles, breath slows."
- Day 6 — "Active rest. Repeat the day you enjoyed most."
- Day 7 — "String all five together. Slow and continuous."

**Arthritis (movement library):**
- Rooted Stance — "Soft knees over toes. Crown lifts gently."
- Weight Shift — "Side-to-side, feet flat. Engine of every move."
- Cloud Hands — "Waist turns; arms follow, never force."
- Brush Knee — "Brush past the knee, push the other hand forward."
- Closing Posture — "Lower the hands, settle the weight, exhale."

**Balance (15-min routine):** mirror the arthritis cues with balance-specific phrasing.

## Out of scope

- No new images, no new video assets, no schema/SEO changes
- No edits to `ExerciseVideoModal` (caption already lives inside the modal)
- No changes to `SeatedTaiChiForArthritis` (it doesn't use the shared animations)

## Risks

Low. Pure presentational change. Each page already maps `days/movementLibrary/moves` over Cards, so adding the field + a single JSX line is contained.
