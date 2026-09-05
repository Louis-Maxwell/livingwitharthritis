-- Analytics Tables for SEO Dashboard & Click Tracking
-- Run: supabase migration up

-- Analytics Events (raw event tracking)
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL, -- 'view' | 'click' | 'engagement'
  page VARCHAR(500) NOT NULL, -- Full page path
  page_type VARCHAR(50) NOT NULL, -- 'city' | 'library' | 'article'
  slug VARCHAR(255) NOT NULL, -- Page slug
  session_id VARCHAR(255) NOT NULL, -- Session identifier
  referrer TEXT, -- HTTP referrer
  time_on_page INT, -- Seconds
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_analytics_page ON analytics_events(page);
CREATE INDEX idx_analytics_type ON analytics_events(type);
CREATE INDEX idx_analytics_page_type ON analytics_events(page_type);
CREATE INDEX idx_analytics_slug ON analytics_events(slug);
CREATE INDEX idx_analytics_created ON analytics_events(created_at DESC);
CREATE INDEX idx_analytics_session ON analytics_events(session_id);

-- Daily aggregates (for dashboard trends)
CREATE TABLE IF NOT EXISTS analytics_daily (
  date DATE PRIMARY KEY,
  traffic INT DEFAULT 0, -- Total page views
  keywords INT DEFAULT 0, -- Keywords ranking
  snippet_positions INT DEFAULT 0, -- Featured snippet count
  avg_position DECIMAL(5, 2) DEFAULT 0, -- Avg ranking position
  updated_at TIMESTAMP DEFAULT NOW()
);

-- City page traffic (aggregated)
CREATE TABLE IF NOT EXISTS city_page_metrics (
  city_slug VARCHAR(100) PRIMARY KEY,
  city_name VARCHAR(255),
  total_views INT DEFAULT 0,
  total_clicks INT DEFAULT 0,
  avg_time_on_page INT DEFAULT 0,
  bounce_rate DECIMAL(5, 2) DEFAULT 0,
  last_updated TIMESTAMP DEFAULT NOW()
);

-- Library page traffic (aggregated)
CREATE TABLE IF NOT EXISTS library_page_metrics (
  slug VARCHAR(255) PRIMARY KEY,
  total_views INT DEFAULT 0,
  total_clicks INT DEFAULT 0,
  avg_time_on_page INT DEFAULT 0,
  bounce_rate DECIMAL(5, 2) DEFAULT 0,
  click_through_rate DECIMAL(5, 2) DEFAULT 0,
  last_updated TIMESTAMP DEFAULT NOW()
);

-- SEO Analytics from Google Search Console
CREATE TABLE IF NOT EXISTS seo_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  keyword VARCHAR(500) NOT NULL,
  page VARCHAR(500) NOT NULL,
  rank_position INT, -- Google ranking position
  impressions INT DEFAULT 0,
  clicks INT DEFAULT 0,
  ctr DECIMAL(5, 2) DEFAULT 0, -- Click-through rate
  snippet_type VARCHAR(50), -- 'featured' | 'faq' | 'knowledge'
  is_featured_snippet BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(date, keyword, page)
);

-- Create indexes for SEO analytics
CREATE INDEX idx_seo_date ON seo_analytics(date DESC);
CREATE INDEX idx_seo_keyword ON seo_analytics(keyword);
CREATE INDEX idx_seo_page ON seo_analytics(page);
CREATE INDEX idx_seo_position ON seo_analytics(rank_position);
CREATE INDEX idx_seo_featured ON seo_analytics(is_featured_snippet);

-- Featured snippets tracking
CREATE TABLE IF NOT EXISTS featured_snippets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID, -- Reference to blog article
  keyword VARCHAR(500) NOT NULL,
  page VARCHAR(500) NOT NULL,
  snippet_type VARCHAR(50) NOT NULL, -- 'featured_box' | 'faq_box' | 'knowledge_panel'
  answer_text TEXT, -- The snippet answer
  featured BOOLEAN DEFAULT FALSE, -- Currently featured?
  position INT DEFAULT 0, -- Current SERP position
  impressions INT DEFAULT 0,
  clicks INT DEFAULT 0,
  date_featured DATE, -- When it was featured
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for snippets
CREATE INDEX idx_snippets_page ON featured_snippets(page);
CREATE INDEX idx_snippets_featured ON featured_snippets(featured);
CREATE INDEX idx_snippets_keyword ON featured_snippets(keyword);

