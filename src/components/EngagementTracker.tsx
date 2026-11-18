import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent, isLandingPage } from "@/lib/analytics";

/**
 * EngagementTracker
 *
 * Emits supplemental reading signals. GA4 computes native engagement and
 * bounce rate; these custom events are not a replacement for those metrics.
 *
 *  - landing_page_view  → fired only on the 6 canonical landing pages
 *  - engaged_session    → fired at 10s active time (GA4 standard threshold)
 *  - engagement_30s     → fired at 30s active time (our richer signal)
 *  - engagement_60s     → fired at 60s active time
 *  - engagement_180s    → fired at 180s active time
 *  - engagement_240s    → fired at 240s active time
 *  - scroll_depth       → fired at 25 / 50 / 75 / 90 / 100 %
 *  - reading_complete   → fired at 90% scroll on clinical content routes,
 *                         with the active reading time attached
 *  - first_click        → fired on the first internal interaction
 *  - medical_reference_click → outbound clicks to NHS / NICE guidance
 *  - resource_download  → clicks on printable PDF resources
 *  - related_condition_click → in-article navigation to condition/guide/library pages
 *  - exercise_routine_toggle → expander use on /exercises routes
 *
 * Notes:
 *  - page_view is NOT sent here. GA4 is loaded with send_page_view:false
 *    and App.tsx fires page_view on every route change.
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
  });



  useEffect(() => {
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
    };


    const path = location.pathname;
    const landing = isLandingPage(path);
    const clinical = /^\/(blog|guides|conditions|faq|library|exercises|treatments|diet)(\/|$)/.test(path);

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
          active_time_ms: Math.round(s.activeMs),
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
        for (const t of [25, 50, 75, 90, 100]) {
          if (pct >= t && !marks.has(t)) {
            marks.add(t);
            trackEvent("scroll_depth", { percent_scrolled: t, page_path: path, is_landing_page: landing });
            if (t === 90 && clinical) {
              trackEvent("reading_complete", {
                page_path: path,
                active_time_ms: Math.round(stateRef.current.activeMs),
              });
            }
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

    // Micro-conversion classification on top of first_click: outbound NHS/NICE
    // references, printable PDF resources, in-article related-condition
    // navigation and exercise routine expanders.
    const handleAnalyticsClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      const toggle = el.closest?.("summary,[aria-expanded]");
      if (toggle && path.startsWith("/exercises")) {
        trackEvent("exercise_routine_toggle", { page_path: path });
        return;
      }
      const a = el.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (/^https?:\/\//i.test(href)) {
        try {
          const host = new URL(href).hostname.replace(/^www\./, "");
          if (host === "nhs.uk" || host.endsWith(".nhs.uk") ||
              host === "nice.org.uk" || host.endsWith(".nice.org.uk")) {
            trackEvent("medical_reference_click", { page_path: path, link_domain: host });
          }
        } catch { /* ignore malformed hrefs */ }
        return;
      }
      if (/\.pdf($|[?#])/i.test(href)) {
        trackEvent("resource_download", {
          page_path: path,
          file_name: href.split("/").pop()?.split(/[?#]/)[0],
        });
        return;
      }
      if (a.closest("article") && /^\/(conditions|guides|library|treatments)(\/|$)/.test(href)) {
        trackEvent("related_condition_click", {
          page_path: path,
          target_path: href.split(/[?#]/)[0],
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("click", handleClick, { capture: true });
    document.addEventListener("click", handleAnalyticsClick, { capture: true });

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick, { capture: true });
      document.removeEventListener("click", handleAnalyticsClick, { capture: true });
    };
  }, [location.pathname]);

  return null;
};

export default EngagementTracker;
