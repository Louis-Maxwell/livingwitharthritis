/**
 * Shared UK YMYL / medical-education disclaimer copy.
 * Not formal legal advice — keep wording educational and escalation-clear.
 */

export const MEDICAL_DISCLAIMER_SHORT =
  "Educational information for people in the UK living with arthritis — not a diagnosis or personal medical advice. Check medicines and exercises with your GP, pharmacist or rheumatology team. For emergencies call 999; for urgent advice use NHS 111.";

export const MEDICAL_DISCLAIMER_TOOL =
  "This tool is educational only and does not diagnose arthritis or any other condition. It must not delay seeking care. Call 999 for emergencies. For urgent non-emergency advice contact NHS 111 or your GP.";

export const MEDICAL_DISCLAIMER_CHAT =
  "Educational support only — not a diagnosis or personal treatment plan. Always check with your GP, pharmacist or rheumatology team. Call 999 in an emergency; NHS 111 for urgent advice.";

export const MEDICAL_DISCLAIMER_PATH = "/disclaimer";

/** Path prefixes that should surface the short clinical strip (not marketing home). */
export const YMYL_PATH_PREFIXES = [
  "/conditions",
  "/guides",
  "/blog",
  "/library",
  "/exercises",
  "/diet",
  "/supplements",
  "/resources",
  "/symptom-checker",
  "/health-tools",
  "/self-help",
  "/self-assessment",
  "/chat",
  "/arthritis-flare-ups",
  "/arthritis-mental-health",
  "/benefits-pip",
  "/waiting-list",
  "/arthritis-waiting-list-help",
  "/pillar",
  "/tools",
  "/pedometer",
  "/faq",
] as const;

const YMYL_EXACT = new Set([
  "/symptom-checker",
  "/health-tools",
  "/self-help",
  "/self-assessment",
  "/chat",
  "/arthritis-flare-ups",
  "/arthritis-mental-health",
  "/benefits-pip",
  "/arthritis-waiting-list-help",
  "/pedometer",
  "/faq",
  "/disclaimer",
  "/editorial-standards",
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
  return "Emergency: 999. Urgent non-emergency: NHS 111. Mental health crisis: Samaritans 116 123.";
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
