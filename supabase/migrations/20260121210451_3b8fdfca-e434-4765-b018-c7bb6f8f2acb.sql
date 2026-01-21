-- Create services table for ServicesGrid
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    gradient TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create conditions table for ConditionsSection
CREATE TABLE public.conditions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    color TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create arthritis_types table for AboutSection
CREATE TABLE public.arthritis_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create statistics table for AboutSection
CREATE TABLE public.statistics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    number_value TEXT NOT NULL,
    label TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create physio_myths table for VirtualPhysioSection
CREATE TABLE public.physio_myths (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    myth TEXT NOT NULL,
    fact TEXT NOT NULL,
    image_url TEXT,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create donation_tiers table for DonationTiersSection
CREATE TABLE public.donation_tiers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    amount TEXT NOT NULL,
    color TEXT NOT NULL,
    benefits TEXT[] NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create fundraising_options table for FundraisingSection
CREATE TABLE public.fundraising_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.arthritis_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.physio_myths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donation_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fundraising_options ENABLE ROW LEVEL SECURITY;

-- Public read access for all CMS tables
CREATE POLICY "Anyone can view services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Anyone can view conditions" ON public.conditions FOR SELECT USING (true);
CREATE POLICY "Anyone can view arthritis_types" ON public.arthritis_types FOR SELECT USING (true);
CREATE POLICY "Anyone can view statistics" ON public.statistics FOR SELECT USING (true);
CREATE POLICY "Anyone can view physio_myths" ON public.physio_myths FOR SELECT USING (true);
CREATE POLICY "Anyone can view donation_tiers" ON public.donation_tiers FOR SELECT USING (true);
CREATE POLICY "Anyone can view fundraising_options" ON public.fundraising_options FOR SELECT USING (true);

-- Admin write access for all CMS tables
CREATE POLICY "Admins can manage services" ON public.services FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage conditions" ON public.conditions FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage arthritis_types" ON public.arthritis_types FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage statistics" ON public.statistics FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage physio_myths" ON public.physio_myths FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage donation_tiers" ON public.donation_tiers FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage fundraising_options" ON public.fundraising_options FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Seed initial data for services
INSERT INTO public.services (title, description, icon_name, gradient, display_order) VALUES
('Online Community', 'Connect with thousands affected by arthritis. Share experiences, find support, and build lasting connections.', 'Users', 'from-blue-500 to-indigo-500', 1),
('Chat to AVA', 'Get instant access to trusted information 24/7 from our AI-powered virtual assistant.', 'MessageCircle', 'from-purple-500 to-pink-500', 2),
('Conditions A-Z', 'Browse our comprehensive library of arthritis conditions with trusted symptoms and treatment guides.', 'BookOpen', 'from-orange-500 to-red-500', 3),
('Self Help Tool', 'Explore our interactive body map to learn about specific conditions and management strategies.', 'Stethoscope', 'from-cyan-500 to-blue-500', 4),
('Book Appointment', 'Schedule a consultation with our healthcare professionals for personalized care and guidance.', 'Calendar', 'from-green-500 to-emerald-500', 5),
('Support', 'Access financial aid, emotional support, and practical help for managing life with arthritis.', 'HeartHandshake', 'from-rose-500 to-pink-500', 6);

-- Seed conditions
INSERT INTO public.conditions (title, description, category, color, display_order) VALUES
('Cervical Myelopathy', 'Compression of the spinal cord at neck level due to trauma or structural changes in the neck bones.', 'Neurological', 'bg-blue-500', 1),
('Rheumatoid Arthritis', 'A chronic inflammatory disorder affecting many joints, typically on both sides of the body.', 'Rheumatology', 'bg-emerald-500', 2),
('Osteoarthritis', 'The most common form of arthritis, occurring when protective cartilage wears down over time.', 'Orthopaedic', 'bg-purple-500', 3),
('Coccydynia', 'Pain in your coccyx (tail bone), often caused by sitting or trauma to the area.', 'Pain', 'bg-red-500', 4),
('Juvenile Arthritis', 'Arthritis affecting children, causing joint swelling, pain, stiffness, and limited motion.', 'Paediatrics', 'bg-amber-500', 5),
('Cluster Headaches', 'Severe headaches that begin quickly and often affect only one side of the head.', 'Neurological', 'bg-blue-500', 6);

-- Seed arthritis types
INSERT INTO public.arthritis_types (title, description, display_order) VALUES
('Osteoarthritis', 'The most common form, often called "wear and tear" arthritis. Affects cartilage in joints, leading to pain and stiffness. Manageable with lifestyle changes.', 1),
('Rheumatoid Arthritis', 'An autoimmune disorder where the immune system attacks healthy joints. Early diagnosis and treatment prevent permanent damage.', 2),
('Psoriatic Arthritis', 'Linked to psoriasis, affecting both skin and joints. Personalized treatment plans are crucial for managing symptoms.', 3),
('Gout', 'Caused by excess uric acid forming crystals in joints. Lifestyle changes and medications effectively control flare-ups.', 4),
('Juvenile Arthritis', 'Affects children with persistent joint inflammation. Comprehensive treatment helps children lead active lives.', 5),
('Axial Spondyloarthritis', 'Inflammatory diseases primarily affecting the spine. Early diagnosis prevents further complications.', 6);

-- Seed statistics
INSERT INTO public.statistics (number_value, label, icon_name, display_order) VALUES
('60M+', 'Adults diagnosed with arthritis', 'Users', 1),
('1 in 4', 'Adults have a type of arthritis', 'Activity', 2),
('52%', 'Working age adults affected', 'Briefcase', 3),
('100+', 'Arthritis-related conditions', 'Database', 4);

-- Seed physio myths
INSERT INTO public.physio_myths (myth, fact, image_url, display_order) VALUES
('You can''t get proper treatment without seeing a physio in person.', 'Over 85–90% of patients report the same or higher satisfaction with virtual sessions. Most physio success comes through guided exercises and education—which work brilliantly over video.', '/assets/physio-myth-1.jpg', 1),
('Virtual physio won''t help real pain or serious injuries.', 'NHS-backed research shows similar results for back pain, neck issues, and sports injuries—whether in-clinic or online. Pain drops, movement improves.', '/assets/physio-myth-2.jpg', 2),
('It''s only for people who can''t travel.', 'Busy professionals, parents, and night-shift workers choose virtual because it fits their life—no more rushing across town after work.', NULL, 3),
('Online feels cold and less personal.', 'Many say it''s MORE personal! One-to-one focus, no waiting room chaos. Patients often feel they get deeper attention online.', '/assets/physio-myth-3.jpg', 4),
('You need hands-on manipulation to get better.', 'Most physio is actually education and guided exercise—both of which work just as well (sometimes better) online, where you can practice in your own space.', '/assets/physio-myth-4.jpg', 5);

-- Seed donation tiers
INSERT INTO public.donation_tiers (amount, color, benefits, display_order) VALUES
('£250+', 'from-teal-700 to-teal-500', ARRAY['Thank you on Social Media', 'Your logo on our website', 'Our ''supporter'' logo for your website', 'Certificate'], 1),
('£1000+', 'from-teal-800 to-teal-600', ARRAY['Thank you on Social Media', 'Your logo on our website', 'Our ''supporter'' logo for your website', 'Certificate', 'Taster Mental Health at Work session'], 2),
('£5000+', 'from-teal-900 to-teal-700', ARRAY['Thank you on Social Media', 'Your logo on our website', 'Our ''supporter'' logo for your website', 'Certificate', 'Taster Mental Health at Work session', 'Personal thank you from our CEO, photo opportunity and press release.'], 3);

-- Seed fundraising options
INSERT INTO public.fundraising_options (title, display_order) VALUES
('Corporate Partnerships', 1),
('Leave a gift in your Will', 2),
('Fundraising Events', 3),
('Community Fundraising', 4),
('Meet our Fundraisers', 5),
('Volunteer with Us', 6),
('Philanthropy and Major Gifts', 7);

-- Add update triggers
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_conditions_updated_at BEFORE UPDATE ON public.conditions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_arthritis_types_updated_at BEFORE UPDATE ON public.arthritis_types FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_statistics_updated_at BEFORE UPDATE ON public.statistics FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_physio_myths_updated_at BEFORE UPDATE ON public.physio_myths FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_donation_tiers_updated_at BEFORE UPDATE ON public.donation_tiers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_fundraising_options_updated_at BEFORE UPDATE ON public.fundraising_options FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();