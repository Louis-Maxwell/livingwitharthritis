# Vercel Analytics & Monitoring Setup

**Status:** Ready to Configure  
**Platform:** Vercel + Lovable

## Overview

Vercel provides multiple analytics products to monitor your production site:

1. **Web Analytics** — User interactions, page views, performance
2. **Speed Insights** — Core Web Vitals from real users
3. **Function Logs** — Serverless function execution logs
4. **Monitoring** — Error tracking and uptime

## 1. Enable Vercel Web Analytics

### Setup (5 minutes)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select **livingwitharthritis** project
3. Navigate to **Analytics** tab
4. Click **Enable Web Analytics**
5. Choose plan:
   - **Free:** 100K events/month
   - **Pro:** Unlimited (included with Pro subscription)

### How It Works

Vercel automatically injects analytics script into your pages. No additional setup needed in code.

### What Gets Tracked (Automatically)

- **Page views** — User navigates to a page
- **Navigation timing** — Page load performance
- **Resource timing** — Asset load times
- **Core Web Vitals** — LCP, CLS, FID/INP
- **User interactions** — Clicks, form submissions
- **Errors** — Client-side JavaScript errors

## 2. Integrate with Google Analytics 4

For more detailed analytics, connect Vercel to GA4:

### Option A: Via Google Analytics Property

1. Vercel > Analytics > Settings
2. Click **Connect to Google Analytics**
3. Select your GA4 property
4. Grant permissions
5. Vercel data now flows into GA4

### Option B: Manual Integration

Our site already has GA4 configured. Vercel Web Analytics is supplementary:

- **Vercel Analytics:** Real User Monitoring (RUM) at Vercel's edge
- **GA4:** Detailed user behavior, conversions, custom events

Both can run simultaneously.

## 3. Speed Insights Setup

Monitor Core Web Vitals from real user traffic.

### Enable Speed Insights

1. Vercel Dashboard > **Analytics** > **Speed Insights**
2. Click **Enable**
3. Select data source: **Production** (default)

### What It Tracks

| Metric | Good | Needs Work | Poor |
|--------|------|-----------|------|
| **LCP** | ≤2.5s | 2.5–4s | >4s |
| **CLS** | ≤0.1 | 0.1–0.25 | >0.25 |
| **FID** | ≤100ms | 100–300ms | >300ms |
| **INP** | ≤200ms | 200–500ms | >500ms |

### Dashboard View

1. Vercel > **Speed Insights**
2. See real-time Web Vitals from actual users
3. Breakdown by:
   - Device (desktop, mobile, tablet)
   - Browser
   - Geography
   - Page

### Alerting

Set up alerts for degraded performance:

1. Vercel > **Settings** > **Monitoring**
2. **Create Alert**
3. Choose trigger:
   - Core Web Vitals exceed threshold
   - Performance score drops
   - Error rate increases
4. Set notification channel (email, Slack, webhook)

## 4. Function Logs & Monitoring

Monitor serverless functions (edge functions, API routes).

### View Function Logs

1. Vercel > **Deployments** > Select latest
2. Click **Function Logs** tab
3. View real-time execution logs
4. Filter by:
   - Function name
   - Status (success, error, timeout)
   - Duration

### Set Up Error Monitoring

1. Vercel > **Settings** > **Monitoring**
2. **Create Alert** for function errors
3. Alert on:
   - High error rate (>5% of invocations)
   - Specific error types (500 errors, timeouts)
   - Increased latency (>5s)

### Example Log Output

```
GET /api/blog-articles 200 45ms
GET /api/user/profile 500 120ms (Database timeout)
POST /api/contact 200 89ms
```

## 5. Custom Monitoring & Alerts

### Set Up Slack Notifications

