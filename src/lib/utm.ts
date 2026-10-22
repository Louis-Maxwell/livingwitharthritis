/**
 * UTM convention for social links (see docs/utm.md).
 *
 *   utm_source   = facebook | linkedin | instagram | x | youtube | threads
 *   utm_medium   = social
 *   utm_campaign = <yyyy-mm>-<theme>  e.g. 2026-10-top-guides, merch-autumn
 *   utm_content  = optional post id / variant
 */
export const SOCIAL_SOURCES = ["facebook", "linkedin", "instagram", "x", "youtube", "threads"] as const;
export type SocialSource = (typeof SOCIAL_SOURCES)[number];

const SITE = "https://livingwitharthritis.org.uk";

export function slugifyCampaign(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "general";
}

/** Add UTM parameters to a site URL or path. Existing utm_* values are replaced. */
export function withUtm(
  urlOrPath: string,
  opts: { source: SocialSource | string; campaign: string; medium?: string; content?: string },
): string {
  const u = new URL(urlOrPath, SITE);
  for (const k of [...u.searchParams.keys()]) if (k.startsWith("utm_")) u.searchParams.delete(k);
  u.searchParams.set("utm_source", opts.source.toLowerCase());
  u.searchParams.set("utm_medium", (opts.medium ?? "social").toLowerCase());
  u.searchParams.set("utm_campaign", slugifyCampaign(opts.campaign));
  if (opts.content) u.searchParams.set("utm_content", slugifyCampaign(opts.content));
  return u.toString();
}

export type Referral = { source: string; medium: string; campaign: string; method: "utm" | "referrer" };

const REFERRER_MAP: Array<[RegExp, string]> = [
  [/(^|\.)facebook\.com$|(^|\.)fb\.me$|^l\.facebook\.com$|^m\.facebook\.com$/, "facebook"],
  [/(^|\.)linkedin\.com$|^lnkd\.in$/, "linkedin"],
  [/(^|\.)instagram\.com$/, "instagram"],
  [/(^|\.)x\.com$|(^|\.)twitter\.com$|^t\.co$/, "x"],
  [/(^|\.)youtube\.com$|^youtu\.be$/, "youtube"],
  [/(^|\.)threads\.net$/, "threads"],
];

/** Classify a landing as a social referral from UTM params or the referrer host. */
export function classifySocialReferral(search: string, referrer: string): Referral | null {
  const q = new URLSearchParams(search);
  const src = (q.get("utm_source") || "").toLowerCase();
  const med = (q.get("utm_medium") || "").toLowerCase();
  if (src) {
    const known = (SOCIAL_SOURCES as readonly string[]).includes(src) || src === "fb" || src === "twitter";
    if (known || med === "social") {
      const source = src === "fb" ? "facebook" : src === "twitter" ? "x" : src;
      return { source, medium: med || "social", campaign: q.get("utm_campaign") || "(not set)", method: "utm" };
    }
  }
  if (q.get("fbclid")) return { source: "facebook", medium: "social", campaign: "(not set)", method: "referrer" };
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    for (const [re, name] of REFERRER_MAP) if (re.test(host)) return { source: name, medium: "social", campaign: "(not set)", method: "referrer" };
  } catch {
    /* no or invalid referrer */
  }
  return null;
}
