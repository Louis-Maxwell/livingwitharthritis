-- Add Gift Aid and donor address fields to donations table
ALTER TABLE public.donations
  ADD COLUMN IF NOT EXISTS gift_aid boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS donor_address_line1 text,
  ADD COLUMN IF NOT EXISTS donor_address_line2 text,
  ADD COLUMN IF NOT EXISTS donor_city text,
  ADD COLUMN IF NOT EXISTS donor_postcode text,
  ADD COLUMN IF NOT EXISTS stripe_session_id text;

-- Add index for Stripe session lookups (webhook deduplication)
CREATE INDEX IF NOT EXISTS idx_donations_stripe_session_id ON public.donations(stripe_session_id);
