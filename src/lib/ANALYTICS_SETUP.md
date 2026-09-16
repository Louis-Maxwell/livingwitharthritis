# Analytics & SEO Setup Guide

## Overview

Living With Arthritis implements a comprehensive analytics system combining Google Analytics 4 (GA4), Google Search Console (GSC), and Evarist for visitor behavior analysis. This document explains the setup, usage, and monitoring.

## Google Analytics 4 (GA4)

### Configuration

- **GA4 Property ID**: `G-ZLLSD3PXZ9`
- **Location**: `src/lib/analytics.ts` (consolidated module)
- **Setup**: `index.html` (consent-gated loader)

### Key Features

1. **Consent-Gated Loading**: GA4 only loads after user accepts analytics cookies
   - Prevents tracking before consent
   - Provides GDPR/CCPA compliance
   - Triggers on `cookie-consent-accepted` event

2. **Web Vitals Tracking**: Core Web Vitals automatically sent to GA4
   - LCP (Largest Contentful Paint)
   - FCP (First Contentful Paint)
   - CLS (Cumulative Layout Shift)
   - INP (Interaction to Next Paint)
   - TTFB (Time to First Byte)

3. **Comprehensive Event Tracking**:
   - Conversions (donation, newsletter, contact, buddy scheme)
   - Engagement (scroll depth, external links, button clicks)
   - Navigation (page views, internal links)
   - Content (video views, resource access)
   - Errors (app errors)

### Main Module: `analytics.ts`

```typescript
import {
  trackEvent,
  trackDonationComplete,
  trackNewsletterSignup,
  trackContactSubmit,
  initWebVitals,
  setUserProperties,
} from '@/lib/analytics';

// Track custom event
trackEvent('custom_event', { param1: 'value' });

// Initialize Web Vitals
initWebVitals();

// Set user properties for segmentation
setUserProperties({ user_type: 'recently_diagnosed' });
```

## Google Search Console (GSC) Integration

### Configuration

- **GSC Verification**: Meta tag in `index.html`
  ```html
  <meta name="google-site-verification" content="8tQzVt9eFqNcL0z_C5wK4XmJ6pRvSdL9pM2nO0aP1bQ" />
  ```

- **Module**: `(removed — unused GSC postMessage listener; see gsc-advanced / gsc-indexing)`
- **Dashboard**: https://search.google.com/search-console/welcome?resource_id=https://livingwitharthritis.org.uk/

### Features

Track GSC-specific metrics in GA4:
- Search performance (impressions, clicks, CTR, position)
- Indexation status
- Crawl errors (404, 5xx, forbidden)
- Mobile usability issues
- Security issues
- URL inspection results
- Sitemap submissions

### Usage

```typescript
import {
  trackGSCSearchQuery,
  trackIndexationStatus,
  trackCrawlError,
  trackMobileUsabilityIssue,
} from '@/lib/gsc-advanced';

// Track when user lands from search
trackGSCSearchQuery({
  query: 'osteoarthritis exercises',
  position: 3,
  impressions: 250,
  clicks: 5,
  ctr: 0.02,
});

// Track crawl errors
trackCrawlError({
  errorType: 'notFound',
  affectedUrls: 2,
  firstDetected: new Date().toISOString(),
});
```

## Conversion Tracking

### Module: `conversion-tracking.ts`

Centralized tracking for key business conversions with funnel analysis:

#### Donation Flow
```typescript
import { trackDonationFlow } from '@/lib/conversion-tracking';

trackDonationFlow.viewPage();
trackDonationFlow.selectAmount(50, 'monthly');
trackDonationFlow.initiate(50, 'monthly');
trackDonationFlow.processing('txn_12345', 50);
trackDonationFlow.complete('txn_12345', 50, 'monthly');
```

#### Newsletter Flow
```typescript
import { trackNewsletterFlow } from '@/lib/conversion-tracking';

trackNewsletterFlow.viewPrompt('footer');
trackNewsletterFlow.fieldFocus('email');
trackNewsletterFlow.signupAttempt('user@example.com');
trackNewsletterFlow.signupSuccess();
```

#### Contact Form Flow
```typescript
import { trackContactFlow } from '@/lib/conversion-tracking';

trackContactFlow.viewForm('general');
trackContactFlow.fieldFocus('email');
trackContactFlow.formAttempt('general', 4);
trackContactFlow.formSuccess('general');
```

#### Community Actions
```typescript
import { trackCommunityFlow } from '@/lib/conversion-tracking';

trackCommunityFlow.buddy.viewPage();
trackCommunityFlow.buddy.signupComplete();

trackCommunityFlow.supportGroup.viewPage('London Arthritis Support');
trackCommunityFlow.supportGroup.joinComplete('London Arthritis Support');
```

## Analytics Monitoring

### Module: `analytics-monitor.ts`

Real-time monitoring and debugging tools:

#### Check Status
```typescript
import { 
  getAnalyticsStatus, 
  logAnalyticsStatus,
  getPerformanceReport,
  generateHealthReport,
} from '@/lib/analytics-monitor';

// Quick status check
const status = getAnalyticsStatus();
console.log(status);

// Detailed health report
const report = generateHealthReport();
console.log(report.issues, report.recommendations);

// Console visualization
logAnalyticsStatus();
```

