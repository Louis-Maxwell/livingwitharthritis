import { describe, expect, it } from "vitest";
import {
  buildWhatsAppHref,
  buildWhatsAppMessage,
  guideSlugFromPath,
  withWhatsAppUtm,
} from "@/lib/whatsappShare";

const PAGE = "https://livingwitharthritis.org.uk/blog/hip-replacement-recovery-week-by-week";
const TAGGED = `${PAGE}?utm_source=whatsapp&utm_medium=social_share&utm_campaign=guide_action_card`;

describe("WhatsApp share URL", () => {
  it("adds the WhatsApp campaign tags to the shared page URL", () => {
    expect(withWhatsAppUtm(PAGE)).toBe(TAGGED);
  });

  it("replaces rather than duplicates existing tags", () => {
    expect(withWhatsAppUtm(`${PAGE}?utm_source=facebook`)).toBe(TAGGED);
  });

  it("encodes the tagged URL once inside the wa.me text parameter", () => {
    const href = buildWhatsAppHref(buildWhatsAppMessage("Hip recovery", TAGGED, "NHS milestones."));
    const url = new URL(href);
    expect(url.origin + url.pathname).toBe("https://wa.me/");
    expect([...url.searchParams.keys()]).toEqual(["text"]);
    // The UTM separators are encoded, so they belong to the message, not to wa.me.
    expect(href).toContain(encodeURIComponent(TAGGED));
    expect(href).not.toContain("&utm_medium");
    expect(url.searchParams.get("text")).toContain(TAGGED);
  });

  it("derives a readable guide slug for analytics", () => {
    expect(guideSlugFromPath("/blog/hip-replacement-recovery-week-by-week")).toBe("hip-replacement-recovery-week-by-week");
    expect(guideSlugFromPath("/guides/benefits-pip")).toBe("benefits-pip");
    expect(guideSlugFromPath("/conditions/polymyalgia-rheumatica/symptoms")).toBe("polymyalgia-rheumatica/symptoms");
  });
});
