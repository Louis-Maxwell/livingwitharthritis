import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  installErrorReporting,
  isBenignBrowserError,
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
      description: "FormSubmit HTTP 500",
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

  it("filters ResizeObserver and extension errors", () => {
    expect(isBenignBrowserError("ResizeObserver loop limit exceeded")).toBe(true);
    expect(isBenignBrowserError(new Error("broken"), "chrome-extension://abc/file.js")).toBe(true);
    reportError("js_error", "ResizeObserver loop completed with undelivered notifications.");
    reportError("js_error", new Error("broken"), { source: "moz-extension://abc/file.js" });
    expect(gtag).not.toHaveBeenCalled();
  });

  it("deduplicates the same failure across React and window handlers", () => {
    const error = new Error("render failed");
    reportError("react_render", error, { fatal: true });
    reportError("js_error", error, { source: "/assets/app.js" });
    expect(gtag).toHaveBeenCalledTimes(1);
    expect(gtag.mock.calls[0][2]).toMatchObject({ fatal: true, error_kind: "react_render" });
  });

  it("does not exhaust the reporting budget before consent", () => {
    setGtag(undefined);
    for (let i = 0; i < 30; i++) reportError("js_error", new Error(`before ${i}`));
    setGtag(gtag);
    reportError("js_error", new Error("after consent"));
    expect(gtag).toHaveBeenCalledTimes(1);
  });

  it("reports unexpected same-origin server failures, not ordinary 4xx or third-party responses", async () => {
    const responses = [
      new Response("nope", { status: 503 }),
      new Response("", { status: 404 }),
      new Response("nope", { status: 503 }),
    ];
    const fake = vi.fn(async () => responses.shift() as Response);
    const originalFetch = window.fetch;
    window.fetch = fake as unknown as typeof window.fetch;
    installErrorReporting();

    await window.fetch("/api/failure", { method: "POST" });
    await window.fetch("/audio/guide.mp3");
    await window.fetch("https://formsubmit.co/ajax/x", { method: "POST" });
    expect(gtag).toHaveBeenCalledTimes(1);
    expect((gtag.mock.calls[0][2] as { description: string }).description).toBe(
      `HTTP 503 POST ${window.location.host}/api/failure`,
    );

    window.fetch = originalFetch;
  });
});
