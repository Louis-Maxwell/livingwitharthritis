-- Add CHECK constraint for contact_inquiries status enum

ALTER TABLE public.contact_inquiries
  ADD CONSTRAINT check_contact_inquiries_status
    CHECK (status IN ('new'));
