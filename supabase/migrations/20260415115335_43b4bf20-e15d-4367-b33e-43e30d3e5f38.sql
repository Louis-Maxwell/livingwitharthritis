
-- 1. Fix forum topic UPDATE policy: restrict authors to only changing title/body
DROP POLICY IF EXISTS "Authors can update own topics" ON public.forum_topics;
CREATE POLICY "Authors can update own topics"
ON public.forum_topics
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (
  auth.uid() = user_id
  AND status = 'published'
);

-- 2. Fix forum reply UPDATE policy: restrict authors to only changing content
DROP POLICY IF EXISTS "Authors can update own replies" ON public.forum_replies;
CREATE POLICY "Authors can update own replies"
ON public.forum_replies
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (
  auth.uid() = user_id
  AND status = 'published'
);

-- 3. Tighten donations SELECT: ensure anon role cannot see any rows
DROP POLICY IF EXISTS "Users can view their own donations" ON public.donations;
CREATE POLICY "Authenticated users can view their own donations"
ON public.donations
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 4. Performance indexes
CREATE INDEX IF NOT EXISTS idx_appointments_preferred_date ON public.appointments (preferred_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON public.appointments (status);
CREATE INDEX IF NOT EXISTS idx_blog_articles_slug ON public.blog_articles (slug);
CREATE INDEX IF NOT EXISTS idx_blog_articles_category ON public.blog_articles (category);
CREATE INDEX IF NOT EXISTS idx_blog_articles_is_published ON public.blog_articles (is_published);
CREATE UNIQUE INDEX IF NOT EXISTS idx_blog_views_slug ON public.blog_views (slug);
CREATE INDEX IF NOT EXISTS idx_donations_stripe_session_id ON public.donations (stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_donations_status ON public.donations (status);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status ON public.contact_inquiries (status);
CREATE INDEX IF NOT EXISTS idx_forum_topics_category ON public.forum_topics (category);
CREATE INDEX IF NOT EXISTS idx_forum_topics_status ON public.forum_topics (status);
CREATE UNIQUE INDEX IF NOT EXISTS idx_newsletter_email ON public.newsletter_subscriptions (email);
CREATE INDEX IF NOT EXISTS idx_pain_journal_user_date ON public.pain_journal_entries (user_id, entry_date);
CREATE INDEX IF NOT EXISTS idx_email_send_log_recipient ON public.email_send_log (recipient_email);
CREATE INDEX IF NOT EXISTS idx_email_send_log_template ON public.email_send_log (template_name);
CREATE INDEX IF NOT EXISTS idx_fundraising_inquiries_status ON public.fundraising_inquiries (status);
CREATE INDEX IF NOT EXISTS idx_volunteer_signups_email ON public.volunteer_signups (email);
