/**
 * GA4 event helpers for conversion tracking.
 * Safe no-ops when gtag isn't available (pre-consent, tests).
 *
 * Fires distinct, easy-to-mark-as-key-event GA4 events:
 *   - donation_click
 *   - contact_form_submit
 *   - file_download
 *   - scroll_80        (fired once per page once a visitor passes 80% depth)
 */
import { trackEvent } from "@/lib/analytics";

/* ---------- Conversion events (call these from UI) ---------- */

/** Fired when a user clicks any "Donate" CTA (before the checkout redirect). */
export function trackDonationClick(
  sourceOrOpts:
    | string
    | { source?: string; amount?: number; currency?: string; method?: string } = {},
) {
  const opts = typeof sourceOrOpts === "string" ? { source: sourceOrOpts } : sourceOrOpts;
  trackEvent("donation_click", {
    source: opts.source ?? "donate_page",
    amount: opts.amount ?? 0,
    currency: opts.currency ?? "GBP",
    method: opts.method ?? "stripe",
  });
}

/** Fired after the /contact form successfully submits. */
export function trackContactFormSubmit(topic?: string) {
  trackEvent("contact_form_submit", {
    topic: topic ?? "general",
    value: 1,
    currency: "GBP",
  });
}

/** Fired when a user clicks a downloadable asset (PDF, guide, etc.). */
export function trackFileDownload(opts: {
  file_name: string;
  file_extension?: string;
  file_url?: string;
  source?: string;
}) {
  const ext =
    opts.file_extension ||
    (opts.file_name.includes(".") ? opts.file_name.split(".").pop() : undefined) ||
    "unknown";
  trackEvent("file_download", {
    file_name: opts.file_name,
    file_extension: ext,
    file_url: opts.file_url,
    source: opts.source ?? "site",
  });
}

/* ---------- Existing helpers (kept for other call-sites) ---------- */

export function trackSearch(query: string, results: number) {
  trackEvent("search", { search_term: query, results_found: results });
}

export function trackMobileBottomCTA(
  ctaType: "donate" | "start_reading" | "pain_relief" | "newly_diagnosed" | "benefits",
) {
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
  trackEvent("joint_picker_click", { joint_label: joint, destination_path: path });
}

export function trackPillarClick(pillar: string, path: string) {
  trackEvent("pillar_click", { pillar_label: pillar, destination_path: path });
}

export function trackChatStart(source: string = "chat_page") {
  trackEvent("chat_start", { source });
}
