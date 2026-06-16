-- Restrict content_embeddings to admin/service role reads only.
DROP POLICY IF EXISTS "Public can read content embeddings" ON public.content_embeddings;

CREATE POLICY "Admins can read content embeddings"
  ON public.content_embeddings
  FOR SELECT
  TO authenticated
  USING (public.is_admin());
-- service_role bypasses RLS, so edge functions (index-content, chat RAG) continue to work via SECURITY DEFINER / service key.

REVOKE SELECT ON public.content_embeddings FROM anon;