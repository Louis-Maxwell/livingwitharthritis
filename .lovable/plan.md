## Context

The audit screenshot flags 5 issues:
1. **XML Sitemap** — "not found"
2. **Robots.txt** — "missing"
3. **Canonical** — "missing"
4. **PageSpeed Mobile** — 63/100
5. **PageSpeed Desktop** — 86/100

Reality check against the codebase:

- `public/sitemap.xml` exists (450 URLs, auto-generated via `scripts/generate-sitemap.ts` on predev/prebuild)
- `public/robots.txt` exists with a `Sitemap:` directive
- Every page renders `<link rel="canonical">` via `SeoHead` + the new `CanonicalEnforcer` guarantees exactly one canonical per route

So issues 1–3 are **false negatives** from the external scanner. The most likely cause: the scanner fetched the site without executing JS (canonical) and/or hit a stale cache or the wrong host (sitemap/robots).

## Plan

### 1. Confirm the three "missing" files are actually live
Use `curl` against the production domain to verify:
- `https://livingwitharthritis.org.uk/sitemap.xml` returns 200 + valid XML
- `https://livingwitharthritis.org.uk/robots.txt` returns 200 + contains `Sitemap:` line
- `https://livingwitharthritis.org.uk/` HTML source contains `<link rel="canonical">` (server-rendered, not JS-injected)

If sitemap/robots return 404 → the last publish didn't include them → republish is the fix.

### 2. Add a server-rendered canonical to `index.html`
Currently the homepage canonical is JS-injected (Helmet/CanonicalEnforcer). Non-JS scanners (and many SEO audit tools) won't see it. Re-add a **static** `<link rel="canonical" href="https://livingwitharthritis.org.uk/">` to `index.html` for the homepage only. The existing `CanonicalEnforcer` already de-duplicates, so per-route Helmet canonicals on other pages still win — no duplicate-canonical risk.

This directly fixes the "Missing canonical" finding for any non-JS crawler.

### 3. PageSpeed — defer
Mobile 63 / Desktop 86 needs a separate performance pass (image weight, render-blocking JS, font loading, third-party scripts). Not in scope unless you confirm — these usually take a focused session.

## Files to touch

- `index.html` — add one static `<link rel="canonical" href="https://livingwitharthritis.org.uk/">` line in `<head>`
- No other code changes — sitemap + robots are already correct

## After implementation

Re-run the external audit. If sitemap/robots still show missing, the fix is **Publish** (top-right) — the scanner is reading a stale deployment, not a code bug.

Confirm: should I also kick off the PageSpeed optimisation pass, or leave that for a separate request?