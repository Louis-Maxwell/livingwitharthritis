# Backend Enhancement Plan: Complete Infrastructure Upgrade
**Comprehensive improvements across database, APIs, edge functions, analytics, caching, and security.**

---

## PROJECT OVERVIEW

**Goal:** Optimize backend for SEO, performance, analytics, and scalability  
**Scope:** 8 major areas (database, APIs, edge functions, analytics, content pipeline, caching, security, performance)  
**Timeline:** 4-6 weeks  
**Expected Impact:** +30% API speed, +50% query efficiency, real-time analytics, zero downtime  

---

## 1. DATABASE SCHEMA OPTIMIZATION

### 1.1 Current Issues
- No indexes on frequently-queried columns (slug, is_published, created_at)
- Missing article categorization/clustering
- No content relationship tracking (internal links)
- Limited full-text search capability
- No analytics data storage (rankings, impressions, clicks)

### 1.2 Proposed Schema Changes

#### 1.2.1 Add Indexes
```sql
-- Performance indexes on frequently-queried columns
CREATE INDEX idx_blog_articles_slug ON blog_articles(slug);
CREATE INDEX idx_blog_articles_published ON blog_articles(is_published, created_at DESC);
CREATE INDEX idx_blog_articles_category ON blog_articles(category);
CREATE INDEX idx_blog_articles_search ON blog_articles USING GIN(to_tsvector('english', title || ' ' || excerpt));

-- Compound indexes for common queries
CREATE INDEX idx_articles_published_updated ON blog_articles(is_published, updated_at DESC);
CREATE INDEX idx_articles_by_category_date ON blog_articles(category, created_at DESC);
```

#### 1.2.2 Content Categorization Table
```sql
CREATE TABLE article_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES blog_articles(id) ON DELETE CASCADE,
  category_slug VARCHAR(100) NOT NULL,
  primary_category BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_categories_article ON article_categories(article_id);
CREATE INDEX idx_categories_slug ON article_categories(category_slug);
```

**Categories to track:**
- Sexual Health (sexual-health)
- Caregiver Support (caregiver-support)
- Fatigue Management (fatigue-management)
- Medication Safety (medication-safety)
- Mental Health (mental-health)
- Condition Specific (condition-specific)
- Exercise & Movement (exercise-movement)
- Pain Management (pain-management)
- Work & Disability (work-disability)

#### 1.2.3 Internal Links Tracking
```sql
CREATE TABLE article_internal_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_article_id UUID NOT NULL REFERENCES blog_articles(id) ON DELETE CASCADE,
  target_article_id UUID NOT NULL REFERENCES blog_articles(id) ON DELETE CASCADE,
  anchor_text VARCHAR(255),
  link_type VARCHAR(50) DEFAULT 'related', -- 'related', 'pillar', 'cluster', 'breadcrumb'
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_internal_links_source ON article_internal_links(source_article_id);
CREATE INDEX idx_internal_links_target ON article_internal_links(target_article_id);
```

#### 1.2.4 SEO Analytics Table
```sql
CREATE TABLE seo_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID REFERENCES blog_articles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  keyword VARCHAR(255),
  rank_position INT,
  search_volume INT,
  impressions INT,
  clicks INT,
  ctr DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_seo_analytics_article_date ON seo_analytics(article_id, date DESC);
CREATE INDEX idx_seo_analytics_keyword ON seo_analytics(keyword);
CREATE UNIQUE INDEX idx_seo_analytics_unique ON seo_analytics(article_id, date, keyword);
```

#### 1.2.5 Featured Snippets Tracking
```sql
CREATE TABLE featured_snippets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES blog_articles(id) ON DELETE CASCADE,
  keyword VARCHAR(255) NOT NULL,
  snippet_type VARCHAR(50), -- 'paragraph', 'list', 'table', 'FAQ'
  answer_box_text TEXT,
  featured BOOLEAN DEFAULT FALSE,
  last_featured DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_snippets_article ON featured_snippets(article_id);
CREATE INDEX idx_snippets_featured ON featured_snippets(featured, last_featured DESC);
```

### 1.3 RLS Policies for New Tables
```sql
-- article_categories - public read, authenticated write
CREATE POLICY article_categories_read ON article_categories
  FOR SELECT USING (true);

CREATE POLICY article_categories_write ON article_categories
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Apply same policies to article_internal_links, seo_analytics, featured_snippets
```

