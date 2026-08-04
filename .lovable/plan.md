# Silence the ambiguous Tailwind duration warnings

The production build prints three warnings because `duration-[1200ms]`, `duration-[1400ms]`, and `duration-[2000ms]` can match more than one utility (transition duration or animation duration), so Tailwind can't tell which one is intended. Every one of these is used for a transition, so the fix is to spell out the transition duration explicitly. No visual change — the same durations apply.

## Where the classes appear

Four occurrences across four components:

- `src/components/HeroSection.tsx` (line 190) — hover zoom on the hero image, 1200ms
- `src/components/landing/FeaturedStoryBand.tsx` (line 110) — hover zoom on the story image, 1200ms
- `src/components/landing/FacesStrip.tsx` (line 72) — hover zoom on the faces images, 1400ms
- `src/components/landing/ImpactProgressBand.tsx` (line 56) — animated progress bar width, 2000ms

## Technical detail

The project runs Tailwind CSS v3, which has no `transition-duration-[...]` prefix. The equivalent unambiguous form there is arbitrary-property syntax:

```text
duration-[1200ms]  ->  [transition-duration:1200ms]
duration-[1400ms]  ->  [transition-duration:1400ms]
duration-[2000ms]  ->  [transition-duration:2000ms]
```

This compiles to exactly the same CSS the current classes produce, and Tailwind stops warning because the property is named outright.

## Verification

Run the production build and confirm the three "ambiguous" warnings are gone and no new warnings appear, then check the homepage hero, story band, faces strip, and impact progress bar still animate at the same speed.
