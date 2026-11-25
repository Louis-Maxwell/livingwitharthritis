import { analyticsUrl } from "./analytics-url";
import { onCLS, onFCP, onLCP, onINP, onTTFB } from 'web-vitals';

type GtagFn = (command: "event" | "config" | "set" | "js", ...args: unknown[]) => void;

declare global {
  interface Window {
    readonly __LWA_GA4_ID__?: string;
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

interface EventParams {
  [key: string]: string | number | boolean | string[] | undefined;
}

/** Match the existing cookie loader. An event or a loaded script is not consent. */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem("lwa_cv3");
    if (raw !== null) return JSON.parse(raw)?.a === true;
    return window.localStorage.getItem("cookie-consent") === "accepted";
  } catch {
    return false;
  }
}

const PRIVATE_PARAM = /^(?:q|query|query_text|search_term|search_query|email|email_address|phone|phone_number|address|first_name|last_name|full_name|message|form_data|form_values|user_id|client_id)$/i;
// Placement labels such as link_location are text; only page_location is a URL.
const URL_PARAM = /(?:^page_location$|(?:^|_)(?:url|referrer|path|page)$)/i;

/** Only public labels, bounded numbers and clean URLs belong in event parameters. */
function cleanAnalyticsValue(key: string, value: unknown, depth = 0): unknown {
  if (PRIVATE_PARAM.test(key) || depth > 3 || value == null) return undefined;
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return Number.isFinite(value) ? value : undefined;
  if (typeof value === "string") {
    if (URL_PARAM.test(key) || /^https?:\/\//i.test(value)) {
      const clean = analyticsUrl(value);
      if (clean && /(?:^|_)(?:path|page)$/.test(key)) return new URL(clean).pathname;
      return clean;
    }
    return value
      .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[redacted-email]")
      .replace(/\b(?:\+?\d[\d ()-]{8,}\d)\b/g, "[redacted-number]")
      .replace(/https?:\/\/[^\s]+/gi, "[redacted-url]")
      .replace(/[\r\n\t]+/g, " ")
      .slice(0, 100);
  }
  if (Array.isArray(value)) return value.slice(0, 25).map(item => cleanAnalyticsValue(key, item, depth + 1));
  if (typeof value === "object") {
    return Object.fromEntries(Object.entries(value).flatMap(([k, v]) => {
      const clean = cleanAnalyticsValue(k, v, depth + 1);
      return clean === undefined ? [] : [[k, clean]];
    }));
  }
  return undefined;
}

const EVENT_ALIASES: Record<string, string> = {
  donation_click: "donate_click",
  file_download: "resource_download",
  search: "site_search",
  phone_click: "helpline_engagement",
  email_click: "helpline_engagement",
};

function canonicalParams(name: string, params: Record<string, unknown>): Record<string, unknown> {
  if (name === "search" || name === "site_search") {
    const count = params.result_count ?? params.search_result_count ?? params.results_found;
    const result_count = typeof count === "number" && Number.isFinite(count) ? Math.max(0, Math.floor(count)) : undefined;
    // Never include typed terms, even if a caller accidentally supplies them.
    return { result_count, zero_results: result_count === undefined ? undefined : result_count === 0 };
  }
  if (name === "phone_click" || name === "email_click") {
    return { channel: name === "phone_click" ? "phone" : "email", interaction_type: "intent" };
  }
  if (name === "file_download" || name === "resource_download") {
    return {
      ...params,
      format: params.format ?? params.file_extension,
      guide_title: params.guide_title ?? params.link_text ?? params.file_name,
    };
  }
  if (name === "donation_click" || name === "donate_click") {
    const frequency = params.frequency === "one-time" ? "single" : params.frequency;
    return {
      ...params,
      destination: params.destination ?? params.method,
      tier: params.tier ?? params.amount,
      frequency: frequency === "single" || frequency === "monthly" ? frequency : undefined,
      trigger_page: typeof window === "undefined" ? undefined : window.location.pathname,
      interaction_type: "intent",
    };
  }
  return params;
}

// Error text can originate from browser APIs, form handlers or third-party
// responses. Keep GA4 telemetry useful without sending email addresses,
// URLs/query strings or large user-provided values.
const redactAnalyticsText = (value: string): string =>
  value
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[redacted-email]")
    .replace(/https?:\/\/[^\s]+/gi, "[redacted-url]")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 240);

export const LANDING_PAGES = [
  "/",
  "/about",
  "/guides/diet",
  "/exercises",
  "/arthritis-flare-ups",
  "/guides/exercise",
] as const;

export const isLandingPage = (path: string): boolean => {
  const p = path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
  return (LANDING_PAGES as readonly string[]).includes(p);
};

let currentGesture: Event | undefined;
const gestureEvents = new WeakMap<Event, Set<string>>();

/** Share one click token between delegated tracking and component handlers. */
export function beginAnalyticsGesture(event: Event): void {
  currentGesture = event;
  window.setTimeout(() => { if (currentGesture === event) currentGesture = undefined; }, 0);
}

