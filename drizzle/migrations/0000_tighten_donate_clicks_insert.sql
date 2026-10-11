DROP POLICY IF EXISTS "Anyone can record a donate click" ON public.donate_clicks;
CREATE POLICY "Anyone can record a valid donate click"
ON public.donate_clicks FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(page_path) BETWEEN 1 AND 300
  AND page_path LIKE '/%'
  AND char_length(button_label) BETWEEN 1 AND 120
  AND char_length(destination) BETWEEN 1 AND 500
  AND created_at BETWEEN now() - interval '5 minutes' AND now() + interval '5 minutes'
);