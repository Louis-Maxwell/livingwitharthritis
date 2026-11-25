import { describe, expect, it } from "vitest";
import { hreflangLangsFor, patchEnglishAlternates } from "../lib/english-alternates.mjs";

const html = (head: string) => `<html><head>${head}</head><body></body></html>`;

describe("hreflang cluster classification", () => {
  it("gives universal clinical sections the full UK/US/CA/AU/IN cluster", () => {
    for (const route of ["/conditions/osteoarthritis", "/exercises/knee-exercises", "/diet/anti-inflammatory-diet", "/supplements/glucosamine", "/treatments", "/library"]) {
      expect(hreflangLangsFor(route), route).toEqual(["en-GB", "en-US", "en-CA", "en-AU", "en-IN", "x-default"]);
    }
  });

  it("keeps UK benefits guides strictly en-GB", () => {
    expect(hreflangLangsFor("/guides/benefits-pip")).toEqual(["en-GB", "x-default"]);
    expect(hreflangLangsFor("/guides/blue-badge-vs-disability-parking")).toEqual(["en-GB", "x-default"]);
  });

  it("gives health-advice guides the universal cluster", () => {
    expect(hreflangLangsFor("/guides/osteoarthritis")).toEqual(["en-GB", "en-US", "en-CA", "en-AU", "en-IN", "x-default"]);
  });

  it("keeps benefits blog posts en-GB and clinical blog posts universal", () => {
    expect(hreflangLangsFor("/blog/pip-for-arthritis-uk")).toEqual(["en-GB", "x-default"]);
    expect(hreflangLangsFor("/blog/swimming-exercises-hip-osteoarthritis")).toEqual(["en-GB", "en-US", "en-CA", "en-AU", "en-IN", "x-default"]);
  });

  it("leaves utility and translated pages on the generic cluster or untouched", () => {
    expect(hreflangLangsFor("/")).toEqual(["en", "en-GB", "x-default"]);
    expect(hreflangLangsFor("/about")).toEqual(["en", "en-GB", "x-default"]);
    const es = html('<link rel="alternate" hreflang="es" href="https://x.test/es/a" />');
    expect(patchEnglishAlternates(es, "/es/a", "https://x.test")).toBe(es);
  });
});

describe("patchEnglishAlternates", () => {
  it("writes the full cluster once for universal routes", () => {
    const out = patchEnglishAlternates(html(""), "/conditions/osteoarthritis", "https://livingwitharthritis.org.uk");
    for (const lang of ["en-GB", "en-US", "en-CA", "en-AU", "en-IN", "x-default"]) {
      expect(out.match(new RegExp(`hreflang="${lang}"`, "g"))?.length, lang).toBe(1);
    }
    expect(out).not.toContain('hreflang="en"');
    const again = patchEnglishAlternates(out, "/conditions/osteoarthritis", "https://livingwitharthritis.org.uk");
    expect(again.match(/hreflang="en-US"/g)?.length).toBe(1);
  });

  it("replaces a stale generic cluster with en-GB-only on UK benefits pages", () => {
    const seeded = html('<link rel="alternate" hreflang="en" href="https://livingwitharthritis.org.uk/guides/benefits-pip" />\n  <link rel="alternate" hreflang="en-US" href="https://livingwitharthritis.org.uk/guides/benefits-pip" />');
    const out = patchEnglishAlternates(seeded, "/guides/benefits-pip", "https://livingwitharthritis.org.uk");
    expect(out).not.toContain('hreflang="en-US"');
    expect(out.match(/hreflang="en-GB"/g)?.length).toBe(1);
    expect(out.match(/hreflang="x-default"/g)?.length).toBe(1);
  });
});
