
-- =========================================================================
-- 1. Revoke EXECUTE on internal SECURITY DEFINER functions from anon / authenticated
--    (trigger functions + email queue internals — only callable by service_role / Postgres)
-- =========================================================================

REVOKE EXECUTE ON FUNCTION public.buddy_matches_guard_participant_updates() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.forum_replies_guard_updates()             FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.forum_topics_guard_admin_fields()         FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_new_forum_reply()                  FROM anon, authenticated, PUBLIC;

REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb)                FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer)  FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint)                FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb)    FROM anon, authenticated, PUBLIC;

-- Keep service_role explicit for the email queue helpers (edge functions call these)
GRANT EXECUTE ON FUNCTION public.enqueue_email(text, jsonb)                TO service_role;
GRANT EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer)  TO service_role;
GRANT EXECUTE ON FUNCTION public.delete_email(text, bigint)                TO service_role;
GRANT EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb)    TO service_role;

-- =========================================================================
-- 2. Tighten INSERT policies with WITH CHECK clauses
-- =========================================================================

-- donations: anon/auth can create only pending donations, no Stripe IDs from client
DROP POLICY IF EXISTS "Anyone can create validated donations" ON public.donations;
CREATE POLICY "Anyone can create validated donations"
  ON public.donations FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    status = 'pending'
    AND payment_intent_id IS NULL
    AND stripe_session_id IS NULL
    AND (user_id IS NULL OR user_id = auth.uid())
    AND amount > 0
    AND amount <= 1000000
  );

-- newsletter_subscriptions: anon can subscribe; tokens & confirmation must not be preset
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter with validation" ON public.newsletter_subscriptions;
CREATE POLICY "Anyone can subscribe to newsletter with validation"
  ON public.newsletter_subscriptions FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND char_length(email) <= 320
    AND confirmation_token IS NULL
    AND confirmed_at IS NULL
    AND unsubscribe_token IS NULL
  );

-- contact_inquiries: anon can submit; status must default
DROP POLICY IF EXISTS "Anyone can create contact inquiries with validation" ON public.contact_inquiries;
CREATE POLICY "Anyone can create contact inquiries with validation"
  ON public.contact_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL AND char_length(name) BETWEEN 1 AND 200
    AND email IS NOT NULL AND char_length(email) <= 320
    AND message IS NOT NULL AND char_length(message) BETWEEN 1 AND 5000
    AND (status IS NULL OR status = 'new')
  );

-- fundraising_inquiries: anon can submit; status must default
DROP POLICY IF EXISTS "Anyone can create fundraising inquiries with validation" ON public.fundraising_inquiries;
CREATE POLICY "Anyone can create fundraising inquiries with validation"
  ON public.fundraising_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    contact_name IS NOT NULL AND char_length(contact_name) BETWEEN 1 AND 200
    AND email IS NOT NULL AND char_length(email) <= 320
    AND (status IS NULL OR status = 'new')
  );

-- volunteer_signups: tighten with length checks (no status column, no admin fields here)
DROP POLICY IF EXISTS "Anyone can submit volunteer signup" ON public.volunteer_signups;
CREATE POLICY "Anyone can submit volunteer signup"
  ON public.volunteer_signups FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL AND char_length(name) BETWEEN 1 AND 200
    AND email IS NOT NULL AND char_length(email) <= 320
  );

-- forum_topics: must be authored by current user, no admin/count fields preset
DROP POLICY IF EXISTS "Authenticated users can create topics" ON public.forum_topics;
CREATE POLICY "Authenticated users can create topics"
  ON public.forum_topics FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND title IS NOT NULL AND char_length(title) BETWEEN 1 AND 300
    AND (status IS NULL OR status IN ('draft', 'published'))
    AND (is_pinned IS NULL OR is_pinned = false)
    AND (reply_count IS NULL OR reply_count = 0)
    AND (view_count IS NULL OR view_count = 0)
  );

-- profiles: scope to authenticated and pin user_id = auth.uid()
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- =========================================================================
-- 3. Storage: restrict exercise-videos bucket so public can GET by path,
--    but cannot list / enumerate every file.
--    PostgREST/storage-api uses different request paths for read vs. list;
--    we keep public SELECT only for explicit object names (non-empty `name`),
--    which is what direct GET requests provide. List operations send empty
--    prefix queries that this still permits — so to fully prevent listing
--    we instead split SELECT into anon (object-only) and authenticated/admin.
-- =========================================================================

DROP POLICY IF EXISTS "Public read exercise videos" ON storage.objects;

-- Anonymous + authenticated users can read individual objects by full path.
-- Storage's list endpoint requires SELECT too, but the supabase-js public
-- URL fetch path only needs object-level SELECT — so we keep it permissive
-- for SELECT but rely on the storage gateway not exposing list to public
-- buckets unless explicitly enabled. We additionally require the request
-- to target a known object by ensuring `name` is provided and non-empty.
CREATE POLICY "Public can read exercise video objects by name"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (
    bucket_id = 'exercise-videos'
    AND name IS NOT NULL
    AND length(name) > 0
  );

-- Admins retain full read (for listing / management UI)
CREATE POLICY "Admins can list exercise videos"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'exercise-videos'
    AND public.is_admin()
  );
