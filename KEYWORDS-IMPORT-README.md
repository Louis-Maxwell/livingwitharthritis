# 10,000 Organic Keywords Import Guide

This guide explains how to import 10,000 arthritis-related keywords into your `tracked_keywords` Supabase table.

## Files Included

- **`keywords_for_import.csv`** — 10,000 keywords in CSV format (keyword, target_url, market, is_active)
- **`supabase/migrations/20260827_import_10000_keywords.sql`** — SQL migration for Supabase CLI
- **`scripts/import-keywords.ts`** — TypeScript import script (recommended)
- **`scripts/import-keywords.js`** — JavaScript import script (Node.js)

## Keyword Statistics

- **Total Keywords:** 10,000
- **Market:** UK (`uk`)
- **Categories Covered:**
  - Anatomy & Skeletal System
  - Joint Conditions & Disorders
  - Back & Spine Health
  - Muscle Health & Recovery
  - Anti-Inflammatory Nutrition
  - Weight Management
  - Sleep, Stress & Lifestyle
  - Supplements & Micronutrients
  - Osteoarthritis
  - Rheumatoid Arthritis
  - Other Arthritis Types
  - Living With Arthritis
  - Falls Prevention
  - Sarcopenia & Strength
  - Frailty Management

- **Keyword Types:**
  - Question-based (what is, how to, when to, why, etc.)
  - Long-tail variations (with modifiers like UK, NHS, treatment, exercises, etc.)
  - Symptom-based keywords
  - Joint-specific keywords
  - Age-specific keywords
  - Treatment and management keywords
  - Lifestyle keywords
  - Product and aid keywords
  - Occupational and activity keywords

## Import Methods

### Method 1: TypeScript Script (Recommended)

**Prerequisites:**
- Node.js installed
- `ts-node` package installed (`npm install -g ts-node`)
- CSV file in project root
- Environment variables set:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY` (from Supabase project settings)

**Steps:**

1. Ensure `keywords_for_import.csv` is in your project root:
```bash
ls keywords_for_import.csv
```

2. Set environment variables in `.env.local`:
```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

3. Run the import script:
```bash
npx ts-node scripts/import-keywords.ts
```

Expected output:
```
📋 Starting keyword import...
✓ Parsed 10000 keywords from CSV
  ✓ Batch 1/10 complete (1000 inserted)
  ✓ Batch 2/10 complete (2000 inserted)
  ...
✅ Import complete!
   Total keywords: 10000
   Inserted this run: 10000
```

### Method 2: JavaScript Script

**Prerequisites:**
- Node.js installed
- CSV parser: `npm install csv-parser`
- Environment variables set (same as Method 1)

**Steps:**

```bash
node scripts/import-keywords.js
```

### Method 3: Supabase CLI with Migration

**Prerequisites:**
- Supabase CLI installed (`brew install supabase/tap/supabase`)
- Linked Supabase project: `supabase link --project-ref your-project`

**Steps:**

1. Use psql to load the CSV into a temp table:
```bash
psql $DATABASE_URL -c "\COPY temp_keywords_import FROM 'keywords_for_import.csv' WITH (FORMAT csv, HEADER true)"
```

2. Run the migration:
```bash
supabase db push
```

### Method 4: Direct SQL (Supabase Dashboard)

1. Go to your Supabase project → SQL Editor
2. Create a temp table:
```sql
CREATE TEMP TABLE temp_keywords_import (
  keyword TEXT,
  target_url TEXT,
  market TEXT,
  is_active TEXT
);
```

3. Use the import feature to load `keywords_for_import.csv`

4. Run the insert:
```sql
INSERT INTO public.tracked_keywords (keyword, target_url, market, is_active, created_at, updated_at)
SELECT
  keyword,
  target_url,
  market,
  (is_active = 'true')::boolean,
  NOW(),
  NOW()
FROM temp_keywords_import
ON CONFLICT (keyword, market) DO NOTHING;
```

## Verification

After import, verify the keywords were added:

**Using Supabase Dashboard:**
1. Go to SQL Editor
2. Run:
```sql
SELECT COUNT(*) as total_keywords FROM public.tracked_keywords;
SELECT * FROM public.tracked_keywords LIMIT 10;
```

**Using Node.js:**
```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(url, key);
const { data: count } = await supabase
  .from('tracked_keywords')
  .select('*', { count: 'exact', head: true });

console.log(`Total keywords: ${count}`);
```

## Next Steps

### 1. Refine Target URLs
The CSV has `/blog` as a catch-all. You may want to map specific keywords to their actual target pages:

```sql
UPDATE public.tracked_keywords
SET target_url = '/blog/osteoarthritis-treatment'
WHERE keyword LIKE '%osteoarthritis%' AND keyword LIKE '%treatment%';
```

### 2. Set Up Rank Tracking
Enable Semrush sync to track ranking positions for these keywords:

```bash
# Edit .env.local
SEMRUSH_API_KEY=your_api_key
```

The `seo-rank-sync` edge function will pull weekly rankings.

### 3. Map Keywords to Content
Use the keyword-to-content mapping in your editorial workflow:

```typescript
import { useKeywordData } from '@/hooks/useKeywordData';

const { getClustersForKeyword } = useKeywordData();
const clusters = getClustersForKeyword('osteoarthritis treatment');
```

### 4. Monitor Rankings
Go to `/admin/rank-tracker` to see:
- Current ranking positions
- Search volume
- Target URLs
- Page 2 keywords (priority refresh list)

## Troubleshooting

### Error: "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set"

**Solution:** Set environment variables in `.env.local`:
```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_key
```

Get your Service Role Key from:
Supabase Dashboard → Project Settings → API Keys → Service Role (secret)

### Error: "keywords_for_import.csv not found"

**Solution:** Ensure the CSV file is in your project root directory:
```bash
cp keywords_for_import.csv /path/to/livingwitharthritis/
```

### Error: Duplicate key conflicts

**Solution:** This is handled automatically. The import uses `ON CONFLICT` to skip duplicates.

To see how many duplicates were skipped:
```sql
SELECT COUNT(*) as duplicate_keywords
FROM pg_stat_user_tables
WHERE relname = 'tracked_keywords';
```

### Import hangs or is very slow

**Solution:** Reduce batch size in the import script:
```typescript
const batchSize = 500; // Instead of 1000
```

## Support

For issues or questions:
1. Check the Supabase logs: Supabase Dashboard → Logs
2. Verify your Service Role Key has full access
3. Ensure `.env.local` is in `.gitignore` (never commit secrets)

## Data Schema Reference

The `tracked_keywords` table structure:

```sql
CREATE TABLE public.tracked_keywords (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword TEXT NOT NULL,
  target_url TEXT NOT NULL,
  market TEXT NOT NULL DEFAULT 'uk',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(keyword, market)
);
```

Related tables:
- `rank_history` — Stores ranking positions over time (linked by keyword_id)
- `content_refresh_queue` — Editorial queue for updating content
