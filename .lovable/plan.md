## Daily SEO / AEO / GEO Refresh Pipeline

Goal: keep search engines (SEO), answer engines (AEO — ChatGPT, Perplexity, Google AI Overviews) and geo/local crawlers (GEO) seeing fresh, valid, well-structured signals from `livingwitharthritis.org.uk` every day — without manual intervention.

### 1. Scheduled trigger (pg_cron + edge function)

Create one cron job that fires every day at 03:00 UTC and invokes a new edge function `daily-seo-refresh`. Implemented via `pg_cron` + `pg_net` (per project conventions), with the anon key stored in the cron SQL — not in a migration.

### 2. What `daily-seo-refresh` does

The function runs four jobs in sequence and writes a single JSON report row to a new `seo_refresh_runs` table (date, status, counts, errors). Failures email `info@livingwitharthritis.org.uk` via the existing transactional email pipeline.

**a. Sitemap regeneration**
- Re-runs the logic in `scripts/generate-sitemap.ts` server-side: enumerates static routes + all `arthritisConditions` × `ukCities` + blog posts (DB) + daily tips.
- Writes the result to a `public.sitemap_cache` row and exposes it at `/sitemap.xml` through an edge route, so updates do not require a redeploy.
- Sets each `<lastmod>` to the row's true `updated_at` (blog posts, tips) or today's date for static index pages only when their underlying data changed.

**b. llms.txt + ai.txt refresh**
- Rebuilds `public/llms.txt` from the current sitemap so AEO crawlers (Perplexity, ChatGPT, Claude) always see the live URL set, top conditions, top cities, top blog posts.
- Re-emits `public/.well-known/ai.txt` with today's date in a `# Updated:` header — a small but real freshness signal for AI crawlers.

**c. JSON-LD + GEO validation sweep**
- Calls the existing `scripts/validate-jsonld.mjs` logic (ported into the function as a fetch-based check, no Puppeteer) against a rotating sample of 25 routes per day — covering every route over a ~2-week cycle.
- Verifies required fields per `@type`, and for city pages confirms `GeoCoordinates.latitude` / `longitude` are present and inside UK bounds.
- Failures are written into `seo_refresh_runs.errors` and the offending route is queued for re-prerender.

**d. PSI / Lighthouse ping**
- Reuses the existing `run-psi-audit` edge function for 5 priority URLs per day (home, /diet, /exercises, top blog, top city) so Core Web Vitals trend data accumulates daily instead of on-demand.

### 3. Daily content freshness signals (lightweight)

- A new `daily_tip_of_day` materialised view picks one tip per day deterministically from `dailyTips.ts` and is surfaced on `/` and `/daily-tip`, giving the homepage a true daily `dateModified`.
- The homepage `WebPage` JSON-LD `dateModified` is set from that view, not from build time.

### 4. Reporting surface

- New admin route `/admin/seo-health` (gated by existing `useAdmin` hook) shows the last 14 `seo_refresh_runs`: pass/fail counts, broken schema routes, sitemap size, PSI scores, AEO crawler hits (parsed from existing analytics where `source` ∈ ChatGPT / Perplexity / Google-Extended).
- One-click "Re-run now" button calls the same edge function ad hoc.

### 5. AEO-specific additions

- Add `X-Robots-Tag: all` and a small `# AI-Training: allow` echo in HTTP headers via `public/_headers` so Cloudflare-style CDNs forward the AEO signal we already declare in `ai.txt`.
- Inject a per-page `speakable` schema block on condition + city pages (boost for voice / answer engines).

### 6. Out of scope

- No redesign, no new public pages beyond `/daily-tip` and `/admin/seo-health`.
- No change to existing route components beyond reading `dateModified` from the new view.
- No new third-party SEO service — uses Lovable Cloud + pg_cron + existing scripts only.

### Technical summary

- New table: `public.seo_refresh_runs` (id, ran_at, ok, sitemap_count, schema_errors jsonb, psi_scores jsonb) + GRANTs + RLS (admin-only select).
- New table/view: `public.daily_tip_of_day`.
- New edge function: `supabase/functions/daily-seo-refresh/index.ts`.
- New edge route: `supabase/functions/serve-sitemap/index.ts` (returns cached XML).
- New cron job: `daily-seo-refresh @ 03:00 UTC`.
- New page: `src/pages/AdminSeoHealth.tsx`.
- Edited: `public/_headers`, `src/pages/Index.tsx` (read dateModified from view).

### Verification

- Manual first run of `daily-seo-refresh` writes a green row and the admin page renders it.
- `curl /sitemap.xml` returns freshly-dated XML matching DB state.
- `validate-jsonld` portion exits clean on the sampled routes.
- Cron job visible via `select * from cron.job`.
