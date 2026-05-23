# Fix observable SEO issues

The XML sitemap already exists (`public/sitemap.xml`, 453 URLs, auto-regenerated on `predev`/`prebuild` via `scripts/generate-sitemap.ts`) and is referenced from `robots.txt`. No new sitemap mechanism needed. Below are the concrete, verifiable issues to fix now.

## 1. Sitemap ↔ robots.txt mismatches (real bug)

The sitemap currently lists 3 URLs that `robots.txt` explicitly disallows. Search engines flag this as a contradiction:

- `/chat` — disallowed in robots, but in sitemap (line 10)
- `/newsletter/confirm` — disallowed, but in sitemap (line 412)
- `/debug/schema` — disallowed via `/debug/`, but in sitemap (line 418)

**Fix:** Extend `STATIC_EXCLUDE` in `scripts/generate-sitemap.ts` to mirror every path in robots.txt' s `Disallow` list (`/chat`, `/newsletter/confirm`, `/debug/*`, plus the existing `/auth`, `/admin`, `/donation-result`, `/unsubscribe`, `/site-index`). Re-run the generator so `public/sitemap.xml` is rewritten without those entries.

## 2. Verify the last-round head fixes are actually in `index.html`

Read `index.html` and confirm the previously-applied changes are still present:

- `<title>` is `Arthritis Help UK | Free Physio, Diet & AI Joint Support` (58 chars)
- Static homepage `<link rel="canonical" id="static-canonical" href="https://livingwitharthritis.org.uk/">` is present with the inline script that strips it on non-`/` routes
- A single `<meta name="description">` under 160 chars
- `og:url`, `og:title`, `og:description`, `og:type` present
- Sitewide Organization JSON-LD present and valid

If any of these have drifted, restore them. No new tags added beyond what was already agreed.

## 3. Verify robots.txt + sitemap are self-consistent after step 1

After regenerating the sitemap, grep it for any path that still appears in a robots `Disallow` line — should return zero matches.

## Out of scope (explicitly not changing)

- No new per-route Helmet work, no new schema types, no design changes.
- No PageSpeed/perf work (Mobile `FAILED_DOCUMENT_REQUEST` is a Lighthouse fetch flake that clears on rescan; desktop 82/100 is a separate dedicated pass).
- Not creating a new sitemap file — the existing generator stays.
- Not touching content, copy, or components.

## Technical notes

- Files edited: `scripts/generate-sitemap.ts` (extend exclude set), `public/sitemap.xml` (regenerated output).
- Verification: after edits, `grep -E "/chat|/newsletter/confirm|/debug" public/sitemap.xml` should be empty, and `grep -c "<url>" public/sitemap.xml` should drop by exactly 3.
- After publish, request a rescan in Semrush/Backlinko against `https://livingwitharthritis.org.uk` to clear the stale audit findings.
