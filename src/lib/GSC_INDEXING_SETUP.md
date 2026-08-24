# Google Search Console Indexing Setup Guide

## Overview

Living With Arthritis is configured for maximum search engine visibility with automated indexing, sitemap management, and coverage monitoring through Google Search Console (GSC).

## Current Configuration

### Sitemaps
The site submits 6 sitemaps to Google:
1. **Sitemap Index** - Master index of all sitemaps
2. **English Sitemap** - Main UK content (en-GB)
3. **Spanish Sitemap** - Spanish language content (es)
4. **French Sitemap** - French language content (fr)
5. **German Sitemap** - German language content (de)
6. **Portuguese Sitemap** - Portuguese language content (pt)

### robots.txt
- Allows all major search engines (Google, Bing, DuckDuckGo)
- Allows AI crawlers (GPTBot, Claude-Web, Perplexity)
- Disallows private pages (admin, auth, checkout, etc.)
- Points to sitemap index

### Coverage Status
- ✅ Robots.txt configured correctly
- ✅ Sitemaps submitted to GSC
- ✅ Core Web Vitals optimized
- ✅ Mobile-friendly design
- ✅ SSL certificate active

## GSC Dashboards

### Primary Dashboard
https://search.google.com/search-console?resource_id=https://livingwitharthritis.org.uk/

**What to monitor:**
- Overall site health
- Search performance (impressions, clicks, CTR, position)
- Indexation coverage
- Core Web Vitals
- Mobile usability

### Coverage Report
https://search.google.com/search-console/coverage?resource_id=https://livingwitharthritis.org.uk/

**Shows:**
- Total indexed pages
- Excluded pages (reason)
- Pages with errors
- Pages with warnings
- Validity of submitted vs indexed URLs

### Sitemaps Report
https://search.google.com/search-console/sitemaps?resource_id=https://livingwitharthritis.org.uk/

**Tracks:**
- Submission date for each sitemap
- Number of URLs in each sitemap
- Number of URLs actually indexed
- Last read date
- Processing status

### URL Inspection Tool
https://search.google.com/search-console/inspect?resource_id=https://livingwitharthritis.org.uk/&url=[PAGE_URL]

**Use to:**
- Check if a specific page is indexed
- Request indexing for a new page
- See crawl details and issues
- View rendered version as Googlebot sees it
- Test mobile usability

## Indexing Module: `lib/gsc-indexing.ts`

### Main Functions

#### 1. Request URL Indexing
```typescript
import { requestUrlIndexing } from '@/lib/gsc-indexing';

// Request indexing for a new page
await requestUrlIndexing('https://livingwitharthritis.org.uk/new-page', 'DISCOVER');

// Request reindexing for updated page
await requestUrlIndexing('https://livingwitharthritis.org.uk/updated-page', 'URL_CHANGED');
```

**Parameters:**
- `url` (string): Full page URL
- `type` (optional): 'URL_CHANGED' (for updates) or 'DISCOVER' (for new content)

**When to use:**
- New blog post published
- Major content update
- New resource/guide added
- Critical fix to SEO content

#### 2. Bulk Indexing
```typescript
import { requestBulkIndexing } from '@/lib/gsc-indexing';

const urls = [
  'https://livingwitharthritis.org.uk/new-page-1',
  'https://livingwitharthritis.org.uk/new-page-2',
  'https://livingwitharthritis.org.uk/updated-page-1',
];

const result = await requestBulkIndexing(urls, 'DISCOVER');
console.log(`Success: ${result.successful}, Failed: ${result.failed}`);
```

**Best for:**
- Bulk content imports
- Site migrations
- Seasonal content releases

#### 3. Submit Sitemaps
```typescript
import { submitAllSitemaps, submitSitemap } from '@/lib/gsc-indexing';

// Submit all configured sitemaps
const result = await submitAllSitemaps();

// Or submit individual sitemap
await submitSitemap('https://livingwitharthritis.org.uk/sitemap.xml');
```

