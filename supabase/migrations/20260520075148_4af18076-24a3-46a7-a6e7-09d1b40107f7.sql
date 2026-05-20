
-- 1. BUDDY_MATCHES: restrict participant updates
DROP POLICY IF EXISTS "Participants can update their matches" ON public.buddy_matches;

CREATE POLICY "Participants can update their matches"
ON public.buddy_matches
FOR UPDATE
USING ((auth.uid() = mentor_id) OR (auth.uid() = mentee_id))
WITH CHECK (
  ((auth.uid() = mentor_id) OR (auth.uid() = mentee_id))
  AND status IN ('pending','active','declined','completed','ended')
);

CREATE OR REPLACE FUNCTION public.buddy_matches_guard_participant_updates()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Admins bypass all checks
  IF public.is_admin() THEN
    RETURN NEW;
  END IF;

  -- Immutable fields for participants
  IF NEW.mentor_id IS DISTINCT FROM OLD.mentor_id
     OR NEW.mentee_id IS DISTINCT FROM OLD.mentee_id
     OR NEW.compatibility_score IS DISTINCT FROM OLD.compatibility_score
     OR NEW.compatibility_breakdown IS DISTINCT FROM OLD.compatibility_breakdown
     OR NEW.created_at IS DISTINCT FROM OLD.created_at THEN
    RAISE EXCEPTION 'Participants cannot modify protected match fields';
  END IF;

  -- Restrict status transitions: pending -> declined/active is admin-only
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    IF OLD.status = 'pending' AND NEW.status = 'active' THEN
      RAISE EXCEPTION 'Only admins may activate a pending match';
    END IF;
    IF NEW.status NOT IN ('declined','ended','completed') THEN
      RAISE EXCEPTION 'Invalid status transition for participants';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_buddy_matches_guard ON public.buddy_matches;
CREATE TRIGGER trg_buddy_matches_guard
BEFORE UPDATE ON public.buddy_matches
FOR EACH ROW EXECUTE FUNCTION public.buddy_matches_guard_participant_updates();


-- 2. FORUM_REPLIES: tighten update WITH CHECK
DROP POLICY IF EXISTS "Authors can update own replies" ON public.forum_replies;

CREATE POLICY "Authors can update own replies"
ON public.forum_replies
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (
  auth.uid() = user_id
  AND status = 'published'
  AND length(content) BETWEEN 1 AND 2000
);

CREATE OR REPLACE FUNCTION public.forum_replies_guard_updates()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF public.is_admin() THEN
    RETURN NEW;
  END IF;
  IF NEW.user_id IS DISTINCT FROM OLD.user_id
     OR NEW.topic_id IS DISTINCT FROM OLD.topic_id
     OR NEW.created_at IS DISTINCT FROM OLD.created_at THEN
    RAISE EXCEPTION 'Cannot modify protected reply fields';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_forum_replies_guard ON public.forum_replies;
CREATE TRIGGER trg_forum_replies_guard
BEFORE UPDATE ON public.forum_replies
FOR EACH ROW EXECUTE FUNCTION public.forum_replies_guard_updates();


-- 3. NEWSLETTER_SUBSCRIPTIONS: hide tokens from non-service roles
-- Edge functions use the service role (bypasses GRANTs), so this only
-- removes the tokens from admin/anon PostgREST reads.
REVOKE SELECT (unsubscribe_token, confirmation_token)
  ON public.newsletter_subscriptions FROM anon, authenticated;
