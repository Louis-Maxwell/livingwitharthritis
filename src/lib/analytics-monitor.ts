/**
 * Analytics Monitoring Dashboard
 * Real-time monitoring of GA4 and GSC performance
 * Helpful for debugging and monitoring key metrics
 */

import { getWebVitals, getThresholds } from './analytics';

export interface AnalyticsStatus {
  ga4Ready: boolean;
  gscReady: boolean;
  evaristReady: boolean;
  consentStatus: 'accepted' | 'pending' | 'denied';
  sessionStartTime: number;
  pageViewCount: number;
  eventCount: number;
}

export interface PerformanceReport {
  webVitals: ReturnType<typeof getWebVitals>;
  thresholds: ReturnType<typeof getThresholds>;
  allGood: boolean;
  sampleStatus: "pending" | "good" | "needs-improvement";
}

/**
 * Check GA4 readiness
 */
export const isGA4Ready = (): boolean => {
  if (typeof window === 'undefined') return false;
  return typeof window.gtag === 'function' || Array.isArray(window.dataLayer);
};

/**
 * Check Evarist analytics readiness
 */
export const isEvaristReady = (): boolean => {
  if (typeof window === 'undefined') return false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return typeof (window as any).evarist === 'function';
};

/**
 * Check GSC verification (meta tag presence)
 */
export const isGSCVerified = (): boolean => {
  if (typeof document === 'undefined') return false;
  const gscMeta = document.querySelector('meta[name="google-site-verification"]');
  return !!gscMeta?.getAttribute('content');
};

/**
 * Get current consent status
 */
export const getConsentStatus = (): AnalyticsStatus['consentStatus'] => {
  if (typeof localStorage === 'undefined') return 'pending';

  try {
    const raw = localStorage.getItem("lwa_cv3");
    if (raw) return JSON.parse(raw).a === true ? "accepted" : "denied";
    const legacy = localStorage.getItem("cookie-consent");
    return legacy === "accepted" ? "accepted" : legacy ? "denied" : "pending";
  } catch { return "pending"; }

};

/**
 * Get overall analytics status
 */
export const getAnalyticsStatus = (): AnalyticsStatus => {
  return {
    ga4Ready: isGA4Ready(),
    gscReady: isGSCVerified(),
    evaristReady: isEvaristReady(),
    consentStatus: getConsentStatus(),
    sessionStartTime: performance.timing?.navigationStart || 0,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pageViewCount: (window as any).__pageViewCount__ || 0,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    eventCount: (window as any).__eventCount__ || 0,
  };
};

/**
 * Get performance report with Web Vitals
 */
export const getPerformanceReport = (): PerformanceReport => {
  const vitals = getWebVitals();
  const thresholds = getThresholds();

  const complete = vitals.lcp !== undefined && vitals.cls !== undefined && vitals.inp !== undefined;
  const allGood = complete && vitals.lcp! <= thresholds.LCP.good &&
    vitals.cls! <= thresholds.CLS.good && vitals.inp! <= thresholds.INP.good;
  return { webVitals: vitals, thresholds, allGood,
    sampleStatus: !complete ? "pending" : allGood ? "good" : "needs-improvement" };

};

/**
 * Generate a comprehensive health check report
 */
export const generateHealthReport = (): {
  status: AnalyticsStatus;
  performance: PerformanceReport;
  issues: string[];
  recommendations: string[];
} => {
  const status = getAnalyticsStatus();
  const performance = getPerformanceReport();
  const issues: string[] = [];
  const recommendations: string[] = [];

  // Check GA4
  if (!status.ga4Ready) {
    issues.push('GA4 not loaded');
    recommendations.push('Verify GA4 ID in index.html and check consent banner');
  }

  // Check GSC
  if (!status.gscReady) {
    recommendations.push('No verification meta tag detected; check GSC directly because DNS verification is also supported.');
  }

  // Check Evarist
  if (!status.evaristReady) {
    issues.push('Evarist not loaded');
    recommendations.push('Check Evarist script in analytics loader');
  }

  // Check consent
  if (status.consentStatus === 'denied') {
    issues.push('Analytics consent denied');
    recommendations.push('No analytics data will be collected');
  }

  // Check Web Vitals
  if (performance.webVitals.lcp && performance.webVitals.lcp > performance.thresholds.LCP.poor) {
    issues.push(`LCP poor: ${Math.round(performance.webVitals.lcp)}ms`);
    recommendations.push('Optimize largest contentful paint: reduce JS, optimize images, use lazy loading');
  }

  if (performance.webVitals.cls && performance.webVitals.cls > performance.thresholds.CLS.poor) {
    issues.push(`CLS poor: ${performance.webVitals.cls.toFixed(3)}`);
    recommendations.push('Fix layout shifts: reserve space for dynamic content, avoid inserting DOM elements');
  }

  if (performance.webVitals.inp && performance.webVitals.inp > performance.thresholds.INP.poor) {
    issues.push(`INP poor: ${Math.round(performance.webVitals.inp)}ms`);
    recommendations.push('Optimize interactions: break up long JavaScript tasks, use requestIdleCallback');
  }

  return {
    status,
    performance,
    issues,
    recommendations,
  };
};

