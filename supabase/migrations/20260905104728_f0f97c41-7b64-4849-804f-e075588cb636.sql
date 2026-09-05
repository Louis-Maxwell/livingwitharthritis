
-- 1. article_categories
CREATE TABLE public.article_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  pillar_slug text,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.article_categories TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.article_categories TO authenticated;
GRANT ALL ON public.article_categories TO service_role;
ALTER TABLE public.article_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Article categories are publicly readable"
  ON public.article_categories FOR SELECT USING (true);
CREATE POLICY "Admins manage article categories"
  ON public.article_categories FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER update_article_categories_updated_at
  BEFORE UPDATE ON public.article_categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 2. article_category_links (many-to-many by slug, articles live in DB + static files)
CREATE TABLE public.article_category_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_slug text NOT NULL,
  category_id uuid NOT NULL REFERENCES public.article_categories(id) ON DELETE CASCADE,
  is_primary boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (article_slug, category_id)
);
CREATE INDEX idx_article_category_links_slug ON public.article_category_links (article_slug);
CREATE INDEX idx_article_category_links_category ON public.article_category_links (category_id);
GRANT SELECT ON public.article_category_links TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.article_category_links TO authenticated;
GRANT ALL ON public.article_category_links TO service_role;
ALTER TABLE public.article_category_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Article category links are publicly readable"
  ON public.article_category_links FOR SELECT USING (true);
CREATE POLICY "Admins manage article category links"
  ON public.article_category_links FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 3. article_internal_links
CREATE TABLE public.article_internal_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_slug text NOT NULL,
  target_slug text NOT NULL,
  link_type text NOT NULL DEFAULT 'related'
    CHECK (link_type IN ('related','pillar','cluster','breadcrumb')),
  anchor_text text,
  rationale text,
  score numeric,
  is_applied boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (source_slug, target_slug, link_type)
);
CREATE INDEX idx_article_internal_links_source ON public.article_internal_links (source_slug);
CREATE INDEX idx_article_internal_links_target ON public.article_internal_links (target_slug);
GRANT SELECT ON public.article_internal_links TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.article_internal_links TO authenticated;
GRANT ALL ON public.article_internal_links TO service_role;
ALTER TABLE public.article_internal_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Internal links are publicly readable"
  ON public.article_internal_links FOR SELECT USING (true);
CREATE POLICY "Admins manage internal links"
  ON public.article_internal_links FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER update_article_internal_links_updated_at
  BEFORE UPDATE ON public.article_internal_links
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4. seo_analytics (admin-only reads: competitive data)
CREATE TABLE public.seo_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  captured_on date NOT NULL,
  keyword text NOT NULL,
  page_url text NOT NULL,
  article_slug text,
  position numeric,
  impressions integer NOT NULL DEFAULT 0,
  clicks integer NOT NULL DEFAULT 0,
  ctr numeric NOT NULL DEFAULT 0,
  country text NOT NULL DEFAULT 'gbr',
  device text NOT NULL DEFAULT 'all',
  source text NOT NULL DEFAULT 'gsc',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (captured_on, keyword, page_url, country, device)
);
CREATE INDEX idx_seo_analytics_slug_date ON public.seo_analytics (article_slug, captured_on DESC);
CREATE INDEX idx_seo_analytics_keyword_date ON public.seo_analytics (keyword, captured_on DESC);
GRANT SELECT ON public.seo_analytics TO authenticated;
GRANT ALL ON public.seo_analytics TO service_role;
ALTER TABLE public.seo_analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read seo analytics"
  ON public.seo_analytics FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admins manage seo analytics"
  ON public.seo_analytics FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 5. featured_snippets
CREATE TABLE public.featured_snippets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_slug text NOT NULL,
  keyword text NOT NULL,
  snippet_type text NOT NULL DEFAULT 'paragraph'
    CHECK (snippet_type IN ('paragraph','list','table','faq','video')),
  answer_text text,
  position integer,
  is_active boolean NOT NULL DEFAULT true,
  first_seen_on date NOT NULL DEFAULT CURRENT_DATE,
  last_seen_on date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (article_slug, keyword)
);
CREATE INDEX idx_featured_snippets_slug ON public.featured_snippets (article_slug);
GRANT SELECT ON public.featured_snippets TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.featured_snippets TO authenticated;
GRANT ALL ON public.featured_snippets TO service_role;
ALTER TABLE public.featured_snippets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Featured snippets are publicly readable"
  ON public.featured_snippets FOR SELECT USING (true);
CREATE POLICY "Admins manage featured snippets"
  ON public.featured_snippets FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER update_featured_snippets_updated_at
  BEFORE UPDATE ON public.featured_snippets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 6. blog_articles performance indexes
CREATE UNIQUE INDEX IF NOT EXISTS idx_blog_articles_slug ON public.blog_articles (slug);
CREATE INDEX IF NOT EXISTS idx_blog_articles_published ON public.blog_articles (is_published, date DESC);
CREATE INDEX IF NOT EXISTS idx_articles_published_updated
  ON public.blog_articles (is_published, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_articles_search
  ON public.blog_articles USING GIN (
    to_tsvector('english', coalesce(title,'') || ' ' || coalesce(excerpt,''))
  );
