## Goal

Give every tai chi day/movement card a consistent, in-page video modal so users can watch the clip full-size with playback controls — without leaving the page or scrolling away.

## Why a modal (not inline upgrade)

Today, `ExerciseVideo` autoplays muted and looped inline. That's perfect as a thumbnail but limits the user to a small, sound-off, controls-free preview. A modal gives:
- larger viewport
- play/pause/seek controls
- per-clip title + caption
- keyboard + ESC to close (shadcn `Dialog` handles a11y)
- consistent UX across all tai chi pages

## New component

`src/components/exercises/ExerciseVideoModal.tsx` — a single source of truth.

- Wraps shadcn `Dialog` (`@/components/ui/dialog`).
- Trigger: any child (so cards control their own thumbnail UI).
- Content: a `max-w-3xl` dialog with:
  - Title + optional one-line description
  - `<video controls playsInline preload="metadata">` (no autoplay until open, then autoplay+unmuted on open)
  - The same "AI-generated demonstration — illustrative only, not medical guidance" caption from `ExerciseVideo`
- Auto-pauses when dialog closes.
- Accepts `src`, `title`, `description?`, `poster?`, plus a render prop / children for the trigger.

## Updated thumbnail behaviour

Add an optional `onClick` overlay layer to the existing `ExerciseVideo` (or keep `ExerciseVideo` untouched and stack a button overlay in cards). Preferred: extend `ExerciseVideo` with an optional `onPlayClick` prop that renders a centred Play button with a soft scrim on hover. When set, the inline video stays as the silent loop and the button opens the modal.

This avoids touching the SVG/loading paths and keeps `ExerciseVideo` backward-compatible.

## Pages to wire up

1. **`src/pages/exercises/TaiChiForBeginners.tsx`** — wrap each Day card's video in `ExerciseVideoModal` with `title="Day {n}: {title}"` and `description={d.what}`.
2. **`src/pages/exercises/TaiChiForArthritis.tsx`** — same treatment for the movement-library cards (line ~251), titled with `m.name` + `m.brief`.
3. **`src/pages/exercises/TaiChiForBalance.tsx`** — same for the routine cards (line ~171).
4. **`src/pages/exercises/SeatedTaiChiForArthritis.tsx`** — only if it currently uses `TAI_CHI_ANIMATIONS` (will verify on first read in build mode and skip if not).

No changes to `TAI_CHI_ANIMATIONS` itself — we read `*.mp4.asset.json` URLs directly inside the modal, exposed via a small helper like `TAI_CHI_VIDEOS` (key → `{ src, label }`) to avoid each page re-importing the asset JSONs.

## New helper (small)

`src/components/exercises/TaiChiAnimations.tsx` — add a sibling export:

```ts
export const TAI_CHI_VIDEOS: Record<AnimKey, { src: string; label: string }> = {
  'rooted-stance':  { src: RootedStanceAsset.url,  label: 'Rooted Stance' },
  // ...
};
```

So pages can do `<ExerciseVideoModal {...TAI_CHI_VIDEOS[d.anim]} title={...} />`.

## Out of scope

- No new videos, no transcripts, no captions track, no playback analytics.
- No global "video library" page.
- No autoplay-with-sound on page load (browsers block it anyway).
- No design-token changes; reuse existing dialog and button styles.

## Files

**Create**
- `src/components/exercises/ExerciseVideoModal.tsx`

**Edit**
- `src/components/exercises/ExerciseVideo.tsx` — add optional `onPlayClick` + Play overlay
- `src/components/exercises/TaiChiAnimations.tsx` — export `TAI_CHI_VIDEOS` map
- `src/pages/exercises/TaiChiForBeginners.tsx`
- `src/pages/exercises/TaiChiForArthritis.tsx`
- `src/pages/exercises/TaiChiForBalance.tsx`
- `src/pages/exercises/SeatedTaiChiForArthritis.tsx` *(only if it uses the animations)*
