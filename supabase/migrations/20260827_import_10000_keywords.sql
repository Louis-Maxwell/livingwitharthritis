-- Import 10,000 organic keywords for SEO tracking
-- This migration imports keywords from keywords_for_import.csv
-- CSV format: keyword,target_url,market,is_active

-- Create temporary table for CSV import
CREATE TEMP TABLE temp_keywords_import (
  keyword TEXT,
  target_url TEXT,
  market TEXT,
  is_active TEXT
);

-- Note: To use this migration, you'll need to:
-- 1. Load the CSV data into the temp table using a script
-- 2. Or manually insert rows from the CSV
--
-- Example using psql command line:
-- psql -d your_database_url -c "\COPY temp_keywords_import FROM 'keywords_for_import.csv' WITH (FORMAT csv, HEADER true)"
--
-- Then run:
-- psql -d your_database_url -f this_migration_file.sql

-- Insert from temp table into tracked_keywords (avoiding duplicates)
INSERT INTO public.tracked_keywords (keyword, target_url, market, is_active, created_at, updated_at)
SELECT
  keyword,
  target_url,
  market,
  CASE
    WHEN is_active = 'true' THEN true
    WHEN is_active = 'false' THEN false
    ELSE true
  END::boolean as is_active,
  NOW() as created_at,
  NOW() as updated_at
FROM temp_keywords_import
ON CONFLICT (keyword, market) DO NOTHING;

-- Clean up temp table
DROP TABLE IF EXISTS temp_keywords_import;
