## Phase 2–4: Programmatic SEO + Rank Tracking + Auto-Freshness

Building on Phase 1 (Distribute + IndexNow), this plan ships the remaining three phases of the Traffic Growth Plan.

---

### Phase 2 — Programmatic City × Condition Pages

Generate a large set of unique, indexable long-tail pages combining UK cities × arthritis conditions. These target high-intent local searches ("rheumatoid arthritis support in Manchester") with low competition.

**Scope**
- Source data: `src/data/ukCities.ts` (top ~25 UK cities) × `src/data/arthritisConditions.ts` (3 conditions) = ~75 pages, plus 25 city-only pages = **~100 programmatic pages**
- Route: `/support/:city/:condition` and `/support/:city`
- Each page includes: H1, local intro, condition overview, UK prevalence stat, NHS pathway summary, FAQs (5 per page), CTA to self-help tool + contact, internal links to 3 related city pages and pillar guides
- Full JSON-LD: `MedicalWebPage` + `FAQPage` + `BreadcrumbList` + `Place` (city)
- Unique meta title/description per page (template-driven, not duplicate)

**Files**
- `src/pages/programmatic/CityConditionSupportPage.tsx` (new — replaces/extends existing `CityConditionPage.tsx` if needed)
- `src/lib/programmaticContent.ts` (new — generates unique copy blocks per city/condition combo)
- `src/App.tsx` — add routes
- `scripts/generate-sitemap.ts` — loop cities × conditions and append entries
- `src/components/seo/InternalLinkBlock.tsx` (new — auto-renders 3–5 contextual links per page)

---

### Phase 3 — Rank Tracking + SEO Health (Semrush)

Pulls weekly rank data into the DB, surfaces "almost ranking" pages (positions 11–20) for priority refresh, and shows trends in admin.

**Scope**
- New DB tables: `rank_history` (keyword, position, url, captured_at), `tracked_keywords` (keyword, target_url, market)
- Edge function `seo-rank-sync/` — calls Semrush via existing connector pattern, upserts into `rank_history`
- Weekly cron (pg_cron + pg_net) triggering the sync
- Admin page `/admin/rank-tracker` — table of tracked keywords with current position, 7-day delta, target URL, sparkline; filter to "11–20 opportunities"
- Seed `tracked_keywords` with ~30 priority keywords drawn from existing pillar pages

**Note**: Requires the Semrush connector to be linked. The plan includes triggering the connect modal as the first build step.

---

### Phase 4 — Daily Content Freshness Loop

Keeps `lastmod` fresh, auto-pings IndexNow on changes, and queues 1 article/day for AI-assisted intro refresh (with admin review — never blind publish).

**Scope**
- New DB table: `content_refresh_queue` (slug, status: pending/approved/rejected, original_intro, ai_rewritten_intro, queued_at, reviewed_at)
- Edge function `daily-content-freshness/` — picks 1 stale article (oldest `updated_at`), calls Lovable AI (`google/gemini-2.5-flash`) to rewrite intro only, stores in queue
- Daily cron at 06:00 UTC
- Admin page `/admin/content-refresh` — side-by-side diff (original vs AI draft), Approve/Reject buttons; on approve, updates article + bumps sitemap `lastmod` + pings IndexNow
- Auto-bump `lastmod` in sitemap.xml for any article updated in last 24h (regenerated daily via existing `generate-sitemap.ts`)

---

### Technical summary

```text
NEW EDGE FUNCTIONS
  supabase/functions/seo-rank-sync/index.ts
  supabase/functions/daily-content-freshness/index.ts

NEW PAGES
  src/pages/programmatic/CityConditionSupportPage.tsx
  src/pages/AdminRankTracker.tsx
  src/pages/AdminContentRefresh.tsx

NEW LIB / COMPONENTS
  src/lib/programmaticContent.ts
  src/components/seo/InternalLinkBlock.tsx

DB MIGRATIONS
  - rank_history, tracked_keywords (Phase 3)
  - content_refresh_queue (Phase 4)
  - Two pg_cron jobs (weekly Semrush sync, daily freshness) via insert tool

UPDATED FILES
  src/App.tsx (4 new routes)
  scripts/generate-sitemap.ts (~100 new entries)
```

**Order of build:** Phase 2 first (immediate SEO surface area), then Phase 4 (daily loop, no external dependency), then Phase 3 last (requires Semrush connector).

---

### Two confirmations needed before I build

1. **Semrush connector** — Phase 3 needs it. OK to trigger the connect modal when we get there?
2. **AI-rewritten intros** — Phase 4 sends to a review queue (never auto-publishes). Confirm that's acceptable, or do you want me to skip the AI-rewrite piece and only do `lastmod` bumps?