// One dispatch boundary for client events. No pre-consent replay queue, new vendor or library.
export const trackEvent = (
  name: string,
  params: Record<string, unknown> = {},
): boolean => {
  try {
    if (!hasAnalyticsConsent() || typeof window.gtag !== "function") return false;
    if (!/^[a-z][a-z0-9_]{0,39}$/.test(name)) return false;
    const safeParams = Object.fromEntries(Object.entries(canonicalParams(name, params)).flatMap(([key, value]) => {
      const clean = cleanAnalyticsValue(key, value);
      return clean === undefined ? [] : [[key, clean]];
    }));
    const eventName = EVENT_ALIASES[name] ?? name;
    if (currentGesture && currentGesture.eventPhase !== Event.NONE && ["resource_download", "donate_click", "social_media_click", "helpline_engagement"].includes(eventName)) {
      const identity = eventName === "resource_download" ? safeParams.file_name : safeParams.platform ?? safeParams.channel ?? safeParams.destination ?? "";
      const key = `${eventName}:${String(identity).toLowerCase()}`;
      const seen = gestureEvents.get(currentGesture) ?? new Set<string>();
      if (seen.has(key)) return false;
      seen.add(key);
      gestureEvents.set(currentGesture, seen);
    }
    const pageTitle = window.location.pathname.toLowerCase().replace(/\/+$/, "") === "/search" ? "Search | Living With Arthritis" : document.title;
    window.gtag("event", eventName, {
      ...safeParams,
      // Callers cannot override these with an unsanitised URL or title.
      page_location: analyticsUrl(window.location.href),
      page_title: cleanAnalyticsValue("page_title", pageTitle),
    });
    return true;
  } catch {
    /* ad blockers and analytics must never break the page */
    return false;
  }
};

export type SocialLinkLocation = "footer_connect" | "article_header" | "article_share_bar" | "floating_action" | "site_header" | "other";
export type ContactChannel = "phone" | "whatsapp" | "email" | "contact_form";
export interface ContentAnalyticsContext {
  content_category?: string;
  article_slug?: string;
  author_reviewer?: string;
  guide_type?: "medical_web_page" | "lifestyle" | "benefits_pip";
}

export function trackSocialOutbound(platform: string, link_location: SocialLinkLocation, target?: string): void {
  const normalised = platform === "twitter" ? "x" : platform;
  if (!["facebook", "x", "instagram", "linkedin", "youtube", "threads", "tiktok", "bluesky", "mastodon", "pinterest", "reddit", "whatsapp", "email"].includes(normalised)) return;
  trackEvent("social_media_click", { platform: normalised, link_location, target_url: target ? analyticsUrl(target) : undefined, interaction_type: "intent" });
}

export function trackHelplineEngagement(channel: ContactChannel): void {
  trackEvent("helpline_engagement", { channel, interaction_type: "intent" });
}

export function trackArticleReadProgress(percent: 25 | 50 | 75 | 100, context: ContentAnalyticsContext = {}): void {
  trackEvent("article_read_progress", { ...context, scroll_threshold: percent });
}

export function trackActiveReadingTime(seconds: number, context: ContentAnalyticsContext = {}): void {
  if (!Number.isFinite(seconds) || seconds <= 0) return;
  trackEvent("article_active_reading", { ...context, active_reading_seconds: Math.round(seconds) });
}

export function trackFaqToggle(faqId: string, expanded: boolean, context: ContentAnalyticsContext = {}): void {
  trackEvent("faq_toggle", { ...context, faq_id: faqId, expanded });
  if (expanded) trackEvent("accordion_expand", { ...context, accordion_id: faqId });
}

// Set user properties for segmentation
export const setUserProperties = (properties: EventParams): void => {
  if (!hasAnalyticsConsent() || typeof window.gtag !== "function") return;
  try {
    // Page context belongs on events, not a persistent inferred health profile.
    const allowed = ["content_type", "time_on_page_ms", "scroll_depth", "interaction_count"];
    const safe = Object.fromEntries(Object.entries(properties).filter(([key]) => allowed.includes(key)).map(([key, value]) => [key, cleanAnalyticsValue(key, value)]));
    if (Object.keys(safe).length) window.gtag("set", safe);
  } catch {
    /* silently fail */
  }
};

// ============ Conversion Events ============

// Canonical conversion events: emit one GA4 event per completed outcome.
// Keeping one event per outcome prevents inflated key-event counts when GA4
// reports and downstream dashboards are joined together.
export const trackContactSubmit = (opts: { topic?: string } = {}): void => {
  trackEvent("generate_lead", {
    method: "contact_form",
    topic: opts.topic ?? "general",
  });
};

export const trackNewsletterSignup = (): void => {
  trackEvent("sign_up", { method: "newsletter" });
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
  // Treat a verified donation as one GA4 purchase/key event. The payment
  // provider transaction ID is sent for downstream reconciliation.
  // This helper itself does not prevent repeated calls.
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
    link_url: analyticsUrl(url),
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

export const trackSearch = (_searchTerm: string, resultCount?: number): void => {
  trackEvent("search", {
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
  _errorMessage: string,
  errorPage?: string,
): void => {
  trackEvent("app_error", {
    error_type: redactAnalyticsText(errorType),
    error_page: errorPage ? redactAnalyticsText(errorPage.split(/[?#]/, 1)[0]) : undefined,
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
let vitalsInitialized = false;

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
  if (typeof window === "undefined" || vitalsInitialized) return metricsCache;
  vitalsInitialized = true;

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