**Status:** Implementation required in Lovable/Supabase

---

## 2. EDGE FUNCTIONS OPTIMIZATION

### 2.1 Current Issues
- Dynamic routes (/library/:slug, /arthritis-support/:city) slow to render
- No caching strategy for edge responses
- Missing compression on responses
- No request deduplication

### 2.2 Proposed Edge Functions

#### 2.2.1 Optimized Dynamic Page Rendering
**File:** `supabase/functions/render-dynamic-page/index.ts`

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { pathname } = new URL(req.url);
    const [, type, slug] = pathname.split("/").filter(Boolean);

    // Cache key for deduplication
    const cacheKey = `${type}:${slug}`;
    const cache = await caches.open("render-cache");
    const cached = await cache.match(cacheKey);

    if (cached) {
      return cached;
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    let data;
    let title: string;
    let description: string;
    let schema: object;

    if (type === "library") {
      // /library/:slug
      const { data: topic } = await supabase
        .from("library_topics")
        .select("*")
        .eq("slug", slug)
        .single();

      if (!topic) {
        return new Response("Not Found", { status: 404 });
      }

      data = topic;
      title = topic.title;
      description = topic.meta_description;
      schema = {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        name: title,
        description: description,
        url: `https://livingwitharthritis.org.uk/library/${slug}`,
      };
    } else if (type === "arthritis-support") {
      // /arthritis-support/:city
      const { data: city } = await supabase
        .from("city_support_pages")
        .select("*")
        .eq("slug", slug)
        .single();

      if (!city) {
        return new Response("Not Found", { status: 404 });
      }

      data = city;
      title = `Arthritis Support in ${city.city_name}`;
      description = city.meta_description;
      schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: title,
        description: description,
        areaServed: city.city_name,
        url: `https://livingwitharthritis.org.uk/arthritis-support/${slug}`,
      };
    }

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <meta name="description" content="${description}">
          <script type="application/ld+json">${JSON.stringify(schema)}</script>
        </head>
        <body>
          <!-- SPA mounts here -->
        </body>
      </html>
    `;

    const response = new Response(html, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/html; charset=utf-8",
        "Content-Encoding": "gzip",
      },
    });

    // Cache for 1 hour, stale-while-revalidate for 24 hours
    await cache.put(cacheKey, response.clone());

    return response;
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
```

#### 2.2.2 SEO Analytics Aggregation
**File:** `supabase/functions/aggregate-seo-data/index.ts`

Runs daily to collect Google Search Console data and store in `seo_analytics` table.

```typescript
// Pseudocode - integrate with Google Search Console API
const gscData = await fetchFromGoogleSearchConsole();
for (const item of gscData) {
  await supabase.from("seo_analytics").insert({
    article_id: findArticleByKeyword(item.keyword),
    date: item.date,
    keyword: item.keyword,
    rank_position: item.position,
    search_volume: item.impressions,
    clicks: item.clicks,
    ctr: item.ctr,
  });
}
```

#### 2.2.3 Request Deduplication
Middleware to cache identical requests within 30 seconds.

```typescript
const cache = new Map();
const DEDUP_WINDOW = 30000; // 30 seconds

function getCacheKey(req: Request): string {
  return `${req.method}:${req.url}`;
}

async function withDeduplication(handler: Function) {
  return async (req: Request) => {
    const key = getCacheKey(req);
    const cached = cache.get(key);

    if (cached && Date.now() - cached.time < DEDUP_WINDOW) {
      return cached.response.clone();
    }

    const response = await handler(req);
    cache.set(key, { response, time: Date.now() });

    return response;
  };
}
```

**Status:** Implementation required in Lovable

---

## 3. API LAYER OPTIMIZATION

### 3.1 Current Issues
- No search/filter endpoints
- Missing pagination on large result sets
- No sorting capabilities
- Limited query optimization (N+1 queries)

### 3.2 Proposed API Endpoints

#### 3.2.1 Articles Search & Filter
**Endpoint:** `GET /api/articles/search`

