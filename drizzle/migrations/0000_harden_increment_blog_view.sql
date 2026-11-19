CREATE OR REPLACE FUNCTION public.increment_blog_view(p_slug text)
 RETURNS bigint
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  new_count bigint;
BEGIN
  IF p_slug IS NULL OR length(p_slug) > 200 OR p_slug !~ '^[a-z0-9-]+$' THEN
    RETURN NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.blog_articles WHERE slug = p_slug AND is_published = true) THEN
    RETURN NULL;
  END IF;
  INSERT INTO public.blog_views (slug, view_count)
  VALUES (p_slug, 1)
  ON CONFLICT (slug)
  DO UPDATE SET view_count = blog_views.view_count + 1, updated_at = now()
  RETURNING view_count INTO new_count;
  RETURN new_count;
END;
$function$;