import { describe, it, expect, vi, beforeEach } from "vitest";

const insertMock = vi.fn();
const fromMock = vi.fn(() => ({ insert: insertMock }));

vi.mock("@/integrations/supabase/client", () => ({
  isSupabaseConfigured: true,
  supabase: { from: (...args: unknown[]) => fromMock(...args) },
}));

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

describe("backendSubmit throw-safety", () => {
  beforeEach(() => {
    hrefs.length = 0;
    insertMock.mockReset();
    fromMock.mockReset();
    fromMock.mockImplementation(() => ({ insert: insertMock }));
  });

  it("falls back to mailto when newsletter insert throws (does not reject)", async () => {
    insertMock.mockRejectedValue(new Error("network down"));
    const result = await subscribeNewsletter({ email: "jane@example.com" });
    expect(result.ok).toBe(false);
    expect(result.via).toBe("mailto");
    expect(hrefs.some((h) => h.startsWith("mailto:"))).toBe(true);
  });

  it("falls back to mailto when contact insert throws (does not reject)", async () => {
    insertMock.mockRejectedValue(new Error("Failed to fetch"));
    const result = await submitContactInquiry({
      name: "Jane",
      email: "jane@example.com",
      subject: "General enquiry",
      message: "Please help with knee osteoarthritis exercises.",
    });
    expect(result.ok).toBe(false);
    expect(result.via).toBe("mailto");
  });

  it("falls back to mailto when blog comment insert throws (does not reject)", async () => {
    insertMock.mockRejectedValue(new TypeError("fetch failed"));
    const result = await submitBlogComment({
      slug: "knee-oa",
      author_name: "Jane",
      content: "This helped me.",
    });
    expect(result.ok).toBe(false);
    expect(result.via).toBe("mailto");
  });

  it("returns supabase success when insert has no error", async () => {
    insertMock.mockResolvedValue({ error: null });
    const result = await subscribeNewsletter({ email: "jane@example.com" });
    expect(result.ok).toBe(true);
    expect(result.via).toBe("supabase");
    expect(hrefs).toHaveLength(0);
  });

  it("treats unique-email 23505 as honest success for newsletter", async () => {
    insertMock.mockResolvedValue({ error: { code: "23505" } });
    const result = await subscribeNewsletter({ email: "jane@example.com" });
    expect(result.ok).toBe(true);
    expect(result.via).toBe("supabase");
    expect(result.message.toLowerCase()).toMatch(/already/);
  });
});
