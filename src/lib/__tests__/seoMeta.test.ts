import { describe, expect, it } from "vitest";
import { enforceTitle } from "@/lib/seoMeta";

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

    expect(bristol).toContain("Bristol");
    expect(cardiff).toContain("Cardiff");
    expect(bristol).not.toBe(cardiff);
    expect(bristol.length).toBeLessThanOrEqual(60);
  });
});
