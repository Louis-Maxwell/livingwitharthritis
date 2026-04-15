
-- 1. Create new is_admin() function using auth.uid() internally, SECURITY INVOKER
CREATE OR REPLACE FUNCTION public.is_admin()
  RETURNS boolean
  LANGUAGE sql
  STABLE SECURITY INVOKER
  SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  );
$$;

-- 2. Update all RLS policies that use has_role(auth.uid(), 'admin') to use is_admin()

-- about_us_sections
DROP POLICY IF EXISTS "Admins can manage about_us_sections" ON public.about_us_sections;
CREATE POLICY "Admins can manage about_us_sections" ON public.about_us_sections FOR ALL USING (public.is_admin());

-- ai_safety_certifications
DROP POLICY IF EXISTS "Admins can manage ai_safety_certifications" ON public.ai_safety_certifications;
CREATE POLICY "Admins can manage ai_safety_certifications" ON public.ai_safety_certifications FOR ALL USING (public.is_admin());

-- ai_safety_faqs
DROP POLICY IF EXISTS "Admins can manage ai_safety_faqs" ON public.ai_safety_faqs;
CREATE POLICY "Admins can manage ai_safety_faqs" ON public.ai_safety_faqs FOR ALL USING (public.is_admin());

-- ai_safety_principles
DROP POLICY IF EXISTS "Admins can manage ai_safety_principles" ON public.ai_safety_principles;
CREATE POLICY "Admins can manage ai_safety_principles" ON public.ai_safety_principles FOR ALL USING (public.is_admin());

-- appointments
DROP POLICY IF EXISTS "Admins can manage appointments" ON public.appointments;
CREATE POLICY "Admins can manage appointments" ON public.appointments FOR ALL USING (public.is_admin());

-- arthritis_types
DROP POLICY IF EXISTS "Admins can manage arthritis_types" ON public.arthritis_types;
CREATE POLICY "Admins can manage arthritis_types" ON public.arthritis_types FOR ALL USING (public.is_admin());

-- blog_articles
DROP POLICY IF EXISTS "Admins can manage blog articles" ON public.blog_articles;
CREATE POLICY "Admins can manage blog articles" ON public.blog_articles FOR ALL USING (public.is_admin());

-- blog_comments
DROP POLICY IF EXISTS "Admins can delete comments" ON public.blog_comments;
CREATE POLICY "Admins can delete comments" ON public.blog_comments FOR DELETE USING (public.is_admin());
DROP POLICY IF EXISTS "Admins can update comments" ON public.blog_comments;
CREATE POLICY "Admins can update comments" ON public.blog_comments FOR UPDATE USING (public.is_admin());
DROP POLICY IF EXISTS "Admins can view all comments" ON public.blog_comments;
CREATE POLICY "Admins can view all comments" ON public.blog_comments FOR SELECT USING (public.is_admin());

-- blog_views — add missing INSERT/UPDATE policies (service role only)
DROP POLICY IF EXISTS "Admins can delete blog_views" ON public.blog_views;
CREATE POLICY "Admins can delete blog_views" ON public.blog_views FOR DELETE USING (public.is_admin());
CREATE POLICY "Service role can insert blog_views" ON public.blog_views FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role can update blog_views" ON public.blog_views FOR UPDATE USING (auth.role() = 'service_role');

-- conditions
DROP POLICY IF EXISTS "Admins can manage conditions" ON public.conditions;
CREATE POLICY "Admins can manage conditions" ON public.conditions FOR ALL USING (public.is_admin());

-- contact_inquiries
DROP POLICY IF EXISTS "Admins can update contact inquiries" ON public.contact_inquiries;
CREATE POLICY "Admins can update contact inquiries" ON public.contact_inquiries FOR UPDATE USING (public.is_admin());
DROP POLICY IF EXISTS "Admins can view contact inquiries" ON public.contact_inquiries;
CREATE POLICY "Admins can view contact inquiries" ON public.contact_inquiries FOR SELECT USING (public.is_admin());

-- donation_tiers
DROP POLICY IF EXISTS "Admins can manage donation_tiers" ON public.donation_tiers;
CREATE POLICY "Admins can manage donation_tiers" ON public.donation_tiers FOR ALL USING (public.is_admin());

-- donations
DROP POLICY IF EXISTS "Admins can update donations" ON public.donations;
CREATE POLICY "Admins can update donations" ON public.donations FOR UPDATE USING (public.is_admin());
DROP POLICY IF EXISTS "Admins can view all donations" ON public.donations;
CREATE POLICY "Admins can view all donations" ON public.donations FOR SELECT USING (public.is_admin());

