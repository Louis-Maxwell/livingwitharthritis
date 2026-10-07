import { beforeEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { trackDonationComplete, trackNewsletterSignup } from "@/lib/analytics";

describe("GA4 conversion events", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
    localStorage.setItem("cookie-consent", "accepted");
    window.gtag = vi.fn() as typeof window.gtag;
  });

  it("fires one confirmed newsletter_signup without duplicate lead conversions", () => {
    trackNewsletterSignup();
    const names = vi.mocked(window.gtag as (...args: unknown[]) => void).mock.calls.map(
      (c) => c[1],
    );
    expect(names).not.toContain("sign_up");
    expect(names).not.toContain("generate_lead");
    expect(names).toContain("newsletter_signup");
  });

  it("fires one purchase for a trusted confirmed donation", () => {
    trackDonationComplete({
      transactionId: "txn_test",
      amount: 50,
      donationType: "one-time",
    });
    const names = vi.mocked(window.gtag as (...args: unknown[]) => void).mock.calls.map(
      (c) => c[1],
    );
    expect(names).not.toContain("donate");
    expect(names).toContain("purchase");
  });
});

describe("GA4 measurement ID", () => {
  it("ships only G-ZLLSD3PXZ9 as the measurement ID", () => {
    const html = readFileSync(resolve(process.cwd(), "index.html"), "utf8");
    const app = readFileSync(resolve(process.cwd(), "src/App.tsx"), "utf8");
    const ids = [
      ...html.matchAll(/G-[A-Z0-9]+/g),
      ...app.matchAll(/G-[A-Z0-9]+/g),
    ].map((m) => m[0]);
    expect(new Set(ids)).toEqual(new Set(["G-ZLLSD3PXZ9"]));
    expect(html).toContain("www.googletagmanager.com");
    // GA4 regional collection hosts (e.g. region1.google-analytics.com) are
    // allowed by the CSP wildcard; csp-policy.test.ts checks the match.
    expect(html).toContain("https://*.google-analytics.com");
  });
});
