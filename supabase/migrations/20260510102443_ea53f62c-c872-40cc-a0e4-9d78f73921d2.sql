-- Grant EXECUTE on RLS-helper SECURITY DEFINER functions to anon/authenticated.
-- Without this, RLS policies that reference is_admin() / has_role() raise
-- "permission denied for function is_admin" for unauthenticated visitors,
-- breaking public reads (e.g. /blog).
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO anon, authenticated;