REVOKE EXECUTE ON FUNCTION public.get_public_profile(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_donate_click_stats() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_public_profile(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.get_donate_click_stats() TO service_role;