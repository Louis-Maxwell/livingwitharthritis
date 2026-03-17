

# Plan: Achieving 200,000 UK Visitors — Strategy & Site Improvements

## Current State
- **Today**: 10 visitors, 46 pageviews, mostly US traffic — essentially zero UK organic traffic
- **Target**: 200,000 UK visitors
- **Strengths**: Good SEO foundations (structured data, UK geo-targeting, en-GB hreflang, FAQ schema, dynamic sitemap, long-tail blog content)
- **Weaknesses**: No analytics tracking (no GA4), no Google Search Console verification, SPA rendering issues for SEO crawlers, limited blog volume, no social sharing infrastructure, missing programmatic SEO pages

---

## What Needs Improving (Implementation Plan)

### 1. Add Google Analytics 4 (GA4) Tracking
You cannot grow what you cannot measure. There is **no analytics tracking** on the site currently.
- Add GA4 script tag to `index.html`
- Track page views across SPA route changes
- Set up UK audience segment tracking
- *Requires*: User to provide GA4 Measurement ID

### 2. Add Google Search Console Verification
- Add meta verification tag to `index.html`
- Submit sitemap to Google for indexing
- *Requires*: User to provide verification code

### 3. Create High-Volume Programmatic SEO Pages
The site has ~25 blog posts. To reach 200K visitors, you need **hundreds of indexable pages** targeting long-tail UK keywords. I will build:

- **"Arthritis in [City]" pages** — programmatically generated pages for top 50 UK cities (e.g. "Arthritis Support in Manchester", "Arthritis Help in Birmingham") targeting local search queries. Each page pulls from a data file with city-specific NHS trust info and local resources.
- **"[Exercise] for [Joint] Arthritis" matrix pages** — e.g. "Swimming for Knee Arthritis", "Yoga for Hip Arthritis" — 30-50 pages from exercise × joint combinations.
- **Expand blog to 100+ articles** — add batch 5-8 of blog articles targeting high-volume UK search terms like "PIP for arthritis", "best walking shoes arthritis UK", "arthritis and cold weather UK".

### 4. Fix SPA SEO Rendering
Search engines struggle with client-side rendered SPAs. Currently all pages are rendered client-side only.
- Add `react-snap` or a prerendering solution so Google can index all pages
- Add proper `<title>` and `<meta>` tags via `react-helmet-async` on **every** route (some pages may be missing this)

### 5. Improve Internal Linking & Content Hub Structure
- Add breadcrumbs to all pages (component exists but may not be used everywhere)
- Add "Related Articles" links at the bottom of every blog post
- Create a **content hub index page** linking all condition pages, exercise guides, and diet articles — acts as a crawl path for Google

### 6. Add Social Sharing & Viral Loops
- Ensure `SocialShareButtons` component is on every blog post and condition page
- Add Open Graph images for each blog post (many are missing `og:image`)
- Add a "Share your story" CTA to drive user-generated content and backlinks

### 7. Improve Page Speed (Core Web Vitals)
Google prioritizes fast sites. Quick wins:
- Lazy-load below-fold images (already partially done)
- Reduce framer-motion animation overhead on mobile
- Ensure fonts are display:swap (already done)

---

## What You Need To Do (Outside the Code)

These are **critical non-code activities** that drive 80% of the traffic growth:

1. **Register with Google Search Console** — submit your sitemap, monitor indexing
2. **Set up GA4** — get a Measurement ID so we can add tracking
3. **Build backlinks** — get listed on NHS directories, arthritis forums, UK health blogs, charity aggregators
4. **Post on social media** — share blog articles on Facebook arthritis groups, Reddit r/arthritis, Twitter/X health hashtags
5. **Set up an Amazon Associates account** — the affiliate shop drives return visits
6. **Consider Google Ads grants** — registered UK charities can get £7,500/month in free Google Ads (Ad Grants programme)
7. **Email newsletter** — the newsletter signup exists; use it to drive repeat traffic

---

## Implementation Priority (What I Will Build)

| Priority | Task | Impact |
|----------|------|--------|
| 1 | Add GA4 tracking snippet | Measurement |
| 2 | Create 50 programmatic city pages | +50 indexable pages |
| 3 | Create exercise × joint matrix pages | +40 indexable pages |
| 4 | Add 40 more blog articles (batches 5-8) | +40 indexable pages |
| 5 | Add Search Console verification meta tag | Indexing |
| 6 | Ensure all pages have proper Helmet meta tags | SEO completeness |
| 7 | Add social share buttons to all content pages | Viral distribution |

This plan focuses on **content volume + technical SEO** — the two levers that directly drive organic UK traffic growth. Once you provide your GA4 ID and Search Console verification code, I can begin implementation.