-- Integrations (for Google Search Console connection)
CREATE TABLE IF NOT EXISTS integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(100) NOT NULL UNIQUE, -- 'google_search_console'
  config JSONB, -- OAuth tokens and settings
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Google Search Console sync status
CREATE TABLE IF NOT EXISTS gsc_sync_status (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  last_sync TIMESTAMP,
  date_range_start DATE,
  date_range_end DATE,
  status VARCHAR(50), -- 'pending' | 'syncing' | 'success' | 'error'
  error_message TEXT,
  rows_synced INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create a view for city traffic summary
CREATE OR REPLACE VIEW city_traffic_summary AS
SELECT
  city_slug,
  city_name,
  total_views,
  total_clicks,
  CASE WHEN total_views > 0 THEN (total_clicks::DECIMAL / total_views) ELSE 0 END as ctr,
  avg_time_on_page,
  bounce_rate,
  last_updated
FROM city_page_metrics
ORDER BY total_clicks DESC;

-- Create a view for library traffic summary
CREATE OR REPLACE VIEW library_traffic_summary AS
SELECT
  slug,
  total_views,
  total_clicks,
  CASE WHEN total_views > 0 THEN (total_clicks::DECIMAL / total_views) ELSE 0 END as ctr,
  avg_time_on_page,
  bounce_rate,
  click_through_rate,
  last_updated
FROM library_page_metrics
ORDER BY total_clicks DESC;

-- Create a view for top keywords
CREATE OR REPLACE VIEW top_keywords AS
SELECT
  keyword,
  ROUND(AVG(rank_position)::NUMERIC, 1) as avg_position,
  SUM(impressions) as total_impressions,
  SUM(clicks) as total_clicks,
  ROUND(AVG(ctr)::NUMERIC, 2) as avg_ctr,
  COUNT(DISTINCT page) as page_count,
  COUNT(CASE WHEN is_featured_snippet THEN 1 END) as featured_count
FROM seo_analytics
WHERE date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY keyword
ORDER BY total_clicks DESC;

-- Create a view for featured snippets
CREATE OR REPLACE VIEW featured_snippets_summary AS
SELECT
  keyword,
  snippet_type,
  page,
  position,
  featured,
  impressions,
  clicks,
  CASE WHEN impressions > 0 THEN (clicks::DECIMAL / impressions) ELSE 0 END as ctr
FROM featured_snippets
WHERE featured = TRUE
ORDER BY clicks DESC;

-- Grant RLS policies
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE city_page_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE library_page_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_snippets ENABLE ROW LEVEL SECURITY;

-- Public read access for dashboard
CREATE POLICY "Allow public read analytics_events" ON analytics_events
  FOR SELECT USING (true);

CREATE POLICY "Allow public read city_metrics" ON city_page_metrics
  FOR SELECT USING (true);

CREATE POLICY "Allow public read library_metrics" ON library_page_metrics
  FOR SELECT USING (true);

CREATE POLICY "Allow public read seo_analytics" ON seo_analytics
  FOR SELECT USING (true);

CREATE POLICY "Allow public read snippets" ON featured_snippets
  FOR SELECT USING (true);

-- Function to update city metrics aggregates (called after events inserted)
CREATE OR REPLACE FUNCTION update_city_metrics()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.page_type = 'city' THEN
    INSERT INTO city_page_metrics (city_slug, total_views, total_clicks, avg_time_on_page)
    VALUES (
      NEW.slug,
      CASE WHEN NEW.type = 'view' THEN 1 ELSE 0 END,
      CASE WHEN NEW.type = 'click' THEN 1 ELSE 0 END,
      COALESCE(NEW.time_on_page, 0)
    )
    ON CONFLICT (city_slug) DO UPDATE SET
      total_views = city_page_metrics.total_views + CASE WHEN NEW.type = 'view' THEN 1 ELSE 0 END,
      total_clicks = city_page_metrics.total_clicks + CASE WHEN NEW.type = 'click' THEN 1 ELSE 0 END,
      last_updated = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update metrics after events
CREATE TRIGGER trigger_update_city_metrics
AFTER INSERT ON analytics_events
FOR EACH ROW
EXECUTE FUNCTION update_city_metrics();

-- Function to update daily aggregates
CREATE OR REPLACE FUNCTION update_daily_aggregates()
RETURNS TRIGGER AS $$
DECLARE
  v_date DATE;
  v_traffic INT;
BEGIN
  v_date := DATE(NEW.created_at);

  SELECT COUNT(*) INTO v_traffic
  FROM analytics_events
  WHERE DATE(created_at) = v_date AND type = 'view';

  INSERT INTO analytics_daily (date, traffic)
  VALUES (v_date, v_traffic)
  ON CONFLICT (date) DO UPDATE SET
    traffic = EXCLUDED.traffic,
    updated_at = NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for daily aggregates
CREATE TRIGGER trigger_daily_aggregates
AFTER INSERT ON analytics_events
FOR EACH ROW
EXECUTE FUNCTION update_daily_aggregates();

-- Comment on tables
COMMENT ON TABLE analytics_events IS 'Raw analytics events (views, clicks, engagement)';
COMMENT ON TABLE city_page_metrics IS 'Aggregated metrics for city pages';
COMMENT ON TABLE library_page_metrics IS 'Aggregated metrics for library pages';
COMMENT ON TABLE seo_analytics IS 'SEO data from Google Search Console';
COMMENT ON TABLE featured_snippets IS 'Featured snippet tracking';
