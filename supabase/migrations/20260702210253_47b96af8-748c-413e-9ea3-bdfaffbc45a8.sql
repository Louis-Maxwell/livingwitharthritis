
-- Trigger functions: not meant to be called via API. Revoke from public/anon/authenticated.
-- (Triggers themselves run as table owner and are unaffected.)
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column()              FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_forum_reply()                FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.forum_replies_guard_updates()           FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.forum_topics_guard_privileged_fields()  FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.forum_topics_guard_admin_fields()       FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.buddy_matches_guard_participant_updates() FROM PUBLIC, anon, authenticated;
