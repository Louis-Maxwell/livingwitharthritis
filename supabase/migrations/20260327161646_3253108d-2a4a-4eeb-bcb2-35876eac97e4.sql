
CREATE TABLE public.volunteer_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  area_of_interest text NOT NULL,
  message text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.volunteer_signups ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a volunteer sign-up with validation
CREATE POLICY "Anyone can submit volunteer signup"
  ON public.volunteer_signups FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(name) > 0 AND length(name) <= 100
    AND email ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    AND length(email) <= 255
    AND length(area_of_interest) > 0 AND length(area_of_interest) <= 100
    AND (message IS NULL OR length(message) <= 2000)
  );

-- Admins can view all signups
CREATE POLICY "Admins can view volunteer signups"
  ON public.volunteer_signups FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

-- Admins can manage signups
CREATE POLICY "Admins can manage volunteer signups"
  ON public.volunteer_signups FOR ALL
  USING (has_role(auth.uid(), 'admin'));
