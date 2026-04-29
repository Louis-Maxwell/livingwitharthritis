-- 1. Storage: drop broad SELECT policy on lighthouse-reports.
-- Public bucket files remain accessible via the public CDN URL, but the
-- storage list API will no longer enumerate objects.
drop policy if exists "Public read lighthouse reports" on storage.objects;

-- 2. Email queue helpers: restrict execution to the service role only.
revoke execute on function public.enqueue_email(text, jsonb) from public, anon, authenticated;
revoke execute on function public.read_email_batch(text, integer, integer) from public, anon, authenticated;
revoke execute on function public.delete_email(text, bigint) from public, anon, authenticated;
revoke execute on function public.move_to_dlq(text, text, bigint, jsonb) from public, anon, authenticated;

grant execute on function public.enqueue_email(text, jsonb) to service_role;
grant execute on function public.read_email_batch(text, integer, integer) to service_role;
grant execute on function public.delete_email(text, bigint) to service_role;
grant execute on function public.move_to_dlq(text, text, bigint, jsonb) to service_role;