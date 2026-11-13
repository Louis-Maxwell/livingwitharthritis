import { describe, expect, it } from "vitest";
// @ts-expect-error untyped build-script module
import { reviewRecordFor, nextReviewDate } from "../../../scripts/lib/review-records.mjs";

describe("static clinical review records", () => {
  it("uses 2026-11-05 for osteoarthritis", () => {
    expect(reviewRecordFor("/conditions/osteoarthritis")?.lastReviewed).toBe("2026-11-05");
  });
  it("gives conflicting-date condition pages nothing", () => {
    for (const r of ["/conditions/hip-arthritis", "/conditions/rheumatoid-arthritis",
      "/conditions/knee-arthritis", "/conditions/hand-arthritis", "/conditions/gout"]) {
      expect(reviewRecordFor(r)).toBeNull();
    }
  });
  it("gives exercise matrix pages nothing", () => {
    expect(reviewRecordFor("/exercises/walking-for-knee-arthritis")).toBeNull();
  });
  it("next review is 12 months after last review", () => {
    expect(nextReviewDate("2026-11-05")).toBe("2027-11-05");
  });
});
