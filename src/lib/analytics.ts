import { hasAnalyticsConsent, sanitiseAnalyticsParams } from "./analyticsPrivacy";
export { initWebVitals, getWebVitals, getThresholds, type CoreWebVitalsMetrics } from "./web-vitals";

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
    if (typeof window === "undefined" || !hasAnalyticsConsent()) return;
    const safeParams = sanitiseAnalyticsParams(params);
    if (import.meta.env.DEV) {
      console.debug('[GA4]', name, safeParams);
    }
    if (typeof window.gtag === "function") {
      window.gtag("event", name, safeParams);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: name, ...safeParams });
    }
  } catch {
    /* analytics must never break UX */
  }
};

// Set user properties for segmentation
export const setUserProperties = (properties: EventParams): void => {
  if (typeof window === "undefined" || !hasAnalyticsConsent() || typeof window.gtag !== "function") return;
  try {
    window.gtag("set", "user_properties", sanitiseAnalyticsParams(properties));
  } catch {
    /* silently fail */
  }
};

// ============ Conversion Events ============

/** Call only after an enquiry endpoint confirms acceptance, never after opening mailto. */
export const trackContactSubmit = (_opts: { topic?: string } = {}): void => {
  trackEvent("generate_lead", { method: "contact_form", lead_type: "contact", form_id: "contact" });
};

/** Reserved for actual email-platform confirmation; inbox delivery is newsletter_submit. */
export const trackNewsletterSignup = (): void => {
  trackEvent("newsletter_signup", { method: "confirmed_subscription", form_id: "newsletter" });
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
  // This helper is reserved for trusted payment confirmation, not URL parameters.
  if (!opts.transactionId.trim() || !Number.isFinite(opts.amount) || opts.amount <= 0) return;
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

export const trackSearch = (_searchTerm: string, resultCount = 0): void => {
  trackEvent("view_search_results", { results_count: resultCount, result_bucket: resultCount === 0 ? "none" : resultCount <= 10 ? "1-10" : "11-plus" });
  if (resultCount === 0) trackEvent("search_no_results", { result_bucket: "none" });
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
