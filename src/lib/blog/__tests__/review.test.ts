import { describe, expect, it } from "vitest";
import { blogReviewSchemaFields, isDisclosedSelfReview, isVerifiedMaxwellReviewer } from "@/lib/blog/review";

const CREDS = "First Contact Practitioner, HCPC PH128483, CSP member";

describe("isVerifiedMaxwellReviewer", () => {
  it("matches the full name stored on posts (regression: exact 'Maxwell' never matched)", () => {
    expect(isVerifiedMaxwellReviewer("Louis Maxwell", CREDS)).toBe(true);
  });
  it("matches surname-only, case and whitespace variants", () => {
    expect(isVerifiedMaxwellReviewer("Maxwell", CREDS)).toBe(true);
    expect(isVerifiedMaxwellReviewer("  louis   MAXWELL ", CREDS)).toBe(true);
  });
  it("requires the HCPC number and a Maxwell name", () => {
    expect(isVerifiedMaxwellReviewer("Louis Maxwell", "Physiotherapist")).toBe(false);
    expect(isVerifiedMaxwellReviewer("Sarah Jennings", CREDS)).toBe(false);
    expect(isVerifiedMaxwellReviewer(null, null)).toBe(false);
  });
  it("treats the same author and reviewer as a disclosed self-review", () => {
    expect(isDisclosedSelfReview("Louis Maxwell", "Louis Maxwell")).toBe(true);
    expect(isDisclosedSelfReview("Maxwell", "Louis Maxwell")).toBe(true);
    expect(isDisclosedSelfReview("Louis Maxwell", "Another clinician")).toBe(false);
  });
  it("yields reviewedBy JSON-LD for a reviewed guide", () => {
    const person = { "@type": "Person", name: "Louis Maxwell" };
    expect(blogReviewSchemaFields({ reviewStatus: "reviewed", reviewedBy: person, lastReviewed: "2026-10-26" }))
      .toEqual({ reviewedBy: person, lastReviewed: "2026-10-26" });
  });
});
