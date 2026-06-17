# Vary blog preview images

## Problem
All four cards on the homepage "Expert advice for living well with arthritis" section show the same gym photo because every `blog_articles.image_url` in the database is `NULL`, so `BlogPreview.tsx` falls back to a single hardcoded Unsplash image (`FALLBACK_IMG`).

## Fix (frontend only)
Edit `src/components/landing/BlogPreview.tsx`:

1. Replace the single `FALLBACK_IMG` constant with a small map of category → curated Unsplash photo (warm, editorial, on-brand). Categories present today include:
   - Finances & Benefits → calm desk / paperwork photo
   - Expert Q&A → clinician/consultation photo
   - Work & Career → workplace / hands-on-laptop photo
   - Default → existing wellness photo
2. Add a `pickImage(article)` helper: if `article.image_url` exists, use it; otherwise pick from the category map; otherwise the default.
3. Also vary within a category so the three "Finances & Benefits" cards aren't identical — use a deterministic hash of the slug to pick from a 2–3 photo list per category.
4. Apply `pickImage` to both the featured article `<img>` and the rest grid; keep existing `imgSrcSet`, `sizes`, `loading="lazy"`, `decoding="async"`.

## Out of scope
- No DB writes, no schema changes, no edge function changes.
- No layout/copy changes — only the image source per card.
- Backfilling real `image_url` values per article is a separate task and can follow if you want.
