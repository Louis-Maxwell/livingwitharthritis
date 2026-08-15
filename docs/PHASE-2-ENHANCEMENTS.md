# Phase 2: GEO/SEO/AEO/Analytics Enhancements

**Date Started:** 2026-08-16  
**Status:** In Progress

## Overview

Phase 2 focuses on optimizing the site for search engines, answer engines (AI), geographic targeting, and analytics.

## 1. GEO Enhancement (Geographic Targeting)

### Current State
- ✅ UK-focused domain (.org.uk)
- ✅ UK-specific content and support resources
- ⚠️ Missing geo-targeting meta tags
- ⚠️ No hreflang implementation for regional variations

### Enhancements

#### 1.1 Add Geo Meta Tags
```html
<!-- Add to head for UK targeting -->
<meta name="geo.placename" content="United Kingdom">
<meta name="geo.region" content="GB">
<meta name="geo.position" content="54.5973;-3.4360"> <!-- UK center -->
<meta name="ICBM" content="54.5973, -3.4360">
```

#### 1.2 Structured Data for Organization (with location)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Living With Arthritis UK",
  "areaServed": "GB",
  "geo": {
    "@type": "Place",
    "name": "United Kingdom",
    "geo": {
      "@type": "GeoShape",
      "box": "50.0 -7.0 55.8 2.0" // UK bounding box
    }
  }
}
```

#### 1.3 Regional Content Markup
- Add `hreflang="en-GB"` for UK English
- Use `content-language` headers in HTTP responses
- Geo-scope user-generated content (buddy matches, community groups)

### Implementation Files
- `src/components/seo/PageSchema.tsx` — add geo data
- `src/lib/seo-utils.ts` — geo tagging helpers
- `.env.example` — add `VITE_GEO_REGION=GB`

---

## 2. SEO Enhancement (Search Optimization)

### Current State
- ✅ Good meta descriptions (title, description)
- ✅ Structured data (some Schema.org)
- ⚠️ Missing breadcrumb schema on sub-pages
- ⚠️ Limited internal linking strategy
- ⚠️ No FAQ schema on help pages

### Enhancements

#### 2.1 Add Breadcrumb Schema
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://livingwitharthritis.org.uk"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Exercises",
      "item": "https://livingwitharthritis.org.uk/exercises"
    }
  ]
}
```

#### 2.2 Add FAQ Schema
- Create schema for FAQs on support/help pages
- Structure Q&A content properly
- Link to related FAQs from articles

#### 2.3 Improve Internal Linking
- Link related blog articles (2-3 per article)
- Link from common pages to relevant guides
- Use descriptive anchor text
- Create topic clusters (e.g., "Arthritis Types" → individual condition pages)

#### 2.4 Image SEO
- Add descriptive alt text (currently good)
- Add image schema for featured images
- Optimize image filenames
- Use WebP format with fallbacks

### Implementation Files
- `src/components/seo/BreadcrumbSchema.tsx` — new component
- `src/components/seo/FAQSchema.tsx` — new component
- `src/pages/*.tsx` — add breadcrumb data
- `src/lib/seo-utils.ts` — schema generation helpers

---

## 3. AEO Enhancement (Answer Engine Optimization)

### Current State
- ✅ Clear, structured information
- ✅ Evidence-based content
- ⚠️ Content not optimized for AI extraction
- ⚠️ Missing natural language question-answer format
- ⚠️ No JSON snippets for code/instructions

### Enhancements

#### 3.1 AI-Friendly Content Structure
- Use clear question-answer format in articles
- Start paragraphs with bold topic sentences (AI summary extraction)
- Use structured lists for step-by-step guides
- Add markdown code blocks with language tags

#### 3.2 Add Schema for Complex Content
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Manage Arthritis Pain",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Apply heat therapy",
      "text": "..."
    }
  ]
}
```

#### 3.3 Answer Box Optimization
- Create "one-liner" definitions for key terms
- Add "Quick Answer" sections at top of articles
- Use `<summary>` tags for expandable Q&A
- Optimize for common search queries (voice search style)

#### 3.4 Include Precise Data
- Medical/scientific statistics in `<data>` tags
- Dates and versions for time-sensitive info
- Source citations for claims
- Clear disclaimers and medical advice notices

### Implementation Files
- `src/components/article/AnswerBox.tsx` — new component
- `src/components/article/HowToSchema.tsx` — new component
- `src/lib/aeo-utils.ts` — AEO optimization helpers
- Article components — update to use AEO format

---

## 4. Google Analytics Enhancement

### Current State
- ⚠️ Basic GA4 setup (if configured)
- ⚠️ No event tracking
- ⚠️ No goal/conversion tracking
- ⚠️ No ecommerce events

### Enhancements

#### 4.1 Event Tracking Configuration
```typescript
// Page views (auto)
gtag.event('page_view', { page_path, page_title })

// Content engagement
gtag.event('scroll_depth', { 
  percent_scrolled: 25 | 50 | 75 | 100 
})

