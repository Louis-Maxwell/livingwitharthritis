## Goal
Run Lighthouse against the published build at `https://livingwitharthritis.org.uk` and surface remaining Performance and Accessibility issues, with file-level pointers to fix them.

## Approach

### 1. Run Lighthouse headlessly via `nix run nixpkgs#lighthouse`
- Target URL: `https://livingwitharthritis.org.uk/` (homepage, mobile preset — Google's default for ranking).
- Categories: `performance,accessibility` (skip SEO/best-practices for this pass — separate review surface already handles them).
- Output: JSON + HTML reports written to `/mnt/documents/lighthouse-home-mobile.{json,html}`.
- Use `--chrome-flags="--headless=new --no-sandbox"` for the sandbox.

### 2. Run a second pass on a representative deep page
`/conditions/osteoarthritis` — heaviest content page with images + JSON-LD. Same flags, written to `/mnt/documents/lighthouse-osteo-mobile.{json,html}`.

### 3. Parse JSON reports
Extract from each report:
- Category scores (perf / a11y, 0–100).
- Core Web Vitals: LCP, CLS, INP/TBT, FCP, TTI, Speed Index.
- Every audit with `score < 1` in either category, with: id, title, displayValue, and the first 3 affected DOM nodes/URLs (when present).

### 4. Map each failing audit to project files
For each finding, search the codebase to give an actionable fix location (e.g. unsized image → which `<img>`; render-blocking CSS → which import; contrast → which token in `index.css`).

### 5. Deliverable
A single Markdown summary at `/mnt/documents/lighthouse-summary.md` with:
- Score table (home / osteoarthritis × perf / a11y).
- Core Web Vitals table.
- Performance findings sorted by `wastedMs` desc, each with file pointer + suggested fix.
- Accessibility findings grouped by audit, each with file pointer.
- Both raw HTML reports linked as artifacts.

Plus an inline summary in chat with the headline scores and the top 5 issues per category.

## Notes / risks
- Lighthouse needs Chromium; will fall back to `npx lighthouse` with bundled puppeteer if `nix` install is slow.
- Mobile preset uses simulated 4G throttling — numbers will be lower than DevTools desktop runs; that's the metric Google ranks against.
- Score variance run-to-run is ~±5 points; one pass is enough to identify *issues* even if the number wobbles.

## Out of scope
- Fixing the issues — this task is diagnostic only. Fixes happen in a follow-up.
- SEO and Best-Practices categories.
- Multi-run averaging.
