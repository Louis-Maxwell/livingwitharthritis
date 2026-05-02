
-- Revoke broad EXECUTE on all SECURITY DEFINER helper functions, then grant back only what's needed.

-- 1. Internal helpers used by RLS policies. RLS bypasses grants, so anon/authenticated do NOT need EXECUTE.
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_public_profile(uuid) FROM PUBLIC, anon, authenticated;

-- 2. Trigger function — never needs to be called directly.
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- 3. Forum reply trigger function.
REVOKE EXECUTE ON FUNCTION public.handle_new_forum_reply() FROM PUBLIC, anon, authenticated;

-- 4. Email queue helpers — service role only.
REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.delete_email(text, bigint) TO service_role;
GRANT EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) TO service_role;

-- 5. Public counters — these ARE intentionally callable by everyone from the website.
-- Re-grant explicitly so they're not affected by any future blanket revokes.
GRANT EXECUTE ON FUNCTION public.increment_visitor_count() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.increment_blog_view(text) TO anon, authenticated;
