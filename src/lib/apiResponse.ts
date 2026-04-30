/**
 * Helpers for unpacking the standard backend response envelope:
 *   success: { ok: true, data: {...}, requestId }
 *   error:   { ok: false, error: { code, message, fields?, requestId } }
 *
 * Falls back to legacy shapes ({ error: "..." } or { message, success }) so
 * older endpoints keep working during the rollout.
 */

export interface BackendError {
  code: string;
  message: string;
  fields?: Record<string, string[]>;
  requestId?: string;
}

export function unwrapResponse<T = unknown>(result: unknown): {
  data: T | null;
  error: BackendError | null;
} {
  if (!result || typeof result !== "object") {
    return { data: null, error: { code: "server_error", message: "Empty response from server." } };
  }

  const r = result as Record<string, unknown>;

  // New envelope
  if (typeof r.ok === "boolean") {
    if (r.ok) return { data: (r.data as T) ?? null, error: null };
    const err = r.error as Record<string, unknown> | undefined;
    return {
      data: null,
      error: {
        code: typeof err?.code === "string" ? err.code : "server_error",
        message: typeof err?.message === "string" ? err.message : "Request failed.",
        fields: (err?.fields as Record<string, string[]>) ?? undefined,
        requestId: typeof err?.requestId === "string" ? err.requestId : undefined,
      },
    };
  }

  // Legacy: { error: "string" }
  if (typeof r.error === "string") {
    return { data: null, error: { code: "server_error", message: r.error } };
  }

  // Legacy success: object with no envelope
  return { data: r as T, error: null };
}

/** Friendly fallback message for a backend error. */
export function friendlyErrorMessage(err: BackendError): string {
  switch (err.code) {
    case "rate_limited":
      return err.message || "Too many requests. Please wait a moment.";
    case "validation_failed":
      if (err.fields) {
        const first = Object.values(err.fields)[0]?.[0];
        if (first) return first;
      }
      return err.message || "Please check the form and try again.";
    case "unauthorized":
      return err.message || "Please log in and try again.";
    case "forbidden":
      return err.message || "You don't have permission to do that.";
    case "conflict":
      return err.message || "That action conflicts with existing data.";
    case "not_found":
      return err.message || "Not found.";
    case "service_unavailable":
      return err.message || "Service temporarily unavailable.";
    default:
      return err.message || "Something went wrong. Please try again.";
  }
}
