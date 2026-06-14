/**
 * GA4 event helpers for conversion tracking.
 * Safe no-ops when gtag isn't available (pre-consent, tests).
 */
import { trackEvent } from "@/lib/analytics";

export function trackEmailSignup(preference?: string, source = "hero_banner") {
  trackEvent("email_signup", {
    preference: preference || "general",
    source,
  });
}

export function trackDonationClick(source = "sticky_bar") {
  trackEvent("donation_click", {
    amount_goal: 50000,
    current_progress: 5000,
    source,
  });
}

export function trackSearch(query: string, results: number) {
  trackEvent("search", {
    search_term: query,
    results_found: results,
  });
}

export function trackMobileBottomCTA(ctaType: "donate" | "start_reading") {
  trackEvent("mobile_cta_click", { cta_type: ctaType });
}

export function trackTestimonialSubmit(condition?: string) {
  trackEvent("testimonial_submit", { condition: condition || "unspecified" });
}

export function trackStartHereCard(label: string, href: string) {
  trackEvent("start_here_click", {
    card_label: label,
    destination_path: href,
    is_donation: false,
  });
}

export function trackJointPicker(joint: string, path: string) {
  trackEvent("joint_picker_click", {
    joint_label: joint,
    destination_path: path,
  });
}

export function trackPillarClick(pillar: string, path: string) {
  trackEvent("pillar_click", { pillar_label: pillar, destination_path: path });
}

export function trackFeaturedGuide(title: string, path: string) {
  trackEvent("featured_guide_click", {
    guide_title: title,
    destination_path: path,
  });
}