```typescript
interface SearchArticlesRequest {
  q?: string; // Full-text search
  category?: string; // Filter by category
  sort?: "latest" | "popular" | "relevance";
  limit?: number;
  offset?: number;
}

interface SearchArticlesResponse {
  articles: Article[];
  total: number;
  hasMore: boolean;
}

// Implementation: Use GIN index on title/excerpt for FTS
const { data, count } = await supabase
  .from("blog_articles")
  .select("*", { count: "exact" })
  .or(`to_tsvector('english', title || ' ' || excerpt) @@ plainto_tsquery('english', '${q}')`);
```

#### 3.2.2 Related Articles
**Endpoint:** `GET /api/articles/:id/related`

```typescript
interface RelatedArticlesRequest {
  limit?: number;
}

// Returns articles linked internally + same category articles
const { data: related } = await supabase
  .from("article_internal_links")
  .select("target_article_id(slug, title, excerpt)")
  .eq("source_article_id", id)
  .limit(limit || 5);
```

#### 3.2.3 SEO Analytics
**Endpoint:** `GET /api/analytics/article/:id`

```typescript
interface ArticleAnalyticsResponse {
  topKeywords: { keyword: string; rank: number; ctr: number }[];
  impressionsTrend: { date: string; impressions: number }[];
  trafficSources: { source: string; sessions: number }[];
  featuredSnippets: number;
}

const { data: analytics } = await supabase
  .from("seo_analytics")
  .select("keyword, rank_position, ctr")
  .eq("article_id", id)
  .order("rank_position", { ascending: true })
  .limit(10);
```

#### 3.2.4 Pagination Helper
```typescript
interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    offset: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

async function paginate<T>(
  query: any,
  limit: number = 20,
  offset: number = 0
): Promise<PaginatedResponse<T>> {
  const { data, count } = await query
    .select("*", { count: "exact" })
    .range(offset, offset + limit - 1);

  return {
    data,
    pagination: {
      offset,
      limit,
      total: count,
      hasMore: offset + limit < count,
    },
  };
}
```

**Status:** Implementation required in Lovable

---

## 4. ANALYTICS IMPLEMENTATION

### 4.1 Real-Time Dashboard
Create `src/pages/AnalyticsDashboard.tsx` with:
- Keyword rankings over time (chart)
- Featured snippet tracking (count + list)
- Traffic sources (pie chart)
- Top performing articles (leaderboard)
- Conversion metrics (email signups, donations)

### 4.2 Google Search Console Integration
- Daily sync of GSC data (rank position, impressions, clicks, CTR)
- Keyword trend analysis
- Opportunity identification (keywords ranking 11-30 → target for top 10)

### 4.3 Conversion Tracking
```typescript
interface ConversionEvent {
  event_type: "email_signup" | "donation" | "share" | "scroll_depth";
  article_id: UUID;
  user_id: string; // Anonymous if not logged in
  value?: number; // Amount for donations
  timestamp: Date;
}

const trackConversion = async (event: ConversionEvent) => {
  await supabase.from("conversion_events").insert(event);
};
```

**Status:** Requires Google API setup + new React component

---

## 5. CONTENT PIPELINE FIXES

### 5.1 Fix Image URL Null Issue
**Problem:** 123 blog_articles have `image_url = NULL` (created since May 2026)

**Solution:**
```sql
-- Backfill with auto-generated OG image URLs
UPDATE blog_articles
SET image_url = CONCAT('/og-images/', slug, '.png')
WHERE image_url IS NULL
  AND is_published = true
  AND created_at > '2026-05-01';

-- Verify: should show 0 rows
SELECT COUNT(*) FROM blog_articles WHERE image_url IS NULL AND is_published = true;
```

### 5.2 Automated Meta Description Generation
When new articles created (via trigger or webhook):
- If `meta_description` is empty, auto-generate using script
- Run `scripts/update-meta-descriptions.mjs`
- Verify 155-160 character length

### 5.3 Automated Title Optimization
On article publish:
- If title > 60 chars, suggest optimization
- Run `scripts/fix-long-page-titles.mjs`
- Store in `seo_title` field

### 5.4 Auto-Populate Internal Links
New article creation workflow:
- Identify category (sexual health, fatigue, etc.)
- Auto-suggest 3-5 pillar articles to link to
- Generate anchor text recommendations
- Allow editor to accept/customize

