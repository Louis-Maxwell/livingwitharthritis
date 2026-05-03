import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";

/**
 * EngagementTracker
 *
 * Emits GA4 signals so we can compute a *real* bounce rate
 * (bounce = session with NO engagement signal).
 *
 *  - engagement_30s   → fired once per pageview after 30s active time
 *  - scroll_depth     → fired at 25 / 50 / 75 / 100 %
 *  - first_click      → fired on the first internal interaction
 *
 * Notes:
 *  - Pauses the 30s timer when the tab is hidden (GA4-style "active" time).
 *  - Resets on route change (SPA navigation = new pageview).
 *  - Tiny, idle-callback friendly, never throws.
 */
const EngagementTracker = () => {
  const location = useLocation();
  const stateRef = useRef({
    activeMs: 0,
    lastTick: performance.now(),
    engagedFired: false,
    clickedFired: false,
    scrollMarks: new Set<number>(),
  });

  useEffect(() => {
    // Reset on every SPA navigation
    stateRef.current = {
      activeMs: 0,
      lastTick: performance.now(),
      engagedFired: false,
      clickedFired: false,
      scrollMarks: new Set<number>(),
    };

    let rafScheduled = false;
    const TICK_MS = 1000;

    const tick = () => {
      const s = stateRef.current;
      const now = performance.now();
      if (document.visibilityState === "visible") {
        s.activeMs += now - s.lastTick;
      }
      s.lastTick = now;

      if (!s.engagedFired && s.activeMs >= 30_000) {
        s.engagedFired = true;
        trackEvent("engagement_30s", {
          path: location.pathname,
          ms: Math.round(s.activeMs),
        });
      }
    };

    const interval = window.setInterval(tick, TICK_MS);

    const handleVisibility = () => {
      stateRef.current.lastTick = performance.now();
    };

    const handleScroll = () => {
      if (rafScheduled) return;
      rafScheduled = true;
      requestAnimationFrame(() => {
        rafScheduled = false;
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        if (max <= 0) return;
        const pct = Math.min(100, Math.round((window.scrollY / max) * 100));
        const marks = stateRef.current.scrollMarks;
        for (const t of [25, 50, 75, 100]) {
          if (pct >= t && !marks.has(t)) {
            marks.add(t);
            trackEvent("scroll_depth", { depth: t, path: location.pathname });
          }
        }
      });
    };

    const handleClick = (e: MouseEvent) => {
      const s = stateRef.current;
      if (s.clickedFired) return;
      const target = (e.target as HTMLElement | null)?.closest?.("a,button,[role='button']");
      if (!target) return;
      s.clickedFired = true;
      trackEvent("first_click", {
        path: location.pathname,
        tag: target.tagName.toLowerCase(),
      });
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("click", handleClick, { capture: true });

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, [location.pathname]);

  return null;
};

export default EngagementTracker;
