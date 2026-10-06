import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  installErrorReporting,
  reportError,
  reportFormFailure,
  resetErrorReportingForTests,
  scrub,
} from "@/lib/errorReporting";

type GtagMock = ReturnType<typeof vi.fn<(...args: unknown[]) => void>>;
const setGtag = (fn: GtagMock | undefined) => {
  (window as unknown as { gtag?: GtagMock }).gtag = fn;
};

describe("errorReporting", () => {
  let gtag: GtagMock;

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("cookie-consent", "accepted");
    resetErrorReportingForTests();
    gtag = vi.fn<(...args: unknown[]) => void>();
    setGtag(gtag);
  });

  afterEach(() => {
    setGtag(undefined);
  });

  it("sends a GA4 exception event with kind, source and page", () => {
    reportFormFailure("newsletter", "FormSubmit HTTP 500");
    expect(gtag).toHaveBeenCalledWith("event", "exception", {
      description: "form_submit_failed",
      fatal: false,
      error_kind: "form_submit_failed",
      error_source: "newsletter",
      page_path: window.location.pathname,
    });
  });

  it("sends nothing without analytics consent (no gtag)", () => {
    setGtag(undefined);
    expect(() => reportError("js_error", new Error("boom"))).not.toThrow();
  });

  it("deduplicates identical reports and caps reports per page", () => {
    reportError("js_error", new Error("same"));
    reportError("js_error", new Error("same"));
    expect(gtag).toHaveBeenCalledTimes(1);
    for (let i = 0; i < 40; i++) reportError("js_error", new Error(`distinct ${i}`));
    expect(gtag.mock.calls.length).toBeLessThanOrEqual(20);
  });

  it("scrubs emails, phone numbers and query strings, and truncates to 100 characters", () => {
    expect(scrub("failed for jo@example.com on 07760 512 084 at /x?token=abc")).toBe(
      "failed for [email] on [number] at /x?…",
    );
    reportError("js_error", new Error("x".repeat(300)));
    const params = gtag.mock.calls[0][2] as { description: string };
    expect(params.description.length).toBeLessThanOrEqual(100);
  });

  it("reports failed fetch calls but not HEAD probes or aborted requests", async () => {
    const responses = [
      new Response("nope", { status: 503 }),
      new Response("", { status: 404 }),
    ];
    const fake = vi.fn(async () => responses.shift() as Response);
    const originalFetch = window.fetch;
    window.fetch = fake as unknown as typeof window.fetch;
    installErrorReporting();

    await window.fetch("https://formsubmit.co/ajax/x", { method: "POST" });
    await window.fetch("/audio/guide.mp3", { method: "HEAD" });
    expect(gtag).toHaveBeenCalledTimes(1);
    expect((gtag.mock.calls[0][2] as { description: string }).description).toBe(
      "fetch_failed",
    );

    window.fetch = originalFetch;
  });
});
