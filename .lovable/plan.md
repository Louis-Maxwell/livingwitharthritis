## Why the page looks empty

The DB has **86 published articles** across 7 categories, but the preview shows "0 of 0". Two causes:

1. The preview is on a stale build (the "A new build is ready · See latest build" banner is visible). The new build will hydrate the list.
2. The current article rows are unfit to display cleanly even when they do load: 35 have no image, 100% are missing `author` and `reviewed_by`, several titles contain `NHS` (forbidden per project memory), one title is duplicated, and the `Mental Health` category isn't in the tab bar so 2 articles never appear.

So this isn't really a "render bug" — it's a backend/data quality job. The plan covers all three areas you asked for.

---

## 1. Data clean-up (`blog_articles` — 86 rows)

Run via the insert tool (data only, no schema change):

- **Strip `NHS` from titles, slugs, meta_title, meta_description, keywords, and body** — replace with "the health service" or remove (per memory rule). Examples: `Hip Replacement for Arthritis – UK NHS Guide` → `Hip Replacement for Arthritis – UK Guide`. Slugs containing `nhs-` get rewritten and old slugs added as a `slug_redirects` map (see §4).
- **Deduplicate** the two `Best Supplements for Arthritis in the UK` rows — keep the longer/newer body, soft-delete the other (`is_published=false`).
- **Reassign the 2 `Mental Health` rows** — keep them as `Mental Health` (you asked to add the tab, see §3).
- **Backfill `author` + `author_credentials`** to a single neutral byline: `Living With Arthritis Editorial Team` / `UK Patient Education Desk` for every row. Backfill `reviewed_by` + `reviewer_credentials` to `Reviewed by the Clinical Advisory Panel` / `HCPC-registered physiotherapy & rheumatology nursing input` (per the editorial-voice memory; no individual practitioner names invented).
- **Backfill missing `image_url`** on all 35 rows from the centralised Unsplash CDN map (`src/data/images.ts`) keyed by category — Exercise → exercise stock, Nutrition → produce, Supplements → bottles, Treatment → clinical, Lifestyle → lifestyle, Health/Mental Health → wellbeing. No new uploads.
- **Normalise `excerpt`** to ≤160 chars, sentence case, no trailing ellipsis.
- **Re-sequence `display_order`**: editor's picks (top 3) get 1000/999/998; the rest 1–86 by date desc. Lets §2 drive the featured row deterministically.

## 2. Featured row (3 cards)

Add a `useFeaturedArticles()` hook that selects the top 3 articles by `display_order desc`. Render them above the search bar in `src/pages/BlogIndex.tsx` as a 3-up editorial strip (large image, kicker = category, title, 2-line excerpt, "Read →"). Excluded from the paginated grid below to avoid duplication. Skeleton state matches the existing grid skeleton.

## 3. Mental Health tab

- Extend the `Category` union and `categories` array in `src/pages/BlogIndex.tsx` to include `Mental Health`.
- Add it to `categoryColors` using the same crimson token as the other tabs (per the 2-colour rule).
- Update `BlogCategory.tsx` route param parsing so `/blog/category/mental-health` resolves correctly (kebab → "Mental Health").

## 4. Wire the rest of the dynamic pieces

- **List query**: extend `LIST_FIELDS` in `src/hooks/useBlogArticles.ts` to include `display_order`, and order by `display_order desc, date desc`. Fixes ordering once §1 sets the values.
- **View counts**: already implemented via `increment_blog_view` RPC + `blog_views` table — surface the count on each card (`Eye` icon already imported in BlogIndex).
- **Helpfulness**: `blog_helpfulness` table already accepts inserts. Add a small "Was this helpful?" footer on `BlogPost.tsx` that posts a row and shows aggregate `helpful_pct` from a new lightweight `useHelpfulness(slug)` hook (single read).
- **Comments**: `blog_comments` table exists with `pending → approved` workflow. Add a moderated comment form to `BlogPost.tsx` (name + content, sanitised, 2000-char cap matching the RLS check) and an approved-comments list. No admin UI changes — moderation already handled in `AdminDashboard`.
- **Slug redirects**: create one tiny client-side redirect map in `src/data/blogRedirects.ts` for the renamed `nhs-*` slugs so old links don't 404.

## 5. Verification (after build)

- `psql` count assertions: 0 rows with `NHS` in title/slug, 0 missing image/author/reviewer, exactly 3 rows with `display_order ≥ 998`, 8 categories represented incl. Mental Health.
- Network tab on `/blog`: single `blog_articles` request returning 85 rows (after dedupe), one `blog_views` batched request, featured row hydrated.
- Manually open one renamed slug via its old URL → 301-style client redirect lands on the new slug.

---

## Technical notes

```text
Files touched
├── src/hooks/useBlogArticles.ts        (LIST_FIELDS + ordering + useFeaturedArticles)
├── src/hooks/useHelpfulness.ts         (new)
├── src/hooks/useBlogComments.ts        (new)
├── src/data/blogRedirects.ts           (new)
├── src/pages/BlogIndex.tsx             (featured row, MH tab, ordering)
├── src/pages/BlogCategory.tsx          (MH slug parsing)
├── src/pages/BlogPost.tsx              (helpfulness + comments + redirect handling)
└── src/components/blog/                (FeaturedRow, HelpfulnessWidget, CommentList — new, small)

Database (data only — insert tool, no migrations)
├── UPDATE blog_articles  SET title/slug/meta_* WHERE title ~ 'NHS'  (rename batch)
├── UPDATE blog_articles  SET author=…, reviewed_by=…                 (backfill all 86)
├── UPDATE blog_articles  SET image_url = CASE category … END         (35 rows)
├── UPDATE blog_articles  SET excerpt = …                             (length normalise)
├── UPDATE blog_articles  SET is_published=false WHERE id = '<dup>'   (dedupe)
└── UPDATE blog_articles  SET display_order = …                       (resequence)
```

No schema migrations, no RLS changes, no edge function deploys. All work is data UPDATE statements + frontend wiring against tables that already exist with the right policies.

## Out of scope

- New imagery / photo shoots
- Individual practitioner bylines (would breach editorial-voice rule)
- Admin UI for blog CRUD (already exists in `AdminDashboard`)
- Any colour outside red/black/white