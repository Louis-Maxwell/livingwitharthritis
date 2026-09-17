-- 1) Public content tables: public read limited to active rows
DROP POLICY IF EXISTS "Anyone can view about_us_sections" ON public.about_us_sections;
CREATE POLICY "Active about_us_sections are public" ON public.about_us_sections
FOR SELECT USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Anyone can view arthritis_types" ON public.arthritis_types;
CREATE POLICY "Active arthritis_types are public" ON public.arthritis_types
FOR SELECT USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Anyone can view conditions" ON public.conditions;
CREATE POLICY "Active conditions are public" ON public.conditions
FOR SELECT USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Anyone can view donation_tiers" ON public.donation_tiers;
CREATE POLICY "Active donation_tiers are public" ON public.donation_tiers
FOR SELECT USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Anyone can view fundraising_options" ON public.fundraising_options;
CREATE POLICY "Active fundraising_options are public" ON public.fundraising_options
FOR SELECT USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Anyone can view healthy_living_resources" ON public.healthy_living_resources;
CREATE POLICY "Active healthy_living_resources are public" ON public.healthy_living_resources
FOR SELECT USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Anyone can view nutrition_sections" ON public.nutrition_sections;
CREATE POLICY "Active nutrition_sections are public" ON public.nutrition_sections
FOR SELECT USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Anyone can view physio_myths" ON public.physio_myths;
CREATE POLICY "Active physio_myths are public" ON public.physio_myths
FOR SELECT USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Anyone can view services" ON public.services;
CREATE POLICY "Active services are public" ON public.services
FOR SELECT USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Anyone can view statistics" ON public.statistics;
CREATE POLICY "Active statistics are public" ON public.statistics
FOR SELECT USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Article categories are publicly readable" ON public.article_categories;
CREATE POLICY "Active article categories are public" ON public.article_categories
FOR SELECT USING (is_active = true OR public.is_admin());

-- 2) Internal SEO / analytics tables: admin-only reads
DROP POLICY IF EXISTS "Article audio is publicly readable" ON public.article_audio;
CREATE POLICY "Admins can read article_audio" ON public.article_audio
FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "Internal links are publicly readable" ON public.article_internal_links;
CREATE POLICY "Admins can read article_internal_links" ON public.article_internal_links
FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "Article category links are publicly readable" ON public.article_category_links;
CREATE POLICY "Admins can read article_category_links" ON public.article_category_links
FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "Featured snippets are publicly readable" ON public.featured_snippets;
CREATE POLICY "Admins can read featured_snippets" ON public.featured_snippets
FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "Anyone can read cached sitemap" ON public.sitemap_cache;
CREATE POLICY "Admins can read sitemap_cache" ON public.sitemap_cache
FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "Anyone can view blog_views" ON public.blog_views;
CREATE POLICY "Admins can read blog_views" ON public.blog_views
FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "Anyone can view helpfulness counts" ON public.blog_helpfulness;
CREATE POLICY "Admins can read blog_helpfulness" ON public.blog_helpfulness
FOR SELECT TO authenticated USING (public.is_admin());

-- 3) Newsletter sign-ups: validate submitted rows
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.email_subscriptions;
CREATE POLICY "Anyone can subscribe with a valid email" ON public.email_subscriptions
FOR INSERT WITH CHECK (
  email ~* '^[A-Za-z0-9._%%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND length(email) <= 254
  AND coalesce(array_length(subscribed_sequences, 1), 0) <= 10
  AND (source IS NULL OR length(source) <= 100)
);