gtag.event('file_download', { 
  file_name: 'arthritis-guide.pdf',
  file_extension: 'pdf'
})

// User interactions
gtag.event('button_click', {
  button_name: 'contact-form-submit',
  button_location: 'hero'
})

gtag.event('search', {
  search_term: 'knee exercises'
})

gtag.event('form_submit', {
  form_id: 'buddy-request',
  form_name: 'Buddy Application'
})
```

#### 4.2 Custom Dimensions & Metrics
```typescript
gtag.set({
  'content_type': 'article | guide | tool',
  'condition_type': 'osteoarthritis | rheumatoid | lupus',
  'user_type': 'recently_diagnosed | long_term',
  'time_on_page': milliseconds
})
```

#### 4.3 Goal/Conversion Tracking
- Buddy scheme signups
- Support group registrations
- Newsletter subscriptions
- Document downloads
- External referrals (NHS, other orgs)

#### 4.4 E-commerce Tracking (Optional)
```typescript
gtag.event('view_item', {
  items: [{
    item_id: 'guide-123',
    item_name: 'Knee Exercises Guide',
    item_category: 'Educational Resource'
  }]
})

gtag.event('purchase', {
  value: 0, // Free content
  currency: 'GBP',
  items: [{ /* ... */ }]
})
```

### Implementation Files
- `src/lib/google-analytics.ts` — new GA4 wrapper
- `src/hooks/usePageViewTracking.ts` — auto page tracking
- `src/hooks/useScrollDepth.ts` — scroll tracking
- Components — add event tracking on interactions

---

## 5. Google Search Console Integration

### Current State
- ❓ Status unknown (needs verification)
- ⚠️ No documented setup process
- ⚠️ No sitemap submission guide

### Enhancements

#### 5.1 GSC Setup & Verification
1. Add domain property in GSC (https://search.google.com/search-console)
2. Verify via DNS TXT record or HTML file upload
3. Submit XML sitemaps:
   - `/sitemap.xml` (main)
   - `/sitemap-blog.xml` (articles)
   - `/sitemap-conditions.xml` (condition pages)

#### 5.2 Sitemap Configuration
```xml
<!-- sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://livingwitharthritis.org.uk</loc>
    <lastmod>2026-08-16</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- ... -->
</urlset>
```

#### 5.3 robots.txt Optimization
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /auth/

Sitemap: https://livingwitharthritis.org.uk/sitemap.xml
Sitemap: https://livingwitharthritis.org.uk/sitemap-blog.xml

# Crawl delay for respectful indexing
Crawl-delay: 2
```

#### 5.4 Monitor & Fix Issues
- Check for crawl errors
- Review Core Web Vitals
- Monitor indexing status
- Check for security issues
- Review rich results (schema validation)

#### 5.5 Set Up Preferred Domain
- Set https://livingwitharthritis.org.uk as preferred
- Configure www/non-www handling
- Set hreflang for regional variations

### Implementation Files
- `public/robots.txt` — update with sitemap, crawl rules
- `public/sitemap.xml` — generate dynamically
- `docs/GOOGLE-SEARCH-CONSOLE.md` — setup guide
- `scripts/generate-sitemap.ts` — already exists, verify/enhance

---

## Implementation Priority

### Phase 2a (Week 1)
1. ✅ GEO meta tags and hreflang
2. ✅ Breadcrumb schema across all pages
3. ✅ Google Analytics event tracking

### Phase 2b (Week 2)
4. ✅ AEO content optimization
5. ✅ FAQ and HowTo schema
6. ✅ Google Search Console setup

### Phase 2c (Week 3)
7. ✅ Internal linking strategy
8. ✅ Image SEO enhancements
9. ✅ GA4 custom dimensions & goals

---

## Testing & Validation

### Schema Validation
- Use [schema.org validator](https://validator.schema.org/)
- Test with Google's Rich Results Test
- Verify in Google Search Console

### SEO Validation
- Google Lighthouse (Performance, SEO sections)
- [Semrush SEO Audit](https://www.semrush.com/)
- [Moz Pro](https://moz.com/)

### Analytics Validation
- GA4 real-time dashboard
- Check event tracking in debug mode
- Verify goals are triggered correctly

### AEO Validation
- Test with Claude/ChatGPT extraction
- Verify schema in AI model responses
- Check clarity of answer boxes

---

## Monitoring & Metrics

### KPIs to Track
- Organic search traffic growth
- Click-through rate (CTR) from SERPs
- Average position in Google Search
- Pages per session
- Conversion rates (buddy signups, support contacts)
- Core Web Vitals (LCP, CLS, INP)

### Monthly Review
- GSC performance data
- GA4 engagement metrics
- Schema validation results
- Indexing status
- Keyword ranking changes

---

## Resources & References

- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org)
- [Web.dev SEO Guide](https://web.dev/vitals/)
- [Semrush SEO Research](https://www.semrush.com/blog/)
- [AEO Guide for Content Creators](https://www.searchenginejournal.com/answer-engine-optimization/)

---

**Next:** Proceed with Phase 2a implementation
