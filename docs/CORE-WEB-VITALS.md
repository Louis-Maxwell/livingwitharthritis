# Core Web Vitals Tracking

## Overview

Core Web Vitals are Google's key metrics for measuring real-world user experience. This project automatically captures and reports these metrics to help identify performance issues before they impact users.

**Metrics Tracked:**
- **LCP** (Largest Contentful Paint): Time until the largest element is visible
- **FCP** (First Contentful Paint): Time until first content appears
- **CLS** (Cumulative Layout Shift): Visual stability score (0–1, lower is better)
- **INP** (Interaction to Next Paint): Responsiveness to user input (replaces FID)
- **TTFB** (Time to First Byte): Server response time

## How It Works

1. **Automatic Capture** — metrics collected passively during page load/interaction
2. **Performance Rating** — each metric rated as "good", "needs-improvement", or "poor"
3. **Reporting** — sent to Sentry (for debugging) and Google Analytics (for trend analysis)

### Thresholds

| Metric | Good | Needs Improvement | Poor |
|--------|------|------------------|------|
| LCP | ≤2.5s | 2.5–4s | >4s |
| FCP | ≤1.8s | 1.8–3s | >3s |
| CLS | ≤0.1 | 0.1–0.25 | >0.25 |
| INP | ≤200ms | 200–500ms | >500ms |
| TTFB | ≤800ms | 800–1.8s | >1.8s |

## Usage

### Accessing Metrics Programmatically

```typescript
import { getWebVitals, getThresholds } from "@/lib/web-vitals";

// Get current metrics
const vitals = getWebVitals();
console.log(`LCP: ${vitals.lcp}ms`);

// Get reference thresholds
const thresholds = getThresholds();
console.log(thresholds.LCP.good); // 2500ms
```

### Monitoring in Development

Core Web Vitals are logged to the browser console in development mode:

```
LCP (s)      │ 2.1s    ✓
FCP (s)      │ 0.8s    ✓
CLS          │ 0.05    ✓
INP (ms)     │ 80      ✓
TTFB (ms)    │ 450     ✓
```

### Viewing in Sentry

Navigate to **Performance** in Sentry to see:
- Real user performance metrics
- Performance trends over time
- Errors correlated with slow performance

### Viewing in Google Analytics

Reports show in **Reports > Engagement > Page and screen speed**, including:
- LCP, FCP, CLS, INP as custom event metrics
- Segmented by page, device, browser
- Historical trends

## Optimization Tips

### Improving LCP (Largest Contentful Paint)

- Optimize images (compress, resize, use WebP)
- Minimize JavaScript blocking rendering
- Use CDN for static assets
- Lazy-load below-the-fold content

```html
<!-- Preload critical images -->
<link rel="preload" as="image" href="/hero.webp">
```

### Improving FCP (First Contentful Paint)

- Remove render-blocking CSS/JavaScript
- Inline critical styles above the fold
- Use font-display: swap to avoid invisible text during font load

```css
@font-face {
  font-family: 'Lato';
  font-display: swap; /* Shows fallback immediately */
  src: url('/lato.woff2') format('woff2');
}
```

### Improving CLS (Cumulative Layout Shift)

- Reserve space for images/ads with `width` and `height`
- Avoid dynamic content insertion above existing content
- Use `transform` instead of changing layout properties

```html
<!-- Good: space reserved -->
<img width="400" height="300" src="/photo.jpg" alt="...">

<!-- Bad: layout shift when image loads -->
<img src="/photo.jpg" alt="...">
```

### Improving INP (Interaction to Next Paint)

- Break up long JavaScript tasks (use `setTimeout`)
- Use event delegation to reduce handler count
- Optimize event handler performance

```typescript
// Bad: blocks interaction
for (let i = 0; i < 1000000; i++) {
  doHeavyWork();
}

// Good: yields to browser
for (let i = 0; i < 1000000; i++) {
  doHeavyWork();
  if (i % 100 === 0) await new Promise(r => setTimeout(r, 0));
}
```

### Improving TTFB (Time to First Byte)

- Enable HTTP/2 Server Push for critical resources
- Configure CDN caching headers appropriately
- Use regional edge servers for fastest response

## Troubleshooting

### Metrics showing "pending"

Metrics may not be available until:
- Page interaction occurs (for INP)
- Paint event fires (for FCP/LCP)
- Navigation completes (for TTFB)

Wait a few seconds or interact with the page.

### High CLS in development

Dynamic Tailwind classes may cause layout shifts during development. This should not happen in production builds.

### TTFB very high

May indicate:
- Slow API response (check backend)
- Database query performance (check slow query log)
- CDN misconfiguration (check cache headers)
- Network latency (use geographic load testing)

## Integration with Other Tools

### Google PageSpeed Insights

Visit [pagespeed.insights.com](https://pagespeed.insights.com) to see:
- Your live Core Web Vitals from real users
- Lab metrics simulated in a controlled environment
- Specific improvement recommendations

### Lighthouse

Run in Chrome DevTools:
1. DevTools > Lighthouse tab
2. Select "Performance"
3. Click "Analyze page load"

Shows Core Web Vitals + additional metrics like TTFB, FCP, LCP.

## Configuration

Web Vitals are configured in `src/lib/web-vitals.ts`:

- **Sentry sampling:** 10% in production, 100% in dev (see `initializeSentry()`)
- **Google Analytics:** Automatically sends if gtag is available
- **Development logging:** Enabled via `import.meta.env.MODE === 'development'`

## References

- [Google Web Vitals Guide](https://web.dev/vitals/)
- [MDN: Navigation Timing API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_timing_API)
- [web-vitals Library](https://github.com/GoogleChrome/web-vitals)
