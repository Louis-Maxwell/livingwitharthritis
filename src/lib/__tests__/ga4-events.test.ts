import { beforeEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { trackDonationComplete, trackNewsletterSignup } from "@/lib/analytics";

describe("GA4 conversion events", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    window.gtag = vi.fn() as typeof window.gtag;
  });

  it("fires sign_up and generate_lead on newsletter signup", () => {
    trackNewsletterSignup();
    const names = vi.mocked(window.gtag as (...args: unknown[]) => void).mock.calls.map(
      (c) => c[1],
    );
    expect(names).toContain("sign_up");
    expect(names).toContain("generate_lead");
    expect(names).toContain("newsletter_signup");
  });

  it("fires donate and purchase on donation complete", () => {
    trackDonationComplete({
      transactionId: "txn_test",
      amount: 50,
      donationType: "one-time",
    });
    const names = vi.mocked(window.gtag as (...args: unknown[]) => void).mock.calls.map(
      (c) => c[1],
    );
    expect(names).toContain("donate");
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
    expect(html).toContain("region1.google-analytics.com");
  });
});
