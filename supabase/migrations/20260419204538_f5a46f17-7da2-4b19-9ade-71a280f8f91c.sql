-- Create journey_chapters table
CREATE TABLE public.journey_chapters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.journey_chapters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active journey_chapters"
ON public.journey_chapters FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage journey_chapters"
ON public.journey_chapters FOR ALL USING (is_admin());

CREATE TRIGGER update_journey_chapters_updated_at
BEFORE UPDATE ON public.journey_chapters
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed chapters
INSERT INTO public.journey_chapters (year, title, description, display_order) VALUES
('2020', 'The Spark', 'Founded by NHS First Contact Practitioners to bring evidence-based osteoarthritis education and awareness to patients across the UK — outside the four walls of a clinic.', 10),
('2021', 'First 1,000 Members', 'Our resource library and peer community crossed its first thousand active members, validating the appetite for free, expert-led arthritis support.', 20),
('2022', 'Virtual Physio Launch', 'Launched free virtual physiotherapy consultations, dissolving postcode and waiting-list barriers between patients and qualified clinicians.', 30),
('2023', 'AI Symptom Guide', 'Released our AI-powered symptom assistant — built with HCPC-registered clinicians — to help users understand flare-ups and triage next steps with confidence.', 40),
('2024', '10,000+ Lives Touched', 'Surpassed 10,000 people supported across the UK with anti-inflammatory nutrition plans, joint-by-joint exercise programmes and one-to-one guidance.', 50),
('2025', 'National Partnerships', 'Began collaborating with NHS trusts and leading rheumatology bodies — embedding our tools into real patient pathways at a national scale.', 60),
('2026', 'A National Movement', 'A pivotal year of marketing, collaboration and joint campaigns with the UK''s largest health charities — multiplying our reach, deepening our impact, and turning Living With Arthritis into a household name for free, evidence-based joint care.', 70);