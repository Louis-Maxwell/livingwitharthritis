
-- 1. Appointments: restrict user updates to cancellation only
DROP POLICY IF EXISTS "Users can update their own appointments" ON public.appointments;

CREATE POLICY "Users can cancel their own appointments"
  ON public.appointments
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id AND status = 'cancelled');

-- 2. Newsletter subscriptions: revoke token column access from API roles
REVOKE SELECT (unsubscribe_token, confirmation_token)
  ON public.newsletter_subscriptions FROM anon, authenticated;

-- Replace blanket ALL admin policy with explicit per-op policies
DROP POLICY IF EXISTS "Admins can manage newsletter subscriptions" ON public.newsletter_subscriptions;

CREATE POLICY "Admins can view newsletter subscriptions"
  ON public.newsletter_subscriptions FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins can update newsletter subscriptions"
  ON public.newsletter_subscriptions FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete newsletter subscriptions"
  ON public.newsletter_subscriptions FOR DELETE
  USING (public.is_admin());

-- Drop the existing duplicate admin SELECT-only policy if present
DROP POLICY IF EXISTS "Only admins can view newsletter subscriptions" ON public.newsletter_subscriptions;

-- 3. Buddy matches: attach the existing guard trigger
DROP TRIGGER IF EXISTS buddy_matches_guard_participant_updates_trg ON public.buddy_matches;
CREATE TRIGGER buddy_matches_guard_participant_updates_trg
  BEFORE UPDATE ON public.buddy_matches
  FOR EACH ROW
  EXECUTE FUNCTION public.buddy_matches_guard_participant_updates();

-- Also attach the forum_replies guard trigger if missing (per security memory)
DROP TRIGGER IF EXISTS forum_replies_guard_updates_trg ON public.forum_replies;
CREATE TRIGGER forum_replies_guard_updates_trg
  BEFORE UPDATE ON public.forum_replies
  FOR EACH ROW
  EXECUTE FUNCTION public.forum_replies_guard_updates();

-- Forum topics reply_count maintenance trigger
DROP TRIGGER IF EXISTS handle_new_forum_reply_trg ON public.forum_replies;
CREATE TRIGGER handle_new_forum_reply_trg
  AFTER INSERT ON public.forum_replies
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_forum_reply();
