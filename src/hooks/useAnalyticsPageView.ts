import { useEffect, useRef } from "react";
import { analyticsUrl } from "@/lib/analytics-url";
import { trackEvent } from "@/lib/analytics";

/** One clean page view per route visit, including a visit that awaits consent. */
export function useAnalyticsPageView(pathname: string) {
  const visit = useRef({ pathname, sent: false });

  useEffect(() => {
    if (visit.current.pathname !== pathname) {
      visit.current = { pathname, sent: false };
    }
    const sendPageView = () => {
      if (visit.current.sent || !window.__LWA_GA4_ID__) return;
      const page_location = analyticsUrl(window.location.href);
      visit.current.sent = trackEvent("page_view", {
        page_path: page_location ? new URL(page_location).pathname : pathname,
        page_location,
        page_referrer: analyticsUrl(document.referrer) || "",
        page_title: document.title,
        send_to: window.__LWA_GA4_ID__,
      });
    };
    sendPageView();
    window.addEventListener("analytics-ready", sendPageView);
    return () => window.removeEventListener("analytics-ready", sendPageView);
  }, [pathname]);
}
