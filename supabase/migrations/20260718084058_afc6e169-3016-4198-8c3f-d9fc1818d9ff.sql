CREATE TABLE IF NOT EXISTS public.blog_articles_backup_20260718 AS TABLE public.blog_articles;
GRANT ALL ON public.blog_articles_backup_20260718 TO service_role;
ALTER TABLE public.blog_articles_backup_20260718 ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins read backup" ON public.blog_articles_backup_20260718
  FOR SELECT TO authenticated USING (public.is_admin());