-- feedback_responses
DROP POLICY IF EXISTS "Admins can view feedback" ON public.feedback_responses;
CREATE POLICY "Admins can view feedback" ON public.feedback_responses FOR SELECT USING (public.is_admin());

-- forum_replies
DROP POLICY IF EXISTS "Admins can delete replies" ON public.forum_replies;
CREATE POLICY "Admins can delete replies" ON public.forum_replies FOR DELETE USING (public.is_admin());
DROP POLICY IF EXISTS "Published replies visible to all" ON public.forum_replies;
CREATE POLICY "Published replies visible to all" ON public.forum_replies FOR SELECT USING (status = 'published' OR public.is_admin());

-- forum_topics
DROP POLICY IF EXISTS "Admins can delete topics" ON public.forum_topics;
CREATE POLICY "Admins can delete topics" ON public.forum_topics FOR DELETE USING (public.is_admin());
DROP POLICY IF EXISTS "Published topics visible to all" ON public.forum_topics;
CREATE POLICY "Published topics visible to all" ON public.forum_topics FOR SELECT USING (status = 'published' OR public.is_admin());

-- fundraising_inquiries
DROP POLICY IF EXISTS "Admins can update fundraising inquiries" ON public.fundraising_inquiries;
CREATE POLICY "Admins can update fundraising inquiries" ON public.fundraising_inquiries FOR UPDATE USING (public.is_admin());
DROP POLICY IF EXISTS "Admins can view fundraising inquiries" ON public.fundraising_inquiries;
CREATE POLICY "Admins can view fundraising inquiries" ON public.fundraising_inquiries FOR SELECT USING (public.is_admin());

-- fundraising_options
DROP POLICY IF EXISTS "Admins can manage fundraising_options" ON public.fundraising_options;
CREATE POLICY "Admins can manage fundraising_options" ON public.fundraising_options FOR ALL USING (public.is_admin());

-- healthy_living_resources
DROP POLICY IF EXISTS "Admins can manage healthy_living_resources" ON public.healthy_living_resources;
CREATE POLICY "Admins can manage healthy_living_resources" ON public.healthy_living_resources FOR ALL USING (public.is_admin());

-- joint_exercises
DROP POLICY IF EXISTS "Admins can manage joint exercises" ON public.joint_exercises;
CREATE POLICY "Admins can manage joint exercises" ON public.joint_exercises FOR ALL USING (public.is_admin());

-- newsletter_subscriptions — add explicit admin-only SELECT
DROP POLICY IF EXISTS "Admins can manage newsletter subscriptions" ON public.newsletter_subscriptions;
CREATE POLICY "Admins can manage newsletter subscriptions" ON public.newsletter_subscriptions FOR ALL USING (public.is_admin());
CREATE POLICY "Only admins can view newsletter subscriptions" ON public.newsletter_subscriptions FOR SELECT USING (public.is_admin());

-- nutrition_sections
DROP POLICY IF EXISTS "Admins can manage nutrition_sections" ON public.nutrition_sections;
CREATE POLICY "Admins can manage nutrition_sections" ON public.nutrition_sections FOR ALL USING (public.is_admin());

-- physio_myths
DROP POLICY IF EXISTS "Admins can manage physio_myths" ON public.physio_myths;
CREATE POLICY "Admins can manage physio_myths" ON public.physio_myths FOR ALL USING (public.is_admin());

-- services
DROP POLICY IF EXISTS "Admins can manage services" ON public.services;
CREATE POLICY "Admins can manage services" ON public.services FOR ALL USING (public.is_admin());

-- statistics
DROP POLICY IF EXISTS "Admins can manage statistics" ON public.statistics;
CREATE POLICY "Admins can manage statistics" ON public.statistics FOR ALL USING (public.is_admin());

-- volunteer_signups
DROP POLICY IF EXISTS "Admins can manage volunteer signups" ON public.volunteer_signups;
CREATE POLICY "Admins can manage volunteer signups" ON public.volunteer_signups FOR ALL USING (public.is_admin());
DROP POLICY IF EXISTS "Admins can view volunteer signups" ON public.volunteer_signups;
CREATE POLICY "Admins can view volunteer signups" ON public.volunteer_signups FOR SELECT USING (public.is_admin());
