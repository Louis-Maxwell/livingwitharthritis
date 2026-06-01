CREATE TABLE public.backlink_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  target_name TEXT NOT NULL,
  target_url TEXT NOT NULL,
  tier SMALLINT NOT NULL CHECK (tier BETWEEN 1 AND 3),
  category TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started','submitted','live','rejected')),
  submission_url TEXT,
  submitted_at TIMESTAMPTZ,
  live_at TIMESTAMPTZ,
  link_type TEXT CHECK (link_type IN ('dofollow','nofollow','citation')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.backlink_submissions TO authenticated;
GRANT ALL ON public.backlink_submissions TO service_role;

ALTER TABLE public.backlink_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view backlink submissions"
  ON public.backlink_submissions FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert backlink submissions"
  ON public.backlink_submissions FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update backlink submissions"
  ON public.backlink_submissions FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete backlink submissions"
  ON public.backlink_submissions FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_backlink_submissions_updated_at
  BEFORE UPDATE ON public.backlink_submissions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed the 20 target directories
INSERT INTO public.backlink_submissions (target_name, target_url, tier, category, link_type, status) VALUES
('Charity Commission for England & Wales', 'https://register-of-charities.charitycommission.gov.uk/', 1, 'Authority / Regulator', 'citation', 'not_started'),
('NCVO Member Directory', 'https://www.ncvo.org.uk/get-involved/membership/', 1, 'Authority / Regulator', 'nofollow', 'not_started'),
('Charity Excellence Framework', 'https://www.charityexcellence.co.uk/', 1, 'Authority / Regulator', 'dofollow', 'not_started'),
('Charity Choice', 'https://www.charitychoice.co.uk/', 1, 'Authority / Regulator', 'dofollow', 'not_started'),
('UK Fundraising Directory', 'https://fundraising.co.uk/', 1, 'Authority / Regulator', 'dofollow', 'not_started'),
('Small Charities Coalition (FSI)', 'https://www.thefsi.org/', 1, 'Authority / Regulator', 'nofollow', 'not_started'),
('GOV.UK Find a Charity', 'https://www.gov.uk/find-charity-information', 1, 'Authority / Regulator', 'citation', 'not_started'),
('OpenCharities', 'http://opencharities.org/', 1, 'Authority / Regulator', 'dofollow', 'not_started'),
('Patient.info Partner Directory', 'https://patient.info/patient-information', 2, 'Health & MSK', 'nofollow', 'not_started'),
('HealthUnlocked Communities', 'https://healthunlocked.com/', 2, 'Health & MSK', 'nofollow', 'not_started'),
('HealthTalk.org Resources', 'https://healthtalk.org/', 2, 'Health & MSK', 'citation', 'not_started'),
('Carers UK Directory', 'https://www.carersuk.org/', 2, 'Health & MSK', 'nofollow', 'not_started'),
('Age UK Local Services Hub', 'https://www.ageuk.org.uk/services/', 2, 'Health & MSK', 'nofollow', 'not_started'),
('Disability Rights UK', 'https://www.disabilityrightsuk.org/', 2, 'Health & MSK', 'nofollow', 'not_started'),
('Self Management UK', 'https://selfmanagementuk.org/', 2, 'Health & MSK', 'dofollow', 'not_started'),
('Trustpilot Business Profile', 'https://uk.trustpilot.com/', 3, 'Wellness / Lifestyle', 'nofollow', 'not_started'),
('Google Business Profile', 'https://www.google.com/business/', 3, 'Wellness / Lifestyle', 'citation', 'not_started'),
('Yell.com Health & Wellbeing', 'https://www.yell.com/', 3, 'Wellness / Lifestyle', 'nofollow', 'not_started'),
('UK Health Radio', 'https://www.ukhealthradio.com/', 3, 'Wellness / Lifestyle', 'dofollow', 'not_started'),
('The Conversation UK', 'https://theconversation.com/uk', 3, 'Wellness / Lifestyle', 'dofollow', 'not_started');