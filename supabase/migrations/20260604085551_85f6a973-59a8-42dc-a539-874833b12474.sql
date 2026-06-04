
-- Enable pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- Content embeddings table
CREATE TABLE IF NOT EXISTS public.content_embeddings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  source_type TEXT NOT NULL,
  source_slug TEXT NOT NULL,
  chunk_index INTEGER NOT NULL DEFAULT 0,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  snippet TEXT NOT NULL,
  content TEXT NOT NULL,
  checksum TEXT NOT NULL,
  embedding vector(1536),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (source_type, source_slug, chunk_index)
);

-- Grants (public read because content is public; writes are service-role only)
GRANT SELECT ON public.content_embeddings TO anon, authenticated;
GRANT ALL ON public.content_embeddings TO service_role;

-- RLS
ALTER TABLE public.content_embeddings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read content embeddings"
  ON public.content_embeddings
  FOR SELECT
  USING (true);

-- HNSW index for cosine similarity
CREATE INDEX IF NOT EXISTS content_embeddings_embedding_idx
  ON public.content_embeddings
  USING hnsw (embedding vector_cosine_ops);

CREATE INDEX IF NOT EXISTS content_embeddings_source_idx
  ON public.content_embeddings (source_type, source_slug);

-- Updated-at trigger
CREATE TRIGGER content_embeddings_set_updated_at
  BEFORE UPDATE ON public.content_embeddings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Similarity search function
CREATE OR REPLACE FUNCTION public.match_content(
  query_embedding vector(1536),
  match_count INT DEFAULT 8,
  filter_source_type TEXT DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  source_type TEXT,
  source_slug TEXT,
  url TEXT,
  title TEXT,
  snippet TEXT,
  similarity FLOAT
)
LANGUAGE sql
STABLE
SET search_path = public
AS $$
  SELECT
    ce.id,
    ce.source_type,
    ce.source_slug,
    ce.url,
    ce.title,
    ce.snippet,
    1 - (ce.embedding <=> query_embedding) AS similarity
  FROM public.content_embeddings ce
  WHERE ce.embedding IS NOT NULL
    AND (filter_source_type IS NULL OR ce.source_type = filter_source_type)
  ORDER BY ce.embedding <=> query_embedding
  LIMIT match_count;
$$;

GRANT EXECUTE ON FUNCTION public.match_content(vector, INT, TEXT) TO anon, authenticated, service_role;
