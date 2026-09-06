/** Honest form helpers without a Worker/API backend.
 *
 * Opens the visitor email client. Mailto is NOT delivery confirmation —
 * never toast success for mailto-only flows.
 */

import { openMailto } from "@/lib/mailtoSubmit";
import { CONTACT_EMAILS } from "@/config/contact";

export type FormApiResult = {
  ok: false;
  error: string;
  code: "mailto_only";
  mailtoSuggested: true;
  mailtoOpened: true;
};

/** Open a prefilled mailto draft. Always returns ok:false (honest: not auto-delivered). */
export function submitViaMailto(opts: {
  subject: string;
  body: string;
  email?: string;
}): FormApiResult {
  openMailto(opts);
  return {
    ok: false,
    code: "mailto_only",
    mailtoSuggested: true,
    mailtoOpened: true,
    error:
      `Your email app should open with a draft to ${opts.email ?? CONTACT_EMAILS.info}. ` +
      "Please press Send there — we only receive the message after you send it. " +
      "Nothing was submitted automatically from this website.",
  };
}
