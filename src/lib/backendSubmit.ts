/**
 * Form helpers without a database backend.
 * Newsletter primary path: FormSubmit.co AJAX → charity inbox.
 * Other forms: mailto draft via submitViaMailto.
 * Never invent "saved to database" success.
 */
import { submitViaMailto } from "@/lib/formApi";
import { CONTACT_EMAILS } from "@/config/contact";

export type BackendSubmitResult =
  | {
      ok: true;
      via: "formsubmit";
      message: string;
    }
  | { ok: false; via: "mailto"; message: string; mailtoOpened: true }
  | { ok: false; via: "none"; message: string };

/** FormSubmit AJAX endpoint — first live submit emails an activation link to the inbox. */
export const NEWSLETTER_FORMSUBMIT_URL = `https://formsubmit.co/ajax/${CONTACT_EMAILS.info}`;

function mailtoFallback(opts: { subject: string; body: string }): BackendSubmitResult {
  try {
    const result = submitViaMailto(opts);
    return {
      ok: false,
      via: "mailto",
      mailtoOpened: true,
      message: result.error,
    };
  } catch {
    return {
      ok: false,
      via: "none",
      message: `Sorry — that did not work. Please email ${CONTACT_EMAILS.info} or call 07760 512 084.`,
    };
  }
}

/**
 * Deliver a newsletter signup to the charity inbox via FormSubmit.co.
 * On failure, opens a mailto draft (visitor must press Send).
 */
export async function subscribeNewsletter(opts: {
  email: string;
  source?: string;
}): Promise<BackendSubmitResult> {
  const email = opts.email.trim().toLowerCase();
  const source = (opts.source || "website").slice(0, 80);

  try {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 12000);
    try {
      const res = await fetch(NEWSLETTER_FORMSUBMIT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          _replyto: email,
          _subject: `Newsletter signup (${source})`,
          message: `Please add this address to the newsletter list.\nEmail: ${email}\nSource: ${source}`,
          _template: "table",
          _captcha: "false",
        }),
        signal: controller.signal,
      });

      if (res.ok) {
        return {
          ok: true,
          via: "formsubmit",
          message:
            `Thanks — we emailed ${CONTACT_EMAILS.info} with your address. ` +
            "If this is the first signup through FormSubmit, Louis must click the one-time activation link in that inbox before further signups arrive.",
        };
      }
    } finally {
      window.clearTimeout(timer);
    }
  } catch {
    // fall through to mailto
  }

  return mailtoFallback({
    subject: "Newsletter signup",
    body: `Please add this email to the newsletter list: ${email}\nSource: ${source}`,
  });
}

export async function submitContactInquiry(opts: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<BackendSubmitResult> {
  const row = {
    name: opts.name.trim().slice(0, 200),
    email: opts.email.trim().toLowerCase().slice(0, 320),
    phone: opts.phone?.trim() ? opts.phone.trim().slice(0, 40) : null,
    subject: opts.subject.trim().slice(0, 200) || "Website enquiry",
    message: opts.message.trim().slice(0, 5000),
  };

  const lines = [
    `Name: ${row.name}`,
    `Email: ${row.email}`,
    row.phone ? `Phone: ${row.phone}` : "",
    "",
    row.message,
  ].filter(Boolean);

  return mailtoFallback({
    subject: row.subject,
    body: lines.join("\n"),
  });
}

/** Volunteer applications — same mailto path, clearer subject for inbox triage. */
export async function submitVolunteerEnquiry(opts: {
  name: string;
  email: string;
  area_of_interest: string;
  message?: string;
}): Promise<BackendSubmitResult> {
  const name = opts.name.trim().slice(0, 200);
  const email = opts.email.trim().toLowerCase().slice(0, 320);
  const interest = opts.area_of_interest.trim().slice(0, 200);
  const message = (opts.message || "").trim().slice(0, 5000);

  return mailtoFallback({
    subject: `Volunteer enquiry: ${interest || "general"}`,
    body: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Interest: ${interest}`,
      "",
      message || "(No extra message)",
    ].join("\n"),
  });
}

export async function submitBlogComment(opts: {
  slug: string;
  author_name: string;
  content: string;
}): Promise<BackendSubmitResult> {
  const row = {
    slug: opts.slug.trim().slice(0, 200),
    author_name: opts.author_name.trim().slice(0, 100),
    content: opts.content.trim().slice(0, 2000),
  };

  return mailtoFallback({
    subject: `Comment on ${row.slug}`,
    body: `${row.author_name} wrote:\n\n${row.content}`,
  });
}
