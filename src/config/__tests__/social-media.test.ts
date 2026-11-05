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

  it("links the charity X, YouTube and Threads profiles and no TikTok", () => {
    expect(SOCIAL_LINKS.twitter.url).toBe("https://x.com/ArthritisOrg");
    expect(SOCIAL_LINKS.youtube.url).toBe("https://www.youtube.com/@livingwitharthritisorg");
    expect(SOCIAL_LINKS.threads.url).toBe("https://www.threads.com/@livingwitharthritisuk");
    expect(SOCIAL_LINKS.threads.label).toBe("Threads");
    const platforms = getEnabledSocialLinks().map((l) => l.platform);
    expect(platforms).toEqual(expect.arrayContaining(["twitter", "threads", "youtube"]));
    expect(Object.keys(SOCIAL_LINKS)).not.toContain("tiktok");
  });

  it("includes Facebook and LinkedIn in schema sameAs", () => {
    const sameAs = getSchemaOrgSameAs();
    expect(sameAs).toContain("https://www.facebook.com/profile.php?id=61583723925315");
    expect(sameAs).toContain("https://www.linkedin.com/company/112596569/");
  });
});
