import { describe, it, expect, vi, beforeEach } from "vitest";
import { submitViaMailto } from "../formApi";

const hrefs: string[] = [];
Object.defineProperty(window, "location", {
  configurable: true,
  value: {
    set href(v: string) {
      hrefs.push(v);
    },
    get href() {
      return hrefs.at(-1) ?? "";
    },
  },
});

describe("submitViaMailto", () => {
  beforeEach(() => {
    hrefs.length = 0;
  });

  it("opens mailto and never reports ok success", () => {
    const res = submitViaMailto({
      subject: "Hello",
      body: "Name: A\nEmail: a@example.com\n\nMessage",
    });
    expect(res.ok).toBe(false);
    expect(res.mailtoOpened).toBe(true);
    expect(res.code).toBe("mailto_only");
    expect(res.error.toLowerCase()).toMatch(/email app|press send|not submitted automatically/);
    expect(hrefs.some((h) => h.startsWith("mailto:info@livingwitharthritis.org.uk"))).toBe(true);
  });
});
