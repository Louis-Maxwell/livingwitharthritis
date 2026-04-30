// Shared HTTP helpers for edge functions.
// Provides:
//   - getCorsHeaders(req)            — restricted CORS for trusted origins
//   - newRequestId()                 — short id attached to every response
//   - okJson(data, req, init?)       — 200 envelope: { ok: true, data, requestId }
//   - errJson(req, opts)             — error envelope: { ok: false, error: {code, message, fields?, requestId} }
//   - parseJsonBody(req)             — safe JSON parse → { ok, data | error }
//
// All public endpoints should return one of these so the frontend can rely on
// a single shape: `{ ok, data?, error? }`.

const TRUSTED_ORIGINS_EXACT = new Set([
  "https://livingwitharthritis.org.uk",
  "https://www.livingwitharthritis.org.uk",
  "https://livingwitharthritis.lovable.app",
]);

function isTrustedOrigin(origin: string): boolean {
  if (!origin) return false;
  if (TRUSTED_ORIGINS_EXACT.has(origin)) return true;
  if (origin.endsWith(".lovable.app")) return true;
  if (origin.endsWith(".lovableproject.com")) return true;
  if (origin.startsWith("http://localhost:")) return true;
  return false;
}

export function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("Origin") || "";
  const allow = isTrustedOrigin(origin) ? origin : "https://livingwitharthritis.lovable.app";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, stripe-signature, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
    "Vary": "Origin",
  };
}

/** Short, URL-safe request id for log correlation. */
export function newRequestId(): string {
  // 12 hex chars is plenty for per-request log lookups.
  const buf = new Uint8Array(6);
  crypto.getRandomValues(buf);
  return Array.from(buf, (b) => b.toString(16).padStart(2, "0")).join("");
}

export interface ErrorEnvelope {
  ok: false;
  error: {
    code: string;
    message: string;
    fields?: Record<string, string[]>;
    requestId: string;
  };
}

export interface OkEnvelope<T> {
  ok: true;
  data: T;
  requestId: string;
}

export type ErrorCode =
  | "bad_request"
  | "invalid_json"
  | "validation_failed"
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "conflict"
  | "rate_limited"
  | "method_not_allowed"
  | "server_error"
  | "service_unavailable";

const STATUS_FOR_CODE: Record<ErrorCode, number> = {
  bad_request: 400,
  invalid_json: 400,
  validation_failed: 400,
  unauthorized: 401,
  forbidden: 403,
  not_found: 404,
  conflict: 409,
  rate_limited: 429,
  method_not_allowed: 405,
  server_error: 500,
  service_unavailable: 503,
};

export function okJson<T>(
  data: T,
  req: Request,
  init?: { status?: number; requestId?: string; headers?: Record<string, string> },
): Response {
  const requestId = init?.requestId ?? newRequestId();
  const body: OkEnvelope<T> = { ok: true, data, requestId };
  return new Response(JSON.stringify(body), {
    status: init?.status ?? 200,
    headers: {
      ...getCorsHeaders(req),
      "Content-Type": "application/json",
      "X-Request-Id": requestId,
      ...(init?.headers ?? {}),
    },
  });
}

export function errJson(
  req: Request,
  opts: {
    code: ErrorCode;
    message: string;
    fields?: Record<string, string[]>;
    status?: number;
    requestId?: string;
    headers?: Record<string, string>;
  },
): Response {
  const requestId = opts.requestId ?? newRequestId();
  const body: ErrorEnvelope = {
    ok: false,
    error: {
      code: opts.code,
      message: opts.message,
      ...(opts.fields ? { fields: opts.fields } : {}),
      requestId,
    },
  };
  return new Response(JSON.stringify(body), {
    status: opts.status ?? STATUS_FOR_CODE[opts.code],
    headers: {
      ...getCorsHeaders(req),
      "Content-Type": "application/json",
      "X-Request-Id": requestId,
      ...(opts.headers ?? {}),
    },
  });
}

/** Parse JSON body safely; returns either parsed value or a ready-made 400 response. */
export async function parseJsonBody(
  req: Request,
  requestId: string,
): Promise<{ ok: true; data: unknown } | { ok: false; response: Response }> {
  try {
    const data = await req.json();
    return { ok: true, data };
  } catch {
    return {
      ok: false,
      response: errJson(req, {
        code: "invalid_json",
        message: "Request body is not valid JSON.",
        requestId,
      }),
    };
  }
}

/** OPTIONS preflight responder. */
export function preflight(req: Request): Response {
  return new Response(null, { headers: getCorsHeaders(req) });
}
