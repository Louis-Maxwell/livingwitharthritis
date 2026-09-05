/**
 * Optional Cloudflare Turnstile verification.
 * Skipped entirely when TURNSTILE_SECRET_KEY is unset (local/dev works).
 */

export async function verifyTurnstile(opts: {
  secret?: string;
  token?: string;
  ip?: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!opts.secret) return { ok: true };
  const token = (opts.token || "").trim();
  if (!token) {
    return { ok: false, error: "Please complete the security check." };
  }

  try {
    const body = new URLSearchParams();
    body.set("secret", opts.secret);
    body.set("response", token);
    if (opts.ip && opts.ip !== "unknown") body.set("remoteip", opts.ip);

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      },
    );
    const data = (await res.json().catch(() => ({}))) as {
      success?: boolean;
      "error-codes"?: string[];
    };
    if (data.success) return { ok: true };
    return {
      ok: false,
      error: "Security check failed. Please try again.",
    };
  } catch {
    // Fail open on network blips so charity forms stay usable;
    // secret being set still blocks empty tokens above.
    console.error("Turnstile verify network error — allowing request");
    return { ok: true };
  }
}
