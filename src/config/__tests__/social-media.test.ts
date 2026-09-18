import { describe, expect, it } from "vitest";
import { SOCIAL_LINKS, getEnabledSocialLinks, getSchemaOrgSameAs } from "../social-media";

describe("charity social pages", () => {
  it("enables the charity Facebook, LinkedIn, Instagram, YouTube and email", () => {
    expect(SOCIAL_LINKS.facebook.enabled).toBe(true);
    expect(SOCIAL_LINKS.facebook.url).toBe("https://www.facebook.com/profile.php?id=61583723925315");
    expect(SOCIAL_LINKS.linkedin.enabled).toBe(true);
    expect(SOCIAL_LINKS.linkedin.url).toBe("https://www.linkedin.com/company/112596569/");
    expect(SOCIAL_LINKS.instagram.enabled).toBe(true);
    expect(SOCIAL_LINKS.youtube.enabled).toBe(true);
    expect(SOCIAL_LINKS.email.url).toBe("mailto:info@livingwitharthritis.org.uk");
  });

  it("does not link X to another organisation", () => {
    expect(SOCIAL_LINKS.twitter.enabled).toBe(false);
    expect(getEnabledSocialLinks().map((l) => l.platform)).not.toContain("twitter");
  });

  it("includes Facebook and LinkedIn in schema sameAs", () => {
    const sameAs = getSchemaOrgSameAs();
    expect(sameAs).toContain("https://www.facebook.com/profile.php?id=61583723925315");
    expect(sameAs).toContain("https://www.linkedin.com/company/112596569/");
  });
});
