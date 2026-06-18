
-- 1. Replace permissive INSERT policy on quiz_submissions with validated checks
DROP POLICY IF EXISTS "Anyone can submit a quiz" ON public.quiz_submissions;
CREATE POLICY "Anyone can submit a quiz"
ON public.quiz_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  (email IS NULL OR (char_length(email) <= 254 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'))
);

-- 2. Trigger to prevent non-admin authors from modifying privileged fields on forum_topics
CREATE OR REPLACE FUNCTION public.forum_topics_guard_privileged_fields()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_admin() THEN
    NEW.is_pinned := OLD.is_pinned;
    NEW.reply_count := OLD.reply_count;
    NEW.view_count := OLD.view_count;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS forum_topics_guard_privileged_fields_trg ON public.forum_topics;
CREATE TRIGGER forum_topics_guard_privileged_fields_trg
BEFORE UPDATE ON public.forum_topics
FOR EACH ROW
EXECUTE FUNCTION public.forum_topics_guard_privileged_fields();
