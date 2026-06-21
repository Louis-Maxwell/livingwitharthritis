## Investigation

I audited every URL in `public/sitemap.xml` (844 entries) against:
- React Router patterns in `src/App.tsx` (115 routes)
- Published rows in `blog_articles` (217 slugs)

**Findings:**
1. **Zero broken URLs in the sitemap.** Every entry matches a route, and every `/blog/<slug>` entry maps to a published row.
2. **5 new frailty articles exist in the database but are missing from `public/sitemap.xml`** — the sitemap was last generated before I inserted them. They are: `understanding-frailty-older-adults`, `preventing-falls-guide-frail-adults`, `sarcopenia-muscle-loss-how-to-combat`, `nutrition-strategies-reduce-frailty-risk`, `building-strength-resilience-exercise-frailty-prevention`. Until the sitemap is regenerated they are reachable but undiscoverable to crawlers — not strictly a 404, but the closest thing to one on the live site.
3. **SEO scanner reports "Sitemap needs attention"** flagging `/auth`, `/admin`, `/admin/appointments`, `/admin/psi`, `/admin/emails`. This is a **false positive** — `scripts/generate-sitemap.ts` intentionally excludes these (auth + admin routes) and matches `public/robots.txt`'s `Disallow` rules. Indexing them would surface auth walls to Google. Will mark fixed with explanation.

## Plan

### 1. Regenerate the sitemap
Run `bun scripts/generate-sitemap.ts` so the 5 new frailty articles (and the new `/blog/category/frailty` page) get written into `public/sitemap.xml`. Expected: 844 → 850 entries.

### 2. Dismiss the false-positive SEO finding
Call `seo_chat--update_findings` with `finding_id: http:sitemap`, state `fixed`, explaining that `/auth` and `/admin/*` are intentionally excluded from the sitemap to match `robots.txt` and avoid indexing private routes.

### 3. No code changes needed
- No routes are missing.
- No DB rows are orphaned.
- The 404 page itself (`NotFound.tsx`) is working correctly — it just renders when a user hits a path that isn't in the router (e.g. typo'd URL or removed page from external backlink).

## Out of scope
- Adding new content/routes.
- Editing the 404 page design.
- Rewriting the sitemap generator (it already works correctly).

If you actually have a specific URL in mind that's returning 404 (e.g. an old external link or a Semrush row), paste it and I'll diagnose that one directly instead.