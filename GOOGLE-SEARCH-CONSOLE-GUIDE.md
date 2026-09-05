# Google Search Console: Complete Submission Guide
**Objective:** Submit sitemap and request indexing for city pages  
**Timeline:** 15 minutes  
**Expected Impact:** Immediate crawl priority + indexing within 7 days

---

## PRE-SUBMISSION CHECKLIST

Before submitting to Google, verify:

### Local Verification
```bash
# 1. Verify sitemap.xml is valid
curl https://livingwitharthritis.org.uk/sitemap.xml | head -20

# Should show:
# <?xml version="1.0" encoding="UTF-8"?>
# <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

# 2. Verify sitemap has 1,167 URLs
curl https://livingwitharthritis.org.uk/sitemap.xml | grep -c "<url>"
# Should show: 1,167

# 3. Verify city pages are in sitemap
curl https://livingwitharthritis.org.uk/sitemap.xml | grep "arthritis-support" | wc -l
# Should show: 51

# 4. Test 5 random city pages load
curl -I https://livingwitharthritis.org.uk/arthritis-support/london
# Should show: 200 OK

curl -I https://livingwitharthritis.org.uk/arthritis-support/manchester
# Should show: 200 OK
```

### Website Requirements
- [ ] HTTPS enabled (not HTTP)
- [ ] Domain verified in GSC
- [ ] robots.txt allows /arthritis-support/
- [ ] No crawl errors in GSC
- [ ] Site loads quickly (< 3 sec)

---

## STEP-BY-STEP SUBMISSION

### STEP 1: Access Google Search Console

**URL:** https://search.google.com/search-console

**Log in with:**
- Your Google account (info@livingwitharthritis.org.uk recommended)
- If not yet verified, verify property first

**Select property:**
- livingwitharthritis.org.uk (or your domain)

**Navigate to:**
- Left sidebar → "Sitemaps"

---

### STEP 2: Add Sitemap

**Location:** Google Search Console → Sitemaps section

**What to do:**
1. Click "Add a new sitemap"
2. Enter URL: `https://livingwitharthritis.org.uk/sitemap.xml`
3. Click "SUBMIT"

**Expected Result:**
- Status changes from "Pending" to "Success" (1-2 minutes)
- Shows: "Your sitemap has been successfully submitted"

**Screenshot Timeline:**
```
Before: [Add a new sitemap] [no sitemaps listed]
After:  [Sitemaps] → [sitemap.xml] → [Status: Success]
        [Last read: Today at 2:34 PM]
        [URLs indexed: 1,167]
```

---

### STEP 3: Monitor Coverage Report

**Navigate to:**
- Left sidebar → "Coverage"

**What you'll see:**
```
Status:
├─ Success: ~1,167 URLs
├─ Excluded: 0-50 URLs
├─ Errors: 0 URLs
└─ Valid with warnings: 0 URLs
```

**Expected Timeline:**
- Hour 0: New URLs showing as "Discovered - currently not indexed"
- Hour 1-6: Crawling in progress
- Day 1: ~500-1,000 URLs indexed
- Day 2-7: Remaining URLs indexed
- Week 2: All 1,167 URLs indexed

**What if numbers don't grow?**
1. Re-submit sitemap
2. Check robots.txt allows crawling
3. Verify no crawl errors
4. Request indexing manually (see Step 4)

---

### STEP 4: Request Indexing (Critical)

This is the key to fast indexing! Don't skip this step.

**Navigate to:**
- Left sidebar → "URL Inspection"

**For Each Key URL:**

#### Priority 1: Major Cities (Top 10)
Request indexing for:
1. `https://livingwitharthritis.org.uk/arthritis-support/london`
2. `https://livingwitharthritis.org.uk/arthritis-support/manchester`
3. `https://livingwitharthritis.org.uk/arthritis-support/birmingham`
4. `https://livingwitharthritis.org.uk/arthritis-support/leeds`
5. `https://livingwitharthritis.org.uk/arthritis-support/sheffield`
6. `https://livingwitharthritis.org.uk/arthritis-support/edinburgh`
7. `https://livingwitharthritis.org.uk/arthritis-support/bristol`
8. `https://livingwitharthritis.org.uk/arthritis-support/cardiff`
9. `https://livingwitharthritis.org.uk/arthritis-support/belfast`
10. `https://livingwitharthritis.org.uk/arthritis-support/brighton`

