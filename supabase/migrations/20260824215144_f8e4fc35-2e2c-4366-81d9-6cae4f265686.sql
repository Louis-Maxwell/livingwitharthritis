CREATE TABLE public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  condition text,
  type text not null default 'patient' check (type in ('patient','donor')),
  quote text not null,
  context text,
  image_url text,
  display_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
GRANT SELECT ON public.testimonials TO anon;
GRANT SELECT ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published testimonials are readable by everyone"
  ON public.testimonials FOR SELECT
  USING (is_published = true);

CREATE TABLE public.email_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  subscribed_sequences text[] not null default '{}',
  source text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
GRANT INSERT ON public.email_subscriptions TO anon;
GRANT INSERT ON public.email_subscriptions TO authenticated;
GRANT ALL ON public.email_subscriptions TO service_role;
ALTER TABLE public.email_subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can subscribe"
  ON public.email_subscriptions FOR INSERT
  WITH CHECK (true);