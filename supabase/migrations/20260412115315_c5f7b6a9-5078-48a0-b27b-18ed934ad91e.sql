
-- AI Safety Principles
CREATE TABLE public.ai_safety_principles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'shield',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.ai_safety_principles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active ai_safety_principles"
  ON public.ai_safety_principles FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage ai_safety_principles"
  ON public.ai_safety_principles FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- AI Safety FAQs
CREATE TABLE public.ai_safety_faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.ai_safety_faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active ai_safety_faqs"
  ON public.ai_safety_faqs FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage ai_safety_faqs"
  ON public.ai_safety_faqs FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- AI Safety Certifications
CREATE TABLE public.ai_safety_certifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.ai_safety_certifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active ai_safety_certifications"
  ON public.ai_safety_certifications FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage ai_safety_certifications"
  ON public.ai_safety_certifications FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));
