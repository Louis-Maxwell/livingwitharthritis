/**
 * Single source of truth for organisation contact details.
 *
 * Update values here and they will propagate everywhere in the frontend
 * (pages, components, footer, exit-intent flows, transactional copy).
 *
 * Edge functions cannot import from `src/`; mirror values in
 * `supabase/functions/_shared/contact.ts` if a server-side change is needed.
 */
export const CONTACT_EMAILS = {
  info: "info@livingwitharthritis.org.uk",
  press: "press@livingwitharthritis.org.uk",
  safeguarding: "safeguarding@livingwitharthritis.org.uk",
  hello: "hello@livingwitharthritis.org.uk",
} as const;

export const CONTACT_PHONE = "07760 512 084";
export const CONTACT_PHONE_TEL = "07760512084";

export const CONTACT_ADDRESS =
  "Living With Arthritis UK, Oswestry Health Centre, Thomas Savin Road, Off Gobowen Road, Oswestry SY11 1GA";

/** Convenience helper for building mailto: links. */
export const mailto = (
  email: keyof typeof CONTACT_EMAILS = "info",
  subject?: string,
) => {
  const base = `mailto:${CONTACT_EMAILS[email]}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
};
