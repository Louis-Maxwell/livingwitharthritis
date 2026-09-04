/** Browser helpers for Cloudflare Worker form endpoints. */

export type FormApiResult =
  | { ok: true }
  | {
      ok: false;
      error: string;
      code?: string;
      /** UI may offer mailto as last resort — never toast success for mailto-only. */
      mailtoSuggested?: boolean;
    };

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
    };

    if (res.ok && data.ok !== false) {
      return { ok: true };
    }

    return {
      ok: false,
      error: data.error || `Request failed (${res.status})`,
      code: data.code,
      mailtoSuggested: Boolean(data.mailtoSuggested) || res.status >= 500,
    };
  } catch {
    return {
      ok: false,
      error: "Network error — please try again.",
      code: "network_error",
      mailtoSuggested: true,
    };
  }
}
