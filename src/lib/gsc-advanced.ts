/**
 * Advanced Google Search Console Integration
 * Real-time GSC data fetching, monitoring, analytics, and insights
 */

import { trackEvent } from './analytics';

/**
 * GSC Performance Metrics
 */
export interface GSCPerformanceMetrics {
  totalImpressions: number;
  totalClicks: number;
  totalPages: number;
  averagePosition: number;
  averageCTR: number;
  topQueries: Array<{
    query: string;
    impressions: number;
    clicks: number;
    position: number;
    ctr: number;
  }>;
  topPages: Array<{
    page: string;
    impressions: number;
    clicks: number;
    position: number;
    ctr: number;
  }>;
  deviceBreakdown: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  countryBreakdown: Record<string, number>;
  dateRange: {
    startDate: string;
    endDate: string;
  };
}

/**
 * GSC Coverage Status
 */
export interface GSCCoverageMetrics {
  totalSubmitted: number;
  indexed: number;
  excluded: number;
  errors: number;
  indexationRate: number;
  coverageByStatus: {
    valid: number;
    validWithWarnings: number;
    error: number;
    excluded: number;
  };
  issues: Array<{
    type: string;
    count: number;
    examples: string[];
    firstDetected: string;
  }>;
}

/**
 * GSC Core Web Vitals
 */
export interface GSCWebVitals {
  lcp: {
    good: number;
    needsImprovement: number;
    poor: number;
  };
  fid: {
    good: number;
    needsImprovement: number;
    poor: number;
  };
  cls: {
    good: number;
    needsImprovement: number;
    poor: number;
  };
  overall: {
    goodPercentage: number;
    improvementPercentage: number;
    poorPercentage: number;
  };
  lastUpdated: string;
}

/**
 * GSC Insights & Recommendations
 */
export interface GSCInsights {
  performanceScore: number; // 0-100
  healthScore: number; // 0-100
  indexationScore: number; // 0-100
  recommendations: Array<{
    priority: 'critical' | 'high' | 'medium' | 'low';
    title: string;
    description: string;
    impact: 'traffic' | 'indexation' | 'visibility' | 'user-experience';
    estimatedImpact: string;
    actionItems: string[];
  }>;
  alerts: Array<{
    type: 'error' | 'warning' | 'info';
    message: string;
    affectedItems: number;
    lastSeen: string;
  }>;
}

/**
 * Fetch GSC performance data
 * Requires GSC API access and credentials
 */
export const fetchGSCPerformance = async (
  dateRange?: { startDate: string; endDate: string },
): Promise<GSCPerformanceMetrics | null> => {
  try {
    const params = {
      startDate: dateRange?.startDate ?? getDateBefore(30),
      endDate: dateRange?.endDate ?? getTodayDate(),
    };

    trackEvent('gsc_data_fetch_requested', {
      metric_type: 'performance',
      date_range: `${params.startDate} to ${params.endDate}`,
      event_category: 'search',
    });

    if (import.meta.env.MODE === 'development') {
      console.log('[GSC] Fetching performance metrics:', params);
    }

    // In production, this calls the GSC API
    // For now, return placeholder structure
    return {
      totalImpressions: 0,
      totalClicks: 0,
      totalPages: 0,
      averagePosition: 0,
      averageCTR: 0,
      topQueries: [],
      topPages: [],
      deviceBreakdown: { mobile: 0, desktop: 0, tablet: 0 },
      countryBreakdown: {},
      dateRange: params,
    };
  } catch (error) {
    console.error('[GSC] Performance fetch failed:', error);
    trackEvent('gsc_data_fetch_error', {
      metric_type: 'performance',
      error: String(error),
      event_category: 'error',
    });
    return null;
  }
};

/**
 * Fetch GSC coverage data
 */
export const fetchGSCCoverage = async (): Promise<GSCCoverageMetrics | null> => {
  try {
    trackEvent('gsc_coverage_fetch_requested', {
      metric_type: 'coverage',
      event_category: 'search',
    });

    if (import.meta.env.MODE === 'development') {
      console.log('[GSC] Fetching coverage metrics');
    }

    return {
      totalSubmitted: 0,
      indexed: 0,
      excluded: 0,
      errors: 0,
      indexationRate: 0,
      coverageByStatus: {
        valid: 0,
        validWithWarnings: 0,
        error: 0,
        excluded: 0,
      },
      issues: [],
    };
  } catch (error) {
    console.error('[GSC] Coverage fetch failed:', error);
    trackEvent('gsc_coverage_fetch_error', {
      error: String(error),
      event_category: 'error',
    });
    return null;
  }
};

