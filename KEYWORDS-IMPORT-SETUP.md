# Keyword Import Setup Guide

**Status:** Ready to import 10,000 keywords into Supabase  
**Keywords File:** `keywords_for_import.csv` (368 KB, 10,000 rows)  
**Database Table:** `tracked_keywords` (ready)  
**Import Script:** `scripts/import-keywords-simple.mjs` (no dependencies)

---

## Quick Setup (5 minutes)

### Step 1: Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Project Settings → API**
3. Copy these values:
   - **Project URL** (e.g., `https://your-project.supabase.co`)
   - **Service Role Key** (⚠️ KEEP SECRET - never commit this)

### Step 2: Create `.env.local` File

In your project root, create a `.env.local` file:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...
```

**⚠️ IMPORTANT:**
- Never commit `.env.local` to git (already in `.gitignore`)
- Never share the Service Role Key
- This file is local-only

### Step 3: Run Import

```bash
node scripts/import-keywords-simple.mjs
```

**Expected output:**
```
📋 Starting keyword import...

✓ Parsed 10000 keywords from CSV

Sample keywords:
  - "DOMS" → /blog (uk)
  - "DOMS 2026" → /blog (uk)
  - "DOMS advanced" → /blog (uk)

✅ Environment variables found
   URL: your-project.supabase.co
   Key: eyJhbGciOi...

📤 Importing keywords to Supabase...
   Total: 10000 keywords
   Batch size: 1000 keywords per request
   ✓ Batch 1/10 complete (1000 total)
   ✓ Batch 2/10 complete (2000 total)
   ...
   ✓ Batch 10/10 complete (10000 total)

✅ Import complete!
   Inserted: 10000 keywords
   Skipped (conflicts): 0 keywords
```

### Step 4: Verify Import

Open Supabase Dashboard → SQL Editor and run:

```sql
SELECT COUNT(*) as total_keywords FROM tracked_keywords;
```

Should return: `10000` (or close if some were duplicates)

---

## Troubleshooting

### "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set"

**Fix:** Make sure `.env.local` is in your project root with the correct values:
```bash
ls -la .env.local  # Should exist
cat .env.local     # Should show SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
```

### "keywords_for_import.csv not found"

**Fix:** Verify the file exists:
```bash
ls -la keywords_for_import.csv
# Output: -rw-r--r--  1 user  staff  368K  Aug 27 10:00 keywords_for_import.csv
```

### Import times out / Very slow

**Cause:** Supabase rate limiting or large batch size  
**Fix:** Try splitting batches:
- Open `scripts/import-keywords-simple.mjs`
- Change `const batchSize = 1000` → `const batchSize = 500`
- Re-run import

### Some keywords skipped due to duplicates

**This is normal!** Keywords with the same (keyword, market) pair are skipped due to the UNIQUE constraint.

Check how many were actually new:
```sql
SELECT COUNT(*) FROM tracked_keywords 
WHERE created_at > NOW() - INTERVAL '1 hour';
```

---

## Next: Set Up Ranking Tracking

Once keywords are imported, set up weekly ranking syncs:

### Option A: Manual Semrush Sync

Add to `.env.local`:
```bash
SEMRUSH_API_KEY=your_semrush_api_key
```

Semrush will automatically sync rankings weekly (see `/admin/rank-tracker`).

### Option B: Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property: `livingwitharthritis.org.uk`
3. In **Performance**, filter by new keywords
4. Compare GSC data with tracked_keywords table

---

## File Locations

| File | Purpose | Size |
|------|---------|------|
| `keywords_for_import.csv` | 10,000 keywords ready to import | 368 KB |
| `scripts/import-keywords-simple.mjs` | Import script (Node.js, no deps) | 4.2 KB |
| `scripts/import-keywords.ts` | TypeScript version (needs csv-parse) | 3.4 KB |
| `scripts/import-keywords.js` | JavaScript version (needs csv-parser) | 2.9 KB |
| `.env.local` | ⚠️ Create this with your credentials | (don't commit!) |

---

## What Happens After Import

1. **Keywords tracked:** All 10,000 appear in `tracked_keywords` table
2. **Ranking synced:** Weekly Semrush API calls populate `rank_history` table
3. **Dashboard live:** `/admin/rank-tracker` shows current rankings + trends
4. **Alert system:** Page 2 keywords (#11-20) auto-flagged for refresh priority

---

## Example .env.local (Template)

```bash
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# (Optional) Semrush for ranking tracking
SEMRUSH_API_KEY=your_semrush_api_key_here

# (Optional) Google Search Console
GSC_PROPERTY_ID=https://livingwitharthritis.org.uk
```

---

## Support

**Questions?** Refer to:
- `KEYWORDS-QUICKSTART.md` — 5-minute overview
- `KEYWORDS-IMPORT-README.md` — Complete documentation
- `KEYWORDS-SUMMARY.md` — Keyword statistics

**Blocked?** Check:
1. `.env.local` exists with correct values
2. `keywords_for_import.csv` exists and is readable
3. Supabase Service Role Key is valid (test in Dashboard)
4. Network connection is stable
