# Adding a new blog guide

Every guide lives in **one file**: `src/content/blog/posts/<slug>.json`.
That file is the single source of truth for the article body, its metadata,
its cover image and its citations. Nothing else needs hand-editing — the
listing index, cover map, content stats, head data (titles/OG for crawlers),
`blog-slugs.generated.json`, sitemap, prerender routes, `llms-full.txt` and the
search index are all generated from it during `npm run build` (and `npm run dev`).

## The single edit

1. **Create `src/content/blog/posts/<slug>.json`.** The file name must equal the
   `slug` (lowercase, kebab-case). Copy an existing guide as a template:

   ```json
   {
     "slug": "my-new-guide-uk",
     "title": "My New Guide: What Helps (UK)",
     "meta_title": "My New Guide: What Helps",
     "meta_description": "120–165 characters describing the guide for search results.",
     "excerpt": "At least 100 characters. Shown on cards and used as the fallback description.",
     "direct_answer": "One or two sentences that answer the headline question, or null.",
     "date": "2026-09-25",
     "updated_at": "2026-09-25T09:00:00.000Z",
     "category": "Exercise",
     "cover": "lwa-my-new-guide-uk.webp",
     "author": "Louis Maxwell",
     "author_credentials": "First Contact Practitioner, HCPC PH128483",
     "reviewed_by": "Louis Maxwell",
     "reviewer_credentials": "First Contact Practitioner, HCPC PH128483",
     "keywords": "comma, separated, keywords",
     "display_order": 0,
     "is_published": true,
     "citations": [
       { "label": "NHS — Arthritis", "url": "https://www.nhs.uk/conditions/arthritis/", "publisher": "NHS" }
     ],
     "content": "<p>The article body as HTML (Markdown also works)…</p>"
   }
   ```

   Field rules (enforced by `src/lib/blog/schema.ts`):

   | Field | Rule |
   | --- | --- |
   | `slug` | kebab-case, unique, equals the file name |
   | `title` | required, unique across all guides |
   | `meta_description` / `excerpt` | description ≥ 50 chars; excerpt ≥ 100 chars |
   | `date` | `YYYY-MM-DD` publish date |
   | `updated_at` | ISO 8601 timestamp |
   | `last_reviewed` | optional `YYYY-MM-DD`; when omitted the site shows `updated_at` as the review date |
   | `category` | must map to a topic in `src/data/blogCategories.ts` (e.g. Exercise, Nutrition, Health, Treatment…) |
   | `cover` | a file in `public/openverse/`, not used by any other guide |
   | `content` | real body, ≥ 200 characters |
   | `citations` | optional; absolute `http(s)` URLs only |

   Only publish real, clinically reviewed content — no invented statistics.

   If the cover image is new, add it to `public/openverse/` in the same commit.

2. **Check it** (optional locally — CI runs the same checks):

   ```bash
   npm run blog:catalog      # validates every guide, regenerates the listing index
   npm run build             # regenerates head data, slugs, sitemap, prerender list
   npx vitest run src/lib/__tests__/blog-catalog-integrity.test.ts
   node scripts/sync-host-redirects.mjs   # adds the bare /<slug> → /blog/<slug> rule to public/_redirects
   ```

3. **Commit** the new post file together with the regenerated files the build
   touched (`src/content/blog/catalog.generated.json`,
   `src/data/blog-cover-map.generated.json`, `src/data/contentStats.generated.json`,
   `scripts/blog-head-data.json`, `src/data/blog-slugs.generated.json`,
   `public/sitemap.xml`, `public/llms-full.txt`, `public/_redirects`), open a PR, merge when green.

## Editing, renaming or removing a guide

- **Edit:** change the post file, bump `updated_at` (and `last_reviewed` after a
  clinical review), rebuild, commit.
- **Rename a slug:** never delete the old URL. Rename the file/slug, then add
  `"old-slug": "new-slug"` to `src/data/blogRedirects.ts` so the old link keeps working.
  The integrity test fails if a redirect points at a missing guide or shadows a live one.
- **Unpublish:** set `"is_published": false` (the file stays for history) and add a
  redirect to the closest live guide.

## How it fits together

```
src/content/blog/posts/<slug>.json      ← the only thing you edit
        │  bun scripts/generate-blog-catalog.ts  (zod validation)
        ├─► src/content/blog/catalog.generated.json   metadata-only index for listings
        ├─► src/data/blog-cover-map.generated.json    slug → cover (articleImages.ts)
        └─► src/data/contentStats.generated.json      count + word counts
        │  node scripts/generate-blog-head-data.mjs
        └─► scripts/blog-head-data.json                crawler titles/OG + embedded body
        │  bun scripts/generate-sitemap.ts
        ├─► public/sitemap.xml
        └─► src/data/blog-slugs.generated.json          → prerender routes, redirects
```

At runtime `src/lib/blog/catalog.ts` imports only the metadata index for
`/blog`, `/blog/archive`, category pages, search and related-article strips;
each article body is lazy-loaded from its own chunk when `/blog/<slug>` opens.
