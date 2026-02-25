
CREATE TABLE public.feedback_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  navigation_rating INTEGER NOT NULL CHECK (navigation_rating BETWEEN 1 AND 5),
  speed_rating INTEGER NOT NULL CHECK (speed_rating BETWEEN 1 AND 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.feedback_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit feedback" ON public.feedback_responses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view feedback" ON public.feedback_responses
  FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));
