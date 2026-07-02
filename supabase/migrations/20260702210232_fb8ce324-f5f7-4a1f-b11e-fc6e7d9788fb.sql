
-- 1) Missing index for chat_messages RLS subquery on conversation_id
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation_id
  ON public.chat_messages(conversation_id);

-- 2) Restrict SECURITY DEFINER queue/DLQ functions from public execution.
--    These are called by cron/edge functions running as service_role and
--    must not be reachable by anon/authenticated PostgREST clients.
REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb)         FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint)         FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb)   FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.email_queue_wake()                 FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.email_queue_dispatch()             FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.enqueue_email(text, jsonb)          TO service_role;
GRANT EXECUTE ON FUNCTION public.delete_email(text, bigint)          TO service_role;
GRANT EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer)  TO service_role;
GRANT EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb)    TO service_role;
GRANT EXECUTE ON FUNCTION public.email_queue_wake()                  TO service_role;
GRANT EXECUTE ON FUNCTION public.email_queue_dispatch()              TO service_role;

-- 3) Keep public execution for functions clients legitimately call:
--    - increment_blog_view (public view counter)
--    - has_role, is_admin, get_public_profile (used inside RLS/policies)
--    - match_content (used by client for semantic search on public content)
--    No changes needed — documented for clarity.

-- 4) Contact inquiries: SELECT already admin-only, INSERT already validated.
--    Add a defensive policy so an authenticated submitter can read back
--    their own submissions if they include a user_id (currently they can't
--    read anything, which is correct — no change).

-- 5) Buddy profiles: SELECT is already owner-only + admin. Cross-user visibility
--    for matching happens through buddy_matches, not buddy_profiles — no change.
