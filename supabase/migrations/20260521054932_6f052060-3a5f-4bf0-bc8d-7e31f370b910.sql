
-- 1. Forum topics: prevent non-admins from changing is_pinned, reply_count, view_count
CREATE OR REPLACE FUNCTION public.forum_topics_guard_admin_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF public.is_admin() THEN
    RETURN NEW;
  END IF;
  IF NEW.is_pinned IS DISTINCT FROM OLD.is_pinned
     OR NEW.reply_count IS DISTINCT FROM OLD.reply_count
     OR NEW.view_count IS DISTINCT FROM OLD.view_count
     OR NEW.user_id IS DISTINCT FROM OLD.user_id
     OR NEW.created_at IS DISTINCT FROM OLD.created_at THEN
    RAISE EXCEPTION 'Cannot modify protected topic fields';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS forum_topics_guard_admin_fields_trg ON public.forum_topics;
CREATE TRIGGER forum_topics_guard_admin_fields_trg
BEFORE UPDATE ON public.forum_topics
FOR EACH ROW EXECUTE FUNCTION public.forum_topics_guard_admin_fields();

-- 2. Suppressed emails: allow admins to view
DROP POLICY IF EXISTS "Admins can view suppressed emails" ON public.suppressed_emails;
CREATE POLICY "Admins can view suppressed emails"
ON public.suppressed_emails
FOR SELECT
TO authenticated
USING (public.is_admin());

-- 3. Reaffirm column-level revokes on newsletter token columns
REVOKE SELECT (unsubscribe_token, confirmation_token)
  ON public.newsletter_subscriptions FROM anon, authenticated;

-- 4. Reaffirm buddy_matches participant guard trigger is attached
DROP TRIGGER IF EXISTS buddy_matches_guard_participant_updates_trg ON public.buddy_matches;
CREATE TRIGGER buddy_matches_guard_participant_updates_trg
BEFORE UPDATE ON public.buddy_matches
FOR EACH ROW EXECUTE FUNCTION public.buddy_matches_guard_participant_updates();
