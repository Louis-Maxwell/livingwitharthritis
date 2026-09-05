import { sendViaResend } from "./email";
import {
  handleChatStream,
  aiConfigured,
  MAX_CHAT_HISTORY,
  MAX_CHAT_MESSAGE_CHARS,
  type ChatMessage,
} from "./chat";
import { pruneRateLimits, rateLimitDurable, type KvLike } from "./rateLimit";
import { sanitizeEmail, sanitizeInput, sanitizePhone, isHoneypotFilled } from "./sanitize";
import { getRequestId } from "./requestId";
import { verifyTurnstile } from "./turnstile";
import { logSubmission } from "./audit";
import { handleSearch } from "./search";

export interface Env {
  ASSETS?: { fetch: (request: Request) => Promise<Response> };
  AI?: {
    run: (
      model: string,
      input: Record<string, unknown>,
    ) => Promise<ReadableStream | { response?: string } | string>;
  };
  /** Optional durable rate-limit KV — add real namespace id in wrangler.jsonc after create. */
  RATE_LIMIT?: KvLike;
  /** Optional submission audit KV (metadata only). */
  SUBMISSIONS?: KvLike;
  RESEND_API_KEY?: string;
  /** e.g. "Living With Arthritis <forms@livingwitharthritis.org.uk>" */
  RESEND_FROM?: string;
  CONTACT_TO_EMAIL?: string;
  OPENAI_API_KEY?: string;
  OPENAI_BASE_URL?: string;
  OPENAI_MODEL?: string;
  /** When set, contact/appointment require turnstileToken in JSON body. */
  TURNSTILE_SECRET_KEY?: string;
  /**
   * Optional IndexNow key for POST /api/indexnow.
   * Prefer scripts/indexnow-ping.mjs after deploy; endpoint is for authenticated ops only.
   */
  INDEXNOW_KEY?: string;
}

const ALLOWED_ORIGINS = new Set([
  "https://livingwitharthritis.org.uk",
  "https://www.livingwitharthritis.org.uk",
  "http://localhost:8787",
  "http://localhost:8080",
  "http://127.0.0.1:8787",
  "http://127.0.0.1:8080",
]);

const DEFAULT_TO = "info@livingwitharthritis.org.uk";
const DEFAULT_FROM = "Living With Arthritis <onboarding@resend.dev>";

/** Reject oversized JSON bodies early (contact/appointment/chat/indexnow). */
const MAX_BODY_BYTES = 64_000;

const INDEXNOW_HUB_PATHS = [
  "/",
  "/llms.txt",
  "/ai.txt",
  "/guides/benefits-pip",
  "/arthritis-waiting-list-help",
  "/diet",
  "/guides/exercise",
  "/guides/newly-diagnosed",
  "/about",
  "/editorial-standards",
  "/guides",
  "/benefits-pip",
  "/search",
  "/donate",
  "/blog",
  "/conditions/osteoarthritis",
  "/conditions/rheumatoid-arthritis",
];

function corsHeaders(request: Request): HeadersInit {
  const origin = request.headers.get("Origin") || "";
  const allow = ALLOWED_ORIGINS.has(origin) ? origin : "https://livingwitharthritis.org.uk";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-request-id, Authorization",
    Vary: "Origin",
  };
}

function withApiHeaders(response: Response, request: Request, requestId: string): Response {
  const headers = new Headers(response.headers);
  for (const [k, v] of Object.entries(corsHeaders(request))) {
    headers.set(k, v);
  }
  headers.set("x-request-id", requestId);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function json(
  data: unknown,
  status = 200,
  extraHeaders?: HeadersInit,
  requestId?: string,
): Response {
  const body =
    typeof data === "object" && data !== null && requestId
      ? { ...(data as Record<string, unknown>), requestId }
      : data;
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...(requestId ? { "x-request-id": requestId } : {}),
      ...extraHeaders,
    },
  });
}

