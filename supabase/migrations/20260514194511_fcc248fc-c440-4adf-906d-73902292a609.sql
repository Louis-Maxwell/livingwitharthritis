DROP POLICY IF EXISTS "Admins can update donations" ON public.donations;
CREATE POLICY "Admins can update donations"
ON public.donations
FOR UPDATE
USING (public.is_admin())
WITH CHECK (public.is_admin());