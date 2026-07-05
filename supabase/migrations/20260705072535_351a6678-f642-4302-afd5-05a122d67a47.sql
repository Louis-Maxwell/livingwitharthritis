DROP POLICY IF EXISTS "Anyone can insert feedback" ON public.chat_feedback;
CREATE POLICY "Anyone can insert feedback"
  ON public.chat_feedback FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    ((auth.uid() IS NULL AND user_id IS NULL) OR
     (auth.uid() IS NOT NULL AND (user_id IS NULL OR user_id = auth.uid())))
    AND (comment IS NULL OR length(comment) <= 1000)
    AND (user_message IS NULL OR length(user_message) <= 4000)
    AND (assistant_message IS NULL OR length(assistant_message) <= 8000)
  );