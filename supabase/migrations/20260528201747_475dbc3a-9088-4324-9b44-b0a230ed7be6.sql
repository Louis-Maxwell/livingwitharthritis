
-- Daily SEO/AEO/GEO refresh run log
CREATE TABLE public.seo_refresh_runs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ran_at timestamp with time zone NOT NULL DEFAULT now(),
  ok boolean NOT NULL DEFAULT false,
  sitemap_count integer NOT NULL DEFAULT 0,
  routes_checked integer NOT NULL DEFAULT 0,
  schema_errors jsonb NOT NULL DEFAULT '[]'::jsonb,
  psi_scores jsonb NOT NULL DEFAULT '[]'::jsonb,
  llms_txt_updated boolean NOT NULL DEFAULT false,
  ai_txt_updated boolean NOT NULL DEFAULT false,
  duration_ms integer NOT NULL DEFAULT 0,
  error_message text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.seo_refresh_runs TO authenticated;
GRANT ALL ON public.seo_refresh_runs TO service_role;

ALTER TABLE public.seo_refresh_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view SEO refresh runs"
ON public.seo_refresh_runs
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Service role manages SEO refresh runs"
ON public.seo_refresh_runs
FOR ALL
TO public
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

CREATE INDEX idx_seo_refresh_runs_ran_at ON public.seo_refresh_runs (ran_at DESC);

-- Cached sitemap XML produced by the daily edge function and served via an edge route
CREATE TABLE public.sitemap_cache (
  id integer NOT NULL PRIMARY KEY DEFAULT 1,
  xml text NOT NULL,
  url_count integer NOT NULL DEFAULT 0,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT sitemap_cache_singleton CHECK (id = 1)
);

GRANT SELECT ON public.sitemap_cache TO anon, authenticated;
GRANT ALL ON public.sitemap_cache TO service_role;

ALTER TABLE public.sitemap_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read cached sitemap"
ON public.sitemap_cache
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Service role manages sitemap cache"
ON public.sitemap_cache
FOR ALL
TO public
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Ensure required extensions for scheduling
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;
