/** Campaign tags on links shared from the guide action card. */
export const WHATSAPP_SHARE_UTM = {
  utm_source: "whatsapp",
  utm_medium: "social_share",
  utm_campaign: "guide_action_card",
} as const;

/**
 * Add the WhatsApp campaign tags to a page URL. WhatsApp apps send no
 * referrer, so without these tags the visits land in Direct. Only the shared
 * link is tagged; canonical tags are built from the path and stay clean.
 */
export function withWhatsAppUtm(url: string): string {
  const u = new URL(url);
  for (const [key, value] of Object.entries(WHATSAPP_SHARE_UTM)) u.searchParams.set(key, value);
  return u.toString();
}

/** Plain-text WhatsApp message. WhatsApp renders *text* as bold. */
export function buildWhatsAppMessage(title: string, url: string, summary: string): string {
  return [
    `*${title.replace(/\s+/g, " ").trim()}*`,
    summary.replace(/\s+/g, " ").trim(),
    "",
    "Free guide from Living With Arthritis (registered charity 1218461):",
    url,
  ].join("\n");
}

/** wa.me share link; the whole message (including the tagged URL) is encoded once into `text`. */
export function buildWhatsAppHref(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

/** Analytics slug for a guide path: "/blog/x" -> "x", "/conditions/a/b" -> "a/b". */
export function guideSlugFromPath(path: string): string {
  return path
    .split(/[?#]/)[0]
    .replace(/^\/+|\/+$/g, "")
    .replace(/^(blog|guides|conditions)\//, "");
}
