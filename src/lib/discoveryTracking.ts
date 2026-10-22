/**
 * Engagement + discovery tracking (GA4). Consent-respecting: trackEvent is a
 * no-op until the consent-gated gtag loader has run, and nothing is written to
 * localStorage until analytics consent is "accepted".
 *
 * Events:
 *   related_article_click / read_next_click / prev_next_click  (data-track on links)
 *   donation_click (data-track="donate"), shop_click (any shop.brandangels link)
 *   exercise_resource_click (data-track="exercise")
 *   social_referral (once per session) + user property traffic_social_source
 *   visitor_type user property: new | returning
 */
import { trackEvent } from "@/lib/analytics";
import { classifySocialReferral, type Referral } from "@/lib/utm";

const SESSION_KEY = "lwa-social-referral";
const FIRST_VISIT_KEY = "lwa-first-visit";

const TRACK_EVENTS: Record<string, string> = {
  related: "related_article_click",
  "read-next": "read_next_click",
  "prev-next": "prev_next_click",
  donate: "donation_click",
  shop: "shop_click",
  exercise: "exercise_resource_click",
  popular: "related_article_click",
};

function consented(): boolean {
  try {
    return localStorage.getItem("cookie-consent") === "accepted";
  } catch {
    return false;
  }
}

export function getSessionReferral(): Referral | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Referral) : null;
  } catch {
    return null;
  }
}

/** Capture the social referral on first load of a session. Returns it (or the stored one). */
export function captureSocialReferral(search = window.location.search, referrer = document.referrer): Referral | null {
  const existing = getSessionReferral();
  if (existing) return existing;
  const ref = classifySocialReferral(search, referrer);
  if (ref) {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(ref));
    } catch {
      /* private mode */
    }
  }
  return ref;
}

let sentReady = false;
function sendSessionSignals() {
  if (sentReady || typeof window.gtag !== "function") return;
  sentReady = true;
  let visitorType = "new";
  if (consented()) {
    try {
      if (localStorage.getItem(FIRST_VISIT_KEY)) visitorType = "returning";
      else localStorage.setItem(FIRST_VISIT_KEY, new Date().toISOString().slice(0, 10));
    } catch {
      /* ignore */
    }
  }
  const ref = getSessionReferral();
  try {
    window.gtag("set", "user_properties", { visitor_type: visitorType, ...(ref ? { traffic_social_source: ref.source } : {}) });
  } catch {
    /* ignore */
  }
  if (ref) {
    trackEvent("social_referral", {
      social_source: ref.source,
      social_medium: ref.medium,
      social_campaign: ref.campaign,
      detection_method: ref.method,
      landing_path: window.location.pathname,
    });
  }
}

function onClick(e: MouseEvent) {
  const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
  if (!a) return;
  const tagged = a.closest("[data-track]") as HTMLElement | null;
  const kind = tagged?.dataset.track;
  const href = a.getAttribute("href") || "";
  const isShop = /shop\.brandangels\.co\.uk/i.test(href);
  const name = kind ? TRACK_EVENTS[kind] : isShop ? "shop_click" : undefined;
  if (!name) return;
  trackEvent(name, {
    link_url: href,
    link_text: (a.textContent || "").trim().slice(0, 100),
    source_path: window.location.pathname,
    placement: tagged?.dataset.trackPlacement || "unspecified",
    ...(name === "donation_click" ? { source: tagged?.dataset.trackPlacement || "article", currency: "GBP" } : {}),
  });
}

let installed = false;
export function initDiscoveryTracking(): void {
  if (installed || typeof window === "undefined") return;
  installed = true;
  captureSocialReferral();
  document.addEventListener("click", onClick, { capture: true });
  sendSessionSignals();
  window.addEventListener("analytics-ready", sendSessionSignals, { once: true });
}

/** Test hook. */
export function __resetDiscoveryTracking() {
  installed = false;
  sentReady = false;
  document.removeEventListener("click", onClick, { capture: true });
}
