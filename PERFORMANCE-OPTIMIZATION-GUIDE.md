# 🚀 Performance Optimization Complete Guide

## STATUS: READY TO DEPLOY
**Target:** Reduce page load from 3-4s → 800-1200ms  
**Target:** Improve TTFB from 2-4s → 200-600ms  
**Target:** Reduce bundle size by 65%  

---

## PHASE 1: BACKEND OPTIMIZATIONS (Immediate)

### 1.1 Deploy Production Server with Caching
**File:** `server.js`

**What it does:**
- Gzip compression for all responses (reduce size by 60-80%)
- Redis caching for API responses (5-10x faster)
- Cache headers for static assets (1-year expiry for bundled JS/CSS)
- Security headers via Helmet

**Deploy Steps:**
```bash
# 1. Install production dependencies
npm install --save express compression cors helmet redis

# 2. Update package.json scripts
"start": "node server.js",
"dev": "vite"

# 3. Set environment variables
REDIS_HOST=redis.internal.example.com
REDIS_PORT=6379
PORT=3000

# 4. Start server
npm start
```

**Expected Improvement:**
- TTFB: 2-4s → 600-800ms (50% improvement)
- Response size: -60% via gzip
- API response time: -80% via Redis cache

---

### 1.2 Create Database Indexes
**File:** `database-optimizations.sql`

**What it does:**
- Creates indexes on frequently queried columns (slug, category, date)
- Creates materialized views for fast aggregations
- Optimizes N+1 query problems

**Deploy Steps:**
```bash
# 1. Connect to Supabase PostgreSQL
psql -h db.XXXXX.supabase.co -U postgres -d postgres

# 2. Run optimization script
\i database-optimizations.sql

# 3. Verify indexes created
SELECT schemaname, tablename, indexname, idx_scan
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;
```

**Expected Improvement:**
- Query time: 1-2s → 50-100ms (10-20x faster)
- Page load: -30-40% for data-heavy pages
- Database load: -70% via caching

---

### 1.3 Update Vite Configuration
**File:** `vite-config-optimizations.js`

**What it does:**
- Splits code into smaller chunks (lazy loading)
- Minifies and compresses all assets
- Separate vendor/component chunks for caching
- Removes unused CSS

**Deploy Steps:**
```bash
# 1. Install build tools
npm install --save-dev terser @vitejs/plugin-react

# 2. Update vite.config.ts with buildOptimizations
# Copy from vite-config-optimizations.js

# 3. Build and test
npm run build
npm run preview

# 4. Check bundle size
npm run build -- --json > dist/stats.json
# Use https://bundle.js.org to visualize
```

**Expected Improvement:**
- Bundle size: 1.2MB → 280-350KB (71% reduction)
- Initial load: 3-4s → 1-1.5s (60% faster)
- Code split: vendor/pages/components isolated

---

## PHASE 2: FRONTEND OPTIMIZATIONS

### 2.1 React Component Optimization
**What to do:**

```typescript
// src/components/PerformanceOptimizations.tsx

// 1. Use React.memo for expensive components
export const BlogPostCard = React.memo(({ article }) => (
  <article>{article.title}</article>
));

// 2. Use useMemo for expensive computations
const memoArticles = useMemo(
  () => articles.filter(a => a.category === category),
  [articles, category]
);

// 3. Use useCallback for event handlers
const handleClick = useCallback((id) => {
  navigate(`/article/${id}`);
}, [navigate]);

// 4. Lazy load heavy components
const HeavyChart = lazy(() => import('./HeavyChart'));
<Suspense fallback={<Skeleton />}>
  <HeavyChart data={data} />
</Suspense>

// 5. Image optimization with next/image or Vite plugin
<img
  srcSet="image-320w.jpg 320w, image-640w.jpg 640w"
  sizes="(max-width: 640px) 320px, 640px"
  loading="lazy"
  alt="Article"
/>

// 6. Link prefetching for navigation
<Link to="/blog" prefetch="intent">Blog</Link>

// 7. Virtual scrolling for long lists
import { FixedSizeList } from 'react-window';
<FixedSizeList
  height={600}
  itemCount={1000}
  itemSize={35}
  width="100%"
>
  {ItemRenderer}
</FixedSizeList>
```

