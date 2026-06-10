# Keyword Strategy (5,000 Keywords)

## Files
- `src/data/keyword-taxonomy.json` — 4 categories → clusters → head keywords
- `src/data/keyword-content-map.json` — 40 pillars + 260 clusters mapping
- `src/data/keyword-roadmap-12-month.md` — month-by-month plan
- `src/lib/keyword-clustering.ts` — expansion + cluster lookup utilities
- `src/hooks/useKeywordData.ts` — read-only React hook
- `src/components/KeywordTargeting.tsx` — editorial widget
- `src/types/keyword.ts` — TypeScript types

## Organization
4 top-level categories:
1. **Musculoskeletal Health** (1,200 kw) — anatomy, joint conditions, back/spine, muscle recovery
2. **Preventative Health** (1,000 kw) — nutrition, weight, sleep/stress, supplements
3. **Arthritis Health** (1,200 kw) — OA, RA, other types, daily living
4. **Frailty Management** (300 kw) — falls, sarcopenia, care pathways
+ long-tail expansion (~1,300 kw) generated programmatically.

## Keyword → Article Mapping
- **40 Pillar articles** — 1200-1500 words, 70-80 keywords each, hub-and-spoke source.
- **260 Cluster articles** — 400-600 words, 5-10 keywords each, link UP to one pillar.
- Single source of truth: `keyword-content-map.json`. One primary keyword = one URL (no cannibalization).

## Adding New Keywords
1. Find the right category + cluster in `keyword-taxonomy.json`.
2. Add the head keyword to the cluster's `keywords[]`.
3. If it warrants its own page, add an entry to `keyword-content-map.json` (`clusters_sample[]` or `pillars[]`).
4. Bump the category `keywords` count and the top-level `total_keywords`.

## Tracking Rankings
- `/admin/rank-tracker` reads from `tracked_keywords` + `rank_history` (see `AdminRankTracker.tsx`).
- Weekly Semrush sync via the `seo-rank-sync` edge function.
- Page-2 keywords (#11-20) get auto-flagged for refresh priority.

## Internal Linking Rules
Defined in `keyword-content-map.json → internal_linking_rules`. Enforced manually at PR review.
