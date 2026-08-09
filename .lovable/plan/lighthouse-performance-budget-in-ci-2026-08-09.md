# Lighthouse performance budget in CI

Add an automated speed check that runs Lighthouse against a production build on every pull request and fails the build when LCP, CLS, or total page weight regress past agreed thresholds.

## What gets added

1. **Lighthouse CI config** (`lighthouserc.json`)
   - Runs Lighthouse 3 times per URL (median result) in mobile emulation, plus a desktop pass.
   - URLs audited: `/` (home), one condition page, one blog post, `/donate`. Keeps runtime around 3-5 minutes.
   - Assertions that fail the run:
     - `largest-contentful-paint` — max 2500 ms mobile / 2000 ms desktop
     - `cumulative-layout-shift` — max 0.1
     - `total-blocking-time` — max 300 ms
     - `categories:performance` — min score 0.85 mobile / 0.95 desktop
   - Warn-only (visible but non-blocking): speed index, unused JS, image formats.

2. **Resource budgets** (`budget.json`, referenced by the config)
   - Script ≤ 350 KB, total ≤ 1.6 MB, image ≤ 700 KB per page. Exceeding a budget fails.

3. **npm scripts**
   - `perf:lhci` — build, serve `dist` on :4173, run Lighthouse CI, tear down.
   - `perf:lhci:local` — same but against an already-running preview, for quick local checks.

4. **CI workflow** (`.github/workflows/lighthouse.yml`)
   - Triggers on pull requests to `main` and on push to `main`.
   - Concurrency group with `cancel-in-progress`, matching the existing CI hardening.
   - Steps: checkout, Node 20 + npm cache, `npm ci`, `npm run build`, start static server with a readiness poll (same pattern as the SEO audit job), run `lhci autorun`, kill the server.
   - Uploads the HTML reports as a build artifact so a failing run can be inspected without re-running.
   - `timeout-minutes: 20`.

5. **Prepublish smoke integration**
   - Add an optional stage to `scripts/prepublish-smoke.mjs`, run only with `--perf`, so the default publish gate stays fast but the same budgets can be checked locally before shipping.

## Setting the thresholds honestly

The numbers above are targets, not measurements. First run will be in report-only mode: the workflow runs the audit and prints results without failing. Once the actual medians are known, thresholds are set slightly above current values so the gate catches regressions instead of failing on day one — then the report-only flag is removed in the same follow-up.

## Technical notes

- Uses `@lhci/cli` as a devDependency; Chrome comes from the GitHub runner image, so no extra browser install.
- Static serving via `npx serve -s dist -p 4173`, consistent with the existing SEO audit job.
- Client-side routing means every audited URL must be reachable from the SPA fallback that `serve -s` provides.
- No changes to application code — this is build tooling only.

## Verification

Run `npm run perf:lhci` once after implementation and report the median LCP, CLS, TBT, and performance score per audited URL, plus which thresholds were finalised.