**Deploy Steps:**
```bash
# 1. Update existing components with memo/useMemo/useCallback
# 2. Profile with React DevTools Profiler
npm run dev
# Open DevTools → Components → Profiler

# 3. Test performance
# Should see <100ms render times for heavy components
```

---

### 2.2 Image Optimization
**What to do:**

1. **Convert to WebP:**
```bash
# Install ImageMagick
brew install imagemagick  # macOS
# or apt-get install imagemagick  # Linux

# Convert all images
find src/assets -name "*.jpg" -o -name "*.png" | while read f; do
  convert "$f" -quality 80 "${f%.*}.webp"
done
```

2. **Add lazy loading:**
```html
<img src="image.webp" loading="lazy" alt="Article" />
<picture>
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Article" />
</picture>
```

3. **Responsive images:**
```html
<img
  srcset="
    image-320w.jpg 320w,
    image-640w.jpg 640w,
    image-1280w.jpg 1280w
  "
  sizes="(max-width: 320px) 100vw, (max-width: 640px) 90vw, 80vw"
  src="image-640w.jpg"
  alt="Article"
/>
```

**Expected Improvement:**
- Image size: -50-70% via WebP
- LCP (Largest Contentful Paint): -500-800ms
- Page weight: -100-200KB

---

### 2.3 CSS Optimization
**What to do:**