function clientIp(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function contentLengthTooLarge(request: Request, max = MAX_BODY_BYTES): boolean {
  const raw = request.headers.get("content-length");
  if (!raw) return false;
  const n = Number(raw);
  return Number.isFinite(n) && n > max;
}

async function readJson(request: Request): Promise<Record<string, unknown> | null> {
  if (contentLengthTooLarge(request)) return null;
  try {
    const data = await request.json();
    return data && typeof data === "object" && !Array.isArray(data)
      ? (data as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

function handleHealth(env: Env, requestId: string): Response {
  // Fast path: Boolean existence checks only — no await, no secret values.
  const ai = aiConfigured(env);
  return json(
    {
      ok: true,
      service: "living-with-arthritis-api",
      time: new Date().toISOString(),
      checks: {
        resendConfigured: Boolean(env.RESEND_API_KEY),
        aiConfigured: ai.workersAi,
        openaiConfigured: ai.openai,
        rateLimitKv: Boolean(env.RATE_LIMIT),
        submissionsKv: Boolean(env.SUBMISSIONS),
        turnstileConfigured: Boolean(env.TURNSTILE_SECRET_KEY),
      },
    },
    200,
    { "Cache-Control": "public, max-age=10, stale-while-revalidate=30" },
    requestId,
  );
}

async function handleContact(request: Request, env: Env, requestId: string): Promise<Response> {
  const ip = clientIp(request);
  const rl = await rateLimitDurable(env.RATE_LIMIT, `contact:${ip}`, 5, 60_000);
  if (!rl.ok) {
    return json(
      { ok: false, error: "Too many submissions. Please wait and try again.", code: "rate_limited" },
      429,
      { "Retry-After": String(rl.retryAfterSec) },
      requestId,
    );
  }

  const body = await readJson(request);
  if (!body) return json({ ok: false, error: "Invalid JSON body.", code: "bad_request" }, 400, undefined, requestId);
  if (isHoneypotFilled(body)) {
    return json({ ok: true }, 200, undefined, requestId);
  }

  const turnstile = await verifyTurnstile({
    secret: env.TURNSTILE_SECRET_KEY,
    token: typeof body.turnstileToken === "string" ? body.turnstileToken : undefined,
    ip,
  });
  if (!turnstile.ok) {
    return json({ ok: false, error: turnstile.error, code: "turnstile_failed" }, 400, undefined, requestId);
  }

  const email = sanitizeEmail(String(body.email ?? ""));
  if (!email) return json({ ok: false, error: "Please enter a valid email address.", code: "invalid_email" }, 400, undefined, requestId);

  const name = sanitizeInput(String(body.name ?? body.contact_name ?? ""), 100);
  if (!name) return json({ ok: false, error: "Please enter your name.", code: "invalid_name" }, 400, undefined, requestId);

  const subject = sanitizeInput(String(body.subject ?? "Website enquiry"), 200) || "Website enquiry";
  const message = sanitizeInput(String(body.message ?? ""), 2000);
  if (message.length < 10) {
    return json({ ok: false, error: "Message is too short.", code: "invalid_message" }, 400, undefined, requestId);
  }

  const phone = body.phone ? sanitizePhone(String(body.phone)) : "";
  const organization = body.organization_name
    ? sanitizeInput(String(body.organization_name), 200)
    : "";
  const inquiryType = body.inquiry_type ? sanitizeInput(String(body.inquiry_type), 200) : "";
  const kind = sanitizeInput(String(body.kind ?? "contact"), 40);

  const text = [
    `Kind: ${kind}`,
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : "",
    organization ? `Organisation: ${organization}` : "",
    inquiryType ? `Enquiry type: ${inquiryType}` : "",
    `Request-Id: ${requestId}`,
    "",
    message,
  ]
    .filter((line, i, arr) => line !== "" || (i > 0 && arr[i - 1] !== ""))
    .join("\n");

  const to = env.CONTACT_TO_EMAIL || DEFAULT_TO;
  const from = env.RESEND_FROM || DEFAULT_FROM;
  const result = await sendViaResend(env.RESEND_API_KEY, {
    to,
    from,
    replyTo: email,
    subject: `[LWA web] ${subject}`,
    text,
  });

  if (!result.ok) {
    return json(
      {
        ok: false,
        error: result.error,
        code: result.code,
        mailtoSuggested: true,
      },
      result.code === "not_configured" ? 503 : 502,
      undefined,
      requestId,
    );
  }

  await logSubmission(env.SUBMISSIONS, {
    type: "contact",
    ip,
    subject,
    requestId,
  });

  return json({ ok: true, id: result.id }, 200, undefined, requestId);
}

async function handleAppointment(request: Request, env: Env, requestId: string): Promise<Response> {
  const ip = clientIp(request);
  const rl = await rateLimitDurable(env.RATE_LIMIT, `appointment:${ip}`, 8, 300_000);
  if (!rl.ok) {
    return json(
      {
        ok: false,
        error: "Too many booking attempts. Please wait and try again.",
        code: "rate_limited",
      },
      429,
      { "Retry-After": String(rl.retryAfterSec) },
      requestId,
    );
  }

  const body = await readJson(request);
  if (!body) return json({ ok: false, error: "Invalid JSON body.", code: "bad_request" }, 400, undefined, requestId);
  if (isHoneypotFilled(body)) return json({ ok: true }, 200, undefined, requestId);

  const turnstile = await verifyTurnstile({
    secret: env.TURNSTILE_SECRET_KEY,
    token: typeof body.turnstileToken === "string" ? body.turnstileToken : undefined,
    ip,
  });
  if (!turnstile.ok) {
    return json({ ok: false, error: turnstile.error, code: "turnstile_failed" }, 400, undefined, requestId);
  }

  const email = sanitizeEmail(String(body.email ?? ""));
  if (!email) return json({ ok: false, error: "Please enter a valid email address.", code: "invalid_email" }, 400, undefined, requestId);

  const name = sanitizeInput(String(body.name ?? ""), 100);
  if (!name) return json({ ok: false, error: "Please enter your name.", code: "invalid_name" }, 400, undefined, requestId);

  const appointmentType = sanitizeInput(String(body.appointmentType ?? ""), 100);
  const preferredDate = sanitizeInput(String(body.preferredDate ?? ""), 40);
  const preferredTime = sanitizeInput(String(body.preferredTime ?? ""), 40);
  if (!appointmentType || !preferredDate || !preferredTime) {
    return json(
      { ok: false, error: "Appointment type, date and time are required.", code: "bad_request" },
      400,
      undefined,
      requestId,
    );
  }

  const phone = body.phone ? sanitizePhone(String(body.phone)) : "";
  const notes = body.notes ? sanitizeInput(String(body.notes), 1000) : "";

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : "",
    `Type: ${appointmentType}`,
    `Preferred date: ${preferredDate}`,
    `Preferred time: ${preferredTime}`,
    notes ? `Notes: ${notes}` : "",
    `Request-Id: ${requestId}`,
  ]
    .filter(Boolean)
    .join("\n");

  const to = env.CONTACT_TO_EMAIL || DEFAULT_TO;
  const from = env.RESEND_FROM || DEFAULT_FROM;
  const result = await sendViaResend(env.RESEND_API_KEY, {
    to,
    from,
    replyTo: email,
    subject: "[LWA web] Appointment request",
    text,
  });

  if (!result.ok) {
    return json(
      {
        ok: false,
        error: result.error,
        code: result.code,
        mailtoSuggested: true,
      },
      result.code === "not_configured" ? 503 : 502,
      undefined,
      requestId,
    );
  }

  await logSubmission(env.SUBMISSIONS, {
    type: "appointment",
    ip,
    subject: appointmentType,
    requestId,
  });

  return json({ ok: true, id: result.id }, 200, undefined, requestId);
}

async function handleChat(request: Request, env: Env, requestId: string): Promise<Response> {
  const ip = clientIp(request);
  const rl = await rateLimitDurable(env.RATE_LIMIT, `chat:${ip}`, 20, 60_000);
  if (!rl.ok) {
    return json(
      { ok: false, error: "Too many chat messages. Please wait a minute.", code: "rate_limited" },
      429,
      { "Retry-After": String(rl.retryAfterSec) },
      requestId,
    );
  }

  const body = await readJson(request);
  if (!body) return json({ ok: false, error: "Invalid JSON body.", code: "bad_request" }, 400, undefined, requestId);

  const rawMessages = Array.isArray(body.messages) ? body.messages : null;
  const single = typeof body.message === "string" ? body.message : null;

  let messages: ChatMessage[] = [];
  if (rawMessages) {
    messages = rawMessages
      .filter((m): m is { role: string; content: string } => !!m && typeof m === "object")
      .map((m) => ({
        role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
        content: sanitizeInput(String(m.content ?? ""), MAX_CHAT_MESSAGE_CHARS),
      }))
      .filter((m) => m.content.length > 0)
      .slice(-MAX_CHAT_HISTORY);
  } else if (single) {
    messages = [{ role: "user", content: sanitizeInput(single, MAX_CHAT_MESSAGE_CHARS) }];
  }

  if (!messages.length) {
    return json({ ok: false, error: "Message is required.", code: "bad_request" }, 400, undefined, requestId);
  }

  if (typeof single === "string" && single.length > MAX_CHAT_MESSAGE_CHARS) {
    return json(
      {
        ok: false,
        error: `Message is too long (max ${MAX_CHAT_MESSAGE_CHARS} characters).`,
        code: "message_too_long",
      },
      400,
      undefined,
      requestId,
    );
  }

  return handleChatStream(env, messages);
}

async function handleIndexNow(request: Request, env: Env, requestId: string): Promise<Response> {
  // Prefer scripts/indexnow-ping.mjs after deploy. This endpoint is optional ops glue.
  const expected = env.INDEXNOW_KEY || "c98cc1e7f04d43b213d256e243f9ddd6";
  const auth = request.headers.get("Authorization") || "";
  const bearer = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  const body = await readJson(request);
  const keyFromBody = typeof body?.key === "string" ? body.key : "";
  const provided = bearer || keyFromBody;
  if (!provided || provided !== expected) {
    return json({ ok: false, error: "Unauthorized", code: "unauthorized" }, 401, undefined, requestId);
  }

  const host = "livingwitharthritis.org.uk";
  const urlList =
    body && Array.isArray(body.urlList) && body.urlList.every((u) => typeof u === "string")
      ? (body.urlList as string[]).slice(0, 50)
      : INDEXNOW_HUB_PATHS.map((p) => `https://${host}${p}`);

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host,
        key: expected,
        keyLocation: `https://${host}/${expected}.txt`,
        urlList,
      }),
    });
    if (!res.ok && res.status !== 202) {
      const text = await res.text().catch(() => "");
      return json(
        {
          ok: false,
          error: `IndexNow HTTP ${res.status}: ${text.slice(0, 200)}`,
          code: "provider_error",
        },
        502,
        undefined,
        requestId,
      );
    }
    return json({ ok: true, submitted: urlList.length }, 200, undefined, requestId);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "IndexNow failed";
    return json({ ok: false, error: msg, code: "provider_error" }, 502, undefined, requestId);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const requestId = getRequestId(request);

    if (request.method === "OPTIONS" && url.pathname.startsWith("/api/")) {
      return new Response(null, {
        status: 204,
        headers: {
          ...corsHeaders(request),
          "Access-Control-Max-Age": "86400",
          "x-request-id": requestId,
        },
      });
    }

    if (url.pathname.startsWith("/api/")) {
      pruneRateLimits();
    }

    if (url.pathname === "/api/health" && request.method === "GET") {
      return withApiHeaders(handleHealth(env, requestId), request, requestId);
    }

    if (url.pathname === "/api/search" && request.method === "GET") {
      return withApiHeaders(await handleSearch(request, env), request, requestId);
    }

    if (
      request.method === "POST" &&
      (url.pathname === "/api/contact" ||
        url.pathname === "/api/appointment" ||
        url.pathname === "/api/chat" ||
        url.pathname === "/api/chat/stream" ||
        url.pathname === "/api/indexnow") &&
      contentLengthTooLarge(request)
    ) {
      return withApiHeaders(
        json(
          { ok: false, error: "Request body too large.", code: "payload_too_large" },
          413,
          undefined,
          requestId,
        ),
        request,
        requestId,
      );
    }

    if (url.pathname === "/api/contact" && request.method === "POST") {
      return withApiHeaders(await handleContact(request, env, requestId), request, requestId);
    }
    if (url.pathname === "/api/appointment" && request.method === "POST") {
      return withApiHeaders(await handleAppointment(request, env, requestId), request, requestId);
    }
    if (
      (url.pathname === "/api/chat" || url.pathname === "/api/chat/stream") &&
      request.method === "POST"
    ) {
      return withApiHeaders(await handleChat(request, env, requestId), request, requestId);
    }

    if (url.pathname === "/api/indexnow" && request.method === "POST") {
      return withApiHeaders(await handleIndexNow(request, env, requestId), request, requestId);
    }

    if (url.pathname.startsWith("/api/")) {
      return withApiHeaders(
        json({ ok: false, error: "Not found", code: "not_found" }, 404, undefined, requestId),
        request,
        requestId,
      );
    }

    // Asset fallback only if binding present (run_worker_first paths).
    // Preserves assets not_found_handling: 404-page for non-/api routes.
    // With run_worker_first only /api/*, this branch rarely runs — keep lean.
    if (env.ASSETS) {
      const assetRes = await env.ASSETS.fetch(request);
      // Fingerprinted Vite bundles under /assets/* can be cached long-term.
      if (
        assetRes.ok &&
        (url.pathname.startsWith("/assets/") ||
          /\.[a-f0-9]{8,}\.(js|css|woff2?|webp|avif|png|jpg|svg)$/i.test(url.pathname))
      ) {
        const headers = new Headers(assetRes.headers);
        if (!headers.has("Cache-Control")) {
          headers.set("Cache-Control", "public, max-age=31536000, immutable");
        }
        return new Response(assetRes.body, {
          status: assetRes.status,
          statusText: assetRes.statusText,
          headers,
        });
      }
      return assetRes;
    }
    return json({ ok: false, error: "Not found", code: "not_found" }, 404, undefined, requestId);
  },
};
