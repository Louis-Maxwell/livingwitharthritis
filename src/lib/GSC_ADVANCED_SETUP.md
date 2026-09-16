# Advanced Google Search Console Integration

## Overview

Living With Arthritis now has advanced GSC integration with real-time monitoring, AI-powered insights, automated recommendations, and integrated dashboards.

## Features

### 1. **Real-Time Metrics Fetching**
```typescript
import { 
  fetchGSCPerformance, 
  fetchGSCCoverage, 
  fetchGSCWebVitals 
} from '@/lib/gsc-advanced';

// Fetch latest performance data
const performance = await fetchGSCPerformance();
console.log(performance.topQueries, performance.topPages);

// Fetch indexation coverage
const coverage = await fetchGSCCoverage();
console.log(coverage.indexationRate, coverage.errors);

// Fetch Web Vitals from GSC
const vitals = await fetchGSCWebVitals();
console.log(vitals.overall.goodPercentage);
```

### 2. **Automated Insights & Recommendations**
```typescript
import { generateGSCInsights } from '@/lib/gsc-advanced';

const insights = await generateGSCInsights(
  performance,
  coverage,
  webVitals
);

console.log(insights.recommendations); // AI-generated suggestions
console.log(insights.alerts); // Issues detected
console.log(insights.performanceScore); // 0-100 score
```

### 3. **Continuous Monitoring**
```typescript
import { monitorGSCMetrics, getCachedGSCMetrics } from '@/lib/gsc-advanced';

// Start monitoring (updates every 24 hours)
monitorGSCMetrics();

// Get cached metrics anytime
const metrics = getCachedGSCMetrics();
console.log(metrics.insights);
```

### 4. **GSC Dashboard Component**
```typescript
import GSCDashboard from '@/components/GSCDashboard';

export default function MyPage() {
  return (
    <GSCDashboard 
      refreshInterval={300000} // 5 minutes
      showCharts={true}
      showRecommendations={true}
    />
  );
}
```

## Key Metrics

### Performance Metrics
- **Total Impressions** - How often pages appear in search results
- **Total Clicks** - CTR from search results
- **Average Position** - Average ranking position
- **Average CTR** - Click-through rate
- **Top Queries** - Best performing search terms
- **Top Pages** - Most visible pages
- **Device Breakdown** - Mobile vs desktop traffic
- **Country Breakdown** - Geographic performance

### Coverage Metrics
- **Total Submitted** - URLs in sitemaps
- **Indexed** - Pages successfully indexed
- **Excluded** - Pages you told Google to skip
- **Errors** - Pages with crawl/indexation issues
- **Indexation Rate** - % of submitted URLs indexed
- **Coverage Issues** - Breakdown by issue type

### Web Vitals Metrics
- **LCP (Largest Contentful Paint)** - Loading performance
- **FID (First Input Delay)** - Interactivity
- **CLS (Cumulative Layout Shift)** - Visual stability
- **Overall Score** - Combined performance

## Insight Types

### Performance Score (0-100)
```
Score Calculation:
- Base: 50 points
- Traffic: +20-30 points based on clicks
- Position: +5-10 points based on ranking
- CTR: +5-10 points based on click rate
```

**What It Means:**
- 80+: Excellent search visibility
- 60-79: Good visibility, room for improvement
- 40-59: Moderate visibility, needs work
- <40: Poor visibility, urgent optimization needed

### Health Score (0-100)
Based on coverage and indexation health:
- Errors count heavily against score
- Excluded pages reduce score
- Valid pages increase score

### Indexation Score (0-100)
Simple calculation:
```
Score = (Indexed Pages / Submitted Pages) × 100
```

**Healthy:** >90% (>90 out of 100)

## Recommendations Engine

The system generates recommendations for:

### Critical Issues (Immediate Action Needed)
- **Low Indexation Rate** - Fix crawl errors
- **Poor Core Web Vitals** - Optimize performance
- **High Error Count** - Resolve 404s and server errors

