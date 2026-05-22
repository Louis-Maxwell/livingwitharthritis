## Plan: Rebuild sitemap and robots rules

### Current state
- `public/sitemap.xml` has been regenerated via `scripts/generate-sitemap.ts` (502 entries, all static and dynamic routes covered, intentionally excluded routes properly omitted).
- `public/robots.txt` covers admin/auth/chat routes but is missing several utility/internal routes.

### Changes needed

1. **Update `public/robots.txt`** — Add `Disallow` entries for utility/internal pages that should not be crawled:
   - `/donation-result` (post-transaction page)
   - `/unsubscribe` (email utility)
   - `/newsletter/confirm` (confirmation utility)
   - `/debug/schema` (internal debug tool)
   - `/site-index` (internal navigation page)
   
   These should be added to every `User-agent:` block that already has `Disallow` rules (Googlebot, Bingbot, DuckDuckBot, and the default `*` block).

2. **Mark SEO finding fixed** — The failing `http:sitemap` finding flags `/chat`, `/auth`, `/admin`, `/admin/appointments`, `/admin/psi` as "missing" from the sitemap. These routes are intentionally excluded (they are internal/admin/auth pages, also disallowed in robots.txt). After regenerating the sitemap and verifying the exclude list is correct, this finding should be marked as fixed.

### Verification
- Run sitemap generator: already done, 502 entries written.
- Confirm no static public routes are missing from sitemap: verified, none missing.
- Confirm robots.txt disallows all non-public routes: will be verified after edit.