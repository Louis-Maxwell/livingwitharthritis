## Why the blog is broken on Live

The Live database `blog_articles` table is **empty (0 rows)**. The frontend hooks (`useBlogArticlesList`, `useBlogArticle`, `BlogPreview`, `RelatedArticles`, `FooterMostRead`) all query Supabase with `is_published = true` and get nothing back, so:

- `/blog` (BlogIndex / BlogHub) shows no articles
- `/blog/:slug` returns 404 for every URL
- The "Health & Wellness Journal" strip on the home page renders nothing
- Footer "Most read" + Related Articles are empty

Code is fine. The fix is purely a data sync — the upsert script is already staged at `/mnt/documents/live_backend_sync.sql` (369 INSERTs, all `ON CONFLICT ... DO UPDATE`, safe to re-run).

## Plan

1. **Run the staged sync against Live**
   - Execute `/mnt/documents/live_backend_sync.sql` in chunks via `supabase--insert` (Section 1: CMS tables — services, conditions, arthritis_types, donation_tiers, about_us, nutrition_sections, etc.; Section 2: 203 blog articles).
   - Upsert only. No DELETEs. No schema changes. No edge function changes. No frontend changes.

2. **Post-sync integrity check** (read-only SQL)
   - `blog_articles` count ≥ 203, all `is_published = true`, no NULL `slug`/`title`/`content`/`category`/`date`.
   - No slug collisions with `BLOG_SLUG_REDIRECTS` keys.
   - Spot-check 5 random slugs return a complete row.
   - Confirm CMS tables (services, conditions, etc.) populated.

3. **Refresh the sitemap**
   - Invoke the `generate-sitemap` edge function on Live.
   - Verify `https://livingwitharthritis.org.uk/sitemap.xml` returns 200 with `<urlset>` and URL count jumped from ~490 to ~693 (203 new blog URLs).
   - HEAD-probe 5 random blog URLs from the sitemap → expect 200.

4. **Frontend smoke test**
   - Hit Live `/blog` and confirm the list renders (via PostgREST `select count(*)` on `blog_articles?is_published=eq.true` from anon).
   - Hit one article slug and confirm it returns.

## What will NOT change

- No migrations, no `ALTER`, no `DROP`, no `DELETE`.
- No edits to `src/integrations/supabase/*`, `.env`, `supabase/config.toml`, edge function code, hooks, or components.
- No touching `public/sitemap.xml` (the edge function + cache handle it).

## Deliverables

- `/mnt/documents/live_blog_sync_report.md` — row counts before/after, integrity pass/fail per check, sitemap URL count delta, sample article HTTP probes.
- Inline confirmation that `/blog` is live.

## Rollback

Not required — upsert-only, no destructive ops. If anything looks off, the prior Live state for CMS tables is preserved (only `healthy_living_resources` already had rows and the script uses `ON CONFLICT DO UPDATE` with the same values).
