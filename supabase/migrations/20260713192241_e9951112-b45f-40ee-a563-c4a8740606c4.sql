CREATE INDEX IF NOT EXISTS idx_blog_articles_published_order
  ON public.blog_articles (display_order DESC, date DESC)
  WHERE is_published = true;

CREATE INDEX IF NOT EXISTS idx_blog_articles_published_date
  ON public.blog_articles (date DESC)
  WHERE is_published = true;

CREATE INDEX IF NOT EXISTS idx_blog_views_view_count
  ON public.blog_views (view_count DESC);