#### Priority 2: Hub Pages (9)
1. `https://livingwitharthritis.org.uk/library/osteoarthritis-hub`
2. `https://livingwitharthritis.org.uk/library/rheumatoid-arthritis-hub`
3. `https://livingwitharthritis.org.uk/library/pain-management-hub`
4. `https://livingwitharthritis.org.uk/library/exercise-hub`
5. `https://livingwitharthritis.org.uk/library/nutrition-hub`
6. `https://livingwitharthritis.org.uk/library/mental-health-hub`
7. `https://livingwitharthritis.org.uk/library/arthritis-types-hub`
8. `https://livingwitharthritis.org.uk/library/treatments-hub`
9. `https://livingwitharthritis.org.uk/library/living-well-hub`

#### Priority 3: Regional Hubs (5)
1. `https://livingwitharthritis.org.uk/arthritis-support/london`
2. `https://livingwitharthritis.org.uk/arthritis-support/southeast`
3. `https://livingwitharthritis.org.uk/arthritis-support/midlands`
4. `https://livingwitharthritis.org.uk/arthritis-support/northwest`
5. `https://livingwitharthritis.org.uk/arthritis-support/scotland`

**How to Request Indexing:**

1. Go to URL Inspection
2. Paste URL into search box
3. Press Enter
4. Wait for "URL is not on Google" or similar message
5. Click "Request indexing" button
6. Confirm (may take 30 seconds)
7. Move to next URL

**Total Time:** ~2-3 minutes for 20-30 URLs

**Expected Response:**
- Success: "Inspection result updated"
- May take 30 seconds per URL
- Continue to next URL after each success

---

### STEP 5: Enable Crawl Budget Optimization

**Navigate to:**
- Left sidebar → "Settings" → "Crawl stats"

**What to observe:**
- "Requests per day" should increase after submission
- Google will crawl more aggressively for new content
- Expected: 500-2,000 requests/day for new pages

**Monitor for 7 days:**
- Day 1: Initial crawl spike
- Day 2-4: High crawl activity
- Day 5-7: Continued crawling
- Week 2+: Normalized crawl rate

---

## MONITORING AFTER SUBMISSION

### Daily (First 7 Days)
```bash
# Check coverage growth
# GSC → Coverage → Count URLs indexed

Day 1: 1,100 URLs
Day 2: 1,150 URLs
Day 3: 1,160 URLs
Day 4: 1,165 URLs
Day 5-7: 1,167 URLs (complete)
```

### First 2 Weeks
```
GSC → Performance tab
- Monitor impressions (should increase)
- Monitor clicks (should increase for top keywords)
- Monitor CTR
- Monitor average position
```

### First Month
```
GSC → Performance → Search Appearance
- Check featured snippets appearing
- Monitor position 0 wins
- Track featured snippet keywords
```

---

## EXPECTED METRICS

### Coverage Growth
```
Hour 1:     Detected 69 new URLs
Day 1:      500 URLs indexed
Day 2-3:    750 URLs indexed
Day 4-5:    1,050 URLs indexed
Day 6-7:    1,167 URLs indexed (100%)
```

### Impressions Timeline
```
Week 1:     0-50 impressions
Week 2:     50-200 impressions
Week 3:     200-500 impressions
Week 4:     500-1,000 impressions
Month 2:    5,000-10,000 impressions
Month 3:    20,000-50,000 impressions
```

### Click Growth
```
Week 1:     0-5 clicks
Week 2:     5-20 clicks
Week 3:     20-100 clicks
Week 4:     100-500 clicks
Month 2:    500-2,000 clicks
Month 3:    2,000-5,000 clicks
```

