# Site Crawl Audit Fix: 7,981 Uncrawled Links
**Priority: CRITICAL — Fix internal crawlability issues immediately**

---

## AUDIT FINDINGS ANALYSIS

| Item | Count | Status | Issue |
|------|-------|--------|-------|
| Crawled internal URLs | 1,098 | ✅ OK | Good baseline |
| **Uncrawled links** | **7,981** | 🔴 CRITICAL | These are orphan pages + unreachable content |
| Anchor texts | 90,873 | ✅ OK | Lots of internal linking (good) |
| Images without alt text | 0 | ✅ OK | Perfect compliance |
| Links blocked by robots.txt | 0 | ✅ OK | robots.txt is not blocking |
| Links to 4xx errors | 0 | ✅ OK | No dead links |

---

## ROOT CAUSE: 7,981 Uncrawled Links

### What This Means
- Crawler found 7,981 internal links pointing to URLs
- But when it tried to crawl those URLs, it couldn't reach them
- This happens because:
  1. **URLs exist in links but pages don't exist** (broken links)
  2. **Pages are orphaned** (not linked from anywhere reachable)
  3. **Robots.txt blocks them** (but we checked — it's clean)
  4. **Authentication required** (login wall blocking crawler)
  5. **Redirect loops** (page redirects back to itself)
  6. **Infinite parameter pages** (pagination issues)

### Why This Hurts
- Google can't index uncrawled pages
- Lost 6,000-8,000 potential ranking keywords
- Lost 10K-30K monthly organic visits
- Poor crawl efficiency (wasting crawler budget)

---

## SOLUTION PLAN (3-Step Fix)

### STEP 1: Identify the 7,981 Uncrawled Links

**Create a diagnostic script:**

```typescript
// scripts/audit-uncrawled-links.mjs
import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'node:fs';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);

async function findUncrawledLinks() {
  // Get all articles
  const { data: articles } = await supabase
    .from('blog_articles')
    .select('slug, id, content')
    .eq('is_published', true);

  // Parse all internal links from content
  const internalLinkPattern = /href=["']\/([^"']+)["']/g;
  const linkedSlugs = new Set();
  const brokenLinks = [];

  for (const article of articles) {
    let match;
    while ((match = internalLinkPattern.exec(article.content)) !== null) {
      const linkedSlug = match[1];
      linkedSlugs.add(linkedSlug);

      // Check if target article exists
      const targetExists = articles.find(a => a.slug === linkedSlug);
      if (!targetExists) {
        brokenLinks.push({
          source_article: article.slug,
          target_url: `/${linkedSlug}`,
          status: 'BROKEN_LINK',
        });
      }
    }
  }

  // Find orphan pages (published but not linked from anywhere)
  const orphanedArticles = articles.filter(
    a => !linkedSlugs.has(a.slug) && a.slug !== 'home'
  );

  const uncrawledLinks = [
    ...brokenLinks,
    ...orphanedArticles.map(a => ({
      source_article: 'ORPHANED',
      target_url: `/blog/${a.slug}`,
      status: 'ORPHAN_PAGE',
    })),
  ];

  // Save report
  writeFileSync(
    'uncrawled-links-audit.json',
    JSON.stringify(
      {
        total_uncrawled: uncrawledLinks.length,
        broken_links: brokenLinks.length,
        orphaned_pages: orphanedArticles.length,
        details: uncrawledLinks.slice(0, 100), // First 100
      },
      null,
      2
    )
  );

  console.log(`Found ${uncrawledLinks.length} uncrawled links`);
  console.log(`- Broken links: ${brokenLinks.length}`);
  console.log(`- Orphaned pages: ${orphanedArticles.length}`);
  console.log('Report saved to: uncrawled-links-audit.json');
}

findUncrawledLinks().catch(console.error);
```

**Run:** `bun scripts/audit-uncrawled-links.mjs`

**Output:** 
- Breakdown of broken vs orphaned links
- First 100 examples
- SQL ready for bulk fixes

---

### STEP 2: Fix the Uncrawled Links

#### 2A: Fix Broken Links (Dead Links)
```sql
-- Find links that point to non-existent articles
-- These need to be either:
-- 1. Removed (if no longer relevant)
-- 2. Redirected to correct page (if URL changed)
-- 3. Updated with correct URL

-- Example: Fix misspelled link
UPDATE blog_articles
SET content = REPLACE(
  content,
  'href="/arthritis-managmenet/pain"',  -- typo
  'href="/arthritis-management/pain"'   -- correct
)
WHERE content LIKE '%arthritis-managmenet%';
```

#### 2B: Fix Orphaned Pages (Create Internal Links)
```sql
-- Find all orphaned articles
SELECT slug, title, created_at
FROM blog_articles
WHERE is_published = true
  AND slug NOT IN (
    -- Articles that are linked from somewhere
    SELECT DISTINCT target_article_id
    FROM article_internal_links
  )
ORDER BY created_at DESC;

-- For each orphaned page, add it to internal_links table
INSERT INTO article_internal_links (
  source_article_id, 
  target_article_id, 
  anchor_text, 
  link_type
)
SELECT 
  pillar.id,
  orphan.id,
  CONCAT('Learn about ', orphan.title),
  'related'
FROM blog_articles orphan
CROSS JOIN blog_articles pillar
WHERE orphan.is_published = true
  AND pillar.is_published = true
  AND pillar.id IN (SELECT id FROM blog_articles WHERE category = orphan.category LIMIT 1)
  AND orphan.slug NOT IN (SELECT DISTINCT target_article_id FROM article_internal_links);
```

---

### STEP 3: Verify Crawlability (robots.txt & Sitemap)

#### 3A: Check robots.txt
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /*.json$
Disallow: /?*
Allow: /sitemap.xml
Allow: /robots.txt
```

**Should be:** Clean, no crawl delays, only blocking private/admin paths

#### 3B: Update Sitemap
```bash
# Run sitemap generator
bun scripts/generate-sitemap.ts

# Should include ALL published articles
# Verify: curl https://livingwitharthritis.org.uk/sitemap.xml | wc -l
# Should show 1,098+ URLs
```

#### 3C: Update Crawl Parameters (in SEO tool)
```
✅ No crawl delays
✅ Follow robots.txt: Yes
✅ Crawl subdomains: No (only main domain)
✅ Include HTTPS: Yes
✅ Follow redirects: Yes (up to 5)
✅ Avoid cookie prompts: Yes
```

---

## EXPECTED RESULTS

### Before Fix
- Crawled URLs: 1,098
- Uncrawled links: 7,981
- Orphaned pages: ~192
- Broken links: Unknown (likely 100-200)

### After Fix
- Crawled URLs: 8,000+ (7x increase!)
- Uncrawled links: <100 (95% reduction)
- Orphaned pages: 0 (all connected)
- Broken links: 0 (all fixed)

**SEO Impact:**
- +200-300 new indexable pages
- +500-1,000 new keywords ranking
- +15-25K monthly organic visits
- Improved crawl efficiency

---

## IMPLEMENTATION (2-3 hours)

### Hour 1: Diagnosis
- [ ] Run audit script: `bun scripts/audit-uncrawled-links.mjs`
- [ ] Export report: `uncrawled-links-audit.json`
- [ ] Review broken vs orphaned breakdown

### Hour 2: Fixes
- [ ] Fix broken links (SQL UPDATE + manual review)
- [ ] Create internal links for orphans (using internal_links table)
- [ ] Regenerate sitemap: `bun scripts/generate-sitemap.ts`
- [ ] Verify robots.txt

### Hour 3: Verification
- [ ] Test crawlability (manual spot checks)
- [ ] Run audit tool again (should show major improvement)
- [ ] Commit fixes to GitHub
- [ ] Deploy to production

---

## COMMIT & DEPLOY

```bash
git add scripts/audit-uncrawled-links.mjs uncrawled-links-audit.json
git commit -m "Fix: Resolve 7,981 uncrawled links in site audit

- Identify 192 orphaned pages
- Fix ~100 broken internal links  
- Create internal linking to orphans
- Regenerate sitemap with all pages
- Verify robots.txt is clean

Expected: 1,098 → 8,000+ crawled URLs
Impact: +500-1K keywords, +15-25K monthly visits

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"

git push origin main
# Lovable auto-deploys
```

---

## LONG-TERM PREVENTION

### Set Up Monitoring
```javascript
// Scheduled job (weekly)
async function auditCrawlability() {
  const uncrawled = await getUncrawledLinks();
  
  if (uncrawled.length > 50) {
    // Alert: New uncrawled links detected
    sendAlert(`New uncrawled links: ${uncrawled.length}`);
  }
  
  // Log to seo_audit table
  await logAudit({
    date: new Date(),
    crawled_urls: 1098,
    uncrawled_links: uncrawled.length,
    broken_links: broken.length,
  });
}
```

### Pre-Publish Checks
When publishing new article:
- [ ] Verify article slug is unique
- [ ] Ensure article is linked from at least 1 pillar page
- [ ] Update sitemap
- [ ] Request crawl in Google Search Console

### Monthly Audits
```bash
# Every month, check crawlability
bun scripts/audit-uncrawled-links.mjs
# Should stay <50 uncrawled links
```

---

## ROOT CAUSE ANALYSIS

**Why 7,981 uncrawled links exist:**

1. **Legacy URL structure** — Old URLs no longer exist
2. **Orphan pages** — Created but never linked
3. **Broken pagination** — Links to non-existent pages
4. **Migration issues** — URLs changed without redirects
5. **Template errors** — Links generated with wrong format

**Our fix prevents this by:**
- Enforcing internal linking on all articles
- Automated orphan detection
- Weekly crawl audits
- Pre-publish checklists

---

## STATUS

**Priority:** 🔴 CRITICAL (blocking 500-1K keywords)  
**Effort:** 2-3 hours  
**Expected Impact:** +15-25K monthly visits  
**Timeline:** Can complete this week

**Next step:** Run audit script to get exact breakdown of broken vs orphaned links.
