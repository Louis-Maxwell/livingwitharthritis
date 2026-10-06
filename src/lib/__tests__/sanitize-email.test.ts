import { describe, expect, it } from "vitest";
import { sanitizeEmail } from "../sanitize";

describe("sanitizeEmail", () => {
  it("normalizes a valid email", () => {
    expect(sanitizeEmail(" Jane@Example.com ")).toBe("jane@example.com");
  });
  it("rejects header-injection characters, including at the edges", () => {
    for (const email of ["\r\njane@example.com", "jane@example.com\n", "jane@example.com\0", "jane@example.com\r\nBcc: other@example.com"]) {
      expect(sanitizeEmail(email)).toBeNull();
    }
  });
  it("rejects an overlong address without silently changing its recipient", () => {
    expect(sanitizeEmail("a".repeat(243) + "@example.com")).toBeNull();
  });
  it("rejects malformed addresses", () => {
    expect(sanitizeEmail("invalid")).toBeNull();
    expect(sanitizeEmail("jane@example.com other@example.com")).toBeNull();
  });
});
