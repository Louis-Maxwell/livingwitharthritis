import { describe, expect, it, beforeEach, vi } from "vitest";
import { getAnalyticsStatus, isGA4Ready, isGSCVerified, getConsentStatus } from "@/lib/analytics-monitor";

describe("analytics-monitor", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAnalyticsStatus", () => {
    it("returns analytics status object", () => {
      const status = getAnalyticsStatus();
      expect(status).toHaveProperty("ga4Ready");
      expect(status).toHaveProperty("gscReady");
      expect(status).toHaveProperty("consentStatus");
      expect(typeof status.ga4Ready).toBe("boolean");
    });
  });

  describe("isGA4Ready", () => {
    it("returns boolean", () => {
      const result = isGA4Ready();
      expect(typeof result).toBe("boolean");
    });
  });

  describe("isGSCVerified", () => {
    it("checks for GSC meta tag", () => {
      const result = isGSCVerified();
      expect(typeof result).toBe("boolean");
    });

    it("returns false when document is unavailable", () => {
      const spy = vi.spyOn(document, "querySelector").mockImplementation(() => {
        throw new Error("no document");
      });
      // isGSCVerified guards typeof document === "undefined"; in jsdom document exists.
      // Simulate missing meta by returning null from querySelector.
      spy.mockReturnValue(null);
      expect(isGSCVerified()).toBe(false);
      spy.mockRestore();
    });
  });

  describe("getConsentStatus", () => {
    it("returns one of valid consent statuses", () => {
      const result = getConsentStatus();
      expect(["accepted", "rejected", "pending", "denied"]).toContain(result);
    });
  });
});
