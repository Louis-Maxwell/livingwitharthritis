import { sendViaResend } from "./email";
import { handleChatStream, type ChatMessage } from "./chat";
import { pruneRateLimits, rateLimit } from "./rateLimit";
import { sanitizeEmail, sanitizeInput, sanitizePhone } from "./sanitize";

export interface Env {
  ASSETS?: { fetch: (request: Request) => Promise<Response> };
  AI?: {
    run: (
      model: string,
      input: Record<string, unknown>,
    ) => Promise<ReadableStream | { response?: string } | string>;
  };
  RESEND_API_KEY?: string;
  /** e.g. "Living With Arthritis <forms@livingwitharthritis.org.uk>" */
  RESEND_FROM?: string;
  CONTACT_TO_EMAIL?: string;
  OPENAI_API_KEY?: string;
  OPENAI_BASE_URL?: string;
  OPENAI_MODEL?: string;
}


const ALLOWED_ORIGINS = new Set([
  "https://livingwitharthritis.org.uk",
  "https://www.livingwitharthritis.org.uk",
  "http://localhost:8787",
  "http://localhost:8080",
  "http://127.0.0.1:8787",
  "http://127.0.0.1:8080",
]);

function corsHeaders(request: Request): HeadersInit {
  const origin = request.headers.get("Origin") || "";
  const allow = ALLOWED_ORIGINS.has(origin) ? origin : "https://livingwitharthritis.org.uk";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}

function withCors(response: Response, request: Request): Response {
  const headers = new Headers(response.headers);
  for (const [k, v] of Object.entries(corsHeaders(request))) {
    headers.set(k, v);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

const DEFAULT_TO = "info@livingwitharthritis.org.uk";
const DEFAULT_FROM = "Living With Arthritis <onboarding@resend.dev>";

function json(data: unknown, status = 200, extraHeaders?: HeadersInit): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
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

function isHoneypotFilled(body: Record<string, unknown>): boolean {
  const hp = body.website ?? body.company_url ?? body.fax;
  return typeof hp === "string" && hp.trim().length > 0;
}

async function readJson(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const data = await request.json();
    return data && typeof data === "object" ? (data as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  const ip = clientIp(request);
  pruneRateLimits();
  const rl = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!rl.ok) {
    return json(
      { ok: false, error: "Too many submissions. Please wait and try again.", code: "rate_limited" },
      429,
      { "Retry-After": String(rl.retryAfterSec) },
    );
  }

  const body = await readJson(request);
  if (!body) return json({ ok: false, error: "Invalid JSON body.", code: "bad_request" }, 400);
  if (isHoneypotFilled(body)) {
    // Pretend success to bots; do not send email.
    return json({ ok: true });
  }

  const email = sanitizeEmail(String(body.email ?? ""));
  if (!email) return json({ ok: false, error: "Please enter a valid email address.", code: "invalid_email" }, 400);

  const name = sanitizeInput(String(body.name ?? body.contact_name ?? ""), 100);
  if (!name) return json({ ok: false, error: "Please enter your name.", code: "invalid_name" }, 400);

  const subject = sanitizeInput(String(body.subject ?? "Website enquiry"), 200) || "Website enquiry";
  const message = sanitizeInput(String(body.message ?? ""), 2000);
  if (message.length < 10) {
    return json({ ok: false, error: "Message is too short.", code: "invalid_message" }, 400);
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
    );
  }

  return json({ ok: true, id: result.id });
}

async function handleAppointment(request: Request, env: Env): Promise<Response> {
  const ip = clientIp(request);
  pruneRateLimits();
  const rl = rateLimit(`appointment:${ip}`, 8, 300_000);
  if (!rl.ok) {
    return json(
      { ok: false, error: "Too many booking attempts. Please wait and try again.", code: "rate_limited" },
      429,
      { "Retry-After": String(rl.retryAfterSec) },
    );
  }

  const body = await readJson(request);
  if (!body) return json({ ok: false, error: "Invalid JSON body.", code: "bad_request" }, 400);
  if (isHoneypotFilled(body)) return json({ ok: true });

  const email = sanitizeEmail(String(body.email ?? ""));
  if (!email) return json({ ok: false, error: "Please enter a valid email address.", code: "invalid_email" }, 400);

  const name = sanitizeInput(String(body.name ?? ""), 100);
  if (!name) return json({ ok: false, error: "Please enter your name.", code: "invalid_name" }, 400);

  const appointmentType = sanitizeInput(String(body.appointmentType ?? ""), 100);
  const preferredDate = sanitizeInput(String(body.preferredDate ?? ""), 40);
  const preferredTime = sanitizeInput(String(body.preferredTime ?? ""), 40);
  if (!appointmentType || !preferredDate || !preferredTime) {
    return json(
      { ok: false, error: "Appointment type, date and time are required.", code: "bad_request" },
      400,
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
    );
  }

  return json({ ok: true, id: result.id });
}

async function handleChat(request: Request, env: Env): Promise<Response> {
  const ip = clientIp(request);
  pruneRateLimits();
  const rl = rateLimit(`chat:${ip}`, 20, 60_000);
  if (!rl.ok) {
    return json(
      { ok: false, error: "Too many chat messages. Please wait a minute.", code: "rate_limited" },
      429,
      { "Retry-After": String(rl.retryAfterSec) },
    );
  }

  const body = await readJson(request);
  if (!body) return json({ ok: false, error: "Invalid JSON body.", code: "bad_request" }, 400);

  const rawMessages = Array.isArray(body.messages) ? body.messages : null;
  const single = typeof body.message === "string" ? body.message : null;

  let messages: ChatMessage[] = [];
  if (rawMessages) {
    messages = rawMessages
      .filter((m): m is { role: string; content: string } => !!m && typeof m === "object")
      .map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: sanitizeInput(String(m.content ?? ""), 4000),
      }))
      .filter((m) => m.content.length > 0)
      .slice(-12) as ChatMessage[];
  } else if (single) {
    messages = [{ role: "user", content: sanitizeInput(single, 4000) }];
  }

  if (!messages.length) {
    return json({ ok: false, error: "Message is required.", code: "bad_request" }, 400);
  }

  return handleChatStream(env, messages);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS" && url.pathname.startsWith("/api/")) {
      return new Response(null, {
        status: 204,
        headers: {
          ...corsHeaders(request),
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    if (url.pathname === "/api/contact" && request.method === "POST") {
      return withCors(await handleContact(request, env), request);
    }
    if (url.pathname === "/api/appointment" && request.method === "POST") {
      return withCors(await handleAppointment(request, env), request);
    }
    if (
      (url.pathname === "/api/chat" || url.pathname === "/api/chat/stream") &&
      request.method === "POST"
    ) {
      return withCors(await handleChat(request, env), request);
    }

    if (url.pathname.startsWith("/api/")) {
      return withCors(json({ ok: false, error: "Not found", code: "not_found" }, 404), request);
    }

    // Asset fallback only if binding present (run_worker_first paths).
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }
    return json({ ok: false, error: "Not found", code: "not_found" }, 404);
  },
};
