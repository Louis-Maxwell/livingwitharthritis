-- Add missing user_id indexes for RLS-filtered queries
-- These tables are frequently queried by user_id in RLS policies.
-- Without these indexes, authenticated queries trigger sequential scans.

-- appointments: users query their own appointments (e.g. useAdminAppointments)
CREATE INDEX IF NOT EXISTS idx_appointments_user_id
  ON public.appointments (user_id)
  WHERE user_id IS NOT NULL;

-- donations: users query their own donations (e.g. useAdminDonations)
CREATE INDEX IF NOT EXISTS idx_donations_user_id
  ON public.donations (user_id)
  WHERE user_id IS NOT NULL;
