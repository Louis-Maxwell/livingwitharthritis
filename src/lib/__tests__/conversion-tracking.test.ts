import { describe, expect, it } from "vitest";
import { calculateFunnelCompletion } from "@/lib/conversion-tracking";

describe("conversion-tracking", () => {
  describe("calculateFunnelCompletion", () => {
    it("calculates completion rate correctly", () => {
      const sessionData = [
        { event: "page_view", value: 1 },
        { event: "page_view", value: 1 },
        { event: "page_view", value: 1 },
        { event: "form_submit", value: 1 },
      ];

      const result = calculateFunnelCompletion("page_view", "form_submit", sessionData);
      expect(result.completion).toBeCloseTo(33.33, 1);
    });

    it("returns 0 completion when no start events", () => {
      const sessionData = [
        { event: "form_submit", value: 1 },
      ];

      const result = calculateFunnelCompletion("page_view", "form_submit", sessionData);
      expect(result.completion).toBe(0);
    });

    it("returns 100% completion when all events convert", () => {
      const sessionData = [
        { event: "page_view", value: 1 },
        { event: "form_submit", value: 1 },
      ];

      const result = calculateFunnelCompletion("page_view", "form_submit", sessionData);
      expect(result.completion).toBe(100);
    });

    it("calculates dropoff correctly", () => {
      const sessionData = [
        { event: "page_view", value: 1 },
        { event: "page_view", value: 1 },
        { event: "form_submit", value: 1 },
      ];

      const result = calculateFunnelCompletion("page_view", "form_submit", sessionData);
      expect(result.dropoff).toBeCloseTo(66.67, 1);
    });
  });
});
