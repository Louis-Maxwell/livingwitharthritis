CREATE TABLE public.blog_helpfulness (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL,
  helpful boolean NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_helpfulness ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit helpfulness"
  ON public.blog_helpfulness FOR INSERT
  WITH CHECK (length(slug) > 0 AND length(slug) <= 200);

CREATE POLICY "Anyone can view helpfulness counts"
  ON public.blog_helpfulness FOR SELECT
  USING (true);

CREATE INDEX idx_blog_helpfulness_slug ON public.blog_helpfulness (slug);