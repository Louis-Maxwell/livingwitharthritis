import { describe, it, expect, vi, beforeEach } from "vitest";
import { postFormApi } from "../formApi";

describe("postFormApi", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("treats only 2xx ok as success", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(JSON.stringify({ ok: true, requestId: "abc" }), {
          status: 200,
          headers: { "Content-Type": "application/json", "x-request-id": "abc" },
        }),
      ),
    );
    const ok = await postFormApi("/api/contact", { name: "A" });
    expect(ok).toEqual({ ok: true, requestId: "abc" });
  });

  it("surfaces 503 not_configured clearly and suggests mailto", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(
          JSON.stringify({
            ok: false,
            code: "not_configured",
            error: "Email delivery is not configured on the server yet (missing RESEND_API_KEY).",
            mailtoSuggested: true,
            requestId: "r1",
          }),
          { status: 503, headers: { "Content-Type": "application/json" } },
        ),
      ),
    );
    const res = await postFormApi("/api/contact", { name: "A" });
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.code).toBe("not_configured");
      expect(res.mailtoSuggested).toBe(true);
      expect(res.error.toLowerCase()).toMatch(/not configured|unavailable|email/);
    }
  });

  it("does not treat non-2xx as success even if body says ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(JSON.stringify({ ok: true }), {
          status: 502,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
    const res = await postFormApi("/api/appointment", { name: "A" });
    expect(res.ok).toBe(false);
  });
});
