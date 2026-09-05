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
- `getArticleImages(...)[0]` (category buckets — ~50 files shared across 500+ posts)
- Remote Unsplash / Lovable CDN URLs

`getArticleImages()` is only for **in-article body gallery** images, which may
share within a category.

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

1. Ensure new slugs are in `src/data/blog-slugs.generated.json`.
2. Regenerate the 1:1 map and download any missing webps:

   ```bash
   python3 scripts/download-unique-openverse-covers.py
   ```

3. Run the CI guard:

   ```bash
   bun test src/lib/__tests__/articleImages.unique-covers.test.ts
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
