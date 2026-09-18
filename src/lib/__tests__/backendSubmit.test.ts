import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

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
  submitVolunteerEnquiry,
  NEWSLETTER_FORMSUBMIT_URL,
} from "../backendSubmit";

describe("backendSubmit newsletter + mailto", () => {
  beforeEach(() => {
    hrefs.length = 0;
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ success: true }), { status: 200 })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("posts newsletter signup to FormSubmit inbox endpoint", async () => {
    const result = await subscribeNewsletter({
      email: "jane@example.com",
      source: "welcome-sequence",
    });
    expect(result.ok).toBe(true);
    expect(result.via).toBe("formsubmit");
    expect(fetch).toHaveBeenCalledWith(
      NEWSLETTER_FORMSUBMIT_URL,
      expect.objectContaining({ method: "POST" }),
    );
    const body = JSON.parse(
      (fetch as unknown as ReturnType<typeof vi.fn>).mock.calls[0][1].body as string,
    );
    expect(body.email).toBe("jane@example.com");
    expect(body._subject).toContain("Newsletter signup");
    expect(hrefs.some((h) => h.startsWith("mailto:"))).toBe(false);
  });

  it("falls back to mailto when FormSubmit fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("error", { status: 500 })),
    );
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

  it("opens mailto for volunteer enquiry with interest in subject", async () => {
    const result = await submitVolunteerEnquiry({
      name: "Jane",
      email: "jane@example.com",
      area_of_interest: "Helpline support",
      message: "Evenings preferred.",
    });
    expect(result.ok).toBe(false);
    expect(result.via).toBe("mailto");
    const href = hrefs.find((h) => h.startsWith("mailto:")) ?? "";
    expect(href).toContain(encodeURIComponent("Volunteer enquiry: Helpline support"));
    expect(href).toContain(encodeURIComponent("Evenings preferred."));
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
