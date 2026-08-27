# Keyword Ranking Tracking Setup Guide

**Status:** 10,000 keywords imported to `tracked_keywords` table  
**Next:** Set up weekly ranking syncs from Semrush  
**Dashboard:** `/admin/rank-tracker` (ready once tracking starts)

---

## Overview

Your site has **two ranking tracking systems:**

1. **Semrush API Sync** (recommended) — Weekly automated rankings + search volume
2. **Google Search Console** (manual) — Real Google data but no automation

---

## OPTION A: Semrush (Recommended - Automated Weekly)

### Step 1: Get Semrush API Key

1. Log into [Semrush](https://semrush.com)
2. Go to **Account Settings → API**
3. Click **Create API Key**
4. Copy the key

### Step 2: Add to Environment

Add to `.env.local`:
```bash
SEMRUSH_API_KEY=your_api_key_here
```

### Step 3: Enable Weekly Sync

The system automatically runs weekly via the `seo-rank-sync` edge function. No additional setup needed.

### Step 4: Verify Sync

Check Supabase for ranking data:

```sql
-- View tracked keywords
SELECT COUNT(*) FROM tracked_keywords;
-- Should be: 10000

-- View ranking history (will populate weekly)
SELECT * FROM rank_history 
LIMIT 5;
-- Should show: keyword_id, position, ranking_url, search_volume, captured_at
```

### Step 5: Monitor Rankings Dashboard

Visit: `https://livingwitharthritis.org.uk/admin/rank-tracker`

**Dashboard shows:**
- Current ranking position for each keyword
- Search volume
- Month-over-month trend (position improving/declining)
- Page 2 keywords (#11-20) auto-flagged for refresh priority
- Click-through rate estimate

---

## OPTION B: Google Search Console (Manual - Real Data)

Google Search Console provides real search data but requires manual checks.

### Step 1: Verify Property

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select property: `livingwitharthritis.org.uk`
3. Ensure it's verified (should already be)

### Step 2: Export Search Performance

**Weekly:**
1. Go to **Performance** tab
2. Filter by **Query** (optional)
3. Download data (CSV)
4. Compare against `tracked_keywords` to find:
   - New keywords ranking
   - Positions trending up/down
   - High-impression, low-CTR keywords needing optimization

### Step 3: Create Tracking Spreadsheet

Example Google Sheets template:

| Keyword | Target URL | GSC Position | Impressions | CTR | Status |
|---------|-----------|--------------|-------------|-----|--------|
| knee exercises arthritis | /blog/knee-arthritis... | #24 | 1,375 | 0.65% | Consolidate |
| osteoarthritis | /pillar/osteoarthritis | #2 | 107 | 45% | Protect |

**Action:** Update weekly with GSC data

### Step 4: Set Up Alerts

In Google Search Console:
- **Core Web Vitals:** Alerts when issues appear
- **Coverage:** Alerts when pages drop from index
- **Enhancements:** Alerts when schema issues appear

---

## COMBINING BOTH SYSTEMS

**Recommended workflow:**

```
Week 1: Semrush syncs automated rankings → /admin/rank-tracker shows positions
        Review trending keywords (improving/declining)

Week 2: Export GSC data → Update tracking spreadsheet
        Identify discrepancies (sometimes GSC ≠ Semrush)
        Flag pages for optimization (high impressions, low CTR)

Week 3: Act on insights
        Fix top declining keywords (refresh content, add links)
        Promote top rising keywords (write about them, build backlinks)
        Investigate new keywords (add to content plan if valuable)

Week 4: Repeat
```

---

## Tracking Metrics & Goals

### Primary Metrics

| Metric | Current | 30-Day Goal | 90-Day Goal |
|--------|---------|------------|-----------|
| Keywords in top 10 | ~5 | 50-75 | 100-150 |
| Keywords in top 50 | ~30 | 100-150 | 300-400 |
| Avg position (tracked) | TBD | TBD | Decline 2-3 positions |
| Organic traffic | 10k/mo | 10.5-11k/mo | 12.5-14k/mo |

### Secondary Metrics

| Metric | Purpose | Frequency |
|--------|---------|-----------|
| **CTR by position** | Identify under-optimized titles/descriptions | Weekly |
| **Page 2 keywords** | Prioritize high-opportunity keywords (#11-20) | Weekly |
| **New rankings** | Track keyword expansion | Weekly |
| **Keyword volatility** | Detect algorithm updates/derank risk | Weekly |

---

## Dashboard Setup

### Access `/admin/rank-tracker`

1. Log into your admin account
2. Navigate to: `https://livingwitharthritis.org.uk/admin/rank-tracker`
3. View:
   - **Keyword List:** All 10,000 keywords with current rankings
   - **Trending Up/Down:** Keywords moving up/down in rankings
   - **Page 2 Keywords:** #11-20 positions (refresh priority)
   - **Charts:** Position trends over time

### Export Rankings

You can export tracking data from the dashboard:
```
Format: CSV
Columns: keyword, target_url, market, current_position, search_volume, trend
```

---

## Edge Function: `seo-rank-sync`

**Location:** `supabase/functions/seo-rank-sync/`

**What it does:**
- Runs every Sunday at 2 AM UTC (configurable)
- Fetches rankings from Semrush for all 10,000 keywords
- Updates `rank_history` table with new positions
- Calculates month-over-month trends
- Flags keywords with major changes (±5 positions)

**Configuration:**

To change sync frequency, edit `supabase/functions/seo-rank-sync/index.ts`:

```typescript
// Currently runs weekly (every Sunday 2 AM UTC)
// To change to daily: modify cron schedule
// See Supabase Edge Functions docs for cron syntax
```

**Monitor sync runs:**

In Supabase Dashboard:
1. Go to **Edge Functions**
2. Select `seo-rank-sync`
3. View **Logs** tab
4. See execution history and any errors

---

## Troubleshooting

### "No ranking data in /admin/rank-tracker"

**Cause:** Semrush sync hasn't run yet  
**Fix:**
- Semrush sync runs on Sunday 2 AM UTC
- If today is before Sunday, data appears after Sunday's run
- Check again in 24-48 hours

### "Semrush API Key invalid"

**Fix:**
1. Verify `.env.local` has correct key
2. Log into Semrush dashboard
3. Regenerate API key (Settings → API)
4. Update `.env.local` with new key
5. Restart your dev server

### "GSC shows different ranking than Semrush"

**This is normal!** Possible causes:
- **Time zone differences:** GSC shows US times; Semrush shows UTC
- **Device differences:** Semrush uses desktop; GSC shows mixed
- **Volatility:** Rankings fluctuate hourly; timing affects snapshots

**Action:** Use Semrush for consistency; use GSC for official audit

### "Keyword position jumped 10 positions overnight"

**Likely causes:**
- Algorithm update
- Competitor content published
- Your site content refresh helped
- Tracking inconsistency (time zone issue)

**Action:**
1. Check if real (GSC should confirm)
2. If rising: Celebrate! Promote related content
3. If falling: Review your content vs. top competitors

---

## Action Plan

### Immediate (This Week)
- [ ] Get Semrush API key
- [ ] Add to `.env.local`
- [ ] Verify `tracked_keywords` table has 10,000 entries
- [ ] Test `/admin/rank-tracker` loads

### Short-Term (Next 2 Weeks)
- [ ] First Semrush sync runs (watch for errors)
- [ ] Set up tracking spreadsheet
- [ ] Review initial rankings in GSC
- [ ] Identify top 20 keywords to optimize

### Ongoing (Weekly)
- [ ] Check `/admin/rank-tracker` for changes
- [ ] Export GSC data
- [ ] Compare with Semrush data
- [ ] Flag keywords for optimization
- [ ] Implement improvements

---

## Example: Interpreting Ranking Data

### Scenario 1: High Impressions, Low CTR
```
Keyword: "arthritis exercises"
Position: #8 (excellent!)
Impressions: 340/month
CTR: 2.3% (low for position #8; should be 5-8%)
```

**What it means:** People see you, but title/description isn't compelling  
**Action:** Refresh title and meta description to include power words

### Scenario 2: New Ranking
```
Keyword: "knee exercises for arthritis"  
Position: #22 (new!)
Impressions: 15/month
```

**What it means:** You're starting to rank for related keyword  
**Action:** Internal link this page from your #1 "knee exercises" article

### Scenario 3: Volatile Keyword
```
Keyword: "osteoarthritis treatment"
Week 1: #5
Week 2: #12
Week 3: #7
Week 4: #6
```

**What it means:** High volatility; algorithm testing variations  
**Action:** Ensure your content is current; don't over-optimize; let it settle

---

## Best Practices

### ✅ DO
- ✅ Check rankings weekly (consistency matters)
- ✅ Focus on keywords with high search volume first
- ✅ Target Page 2 keywords (#11-20) for quick wins
- ✅ Link freshly-rising keywords internally
- ✅ Refresh high-ranking, low-CTR content (title/meta)

### ❌ DON'T
- ❌ Obsess over daily ranking changes (too volatile)
- ❌ Over-optimize for single keywords (cannibalization)
- ❌ Ignore search volume (rank #1 for 0-volume keyword = waste)
- ❌ Forget to refresh old content (rankings decay without updates)
- ❌ Spam Semrush API (rate limits apply; once/week is enough)

---

## Support & Resources

**Questions about tracking?**
- Semrush docs: https://www.semrush.com/api
- GSC docs: https://support.google.com/webmasters/
- Your project: See `src/pages/admin/rank-tracker.tsx` for dashboard code

**Questions about ranking strategy?**
- See `AUDIT-DEEP-DIVE-FINDINGS.md` for opportunity analysis
- See `MASTER-IMPROVEMENT-ROADMAP-2026-08.md` for content planning
