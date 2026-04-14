
-- Table to store total visitor count (single-row accumulator)
CREATE TABLE public.site_visitor_count (
  id integer PRIMARY KEY DEFAULT 1,
  total_count bigint NOT NULL DEFAULT 84000,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Seed with base count
INSERT INTO public.site_visitor_count (id, total_count) VALUES (1, 84000);

-- Enable RLS
ALTER TABLE public.site_visitor_count ENABLE ROW LEVEL SECURITY;

-- Anyone can read the count
CREATE POLICY "Anyone can view visitor count"
  ON public.site_visitor_count FOR SELECT
  TO public
  USING (true);

-- Function to atomically increment and return new count
CREATE OR REPLACE FUNCTION public.increment_visitor_count()
  RETURNS bigint
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = public
AS $$
DECLARE
  new_count bigint;
BEGIN
  UPDATE public.site_visitor_count
  SET total_count = total_count + 1, updated_at = now()
  WHERE id = 1
  RETURNING total_count INTO new_count;
  RETURN new_count;
END;
$$;