#### 4. Monitor Coverage
```typescript
import { monitorIndexationCoverage } from '@/lib/gsc-indexing';

const metrics = await monitorIndexationCoverage();
console.log({
  totalUrls: metrics.totalUrls,
  indexedUrls: metrics.indexedUrls,
  indexationRate: metrics.indexationRate,
  coverageIssues: metrics.coverageIssues,
});
```

**Returns:**
- `totalUrls`: All submitted URLs
- `indexedUrls`: Actually indexed
- `excludedUrls`: Intentionally excluded (noindex, robots.txt)
- `errorUrls`: Pages with crawl/indexing errors
- `indexationRate`: Percentage indexed (indexed/total)
- `coverageIssues`: Breakdown of issues

#### 5. URL Inspection
```typescript
import { getUrlInspectionStatus } from '@/lib/gsc-indexing';

const status = await getUrlInspectionStatus('https://livingwitharthritis.org.uk/page');
console.log({
  status: status.status, // 'indexed', 'not_indexed', etc.
  lastCrawled: status.lastCrawled,
  indexedAt: status.indexedAt,
});
```

#### 6. Remove from Index
```typescript
import { removeUrlFromIndex, requestTemporaryRemoval } from '@/lib/gsc-indexing';

// Permanent removal (e.g., deleted page)
await removeUrlFromIndex('https://livingwitharthritis.org.uk/old-page');

// Temporary removal (while fixing issues)
await requestTemporaryRemoval('https://livingwitharthritis.org.uk/broken-page');
```

#### 7. Track New Content
```typescript
import { trackNewPagePublished, trackPageUpdated } from '@/lib/gsc-indexing';

// When publishing new content
await trackNewPagePublished('https://livingwitharthritis.org.uk/new-guide', {
  title: 'New Osteoarthritis Guide',
  category: 'guides',
});

// When updating existing content
await trackPageUpdated('https://livingwitharthritis.org.uk/existing-page', {
  title: 'Updated Guide',
  updateType: 'major',
});
```

## How to Index All Pages

### Method 1: Through GSC UI (Manual)
1. Go to https://search.google.com/search-console
2. Select property: livingwitharthritis.org.uk
3. Go to Sitemaps → Check all 6 sitemaps are listed
4. Click "Request re-crawl" on sitemap-index.xml
5. Wait 24-48 hours for Google to crawl

### Method 2: Using Indexing API (Automated)
Requires Google Cloud setup:

#### Step 1: Create Service Account
1. Go to Google Cloud Console → APIs & Services
2. Create new service account: `gsc-indexing@[project].iam.gserviceaccount.com`
3. Generate JSON key file
4. Keep this file secure (store in environment variables)

#### Step 2: Authorize Service Account in GSC
1. Go to GSC Settings → Users and permissions
2. Add email: `gsc-indexing@[project].iam.gserviceaccount.com`
3. Grant "Owner" role

#### Step 3: Enable Indexing API
1. Go to Google Cloud Console → APIs & Services → Library
2. Search "Indexing API"
3. Click "Enable"

#### Step 4: Use in Code
```typescript
import { requestUrlIndexing, requestBulkIndexing } from '@/lib/gsc-indexing';

// Request single URL
await requestUrlIndexing('https://livingwitharthritis.org.uk/new-page');

// Bulk request all URLs from sitemap
const urls = [/* all URLs from sitemap */];
await requestBulkIndexing(urls, 'DISCOVER');
```

### Method 3: Via Sitemaps (Best for Most Cases)
This is the default method - no special setup needed:

1. Ensure `robots.txt` points to sitemaps
2. Go to GSC Sitemaps dashboard
3. Submit sitemaps if not already listed
4. Google will crawl within 24-48 hours

## Analytics Tracking

All GSC activities are tracked in GA4:

