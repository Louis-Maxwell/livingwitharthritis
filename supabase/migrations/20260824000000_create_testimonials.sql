-- Create testimonials table for displaying patient and donor stories
CREATE TABLE public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    condition TEXT,
    type TEXT NOT NULL DEFAULT 'patient', -- 'patient' or 'donor'
    quote TEXT NOT NULL,
    context TEXT,
    image_url TEXT,
    display_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Public read access for published testimonials
CREATE POLICY "Anyone can view published testimonials" ON public.testimonials
    FOR SELECT USING (is_published = true);

-- Admin write access
CREATE POLICY "Admins can manage testimonials" ON public.testimonials
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Add update trigger
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed sample testimonials
INSERT INTO public.testimonials (name, condition, type, quote, context, display_order) VALUES
('Sarah M.', 'Knee osteoarthritis', 'patient', 'After my diagnosis, I thought my active life was over. The free exercise plan from Living with Arthritis gave me back control. Three months in, I''m walking without pain again. Louis actually gets it—he''s been there.', 'London, UK', 1),
('Michael T.', 'Rheumatoid arthritis', 'patient', 'It''s not just exercises. The medication guide, the benefits advice, the community—it all made sense for the first time. My GP gave me nothing. This gave me everything.', 'Manchester, UK', 2),
('Fatima A.', 'Lumbar pain', 'patient', 'I''m in Gaza. Access to physio is impossible. These online resources are literally keeping me mobile. Thank you for making this free.', 'Gaza', 3),
('Richard H.', NULL, 'donor', 'I donate monthly because I see the direct impact. Every £10 funds another exercise plan. That''s not vague—that''s real change.', 'Corporate supporter', 4),
('Jennifer K.', NULL, 'donor', 'Louis''s story is mine. Except I didn''t have this resource. I''m funding it so no one else has to suffer like I did.', 'Monthly donor', 5);
