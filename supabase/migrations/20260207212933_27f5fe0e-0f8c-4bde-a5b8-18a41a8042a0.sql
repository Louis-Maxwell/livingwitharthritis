
CREATE TABLE public.about_us_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.about_us_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view about_us_sections"
ON public.about_us_sections FOR SELECT USING (true);

CREATE POLICY "Admins can manage about_us_sections"
ON public.about_us_sections FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_about_us_sections_updated_at
BEFORE UPDATE ON public.about_us_sections
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.about_us_sections (title, content, display_order) VALUES
('The Scale of Arthritis', 'According to statistics from the past 10 years, arthritis affects more than 63% of people over 70 years. But this is not a reason to consider the disease purely age-related. Across the planet, arthritis affects several tens of millions of people, and these dismal figures are soaring. And, according to WHO, soon the day will come when one-third of the inhabitants of the Earth will be affected by this disease.', 1),
('The Unknown Cause', 'But even more startling facts are as follows. Doctors still cannot pinpoint the exact causes of the disease. And today, there are absolutely no medicines that can fully heal, for example, rheumatoid arthritis.', 2),
('Current Treatments', 'Arthritis is treated with medical approaches including NSAIDs (aspirin, ibuprofen) and chondroprotectors. Physical therapy and many traditional remedies also help manage symptoms and improve quality of life.', 3),
('Our Commitment', 'Doclandmed.com recommends only those doctors and technology which are recognised as best in the world. Living With Arthritis is dedicated to providing trusted, evidence-based resources to help you manage your condition with confidence.', 4);
