import { onCLS, onFCP, onLCP, onINP, onTTFB } from 'web-vitals';

type GtagFn = (command: "event" | "config" | "set" | "js", ...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

interface EventParams {
  [key: string]: string | number | boolean | string[] | undefined;
}

export const LANDING_PAGES = [
  "/",
  "/about",
  "/diet",
  "/exercises",
  "/arthritis-flare-ups",
  "/guides/exercise",
] as const;

export const isLandingPage = (path: string): boolean => {
  const p = path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
  return (LANDING_PAGES as readonly string[]).includes(p);
};

// Core event tracking
export const trackEvent = (
  name: string,
  params: Record<string, unknown> = {},
): void => {
  try {
    if (typeof window === "undefined") return;
    if (import.meta.env.DEV) {
      console.debug('[GA4]', name, params);
    }
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: name, ...params });
    }
  } catch {
    /* analytics must never break UX */
  }
};

// Set user properties for segmentation
export const setUserProperties = (properties: EventParams): void => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  try {
    window.gtag("set", properties);
  } catch {
    /* silently fail */
  }
};

// ============ Conversion Events ============

export const trackContactSubmit = (opts: { topic?: string } = {}): void => {
  const params = {
    method: "contact_form",
    topic: opts.topic ?? "general",
    value: 1,
    currency: "GBP",
  };
  trackEvent("contact_form_submit", params);
  trackEvent("generate_lead", { ...params, method: "contact" });
};

export const trackNewsletterSignup = (): void => {
  trackEvent("newsletter_signup", {
    event_category: "conversion",
    value: 0,
  });
  trackEvent("sign_up", { method: "newsletter" });
  trackEvent("generate_lead", { method: "newsletter", value: 1, currency: "GBP" });
};

export const trackBuddySchemeSignup = (): void => {
  trackEvent("buddy_scheme_signup", {
    event_category: "conversion",
    value: 0,
  });
};

export const trackSupportGroupJoin = (groupName: string): void => {
  trackEvent("support_group_join", {
    group_name: groupName,
    event_category: "conversion",
    value: 0,
  });
};

export const trackDonationInitiate = (amount?: number): void => {
  trackEvent("begin_checkout", {
    value: amount,
    currency: "GBP",
    items: [
      {
        item_id: "donation",
        item_name: "Charity Donation",
        item_category: "donation",
        price: amount,
        quantity: 1,
      },
    ],
  });
};

export const trackDonationComplete = (opts: {
  transactionId: string;
  amount: number;
  donationType?: "one-time" | "monthly";
}): void => {
  trackEvent("donate", {
    transaction_id: opts.transactionId,
    value: opts.amount,
    currency: "GBP",
    donation_type: opts.donationType ?? "one-time",
  });
  trackEvent("purchase", {
    transaction_id: opts.transactionId,
    value: opts.amount,
    currency: "GBP",
    affiliation: "living-with-arthritis",
    coupon: "donation",
    items: [
      {
        item_id: "donation",
        item_name: "Charity Donation",
        item_category: opts.donationType ?? "one-time",
        price: opts.amount,
        quantity: 1,
      },
    ],
  });
};

export const trackResourceDownload = (resourceName: string, resourceType: string): void => {
  trackEvent("file_download", {
    file_name: resourceName,
    file_extension: resourceType,
    event_category: "engagement",
  });
};

// ============ Engagement Events ============

export const trackScrollDepth = (percent: 25 | 50 | 75 | 100): void => {
  trackEvent("scroll_depth", {
    percent_scrolled: percent,
    event_category: "engagement",
  });
};

export const trackExternalLink = (url: string, linkText?: string): void => {
  trackEvent("click_external_link", {
    link_url: url,
    link_text: linkText,
    event_category: "engagement",
  });
};

export const trackInternalLink = (linkText: string, targetPage: string): void => {
  trackEvent("click_internal_link", {
    link_text: linkText,
    target_page: targetPage,
    event_category: "navigation",
  });
};

export const trackButtonClick = (buttonName: string, buttonLocation?: string): void => {
  trackEvent("button_click", {
    button_name: buttonName,
    button_location: buttonLocation,
    event_category: "engagement",
  });
};

export const trackSearch = (searchTerm: string, resultCount?: number): void => {
  trackEvent("search", {
    search_term: searchTerm,
    search_result_count: resultCount,
    event_category: "engagement",
  });
};

export const trackFormInteraction = (formId: string, fieldName: string): void => {
  trackEvent("form_interaction", {
    form_id: formId,
    field_name: fieldName,
    event_category: "engagement",
  });
};

// ============ Navigation & Content ============

export const trackVideoView = (videoId: string, videoTitle: string): void => {
  trackEvent("video_view", {
    video_id: videoId,
    video_title: videoTitle,
    event_category: "engagement",
  });
};

export const trackVideoProgress = (videoId: string, progress: number): void => {
  trackEvent("video_progress", {
    video_id: videoId,
    progress_percent: progress,
    event_category: "engagement",
  });
};

