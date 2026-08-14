-- Add missing indexes on foreign key columns used in RLS filters
-- These tables use user_id in RLS policies (auth.uid() = user_id),
-- but lack indexes, causing full table scans on every authenticated query.

-- donations: users frequently query their own donations
CREATE INDEX IF NOT EXISTS idx_donations_user_id
  ON public.donations (user_id)
  WHERE user_id IS NOT NULL;

-- appointments: users query their own appointments
CREATE INDEX IF NOT EXISTS idx_appointments_user_id
  ON public.appointments (user_id)
  WHERE user_id IS NOT NULL;

-- user_roles: has_role() function queries this for every admin check;
-- UNIQUE (user_id, role) constraint provides partial coverage, but a single
-- user_id index accelerates role lookups even when filtering by user_id alone.
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id
  ON public.user_roles (user_id);