### High Priority (Within 1 Week)
- Improve page speed (LCP optimization)
- Fix layout shifts (CLS optimization)
- Expand internal linking

### Medium Priority (Within 1 Month)
- Optimize for new keywords
- Improve mobile experience
- Add structured data

### Low Priority (Ongoing)
- Content updates
- Metadata optimization
- Link building

## Analytics Integration

All GSC activities tracked in GA4:

### Events
- `gsc_data_fetch_requested` - Metrics fetch started
- `gsc_coverage_fetch_requested` - Coverage check
- `gsc_web_vitals_fetch_requested` - Vitals check
- `gsc_monitoring_complete` - Monitoring finished
- `gsc_insights_generated` - Insights created

### Event Parameters
- `metric_type`: performance, coverage, web_vitals
- `performance_score`: 0-100
- `health_score`: 0-100
- `indexation_score`: 0-100
- `recommendations_count`: Number generated
- `alerts_count`: Number of alerts

**Monitor in GA4:**
- Reports → Events
- Search: `gsc_`
- Filter by score or count

## Setup Instructions

### Prerequisites
1. **GSC Access** - Admin or full access to property
2. **Google Cloud Project** - For API access
3. **Service Account** - For automated data fetching

### Step 1: Set Up Google Cloud

```bash
# Create project
gcloud projects create living-with-arthritis-gsc

# Enable GSC API
gcloud services enable searchconsole.googleapis.com

# Create service account
gcloud iam service-accounts create gsc-api \
  --display-name="Living With Arthritis GSC API"

# Create key
gcloud iam service-accounts keys create ~/gsc-key.json \
  --iam-account=gsc-api@living-with-arthritis-gsc.iam.gserviceaccount.com
```

### Step 2: Grant Permissions

1. Go to GSC Settings → Users and permissions
2. Add service account email as Owner
3. Confirm permissions applied

### Step 3: Store Credentials

```bash
# Store in environment variable (securely)
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/gsc-key.json"

# Or in .env file (development only)
VITE_GSC_API_KEY="your-api-key"
```

### Step 4: Start Monitoring

```typescript
import { initGSCAdvanced, monitorGSCMetrics } from '@/lib/gsc-advanced';

// Initialize (in App.tsx or pages)
initGSCAdvanced(true); // Auto-start monitoring

// Or manually
monitorGSCMetrics(86400000); // Every 24 hours
```

## Usage Examples

### Example 1: Check Search Performance

```typescript
import { fetchGSCPerformance } from '@/lib/gsc-advanced';

const last30Days = {
  startDate: '2026-07-24',
  endDate: '2026-08-24',
};

const performance = await fetchGSCPerformance(last30Days);

console.log('Top 5 Queries:');
performance.topQueries.slice(0, 5).forEach(q => {
  console.log(`${q.query}: ${q.clicks} clicks, pos ${q.position.toFixed(1)}`);
});
```

### Example 2: Monitor Indexation Health

```typescript
import { fetchGSCCoverage } from '@/lib/gsc-advanced';

const coverage = await fetchGSCCoverage();

if (coverage.indexationRate < 0.8) {
  console.warn('⚠️ Only 80% of pages are indexed!');
  console.log('Errors:', coverage.issues);
}
```

### Example 3: Get Automated Recommendations

```typescript
import { 
  fetchGSCPerformance,
  fetchGSCCoverage, 
  fetchGSCWebVitals,
  generateGSCInsights 
} from '@/lib/gsc-advanced';

const [perf, cov, vitals] = await Promise.all([
  fetchGSCPerformance(),
  fetchGSCCoverage(),
  fetchGSCWebVitals()
]);

const insights = await generateGSCInsights(perf, cov, vitals);

// Show high-priority recommendations
const highPriority = insights.recommendations.filter(
  r => r.priority === 'high'
);

highPriority.forEach(rec => {
  console.log(`\n🎯 ${rec.title}`);
  console.log(`Impact: ${rec.impact}`);
  rec.actionItems.forEach(item => console.log(`  ✓ ${item}`));
});
```

