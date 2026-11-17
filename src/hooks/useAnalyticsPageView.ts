import { useEffect, useRef } from "react";
import { analyticsUrl } from "@/lib/analytics-url";

/** One clean page view per route visit, including a visit that awaits consent. */
export function useAnalyticsPageView(pathname: string) {
  const visit = useRef({ pathname, sent: false });

  useEffect(() => {
    if (visit.current.pathname !== pathname) {
      visit.current = { pathname, sent: false };
    }
    const sendPageView = () => {
      if (visit.current.sent || typeof window.gtag !== "function") return;
      const page_location = analyticsUrl(window.location.href);
      window.gtag("event", "page_view", {
        page_path: page_location ? new URL(page_location).pathname : pathname,
        page_location,
        page_referrer: analyticsUrl(document.referrer) || "",
        page_title: document.title,
        send_to: "G-ZLLSD3PXZ9",
      });
      visit.current.sent = true;
    };
    sendPageView();
    window.addEventListener("analytics-ready", sendPageView);
    return () => window.removeEventListener("analytics-ready", sendPageView);
  }, [pathname]);
}
