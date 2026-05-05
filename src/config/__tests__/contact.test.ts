import { describe, it, expect } from "vitest";
import { CONTACT_EMAILS, mailto } from "../contact";

describe("contact config (single source of truth)", () => {
  it("exposes the canonical info address", () => {
    expect(CONTACT_EMAILS.info).toBe("info@livingwitharthritis.org.uk");
  });

  it("builds mailto links with optional subject", () => {
    expect(mailto()).toBe("mailto:info@livingwitharthritis.org.uk");
    expect(mailto("press", "Hello there")).toBe(
      "mailto:press@livingwitharthritis.org.uk?subject=Hello%20there",
    );
  });

  it("keeps every address on the org domain", () => {
    for (const value of Object.values(CONTACT_EMAILS)) {
      expect(value.endsWith("@livingwitharthritis.org.uk")).toBe(true);
    }
  });
});
