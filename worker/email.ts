export type SendEmailInput = {
  to: string;
  from: string;
  replyTo?: string;
  subject: string;
  text: string;
};

export type SendEmailResult =
  | { ok: true; id?: string }
  | { ok: false; error: string; code: "not_configured" | "provider_error" };

/**
 * Deliver email via Resend (https://resend.com).
 * Requires RESEND_API_KEY. Prefer a verified domain From address.
 */
export async function sendViaResend(
  apiKey: string | undefined,
  input: SendEmailInput,
): Promise<SendEmailResult> {
  if (!apiKey) {
    return {
      ok: false,
      error:
        "Email delivery is not configured on the server yet (missing RESEND_API_KEY).",
      code: "not_configured",
    };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: input.from,
      to: [input.to],
      reply_to: input.replyTo,
      subject: input.subject,
      text: input.text,
    }),
  });

  const data = (await res.json().catch(() => ({}))) as {
    id?: string;
    message?: string;
    name?: string;
  };

  if (!res.ok) {
    return {
      ok: false,
      error: data.message || data.name || `Resend HTTP ${res.status}`,
      code: "provider_error",
    };
  }

  return { ok: true, id: data.id };
}
