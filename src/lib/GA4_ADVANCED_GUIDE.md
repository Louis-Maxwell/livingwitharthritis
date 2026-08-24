# Google Analytics 4 Advanced Enhancement Guide

## Overview

Complete GA4 enhancement system with custom event tracking, visitor tracking, audience segmentation, conversion funnels, and real-time monitoring.

## Features

### 1. **Custom Event Tracking** (30+ Events)
Track everything that matters for your arthritis support site:

```typescript
// User lifecycle
trackCustomEvent('user_signup')
trackCustomEvent('user_login')
trackCustomEvent('user_profile_update')

// Content engagement
trackCustomEvent('blog_post_view')
trackCustomEvent('guide_read')
trackCustomEvent('exercise_video_view')
trackCustomEvent('resource_download')

// Health tools
trackCustomEvent('symptom_check')
trackCustomEvent('self_assessment_complete')
trackCustomEvent('health_tool_usage')

// Community
trackCustomEvent('community_post_view')
trackCustomEvent('buddy_match_request')
trackCustomEvent('support_group_join')

// Chat
trackCustomEvent('chat_session_start')
trackCustomEvent('chat_message_count')
trackCustomEvent('chat_resolution')

// Conversions
trackCustomEvent('newsletter_signup')
trackCustomEvent('donation_complete')
trackCustomEvent('contact_form_submit')
```

### 2. **Visitor Tracking** (Complete Journey)
Track every visitor from first visit to conversion:

```typescript
import {
  initVisitorTracking,
  getVisitorId,
  getVisitorProfile,
  identifyVisitor,
  isReturningVisitor,
  getVisitCount,
  trackPageVisit,
} from '@/lib/visitor-tracking';

// Initialize on app start
initVisitorTracking();

// Get visitor info anytime
const profile = getVisitorProfile();
console.log(profile);
// {
//   visitorId: "visitor_xxx",
//   userId: "user123",
//   isAuthenticated: true,
//   isReturning: true,
//   visitCount: 5,
//   device: { type: 'mobile', browser: 'Chrome', os: 'iOS' }
// }

// Identify logged-in user
identifyVisitor('user123', {
  email: 'user@example.com',
  name: 'John Doe'
});

// Track pages
trackPageVisit({
  title: 'Osteoarthritis Guide',
  category: 'guide',
  keywords: ['osteoarthritis', 'treatment', 'uk']
});

// Check if returning
if (isReturningVisitor()) {
  console.log('Welcome back! Visit #' + getVisitCount());
}
```

**What Gets Tracked:**
- ✅ Unique visitor ID (auto-generated)
- ✅ First visit date
- ✅ Last visit date
- ✅ Visit count
- ✅ Device info (type, browser, OS)
- ✅ Location (country, region, city)
- ✅ Referrer source
- ✅ Entry/exit pages
- ✅ Session duration
- ✅ Page views
- ✅ Engagement events
- ✅ Conversion status

### 3. **Audience Segmentation** (7 Built-In)
Pre-configured audience segments:

```typescript
import { AUDIENCE_SEGMENTS, setUserAudience } from '@/lib/ga4-advanced';

// Automatically assign user to audience
setUserAudience('newly_diagnosed');  // New diagnosis visitors
setUserAudience('active_exercisers'); // Regular exercise content viewers
setUserAudience('content_readers');   // Blog & guide readers
setUserAudience('community_engaged');  // Active community users
setUserAudience('donors');             // Past donors
setUserAudience('chat_users');         // Using AI chat
setUserAudience('at_risk_churn');      // Showing disengagement

// In GA4, create matching Audiences:
// - Newly Diagnosed
// - Active Exercisers
// - Content Readers
// - Community Engaged
// - Donors
// - Chat Users
// - At Risk for Churn
```

### 4. **Conversion Funnel Tracking** (4 Funnels)
Monitor conversion flows:

```typescript
import { CONVERSION_FUNNELS, trackFunnelStep } from '@/lib/ga4-advanced';

// Donation Funnel
trackFunnelStep('donation', 'View');        // Donate page view
trackFunnelStep('donation', 'Amount Select'); // Selected amount
trackFunnelStep('donation', 'Initiate');    // Started payment
trackFunnelStep('donation', 'Complete');    // Payment done

// Newsletter Signup
trackFunnelStep('newsletter', 'View');      // Page view
trackFunnelStep('newsletter', 'Form Focus');
trackFunnelStep('newsletter', 'Submit');
trackFunnelStep('newsletter', 'Confirm');

// Contact Form
trackFunnelStep('contact_form', 'View');
trackFunnelStep('contact_form', 'Engage');
trackFunnelStep('contact_form', 'Submit');

// Buddy Scheme
trackFunnelStep('buddy_scheme', 'View');
trackFunnelStep('buddy_scheme', 'Learn');
trackFunnelStep('buddy_scheme', 'Start');
trackFunnelStep('buddy_scheme', 'Complete');
```

**In GA4 - Set up Exploration → Funnel Visualization**
- Page 1: Funnel step = "View"
- Page 2: Funnel step = "Amount Select"
- Page 3: Funnel step = "Initiate"
- Page 4: Funnel step = "Complete"

### 5. **Real-Time Monitoring**
Monitor live visitor activity:

```typescript
import { startRealtimeMonitoring } from '@/lib/ga4-advanced';

// Start monitoring (heartbeat every 60 seconds)
startRealtimeMonitoring(60000);

// View in GA4: Realtime → Overview
// See:
// - Active users now
// - Current pages viewed
// - Current traffic sources
// - Conversion events happening
```

