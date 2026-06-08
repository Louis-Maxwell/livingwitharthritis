# Fix Live Backend — Plan

## Diagnosis (confirmed earlier)

The Live backend itself is **healthy and connected**. The single broken thing is that the `blog_articles` table in Live has **0 rows**, while Test has 204 rows (203 published). That's why `/blog`, category pages, and related-article strips look empty on the live site. Everything else — auth, RLS, edge functions, env vars, schema — is working on Live.

A migration that upserts all 203 articles into Live is already staged at:
`supabase/migrations/20260607185217_sync_blog_articles_to_live.sql`

It uses `INSERT ... ON CONFLICT (slug) DO UPDATE`, so it is safe and repeatable. It applies to Live the next time the project is published.

## Plan

1. **Verify Live backend status** (`supabase--cloud_status` on production) before doing anything destructive, so we know the DB is `ACTIVE_HEALTHY`.
2. **Confirm Live is empty** with a read-only count on production `blog_articles` (sanity check that nothing has changed since the last audit).
3. **Publish the project.** This is the only mechanism that runs the staged migration against Live. The user clicks Publish; the migration then upserts 203 articles into `public.blog_articles` on Live.
4. **Verify the sync** by re-querying Live: expect `204 total / 203 published`, matching Test.
5. **Spot-check the live site**: `https://livingwitharthritis.org.uk/blog` should show 203 articles, category pages should populate, and an individual article slug should open.
6. **Regenerate the sitemap** by invoking the `generate-sitemap` edge function on Live so the 203 article URLs are discoverable (otherwise it auto-refreshes within ~6 hours).
7. **Report results** — Live article count before/after, sitemap URL count, any failures.

## What I will NOT touch

- No schema changes, no RLS changes, no GRANT changes — Live's structure is already correct.
- No edits to `src/integrations/supabase/*`, `.env`, or `supabase/config.toml`.
- No changes to any other table (donations, appointments, users, profiles, etc.).
- No second migration — the staged file is the canonical one.

## Technical notes

- The staged migration file is 1.26 MB / ~11,840 lines. It cannot be re-sent through the migration approval tool (payload too large); it ships to Live via the normal Publish flow that scans `supabase/migrations/`.
- If Publish reports the migration failed on Live, fallback is **Option B**: open Lovable Cloud → Run SQL → switch to **Live** → paste `/mnt/documents/blog_articles_sync_to_live_v2.sql` → run. Same SQL, same result, no repo involvement.
- No frontend code change is required. The `useBlogArticles` hooks already query the right table with the right filters; they're returning 0 simply because Live has 0 rows.

## Action required from you

Approve this plan, then click **Publish** when prompted. I'll handle verification and the sitemap refresh after the publish completes.