### Example 4: Use Dashboard Component

```typescript
import GSCDashboard from '@/components/GSCDashboard';

export default function AdminPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Search Console Status</h1>
      <GSCDashboard 
        refreshInterval={300000}
        showCharts={true}
        showRecommendations={true}
      />
    </div>
  );
}
```

## Console Commands (Development)

```javascript
// Initialize
import { initGSCAdvanced, monitorGSCMetrics } from '@/lib/gsc-advanced'
initGSCAdvanced(true)

// Get metrics
import { getCachedGSCMetrics, logGSCMetricsSummary } from '@/lib/gsc-advanced'
logGSCMetricsSummary()

// Fetch specific data
import { fetchGSCPerformance, fetchGSCCoverage } from '@/lib/gsc-advanced'
const perf = await fetchGSCPerformance()
const cov = await fetchGSCCoverage()

// Export insights
import { exportGSCInsights } from '@/lib/gsc-advanced'
const json = exportGSCInsights(metrics.insights)
```

## Interpreting Results

### Green Scores (80-100)
- **What:** Excellent performance
- **Action:** Maintain current practices
- **Review:** Monthly for trends

### Yellow Scores (60-79)
- **What:** Good, but can improve
- **Action:** Implement medium-priority recommendations
- **Review:** Bi-weekly for progress

### Red Scores (<60)
- **What:** Needs immediate attention
- **Action:** Prioritize critical recommendations
- **Review:** Weekly until fixed

## Troubleshooting

### No Data Appearing

**Problem:** Dashboard shows no metrics

**Solutions:**
1. Ensure `monitorGSCMetrics()` is called
2. Check API credentials are valid
3. Verify service account has permissions
4. Wait 24 hours for first monitoring cycle

### Outdated Data

**Problem:** Metrics not updating

**Solutions:**
1. Increase monitoring frequency (shorter interval)
2. Manually call `fetchGSCPerformance()` etc.
3. Check API quota limits
4. Verify network connectivity

### High Score But Low Traffic

**Problem:** Score says good but traffic is low

**Causes:**
1. **New site** - Takes time to accumulate traffic
2. **Low competition keywords** - Less search volume
3. **Niche content** - Smaller audience
4. **No backlinks** - Less visibility

**Solutions:**
1. Build more backlinks
2. Optimize for longer-tail keywords
3. Improve content depth
4. Focus on external promotion

## Performance Optimization

### Monitoring Interval
- **Development:** Every 5 minutes for testing
- **Production:** Every 24 hours (API quota)
- **Staging:** Every 6 hours for testing

### Data Caching
Metrics cached in `window.__GSCMetrics__`:
```javascript
// Access without fetching
const metrics = window.__GSCMetrics__
console.log(metrics.insights)
```

### API Quota
- Free tier: 100k requests/day
- With monitoring: ~2 requests/day (well under limit)

## Next Steps

1. **Set up credentials** - Complete Google Cloud setup
2. **Start monitoring** - Initialize in App.tsx
3. **Add dashboard** - Integrate GSCDashboard component
4. **Create alerts** - Set up notification rules
5. **Review weekly** - Check insights and act on recommendations

## Files Created

- ✅ `lib/gsc-advanced.ts` - Core advanced functionality
- ✅ `components/GSCDashboard.tsx` - React dashboard component
- ✅ `lib/GSC_ADVANCED_SETUP.md` - This guide

## Related Documentation

- [GSC Indexing Setup](./GSC_INDEXING_SETUP.md)
- [GSC Integration](./gsc-advanced.ts)
- [Analytics Setup](./ANALYTICS_SETUP.md)

## Support

For issues or questions:
- Check GSC Settings → Verify setup
- Review API credentials
- Check console for errors
- Contact: info@livingwitharthritis.org.uk