### 6. **Custom Dashboards**
Pre-configured dashboard templates:

```typescript
import { GA4_DASHBOARD_CONFIG } from '@/lib/ga4-advanced';

// Dashboard types:
// - Daily Performance Dashboard
// - Weekly Health Dashboard
// - Monthly Strategy Dashboard

// Create in GA4 using these widgets:
/*
Daily:
  - Sessions (7-day comparison)
  - Users (new vs returning)
  - Top pages
  - Conversions
  - Traffic sources

Weekly:
  - Visitor trends
  - Conversion rate
  - Session duration
  - Bounce rate by page
  - Goal completions

Monthly:
  - Traffic growth
  - Conversion growth
  - User growth
  - Audience insights
  - Content performance
*/
```

### 7. **Data Quality Monitoring**
Ensure tracking accuracy:

```typescript
import { monitorDataQuality } from '@/lib/ga4-advanced';

// Check for issues
const quality = monitorDataQuality();
// Returns: {
//   missingEvents: [...],
//   duplicateEvents: [...],
//   unusualPatterns: [...]
// }
```

## Implementation

### Step 1: Initialize in App.tsx

```typescript
import { initGA4Enhancements } from '@/lib/ga4-advanced';
import { initVisitorTracking } from '@/lib/visitor-tracking';

export default function App() {
  useEffect(() => {
    // Initialize GA4 enhancements
    initGA4Enhancements(true); // true = auto-start realtime monitoring
    
    // Initialize visitor tracking
    initVisitorTracking();
  }, []);

  return <YourApp />;
}
```

### Step 2: Track Events Throughout Site

```typescript
// When user signs up
identifyVisitor(userId, { email, name });
setUserAudience('newly_diagnosed');

// When viewing content
trackPageVisit({ title: 'Osteoarthritis Guide', category: 'guide' });
trackCustomEvent('guide_read');

// When using tools
trackCustomEvent('symptom_check');
trackCustomEvent('self_assessment_complete');

// When converting
trackFunnelStep('donation', 'Complete');
trackCustomEvent('newsletter_signup');
```

### Step 3: Set Up GA4 Matching

Create these in Google Analytics 4:

**Events:**
- All 30+ custom events (from CUSTOM_EVENTS)

**Audiences:**
- Newly Diagnosed (page: /guides/newly-diagnosed)
- Active Exercisers (event: exercise_video_view 3+ times)
- Content Readers (event: guide_read OR blog_post_view)
- Community Engaged (page: /community)
- Donors (event: purchase)
- Chat Users (event: chat_session_start)
- At Risk (days_since_last_visit > 30)

**Goals/Conversions:**
- Newsletter signup
- Contact form submit
- Donation
- Chat engagement
- Buddy scheme signup

## Console Commands (Development)

```javascript
// Check visitor profile
import { logVisitorTrackingStatus } from '@/lib/visitor-tracking'
logVisitorTrackingStatus()

// Check GA4 status
import { logGA4Status } from '@/lib/ga4-advanced'
logGA4Status()

// Generate report
import { generateGA4Report } from '@/lib/ga4-advanced'
console.log(generateGA4Report())

// Export visitor data
import { exportVisitorProfile } from '@/lib/visitor-tracking'
console.log(exportVisitorProfile())
```

## Key Metrics to Monitor

### Daily
- Active users
- New vs returning
- Top pages
- Conversion rate
- Traffic sources

### Weekly
- Traffic trends
- Session duration
- Bounce rate
- Engagement rate
- Goal completions

### Monthly
- Growth rates
- Audience growth
- Content performance
- Channel performance
- Attribution insights

## Best Practices

✅ **Do:**
- Track meaningful events (not every click)
- Set user ID for authenticated users
- Assign audiences based on behavior
- Monitor funnels weekly
- Create alerts for key metrics

❌ **Don't:**
- Track personally identifiable information (PII)
- Send duplicate events
- Track everything (causes noise)
- Ignore data quality issues
- Wait to set up dashboards

## Privacy & Compliance

- ✅ Respect user privacy
- ✅ Follow GDPR/CCPA
- ✅ Don't track sensitive health data
- ✅ Anonymize visitor data
- ✅ Provide opt-out option

## Troubleshooting

### Events not appearing in GA4
1. Check GA4 property ID correct
2. Wait 24-48 hours for real-time reporting
3. Use DebugView in GA4
4. Check event names match exactly

### Audience not populating
1. Ensure conditions are set correctly
2. Wait 24-48 hours minimum
3. Check user meets criteria
4. Verify events are firing

### Funnel showing 0 users
1. Ensure steps are in correct order
2. Check event names exactly
3. Verify funnel has had traffic
4. Wait for data to populate

## Next Steps

1. **Week 1:** Initialize tracking and set up events
2. **Week 2:** Create audiences and goals
3. **Week 3:** Set up dashboards
4. **Week 4:** Create alerts and start analysis

## Related Documentation

- [GA4 Indexing Setup](./GSC_INDEXING_SETUP.md)
- [Analytics Setup](./ANALYTICS_SETUP.md)
- [Visitor Tracking](./visitor-tracking.ts)
- [GA4 Advanced](./ga4-advanced.ts)

## Support

For issues with GA4:
- Check GA4 documentation
- Review event implementation
- Test with DebugView
- Check data delay (up to 48 hours)
- Contact: info@livingwitharthritis.org.uk
