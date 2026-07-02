## Plan

No fix is needed in code. I re-ran the build and TypeScript check and both pass with zero errors:

- `bun run build` — completed successfully (all chunks emitted, canonicals injected)
- `bunx tsgo --noEmit` — no errors

`src/components/ui/chart.tsx` and `vite.config.ts` compile cleanly. The earlier note about chart.tsx type errors is stale.

### Next step
Re-run publish. If the Publish UI reports a specific error, paste the message and I'll target the actual cause.

Once you approve, I'll switch to build mode and call `preview_ui--publish` to deploy the pending SEO changes.