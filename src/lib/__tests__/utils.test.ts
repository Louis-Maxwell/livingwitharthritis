import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("utils", () => {
  describe("cn - className merger", () => {
    it("merges multiple class names", () => {
      const result = cn("px-2", "py-1");
      expect(result).toContain("px-2");
      expect(result).toContain("py-1");
    });

    it("handles undefined and null values", () => {
      const result = cn("px-2", undefined, "py-1", null);
      expect(result).toContain("px-2");
      expect(result).toContain("py-1");
    });

    it("handles conditional classes", () => {
      const isActive = true;
      const result = cn("base-class", isActive && "active-class");
      expect(result).toContain("base-class");
      expect(result).toContain("active-class");
    });

    it("handles empty input", () => {
      const result = cn("");
      expect(typeof result).toBe("string");
    });

    it("merges tailwind classes without conflicts", () => {
      const result = cn("px-2", "px-4"); // Later class should win
      expect(result).toContain("px-4");
    });
  });
});
