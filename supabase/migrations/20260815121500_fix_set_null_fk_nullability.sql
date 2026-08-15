-- The previous migration (20260815120616) added ON DELETE SET NULL foreign
-- keys from buddy_profiles/profiles/triage_assessments.user_id to
-- auth.users(id), explicitly to "allow user deletion while preserving
-- record history". But all three columns were still NOT NULL, so the
-- constraint was inert: with empty tables it applied without error, but the
-- first real auth.users deletion with a dependent row would hit "null value
-- in column \"user_id\" violates not-null constraint" and the delete would
-- fail outright — blocking exactly the account deletion this was meant to
-- support. Relaxing NOT NULL (never a backfill-requiring change, since it
-- only removes a restriction) makes SET NULL actually valid.
ALTER TABLE public.buddy_profiles ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE public.profiles ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE public.triage_assessments ALTER COLUMN user_id DROP NOT NULL;