#### Open Dashboards
```typescript
import { openAnalyticsDashboards } from '@/lib/analytics-monitor';

// Open both GA4 and GSC dashboards
openAnalyticsDashboards();
```

#### Export Report
```typescript
import { exportHealthReport, copyHealthReportToClipboard } from '@/lib/analytics-monitor';

const json = exportHealthReport();
await copyHealthReportToClipboard();
```

### Manual Health Check

In browser console:
```javascript
// Check status
window.__analyticsMonitor?.logAnalyticsStatus();

// Generate report
window.__analyticsMonitor?.generateHealthReport();

// Open dashboards
window.__analyticsMonitor?.openAnalyticsDashboards();
```

## Evarist Analytics

Real-time visitor behavior tracking (separate from GA4):
- **Setup**: Consent-gated loader in `index.html`
- **ID**: `11C6BZx6hg`
- **Dashboard**: https://app.evarist.ai

Evarist provides visitor flow visualization and heatmaps without extra configuration.

## Landing Pages Tracking

Special tracking for main entry points:

```typescript
import { LANDING_PAGES, isLandingPage } from '@/lib/analytics';

// Add to tracking
if (isLandingPage(location.pathname)) {
  trackEvent('landing_page_view', {
    landing_page: location.pathname,
  });
}
```

**Current landing pages:**
- `/` (home)
- `/about`
- `/diet`
- `/exercises`
- `/arthritis-flare-ups`
- `/guides/exercise`

## Event Categories in GA4

| Category | Events |
|----------|--------|
| **Conversion** | contact_form_submit, newsletter_signup, buddy_scheme_signup, support_group_join, purchase, generate_lead |
| **Engagement** | scroll_depth, click_external_link, button_click, search, form_interaction, video_view, resource_access |
| **Navigation** | click_internal_link, page_view, page_navigation |
| **Web Vitals** | page_view_lcp, page_view_fcp, page_view_cls, page_view_inp, page_view_ttfb |
| **Crawl/SEO** | gsc_crawl_error, gsc_indexation_status, gsc_mobile_usability_issue, gsc_security_issue |
| **Error** | app_error |

## Setting User Properties

Track user segments for better analysis:

```typescript
import {
  setUserType,
  setConditionType,
  setContentType,
  setPageEngagementMetrics,
} from '@/lib/analytics';

// On first visit
setUserType('recently_diagnosed');
setConditionType('osteoarthritis');

// Per page
setContentType('guide');

// Engagement metrics
setPageEngagementMetrics({
  timeOnPage: 45000,
  scrollDepth: 75,
  interactionCount: 8,
});
```

## GA4 Goals/Conversions Setup

Configure these conversions in GA4 settings:

1. **donation** - tracked via `purchase` event
2. **newsletter_signup** - tracked via `newsletter_signup` event
3. **contact_form** - tracked via `contact_form_submit` event
4. **buddy_scheme** - tracked via `buddy_scheme_signup` event
5. **support_group** - tracked via `support_group_join` event
6. **web_vitals** - track Core Web Vitals performance

## Debugging

### Enable Debug Mode
```typescript
import { enableGTAGDebug } from '@/lib/analytics';

enableGTAGDebug(); // Events log to console
```

### Check Consent Status
```javascript
// In browser console
localStorage.getItem('cookie-consent')
localStorage.getItem('lwa_cv3')
```

### Real-time Event Viewer
1. Go to GA4 Property Settings
2. Real-time → Create a real-time report
3. Filter by event names

### GSC Health
https://search.google.com/search-console/welcome?resource_id=https://livingwitharthritis.org.uk/

Check:
- Coverage (indexed vs excluded vs error)
- Core Web Vitals report
- Mobile usability issues
- Security issues

## Privacy & Compliance

✅ **Implemented:**
- Consent-gated analytics (GDPR)
- No data collection before consent
- Evarist consent flow
- User privacy controls

⚠️ **Remember:**
- Always respect user privacy preferences
- Don't track personal identifiable information
- Keep consent flows transparent
- Monitor for data policy compliance

## Troubleshooting

| Issue | Solution |
|-------|----------|
| GA4 not loading | Check consent status, verify GA_ID in index.html, check CSP headers |
| GSC not verified | Verify meta tag in index.html, check Search Console settings |
| Web Vitals not reporting | Wait 24h for data to populate, check browser compatibility |
| Events not appearing | Check: 1) consent status 2) event names match GA4 schema 3) no errors in console |
| High bounce rate | Check landing page quality, review scroll depth metrics, analyze traffic source |

## Related Files

- `src/lib/analytics.ts` - Main GA4 module (consolidated)
- `(removed — unused GSC postMessage listener; see gsc-advanced / gsc-indexing)` - GSC tracking
- `src/lib/conversion-tracking.ts` - Conversion funnels
- `src/lib/analytics-monitor.ts` - Monitoring & debugging
- `index.html` - GA4 & GSC configuration
- `src/components/landing/CookieBanner.tsx` - Consent management

## Support

For questions or issues:
- GA4 Help: https://support.google.com/analytics
- GSC Help: https://support.google.com/webmasters
- Report bugs: info@livingwitharthritis.org.uk
