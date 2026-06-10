# 12-Month Keyword Roadmap (30 → 5,000)

Status baseline (Jun 2026): 30 ranking keywords, ~2,123 90-day impressions, CTR 0.3%, avg position #45.

## Month 1 — Foundation & CTR (target: 50 keywords, 20 clicks/mo)
- Rewrite titles + meta for the 5 highest-impression URLs (Audit #6).
- Request re-indexing via GSC URL Inspection on those 5 URLs.
- Ship semantic + JSON-LD upgrades sitewide (already done in BlogPost.tsx).
- Connect Semrush; baseline competitor gap report vs versusarthritis.org, nhs.uk/conditions/arthritis, arthritis.org.

## Month 2-3 — Expand Top Performers (target: 150 keywords, 50 clicks/mo)
- Expand top 15 thin articles from <600 → 1000+ words.
- Add FAQ + HowTo schema to expanded pieces.
- Begin outreach for 10 high-DR UK health/charity backlinks.
- Internal-link audit: ensure every existing article links to its closest pillar.

## Month 4-6 — Pillar Build (target: 500 keywords, 120 clicks/mo)
- Publish 20 of the 40 pillar articles (1200-1500 words each, 70-80 keywords each).
- Priority order: Osteoarthritis, Rheumatoid Arthritis, Anti-Inflammatory Diet, Falls Prevention, Musculoskeletal Anatomy.
- Each pillar ships with hero image, 3+ internal links down to clusters, JSON-LD MedicalWebPage + Article schema.
- Continue weekly backlink outreach (target: 5-10/month, DR30+).

## Month 7-12 — Cluster Scale (target: 5,000 keywords, 500+ clicks/mo)
- Publish remaining 20 pillars + all 260 cluster articles (400-600 words each, 5-10 keywords each).
- Cadence: ~45 articles/month.
- Each cluster links UP to its pillar (mandatory).
- Monthly rank tracker review (`/admin/rank-tracker`) — move any page-2 keyword (#11-20) to top of refresh queue.

## KPI Trajectory

| Metric          | Now    | M1     | M3     | M6     | M12    |
|-----------------|--------|--------|--------|--------|--------|
| Keywords        | 30     | 50     | 150    | 500    | 5,000  |
| Clicks/month    | 7      | 20     | 50     | 120    | 500+   |
| CTR             | 0.3%   | 1%     | 2%     | 2.5%   | 3%+    |
| Avg position    | #45    | #32    | #25    | #20    | #15    |
| Authority (DR)  | 0      | 2      | 5      | 8      | 12-15  |
| Indexed pages   | ~120   | ~125   | ~150   | ~250   | ~420   |

## Risks & Mitigations
- **Indexation lag** (2-6 wks on low-DR domains) → submit sitemaps weekly, ping IndexNow on every publish.
- **Thin pillar penalty** → enforce 1200-word minimum before publish gate.
- **Cannibalization** → keyword-content-map.json is the single source of truth; one primary keyword = one URL.