### Rankings
```
Week 1:     Positions 100+
Week 2:     Positions 50-100
Week 3:     Positions 30-50
Week 4:     Positions 20-30
Week 5-6:   Positions 10-20
Week 7-8:   Positions 5-10
Month 3:    Mixed 1-30 (maturing)
```

---

## TROUBLESHOOTING

### Issue: Sitemap shows "Error"
**Solution:**
1. Verify sitemap.xml is valid XML
2. Check all URLs are HTTPS
3. Re-run sitemap generator
4. Try submitting again

### Issue: URLs showing "Discovered - not indexed"
**Solution:**
1. Request indexing manually
2. Make sure pages have good content (300+ words)
3. Add internal links to pages
4. Fix any crawl errors

### Issue: Crawl requests dropped (too low)
**Solution:**
1. Check for crawl errors (fix them)
2. Verify robots.txt allows crawling
3. Check site speed (should be < 3 sec)
4. Submit more URLs for indexing

### Issue: Same URLs not getting indexed
**Solution:**
1. Check page quality (minimum 300 words)
2. Add more internal links
3. Fix any structured data errors
4. Ensure unique content per page

---

## ADVANCED: Custom Sitemap Index

If you want Google to crawl more efficiently, create a sitemap index:

**File:** `public/sitemap-index.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://livingwitharthritis.org.uk/sitemap-cities.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://livingwitharthritis.org.uk/sitemap-blog.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://livingwitharthritis.org.uk/sitemap-hubs.xml</loc>
  </sitemap>
</sitemapindex>
```

Then submit `sitemap-index.xml` instead of `sitemap.xml`

---

## 15-MINUTE QUICK CHECKLIST

- [ ] 0:00 - Log into Google Search Console
- [ ] 1:00 - Navigate to Sitemaps section
- [ ] 2:00 - Click "Add new sitemap"
- [ ] 3:00 - Paste `https://livingwitharthritis.org.uk/sitemap.xml`
- [ ] 4:00 - Click SUBMIT
- [ ] 5:00 - Wait for "Success" status (appears quickly)
- [ ] 7:00 - Navigate to URL Inspection
- [ ] 8:00 - Request indexing for 10 major cities
- [ ] 13:00 - Request indexing for 9 hub pages
- [ ] 15:00 - Done! Monitor GSC daily

---

## DAILY MONITORING (First 30 Days)

### Automated Check
Create this command to run daily:

```bash
#!/bin/bash
DATE=$(date)
INDEXED=$(curl -s https://livingwitharthritis.org.uk/sitemap.xml | grep -c "<url>")
echo "$DATE - URLs in sitemap: $INDEXED"

# Check 5 random city pages
for city in london manchester birmingham leeds sheffield; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://livingwitharthritis.org.uk/arthritis-support/$city)
  echo "$DATE - City page [$city]: HTTP $STATUS"
done
```

### Manual Check
Every morning, check Google Search Console:

1. **Coverage:** Are new URLs appearing?
2. **Performance:** Any new impressions?
3. **Crawl Stats:** Is Google crawling the new pages?
4. **Errors:** Any crawl or indexing errors?

---

## SUCCESS INDICATORS

**Week 1:**
- ✅ Sitemap shows "Success"
- ✅ 500+ URLs indexed
- ✅ Coverage report shows new URLs
- ✅ Crawl requests increasing

**Week 2:**
- ✅ 1,000+ URLs indexed
- ✅ First impressions appearing (50+)
- ✅ City pages showing in search results
- ✅ Hub pages showing in search results

**Week 3-4:**
- ✅ 1,150+ URLs indexed
- ✅ Impressions climbing (500+)
- ✅ First clicks appearing (50+)
- ✅ Position data showing

**Month 2-3:**
- ✅ All 1,167 URLs indexed
- ✅ 5,000+ monthly impressions
- ✅ 1,000+ monthly clicks
- ✅ City pages ranking positions 10-50
- ✅ Hub pages ranking positions 5-20

---

**Status: Ready to Submit**  
**Timeline: 15 minutes submission + 7 days indexing**  
**Expected Result: +25K-100K monthly traffic from indexed pages**
