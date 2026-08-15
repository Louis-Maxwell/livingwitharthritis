import { getCLS, getFCP, getFID, getLCP, getNavigationTiming, getINP } from 'web-vitals';
import * as Sentry from '@sentry/react';

export interface CoreWebVitalsMetrics {
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  fid?: number; // First Input Delay (deprecated, use INP)
  inp?: number; // Interaction to Next Paint
  lcp?: number; // Largest Contentful Paint
  ttfb?: number; // Time to First Byte
}

const metrics: CoreWebVitalsMetrics = {};

// Send metrics to Sentry for monitoring
const sendToSentry = (name: string, value: number, unit: string = 'ms') => {
  if (!window.__SENTRY_CLIENT__) return; // Sentry not initialized

  Sentry.captureMessage(`Core Web Vital: ${name}`, {
    level: 'info',
    contexts: {
      metrics: {
        [name]: {
          value,
          unit,
          rating: getRating(name, value),
        },
      },
    },
  });
};

// Send to Google Analytics if configured
const sendToGoogleAnalytics = (name: string, value: number) => {
  if (typeof window === 'undefined' || !('gtag' in window)) return;

  (window as any).gtag('event', name, {
    value: Math.round(value),
    event_category: 'Web Vitals',
    event_label: name,
    non_interaction: true,
  });
};

// Determine performance rating: good, needs improvement, or poor
const getRating = (metric: string, value: number): string => {
  const thresholds: Record<string, [number, number]> = {
    cls: [0.1, 0.25], // Good ≤ 0.1, Poor > 0.25
    fcp: [1800, 3000], // Good ≤ 1.8s, Poor > 3s
    fid: [100, 300], // Good ≤ 100ms, Poor > 300ms
    inp: [200, 500], // Good ≤ 200ms, Poor > 500ms
    lcp: [2500, 4000], // Good ≤ 2.5s, Poor > 4s
    ttfb: [800, 1800], // Good ≤ 800ms, Poor > 1.8s
  };

  if (!(metric in thresholds)) return 'unknown';

  const [good, poor] = thresholds[metric];
  if (value <= good) return 'good';
  if (value <= poor) return 'needs-improvement';
  return 'poor';
};

// Initialize Core Web Vitals tracking
export const initWebVitals = () => {
  // Largest Contentful Paint
  getLCP((metric) => {
    metrics.lcp = metric.value;
    sendToSentry('LCP', metric.value);
    sendToGoogleAnalytics('page_view_lcp', metric.value);
  });

  // First Contentful Paint
  getFCP((metric) => {
    metrics.fcp = metric.value;
    sendToSentry('FCP', metric.value);
    sendToGoogleAnalytics('page_view_fcp', metric.value);
  });

  // Cumulative Layout Shift
  getCLS((metric) => {
    metrics.cls = metric.value;
    sendToSentry('CLS', metric.value);
    sendToGoogleAnalytics('page_view_cls', metric.value * 1000); // Convert to 0-1000 scale
  });

  // First Input Delay (legacy) / Interaction to Next Paint (modern)
  // Use INP for newer browsers, FID for older ones
  if ('PerformanceObserver' in window) {
    try {
      // Try INP first (more accurate)
      getINP((metric) => {
        metrics.inp = metric.value;
        sendToSentry('INP', metric.value);
        sendToGoogleAnalytics('page_view_inp', metric.value);
      });
    } catch {
      // Fall back to FID for older browsers
      getFID((metric) => {
        metrics.fid = metric.value;
        sendToSentry('FID', metric.value);
        sendToGoogleAnalytics('page_view_fid', metric.value);
      });
    }
  }

  // Time to First Byte (from Navigation Timing API)
  getNavigationTiming((metric) => {
    if (metric.responseStart && metric.fetchStart) {
      const ttfb = metric.responseStart - metric.fetchStart;
      metrics.ttfb = ttfb;
      sendToSentry('TTFB', ttfb);
      sendToGoogleAnalytics('page_view_ttfb', ttfb);
    }
  });

  // Log metrics to console in development
  if (import.meta.env.MODE === 'development') {
    console.table({
      'LCP (s)': `${(metrics.lcp || 0) / 1000}s`,
      'FCP (s)': `${(metrics.fcp || 0) / 1000}s`,
      'CLS': metrics.cls || 'pending',
      'INP (ms)': metrics.inp || 'pending',
      'TTFB (ms)': metrics.ttfb || 'pending',
    });
  }

  return metrics;
};

// Get current metrics
export const getWebVitals = (): CoreWebVitalsMetrics => metrics;

// Report metric thresholds (for reference)
export const getThresholds = () => ({
  LCP: { good: 2500, poor: 4000, unit: 'ms' },
  FCP: { good: 1800, poor: 3000, unit: 'ms' },
  CLS: { good: 0.1, poor: 0.25, unit: 'score' },
  INP: { good: 200, poor: 500, unit: 'ms' },
  TTFB: { good: 800, poor: 1800, unit: 'ms' },
});
