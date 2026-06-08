## Goal
Populate the Live backend with the same high-quality content already curated in Test, so every data-driven page on the live site (homepage, /blog, conditions, faces, donations, nutrition, exercises, governance, AI-safety, etc.) renders properly. Upsert only — no destructive operations.

## What's broken in Live right now

Live vs Test row counts (queried just now):

| Table | Live | Test |
|---|---|---|
| blog_articles | **0** | 204 |
| services | **0** | 6 |
| conditions | **0** | 6 |
| arthritis_types | **0** | 6 |
| statistics | **0** | 4 |
| physio_myths | **0** | 10 |
| donation_tiers | **0** | 4 |
| fundraising_options | **0** | 5 |
| nutrition_sections | 4 | 8 |
| face_stories | **0** | 4 |
| faces_trust_facts | **0** | 4 |
| featured_stories | **0** | 9 |
| about_us_sections | 4 | 7 |
| joint_exercises | **0** | 30 |
| journey_chapters | **0** | 7 |
| ai_safety_principles | **0** | 10 |
| ai_safety_faqs | **0** | 12 |
| ai_safety_certifications | **0** | 12 |
| healthy_living_resources | 21 | 21 ✅ |

Schema is correct on Live; only data is missing.

## Plan

1. **Verify Live status** (`supabase--cloud_status`) is `ACTIVE_HEALTHY` before touching anything.
2. **Dump Test → SQL** for every empty/short table above. For each table I read all rows from Test, then build a single `INSERT … ON CONFLICT (id) DO UPDATE SET …` statement per row. Output goes to `/mnt/documents/live_backend_sync.sql`.
3. **Reuse the existing blog SQL** (`/mnt/documents/blog_articles_sync_to_live_v2.sql`, 203 articles, already upsert-safe on `slug`) — concatenated as section 1 of the bundle.
4. **Bundle order** (safe, idempotent, no FKs between these tables so order is cosmetic):
   1. blog_articles (existing v2 file)
   2. services, conditions, arthritis_types, statistics, physio_myths
   3. donation_tiers, fundraising_options
   4. nutrition_sections, about_us_sections, healthy_living_resources (upsert merges the 4/21 already there — no duplicates)
   5. face_stories, faces_trust_facts, featured_stories, journey_chapters
   6. joint_exercises
   7. ai_safety_principles, ai_safety_faqs, ai_safety_certifications
5. **Hand to you**: a single file `/mnt/documents/live_backend_sync.sql` you paste into Lovable Cloud → Run SQL with the **Live** toggle on. Runs in one transaction.
6. **Verify** with the same count query against Live — every table should match Test.
7. **Refresh sitemap** by invoking the `generate-sitemap` edge function on Live so the 203 article URLs become discoverable.
8. **Spot-check** /blog, /conditions, /faces-of-arthritis, /diet, /donate, /governance on the live domain.

## Safety guarantees

- `INSERT … ON CONFLICT (id) DO UPDATE` everywhere — never `DELETE`, `TRUNCATE`, or `DROP`.
- No schema changes. No RLS or GRANT changes (Live structure is already correct).
- No edits to `src/integrations/supabase/*`, `.env`, or `supabase/config.toml`.
- No frontend code changes — the existing `useCmsContent`/`useBlogArticles` hooks already query the right tables; they return empty because Live has no rows.
- One transaction: if any row fails, nothing commits.
- Re-runnable: pasting the SQL twice produces the same end state.

## Technical notes

- I'll use `supabase--read_query` against Test to dump rows, then generate the SQL with a small node/duckdb script in `/tmp`. JSONB and array columns are serialized with proper escaping.
- Total payload is ~1.4 MB (mostly blog HTML). Cloud SQL editor handles it; if it complains, I'll split into two files (blog + everything else).
- After your paste, I run a single verification SELECT and confirm parity.

## Action required from you

Approve this plan. I'll generate the bundle and hand you the file + one-line instruction for the Cloud SQL editor. You paste, run, tell me it's done, and I verify.
