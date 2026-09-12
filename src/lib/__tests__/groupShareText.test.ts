import { describe, expect, it } from "vitest";
import { buildGroupShareText } from "../groupShareText";

describe("buildGroupShareText", () => {
  it("builds a title, excerpt and URL for group chats", () => {
    const text = buildGroupShareText(
      "Vitamin D and Arthritis: Why Every UK Patient Should Test",
      "https://livingwitharthritis.org.uk/blog/vitamin-d-and-arthritis",
      "From October to March, the UK sun is too weak to make vitamin D.",
    );
    expect(text).toContain("Vitamin D and Arthritis");
    expect(text).toContain("UK sun");
    expect(text).toContain("https://livingwitharthritis.org.uk/blog/vitamin-d-and-arthritis");
  });

  it("omits a blank excerpt", () => {
    const text = buildGroupShareText("Title", "https://example.com/x", "   ");
    expect(text).toBe("Title\n\nhttps://example.com/x");
  });
});
