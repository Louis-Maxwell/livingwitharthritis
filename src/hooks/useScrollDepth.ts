import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";

/**
 * useScrollDepth
 *
 * Fires a single `scroll_80` GA4 event the first time a visitor scrolls
 * past the configured depth threshold (default 80%) on a given route.
 * Resets on every route change so it can fire once per page.
 *
 * Mount this once at app root — it uses passive listeners and rAF batching
 * so it costs effectively nothing on scroll.
 */
export function useScrollDepth(threshold = 0.8) {
  const location = useLocation();

  useEffect(() => {
    let fired = false;
    let rafScheduled = false;

    const check = () => {
      rafScheduled = false;
      if (fired) return;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = window.scrollY / max;
      if (pct >= threshold) {
        fired = true;
        trackEvent("scroll_80", {
          page_path: location.pathname,
          depth_pct: Math.round(pct * 100),
        });
        window.removeEventListener("scroll", onScroll);
      }
    };

    const onScroll = () => {
      if (rafScheduled) return;
      rafScheduled = true;
      requestAnimationFrame(check);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Also check on mount for short pages already past threshold.
    check();
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname, threshold]);
}

export default useScrollDepth;
