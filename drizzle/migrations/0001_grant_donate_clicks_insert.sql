GRANT INSERT ON public.donate_clicks TO anon, authenticated;
GRANT ALL ON public.donate_clicks TO service_role;
REVOKE EXECUTE ON FUNCTION public.get_donate_click_stats() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_donate_click_stats() TO anon, authenticated, service_role;