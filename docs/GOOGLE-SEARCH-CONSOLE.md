# Google Search Console Setup & Management

## Overview

Google Search Console (GSC) is the primary tool for monitoring and maintaining your site's presence in Google Search results. It provides insights into how Google crawls, indexes, and ranks your site.

## Initial Setup

### Step 1: Add Your Property

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **"+ Create property"**
3. Choose **"Domain"** property (recommended for all your URLs)
   - Enter: `livingwitharthritis.org.uk`
   - This covers http/https and www/non-www automatically

### Step 2: Verify Your Domain

**Option A: DNS TXT Record (Recommended)**

1. In GSC, copy the verification code (looks like: `google-site-verification=xxxxx`)
2. Go to your domain registrar (e.g., Namecheap, GoDaddy, Google Domains)
3. Add a TXT record:
   - **Host:** `@` (or your domain name)
   - **Value:** Paste the verification code
4. Return to GSC and click **"Verify"**
5. Verification may take 24-48 hours

**Option B: HTML File Upload**

1. Download the verification HTML file from GSC
2. Upload to `public/` directory in your repo
3. File will be accessible at `livingwitharthritis.org.uk/[verification-file].html`
4. Click **"Verify"** in GSC

**Option C: Google Analytics Integration**

If you have Google Analytics set up:
1. GSC > Settings > Verification
2. Click **"Verify with Google Analytics"**
3. If your GA property is already verified, this is instant

### Step 3: Submit Sitemaps

Once verified, submit your sitemaps:

1. **Primary Sitemap:**
   - Go to GSC > Sitemaps
   - Enter: `https://livingwitharthritis.org.uk/sitemap.xml`
   - Click **"Submit"**

2. **Secondary Sitemaps (if generated):**
   - `https://livingwitharthritis.org.uk/sitemap-blog.xml`
   - `https://livingwitharthritis.org.uk/sitemap-conditions.xml`
   - `https://livingwitharthritis.org.uk/sitemap-index.xml`

**Current sitemaps from robots.txt:**
```
Sitemap: https://livingwitharthritis.org.uk/sitemap-index.xml
Sitemap: https://livingwitharthritis.org.uk/sitemap.xml
Sitemap: https://livingwitharthritis.org.uk/sitemap-es.xml
Sitemap: https://livingwitharthritis.org.uk/sitemap-fr.xml
Sitemap: https://livingwitharthritis.org.uk/sitemap-de.xml
Sitemap: https://livingwitharthritis.org.uk/sitemap-pt.xml
```

### Step 4: Set Preferred Domain

1. GSC > Settings > Domain Settings
2. Choose your preferred variant:
   - `livingwitharthritis.org.uk` (recommended, no www)
3. This tells Google which version to use as canonical

## Monitoring & Maintenance

### Performance Monitoring

**GSC > Performance**
- Check weekly or after publishing new content
- Track metrics:
  - **Total Clicks:** Traffic from Google Search
  - **Total Impressions:** How often your site appears in results
  - **Average CTR:** Click-through rate
  - **Average Position:** Average ranking

**Filtering:**
- By page, query, country, device, search type
- Identify top-performing pages and growth opportunities

### Indexing Status

**GSC > Pages > Coverage**

Monitor what Google can and can't index:

| Status | Meaning | Action |
|--------|---------|--------|
| **Indexed** | Page is in Google's index ✓ | Monitor for drops |
| **Discovered** | Page found but not indexed yet | Check if content is public, wait for re-crawl |
| **Excluded** | Page is intentionally excluded | Normal for `/admin`, `/auth`, etc. |
| **Error** | Page couldn't be indexed ❌ | Investigate and fix errors |

**Common Crawl Errors:**
- **404 Not Found** — Page deleted or URL changed
- **5xx Server Error** — Temporary server issues
- **Timeout** — Page takes too long to load
- **Redirect error** — Broken redirect chain

**Fixes:**
1. Fix the error (update content, fix server, etc.)
2. Return to GSC
3. Click **"Request indexing"** to re-crawl

### Rich Results & Structured Data

**GSC > Enhancements**

Monitor which rich results are available:
- **Article** — News/blog post snippets
- **FAQ** — Expandable FAQ boxes in search
- **HowTo** — Step-by-step instructions
- **Organization** — Business information
- **Recipe** — (if applicable)

**Validation:**
- Green = valid and eligible
- Yellow = valid but with warnings
- Red = invalid, fix schema

