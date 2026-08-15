-- Add CHECK constraints for donations table enums

ALTER TABLE public.donations
  ADD CONSTRAINT check_donations_status
    CHECK (status IN ('pending', 'completed'));

ALTER TABLE public.donations
  ADD CONSTRAINT check_donations_currency
    CHECK (currency IN ('GBP', 'USD', 'EUR'));

ALTER TABLE public.donations
  ADD CONSTRAINT check_donations_fund_type
    CHECK (fund_type IN ('general', 'research', 'support', 'helpline', 'zakat'));
