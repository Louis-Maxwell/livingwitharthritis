import { describe, expect, it } from "vitest";
import {
  sanitizeEmail,
  sanitizeInput,
  sanitizePhone,
  isHoneypotFilled,
  stripHtml,
} from "../sanitize";

describe("sanitize", () => {
  it("strips html and control chars", () => {
    expect(stripHtml("<b>hi</b>")).toBe("hi");
    expect(sanitizeInput("  Hello <script>x</script>  ", 20)).toBe("Hello x");
  });

  it("validates email", () => {
    expect(sanitizeEmail("A@B.com")).toBe("a@b.com");
    expect(sanitizeEmail("not-an-email")).toBeNull();
  });

  it("sanitizes phone", () => {
    expect(sanitizePhone("+44 (0)1234-567")).toBe("+44 (0)1234-567");
    expect(sanitizePhone("abc123")).toBe("123");
  });

  it("detects honeypot", () => {
    expect(isHoneypotFilled({ website: "http://spam" })).toBe(true);
    expect(isHoneypotFilled({ website: "  " })).toBe(false);
    expect(isHoneypotFilled({ email: "a@b.com" })).toBe(false);
  });
});
