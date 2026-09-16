/**
 * Validate optional VITE_STRIPE_DONATE_URL before navigating.
 * Fail-safe: invalid / unexpected hosts must not redirect.
 */

const ALLOWED_STRIPE_DONATE_HOSTS = new Set([
  "checkout.stripe.com",
  "buy.stripe.com",
  "invoice.stripe.com",
  "donate.stripe.com",
]);

export type StripeDonateValidation =
  | { ok: true; url: string }
  | { ok: false; reason: string };

/**
 * Returns a safe absolute https URL if host is an allowlisted Stripe donate/payment host.
 */
export function validateStripeDonateUrl(
  raw: string | undefined | null,
): StripeDonateValidation {
  if (raw == null || String(raw).trim() === "") {
    return { ok: false, reason: "empty" };
  }
  let parsed: URL;
  try {
    parsed = new URL(String(raw).trim());
  } catch {
    return { ok: false, reason: "invalid_url" };
  }
  if (parsed.protocol !== "https:") {
    return { ok: false, reason: "non_https" };
  }
  const host = parsed.hostname.toLowerCase();
  if (!ALLOWED_STRIPE_DONATE_HOSTS.has(host)) {
    return { ok: false, reason: "host_not_allowlisted" };
  }
  return { ok: true, url: parsed.toString() };
}

export { ALLOWED_STRIPE_DONATE_HOSTS };
