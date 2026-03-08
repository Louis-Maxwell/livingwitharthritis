ALTER TABLE public.feedback_responses
  ADD COLUMN nps_score integer DEFAULT NULL,
  ADD COLUMN comment text DEFAULT NULL;

-- Update RLS insert policy to also validate new fields
DROP POLICY IF EXISTS "Anyone can submit feedback with validation" ON public.feedback_responses;
CREATE POLICY "Anyone can submit feedback with validation"
  ON public.feedback_responses
  FOR INSERT
  WITH CHECK (
    navigation_rating >= 1 AND navigation_rating <= 5
    AND speed_rating >= 1 AND speed_rating <= 5
    AND (nps_score IS NULL OR (nps_score >= 0 AND nps_score <= 10))
    AND (comment IS NULL OR length(comment) <= 2000)
  );