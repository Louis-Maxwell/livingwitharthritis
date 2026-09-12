/**
 * Supabase-first form helpers with mailto fallback when env is missing
 * or the insert fails/throws. Never invent success for undelivered mail.
 */
import { supabase, isSupabaseConfigured } from "@/integrations/supabase/client";
import { submitViaMailto } from "@/lib/formApi";
import { CONTACT_EMAILS } from "@/config/contact";

export type BackendSubmitResult =
  | { ok: true; via: "supabase"; message: string }
  | { ok: false; via: "mailto"; message: string; mailtoOpened: true }
  | { ok: false; via: "none"; message: string };

type InsertError = { code?: string } | null;

/** Run a Supabase insert. Network / client throws become "fail" (mailto). */
async function tryInsert(
  run: () => PromiseLike<{ error: InsertError }>,
): Promise<"ok" | "duplicate" | "fail"> {
  try {
    const { error } = await run();
    if (!error) return "ok";
    if (error.code === "23505") return "duplicate";
    return "fail";
  } catch {
    return "fail";
  }
}

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

  if (isSupabaseConfigured && supabase) {
    const client = supabase;
    const outcome = await tryInsert(() =>
      client.from("newsletter_subscriptions").insert({
        email,
        source,
        // RLS requires these to stay null on anon insert
        confirmation_token: null,
        confirmed_at: null,
        unsubscribe_token: null,
      }),
    );

    if (outcome === "ok") {
      return {
        ok: true,
        via: "supabase",
        message:
          "Thank you — you are on the list. We will only email when we have something useful to share. Unsubscribe anytime.",
      };
    }

    // Unique email → already subscribed (honest success)
    if (outcome === "duplicate") {
      return {
        ok: true,
        via: "supabase",
        message: "You are already on our list. Thank you — no need to sign up again.",
      };
    }
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
    status: "new" as const,
  };

  if (isSupabaseConfigured && supabase) {
    const client = supabase;
    const outcome = await tryInsert(() => client.from("contact_inquiries").insert(row));
    if (outcome === "ok") {
      return {
        ok: true,
        via: "supabase",
        message:
          `Thank you — your message was received. We aim to reply within two working days via ${CONTACT_EMAILS.info}. For urgent help call 07760 512 084.`,
      };
    }
  }

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

export async function submitBlogComment(opts: {
  slug: string;
  author_name: string;
  content: string;
}): Promise<BackendSubmitResult> {
  const row = {
    slug: opts.slug.trim().slice(0, 200),
    author_name: opts.author_name.trim().slice(0, 100),
    content: opts.content.trim().slice(0, 2000),
    status: "pending" as const,
  };

  if (isSupabaseConfigured && supabase) {
    const client = supabase;
    const outcome = await tryInsert(() => client.from("blog_comments").insert(row));
    if (outcome === "ok") {
      return {
        ok: true,
        via: "supabase",
        message:
          "Thank you — your comment was submitted for review. Approved comments appear on this page.",
      };
    }
  }

  return mailtoFallback({
    subject: `Comment on ${row.slug}`,
    body: `${row.author_name} wrote:\n\n${row.content}`,
  });
}
