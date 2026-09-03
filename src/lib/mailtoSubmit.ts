import { CONTACT_EMAILS } from "@/config/contact";

/** Open the visitor's email client. Does not store a submission. */
export function openMailto(opts: {
  subject: string;
  body: string;
  email?: string;
}): void {
  const to = opts.email ?? CONTACT_EMAILS.info;
  const href = `mailto:${to}?subject=${encodeURIComponent(opts.subject)}&body=${encodeURIComponent(opts.body)}`;
  window.location.href = href;
}
