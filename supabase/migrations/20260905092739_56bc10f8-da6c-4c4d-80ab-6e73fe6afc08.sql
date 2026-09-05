CREATE TABLE public.meta_description_staging (
  slug text PRIMARY KEY,
  description text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);
GRANT ALL ON public.meta_description_staging TO service_role;
ALTER TABLE public.meta_description_staging ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage meta description staging" ON public.meta_description_staging FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));