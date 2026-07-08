## Current state

The values in `src/config/charity.ts` are:

- `CHARITY.siteUrl = 'https://livingwitharthritis.org.uk'`
- `CHARITY.websiteDomain = 'livingwitharthritis.org.uk'`

Every SEO file that hardcodes a domain **already uses these exact values**:

| File | Hardcoded value | Matches config? |
|---|---|---|
| `scripts/generate-sitemap.ts` (`BASE_URL`) | `https://livingwitharthritis.org.uk` | ✅ |
| `scripts/inject-canonicals.mjs` (`BASE`) | `https://livingwitharthritis.org.uk` | ✅ |
| `scripts/audit-sitemap.mjs` (default `BASE`) | `https://livingwitharthritis.org.uk` | ✅ |
| `scripts/validate-jsonld.mjs` (`PROD_HOST`) | `https://livingwitharthritis.org.uk` | ✅ |
| `public/robots.txt` (Sitemap directives) | 6 `https://livingwitharthritis.org.uk/…` lines | ✅ |
| `public/sitemap-index.xml` | 5 `https://livingwitharthritis.org.uk/…` sitemap entries | ✅ |
| `public/sitemap.xml` + 4 locale sitemaps | All `<loc>` prefixes | ✅ |

So there are **no stale URLs to rewrite** — the earlier turn that added `siteUrl`/`websiteDomain` to `CHARITY` picked the same values already baked into these files.

## What to actually do

Two low-risk actions:

1. **Regenerate `public/sitemap.xml`** by running the existing generator script — this refreshes `lastmod` timestamps and pulls the latest published blog / condition / exercise rows from Supabase. The script already runs on `predev` and `prebuild`, so this is purely a "refresh now" step:

   ```
   bun scripts/generate-sitemap.ts
   ```

2. **Verify** the regenerated file:
   - `rg -c '<url>' public/sitemap.xml` — entry count, compared to today's 1063
   - `rg -n 'livingwitharthritis' public/sitemap.xml | head -3` — confirm `<loc>` prefix unchanged
   - `head -1 public/sitemap.xml` — confirm XML header intact
   - No changes needed to `sitemap-{es,fr,de,pt}.xml`, `sitemap-index.xml`, `robots.txt`, or `llms.txt` — they already carry the correct absolute URLs.

That's the whole change. No source-file edits, no config drift to reconcile, no reroute of the generator.

## Not doing (would be a separate request)

- Refactoring `scripts/generate-sitemap.ts` to `import { CHARITY } from "../src/config/charity"` instead of a local `BASE_URL` constant. The script runs under `bunx tsx` so it's technically possible, but the other `.mjs` audit scripts can't import TypeScript without additional loader setup — inconsistent, and the values already match. Worth doing only if the domain ever needs to change.
- Rebuilding the locale sitemaps (`sitemap-es.xml`, etc.) — those are static, no domain change needed, and the generator only writes `sitemap.xml`.
- Triggering an SEO rescan — separate action, offered as a follow-up if you want fresh scan results.
