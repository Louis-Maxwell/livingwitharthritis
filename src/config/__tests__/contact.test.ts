import { describe, it, expect } from "vitest";
import {
  CONTACT_EMAILS,
  CONTACT_PHONE,
  CONTACT_PHONE_E164,
  CONTACT_PHONE_INTL,
  CONTACT_PHONE_TEL,
  mailto,
} from "../contact";

describe("contact config (single source of truth)", () => {
  it("exposes the canonical info address", () => {
    expect(CONTACT_EMAILS.info).toBe("info@livingwitharthritis.org.uk");
  });

  it("locks the public helpline digits (07760 512 084 / +44 7760 512084)", () => {
    expect(CONTACT_PHONE).toBe("07760 512 084");
    expect(CONTACT_PHONE_TEL).toBe("07760512084");
    expect(CONTACT_PHONE_INTL).toBe("+44 7760 512084");
    expect(CONTACT_PHONE_E164).toBe("+447760512084");
    expect(CONTACT_PHONE_E164.replace(/\D/g, "")).toBe("447760512084");
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