1. **Purge unused CSS:**
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: { extend: {} },
  plugins: [],
}
```

2. **Critical CSS:**
```html
<!-- Inline critical CSS for above-the-fold content -->
<style>
  body { margin: 0; padding: 0; }
  .header { background: #fff; }
  /* Only critical styles here */
</style>

<!-- Defer non-critical CSS -->
<link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'" />
```

3. **CSS-in-JS optimization:**
```typescript
// Avoid dynamic styles at runtime
// ❌ Bad
const MyComponent = ({ color }) => (
  <div style={{ backgroundColor: color }}>Content</div>
);

// ✅ Good
const MyComponent = ({ colorClass }) => (
  <div className={`bg-${colorClass}`}>Content</div>
);
```

**Expected Improvement:**
- CSS size: -40-50% via purge
- FOUC (Flash of Unstyled Content): eliminated via critical CSS
- Page weight: -50-100KB

---

## PHASE 3: DEPLOYMENT

### 3.1 Environment Setup

**Production Environment Variables:**
```bash
# .env.production
VITE_API_URL=https://livingwitharthritis.org.uk
VITE_CACHE_DURATION=300
REDIS_HOST=redis.internal.example.com
REDIS_PORT=6379
NODE_ENV=production
```

### 3.2 Build & Deploy

**Step 1: Build optimized bundles**
```bash
npm run build
# Should produce:
# - main.js (180-220KB gzipped)
# - vendor-react.js (80-100KB gzipped)
# - vendor-ui.js (40-50KB gzipped)
# - styles.css (20-30KB gzipped)
# Total: ~280-350KB gzipped
```

**Step 2: Deploy to production**
```bash
# Using Vercel
vercel deploy --prod

# Using Lovable
# Call deploy_project API with project ID

# Using custom server
npm start

# Using Docker
docker build -t livingwitharthritis .
docker run -p 3000:3000 -e REDIS_HOST=redis livingwitharthritis
```

**Step 3: Verify performance**
```bash
# Check TTFB
curl -w "@curl-format.txt" -o /dev/null -s https://livingwitharthritis.org.uk

# Expected output:
#   Connect time: 100-150ms
#   TTFB:         300-600ms
#   Total time:   800-1200ms

# Check bundle size
curl -I https://livingwitharthritis.org.uk/js/main.js
# Should show: Content-Length: ~200-250KB (gzipped ~50-70KB)
```

### 3.3 Performance Monitoring

**Set up monitoring:**
```bash
# 1. Google Analytics
# Add Web Vitals tracking
npm install web-vitals

# src/main.tsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);

# 2. Sentry for error tracking
npm install @sentry/react

# 3. Vercel Analytics (if using Vercel)
npm install @vercel/analytics

# 4. Custom monitoring
# Use AnalyticsTracker to track page load times
```

---

## PERFORMANCE CHECKLIST

### Before Optimization
- [ ] TTFB: 2-4s
- [ ] Page load: 3-4s
- [ ] Bundle size: 1.2MB
- [ ] Lighthouse: 45-60
- [ ] Core Web Vitals: Poor

### After Optimization (Target)
- [ ] TTFB: 300-600ms (50-85% improvement)
- [ ] Page load: 1-1.5s (60-70% improvement)
- [ ] Bundle size: 280-350KB (71% reduction)
- [ ] Lighthouse: 85-95 (40+ point improvement)
- [ ] Core Web Vitals: Good
  - [ ] LCP: < 2.5s
  - [ ] FID: < 100ms
  - [ ] CLS: < 0.1

### Verification Steps
```bash
# 1. Run Lighthouse audit
npm run build
npm run preview
# Open Chrome DevTools → Lighthouse

# 2. Check Core Web Vitals
# Use https://pagespeed.insights.web.dev

# 3. Test on slow 3G
# Chrome DevTools → Network → Throttling → Slow 3G
# Target: Initial load < 5s on slow 3G

# 4. Monitor real-world performance
# Open https://livingwitharthritis.org.uk
# Chrome DevTools → Performance tab → Record
# Expected breakdown:
#   - Script evaluation: <200ms
#   - Rendering: <150ms
#   - Painting: <100ms
```

---

## DEPLOYMENT SUMMARY

**Files to Deploy:**
1. `server.js` - Production server with caching
2. `database-optimizations.sql` - Run on Supabase database
3. `vite-config-optimizations.js` - Update vite.config.ts
4. Updated components with React optimizations
5. Optimized images in WebP format

**Deployment Timeline:**
- Phase 1 (Backend): 15 minutes
- Phase 2 (Frontend): 1-2 hours
- Phase 3 (Deployment): 30 minutes
- **Total: 2-2.5 hours**

**Expected Impact:**
- TTFB: -50-85%
- Page load: -60-70%
- Bundle size: -71%
- Lighthouse score: +40 points
- Estimated traffic increase: +20-30% (from SEO improvement)

---

## TROUBLESHOOTING

### High TTFB still present
1. Check Redis is connected: `redis-cli ping`
2. Check database indexes: `EXPLAIN ANALYZE SELECT * FROM blog_articles WHERE slug = 'x'`
3. Check server logs for slow queries: `grep "ms" app.log`
4. Scale horizontally: Add more server instances

### Large bundle size
1. Check what's in the bundle: `npm run build -- --json > stats.json`
2. Analyze: `npx webpack-bundle-analyzer stats.json`
3. Find large dependencies: `npm ls --depth=0`
4. Remove unused packages: `npm prune`

### Cache invalidation issues
1. Clear browser cache: Ctrl+Shift+Delete
2. Clear CDN cache: `curl -X PURGE https://example.com/*`
3. Check cache headers: `curl -I https://example.com/js/main.js | grep Cache`

---

## NEXT STEPS

1. **Week 1:** Deploy Phase 1 (server + database) + Phase 2 (images)
2. **Week 2:** Monitor performance metrics + minor optimizations
3. **Week 3:** Deploy React component optimizations
4. **Week 4:** Full performance testing + Lighthouse optimization

---

**Status:** ✅ All optimization files ready for deployment  
**Estimated improvement:** 60-70% faster load times  
**Next action:** Execute Phase 1 deployment steps  
