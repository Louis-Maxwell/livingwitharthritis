CREATE TABLE public.donate_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text NOT NULL CHECK (char_length(page_path) <= 300),
  button_label text NOT NULL CHECK (char_length(button_label) <= 120),
  destination text NOT NULL CHECK (char_length(destination) <= 500),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.donate_clicks TO anon, authenticated;
GRANT ALL ON public.donate_clicks TO service_role;
ALTER TABLE public.donate_clicks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can record a donate click" ON public.donate_clicks
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE INDEX donate_clicks_created_at_idx ON public.donate_clicks (created_at);

CREATE OR REPLACE FUNCTION public.get_donate_click_stats()
RETURNS jsonb LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT jsonb_build_object(
    'total', (SELECT count(*) FROM donate_clicks),
    'today', (SELECT count(*) FROM donate_clicks WHERE created_at >= date_trunc('day', now())),
    'last7', (SELECT count(*) FROM donate_clicks WHERE created_at >= now() - interval '7 days'),
    'last30', (SELECT count(*) FROM donate_clicks WHERE created_at >= now() - interval '30 days'),
    'byButton', COALESCE((SELECT jsonb_agg(r) FROM (SELECT button_label AS label, count(*) AS clicks FROM donate_clicks GROUP BY 1 ORDER BY 2 DESC LIMIT 20) r), '[]'::jsonb),
    'byPage', COALESCE((SELECT jsonb_agg(r) FROM (SELECT page_path AS label, count(*) AS clicks FROM donate_clicks GROUP BY 1 ORDER BY 2 DESC LIMIT 20) r), '[]'::jsonb),
    'byDay', COALESCE((SELECT jsonb_agg(r ORDER BY r.day) FROM (SELECT to_char(date_trunc('day', created_at), 'YYYY-MM-DD') AS day, count(*) AS clicks FROM donate_clicks WHERE created_at >= now() - interval '30 days' GROUP BY 1) r), '[]'::jsonb)
  );
$$;
GRANT EXECUTE ON FUNCTION public.get_donate_click_stats() TO anon, authenticated;