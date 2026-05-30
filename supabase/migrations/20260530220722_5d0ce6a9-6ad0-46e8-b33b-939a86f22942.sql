
-- Phase 3: Rank tracking
CREATE TABLE public.tracked_keywords (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  keyword TEXT NOT NULL,
  target_url TEXT NOT NULL,
  market TEXT NOT NULL DEFAULT 'uk',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (keyword, market)
);

GRANT SELECT ON public.tracked_keywords TO authenticated;
GRANT ALL ON public.tracked_keywords TO service_role;

ALTER TABLE public.tracked_keywords ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage tracked_keywords"
ON public.tracked_keywords FOR ALL
USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "Admins can view tracked_keywords"
ON public.tracked_keywords FOR SELECT
USING (is_admin());

CREATE TRIGGER trg_tracked_keywords_updated
BEFORE UPDATE ON public.tracked_keywords
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.rank_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  keyword_id UUID NOT NULL REFERENCES public.tracked_keywords(id) ON DELETE CASCADE,
  position INTEGER,
  ranking_url TEXT,
  search_volume INTEGER,
  captured_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_rank_history_keyword_captured
ON public.rank_history (keyword_id, captured_at DESC);

GRANT SELECT ON public.rank_history TO authenticated;
GRANT ALL ON public.rank_history TO service_role;

ALTER TABLE public.rank_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view rank_history"
ON public.rank_history FOR SELECT
USING (is_admin());

CREATE POLICY "Service role can insert rank_history"
ON public.rank_history FOR INSERT
WITH CHECK (auth.role() = 'service_role');

-- Phase 4: Content freshness queue
CREATE TABLE public.content_refresh_queue (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  original_intro TEXT,
  ai_rewritten_intro TEXT,
  notes TEXT,
  queued_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID,
  CONSTRAINT content_refresh_queue_status_check
    CHECK (status IN ('pending', 'approved', 'rejected'))
);

CREATE INDEX idx_content_refresh_status ON public.content_refresh_queue (status, queued_at DESC);

GRANT SELECT, UPDATE ON public.content_refresh_queue TO authenticated;
GRANT ALL ON public.content_refresh_queue TO service_role;

ALTER TABLE public.content_refresh_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage refresh queue"
ON public.content_refresh_queue FOR ALL
USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "Service role inserts refresh queue"
ON public.content_refresh_queue FOR INSERT
WITH CHECK (auth.role() = 'service_role');
