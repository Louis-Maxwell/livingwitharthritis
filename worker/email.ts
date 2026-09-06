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

const RESEND_TIMEOUT_MS = 15_000;

/**
 * Deliver email via Resend (https://resend.com).
 * Requires RESEND_API_KEY. Prefer a verified domain From address.
 * Success only on HTTP 2xx — never invents delivery.
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

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), RESEND_TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch("https://api.resend.com/emails", {
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
      signal: controller.signal,
    });
  } catch (err) {
    const aborted =
      (err instanceof Error && err.name === "AbortError") || controller.signal.aborted;
    return {
      ok: false,
      error: aborted
        ? "Email provider timed out. Please try again shortly."
        : "Email provider is temporarily unreachable. Please try again shortly.",
      code: "provider_error",
    };
  } finally {
    clearTimeout(timer);
  }

  // Only 2xx counts as delivered — never treat redirects/empty as success.
  if (res.status < 200 || res.status >= 300) {
    // Log provider detail server-side only; clients get a safe message.
    const data = (await res.json().catch(() => ({}))) as {
      message?: string;
      name?: string;
    };
    console.error("Resend error", res.status, data.message || data.name || "");
    return {
      ok: false,
      error: "We could not send your message just now. Please try again or email us directly.",
      code: "provider_error",
    };
  }

  const data = (await res.json().catch(() => ({}))) as { id?: string };
  return { ok: true, id: typeof data.id === "string" ? data.id : undefined };
}
