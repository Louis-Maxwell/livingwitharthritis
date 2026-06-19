DROP TRIGGER IF EXISTS forum_topics_guard_privileged_fields_trg ON public.forum_topics;
CREATE TRIGGER forum_topics_guard_privileged_fields_trg
BEFORE UPDATE ON public.forum_topics
FOR EACH ROW
EXECUTE FUNCTION public.forum_topics_guard_privileged_fields();