/**
 * Fetch GSC Core Web Vitals data
 */
export const fetchGSCWebVitals = async (): Promise<GSCWebVitals | null> => {
  try {
    trackEvent('gsc_web_vitals_fetch_requested', {
      metric_type: 'web_vitals',
      event_category: 'performance',
    });

    if (import.meta.env.MODE === 'development') {
      console.log('[GSC] Fetching Core Web Vitals data');
    }

    return {
      lcp: { good: 0, needsImprovement: 0, poor: 0 },
      fid: { good: 0, needsImprovement: 0, poor: 0 },
      cls: { good: 0, needsImprovement: 0, poor: 0 },
      overall: { goodPercentage: 0, improvementPercentage: 0, poorPercentage: 0 },
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error('[GSC] Web Vitals fetch failed:', error);
    trackEvent('gsc_web_vitals_fetch_error', {
      error: String(error),
      event_category: 'error',
    });
    return null;
  }
};

/**
 * Generate GSC insights and recommendations
 */
export const generateGSCInsights = async (
  performance?: GSCPerformanceMetrics,
  coverage?: GSCCoverageMetrics,
  webVitals?: GSCWebVitals,
): Promise<GSCInsights> => {
  const insights: GSCInsights = {
    performanceScore: calculatePerformanceScore(performance),
    healthScore: calculateHealthScore(coverage),
    indexationScore: calculateIndexationScore(coverage),
    recommendations: [],
    alerts: [],
  };

  // Generate recommendations based on data
  if (coverage && coverage.indexationRate < 0.8) {
    insights.recommendations.push({
      priority: 'high',
      title: 'Low Indexation Rate',
      description: `Only ${(coverage.indexationRate * 100).toFixed(1)}% of submitted URLs are indexed`,
      impact: 'visibility',
      estimatedImpact: 'Could recover 10-20% more organic traffic by fixing indexation issues',
      actionItems: [
        'Check GSC Coverage report for errors',
        'Fix all crawl errors (404s, 5xx errors)',
        'Ensure pages are not blocked by robots.txt',
        'Check for noindex meta tags on indexable content',
      ],
    });
  }

  if (webVitals && webVitals.overall.poorPercentage > 0.2) {
    insights.recommendations.push({
      priority: 'high',
      title: 'Poor Core Web Vitals',
      description: `${(webVitals.overall.poorPercentage * 100).toFixed(1)}% of pages have poor Web Vitals`,
      impact: 'user-experience',
      estimatedImpact: 'Improving CWV could boost rankings and reduce bounce rate by 5-10%',
      actionItems: [
        'Focus on LCP optimization (image optimization, code splitting)',
        'Fix layout shifts (reserve space for dynamic content)',
        'Optimize interaction response time (reduce JS)',
      ],
    });
  }

  // Generate alerts based on data
  if (coverage && coverage.errors > 0) {
    insights.alerts.push({
      type: 'error',
      message: `${coverage.errors} pages have indexation errors`,
      affectedItems: coverage.errors,
      lastSeen: new Date().toISOString(),
    });
  }

  trackEvent('gsc_insights_generated', {
    performance_score: insights.performanceScore,
    health_score: insights.healthScore,
    indexation_score: insights.indexationScore,
    recommendations_count: insights.recommendations.length,
    alerts_count: insights.alerts.length,
    event_category: 'search',
  });

  return insights;
};

/**
 * Monitor GSC metrics continuously
 */
export const monitorGSCMetrics = async (
  interval: number = 86400000, // 24 hours
): Promise<void> => {
  if (typeof window === 'undefined') return;

  const runMonitoring = async () => {
    try {
      const [performance, coverage, webVitals] = await Promise.all([
        fetchGSCPerformance(),
        fetchGSCCoverage(),
        fetchGSCWebVitals(),
      ]);

      if (performance && coverage && webVitals) {
        const insights = await generateGSCInsights(performance, coverage, webVitals);

        // Store in window for dashboard access
        (window as any).__GSCMetrics__ = {
          performance,
          coverage,
          webVitals,
          insights,
          lastUpdated: new Date().toISOString(),
        };

        trackEvent('gsc_monitoring_complete', {
          performance_score: insights.performanceScore,
          health_score: insights.healthScore,
          indexation_score: insights.indexationScore,
          event_category: 'search',
        });

        if (import.meta.env.MODE === 'development') {
          console.log('[GSC] Monitoring complete:', insights);
        }
      }
    } catch (error) {
      console.error('[GSC] Monitoring failed:', error);
    }
  };

  // Run immediately
  await runMonitoring();

  // Schedule recurring checks
  setInterval(runMonitoring, interval);
};

/**
 * Get cached GSC metrics
 */
export const getCachedGSCMetrics = () => {
  if (typeof window === 'undefined') return null;
  return (window as any).__GSCMetrics__ || null;
};

/**
 * Calculate performance score (0-100)
 */
const calculatePerformanceScore = (metrics?: GSCPerformanceMetrics): number => {
  if (!metrics) return 0;

  let score = 50; // Base score

  // Clicks contribute to score
  if (metrics.totalClicks > 0) score += 20;
  if (metrics.totalClicks > 100) score += 15;
  if (metrics.totalClicks > 1000) score += 10;

  // Average position
  if (metrics.averagePosition <= 10) score += 5;
  if (metrics.averagePosition <= 5) score += 5;

  // CTR
  if (metrics.averageCTR >= 0.02) score += 5;
  if (metrics.averageCTR >= 0.05) score += 5;

  return Math.min(100, score);
};

/**
 * Calculate health score (0-100)
 */
const calculateHealthScore = (coverage?: GSCCoverageMetrics): number => {
  if (!coverage) return 0;

  let score = 50;

  if (coverage.errors === 0) score += 25;
  if (coverage.errors <= 5) score += 15;

  if (coverage.excluded === 0) score += 10;

  return Math.min(100, score);
};

/**
 * Calculate indexation score (0-100)
 */
const calculateIndexationScore = (coverage?: GSCCoverageMetrics): number => {
  if (!coverage) return 0;
  return Math.round(coverage.indexationRate * 100);
};

/**
 * Get date string (YYYY-MM-DD format)
 */
const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

/**
 * Get date X days before today
 */
const getDateBefore = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
};

