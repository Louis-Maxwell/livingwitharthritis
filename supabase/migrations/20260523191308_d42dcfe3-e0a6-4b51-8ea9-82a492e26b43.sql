CREATE POLICY "Admins can delete lighthouse reports"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'lighthouse-reports' AND public.is_admin());