Alert channel: [#production-alerts](https://slack.com)

1. Vercel > **Settings** > **Integrations**
2. Search **Slack**
3. Connect Slack workspace
4. Select **livingwitharthritis** channel
5. Configure alerts:
   - Deployment success/failure
   - Performance degradation
   - Error spikes

### Set Up Email Alerts

1. Vercel > **Settings** > **Team Settings**
2. **Email Preferences**
3. Enable:
   - Deployment notifications
   - Error alerts
   - Performance warnings

### Create Uptime Monitoring

Monitor if site is always available:

**Option 1: Vercel Monitoring** (if available on plan)
1. Vercel > **Monitoring** > **Add Check**
2. URL: `https://livingwitharthritis.org.uk`
3. Interval: Every 5 minutes
4. Alert on: Any failure

**Option 2: External Tools**
- [UptimeRobot](https://uptimerobot.com/) — Free uptime monitoring
- [Statuspage.io](https://www.statuspage.io/) — Status page for users
- [Pingdom](https://www.pingdom.com/) — Advanced monitoring

## 6. Dashboard Setup

### Key Dashboard

Create a custom dashboard to see at a glance:

1. Vercel > **Analytics** > Create custom view
2. Add cards:
   - Traffic (last 7 days)
   - Core Web Vitals (today)
   - Top pages by visits
   - Error rate
   - Deployment status

### Bookmark Key URLs

- **Analytics:** https://vercel.com/dashboard/livingwitharthritis/analytics
- **Speed Insights:** https://vercel.com/dashboard/livingwitharthritis/analytics/speed-insights
- **Logs:** https://vercel.com/dashboard/livingwitharthritis/logs
- **Deployments:** https://vercel.com/dashboard/livingwitharthritis/deployments

## 7. Data Integration

### Export Analytics Data

Vercel provides CSV exports for custom analysis:

1. Vercel > **Analytics** > **Export**
2. Choose date range
3. Download CSV
4. Import to Excel, Google Sheets, or data tool

### Connect to Data Studio

Create custom reports:

1. **Google Data Studio** > Create > New report
2. Add data source: **Vercel** (if available)
3. Or: Import exported CSV as data source
4. Build custom dashboards

## 8. Monitoring & Alerts Summary

### Weekly Checklist

- [ ] Review Vercel Web Analytics (traffic, engagement)
- [ ] Check Speed Insights (Core Web Vitals status)
- [ ] Review Function Logs for errors
- [ ] Compare with GA4 for consistency

### Monthly Checklist

- [ ] Generate performance report (Vercel + GA4 + GSC)
- [ ] Identify performance regressions
- [ ] Plan optimizations
- [ ] Review error patterns

### Quarterly Checklist

- [ ] Comprehensive performance audit
- [ ] Compare against competitors (Semrush)
- [ ] Plan major optimizations
- [ ] Review infrastructure costs

## 9. Troubleshooting

### Web Analytics not showing data

**Issue:** No traffic in Web Analytics dashboard

**Solutions:**
1. Verify analytics is enabled (Vercel > Analytics)
2. Wait 5-10 minutes for data to appear
3. Check if traffic is actually hitting the site
4. Verify CDN is not caching old version
5. Check browser console for JavaScript errors

### Speed Insights incomplete

**Issue:** Core Web Vitals showing "Not enough data"

**Solutions:**
1. Wait 24-48 hours for real user data
2. Drive traffic to the site
3. Use Google PageSpeed Insights for lab data (testing)
4. Check if users are actually visiting the page

### Alert not triggering

**Issue:** Alert configured but not firing

**Solutions:**
1. Verify alert is enabled
2. Check notification channel (email, Slack)
3. Verify thresholds are being exceeded
4. Check alert logs in Vercel

## 10. Best Practices

### Monitoring Strategy

1. **Real User Monitoring (RUM):** Vercel Analytics + Speed Insights
2. **Synthetic Monitoring:** Scheduled tests (UptimeRobot, Pingdom)
3. **Error Tracking:** Sentry (already configured)
4. **User Analytics:** Google Analytics (already configured)

### Alert Fatigue Prevention

- Set conservative thresholds (don't alert on minor changes)
- Only alert on critical issues
- Use different channels for different severity levels
   - **Critical:** Slack + Email
   - **Warning:** Email only
   - **Info:** Slack only

### Performance Budgets

Set goals to maintain:

- **LCP:** ≤2.5s (target: 2.0s)
- **CLS:** ≤0.1 (target: 0.05)
- **INP:** ≤200ms (target: 100ms)
- **Page Load:** ≤3s (target: 2s)

Monitor these on every deployment.

## Resources

- [Vercel Analytics Docs](https://vercel.com/docs/analytics)
- [Vercel Speed Insights](https://vercel.com/docs/speed-insights)
- [Vercel Monitoring](https://vercel.com/docs/monitoring)
- [Web Vitals Optimization](https://web.dev/vitals/)

## Next Steps

1. ✅ Enable Vercel Web Analytics
2. ✅ Enable Speed Insights
3. ✅ Connect Slack for alerts
4. ✅ Set up uptime monitoring
5. ✅ Create custom dashboard
6. ✅ Schedule weekly review

---

**Status:** Ready for immediate implementation
