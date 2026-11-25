import { describe, expect, it } from "vitest";
import { SOCIAL_LINKS, getEnabledSocialLinks, getSchemaOrgSameAs, validateSocialUrl } from "../social-media";

describe("charity social pages", () => {
  it("enables the charity Facebook, LinkedIn, Instagram, YouTube and email", () => {
    expect(SOCIAL_LINKS.facebook.enabled).toBe(true);
    expect(SOCIAL_LINKS.facebook.url).toBe("https://www.facebook.com/profile.php?id=862105853655104");
    expect(SOCIAL_LINKS.linkedin.enabled).toBe(true);
    expect(SOCIAL_LINKS.linkedin.url).toBe("https://www.linkedin.com/company/112596569/");
    expect(SOCIAL_LINKS.instagram.enabled).toBe(true);
    expect(SOCIAL_LINKS.youtube.enabled).toBe(true);
    expect(SOCIAL_LINKS.email.url).toBe("mailto:info@livingwitharthritis.org.uk");
  });

  it("includes all nine charity profiles, without unrelated communities", () => {
    const expected = {
      twitter: "https://x.com/ArthritisOrgHQ",
      facebook: "https://www.facebook.com/profile.php?id=862105853655104",
      instagram: "https://www.instagram.com/livingwitharthritisorg/",
      linkedin: "https://www.linkedin.com/company/112596569/",
      youtube: "https://www.youtube.com/@livingwitharthritisorg",
      threads: "https://www.threads.com/@livingwitharthritisuk",
      tiktok: "https://www.tiktok.com/@arthritis.org.uk",
      bluesky: "https://bsky.app/profile/lwarthritis.bsky.social",
      mastodon: "https://mastodon.social/@livingwitharthritis",
    };
    expect(getSchemaOrgSameAs()).toEqual(Object.values(expected));
    expect(getEnabledSocialLinks().map(link => link.platform)).toEqual([
      ...Object.keys(expected), "email",
    ]);
    expect(SOCIAL_LINKS.pinterest.enabled).toBe(false);
    expect(SOCIAL_LINKS.reddit.enabled).toBe(false);
    for (const url of Object.values(expected)) expect(validateSocialUrl(url)).toBe(true);
  });

  it("rejects lookalike hosts and non-HTTPS profile links", () => {
    expect(validateSocialUrl("https://notfacebook.com/profile")).toBe(false);
    expect(validateSocialUrl("https://facebook.com.attacker.invalid/profile")).toBe(false);
    expect(validateSocialUrl("http://www.instagram.com/livingwitharthritisorg/")).toBe(false);
    expect(validateSocialUrl("mailto:info@livingwitharthritis.org.uk")).toBe(true);
  });

  it("includes Facebook and LinkedIn in schema sameAs", () => {
    const sameAs = getSchemaOrgSameAs();
    expect(sameAs).toContain("https://www.facebook.com/profile.php?id=862105853655104");
    expect(sameAs).toContain("https://www.linkedin.com/company/112596569/");
  });
});