/**
 * Log analytics status to console (for debugging)
 */
export const logAnalyticsStatus = (): void => {
  const report = generateHealthReport();

  console.group('🔍 Analytics Health Report');
  console.table({
    'GA4 Ready': report.status.ga4Ready ? '✅' : '❌',
    'GSC Meta Tag Present': report.status.gscReady ? '✅' : '❌',
    'Evarist Ready': report.status.evaristReady ? '✅' : '❌',
    'Consent Status': report.status.consentStatus,
  });

  console.group('📊 Performance Metrics');
  console.table({
    LCP: report.performance.webVitals.lcp
      ? `${Math.round(report.performance.webVitals.lcp)}ms (good: ≤${report.performance.thresholds.LCP.good}ms)`
      : 'pending',
    FCP: report.performance.webVitals.fcp
      ? `${Math.round(report.performance.webVitals.fcp)}ms (good: ≤${report.performance.thresholds.FCP.good}ms)`
      : 'pending',
    CLS: report.performance.webVitals.cls
      ? `${report.performance.webVitals.cls.toFixed(3)} (good: ≤${report.performance.thresholds.CLS.good})`
      : 'pending',
    INP: report.performance.webVitals.inp
      ? `${Math.round(report.performance.webVitals.inp)}ms (good: ≤${report.performance.thresholds.INP.good}ms)`
      : 'pending',
    TTFB: report.performance.webVitals.ttfb
      ? `${Math.round(report.performance.webVitals.ttfb)}ms (good: ≤${report.performance.thresholds.TTFB.good}ms)`
      : 'pending',
  });
  console.groupEnd();

  if (report.issues.length > 0) {
    console.group('⚠️  Issues Found');
    report.issues.forEach((issue) => console.warn(issue));
    console.groupEnd();
  }

  if (report.recommendations.length > 0) {
    console.group('💡 Recommendations');
    report.recommendations.forEach((rec) => console.log(rec));
    console.groupEnd();
  }

  console.log('✨ Overall Status:', report.performance.allGood ? 'All Good!' : 'Issues detected');
  console.groupEnd();
};

/**
 * Set up automatic health checks (useful for monitoring in dev/staging)
 */
export const setupAutomaticHealthChecks = (intervalMs: number = 60000): void => {
  if (typeof window === 'undefined') return;

  // Run initial check
  if (import.meta.env.MODE === 'development') {
    logAnalyticsStatus();
  }

  // Set up periodic checks
  setInterval(() => {
    const report = generateHealthReport();
    if (report.issues.length > 0 && import.meta.env.MODE === 'development') {
      console.warn('[Analytics] Issues detected in health check:', report.issues);
    }
  }, intervalMs);
};

/**
 * Get GSC dashboard URL
 */
export const getGSCDashboardUrl = (): string => {
  return 'https://search.google.com/search-console?resource_id=sc-domain%3Alivingwitharthritis.org.uk';
};

/**
 * Get GA4 dashboard URL
 */
export const getGA4DashboardUrl = (): string => {
  return 'https://analytics.google.com/analytics/web/#/p546097857/reports/intelligenthome';
};

/**
 * Open analytics dashboards in new windows
 */
export const openAnalyticsDashboards = (): void => {
  if (typeof window === 'undefined') return;
  window.open(getGA4DashboardUrl(), 'ga4-dashboard');
  window.open(getGSCDashboardUrl(), 'gsc-dashboard');
};

/**
 * Export current report as JSON (for sharing/debugging)
 */
export const exportHealthReport = (): string => {
  const report = generateHealthReport();
  return JSON.stringify(report, null, 2);
};

/**
 * Copy report to clipboard
 */
export const copyHealthReportToClipboard = async (): Promise<void> => {
  if (typeof navigator === 'undefined') return;
  const report = exportHealthReport();
  try {
    await navigator.clipboard.writeText(report);
    console.log('✅ Health report copied to clipboard');
  } catch (err) {
    console.error('❌ Failed to copy report:', err);
  }
};