### Events
- `gsc_indexing_request` - Individual URL indexing request
- `gsc_bulk_indexing_request` - Bulk submission
- `gsc_sitemap_submission` - Sitemap submitted
- `gsc_url_inspection` - URL status checked
- `new_page_published` - New content published
- `page_updated_for_reindexing` - Content updated
- `gsc_coverage_monitoring` - Coverage stats checked
- `gsc_crawl_error` - Crawl error detected

**Monitor in GA4:**
- Reports → Events
- Search: `gsc_` or `page_`
- Filter by event type or parameter

## Common Issues & Solutions

### Pages Not Indexed

**Symptoms:**
- Page doesn't appear in search results
- GSC shows "Excluded - Noindex tag"
- Coverage report shows 0 indexed URLs

**Solutions:**
1. **Check robots.txt:**
   ```bash
   curl https://livingwitharthritis.org.uk/robots.txt
   ```
   Ensure page path isn't disallowed

2. **Check page headers:**
   - Remove `X-Robots-Tag: noindex` header
   - Remove `<meta name="robots" content="noindex">`

3. **Request via URL Inspection:**
   - Go to URL Inspection tool
   - Click "Request indexing"
   - Wait for Google to crawl

4. **Check Core Web Vitals:**
   - Poor CWV can delay indexing
   - Go to GSC → Core Web Vitals
   - Fix red metrics

### Crawl Errors

**Types:**
- **404 Not Found** - Page deleted
- **5xx Server Error** - Server issues
- **Forbidden** - Page blocked

**Solution:**
1. Check GSC Coverage report
2. Click error type for examples
3. Fix the issue (restore page, fix server, check auth)
4. Re-crawl via URL Inspection

### Slow Indexing

**Causes:**
- Server is slow (high TTFB)
- Too many crawl errors
- Low quality content
- New domain (takes time)

**Solutions:**
1. Improve Core Web Vitals (especially TTFB)
2. Fix all crawl errors
3. Ensure content is high quality
4. Wait 2-4 weeks for new domains

### Sitemap Issues

**Common:**
- Sitemap too large (>50MB or 50k URLs)
- Invalid XML
- Expired URLs included

**Solution:**
1. Use sitemap index (we already do this)
2. Validate XML: https://www.xml-sitemaps.com/validate-xml-sitemap.html
3. Keep URLs fresh

## Checklist for Indexing All Pages

- [ ] Verify robots.txt allows crawling
- [ ] Submit all 6 sitemaps to GSC
- [ ] Check no pages have noindex tag
- [ ] Fix any crawl errors
- [ ] Optimize Core Web Vitals
- [ ] Check coverage report
- [ ] Monitor in GA4
- [ ] Wait 7-14 days for full crawl
- [ ] Verify indexed count in GSC
- [ ] Set up monitoring alerts

## Monitoring & Alerts

### Daily Checks
1. GSC Coverage - any new errors?
2. Core Web Vitals - all green?
3. Search performance - traffic normal?

### Weekly Checks
1. Indexation rate - still high?
2. New pages indexed? (should be within 48 hours)
3. Any crawl issues?

### Monthly Reviews
1. Overall indexation trend
2. Comparison with competitors
3. Impact on organic traffic

## Related Documentation

- [Analytics Setup](./ANALYTICS_SETUP.md)
- [GSC Integration](./gsc-integration.ts)
- [robots.txt](../../public/robots.txt)
- [Sitemap](../../public/sitemap.xml)

## External Resources

- [Google's Indexing API Guide](https://developers.google.com/search/apis/indexing-api/v3)
- [GSC Help Center](https://support.google.com/webmasters)
- [Search Central Blog](https://developers.google.com/search/blog)
- [Structured Data Testing Tool](https://search.google.com/test/rich-results)

## Support

For GSC issues:
- Check GSC Coverage report for specific errors
- Use URL Inspection tool for individual pages
- Review Core Web Vitals for performance issues
- Contact: info@livingwitharthritis.org.uk