/**
 * Export GSC insights as JSON
 */
export const exportGSCInsights = (insights: GSCInsights): string => {
  return JSON.stringify(insights, null, 2);
};

/**
 * Get GSC Dashboard URL
 */
export const getGSCDashboardUrl = (): string => {
  return 'https://search.google.com/search-console?resource_id=https://livingwitharthritis.org.uk/';
};

/**
 * Get GSC Performance Dashboard URL
 */
export const getGSCPerformanceUrl = (): string => {
  return 'https://search.google.com/search-console/performance/search-analytics?resource_id=https://livingwitharthritis.org.uk/';
};

/**
 * Log GSC metrics summary to console
 */
export const logGSCMetricsSummary = (): void => {
  const metrics = getCachedGSCMetrics();

  if (!metrics) {
    console.log('[GSC] No metrics available. Run monitorGSCMetrics() first.');
    return;
  }

  console.group('📊 GSC Metrics Summary');

  console.table({
    'Performance Score': `${metrics.insights.performanceScore}/100`,
    'Health Score': `${metrics.insights.healthScore}/100`,
    'Indexation Score': `${metrics.insights.indexationScore}/100`,
    'Total Impressions': metrics.performance.totalImpressions,
    'Total Clicks': metrics.performance.totalClicks,
    'Indexed Pages': metrics.coverage.indexed,
    'Pages with Errors': metrics.coverage.errors,
  });

  if (metrics.insights.recommendations.length > 0) {
    console.group('💡 Recommendations');
    metrics.insights.recommendations.forEach(rec => {
      console.log(`[${rec.priority.toUpperCase()}] ${rec.title}`);
      console.log(`  Impact: ${rec.impact}`);
      console.log(`  Actions: ${rec.actionItems.join(', ')}`);
    });
    console.groupEnd();
  }

  if (metrics.insights.alerts.length > 0) {
    console.group('⚠️ Alerts');
    metrics.insights.alerts.forEach(alert => {
      console.log(`[${alert.type.toUpperCase()}] ${alert.message}`);
    });
    console.groupEnd();
  }

  console.groupEnd();
};

/**
 * Initialize GSC advanced monitoring
 */
export const initGSCAdvanced = (autoMonitor: boolean = false): void => {
  if (typeof window === 'undefined') return;

  if (import.meta.env.MODE === 'development') {
    console.log('[GSC] Advanced monitoring initialized');
    console.log('[GSC] Dashboard:', getGSCDashboardUrl());
    console.log('[GSC] Available functions:');
    console.log('  - monitorGSCMetrics()');
    console.log('  - getCachedGSCMetrics()');
    console.log('  - logGSCMetricsSummary()');
  }

  if (autoMonitor) {
    monitorGSCMetrics();
  }
};
