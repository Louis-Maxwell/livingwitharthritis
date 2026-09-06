/** Browser helpers for Cloudflare Worker form endpoints. */

export type FormApiResult =
  | { ok: true; requestId?: string }
  | {
      ok: false;
      error: string;
      code?: string;
      requestId?: string;
      retryAfterSec?: number;
      /** UI may offer mailto as last resort — never toast success for mailto-only. */
      mailtoSuggested?: boolean;
    };

function humaniseError(
  status: number,
  data: { error?: string; code?: string; retryAfterSec?: number },
): string {
  if (status === 429 || data.code === "rate_limited") {
    const wait = data.retryAfterSec && data.retryAfterSec > 0 ? data.retryAfterSec : 60;
    return data.error || `Too many submissions. Please wait about ${wait} seconds and try again.`;
  }
  if (status === 413 || data.code === "payload_too_large") {
    return data.error || "That message is too large. Please shorten it and try again.";
  }
  return data.error || `Request failed (${status})`;
}

export async function postFormApi(
  path: "/api/contact" | "/api/appointment",
  body: Record<string, unknown>,
): Promise<FormApiResult> {
  try {
    const res = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      error?: string;
      code?: string;
      mailtoSuggested?: boolean;
      requestId?: string;
      retryAfterSec?: number;
    };

    const requestId = data.requestId || res.headers.get("x-request-id") || undefined;
    const retryHeader = res.headers.get("Retry-After");
    const retryAfterSec =
      typeof data.retryAfterSec === "number"
        ? data.retryAfterSec
        : retryHeader && Number.isFinite(Number(retryHeader))
          ? Number(retryHeader)
          : undefined;

    if (res.ok && data.ok !== false) {
      return { ok: true, requestId };
    }

    return {
      ok: false,
      error: humaniseError(res.status, { ...data, retryAfterSec }),
      code: data.code || (res.status === 429 ? "rate_limited" : undefined),
      requestId,
      retryAfterSec,
      mailtoSuggested: Boolean(data.mailtoSuggested) || res.status >= 500,
    };
  } catch {
    return {
      ok: false,
      error: "Network error — please check your connection and try again.",
      code: "network_error",
      mailtoSuggested: true,
    };
  }
}
