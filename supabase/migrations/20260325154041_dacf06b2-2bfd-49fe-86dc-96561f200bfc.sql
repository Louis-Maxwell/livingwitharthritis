-- Fix search_path on email queue functions
ALTER FUNCTION public.delete_email(text, bigint) SET search_path = public;
ALTER FUNCTION public.enqueue_email(text, jsonb) SET search_path = public;
ALTER FUNCTION public.move_to_dlq(text, text, bigint, jsonb) SET search_path = public;
ALTER FUNCTION public.read_email_batch(text, integer, integer) SET search_path = public;

-- Fix permissive RLS policies on blog_views
DROP POLICY IF EXISTS "Anyone can insert blog_views" ON public.blog_views;
CREATE POLICY "Anyone can insert blog_views" ON public.blog_views FOR INSERT WITH CHECK (
  slug IS NOT NULL AND slug <> ''
);

DROP POLICY IF EXISTS "Anyone can update blog_views" ON public.blog_views;
CREATE POLICY "Anyone can update blog_views" ON public.blog_views FOR UPDATE USING (
  slug IS NOT NULL AND slug <> ''
) WITH CHECK (
  slug IS NOT NULL AND slug <> ''
);