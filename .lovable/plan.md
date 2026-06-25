# Automatic "Related Articles" by Content Cluster

Upgrade the existing `RelatedArticles` component to recommend posts using **content clusters** (knee OA, frailty, flare-ups, diet, exercise, etc.) instead of the current single-category match. Cluster definitions reuse the keyword taxonomy already in `src/data/keyword-taxonomy.json` / `keyword-content-map.json`, so there is no new content store to maintain.

## What changes

1. **New cluster map** — `src/lib/relatedClusters.ts`
   - Defines 8 user-facing clusters with keyword triggers and curated "best supporting page" URLs:
     - Knee OA, Hip OA, Rheumatoid Arthritis, Flare-ups, Diet & Nutrition, Exercise & Movement, Frailty & Falls, Supplements
   - Helpers: `getClustersForText(title, excerpt, category, keywords)` and `scoreArticleForClusters(article, clusters)`.

2. **Hook upgrade** — `src/hooks/useBlogArticles.ts`
   - Replace `useRelatedArticles` body with a cluster-scored query:
     1. Detect clusters of the current post from its title/excerpt/category/keywords.
     2. Fetch a candidate pool (≈ 30 latest published articles, list fields + keywords).
     3. Score each candidate by cluster overlap (+3 per shared cluster), same category (+1), recency tiebreak.
     4. Return top 3, excluding `currentSlug`.
   - Falls back to current category-based logic when no clusters match.

3. **Component upgrade** — `src/components/RelatedArticles.tsx`
   - Accepts optional `currentCategory`, `currentTitle`, `currentExcerpt`, `currentKeywords` so condition pages can use it without a blog slug.
   - Renders the detected cluster as the eyebrow chip ("Knee OA", "Flare-ups", …) instead of the raw DB category, and adds a final **"Best supporting guide"** card that links to the curated pillar page for the top cluster (from `relatedClusters.ts`).

4. **Wider surfacing**
   - `src/pages/BlogPost.tsx` (line 359): pass the new props from `post`.
   - Add `<RelatedArticles … />` to condition pages that don't yet have it: `Osteoarthritis.tsx`, `RheumatoidArthritis.tsx`, `PsoriaticArthritis.tsx`, seeded with a hard-coded cluster (e.g. `clusters={["knee-oa","flare-ups"]}`).

## Out of scope

- No DB schema changes; no new `tags` column. Cluster detection is purely client-side from existing fields.
- No edits to `keyword-taxonomy.json` / `keyword-content-map.json`.
- No design overhaul of the card grid — same look as today, just smarter selection + cluster eyebrow.

## Technical notes

- Cluster triggers are simple lowercase substring/keyword arrays so they stay editable in one file.
- Curated "best supporting page" map points at existing routes only (`/conditions/osteoarthritis/knee`, `/exercises`, `/diet`, `/guides/uk-arthritis`, etc.) — no new pages created.
- Candidate pool kept at 30 to keep one Supabase round-trip; scoring runs in memory.
