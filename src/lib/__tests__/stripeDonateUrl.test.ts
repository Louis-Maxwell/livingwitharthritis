import { describe, expect, it } from "vitest";
import { validateStripeDonateUrl } from "../stripeDonateUrl";

describe("validateStripeDonateUrl", () => {
  it("accepts checkout.stripe.com https links", () => {
    const r = validateStripeDonateUrl(
      "https://checkout.stripe.com/c/pay/cs_test_abc",
    );
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.url).toContain("checkout.stripe.com");
  });

  it("accepts buy.stripe.com payment links", () => {
    const r = validateStripeDonateUrl("https://buy.stripe.com/test_abc");
    expect(r.ok).toBe(true);
  });

  it("rejects empty", () => {
    expect(validateStripeDonateUrl("").ok).toBe(false);
    expect(validateStripeDonateUrl(undefined).ok).toBe(false);
  });

  it("rejects non-https", () => {
    expect(validateStripeDonateUrl("http://checkout.stripe.com/x").ok).toBe(
      false,
    );
  });

  it("rejects non-allowlisted hosts", () => {
    expect(validateStripeDonateUrl("https://evil.example/donate").ok).toBe(
      false,
    );
    expect(validateStripeDonateUrl("https://stripe.com/evil").ok).toBe(false);
  });

  it("rejects invalid URLs", () => {
    expect(validateStripeDonateUrl("not a url").ok).toBe(false);
  });
});
