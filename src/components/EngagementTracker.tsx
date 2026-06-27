import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent, isLandingPage } from "@/lib/analytics";

/**
 * EngagementTracker
 *
 * Emits GA4 signals so we can compute a *real* bounce rate
 * (bounce = session with NO engagement signal) and so bounce rate
 * is measurable PER PAGE in GA4.
 *
 *  - page_view          → fired on every SPA route change (initial load
 *                         uses index.html's bot-aware loader instead)
 *  - landing_page_view  → fired only on the 6 canonical landing pages
 *  - engaged_session    → fired at 10s active time (GA4 standard threshold)
 *  - engagement_30s     → fired at 30s active time (our richer signal)
 *  - scroll_depth       → fired at 25 / 50 / 75 / 100 %
 *  - first_click        → fired on the first internal interaction
 *
 * Notes:
 *  - Pauses timers when the tab is hidden (GA4-style "active" time).
 *  - Resets on route change (SPA navigation = new pageview).
 *  - Tiny, idle-callback friendly, never throws.
 */
const EngagementTracker = () => {
  const location = useLocation();
  const stateRef = useRef({
    activeMs: 0,
    lastTick: performance.now(),
    engaged10Fired: false,
    engaged30Fired: false,
    engaged60Fired: false,
    engaged180Fired: false,
    engaged240Fired: false,
    clickedFired: false,
    scrollMarks: new Set<number>(),
    initialPageView: true,
  });



  useEffect(() => {
    const isInitial = stateRef.current.initialPageView;
    // Reset on every SPA navigation
    stateRef.current = {
      activeMs: 0,
      lastTick: performance.now(),
      engaged10Fired: false,
      engaged30Fired: false,
      engaged60Fired: false,
      engaged180Fired: false,
      engaged240Fired: false,
      clickedFired: false,
      scrollMarks: new Set<number>(),
      initialPageView: false,
    };


    const path = location.pathname;
    const landing = isLandingPage(path);

    // Fire SPA page_view on every navigation EXCEPT the very first load
    // (index.html's gtag config sends that one already to keep early
    // pageviews from being lost while React boots).
    if (!isInitial) {
      trackEvent("page_view", {
        page_path: path,
        page_location: window.location.href,
        page_title: document.title,
        is_landing_page: landing,
      });
    }

    if (landing) {
      trackEvent("landing_page_view", {
        page_path: path,
        page_title: document.title,
      });
    }

    let rafScheduled = false;
    const TICK_MS = 1000;

    const tick = () => {
      const s = stateRef.current;
      const now = performance.now();
      if (document.visibilityState === "visible") {
        s.activeMs += now - s.lastTick;
      }
      s.lastTick = now;

      if (!s.engaged10Fired && s.activeMs >= 10_000) {
        s.engaged10Fired = true;
        trackEvent("engaged_session", {
          page_path: path,
          is_landing_page: landing,
          engagement_time_msec: Math.round(s.activeMs),
        });
      }

      if (!s.engaged30Fired && s.activeMs >= 30_000) {
        s.engaged30Fired = true;
        trackEvent("engagement_30s", {
          page_path: path,
          is_landing_page: landing,
          ms: Math.round(s.activeMs),
        });
      }

      if (!s.engaged60Fired && s.activeMs >= 60_000) {
        s.engaged60Fired = true;
        trackEvent("engagement_60s", {
          page_path: path,
          is_landing_page: landing,
          ms: Math.round(s.activeMs),
        });
      }

      if (!s.engaged180Fired && s.activeMs >= 180_000) {
        s.engaged180Fired = true;
        trackEvent("engagement_180s", {
          page_path: path,
          is_landing_page: landing,
          ms: Math.round(s.activeMs),
        });
      }

      if (!s.engaged240Fired && s.activeMs >= 240_000) {
        s.engaged240Fired = true;
        trackEvent("engagement_240s", {
          page_path: path,
          is_landing_page: landing,
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
            trackEvent("scroll_depth", { depth: t, page_path: path, is_landing_page: landing });
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
        page_path: path,
        is_landing_page: landing,
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
