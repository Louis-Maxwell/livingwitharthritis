
-- Fix appointments: require authentication for INSERT
DROP POLICY IF EXISTS "Anyone can create appointments" ON public.appointments;

CREATE POLICY "Authenticated users can create appointments"
ON public.appointments
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Fix donations: require authentication for INSERT  
DROP POLICY IF EXISTS "Anyone can create donations" ON public.donations;

CREATE POLICY "Authenticated users can create donations"
ON public.donations
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Ensure admins can still see all appointments (already exists but confirm)
-- Add policy so anonymous/null user_id appointments are only visible to admins (covered by existing admin policy)
