import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { hasAnalyticsConsent, isLandingPage, trackEvent, type ContentAnalyticsContext } from "@/lib/analytics";

const freshVisit = (path: string) => ({
  path, activeMs: 0, reportedSeconds: 0, lastTick: performance.now(),
  lastActivity: performance.now(), landingSent: false, clicked: false,
  timeMarks: new Set<number>(), scrollMarks: new Set<number>(),
});

/** Public content context, never an inferred diagnosis or a persistent user profile. */
function contentContextForPath(path: string): ContentAnalyticsContext {
  const guide_type = /\/(?:benefits-pip|pip-for-arthritis-uk|arthritis-disability-benefits-uk)(?:\/|$)/.test(path)
    ? "benefits_pip" as const
    : /^\/(conditions|treatments|exercises)\//.test(path) ? "medical_web_page" as const : undefined;
  return {
    content_category: document.querySelector('meta[property="article:section"]')?.getAttribute("content") || path.split("/")[1] || "home",
    article_slug: path.split("/").slice(2).join("/") || undefined,
    guide_type,
  };
}

/** One consent-gated owner for reading milestones. Scroll is exposure, not proof of comprehension. */
const EngagementTracker = () => {
  const { pathname } = useLocation();
  const stateRef = useRef(freshVisit(pathname));

  useEffect(() => {
    if (stateRef.current.path !== pathname) stateRef.current = freshVisit(pathname);
    stateRef.current.lastTick = performance.now();
    const landing = isLandingPage(pathname);
    const content = /^\/(blog|guides|conditions|faq|library|exercises|treatments|diet)\//.test(pathname);
    let frame: number | undefined;
    let wasAllowed = hasAnalyticsConsent();

    const sendLanding = () => {
      const state = stateRef.current;
      if (landing && !state.landingSent) state.landingSent = trackEvent("landing_page_view", { page_path: pathname });
    };
    const flushReading = () => {
      if (!content || !hasAnalyticsConsent()) return;
      const state = stateRef.current;
      const seconds = Math.floor(state.activeMs / 1000);
      const delta = seconds - state.reportedSeconds;
      if (delta > 0 && trackEvent("article_active_reading", {
        ...contentContextForPath(pathname), active_reading_seconds: delta,
        active_reading_total_seconds: seconds,
      })) state.reportedSeconds = seconds;
    };
    const activity = () => {
      if (hasAnalyticsConsent()) stateRef.current.lastActivity = performance.now();
    };
    const consentReady = () => {
      if (!hasAnalyticsConsent()) return;
      if (!wasAllowed) {
        wasAllowed = true;
        stateRef.current.lastTick = performance.now();
        stateRef.current.lastActivity = performance.now();
      }
      sendLanding();
    };
    const tick = () => {
      const state = stateRef.current;
      const now = performance.now();
      if (!hasAnalyticsConsent()) {
        wasAllowed = false;
        state.lastTick = now;
        // Do not replay an unsent interval after consent is withdrawn and granted again.
        state.reportedSeconds = Math.floor(state.activeMs / 1000);
        return;
      }
      if (!wasAllowed) {
        consentReady();
        return;
      }
      sendLanding();
      if (document.visibilityState === "visible" && document.hasFocus() && now - state.lastActivity <= 60_000) {
        state.activeMs += Math.min(5000, Math.max(0, now - state.lastTick));
      }
      state.lastTick = now;
      for (const seconds of [10, 30, 60, 180, 240]) {
        if (state.activeMs < seconds * 1000 || state.timeMarks.has(seconds)) continue;
        state.timeMarks.add(seconds);
        trackEvent(seconds === 10 ? "engaged_session" : `engagement_${seconds}s`, {
          page_path: pathname, is_landing_page: landing, active_time_ms: Math.round(state.activeMs),
        });
        if (seconds !== 10) flushReading();
      }
    };
    const visibility = () => {
      stateRef.current.lastTick = performance.now();
      if (hasAnalyticsConsent() && document.visibilityState === "visible" && document.hasFocus()) {
        stateRef.current.lastActivity = performance.now();
      }
      flushReading();
    };
    const scroll = () => {
      if (!hasAnalyticsConsent() || frame !== undefined) return;
      activity();
      frame = requestAnimationFrame(() => {
        frame = undefined;
        if (!hasAnalyticsConsent()) return;
        const main = content ? document.querySelector("main article") ?? document.querySelector("main") : null;
        const bounds = main?.getBoundingClientRect();
        const max = bounds ? bounds.height - window.innerHeight : document.documentElement.scrollHeight - window.innerHeight;
        if (max <= 0) return;
        const distance = bounds ? -bounds.top : window.scrollY;
        const percent = Math.min(100, Math.max(0, Math.round(distance / max * 100)));
        for (const threshold of [25, 50, 75, 90, 100]) {
          if (percent < threshold || stateRef.current.scrollMarks.has(threshold)) continue;
          stateRef.current.scrollMarks.add(threshold);
          if (content && threshold !== 90) {
            trackEvent("article_read_progress", { ...contentContextForPath(pathname), scroll_threshold: threshold });
          } else if (!content) {
            trackEvent("scroll_depth", { percent_scrolled: threshold, page_path: pathname, is_landing_page: landing });
          }
          if (content && threshold === 90) trackEvent("reading_complete", {
            page_path: pathname, active_time_ms: Math.round(stateRef.current.activeMs), measurement: "scroll_exposure",
          });
        }
      });
    };
    const click = (event: MouseEvent) => {
      if (!hasAnalyticsConsent()) return;
      activity();
      const target = (event.target as Element | null)?.closest?.("a,button,[role='button']");
      if (target && !stateRef.current.clicked) stateRef.current.clicked = trackEvent("first_click", {
        page_path: pathname, is_landing_page: landing, tag: target.tagName.toLowerCase(),
      });
      const element = event.target as Element | null;
      if (element?.closest?.("summary,[aria-expanded]") && pathname.startsWith("/exercises")) {
        trackEvent("exercise_routine_toggle", { page_path: pathname });
      }
      const anchor = element?.closest?.("a");
      const href = anchor?.getAttribute("href") || "";
      try {
        if (/^https?:\/\//i.test(href)) {
          const host = new URL(href).hostname.replace(/^www\./, "");
          if (/(^|\.)(nhs\.uk|nice\.org\.uk)$/.test(host)) trackEvent("medical_reference_click", { page_path: pathname, link_domain: host });
        } else if (anchor?.closest("article") && /^\/(conditions|guides|library|treatments)(\/|$)/.test(href)) {
          trackEvent("related_condition_click", { page_path: pathname, target_path: href });
        }
      } catch { /* malformed optional telemetry must not affect navigation */ }
      // Resource clicks are owned by auto-events.ts, not a second listener here.
    };

    sendLanding();
    const interval = window.setInterval(tick, 1000);
    document.addEventListener("visibilitychange", visibility);
    document.addEventListener("click", click, { capture: true });
    document.addEventListener("pointerdown", activity, { passive: true });
    document.addEventListener("keydown", activity);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("focus", visibility);
    window.addEventListener("blur", visibility);
    window.addEventListener("analytics-ready", consentReady);
    window.addEventListener("cookie-consent-accepted", consentReady);
    return () => {
      flushReading();
      window.clearInterval(interval);
      if (frame !== undefined) cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", visibility);
      document.removeEventListener("click", click, { capture: true });
      document.removeEventListener("pointerdown", activity);
      document.removeEventListener("keydown", activity);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("focus", visibility);
      window.removeEventListener("blur", visibility);
      window.removeEventListener("analytics-ready", consentReady);
      window.removeEventListener("cookie-consent-accepted", consentReady);
    };
  }, [pathname]);
  return null;
};

export default EngagementTracker;
