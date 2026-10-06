import { onCLS, onFCP, onLCP, onINP, onTTFB, type Metric } from "web-vitals";
import { trackEvent } from "./analytics";

export interface CoreWebVitalsMetrics { cls?: number; fcp?: number; inp?: number; lcp?: number; ttfb?: number; }
const metrics: CoreWebVitalsMetrics = {};
let initialised = false;
export const getThresholds = () => ({
  LCP: { good: 2500, poor: 4000, unit: "ms" }, FCP: { good: 1800, poor: 3000, unit: "ms" },
  CLS: { good: 0.1, poor: 0.25, unit: "score" }, INP: { good: 200, poor: 500, unit: "ms" },
  TTFB: { good: 800, poor: 1800, unit: "ms" },
});
export const getWebVitals = (): CoreWebVitalsMetrics => metrics;
export function initWebVitals(): CoreWebVitalsMetrics {
  if (typeof window === "undefined" || initialised) return metrics;
  initialised = true;
  const report = (metric: Metric) => {
    const key = metric.name.toLowerCase() as keyof CoreWebVitalsMetrics;
    metrics[key] = metric.value;
    // Keep existing names, but use the metric's true units (CLS is an unscaled score).
    trackEvent(`page_view_${key}`, { metric_name: metric.name, metric_id: metric.id,
      value: metric.name === "CLS" ? Number(metric.value.toFixed(4)) : Math.round(metric.value),
      unit: metric.name === "CLS" ? "score" : "ms", rating: metric.rating,
      navigation_type: metric.navigationType });
  };
  onLCP(report); onFCP(report); onCLS(report); onINP(report); onTTFB(report);
  return metrics;
}
