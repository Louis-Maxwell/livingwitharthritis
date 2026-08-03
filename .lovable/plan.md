# Pre-publish smoke test

A single command that reproduces, locally, what publishing does: build the production bundles, then type-check the edge functions that the build generates. This is the check that would have caught the recent publish failure (the auto-generated MCP function had an unresolvable import, while the app build itself passed).

## What it does

1. **Typecheck the app** — `tsgo` (fast TS-only pass) so type errors surface before a long build.
2. **Build production bundles** — the existing `npm run build` chain (sitemap + llms + OG generation, `vite build`, canonical injection). Vite's MCP plugin regenerates `supabase/functions/mcp/index.ts` during this step, so the build must run *before* the function check.
3. **Compile-check every edge function** — reuse `scripts/preflight-edge-functions.mjs` (`deno check` per function, timestamped report in `.preflight-reports/`), so the freshly generated MCP function is validated along with the hand-written ones.
4. **Summarise and gate** — print a PASS/FAIL line per stage and exit non-zero on the first failure, so it can be used as a publish gate or in CI.

## Files

- `scripts/prepublish-smoke.mjs` (new) — orchestrator: runs the three stages in order, streams their output, writes a combined JSON summary to `.preflight-reports/prepublish-<timestamp>.json`, exits 0/1.
- `package.json` — add `"smoke:prepublish": "node scripts/prepublish-smoke.mjs"`.
- `.github/workflows/edge-functions-preflight.yml` — leave as-is; optionally a follow-up can call the new script instead.

## Options

- `--skip-build` — reuse the existing `dist/` and generated function (fast re-check).
- `--skip-functions` — bundles only.
- `--skip-version-check` — passed through to the Deno preflight when the pinned Deno version (`.deno-version`, 2.6.10) isn't installed locally.

If Deno is absent, stage 3 reports SKIPPED with a clear message rather than failing the whole run, unless `--strict` is passed.

## Verification

Run `npm run smoke:prepublish` once after implementation and report the per-stage results.
