/**
 * Shared UK YMYL / medical-education disclaimer copy.
 * Not formal legal advice — keep wording educational and escalation-clear.
 */

import { REVIEWED_DISCLAIMER_SHORT, UK_URGENT_CARE } from "../data/reviewedPublicCopy.ts";

export const MEDICAL_DISCLAIMER_SHORT = REVIEWED_DISCLAIMER_SHORT;
export const MEDICAL_DISCLAIMER_TOOL = REVIEWED_DISCLAIMER_SHORT;
export const MEDICAL_DISCLAIMER_CHAT = REVIEWED_DISCLAIMER_SHORT;

export const MEDICAL_DISCLAIMER_PATH = "/disclaimer";

/** Path prefixes that should surface the short clinical strip (not marketing home). */
export const YMYL_PATH_PREFIXES = [
  "/conditions",
  "/guides",
  "/blog",
  "/library",
  "/exercises",
  "/guides/diet",
  "/supplements",
  "/resources",
  "/symptom-checker",
  "/health-tools",
  "/self-help",
  "/self-assessment",
  "/chat",
  "/arthritis-flare-ups",
  "/arthritis-mental-health",
  "/guides/benefits-pip",
  "/waiting-list",
  "/arthritis-waiting-list-help",
  "/pillar",
  "/tools",
  "/pedometer",
  "/faq",
  "/healthcare-professionals",
  "/resource-centre",
  "/arthritis-support",
] as const;

const YMYL_EXACT = new Set([
  "/symptom-checker",
  "/health-tools",
  "/self-help",
  "/self-assessment",
  "/chat",
  "/arthritis-flare-ups",
  "/arthritis-mental-health",
  "/guides/benefits-pip",
  "/arthritis-waiting-list-help",
  "/pedometer",
  "/faq",
  "/disclaimer",
  "/editorial-standards",
  "/healthcare-professionals",
  "/resource-centre",
]);

export function isYmylPath(pathname: string): boolean {
  const path = (pathname.split("?")[0] || "/").replace(/\/+$/, "") || "/";
  if (path === "/") return false;
  if (YMYL_EXACT.has(path)) return true;
  return YMYL_PATH_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}

export function nhsEscalationLine(): string {
  return `${UK_URGENT_CARE[0].q}. ${UK_URGENT_CARE[UK_URGENT_CARE.length - 1].a}`;
}


/**
 * Layout chrome owns the first YMYL strip. Nested pages must skip a second
 * MedicalDisclaimerStrip — once in layout is enough.
 */
export function shouldRenderDisclaimerStrip(alreadyShownInLayout: boolean): boolean {
  return !alreadyShownInLayout;
}

/** Educational box keeps review metadata; drop duplicate short copy when the strip is up. */
export function educationalDisclaimerCopyMode(
  layoutStripShown: boolean,
): "full" | "review-only" {
  return layoutStripShown ? "review-only" : "full";
}
