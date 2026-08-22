import { describe, expect, it } from "vitest";
import { enforceTitle } from "@/lib/seoMeta";

describe("enforceTitle", () => {
  it("keeps unique page titles when branding still fits the 60-character limit", () => {
    const bristol = enforceTitle(
      "Osteoarthritis Support in Bristol",
      { route: "/arthritis-support/bristol/osteoarthritis" },
    );
    const cardiff = enforceTitle(
      "Osteoarthritis Support in Cardiff",
      { route: "/arthritis-support/cardiff/osteoarthritis" },
    );

    expect(bristol).toBe(
      "Osteoarthritis Support in Bristol | Living With Arthritis UK",
    );
    expect(cardiff).toBe(
      "Osteoarthritis Support in Cardiff | Living With Arthritis UK",
    );
    expect(bristol).not.toBe(cardiff);
    expect(bristol.length).toBeLessThanOrEqual(60);
  });
});
