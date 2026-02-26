
-- Blog view tracking (anonymous-friendly, one row per slug)
CREATE TABLE public.blog_views (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  view_count bigint NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_views ENABLE ROW LEVEL SECURITY;

-- Anyone can read view counts
CREATE POLICY "Anyone can view blog_views"
  ON public.blog_views FOR SELECT USING (true);

-- Anyone can insert (upsert) view counts
CREATE POLICY "Anyone can insert blog_views"
  ON public.blog_views FOR INSERT WITH CHECK (true);

-- Anyone can increment view counts
CREATE POLICY "Anyone can update blog_views"
  ON public.blog_views FOR UPDATE USING (true);

-- Admins can delete
CREATE POLICY "Admins can delete blog_views"
  ON public.blog_views FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- Function to atomically increment view count
CREATE OR REPLACE FUNCTION public.increment_blog_view(p_slug text)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count bigint;
BEGIN
  INSERT INTO public.blog_views (slug, view_count)
  VALUES (p_slug, 1)
  ON CONFLICT (slug)
  DO UPDATE SET view_count = blog_views.view_count + 1, updated_at = now()
  RETURNING view_count INTO new_count;
  RETURN new_count;
END;
$$;

-- Blog comments with moderation
CREATE TABLE public.blog_comments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL,
  author_name text NOT NULL,
  content text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

-- Anyone can read approved comments
CREATE POLICY "Anyone can view approved comments"
  ON public.blog_comments FOR SELECT
  USING (status = 'approved');

-- Admins can view all comments
CREATE POLICY "Admins can view all comments"
  ON public.blog_comments FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

-- Anyone can submit a comment
CREATE POLICY "Anyone can submit comments"
  ON public.blog_comments FOR INSERT
  WITH CHECK (true);

-- Admins can update (moderate) comments
CREATE POLICY "Admins can update comments"
  ON public.blog_comments FOR UPDATE
  USING (has_role(auth.uid(), 'admin'));

-- Admins can delete comments
CREATE POLICY "Admins can delete comments"
  ON public.blog_comments FOR DELETE
  USING (has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_blog_views_updated_at
  BEFORE UPDATE ON public.blog_views
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_comments_updated_at
  BEFORE UPDATE ON public.blog_comments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
