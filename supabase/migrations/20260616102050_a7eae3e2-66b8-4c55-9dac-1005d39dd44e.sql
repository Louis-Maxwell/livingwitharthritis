DROP POLICY IF EXISTS "Authors can update own topics" ON public.forum_topics;

CREATE POLICY "Authors can update own topics"
ON public.forum_topics
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (
  auth.uid() = user_id
  AND status = 'published'
  AND is_pinned = false
  AND reply_count = 0
  AND view_count = 0
);

CREATE POLICY "Admins can update any topic"
ON public.forum_topics
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());