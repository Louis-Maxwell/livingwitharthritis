-- Add CHECK constraints for fundraising_inquiries table enums

ALTER TABLE public.fundraising_inquiries
  ADD CONSTRAINT check_fundraising_inquiries_status
    CHECK (status IN ('new'));

ALTER TABLE public.fundraising_inquiries
  ADD CONSTRAINT check_fundraising_inquiries_inquiry_type
    CHECK (inquiry_type IN ('Corporate Partnership - Bronze', 'Corporate Partnership - Silver', 'Corporate Partnership - Gold', 'Corporate Partnership - Platinum', 'Matched Giving', 'Charity of the Year', 'Payroll Giving', 'Other'));
