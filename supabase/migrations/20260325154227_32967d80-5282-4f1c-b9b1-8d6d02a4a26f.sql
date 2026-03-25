-- Lock down user_roles table with explicit deny policies
CREATE POLICY "Only service role can insert roles"
ON public.user_roles FOR INSERT
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Only service role can delete roles"
ON public.user_roles FOR DELETE
USING (auth.role() = 'service_role');

CREATE POLICY "Only service role can update roles"
ON public.user_roles FOR UPDATE
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');