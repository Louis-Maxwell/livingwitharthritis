
CREATE TABLE public.chat_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  message_id UUID REFERENCES public.chat_messages(id) ON DELETE CASCADE,
  conversation_id UUID REFERENCES public.chat_conversations(id) ON DELETE CASCADE,
  user_id UUID,
  session_key TEXT,
  rating SMALLINT NOT NULL CHECK (rating IN (-1, 1)),
  comment TEXT,
  user_message TEXT,
  assistant_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX chat_feedback_created_at_idx ON public.chat_feedback (created_at DESC);
CREATE INDEX chat_feedback_rating_idx ON public.chat_feedback (rating);

GRANT SELECT, INSERT ON public.chat_feedback TO anon, authenticated;
GRANT ALL ON public.chat_feedback TO service_role;

ALTER TABLE public.chat_feedback ENABLE ROW LEVEL SECURITY;

-- Anyone can submit feedback (chatbot is open to anonymous visitors)
CREATE POLICY "Anyone can insert feedback"
  ON public.chat_feedback FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Users can view their own feedback
CREATE POLICY "Users can view own feedback"
  ON public.chat_feedback FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Admins can view and manage all feedback
CREATE POLICY "Admins can view all feedback"
  ON public.chat_feedback FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can delete feedback"
  ON public.chat_feedback FOR DELETE
  TO authenticated
  USING (public.is_admin());