**Status:** Partial (manual fixes complete, automation needs implementation)

---

## 6. CACHING STRATEGY

### 6.1 Multi-Layer Caching

#### 6.1.1 Browser Cache
```
Cache-Control: public, max-age=3600, stale-while-revalidate=86400
```
- Static assets: 1 year
- HTML pages: 1 hour
- API responses: 5 minutes

#### 6.1.2 CDN Cache (Vercel Edge)
- Cache entire pages at edge
- Cache API responses globally
- Purge on content updates

#### 6.1.3 Database Query Cache (Redis)
```typescript
const cacheKey = `articles:${slug}`;
let article = await redis.get(cacheKey);

if (!article) {
  article = await supabase
    .from("blog_articles")
    .select("*")
    .eq("slug", slug)
    .single();

  await redis.set(cacheKey, JSON.stringify(article), "EX", 3600);
}
```

### 6.2 Cache Invalidation Strategy
On article update:
- Invalidate article cache
- Invalidate related articles cache
- Invalidate category cache
- Purge CDN cache for article URL

```typescript
async function invalidateArticleCache(articleId: UUID) {
  // Redis
  await redis.del(`articles:${articleSlug}`);

  // Related articles
  const related = await supabase
    .from("article_internal_links")
    .select("target_article_id")
    .eq("source_article_id", articleId);

  for (const { target_article_id } of related) {
    await redis.del(`articles:${targetSlug}`);
  }

  // CDN purge
  await fetch(`https://api.vercel.com/v13/deployments/purge-cache`, {
    method: "POST",
    body: JSON.stringify({ urls: [`/blog/${articleSlug}`] }),
  });
}
```

**Status:** Partial (browser cache headers set, Redis/CDN needs implementation)

---

## 7. SECURITY HARDENING

### 7.1 Rate Limiting
```typescript
import { Ratelimit } from "@upstash/ratelimit";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "1 h"), // 100 requests/hour
});

const { success } = await ratelimit.limit(`ip:${req.ip}`);
if (!success) {
  return new Response("Rate limit exceeded", { status: 429 });
}
```

### 7.2 CORS Hardening
```typescript
const allowedOrigins = [
  "https://livingwitharthritis.org.uk",
  "https://living-with-arthritis.lovable.app",
];

const cors = (origin: string) => {
  if (allowedOrigins.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Credentials": "true",
    };
  }
  return {};
};
```

### 7.3 RLS Policy Audit
Review all Supabase RLS policies:
- [ ] blog_articles: public read, authenticated write
- [ ] library_topics: public read only
- [ ] city_support_pages: public read only
- [ ] seo_analytics: authenticated only
- [ ] conversion_events: authenticated only

### 7.4 Input Validation
```typescript
const validateArticleInput = (data: any) => {
  const schema = z.object({
    title: z.string().min(10).max(200),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    content: z.string().min(500),
    meta_description: z.string().min(120).max(160),
    image_url: z.string().url().optional(),
  });

  return schema.parse(data);
};
```

**Status:** Partial (RLS policies basic, needs comprehensive audit)

---

## 8. PERFORMANCE OPTIMIZATION

### 8.1 Query Optimization

#### 8.1.1 N+1 Query Prevention
Use Supabase `select()` with nested relations:

```typescript
// Before (N+1):
const articles = await supabase.from("blog_articles").select("*");
for (const article of articles) {
  const links = await supabase
    .from("article_internal_links")
    .select("*")
    .eq("source_article_id", article.id);
}

// After (optimized):
const { data } = await supabase
  .from("blog_articles")
  .select("*, article_internal_links(*)");
```

#### 8.1.2 Index Analysis
Monitor slow queries:
```sql
-- Enable query logging
ALTER DATABASE living_with_arthritis SET log_min_duration_statement = 1000; -- 1 second

-- View slow queries
SELECT query, mean_time, calls
FROM pg_stat_statements
WHERE mean_time > 1000
ORDER BY mean_time DESC
LIMIT 10;
```

### 8.2 Response Compression
Enable gzip on all endpoints:
```typescript
import compression from "compression";
app.use(compression());
```

### 8.3 Image Optimization
- WebP format for all images
- Lazy loading on images
- Responsive image sizes (srcset)
- Image CDN (Vercel Image Optimization)

```typescript
<Image
  src={article.image_url}
  alt={article.title}
  width={1200}
  height={630}
  priority={false}
  unoptimized={false}
