import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { analyticsUrl } from "../analytics-url";
import { hasAnalyticsConsent, setUserProperties, trackAppError, trackEvent } from "../analytics";

beforeEach(() => {
  localStorage.clear();
  window.history.replaceState({}, "", "/guides/example?private=hidden#hidden");
  document.title = "Example guide";
  window.gtag = vi.fn();
  window.dataLayer = [];
});
afterEach(() => { vi.restoreAllMocks(); localStorage.clear(); delete window.gtag; delete window.dataLayer; });
const allow = () => localStorage.setItem("lwa_cv3", JSON.stringify({ a: true }));
const sent = () => vi.mocked(window.gtag!).mock.calls;

describe("central analytics consent and privacy boundary", () => {
  it.each([null, "rejected", "essential", "false"])("does not dispatch or queue without affirmative consent (%s)", legacy => {
    if (legacy !== null) localStorage.setItem("cookie-consent", legacy);
    expect(trackEvent("resource_download", { file_name: "example.pdf" })).toBe(false);
    expect(sent()).toEqual([]);
    expect(window.dataLayer).toEqual([]);
  });
  it("accepts the existing legacy opt-in only without a structured choice", () => {
    localStorage.setItem("cookie-consent", "accepted");
    expect(hasAnalyticsConsent()).toBe(true);
    expect(trackEvent("example_click")).toBe(true);
  });
  it.each(["{}", "{\"a\":false}", "{\"a\":\"true\"}", "broken", "null"])("a structured non-opt-in overrides a stale legacy opt-in: %s", choice => {
    localStorage.setItem("cookie-consent", "accepted");
    localStorage.setItem("lwa_cv3", choice);
    expect(hasAnalyticsConsent()).toBe(false);
    expect(trackEvent("example_click")).toBe(false);
  });
  it("fails closed when storage cannot be read", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("Unavailable"); });
    expect(hasAnalyticsConsent()).toBe(false);
    expect(() => trackEvent("example_click")).not.toThrow();
    expect(sent()).toEqual([]);
  });
  it("does not queue or throw when the sender is unavailable or blocked", () => {
    allow(); delete window.gtag;
    expect(trackEvent("example_click")).toBe(false);
    expect(window.dataLayer).toEqual([]);
    window.gtag = vi.fn(() => { throw new Error("Blocked"); });
    expect(trackEvent("example_click")).toBe(false);
  });
  it("stops immediately on consent withdrawal", () => {
    allow(); expect(trackEvent("first_click")).toBe(true);
    localStorage.setItem("lwa_cv3", JSON.stringify({ a: false }));
    expect(trackEvent("second_click")).toBe(false);
    expect(sent()).toHaveLength(1);
  });
  it("cleans public URLs and rejects caller page-context overrides and personal input keys", () => {
    allow();
    trackEvent("example_click", {
      target_url: "https://example.org/guide?email=hidden#hidden", email: "private@example.test", query: "private health text",
      page_location: "https://example.org/?hidden=1", page_title: "override", nested: { phone: "07700900123", safe: "public label" },
    });
    expect(sent()[0]).toEqual(["event", "example_click", {
      target_url: "https://example.org/guide", nested: { safe: "public label" },
      page_location: `${window.location.origin}/guides/example`, page_title: "Example guide",
    }]);
    expect(JSON.stringify(sent())).not.toMatch(/hidden|private|override|07700900123/);
  });
  it("keeps public social handles but removes contact identifiers in URL paths", () => {
    expect(analyticsUrl("https://www.youtube.com/@public-handle?x=hidden")).toBe("https://www.youtube.com/@public-handle");
    expect(analyticsUrl("https://example.org/contact/private%40example.test")).toBe("https://example.org/");
    expect(analyticsUrl("https://example.org/contact/07700900123")).toBe("https://example.org/");
  });
  it.each(["/search", "/search/", "/Search"])("does not leak typed search text through a dynamic page title on %s", path => {
    allow(); window.history.replaceState({}, "", `${path}?q=private+health+text`); document.title = "private health text";
    trackEvent("search", { query: "private health text", result_count: 3 });
    expect(sent()[0]).toEqual(["event", "site_search", {
      result_count: 3, zero_results: false, page_location: `${window.location.origin}${path}`, page_title: "Search | Living With Arthritis",
    }]);
  });
  it.each([
    ["donation_click", "donate_click", { method: "gofundme", amount: 5, frequency: "one-time" }, { destination: "gofundme", tier: 5, frequency: "single", interaction_type: "intent" }],
    ["file_download", "resource_download", { file_name: "example.pdf", file_extension: "pdf" }, { file_name: "example.pdf", format: "pdf", guide_title: "example.pdf" }],
    ["phone_click", "helpline_engagement", { phone: "07700900123" }, { channel: "phone", interaction_type: "intent" }],
    ["email_click", "helpline_engagement", { email: "private@example.test" }, { channel: "email", interaction_type: "intent" }],
  ])("emits only the canonical event for %s", (legacy, canonical, input, expected) => {
    allow(); trackEvent(legacy, input);
    expect(sent()).toHaveLength(1);
    expect(sent()[0]).toEqual(["event", canonical, expect.objectContaining(expected)]);
  });
  it("does not send unknown donation frequency or raw error messages", () => {
    allow(); trackEvent("donate_click", { frequency: "unspecified" });
    expect(sent()[0][2]).not.toHaveProperty("frequency");
    trackAppError("js_error", "a visitor's private form contents");
    expect(JSON.stringify(sent())).not.toContain("private form");
    expect(sent()[1][2]).not.toHaveProperty("error_message");
  });
  it("does not create persistent inferred condition profiles or identifiers", () => {
    allow(); setUserProperties({ condition_type: "example-condition", user_id: "private", content_type: "guide" });
    expect(sent()).toEqual([["set", { content_type: "guide" }]]);
  });
  it("ignores invalid event names without throwing", () => {
    allow(); expect(trackEvent("unsafe event name")).toBe(false); expect(sent()).toEqual([]);
  });
});
