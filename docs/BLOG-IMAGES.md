# Blog cover images (Openverse 1:1 map)

## Single durable path

Listing cards, Editor’s Picks, Related articles, OG/JSON-LD covers, and
condition-page blog strips **must** resolve covers through:

```ts
import { coverImage } from "@/lib/articleImages";
coverImage(category, title, slug).src  // → /openverse/<unique-file>.webp
```

That helper reads `src/data/blog-cover-map.generated.json` (slug → bare
filename). Every published slug has exactly one unique webp under
`public/openverse/`.

**Do not** use for blog listing covers:

- `article.image_url` (often `null` on batch posts, or shared category paths)
- `getArticleImages(...)` body picks for listing cards (listings must stay on `coverImage` only)
- Remote Unsplash / Lovable CDN URLs

`getArticleImages()` builds the **in-article** set: unique cover at `[0]`, then
zero–two topic-matched Openverse files. It must not force category buckets
(especially nutrition/fruit) onto unrelated posts.

## Why images “keep breaking”

Historically two systems competed:

1. Unique Openverse map (`coverImage` + `blog-cover-map.generated.json`)
2. Category-bucket / `image_url` fallbacks in `ConditionBlogStrip`, `LatestGrid`,
   and an old `coverImage` fallback

When Lovable (or a batch import) added blogs without regenerating the map, or
when a component preferred `image_url`, cards collapsed back to the shared
pool and looked identical / “broken” again after each fix.

Live `/blog` HTML is an SPA shell (publish build skips full prerender), so
covers appear after JS hydrates — empty first paint is expected, not a missing
file. Sample `/openverse/*.webp` URLs should return HTTP 200.

## After adding blogs

Each guide names its own cover in `src/content/blog/posts/<slug>.json`
(`"cover": "<file>.webp"`, file in `public/openverse/`). The cover map
`src/data/blog-cover-map.generated.json` is generated from those fields by
`bun scripts/generate-blog-catalog.ts` — never edit the map by hand.
See `docs/ADDING-A-BLOG-GUIDE.md`.

1. Ensure new slugs are in `src/data/blog-slugs.generated.json` (`npm run build` or `npm run sitemap`).
2. Only if you need to re-shuffle every cover from Openverse (rare — this rewrites
   every guide's `cover`), regenerate and download any missing webps:

   ```bash
   python3 scripts/download-unique-openverse-covers.py
   ```

3. Run the CI guard:

   ```bash
   bun test src/lib/__tests__/articleImages.unique-covers.test.ts src/lib/__tests__/articleImages.topic-match.test.ts
   ```

4. Commit map + new `public/openverse/*.webp` files together.
5. **Publish/deploy from this GitHub `main`** (Lovable publish of the synced
   repo). Do not overwrite `blog-cover-map.generated.json` with a Lovable
   stub or delete `public/openverse` covers during a Lovable “Changes” push
   unless the script regenerated them in the same commit.

## Do not

- Overwrite the cover map from Lovable without running the script above.
- Point cards at missing files or a single shared default for all posts.
- Re-introduce `image_url || getArticleImages(...)` on listing UIs.

## In-article figures (topic-matched)

`BlogPost` uses **`coverImage()` for the hero** and **`getArticleImages(...).slice(1)`**
for optional mid/end figures.

`getArticleImages()`:

1. Always returns the unique mapped cover as `[0]`.
2. Adds at most two further Openverse files from the curated
   arthritis / community / wellness / nutrition pools whose **filenames
   overlap** the post title, category, slug, or keywords.
3. **Never** selects nutrition/fruit stock unless the post is a diet/nutrition
   topic (lone “supplement” on a medication page does **not** count).
4. Prefers **fewer related figures** over padding with unrelated category
   stock (the old fruit-on-treatment bug).

Listing UIs must still use `coverImage` only — never body gallery picks.


## Share preview / crawler meta

For og:image, static HTML titles, image_url alignment, and the merge checklist, see BLOG-IMAGE-SHARE-GUARDRAILS.md. Run seo:blog-guards before publish.