/>
```

### 8.4 Bundle Size Optimization
```bash
npm run build -- --analyze
# Check: react, tailwindcss, other large deps

# Remove unused dependencies
npm prune --production
```

### 8.5 Core Web Vitals Targets
| Metric | Target | Current |
|--------|--------|---------|
| LCP (Largest Contentful Paint) | <2.5s | TBD |
| FID (First Input Delay) | <100ms | TBD |
| CLS (Cumulative Layout Shift) | <0.1 | TBD |

Monitor with `web-vitals` package.

**Status:** Partial (basic optimization done, comprehensive audit needed)

---

## IMPLEMENTATION TIMELINE

### Week 1-2: Database & Schema
- [ ] Create new tables (categories, internal_links, seo_analytics, featured_snippets)
- [ ] Add indexes to existing tables
- [ ] Backfill image_url NULL values
- [ ] Set up RLS policies

**Commit:** `backend(database): Add schema enhancements and indexes`

### Week 2-3: Edge Functions
- [ ] Optimize dynamic page rendering
- [ ] Add request deduplication
- [ ] Implement cache headers
- [ ] Deploy to Supabase Functions

**Commit:** `backend(edge-functions): Optimize dynamic rendering with caching`

### Week 3: APIs
- [ ] Build search/filter endpoints
- [ ] Add pagination helpers
- [ ] Create related articles endpoint
- [ ] Implement SEO analytics API

**Commit:** `backend(apis): Add search, filter, and analytics endpoints`

### Week 4: Analytics & Content Pipeline
- [ ] Set up Google Search Console sync
- [ ] Create analytics dashboard
- [ ] Fix content pipeline (images, meta, titles)
- [ ] Automate internal link suggestions

**Commit:** `backend(analytics): Add GSC integration and analytics dashboard`

### Week 4-5: Caching & Security
- [ ] Implement Redis caching
- [ ] Configure CDN cache headers
- [ ] Add rate limiting
- [ ] Harden CORS policies
- [ ] Audit RLS policies

**Commit:** `backend(cache): Multi-layer caching and security hardening`

### Week 5-6: Performance
- [ ] Run query analysis and optimization
- [ ] Enable compression
- [ ] Optimize images
- [ ] Analyze bundle size
- [ ] Monitor Core Web Vitals

**Commit:** `backend(performance): Query optimization and core web vitals improvements`

---

## SUCCESS METRICS

### Performance Targets
| Metric | Current | Target | Improvement |
|--------|---------|--------|-------------|
| API response time | 500ms | 100ms | 5x |
| Database query time | 200ms | 20ms | 10x |
| Page load time | 3.5s | 2.0s | 43% |
| LCP | 4s | 2.5s | 38% |
| Cache hit ratio | 0% | 80%+ | 80% |

### Scalability Targets
- [ ] Handle 10x traffic increase (10K → 100K monthly)
- [ ] Support 1,000+ articles without slowdown
- [ ] 99.9% uptime
- [ ] <100ms p95 latency

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Query performance monitoring
- [ ] API response time tracking
- [ ] Cache hit rate monitoring
- [ ] Database connection pooling

---

## RISK MITIGATION

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Database migration downtime | Site goes down | Test in staging first, use blue-green deployment |
| Query performance degrades | Slow API | Monitor slow query log, add indexes iteratively |
| Cache invalidation issues | Stale content | Comprehensive test suite, manual verification |
| RLS policy misconfiguration | Data leak | Security audit before production |

---

## DELIVERABLES CHECKLIST

- [ ] Database schema migrations (Supabase)
- [ ] Edge functions (Supabase Functions)
- [ ] API endpoints (Lovable backend)
- [ ] Analytics dashboard (React component)
- [ ] Caching middleware (Redis + CDN)
- [ ] Security audit report
- [ ] Performance monitoring setup
- [ ] Documentation (API docs, deployment guide)
- [ ] All changes committed to GitHub

---

**Status:** Ready for Lovable implementation  
**Repository:** https://github.com/Louis-Maxwell/livingwitharthritis  
**Deployment:** Automatic via git → Lovable → Production
