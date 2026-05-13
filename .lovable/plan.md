## Goal
Replace the hand-edited `public/sitemap.xml` with a generator script that auto-discovers static routes from `src/App.tsx` and dynamic routes from their data sources, runs on every `dev`/`build`, and stays in sync without manual edits.

## Why a migration is justified
The current `public/sitemap.xml` is hand-edited with 58 URLs. The site has multiple **dynamic** route families that a hand-edited file can't track:
- `/blog/:slug` — Supabase `blog_articles` (~dozens of rows, growing).
- `/blog/category/:category` — derived from articles.
- `/product/:handle` — `src/data/affiliateProducts.ts`.
- `/arthritis-support/:city` and `/arthritis-support/:city/:condition` — `src/data/ukCities.ts` × `src/data/arthritisConditions.ts`.
- `/exercises/:slug` (joint-specific) — `src/data/exerciseJointMatrix.ts`.
- `/daily-tips/:slug` — `src/data/dailyTips.ts`.
- `/regions/:region` — derived from `ukCities.ts`.

Confirming the migration in this plan satisfies the "confirm before replacing a hand-edited sitemap" rule. Approving the plan = approving the migration.

## Plan

### 1. Create `scripts/generate-sitemap.ts`
A single TypeScript script with three sections:

**Static routes** — parsed from `src/App.tsx` with a regex over `<Route path="…" />`. Filters:
- Drop anything containing `:` (handled by the dynamic section).
- Drop `*`, `/admin`, `/admin/*`, `/auth`, `/donation-result`, `/unsubscribe`, `/sitemap`, `/site-index` (admin/transactional/duplicates).
- Drop `/lovable*`.

**Dynamic routes** — typed loaders, one per family:
- **Blog posts**: query `blog_articles` via the public Supabase client (anon key) — same source as `useBlogArticles`, fetched with no `published` filter mentioned in the hook so we mirror it. One `<url>` per slug → `/blog/<slug>`. Use `updated_at` (or `date`) as `<lastmod>`.
- **Blog categories**: `Array.from(new Set(articles.map(a => a.category)))` → `/blog/category/<slug>`.
- **Daily tips**: import `src/data/dailyTips.ts`, map slugs → `/daily-tips/<slug>`.
- **Products**: import `src/data/affiliateProducts.ts`, map ids → `/product/<id>`.
- **Cities**: import `src/data/ukCities.ts`, map slugs → `/arthritis-support/<city>`. For each city × each condition slug from `src/data/arthritisConditions.ts` → `/arthritis-support/<city>/<condition>`.
- **Joint-specific exercises**: import `src/data/exerciseJointMatrix.ts`, map joint slugs → `/exercises/<slug>`.
- **Regions**: derived unique regions from `ukCities.ts` → `/regions/<region-slug>`.

Per-route metadata defaults:
- Homepage `priority=1.0 changefreq=weekly`.
- Blog posts `priority=0.7 changefreq=monthly`, `lastmod` from row.
- Other content pages `priority=0.6 changefreq=monthly`.
- Tools/guides `priority=0.7 changefreq=monthly`.

Output: writes to `public/sitemap.xml` and logs `sitemap.xml written (N entries)`.

### 2. Wire it into the build
Add to `package.json`:
```jsonc
"predev":   "bunx tsx scripts/generate-sitemap.ts || true",
"prebuild": "bunx tsx scripts/generate-sitemap.ts"
```
- `predev` uses `|| true` so a transient Supabase fetch failure doesn't block local development.
- `prebuild` fails hard so a broken sitemap can't ship.

Skip Supabase fetch when `VITE_SUPABASE_URL` is missing (just log a warning and emit static + file-based dynamic routes only).

### 3. Generate once now, commit the first output
Run the script once during the implementation step so the new `public/sitemap.xml` matches reality immediately, with all blog posts and city pages included. Verify entry count goes from 58 → ~150-300 depending on city × condition fan-out.

### 4. Post-checks
- `xmllint --noout public/sitemap.xml` to confirm valid XML.
- Diff old vs new entry list — flag any URL present in the old hand-edited file but missing from the generated one (paste in chat for review).
- Re-run the existing `scripts/validate-jsonld.mjs` to confirm new sitemap entries still resolve.

## Files touched
- **New**: `scripts/generate-sitemap.ts`
- **Edit**: `package.json` (add `predev`, `prebuild`).
- **Regenerated**: `public/sitemap.xml`.

## Out of scope
- Sitemap-index splitting (only needed >50,000 URLs).
- `<image:image>` extensions.
- Changing route definitions or data sources.
- Re-submitting the sitemap to Google Search Console (already submitted; Google re-fetches automatically).
