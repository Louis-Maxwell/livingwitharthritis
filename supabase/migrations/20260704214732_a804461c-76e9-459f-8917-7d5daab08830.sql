
DROP POLICY IF EXISTS "Anyone can insert feedback" ON public.chat_feedback;

CREATE POLICY "Anyone can insert feedback"
  ON public.chat_feedback FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    -- Anonymous inserts must not set a user_id.
    -- Authenticated inserts must set user_id to their own id (or leave null).
    (auth.uid() IS NULL AND user_id IS NULL)
    OR (auth.uid() IS NOT NULL AND (user_id IS NULL OR user_id = auth.uid()))
  );
