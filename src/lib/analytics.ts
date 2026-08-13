// Lightweight GA4 event helper. Safe no-op if gtag isn't loaded
// (e.g. before consent or in tests).
type GtagFn = (command: "event" | "config" | "set" | "js", ...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

/**
 * Canonical list of "landing pages" — the entry-point URLs we report on
 * separately in GA4 (Explore → filter `is_landing_page = true`).
 * Add a path here and the EngagementTracker tags it automatically.
 */
export const LANDING_PAGES = [
  "/",
  "/about",
  "/diet",
  "/exercises",
  "/arthritis-flare-ups",
  "/guides/exercise",
] as const;

export const isLandingPage = (path: string): boolean => {
  // Normalise trailing slash (but keep "/" itself).
  const p = path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
  return (LANDING_PAGES as readonly string[]).includes(p);
};

export const trackEvent = (
  name: string,
  params: Record<string, unknown> = {},
): void => {
  try {
    if (typeof window === "undefined") return;
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.debug("[ga4]", name, params);
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

/**
 * GA4 conversion event for successful contact form submissions.
 * Also mirrors as `generate_lead` so a single key event can cover both.
 */
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
