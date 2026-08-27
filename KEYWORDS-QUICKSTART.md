# 10,000 Keywords - Quick Start ⚡

## What You've Got

✅ **10,000 organic keywords** (CSV file ready)
✅ **Import scripts** (TypeScript + JavaScript)
✅ **SQL migration** (for Supabase CLI)
✅ **Complete documentation** (setup guide + summary)

## Files Location

```
livingwitharthritis/
├── keywords_for_import.csv              ← Import this file
├── KEYWORDS-QUICKSTART.md               ← This file
├── KEYWORDS-IMPORT-README.md            ← Full setup guide
├── KEYWORDS-SUMMARY.md                  ← Background & details
├── scripts/
│   ├── import-keywords.ts               ← TypeScript import
│   └── import-keywords.js               ← JavaScript import
└── supabase/migrations/
    └── 20260827_import_10000_keywords.sql ← SQL migration
```

## Import in 3 Steps

### Step 1: Set Environment Variables

Add to `.env.local`:
```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**How to get these:**
- URL: Supabase Dashboard → Project Settings → API
- Key: Supabase Dashboard → Project Settings → API → Service Role (⚠️ KEEP SECRET)

### Step 2: Run Import Script

```bash
# Option A: TypeScript (Recommended)
npx ts-node scripts/import-keywords.ts

# Option B: JavaScript
node scripts/import-keywords.js

# Option C: Manual SQL (See KEYWORDS-IMPORT-README.md)
```

### Step 3: Verify

Check Supabase Dashboard → SQL Editor:
```sql
SELECT COUNT(*) as total FROM public.tracked_keywords;
-- Should show: 10000
```

## ⏱️ Expected Time

- Step 1 (env setup): **2 minutes**
- Step 2 (import): **1-2 minutes**
- Step 3 (verify): **1 minute**

**Total: ~5 minutes**

## What Gets Imported

| Column | Example | Notes |
|--------|---------|-------|
| keyword | "osteoarthritis treatment" | 10,000 unique terms |
| target_url | "/blog" | Can be refined later |
| market | "uk" | All UK-focused |
| is_active | true | All active by default |

## Common Issues

### "Module not found: csv-parser"

```bash
npm install csv-parser
```

### "Error: connect ECONNREFUSED"

- Verify SUPABASE_URL is correct
- Verify SUPABASE_SERVICE_ROLE_KEY is correct
- Check `.env.local` is loaded

### "Unique constraint violation"

- This is OK! Keywords that already exist are skipped
- Check the final count with:
  ```sql
  SELECT COUNT(*) FROM tracked_keywords WHERE created_at > NOW() - INTERVAL '10 minutes';
  ```

## After Import

### 1. Refine Target URLs (Optional)
Map keywords to actual article URLs:

```sql
UPDATE tracked_keywords
SET target_url = '/blog/osteoarthritis-exercises-uk'
WHERE keyword LIKE '%osteoarthritis%' AND keyword LIKE '%exercise%';
```

### 2. Start Rank Tracking (Optional)
Set up Semrush sync in `.env.local`:
```bash
SEMRUSH_API_KEY=your_api_key
```

### 3. Monitor Rankings
Go to: `yoursite.com/admin/rank-tracker`

## FAQ

**Q: Do I need to import all 10,000?**  
A: No, but it's recommended. Start with a smaller subset if you want to test.

**Q: Can I import only certain keywords?**  
A: Yes, edit the CSV before importing.

**Q: Will this overwrite existing keywords?**  
A: No, duplicates are skipped thanks to `ON CONFLICT`.

**Q: How do I update target URLs later?**  
A: Use SQL (see "Refine Target URLs" section).

**Q: When will these keywords start ranking?**  
A: 3-6 months (Google needs time to crawl and rank).

## Next: Content Optimization

Now that you have 10,000 tracked keywords:

1. **Review keyword clusters** → Focus on high-volume keywords
2. **Create pillar content** → Write deep, authoritative articles
3. **Map keywords to pages** → Each keyword → one URL (no cannibalization)
4. **Build internal links** → Connect related articles
5. **Monitor rankings** → Check `/admin/rank-tracker` weekly

## Full Documentation

- 📖 **Import guide:** `KEYWORDS-IMPORT-README.md`
- 📊 **Summary report:** `KEYWORDS-SUMMARY.md`
- 🎯 **Keyword strategy:** `docs/KEYWORD-STRATEGY.md` (existing)

## Support

If stuck:
1. Check `/admin/rank-tracker` to see if keywords are there
2. Verify Supabase connection: `npx supabase status`
3. Check database logs: Supabase Dashboard → Logs
4. Refer to full `KEYWORDS-IMPORT-README.md`

---

**Status:** ✅ Ready to import  
**Keywords:** 10,000  
**Time needed:** ~5 minutes  

**Next command to run:**
```bash
npx ts-node scripts/import-keywords.ts
```

Good luck! 🚀
