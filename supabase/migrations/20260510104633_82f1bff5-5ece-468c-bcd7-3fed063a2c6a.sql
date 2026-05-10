-- Restrict featured_stories writes to admins only
DROP POLICY IF EXISTS "Authenticated can insert stories" ON public.featured_stories;
DROP POLICY IF EXISTS "Authenticated can update stories" ON public.featured_stories;
DROP POLICY IF EXISTS "Authenticated can delete stories" ON public.featured_stories;

CREATE POLICY "Admins can insert stories"
ON public.featured_stories
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update stories"
ON public.featured_stories
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete stories"
ON public.featured_stories
FOR DELETE
TO authenticated
USING (public.is_admin());

-- Lock down writes to the public exercise-videos storage bucket (admins/service-role only)
CREATE POLICY "Admins can upload exercise videos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'exercise-videos' AND public.is_admin());

CREATE POLICY "Admins can update exercise videos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'exercise-videos' AND public.is_admin())
WITH CHECK (bucket_id = 'exercise-videos' AND public.is_admin());

CREATE POLICY "Admins can delete exercise videos"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'exercise-videos' AND public.is_admin());
