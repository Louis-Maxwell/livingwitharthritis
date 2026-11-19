-- Applied to the connected production database on2026-11-19 at14:21UTC.
-- Public articles remain readable. The static frontend does not use this RPC.
-- SECURITY DEFINER previously bypassed table RLS for any caller with EXECUTE.
-- A published-slug filter alone does not prevent repeated counter inflation.
BEGIN;
REVOKE EXECUTE ON FUNCTION public.increment_blog_view(text)
  FROM PUBLIC, anon, authenticated;
COMMIT;

-- Verification, expected false,false,true:
SELECT
  has_function_privilege('anon', 'public.increment_blog_view(text)', 'EXECUTE') AS anon_execute,
  has_function_privilege('authenticated', 'public.increment_blog_view(text)', 'EXECUTE') AS authenticated_execute,
  has_function_privilege('service_role', 'public.increment_blog_view(text)', 'EXECUTE') AS service_execute;

-- Actual role-switched NULL-slug calls for anon and authenticated were denied
-- with42501. They made no counter change. Administrator session was restored.
-- Keep service-role execution and existing table RLS unchanged.
-- Do not grant public execution again without a server-side abuse-control plan.
