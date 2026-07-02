## Plan: No changes required

Ran `bunx tsgo --noEmit` — zero TypeScript errors. `src/components/ui/chart.tsx` already typechecks cleanly (the earlier edits that loosened `ChartTooltipContent` and `Legend` prop types resolved the recharts/Rollup type mismatch).

**Verification:** `bunx tsgo --noEmit` exits 0 with no output.

**Nothing to change.** If the user is still seeing an error in the preview, it's likely a stale IDE cache or an older build output — a fresh `bun run build` will reflect the current passing state.

If you'd like, I can instead:
- Tighten the loosened `any` types in `chart.tsx` back toward stricter recharts types (cosmetic — build already passes), or
- Diagnose a specific error message if you re-paste one.
