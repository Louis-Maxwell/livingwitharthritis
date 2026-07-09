## Plan: Create `/blog/ginger-vs-turmeric-for-arthritis` post

The blog post at `/blog/:slug` is rendered by `src/pages/BlogPost.tsx` from the `blog_articles` Cloud database table (via `useBlogArticle`). To make the URL live, I'll insert one published row into that table.

### What I'll insert

A single row in `public.blog_articles`:

- **slug**: `ginger-vs-turmeric-for-arthritis`
- **title**: "Ginger vs Turmeric for Arthritis: Which Actually Works?"
- **meta_title** / **meta_description**: SEO-optimised, ≤60 / ≤160 chars, targeting the "ginger vs turmeric arthritis" query from the SEMrush suggestion.
- **excerpt**: ~1–2 sentence summary shown on the blog index.
- **category**: `Nutrition` (matches existing diet/supplement posts).
- **keywords**: `ginger, turmeric, curcumin, arthritis, anti-inflammatory, supplements, osteoarthritis`
- **author**: `Maxwell` / **author_credentials**: `First Contact Practitioner · HCPC PH128483` (matches JSON-LD author across the site).
- **reviewed_by**: `Dr. Amina Patel` / **reviewer_credentials**: `Consultant Rheumatologist` (matches BlogPost defaults).
- **image_url**: existing `og-blog-default.webp` fallback (no new asset).
- **date**: today (2026-07-09), **updated_at**: same.
- **is_published**: `true`, **display_order**: mid-range (e.g. `50`) so it slots into the list naturally.
- **content**: markdown, ~1,200–1,500 words, UK English, drawing on the project knowledge (curcumin ~1,000 mg/day with piperine; ginger 500–1,000 mg/day; safety notes re blood thinners; not a cure). Structure:
  1. Intro — why patients ask this
  2. What ginger does (mechanism, evidence, meta-analyses)
  3. What turmeric/curcumin does (mechanism, evidence, comparison to NSAIDs)
  4. Head-to-head comparison table (H2, with `?` H3 Q&A blocks so `FAQPage` JSON-LD auto-populates)
  5. Dosage & safety (blood thinners, diabetes meds, GI)
  6. How to combine them in food (with 1 simple recipe idea)
  7. Bottom line + "speak to your GP" line
  Includes 3–5 H2/H3 questions ending in `?` so the existing `extractFaqs` picks them up, and internal markdown links to related posts (e.g. `/blog/anti-inflammatory-diet-arthritis` style — only link to slugs that already exist; I'll confirm before writing).

### How

1. Read `blog_articles` schema (columns, defaults, RLS) via `supabase--read_query` on `information_schema`, and list existing slugs so internal links point to real posts.
2. Write a new migration `supabase/migrations/<timestamp>_add_ginger_vs_turmeric_blog.sql` containing a single `INSERT INTO public.blog_articles (...) VALUES (...) ON CONFLICT (slug) DO NOTHING;`.
3. No app code changes — `BlogPost.tsx`, sitemap generation, and related-article scoring all pick the row up automatically once it's inserted.
4. Verify by loading `/blog/ginger-vs-turmeric-for-arthritis` in the preview and confirming the SEMrush `content_suggestions` finding clears on the next scan.

### Not doing

- No new React page, no route change, no design work.
- No changes to `index.html`, sitemap XML, or JSON-LD helpers (existing `BlogPost.tsx` handles all of that).
- No new images — reusing the existing OG fallback.
