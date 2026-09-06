import { describe, expect, it, vi, beforeEach } from "vitest";
import worker from "../index";
import { resetRateLimitBucketsForTests } from "../rateLimit";
import { MAX_CHAT_MESSAGE_CHARS, SYSTEM_PROMPT } from "../chat";

type Env = Record<string, unknown>;

function req(path: string, init: RequestInit = {}) {
  return new Request(`https://livingwitharthritis.org.uk${path}`, init);
}

async function jsonOf(res: Response) {
  return (await res.json()) as Record<string, unknown>;
}

describe("worker API hardening", () => {
  beforeEach(() => {
    resetRateLimitBucketsForTests();
  });

  it("health is GET-only with requestId and short cache", async () => {
    const res = await worker.fetch(req("/api/health"), {} as Env);
    expect(res.status).toBe(200);
    expect(res.headers.get("x-request-id")).toBeTruthy();
    expect(res.headers.get("Cache-Control")).toMatch(/max-age=10/);
    const body = await jsonOf(res);
    expect(body.ok).toBe(true);
    expect(body.requestId).toBeTruthy();
    expect(body.checks && typeof body.checks === "object").toBe(true);

    const bad = await worker.fetch(req("/api/health", { method: "POST" }), {} as Env);
    expect(bad.status).toBe(405);
    const badBody = await jsonOf(bad);
    expect(badBody.code).toBe("method_not_allowed");
    expect(bad.headers.get("Allow")).toMatch(/GET/);
  });

  it("OPTIONS preflight returns 204 with CORS and no-store", async () => {
    const res = await worker.fetch(
      req("/api/contact", {
        method: "OPTIONS",
        headers: { Origin: "http://localhost:8080" },
      }),
      {} as Env,
    );
    expect(res.status).toBe(204);
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe("http://localhost:8080");
    expect(res.headers.get("Access-Control-Expose-Headers")).toMatch(/x-request-id/);
    expect(res.headers.get("Access-Control-Max-Age")).toBe("86400");
  });

  it("contact returns honest 503 when Resend is missing", async () => {
    const res = await worker.fetch(
      req("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Jane Doe",
          email: "jane@example.com",
          subject: "Help",
          message: "I need advice about knee osteoarthritis exercises.",
        }),
      }),
      {} as Env,
    );
    expect(res.status).toBe(503);
    const body = await jsonOf(res);
    expect(body.ok).toBe(false);
    expect(body.code).toBe("not_configured");
    expect(body.mailtoSuggested).toBe(true);
    expect(body.requestId).toBeTruthy();
  });

  it("contact validates email and rejects wrong content-type", async () => {
    const badEmail = await worker.fetch(
      req("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Jane",
          email: "not-an-email",
          message: "Long enough message here for validation.",
        }),
      }),
      {} as Env,
    );
    expect(badEmail.status).toBe(400);
    expect((await jsonOf(badEmail)).code).toBe("invalid_email");

    const badCt = await worker.fetch(
      req("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: "nope",
      }),
      {} as Env,
    );
    expect(badCt.status).toBe(400);
    expect((await jsonOf(badCt)).code).toBe("bad_request");
  });

  it("appointment requires YYYY-MM-DD preferredDate", async () => {
    const res = await worker.fetch(
      req("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Jane",
          email: "jane@example.com",
          appointmentType: "Physio advice",
          preferredDate: "tomorrow",
          preferredTime: "10:00",
        }),
      }),
      {} as Env,
    );
    expect(res.status).toBe(400);
    expect((await jsonOf(res)).code).toBe("invalid_date");
  });

  it("rejects oversized bodies with 413", async () => {
    const res = await worker.fetch(
      req("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": String(70_000),
        },
        body: "{}",
      }),
      {} as Env,
    );
    expect(res.status).toBe(413);
    expect((await jsonOf(res)).code).toBe("payload_too_large");
  });

  it("chat rejects overlong messages and returns 503 when AI missing", async () => {
    const tooLong = await worker.fetch(
      req("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "x".repeat(MAX_CHAT_MESSAGE_CHARS + 1) }),
      }),
      {} as Env,
    );
    expect(tooLong.status).toBe(400);
    expect((await jsonOf(tooLong)).code).toBe("message_too_long");

    const noAi = await worker.fetch(
      req("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Safe exercises for OA?" }),
      }),
      {} as Env,
    );
    expect(noAi.status).toBe(503);
    expect((await jsonOf(noAi)).code).toBe("not_configured");
  });

  it("indexnow is 503 without INDEXNOW_KEY and does not leak internals", async () => {
    const res = await worker.fetch(
      req("/api/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "x" }),
      }),
      {} as Env,
    );
    expect(res.status).toBe(503);
    const body = await jsonOf(res);
    expect(body.code).toBe("not_configured");
    expect(JSON.stringify(body)).not.toMatch(/c98cc1e7/);
  });

  it("search GET is cacheable and includes requestId", async () => {
    const res = await worker.fetch(req("/api/search?q=pip"), {} as Env);
    expect(res.status).toBe(200);
    expect(res.headers.get("Cache-Control")).toMatch(/max-age=300/);
    const body = await jsonOf(res);
    expect(body.ok).toBe(true);
    expect(body.requestId).toBeTruthy();
  });

  it("keeps UK-safe chat prompt markers", () => {
    expect(SYSTEM_PROMPT).toMatch(/1218461/);
    expect(SYSTEM_PROMPT).toMatch(/PH128483/);
    expect(SYSTEM_PROMPT).toMatch(/independent/i);
    expect(SYSTEM_PROMPT).toMatch(/NEVER prescribe/i);
  });
});
