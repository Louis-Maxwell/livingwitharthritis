## Goal
Verify the project builds cleanly with no TypeScript or routing errors after today's GuideLayout / RelatedGuidesBlock / GuideOnwardJourney changes.

## Steps
1. Run a TypeScript-only check across the project with `tsgo --noEmit` (faster than a full Vite build and surfaces every type error including the 12 modified guide pages and 4 new files).
2. Run the production build: `bun run build`. Capture stderr/stdout to a log so any Rollup/Vite routing or import resolution errors are visible.
3. Grep the route table in `src/App.tsx` for any duplicate `path=` entries and confirm every `<GuideLayout currentPath="...">` value matches an entry in `src/lib/guideRegistry.ts`.
4. Report results: PASS/FAIL per step, and the first 10 lines of any error block. If errors appear, list each file + line and propose a follow-up fix plan rather than editing in this turn.

## Out of scope
- Runtime/Playwright verification (separate turn if needed).
- Lighthouse / bundle-size analysis.
- Any code edits — this is a verification-only pass.
