import { describe, it, expect, beforeEach } from "vitest";

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

import {
  subscribeNewsletter,
  submitContactInquiry,
  submitBlogComment,
} from "../backendSubmit";

describe("backendSubmit mailto-only", () => {
  beforeEach(() => {
    hrefs.length = 0;
  });

  it("opens mailto for newsletter signup", async () => {
    const result = await subscribeNewsletter({ email: "jane@example.com" });
    expect(result.ok).toBe(false);
    expect(result.via).toBe("mailto");
    expect(hrefs.some((h) => h.startsWith("mailto:"))).toBe(true);
  });

  it("opens mailto for contact inquiry", async () => {
    const result = await submitContactInquiry({
      name: "Jane",
      email: "jane@example.com",
      subject: "General enquiry",
      message: "Please help with knee osteoarthritis exercises.",
    });
    expect(result.ok).toBe(false);
    expect(result.via).toBe("mailto");
    expect(hrefs.some((h) => h.startsWith("mailto:"))).toBe(true);
  });

  it("opens mailto for blog comment", async () => {
    const result = await submitBlogComment({
      slug: "knee-oa",
      author_name: "Jane",
      content: "This helped me.",
    });
    expect(result.ok).toBe(false);
    expect(result.via).toBe("mailto");
    expect(hrefs.some((h) => h.startsWith("mailto:"))).toBe(true);
  });
});
