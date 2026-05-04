-- Featured editorial stories
CREATE TABLE public.featured_stories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  age TEXT,
  diagnosis TEXT,
  with_us_since TEXT,
  kicker TEXT NOT NULL DEFAULT 'Featured · Reader Story',
  headline TEXT NOT NULL,
  body TEXT,
  portrait_url TEXT NOT NULL,
  portrait_alt TEXT NOT NULL,
  published BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.featured_stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published stories are public"
  ON public.featured_stories
  FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated can insert stories"
  ON public.featured_stories
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update stories"
  ON public.featured_stories
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can delete stories"
  ON public.featured_stories
  FOR DELETE
  TO authenticated
  USING (true);

-- Reuse the standard updated_at trigger function if present, else create
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_featured_stories_updated_at
  BEFORE UPDATE ON public.featured_stories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_featured_stories_published
  ON public.featured_stories (published, sort_order DESC, published_at DESC);

-- Seed three editorial stories
INSERT INTO public.featured_stories
  (slug, name, location, age, diagnosis, with_us_since, headline, body, portrait_url, portrait_alt, sort_order)
VALUES
  (
    'margaret-sheffield',
    'Margaret Holloway',
    'Sheffield',
    '62',
    'Knee OA',
    'Jan 2025',
    'I was on the waiting list for sixteen months. Within a fortnight of starting here, I was walking the dog again — properly, without wincing.',
    'Margaret had spent more than a year waiting for a routine review when she found us. Eight weeks of guided knee-strengthening later, she was back on her morning loop around Endcliffe Park.',
    'https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?auto=format&fit=crop&w=1200&q=80',
    'Margaret, 62, smiling outdoors after her morning walk in Sheffield',
    30
  ),
  (
    'aisha-birmingham',
    'Aisha Rahman',
    'Birmingham',
    '47',
    'Rheumatoid Arthritis',
    'Mar 2025',
    'For the first time in years, I am not the one apologising for being slow at the school gate.',
    'Aisha balances three children, a part-time job and an autoimmune condition. The clinician-built flare plan gave her a way to predict bad days before they arrive — and a script to use with her GP.',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    'Aisha, 47, at home in Birmingham with her three children',
    20
  ),
  (
    'david-cardiff',
    'David Pritchard',
    'Cardiff',
    '71',
    'Hip OA',
    'Sep 2024',
    'I thought movement was the enemy. It turned out to be the medicine I had been refusing.',
    'David is a retired electrician who had quietly given up on his weekend coastal walks. A small daily routine — and a community of people doing the same — turned that around in three months.',
    'https://images.unsplash.com/photo-1559132311-e07e3f8c2f5e?auto=format&fit=crop&w=1200&q=80',
    'David, 71, walking the Cardiff Bay barrage',
    10
  );