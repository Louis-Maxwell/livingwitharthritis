
-- Attach existing guard triggers that protect privileged columns
DROP TRIGGER IF EXISTS forum_topics_guard_admin_fields_trg ON public.forum_topics;
CREATE TRIGGER forum_topics_guard_admin_fields_trg
BEFORE UPDATE ON public.forum_topics
FOR EACH ROW EXECUTE FUNCTION public.forum_topics_guard_admin_fields();

DROP TRIGGER IF EXISTS forum_replies_guard_updates_trg ON public.forum_replies;
CREATE TRIGGER forum_replies_guard_updates_trg
BEFORE UPDATE ON public.forum_replies
FOR EACH ROW EXECUTE FUNCTION public.forum_replies_guard_updates();

DROP TRIGGER IF EXISTS handle_new_forum_reply_trg ON public.forum_replies;
CREATE TRIGGER handle_new_forum_reply_trg
AFTER INSERT ON public.forum_replies
FOR EACH ROW EXECUTE FUNCTION public.handle_new_forum_reply();

DROP TRIGGER IF EXISTS buddy_matches_guard_participant_updates_trg ON public.buddy_matches;
CREATE TRIGGER buddy_matches_guard_participant_updates_trg
BEFORE UPDATE ON public.buddy_matches
FOR EACH ROW EXECUTE FUNCTION public.buddy_matches_guard_participant_updates();

-- Set fixed search_path on email queue helpers
ALTER FUNCTION public.enqueue_email(text, jsonb) SET search_path = public, pgmq;
ALTER FUNCTION public.read_email_batch(text, integer, integer) SET search_path = public, pgmq;
ALTER FUNCTION public.delete_email(text, bigint) SET search_path = public, pgmq;
ALTER FUNCTION public.move_to_dlq(text, text, bigint, jsonb) SET search_path = public, pgmq;
