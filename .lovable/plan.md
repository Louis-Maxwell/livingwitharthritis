## Goal
Regenerate `public/sitemap.xml`, verify it includes `/chat` and excludes private routes, confirm `robots.txt` alignment, and check the live deployed copies.

## Current state (already verified)
- `scripts/generate-sitemap.ts` excludes `/auth`, `/admin*`, `/donation-result`, `/unsubscribe`, `/newsletter/confirm`, `/sitemap`, `/site-index`, `/debug/*`, `/buddy/match` via `STATIC_EXCLUDE` and includes `/chat` from `App.tsx`.
- `public/sitemap.xml` currently has 456 `<loc>` entries; `/chat` is present; no private routes leak.
- `public/robots.txt` disallows the matching private paths for Googlebot/Bingbot/DuckDuckBot/`*`, allows `/chat`, and points `Sitemap:` at `https://livingwitharthritis.org.uk/sitemap.xml`.

## Steps
1. Run `bun scripts/generate-sitemap.ts` to refresh `lastmod` and pick up any new blog posts from Supabase.
2. Grep the regenerated file to confirm: `/chat` present; zero matches for `/(auth|admin|donation-result|unsubscribe|newsletter/confirm|site-index|debug|sitemap)$` patterns; total entry count reported.
3. Fetch the live `https://livingwitharthritis.org.uk/sitemap.xml` and `/robots.txt` with `curl` and run the same checks against the production copies. Note that the live file only updates on the next publish.
4. Mark the SEO `http:sitemap` finding fixed via `seo_chat--update_findings` with a one-line explanation of what was verified.
5. Tell the user the local sitemap is regenerated and verified, and that the production copy will reflect changes after the next publish.

## Out of scope
- No new routes added or removed.
- No changes to `robots.txt` (already correct).
- No edits to the edge-function sitemap (`supabase/functions/generate-sitemap`); production serves `public/sitemap.xml`.