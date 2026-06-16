## Goal
Add the 9 clinically-reviewed blog posts from `lovable-bundle.zip` to the live site so they index and grow keyword coverage. Skip the bundle's SEO helper files — the project already has equivalents.

## What's in the bundle
- `blog-posts.js` — 9 full posts (slug, title, category, author, credentials, excerpt, HTML content, lastUpdated, FAQ, related)
- `seo-meta.js`, `technical-seo.js`, `seo-checklist.txt`, `all-blogs.html` — **not needed**: the project already has Organization/MedicalWebPage/FAQ/Breadcrumb JSON‑LD (`src/lib/jsonLd.ts` + per-page `useEffect`), canonical/hreflang, `robots.txt`, `sitemap.xml`, breadcrumb + ToC components, and an author/reviewer system.

## Steps

1. **Parse `blog-posts.js`** in a one-off Node script and map each post to the existing `public.blog_articles` schema:
   - `slug`, `title`, `excerpt`, `content` (HTML), `category` → existing columns
   - `author`, `author_credentials` → existing columns
   - `reviewed_by = author`, `reviewer_credentials = author_credentials` (posts are self‑reviewed by HCPC physio in the bundle)
   - `meta_title` = post title, `meta_description` = excerpt (trimmed to 160), `keywords` derived from category + slug words
   - `date = lastUpdated`, `is_published = true`, `display_order` = next available, `image_url = null` (let `BlogPreview` fall back to its Unsplash default — avoids the bundle's broken `/images/*.jpg` URLs)

2. **Insert via `supabase--insert`** (one batch). All 9 slugs are confirmed free of collisions.

3. **Add 9 URLs to `public/sitemap.xml`**:
   ```
   https://livingwitharthritis.org.uk/blog/<slug>
   ```
   with today's `<lastmod>`, `changefreq=monthly`, `priority=0.7` — matching the existing blog entries.

4. **No code changes needed** for rendering: `/blog` and `/blog/:slug` already read from `blog_articles` (see `useBlogArticles`, `BlogPreview.tsx`). Posts appear automatically once inserted.

## Things I will NOT do (flagging for you)
- Won't import `seo-meta.js` / `technical-seo.js` — duplicates existing infra and would conflict with the project's centralised JSON‑LD pattern.
- Won't bring in the bundle's `/images/treatment-hub-hero.jpg` style paths (they don't exist on the site). If you want bespoke hero images per post, that's a separate task.
- The bundle's author `Sarah Jennings, PH123456` is fictional placeholder credentials — I'll insert as-is per your file, but flag it so you can swap to a real `medical-authors.json` entry later if needed.

## Acceptance
- `SELECT count(*) FROM blog_articles WHERE is_published` increases by 9.
- The 9 new posts appear on `/blog` and render at `/blog/<slug>`.
- Sitemap contains the 9 new URLs.
