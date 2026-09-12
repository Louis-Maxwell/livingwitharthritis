import { onCLS, onFCP, onLCP, onINP, onTTFB } from "web-vitals";
import * as Sentry from "@sentry/react";

export interface CoreWebVitalsMetrics {
  cls?: number;
  fcp?: number;
  inp?: number;
  lcp?: number;
  ttfb?: number;
}

const metrics: CoreWebVitalsMetrics = {};
const route = () => (typeof window === "undefined" ? "unknown" : window.location.pathname);

function rating(metric: string, value: number): string {
  const thresholds: Record<string, [number, number]> = {
    cls: [0.1, 0.25],
    fcp: [1800, 3000],
    inp: [200, 500],
    lcp: [2500, 4000],
    ttfb: [800, 1800],
  };
  const [good, poor] = thresholds[metric] ?? [0, Number.POSITIVE_INFINITY];
  return value <= good ? "good" : value <= poor ? "needs-improvement" : "poor";
}

function attribution(metric: unknown): Record<string, string> {
  const m = metric as { attribution?: Record<string, unknown> };
  const a = m.attribution ?? {};
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(a)) {
    if (typeof value === "string" && value.length <= 300) result[key] = value;
  }
  return result;
}

/**
 * Route-aware RUM. Sentry events include the route/template plus web-vitals
 * attribution, allowing LCP/INP regressions to be fixed at component level
 * instead of relying only on aggregate Lighthouse scores.
 */
const report = (name: string, value: number, metric: unknown, unit = "ms") => {
  const data = {
    value,
    unit,
    rating: rating(name.toLowerCase(), value),
    route: route(),
    navigationType: typeof performance !== "undefined" ? performance.getEntriesByType("navigation")[0]?.name ?? "" : "",
    ...attribution(metric),
  };

  if (Sentry.getClient()) {
    Sentry.captureMessage(`Core Web Vital: ${name}`, {
      level: "info",
      contexts: { web_vital: data },
      tags: { web_vital: name, page_template: route() },
    });
  }

  if (typeof window !== "undefined") {
    const w = window as Window & { gtag?: (...args: unknown[]) => void };
    w.gtag?.("event", `web_vital_${name.toLowerCase()}`, {
      value: Math.round(value),
      event_category: "Web Vitals",
      event_label: `${name}:${route()}`,
      non_interaction: true,
    });
  }
};

export const initWebVitals = () => {
  onLCP((metric) => {
    metrics.lcp = metric.value;
    report("LCP", metric.value, metric);
  });
  onFCP((metric) => {
    metrics.fcp = metric.value;
    report("FCP", metric.value, metric);
  });
  onCLS((metric) => {
    metrics.cls = metric.value;
    report("CLS", metric.value, metric, "score");
  });
  onINP((metric) => {
    metrics.inp = metric.value;
    report("INP", metric.value, metric);
  });
  onTTFB((metric) => {
    metrics.ttfb = metric.value;
    report("TTFB", metric.value, metric);
  });

  if (import.meta.env.MODE === "development") {
    onLCP((m) => console.debug("[RUM] LCP", m.value, route(), attribution(m)));
    onINP((m) => console.debug("[RUM] INP", m.value, route(), attribution(m)));
  }

  return metrics;
};

export const getWebVitals = (): CoreWebVitalsMetrics => metrics;

export const getThresholds = () => ({
  LCP: { good: 2500, poor: 4000, unit: "ms" },
  FCP: { good: 1800, poor: 3000, unit: "ms" },
  CLS: { good: 0.1, poor: 0.25, unit: "score" },
  INP: { good: 200, poor: 500, unit: "ms" },
  TTFB: { good: 800, poor: 1800, unit: "ms" },
});
