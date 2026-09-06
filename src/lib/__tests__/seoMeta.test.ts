import { describe, expect, it } from "vitest";
import { enforceTitle, enforceDescription, assertMetaLengths } from "@/lib/seoMeta";

describe("seoMeta", () => {
  describe("enforceTitle", () => {
    it("drops branding before truncating the unique page title", () => {
      const bristol = enforceTitle(
        "Osteoarthritis Support in Bristol",
        { route: "/arthritis-support/bristol/osteoarthritis" },
      );
      const cardiff = enforceTitle(
        "Osteoarthritis Support in Cardiff",
        { route: "/arthritis-support/cardiff/osteoarthritis" },
      );

      expect(bristol).toBe("Osteoarthritis Support in Bristol | Living With Arthritis UK");
      expect(cardiff).toBe("Osteoarthritis Support in Cardiff | Living With Arthritis UK");
      expect(bristol).not.toBe(cardiff);
      expect(bristol.length).toBeLessThanOrEqual(60);
    });

    it("includes site suffix when includeSiteName is true", () => {
      const result = enforceTitle("Home", { includeSiteName: true });
      expect(result).toContain("Living With Arthritis UK");
    });

    it("excludes site suffix when includeSiteName is false", () => {
      const result = enforceTitle("Home", { includeSiteName: false });
      expect(result).not.toContain("Living With Arthritis UK");
    });

    it("handles empty title gracefully", () => {
      const result = enforceTitle("", { includeSiteName: false });
      expect(result).toBe("");
    });

    it("never exceeds 60 characters", () => {
      const longTitle = "A very long arthritis management guide with multiple topics";
      const result = enforceTitle(longTitle, { includeSiteName: true });
      expect(result.length).toBeLessThanOrEqual(60);
    });

    it("uses short brand when full suffix does not fit", () => {
      const result = enforceTitle("Comprehensive Osteoarthritis Support in Bristol", {
        includeSiteName: true,
      });
      expect(result).toBe("Comprehensive Osteoarthritis Support in Bristol | LWA");
      expect(result.length).toBeLessThanOrEqual(60);
    });
  });

  describe("enforceDescription", () => {
    it("keeps descriptions between 120-160 chars", () => {
      const desc = "A comprehensive guide to managing arthritis symptoms and improving quality of life with practical exercises and medical advice.";
      const result = enforceDescription(desc);
      expect(result.length).toBeLessThanOrEqual(160);
      expect(result.length).toBeGreaterThanOrEqual(120);
    });

    it("truncates descriptions over 160 chars on word boundary", () => {
      const longDesc = "This is a very long description that will definitely exceed the maximum length allowed for search engine result previews and therefore must be truncated on a word boundary for SERP safety while remaining readable for users scanning results.";
      const result = enforceDescription(longDesc);
      expect(result.length).toBeLessThanOrEqual(160);
      expect(result.endsWith("…")).toBe(true);
    });

    it("normalizes whitespace", () => {
      const desc = "Arthritis  management   with   multiple   spaces";
      const result = enforceDescription(desc);
      expect(result).toContain("Arthritis management with multiple spaces");
    });

    it("handles empty description", () => {
      const result = enforceDescription("");
      expect(result).toBe("");
    });
  });

  describe("assertMetaLengths", () => {
    it("validates title and description lengths without throwing", () => {
      expect(() => {
        assertMetaLengths("/test", "Short title", "A comprehensive description that is between 120 and 160 characters long.");
      }).not.toThrow();
    });
  });
});
