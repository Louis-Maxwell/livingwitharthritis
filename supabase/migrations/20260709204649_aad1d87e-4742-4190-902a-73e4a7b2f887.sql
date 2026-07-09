ALTER TABLE public.blog_articles
  ADD COLUMN IF NOT EXISTS direct_answer text,
  ADD COLUMN IF NOT EXISTS citations jsonb;