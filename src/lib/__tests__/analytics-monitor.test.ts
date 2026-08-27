import { describe, expect, it, beforeEach, vi } from "vitest";
import { getAnalyticsStatus, isGAEnabled, isGSCVerified, getConsentStatus } from "@/lib/analytics-monitor";

describe("analytics-monitor", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  describe("getAnalyticsStatus", () => {
    it("returns analytics status object", () => {
      const status = getAnalyticsStatus();
      expect(status).toHaveProperty("gaEnabled");
      expect(status).toHaveProperty("gscVerified");
      expect(status).toHaveProperty("consentStatus");
      expect(typeof status.gaEnabled).toBe("boolean");
    });
  });

  describe("isGAEnabled", () => {
    it("returns boolean", () => {
      const result = isGAEnabled();
      expect(typeof result).toBe("boolean");
    });
  });

  describe("isGSCVerified", () => {
    it("checks for GSC meta tag", () => {
      const result = isGSCVerified();
      expect(typeof result).toBe("boolean");
    });

    it("returns false when document is undefined", () => {
      const originalDocument = global.document;
      // @ts-expect-error - testing undefined document
      global.document = undefined;
      const result = isGSCVerified();
      expect(result).toBe(false);
      global.document = originalDocument;
    });
  });

  describe("getConsentStatus", () => {
    it("returns one of valid consent statuses", () => {
      const result = getConsentStatus();
      expect(["accepted", "rejected", "pending"]).toContain(result);
    });
  });
});
