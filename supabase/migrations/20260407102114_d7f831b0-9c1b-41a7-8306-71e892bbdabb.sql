-- Remove overly permissive INSERT and UPDATE policies on blog_views
-- The increment_blog_view() SECURITY DEFINER function handles all writes
DROP POLICY IF EXISTS "Anyone can insert blog_views" ON public.blog_views;
DROP POLICY IF EXISTS "Anyone can update blog_views" ON public.blog_views;
