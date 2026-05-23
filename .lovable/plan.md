## Fix orphaned sitemap pages

Several routes listed in `public/sitemap.xml` are not linked from anywhere in the rendered site, so Semrush flags them as orphans. The fix is to add internal links from the most relevant hub pages (and the HTML `/sitemap` page) so every URL in the XML sitemap is reachable in at most 2 clicks.

### Orphan groups identified

| Group | URLs | Currently linked from |
|---|---|---|
| Exercise × Joint matrix (`/exercises/{type}-for-{joint}-arthritis`) | 48 | Only from each other / `ExercisePlanGenerator` tool |
| City × Condition (`/arthritis-support/{city}/{condition}`) | 150 | Only from each city page (deep — 3 clicks) |
| Daily Tips (`/daily-tips/{slug}`) | 9 | Only from `DailyTipDetail` (self-referencing) |
| Pillar guides (`/guides/*`) | 5 | Already in HTML sitemap, but no hub links |
| Region hubs (`/regions/*`) | 4 | Only nav (verify) |

### Changes

1. **`src/pages/ExerciseHub.tsx`** — Add a new "Exercises by joint" section that links to all 48 matrix pages, grouped by joint (Knee, Hip, Shoulder, Hand, Back, Ankle). Source the list from `src/data/exerciseJointMatrix.ts`. Compact link grid, institutional styling.

2. **`src/pages/CommunityHub.tsx`** (or `SelfHelpTool.tsx` if more topical) — Add a "Daily tips" section linking to all 9 daily tip slugs with short descriptions from `src/data/dailyTips.ts`.

3. **`src/pages/ArthritisSupportIndex.tsx`** — Under each city card (or in an expandable section), surface the 3 condition sub-pages so the 150 city×condition URLs are 2 clicks from `/arthritis-support`, not 3.

4. **`src/pages/Sitemap.tsx`** — Expand the HTML sitemap to include:
   - All 48 exercise×joint matrix pages (collapsible "All exercises by joint" section)
   - All 9 daily tips
   - All 4 region hubs
   - All 5 pillar guides (verify already present)
   This guarantees every XML sitemap URL has at least one static internal link.

5. **`src/pages/DailyTipDetail.tsx`** — Already links siblings; no change needed (covered once #2 lands).

### Out of scope

- The two open Lighthouse findings (slow LCP, low-contrast text) — keep as separate work unless you want them bundled.
- Removing URLs from sitemap.xml (the user wants the pages to stay indexable, just better linked).

### Verification

- Run `scripts/audit-word-count.ts` style sweep mentally: every sitemap entry must appear as a `to=`/`href=` in at least one non-self page.
- After deploy, request Semrush rescan.