export const trackResourceView = (
  resourceId: string,
  resourceName: string,
  resourceCategory: string,
): void => {
  trackEvent("view_item", {
    items: [
      {
        item_id: resourceId,
        item_name: resourceName,
        item_category: resourceCategory,
      },
    ],
  });
};

export const trackResourceAccess = (resourceId: string, resourceName: string): void => {
  trackEvent("resource_access", {
    resource_id: resourceId,
    resource_name: resourceName,
    event_category: "engagement",
  });
};

// ============ User Properties & Segmentation ============

export const setContentType = (
  contentType: "article" | "guide" | "tool" | "page",
): void => {
  setUserProperties({ content_type: contentType });
};

export const setConditionType = (conditionType: string): void => {
  setUserProperties({ condition_type: conditionType });
};

export const setUserType = (
  userType: "recently_diagnosed" | "long_term" | "caregiver" | "healthcare_professional",
): void => {
  setUserProperties({ user_type: userType });
};

export const setPageEngagementMetrics = (metrics: {
  timeOnPage?: number;
  scrollDepth?: number;
  interactionCount?: number;
}): void => {
  const props: EventParams = {};
  if (metrics.timeOnPage) props.time_on_page_ms = metrics.timeOnPage;
  if (metrics.scrollDepth) props.scroll_depth = metrics.scrollDepth;
  if (metrics.interactionCount) props.interaction_count = metrics.interactionCount;
  setUserProperties(props);
};

// ============ Error Tracking ============

export const trackAppError = (
  errorType: string,
  errorMessage: string,
  errorPage?: string,
): void => {
  trackEvent("app_error", {
    error_type: errorType,
    error_message: errorMessage,
    error_page: errorPage,
    event_category: "error",
  });
};

// ============ Performance & Web Vitals ============

export interface CoreWebVitalsMetrics {
  cls?: number;
  fcp?: number;
  inp?: number;
  lcp?: number;
  ttfb?: number;
}

const metricsCache: CoreWebVitalsMetrics = {};

const getRating = (metric: string, value: number): string => {
  const thresholds: Record<string, [number, number]> = {
    cls: [0.1, 0.25],
    fcp: [1800, 3000],
    inp: [200, 500],
    lcp: [2500, 4000],
    ttfb: [800, 1800],
  };

  if (!(metric in thresholds)) return "unknown";
  const [good, poor] = thresholds[metric];
  if (value <= good) return "good";
  if (value <= poor) return "needs-improvement";
  return "poor";
};

export const initWebVitals = (): CoreWebVitalsMetrics => {
  if (typeof window === "undefined") return metricsCache;

  onLCP((metric) => {
    metricsCache.lcp = metric.value;
    trackEvent("page_view_lcp", {
      value: Math.round(metric.value),
      event_category: "Web Vitals",
      rating: getRating("lcp", metric.value),
    });
  });

  onFCP((metric) => {
    metricsCache.fcp = metric.value;
    trackEvent("page_view_fcp", {
      value: Math.round(metric.value),
      event_category: "Web Vitals",
      rating: getRating("fcp", metric.value),
    });
  });

  onCLS((metric) => {
    metricsCache.cls = metric.value;
    trackEvent("page_view_cls", {
      value: Math.round(metric.value * 1000),
      event_category: "Web Vitals",
      rating: getRating("cls", metric.value),
    });
  });

  onINP((metric) => {
    metricsCache.inp = metric.value;
    trackEvent("page_view_inp", {
      value: Math.round(metric.value),
      event_category: "Web Vitals",
      rating: getRating("inp", metric.value),
    });
  });

  onTTFB((metric) => {
    metricsCache.ttfb = metric.value;
    trackEvent("page_view_ttfb", {
      value: Math.round(metric.value),
      event_category: "Web Vitals",
      rating: getRating("ttfb", metric.value),
    });
  });

  if (import.meta.env.MODE === "development") {
    console.table({
      "LCP (s)": `${(metricsCache.lcp || 0) / 1000}s`,
      "FCP (s)": `${(metricsCache.fcp || 0) / 1000}s`,
      CLS: metricsCache.cls || "pending",
      "INP (ms)": metricsCache.inp || "pending",
      "TTFB (ms)": metricsCache.ttfb || "pending",
    });
  }

  return metricsCache;
};

export const getWebVitals = (): CoreWebVitalsMetrics => metricsCache;

export const getThresholds = () => ({
  LCP: { good: 2500, poor: 4000, unit: "ms" },
  FCP: { good: 1800, poor: 3000, unit: "ms" },
  CLS: { good: 0.1, poor: 0.25, unit: "score" },
  INP: { good: 200, poor: 500, unit: "ms" },
  TTFB: { good: 800, poor: 1800, unit: "ms" },
});

// ============ Debug Helpers ============

export const enableGTAGDebug = (): void => {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__GTAG_DEBUG__ = true;
  console.log("[GA4] Debug mode enabled. Events will log to console.");
};

export const getDebugStatus = (): boolean => {
  if (typeof window === "undefined") return false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (window as any).__GTAG_DEBUG__ === true;
};
