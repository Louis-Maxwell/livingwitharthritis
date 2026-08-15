-- Fix blog articles image_url pipeline: prevent future NULL values.
--
-- BACKGROUND:
-- Starting May 2026, blog articles were being created without image_url set,
-- resulting in 123 of 255 published articles having NULL image_url. This
-- occurred because:
--
-- 1. Articles are created manually via Supabase dashboard (no Edge Function
--    inserts blog_articles — ingest-content/daily-content-freshness/etc.
--    do not modify this table).
-- 2. The image_url column had NO DEFAULT value and NO constraint, so admins
--    could insert articles without setting it.
-- 3. The migration on 2026-06-07 backfilled many of these with Unsplash URLs,
--    but new articles continue to be created without image_url (3 most recent
--    as of 2026-08-14 are still NULL).
--
-- SOLUTION:
-- Make image_url NOT NULL with a DEFAULT placeholder. This ensures:
-- - New articles MUST have a valid image_url or admins must specify one.
-- - The placeholder is temporary and clearly marked so admins know to fix it.
-- - No articles are silently using a fake image URL.
--
-- For existing NULL rows: they will be set to a temporary placeholder.
-- Admins should manually audit and fix these rows with proper image URLs
-- from the article content (extract from Unsplash, Openverse, or internal assets).

-- Set a temporary placeholder for existing NULLs before adding NOT NULL constraint
UPDATE public.blog_articles
SET image_url = 'https://placeholder.invalid/missing-image-url'
WHERE image_url IS NULL;

-- Add NOT NULL constraint (image_url column definition changed)
ALTER TABLE public.blog_articles
ALTER COLUMN image_url SET NOT NULL,
ALTER COLUMN image_url SET DEFAULT 'https://placeholder.invalid/missing-image-url';

-- Add CHECK constraint to prevent empty strings
ALTER TABLE public.blog_articles
ADD CONSTRAINT image_url_not_empty CHECK (image_url ~ '^\s*https?://.+\S');

-- Add comment documenting the column
COMMENT ON COLUMN public.blog_articles.image_url IS
'Required URL for blog article hero image. Must be a valid https:// URL.
If placeholder (https://placeholder.invalid/...), admins must source and update with a real image URL.
Image should ideally be sourced from: Unsplash, Openverse (CC-licensed), or internal assets.
Fallback (frontend only): client-side uses deterministic category-matched locally-stored Openverse images.';
