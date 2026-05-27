DROP TRIGGER IF EXISTS trg_forum_topics_guard ON public.forum_topics;
CREATE TRIGGER trg_forum_topics_guard
BEFORE UPDATE ON public.forum_topics
FOR EACH ROW EXECUTE FUNCTION public.forum_topics_guard_admin_fields();