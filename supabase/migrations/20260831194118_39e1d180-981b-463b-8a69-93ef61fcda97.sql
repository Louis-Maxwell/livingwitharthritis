CREATE TABLE IF NOT EXISTS public.article_audio (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL,
  content_hash text NOT NULL,
  audio_path text NOT NULL,
  duration_seconds integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (slug, content_hash)
);

GRANT SELECT ON public.article_audio TO anon;
GRANT SELECT ON public.article_audio TO authenticated;
GRANT ALL ON public.article_audio TO service_role;

ALTER TABLE public.article_audio ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Article audio is publicly readable" ON public.article_audio;
CREATE POLICY "Article audio is publicly readable"
ON public.article_audio FOR SELECT
TO anon, authenticated
USING (true);