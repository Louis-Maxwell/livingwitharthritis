
CREATE TABLE public.face_stories (
  id text PRIMARY KEY,
  title text NOT NULL,
  eyebrow text NOT NULL,
  quote text NOT NULL,
  attribution text NOT NULL,
  region text NOT NULL,
  age_band text NOT NULL,
  condition text NOT NULL,
  image_url text NOT NULL,
  alt_text text NOT NULL,
  cta_label text NOT NULL,
  cta_href text NOT NULL,
  fund_type text,
  is_feature boolean NOT NULL DEFAULT false,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.face_stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active face_stories"
ON public.face_stories FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage face_stories"
ON public.face_stories FOR ALL
USING (is_admin());

CREATE TRIGGER update_face_stories_updated_at
BEFORE UPDATE ON public.face_stories
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.faces_trust_facts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  value text NOT NULL,
  label text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.faces_trust_facts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active faces_trust_facts"
ON public.faces_trust_facts FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage faces_trust_facts"
ON public.faces_trust_facts FOR ALL
USING (is_admin());

CREATE TRIGGER update_faces_trust_facts_updated_at
BEFORE UPDATE ON public.faces_trust_facts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.face_stories (id, title, eyebrow, quote, attribution, region, age_band, condition, image_url, alt_text, cta_label, cta_href, fund_type, is_feature, display_order) VALUES
('margaret-leeds',
 'Walking the dog used to hurt. Now it''s the best part of my day.',
 'Lived experience · Knee osteoarthritis',
 'After twelve weeks of guided knee strengthening — five minutes, twice a day — I''m back on the canal path before breakfast. The pain didn''t vanish; it just stopped running my mornings.',
 'Composite story — woman, 68, retired teacher',
 'Leeds, West Yorkshire', '65–74', 'Bilateral knee osteoarthritis',
 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&q=80',
 'Older woman in soft natural light, gentle smile, candid documentary portrait',
 'Read lived experiences', '/lived-experiences', 'support', true, 1),
('david-glasgow',
 'The waiting list felt endless. The helpline didn''t.',
 'Helpline · Rheumatology waiting list',
 'Fourteen months on a hip clinic list is a long time to feel forgotten. The team kept me moving, helped me prepare for surgery, and answered the phone on a Sunday — none of it cost a penny.',
 'Composite story — man, 71, former bus driver',
 'Glasgow, Scotland', '65–74', 'Severe hip osteoarthritis',
 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
 'Older man at home, thoughtful expression, soft window light, candid portrait',
 'How the helpline supports you', '/services', 'helpline', false, 2),
('amara-london',
 'My grandkids asked why nan can''t kneel. Now I have answers — and exercises.',
 'Community · Multi-generational',
 'Joining the community gave me a vocabulary for the pain and a routine my whole family understands. My six-year-old grandson now leads my morning stretches. He''s a fierce coach.',
 'Composite story — woman, 62, surgery receptionist',
 'South London', '55–64', 'Polyarticular osteoarthritis',
 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80',
 'Multi-generational hands together, warm tones, family connection',
 'Join the community', '/community-hub', 'support', false, 3),
('rhian-cardiff',
 'Two friends, one diagnosis, a thousand small wins.',
 'Peer support · Movement',
 'We swapped scrolling for walking. Twenty minutes outdoors, four mornings a week, rain or Welsh drizzle. Eight weeks in, both our pain scores had dropped — and we''d gained a habit we actually enjoy.',
 'Composite story — women, 50s, neighbours',
 'Cardiff, Wales', '50–59', 'Early-stage knee osteoarthritis',
 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80',
 'Two women walking outdoors in warm afternoon light, candid documentary style',
 'Find an exercise plan', '/exercise-hub', 'support', false, 4);

INSERT INTO public.faces_trust_facts (value, label, display_order) VALUES
('10M+', 'people in the UK live with arthritis', 1),
('8.5M', 'adults affected by osteoarthritis', 2),
('1 in 6', 'GP appointments are arthritis-related', 3),
('100%', 'of our online resources free to access', 4);
