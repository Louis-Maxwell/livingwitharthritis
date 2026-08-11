# CI check: no page ships the generic homepage title/description

Add an automated guard that scans the built HTML and fails when a route's static
`<title>` / `<meta name="description">` (and their og/twitter twins) are still the
sitewide homepage defaults from `index.html`.

## What gets added

1. **`scripts/check-prerender-meta.mjs`**
   - Reads the homepage defaults straight out of `index.html` (title line 119,
     description line 120) so the check never goes stale when the defaults change.
   - Walks every `dist/**/index.html` except the root one.
   - Flags a page when its `<title>` equals the default, its
     `<meta name="description">` equals the default, or the page carries
     `<meta name="robots" content="noindex...">`.
   - Also flags `og:title` / `og:description` still equal to the defaults.
   - Output: a per-route list of failures grouped by reason plus totals; `--json`
     writes a report to `.preflight-reports/prerender-meta-*.json`, matching the
     CSS utility check's convention.
   - Exit codes: non-zero on any failure once the gate is enforcing.

2. **Threshold / allowlist, because today it would fail**
   The current state is honest: `inject-canonicals.mjs` only rewrites titles for
   routes listed in `scripts/ai-head-data.json`; every other prerendered route keeps
   the generic head. So the script ships with:
   - `--max-generic=<n>` (default read from a small `prerender-meta-baseline.json`),
     so the gate locks in today's count and fails only on regression;
   - noindex pages always failing at zero tolerance (that class of bug is already
     fixed and must never come back).
   First run records the baseline; the number gets driven down as more routes get
   real per-route metadata.

3. **npm script** — `"seo:prerender-meta": "node scripts/check-prerender-meta.mjs"`.

4. **CI wiring** (`.github/workflows/ci.yml`)
   - Current CI runs plain `npm run build`, which does not prerender, so the check
     would only see the root page. Change the CI build step to `npm run build:prerender`
     so the artefact being audited is the same one that gets published, and add a
     step running `npm run seo:prerender-meta -- --json` after it, with an
     `if: always()` artefact upload of the report.
   - If the prerender build proves too slow for the 15-minute job budget, cap it via
     the existing `MAX_PRERENDER_ROUTES` idea and audit the capped set.

5. **Prepublish smoke** — add the same check to `scripts/prepublish-smoke.mjs` so a
   local publish gate catches it before GitHub does.

## Technical notes

- Files touched: new `scripts/check-prerender-meta.mjs`, new
  `scripts/prerender-meta-baseline.json`, `package.json`, `.github/workflows/ci.yml`,
  `scripts/prepublish-smoke.mjs`.
- Pure regex/string parsing on the built HTML — no new dependency, no browser.
- No application, styling, or backend changes.

## Verification

Run the prerender build locally, then the check, and report: total pages scanned,
how many still carry the generic title/description, how many carry noindex (expected
zero), and the baseline number the gate is locked to.
