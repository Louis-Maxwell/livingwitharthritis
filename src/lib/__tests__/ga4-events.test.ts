import { beforeEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { trackDonationComplete, trackNewsletterSignup, trackContactSubmit } from "@/lib/analytics";

describe("GA4 conversion events", () => {
  beforeEach(() => {
    localStorage.setItem("lwa_cv3", JSON.stringify({ a: true }));
    vi.restoreAllMocks();
    window.gtag = vi.fn() as typeof window.gtag;
  });

  it("emits only generate_lead for one confirmed contact completion", () => {
    trackContactSubmit({ topic: "general" });
    expect(vi.mocked(window.gtag!).mock.calls.map(call => call[1])).toEqual(["generate_lead"]);
  });

  it("emits only sign_up for one newsletter completion", () => {
    trackNewsletterSignup();
    const names = vi.mocked(window.gtag as (...args: unknown[]) => void).mock.calls.map(
      (c) => c[1],
    );
    expect(names).toEqual(["sign_up"]);
  });

  it("emits only purchase for one donation completion", () => {
    trackDonationComplete({
      transactionId: "txn_test",
      amount: 50,
      donationType: "one-time",
    });
    const names = vi.mocked(window.gtag as (...args: unknown[]) => void).mock.calls.map(
      (c) => c[1],
    );
    expect(names).toEqual(["purchase"]);
    expect(vi.mocked(window.gtag!).mock.calls[0][2]).toMatchObject({ transaction_id: "txn_test", value: 50, currency: "GBP" });
  });
});

describe("GA4 measurement ID", () => {
  it("ships only G-ZLLSD3PXZ9 as the measurement ID", () => {
    const html = readFileSync(resolve(process.cwd(), "index.html"), "utf8");
    const app = readFileSync(resolve(process.cwd(), "src/App.tsx"), "utf8");
    const loader = readFileSync(resolve(process.cwd(), "public/security/analytics-consent.js"), "utf8");
    const hook = readFileSync(resolve(process.cwd(), "src/hooks/useAnalyticsPageView.ts"), "utf8");
    const ids = [
      ...html.matchAll(/G-[A-Z0-9]+/g),
      ...app.matchAll(/G-[A-Z0-9]+/g),
      ...loader.matchAll(/G-[A-Z0-9]+/g),
    ].map((m) => m[0]);
    expect(new Set(ids)).toEqual(new Set(["G-ZLLSD3PXZ9"]));
    expect(loader.match(/G-ZLLSD3PXZ9/g)).toHaveLength(1);
    expect(hook).not.toMatch(/G-[A-Z0-9]+/);
    expect(hook).toContain("send_to: window.__LWA_GA4_ID__");
    expect(loader).toContain("Object.defineProperty(window, '__LWA_GA4_ID__'");
    expect(html).toContain("www.googletagmanager.com");
    expect(html).toContain('src="/security/analytics-consent.js"');
    expect(loader).toContain("www.googletagmanager.com/gtag/js");
    expect(loader).toContain("cookie-consent-accepted");
    expect(loader).toContain("send_page_view: false");
    // GA4 regional collection hosts (e.g. region1.google-analytics.com) are
    // allowed by the CSP wildcard; csp-policy.test.ts checks the match.
    expect(html).toContain("https://*.google-analytics.com");
  });
});
