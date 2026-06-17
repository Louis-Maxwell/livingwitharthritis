CREATE TABLE public.quiz_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  joint text NOT NULL,
  pain_level int NOT NULL CHECK (pain_level BETWEEN 0 AND 10),
  stiffness_minutes int NOT NULL CHECK (stiffness_minutes >= 0),
  activity_goal text NOT NULL,
  age_band text NOT NULL,
  email text,
  plan jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.quiz_submissions TO anon, authenticated;
GRANT ALL ON public.quiz_submissions TO service_role;

ALTER TABLE public.quiz_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a quiz"
  ON public.quiz_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view submissions"
  ON public.quiz_submissions
  FOR SELECT
  TO authenticated
  USING (public.is_admin());