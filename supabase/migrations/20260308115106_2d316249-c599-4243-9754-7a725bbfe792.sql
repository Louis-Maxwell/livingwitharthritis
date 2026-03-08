
-- Blog articles table for dynamic backend management
CREATE TABLE public.blog_articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'Health',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  image_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published blog articles"
  ON public.blog_articles FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can manage blog articles"
  ON public.blog_articles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Joint exercises table for dynamic backend management
CREATE TABLE public.joint_exercises (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  joint_id TEXT NOT NULL,
  exercise_name TEXT NOT NULL,
  duration TEXT NOT NULL,
  reps TEXT NOT NULL,
  description TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.joint_exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active joint exercises"
  ON public.joint_exercises FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage joint exercises"
  ON public.joint_exercises FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));
