## Goal

Resolve the two Semrush Site Audit issues:
- **40 "incorrect pages"** in `public/sitemap.xml` (URLs that error, redirect, or render the in‑app NotFound page).
- **315 "orphaned pages"** (URLs reachable only via sitemap, with no internal links pointing to them).

Every URL in our sitemap currently maps to a React route definition, so the problem isn't bad route patterns — it's (a) programmatic combinations that render NotFound at runtime and (b) huge programmatic clusters with no nav links into them.

## What I'll do

### 1. Identify the real 40 broken URLs (no guessing)

Add `scripts/audit-sitemap.mjs` that:
- Parses every `<loc>` in `public/sitemap.xml` (844 URLs).
- Fetches each against the published domain `https://livingwitharthritis.org.uk` with a small concurrency pool.
- Flags any URL that:
  - returns non-2xx,
  - redirects to a different path,
  - returns 200 but the prerendered HTML contains the NotFound marker (e.g. `data-page="not-found"` / "Page not found" title).
- Writes `audit-sitemap-report.json` with the broken list.

Run it once, review the output, then remove the offending entries at their source in `scripts/generate-sitemap.ts` (e.g. drop a city×condition combo from `ukCities.ts`, an exercise×joint combo from `exerciseJointMatrix.ts`, or an ECR pair from the inline lists). Regenerate the sitemap.

This is the only way to fix the "40 incorrect" number truthfully — replacing 844 URLs with a guessed shortlist would delete real ranking pages.

### 2. De‑orphan the 315 programmatic pages

The orphans come from four clusters that have no inbound internal links:

| Cluster | Count | Generated in |
|---|---|---|
| `/arthritis-support/:city/:condition` | ~150 | `generate-sitemap.ts` (50 cities × 3 conds) |
| `/uk/:city/:service` | 104 | `city-services.ts` |
| `/exercises/:joint/for/:condition` | 78 | `exerciseConditionRecommendations.ts` |
| `/conditions/:condition/:subpage` | 52 | `conditionSubpages.ts` |

Fix by adding **hub index pages** that list every combination, plus contextual links from existing pillar pages:

- `/arthritis-support` city index → already lists cities; extend each city page to link its 3 condition sub-pages (component `CityConditionLinks`).
- `/uk` services hub at `/uk` (new lightweight index) linking all 104 city×service pages, grouped by service.
- On each `/exercises/:slug` and `/conditions/:condition` pillar, render the existing `ConditionSubpageLinks` / a new `ExerciseConditionLinks` to expose the joint×condition matrix.
- Add a "Related pages" block on each condition pillar linking its 4 sub-pages (`symptoms`, `treatment`, `exercises`, `diet`).

Every orphan ends up with at least one internal link from a parent hub, which is what Semrush wants.

### 3. Re-run audit + IndexNow

After the prune + hub links land:
- Regenerate `public/sitemap.xml` (the `predev`/`prebuild` hook already does this).
- Re-run `scripts/audit-sitemap.mjs` to confirm 0 broken URLs.
- Trigger the existing `supabase/functions/indexnow-ping` for the changed set.

## What I won't do without your say-so

- Won't swap mechanisms (generator stays; not migrating to the edge function `generate-sitemap`).
- Won't delete any blog/condition/exercise content pages — only prune sitemap entries for combinations the app genuinely doesn't render.
- Won't claim "40 → 0" until the audit script's report confirms it.

## Technical details

- `audit-sitemap.mjs`: Node 20, `fetch` with `Promise.allSettled` batches of 20, 10s timeout, follows redirects with `redirect: 'manual'` so we can detect them. NotFound detection reads first 4KB of HTML and checks for the prerendered `<title>404` / NotFound text used by the project's NotFound page.
- Hub components: pure presentational, `kebab-case` CSS classes, Tailwind, `Link` from `react-router-dom`, no new deps.
- `generate-sitemap.ts`: only edits are removing entries the audit proved are broken — no priority/changefreq churn.

## Open question

If you already have the Semrush Site Audit CSV/JSON export of the 40 errors and 315 orphans, drop it in and I'll skip step 1's crawl and act directly on that list — faster and authoritative. Otherwise the script does the same job from our side.
