-- Enforce donation idempotency at the database level, as a backstop to the
-- application-level check in process-donation/index.ts. Stripe retries
-- webhook delivery on timeout/non-2xx/slow response, which is normal; without
-- a unique constraint a retry could insert a second donation row for the same
-- checkout session. Postgres unique indexes treat NULLs as distinct from one
-- another, so rows without a stripe_session_id (non-Stripe donation paths)
-- are unaffected.
CREATE UNIQUE INDEX IF NOT EXISTS uq_donations_stripe_session_id
  ON public.donations (stripe_session_id)
  WHERE stripe_session_id IS NOT NULL;
