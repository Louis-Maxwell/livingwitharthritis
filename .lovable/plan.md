## Goal
Two deliverables, both verifying Live without touching app code:
1. An automated backend integrity check that asserts the content sync didn't break the site (row counts, required NOT NULL columns, FK validity, enum/constraint sanity, RLS reachability).
2. A sitemap regeneration on Live, plus an external HTTP check that confirms it serves a valid 200 with parseable XML.

No schema changes. No frontend changes. Read-only and an idempotent edge-function invocation.

## Part 1 — Integrity check

A single SQL script `/mnt/documents/live_integrity_check.sql` (also runnable from the sandbox against Test for parity) that prints one row per check with `PASS` / `FAIL` + a count. Categories:

**A. Row-count parity (Live vs Test expectations)**
- `blog_articles` ≥ 203 published
- `services`, `conditions`, `arthritis_types`, `physio_myths`, `donation_tiers`, `fundraising_options`, `nutrition_sections`, `about_us_sections`, `face_stories`, `faces_trust_facts`, `featured_stories`, `journey_chapters`, `joint_exercises`, `ai_safety_principles`, `ai_safety_faqs`, `ai_safety_certifications`, `statistics` each ≥ Test count
- `healthy_living_resources` = 21 (no regression)

**B. NOT NULL / required-field checks** (these are what actually break pages):
- `blog_articles`: `slug`, `title`, `content`, `category`, `date` all non-null; `is_published` not null; no duplicate `slug`
- `conditions`, `services`, `arthritis_types`: `title`, `description` non-null
- `donation_tiers`: `amount`, `benefits` non-null and `array_length(benefits,1) > 0`
- `nutrition_sections`: `title`, `content`, `foods` non-null
- `face_stories` / `featured_stories`: `name`/`title` non-null
- `joint_exercises`: `title`, `joint` non-null

**C. Referential / logical integrity**
- No `blog_articles.slug` in `BLOG_SLUG_REDIRECTS` keys (would shadow a redirect) — check against a static list of legacy slugs
- `category` values on `blog_articles` are within the known set used by Condition pages (warn-only; reports unknown categories so we can spot typos)
- `blog_views.slug` orphans → warn-only count of view rows pointing to slugs that no longer exist
- `user_roles` table reachable (smoke test for `has_role` security-definer)

**D. RLS smoke (PostgREST reachability)**
- Anonymous `select count(*)` via the anon REST endpoint for: `blog_articles?is_published=eq.true`, `services?is_active=eq.true`, `conditions?is_active=eq.true`. If any returns 401/permission denied, the GRANT/RLS is wrong on Live. Run from the sandbox using the published anon key.

**E. Output**
Single SQL emits a results table; sandbox script writes a Markdown report to `/mnt/documents/live_integrity_report.md` with one line per check, totals, and overall verdict `READY ✅` / `BLOCKED ❌`. The script exits non-zero on any FAIL so it's CI-friendly later.

## Part 2 — Sitemap refresh + verification

1. Invoke `generate-sitemap` edge function on **Live** (already deployed; `verify_jwt = false`). Capture status and the row written to `sitemap_cache`.
2. Verify `sitemap_cache` on Live: `xml IS NOT NULL`, `length(xml) > 5000`, `updated_at` within the last 60 seconds.
3. External HTTP probes:
   - `GET https://livingwitharthritis.org.uk/sitemap.xml` → expect `200`, `Content-Type: application/xml`, `<urlset` in body, URL count > 200.
   - `GET https://livingwitharthritis.org.uk/robots.txt` → expect `200` and a `Sitemap:` line.
4. Parse the XML, count `<loc>` entries, sample three random URLs and `HEAD` them — expect 200/301 (not 404/500).
5. Write `/mnt/documents/sitemap_verification.md` with: URL count, last-modified, sample HEAD results, pass/fail.

## Execution order (build mode)

1. Run integrity SQL against **Live** via `supabase--read_query` (env=production); persist the report.
2. If Part 1 verdict = BLOCKED, stop and report. Don't refresh sitemap on a broken state.
3. Invoke `generate-sitemap` on Live (sandbox `curl` to the function URL with the anon key, since `verify_jwt=false`).
4. Run external HTTP probes; write sitemap report.
5. Reply with both reports inline + artifact links.

## What I will NOT touch

- No migrations, no `ALTER`, no inserts/updates to fix gaps — this loop only **reports**. If a check fails, I'll surface it and propose a separate fix.
- No edits to `src/integrations/supabase/*`, `.env`, `supabase/config.toml`, edge function code, or hooks.
- No changes to `public/sitemap.xml` (the static fallback) — the live sitemap is served by the `generate-sitemap` / `serve-sitemap` flow and `sitemap_cache`.

## Deliverables

- `/mnt/documents/live_integrity_check.sql` — the runnable script.
- `/mnt/documents/live_integrity_report.md` — pass/fail per check.
- `/mnt/documents/sitemap_verification.md` — sitemap status + sample probes.
- Inline summary in chat with the headline verdict.

Approve and I'll execute.