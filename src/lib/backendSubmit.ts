/**
 * Mailto-only form helpers. No database backend — opens the visitor's email
 * client via submitViaMailto. Never invent success for undelivered mail.
 */
import { submitViaMailto } from "@/lib/formApi";
import { CONTACT_EMAILS } from "@/config/contact";

export type BackendSubmitResult =
  | { ok: false; via: "mailto"; message: string; mailtoOpened: true }
  | { ok: false; via: "none"; message: string };

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

export async function subscribeNewsletter(opts: {
  email: string;
  source?: string;
}): Promise<BackendSubmitResult> {
  const email = opts.email.trim().toLowerCase();
  const source = (opts.source || "website").slice(0, 80);

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