**Fix structured data:**
1. Use [Google's Rich Results Test](https://search.google.com/test/rich-results)
2. Find and fix invalid schema in source code
3. Request re-crawl: **GSC > Pages > Coverage**

### URL Inspection & Indexing

Use **URL Inspection** tool to debug specific pages:

1. **GSC > URL Inspection**
2. Enter the page URL
3. View:
   - Crawl status (can Google reach it?)
   - Indexing status (is it in Google's index?)
   - Last crawl date
   - Canonical URL (which version is indexed?)
   - Mobile usability
   - Core Web Vitals
4. Click **"Request indexing"** to trigger a re-crawl

### Security & Manual Actions

**GSC > Security & manual actions**

Monitor for:
- **Security issues** — Malware, hacking attempts
- **Manual actions** — Google flagged content as violating guidelines
  - Example: Spam, unnatural links, cloaking

**If you see a manual action:**
1. Understand the issue
2. Fix the problematic content/links
3. Submit a **Reconsideration Request**

## Core Web Vitals Monitoring

**GSC > Core Web Vitals**

Real-world performance data from actual users:

| Metric | Good | Needs Work | Poor |
|--------|------|-----------|------|
| **LCP** | ≤2.5s | 2.5–4s | >4s |
| **CLS** | ≤0.1 | 0.1–0.25 | >0.25 |
| **FID/INP** | ≤100ms | 100–300ms | >300ms |

**Improve Core Web Vitals:**
- See [CORE-WEB-VITALS.md](./CORE-WEB-VITALS.md) for detailed optimization guide
- Priority: Fix "Poor" pages first

## Link Insights

**GSC > Links**

Monitor your backlink profile:

- **Top linking sites** — Who's linking to you?
- **Top linked pages** — Your most popular pages
- **Top internal links** — Which pages link to which?

**Healthy backlink profile:**
- Relevant, high-quality sites linking to you
- Natural growth over time
- No sudden spikes (possible spam/hacking)

## Removing Content from Google

### Remove a Single Page

1. **URL Inspection** > Enter page URL
2. **Remove** > Choose duration:
   - **Temporary** (6 months) — For testing
   - **Permanent** — For pages you never want indexed

### Remove Multiple Pages

1. **Settings > Remove URLs** (legacy)
2. Or use `noindex` meta tag in the page HTML

### Remove Sensitive Information

For personal info, financial data, etc.:
1. **Remove URL** (fastest)
2. Then update page to use `noindex` tag
3. Then delete the content

## Integration with Other Tools

### Google Analytics Integration

Link your GA4 property:
1. **GSC > Settings > Google Analytics integration**
2. **Connect** to your GA4 property
3. Enables:
   - Search traffic data in GA
   - GA event data in GSC
   - Combined analysis

### Search Console in Google Analytics

View GSC data in GA4:
1. **GA4 > Reports > Life Cycle > Acquisition > Google Search Insights**
2. See organic search performance alongside other channels

### Link to Data Studio

Create automated reports:
1. **Data Studio > Create > Connector > Search Console**
2. Choose your property
3. Build dashboards with custom metrics

## Automation & API

### GSC API

If you want to automate tasks programmatically:

```bash
# Install the API client
npm install google-search-console

# Example: Fetch performance data
const client = new SearchConsole.default({
  credentials: credentials // Service account JSON
});

const data = await client.query({
  startDate: '2026-08-01',
  endDate: '2026-08-16',
  dimensions: ['page'],
});
```

See [Google Search Console API Docs](https://developers.google.com/webmaster-tools/v1/onStarted)

## Regular Maintenance Schedule

### Weekly
- Check **Performance** dashboard for traffic changes
- Review new **Crawl errors**
- Check **Core Web Vitals** for regressions

### Monthly
- Deep dive on **Coverage** status
- Analyze **Top Pages** and optimize low performers
- Check **Backlinks** for spam/suspicious patterns
- Review **Rich Results** validation

### Quarterly
- Full site audit (crawl, indexing, performance)
- Analyze **Search Trends** (seasonal, trending keywords)
- Plan content strategy based on search data
- Review **Security Issues**

### Annually
- Comprehensive SEO audit
- Compare year-over-year performance
- Plan major content/technical improvements

## Troubleshooting

### "Sitemap couldn't be read"

**Causes:**
- Sitemap URL is incorrect
- Sitemap is not publicly accessible
- XML syntax error
- File too large (>50MB)

**Fixes:**
1. Verify URL: `https://livingwitharthritis.org.uk/sitemap.xml` returns valid XML
2. Test in browser: paste URL, should show XML
3. Validate XML: Use online XML validators
4. If >50MB: Split into multiple sitemaps with sitemap index

### "Can't crawl this page"

**Causes:**
- Page requires authentication
- Page blocked by `robots.txt`
- Page redirects infinitely
- Server down or timing out

**Fixes:**
1. Ensure page is public (no login required)
2. Check `robots.txt` — shouldn't block main pages
3. Check redirects: URL → URL2 → URL3 (max 5)
4. Check server status and uptime

### "Page with redirect"

**Causes:**
- Page has unnecessary redirects
- Old URL redirects to new one

**Fixes:**
- This is usually OK (HTTP 301 redirects are fine)
- Update internal links to point to final URL (avoids extra hop)
- Update sitemaps if URLs changed

### Crawl rate too low/high

**Control crawl rate:**
1. **GSC > Settings > Crawl stats > Crawling requests**
2. Adjust if needed:
   - Lower: More efficient, slower indexing
   - Higher: Faster indexing, more server load

## Resources

- [Google Search Console Help](https://support.google.com/webmasters)
- [Search Console API Docs](https://developers.google.com/webmaster-tools)
- [Google Search Central Blog](https://developers.google.com/search/blog)
- [SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)

## Contact & Support

- **GSC Support:** In GSC, click **Help** button
- **Email:** Google has no direct email support, use Help Center
- **Forums:** [Google Search Central Community](https://support.google.com/webmasters/community)
