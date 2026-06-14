## Goal
Remove all user-facing visitor counts from the website.

## Changes

1. **`src/components/landing/OAHero.tsx`** — delete the "2.3M+ website visitors trust our guides" stat block (lines 103–112).

2. **`src/components/landing/StatsBand.tsx`** — replace the live visitor-count "People supported" stat with a static figure (`12,000+`). Remove `useVisitorCount` import and usage.

3. **`src/hooks/useVisitorTracker.ts`** — delete the file (no remaining consumers after step 2).

4. **Database** — drop the `site_visitor_count` table and the `increment_visitor_count()` RPC via a migration. They were only used by the hook above.

## Out of scope
- GA4 / analytics — kept as-is (admin-only, not user-facing).
- All other stats on the site (87% pain reduction, 4,500 sessions, £0 cost, etc.).
- No styling/layout changes beyond removing the one hero stat block.