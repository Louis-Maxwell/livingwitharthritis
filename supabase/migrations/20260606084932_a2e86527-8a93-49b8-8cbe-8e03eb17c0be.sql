CREATE TABLE IF NOT EXISTS public._blog_expansions_tmp (id uuid PRIMARY KEY, expansion text NOT NULL);
GRANT SELECT, INSERT, UPDATE, DELETE ON public._blog_expansions_tmp TO authenticated;
GRANT ALL ON public._blog_expansions_tmp TO service_role;
ALTER TABLE public._blog_expansions_tmp ENABLE ROW LEVEL SECURITY;