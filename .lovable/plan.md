## Goal

Connect the Blog & Stories content to each Condition page (Osteoarthritis, Rheumatoid, Psoriatic, Gout, Ankylosing Spondylitis, Juvenile, Fibromyalgia, Lupus) so visitors reading about a condition see live, curated articles drawn from the blog database — not the current hardcoded link lists.

## What changes

### 1. New shared component: `ConditionBlogStrip`
Path: `src/components/ConditionBlogStrip.tsx`

A self-contained section that renders:
- Section header: "Advice & Guidance" with eyebrow "Blog & Stories"
- **Row 1** — 3 Editor's Picks (uses existing `useFeaturedArticles(3)` hook)
- **Row 2** — 4 most recent published articles, optionally filtered to the condition's primary categories (e.g. OA → Exercise + Nutrition + Treatment) so cards stay topical
- "View all advice & guidance" CTA → `/blog`
- Skeleton loaders while fetching, graceful empty state
- Crimson/white institutional styling per design memory (no Framer Motion routing, semantic tokens only)

Props:
```ts
interface ConditionBlogStripProps {
  conditionLabel: string;            // e.g. "osteoarthritis"
  matchCategories?: string[];        // optional category filter for the recent row
}
```

### 2. New hook: `useConditionArticles`
Add to `src/hooks/useBlogArticles.ts`:
- Accepts `categories: string[]` and `limit` (default 4)
- Selects `LIST_FIELDS`, `is_published = true`, `category in (…)`, ordered by `date desc`
- Falls back to latest published if no categories provided

### 3. Wire into all 8 Condition pages
Replace each existing hardcoded "Related Articles" list block with `<ConditionBlogStrip … />`, passing per-condition category mapping:

| Page | matchCategories |
|---|---|
| Osteoarthritis | Exercise, Nutrition, Treatment |
| Rheumatoid Arthritis | Treatment, Health, Lifestyle |
| Psoriatic Arthritis | Treatment, Lifestyle |
| Gout | Nutrition, Lifestyle |
| Ankylosing Spondylitis | Exercise, Treatment |
| Juvenile Arthritis | Health, Lifestyle |
| Fibromyalgia | Mental Health, Lifestyle |
| Lupus | Health, Treatment |

The existing `ContextualLinks` block below stays — it serves a different SEO purpose.

### 4. Keep `BlogIndex` (`/blog`) as the canonical destination
The CTA on every condition page links to `/blog`, reinforcing it as the central Advice & Guidance hub.

## Out of scope
- No DB schema changes (uses existing `blog_articles` table + RLS).
- No homepage changes.
- No changes to `RelatedArticles` (article-to-article component).
- No new routes.

## Files touched
- **new** `src/components/ConditionBlogStrip.tsx`
- **edit** `src/hooks/useBlogArticles.ts` (add `useConditionArticles`)
- **edit** all 8 files in `src/pages/conditions/`

## Verification
- Load `/conditions/osteoarthritis` → see featured + recent OA-relevant articles
- Each card links to `/blog/<slug>` and renders correctly
- No regressions in `BlogIndex` or `BlogPost`
