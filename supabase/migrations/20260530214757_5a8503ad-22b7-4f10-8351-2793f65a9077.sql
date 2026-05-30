
-- IndexNow key for ping verification (also exposed as static file)
CREATE TABLE public.syndication_drafts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL,
  title text NOT NULL,
  medium_markdown text,
  linkedin_article text,
  twitter_thread text,
  facebook_post text,
  reddit_post text,
  pinterest_description text,
  generated_at timestamptz NOT NULL DEFAULT now(),
  generated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  posted_channels jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX idx_syndication_drafts_slug ON public.syndication_drafts(slug);
CREATE INDEX idx_syndication_drafts_generated_at ON public.syndication_drafts(generated_at DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.syndication_drafts TO authenticated;
GRANT ALL ON public.syndication_drafts TO service_role;

ALTER TABLE public.syndication_drafts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read syndication drafts"
  ON public.syndication_drafts FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins insert syndication drafts"
  ON public.syndication_drafts FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins update syndication drafts"
  ON public.syndication_drafts FOR UPDATE
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins delete syndication drafts"
  ON public.syndication_drafts FOR DELETE
  TO authenticated
  USING (public.is_admin());
