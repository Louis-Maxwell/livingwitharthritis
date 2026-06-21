/**
 * Server-side mirror of `src/config/contact.ts`.
 *
 * Edge functions cannot import from `src/`, so we duplicate the canonical
 * organisation contact details here. Keep this file in sync with the
 * frontend config — values must match exactly.
 *
 * If `CONTACT_INFO_EMAIL` (or related) is set in the function environment,
 * it overrides the default below. This lets ops rotate addresses without a
 * code deploy.
 */

const env = (key: string): string | undefined => {
  try {
    return Deno.env.get(key) ?? undefined;
  } catch {
    return undefined;
  }
};

export const CONTACT_EMAILS = {
  info: env("CONTACT_INFO_EMAIL") ?? "info@livingwitharthritis.org.uk",
  press: env("CONTACT_PRESS_EMAIL") ?? "press@livingwitharthritis.org.uk",
  safeguarding:
    env("CONTACT_SAFEGUARDING_EMAIL") ?? "safeguarding@livingwitharthritis.org.uk",
  hello: env("CONTACT_HELLO_EMAIL") ?? "hello@livingwitharthritis.org.uk",
} as const;

export const CONTACT_PHONE = "07760 512 084";
/** Postal address intentionally omitted — new registered address pending. */
export const CONTACT_ADDRESS = "";
