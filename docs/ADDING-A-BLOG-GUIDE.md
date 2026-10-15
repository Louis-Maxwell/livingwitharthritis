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
     "reviewStatus": "pending",
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
| `reviewStatus` | optional `"reviewed"` \| `"pending"`; omitted means `"reviewed"`. Use `"pending"` for any new or substantially rewritten guide until Louis has reviewed it (see below) |
   | `category` | must map to a topic in `src/data/blogCategories.ts` (e.g. Exercise, Nutrition, Health, Treatment…) |
   | `cover` | a file in `public/openverse/`, not used by any other guide |
   | `content` | real body, ≥ 200 characters |
   | `citations` | optional; absolute `http(s)` URLs only |

   Only publish real content — no invented statistics. A new guide starts as
   `"reviewStatus": "pending"` until Louis Maxwell has clinically reviewed it.

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

## Clinical review status

Every guide page shows who stands behind it. By default (no `reviewStatus`, or
`"reviewed"`) the page says **"Clinically reviewed · Louis Maxwell, HCPC PH128483 · <date>"**
and the JSON-LD carries `reviewedBy` for the verified reviewer.

A guide with `"reviewStatus": "pending"` instead shows:

> Written by the Living With Arthritis team · pending clinical review by Louis Maxwell (HCPC PH128483)

in the byline, the print header, the review box at the foot of the article and the
prerendered HTML. Its JSON-LD keeps `author` and `publisher` but has **no**
`reviewedBy` or `lastReviewed`, so search engines are never told a review happened.
Do not set `last_reviewed` on a pending guide.

Set `"pending"` on any new guide, and on an existing guide when you substantially
rewrite the clinical content (a meta-title/description tweak does not count).

### Marking a guide as reviewed

Once Louis has reviewed a guide:

```bash
npm run blog:mark-reviewed -- <slug> [<slug> ...]
# optional: --date YYYY-MM-DD (defaults to today, UK time), --no-catalog
npm run build
```

This sets `"reviewStatus": "reviewed"` and `"last_reviewed"` to today in each
`src/content/blog/posts/<slug>.json`, then regenerates the catalog. Commit the post
files with the regenerated files (as in step 3), open a PR, merge when green. Also
remove the slug from `PENDING_SINCE_25_SEP` in
`src/lib/__tests__/blog-review-status.test.tsx` if it is listed there.

### Library topics (`/library/<slug>`)

Library pages use the same idea, driven by `src/data/libraryReviewStatus.json`:

```json
{
  "knee-pain": { "reviewStatus": "pending" },
  "osteoporosis": { "reviewStatus": "reviewed", "lastReviewed": "2026-10-01" }
}
```

A pending topic's review box says **"Pending clinical review by Louis Maxwell (HCPC PH128483)"**,
its "About this page" note says it is pending, and neither the page nor its JSON-LD
claims a completed review. Topics not listed show the default review date
(`DEFAULT_LIBRARY_LAST_REVIEWED` in `src/data/libraryReview.ts`). Add a topic as
`pending` whenever you add or substantially rewrite its content.

Once Louis has reviewed a topic:

```bash
npm run library:mark-reviewed -- <slug> [<slug> ...]   # optional --date YYYY-MM-DD
npm run build
```

Commit `src/data/libraryReviewStatus.json` and the regenerated
`scripts/library-head-data.json`, and remove the slug from `PENDING_LIBRARY_TOPICS`
in `src/pages/__tests__/LibraryTopic.review-status.test.tsx`.

## Editing, renaming or removing a guide

- **Edit:** change the post file, bump `updated_at` (and `last_reviewed` after a
  clinical review — `npm run blog:mark-reviewed` does this), rebuild, commit.
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
