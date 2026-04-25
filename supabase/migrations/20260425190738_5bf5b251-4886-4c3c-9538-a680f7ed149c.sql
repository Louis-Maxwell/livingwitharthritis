-- 1. DONATIONS — replace permissive anon insert with validated insert
DROP POLICY IF EXISTS "Authenticated users can create own donations" ON public.donations;

CREATE POLICY "Anyone can create validated donations"
ON public.donations
FOR INSERT
TO anon, authenticated
WITH CHECK (
  -- ownership: either guest (NULL user_id) or matches auth.uid()
  ((user_id IS NULL) OR (auth.uid() = user_id))
  -- amount sanity
  AND amount > 0 AND amount <= 100000
  -- currency whitelist
  AND currency IN ('GBP', 'USD', 'EUR')
  -- fund whitelist
  AND fund_type IN ('research', 'support', 'helpline', 'general', 'zakat')
  -- status must start as pending or completed (webhook-driven)
  AND status IN ('pending', 'completed', 'failed')
  -- field length caps (when present)
  AND (donor_name IS NULL OR length(donor_name) <= 100)
  AND (donor_email IS NULL OR (donor_email ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' AND length(donor_email) <= 255))
  AND (donor_address_line1 IS NULL OR length(donor_address_line1) <= 200)
  AND (donor_address_line2 IS NULL OR length(donor_address_line2) <= 200)
  AND (donor_city IS NULL OR length(donor_city) <= 100)
  AND (donor_postcode IS NULL OR length(donor_postcode) <= 20)
  AND (donor_country IS NULL OR length(donor_country) <= 100)
  AND (donor_location IS NULL OR length(donor_location) <= 200)
);

-- 2. APPOINTMENTS — block anonymous inserts explicitly
DROP POLICY IF EXISTS "Authenticated users can create appointments" ON public.appointments;

CREATE POLICY "Authenticated users can create own appointments"
ON public.appointments
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() IS NOT NULL
  AND auth.uid() = user_id
  AND user_id IS NOT NULL
  AND length(name) > 0 AND length(name) <= 100
  AND email ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
  AND length(email) <= 255
  AND (phone IS NULL OR length(phone) <= 30)
  AND length(appointment_type) > 0 AND length(appointment_type) <= 100
  AND length(preferred_time) > 0 AND length(preferred_time) <= 50
  AND (notes IS NULL OR length(notes) <= 2000)
  AND status = 'pending'
);

-- 3. PROFILES — restrict broad SELECT so medical 'condition' and 'bio' aren't exposed.
-- We keep a public-ish view of display_name + avatar_initial for forum context via a SECURITY DEFINER function,
-- and tighten the table policy so only the owner (or admin) can read full rows.
DROP POLICY IF EXISTS "Profiles are viewable by authenticated users" ON public.profiles;

CREATE POLICY "Users can view their own full profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (public.is_admin());

-- Public-safe lookup function for forum/community usage:
-- returns ONLY non-sensitive fields (display_name, avatar_initial), never condition/bio.
CREATE OR REPLACE FUNCTION public.get_public_profile(p_user_id uuid)
RETURNS TABLE (
  user_id uuid,
  display_name text,
  avatar_initial text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT user_id, display_name, avatar_initial
  FROM public.profiles
  WHERE user_id = p_user_id;
$$;

GRANT EXECUTE ON FUNCTION public.get_public_profile(uuid) TO authenticated, anon;