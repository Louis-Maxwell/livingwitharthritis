import { describe, it, expect, beforeEach, vi } from "vitest";
import { withUtm, classifySocialReferral } from "@/lib/utm";
import { getArticleDiscovery } from "@/lib/articleDiscovery";
import { extractLearnItems } from "@/lib/articleDiscovery";
import { initDiscoveryTracking, __resetDiscoveryTracking } from "@/lib/discoveryTracking";
import noindex from "@/data/blog-noindex.json";
import catalog from "@/content/blog/catalog.generated.json";
import data from "@/data/articleDiscovery.generated.json";

describe("utm", () => {
  it("builds social URLs and replaces old utm params", () => {
    expect(withUtm("/blog/pip-for-arthritis-uk?utm_source=old", { source: "facebook", campaign: "2026-10 Top guides" })).toBe(
      "https://livingwitharthritis.org.uk/blog/pip-for-arthritis-uk?utm_source=facebook&utm_medium=social&utm_campaign=2026-10-top-guides",
    );
  });
  it("classifies utm and referrers", () => {
    expect(classifySocialReferral("?utm_source=linkedin&utm_medium=social&utm_campaign=x", "")?.source).toBe("linkedin");
    expect(classifySocialReferral("", "https://l.facebook.com/")?.source).toBe("facebook");
    expect(classifySocialReferral("?fbclid=abc", "")?.source).toBe("facebook");
    expect(classifySocialReferral("", "https://www.bing.com/")).toBeNull();
    expect(classifySocialReferral("?utm_source=bing&utm_medium=cpc", "")).toBeNull();
  });
});

describe("article discovery index", () => {
  const hidden = new Set(noindex as string[]);
  const published = new Set((catalog as Array<{ slug: string }>).map((r) => r.slug));
  it("never suggests noindexed or unpublished posts", () => {
    for (const row of (data as unknown as { s: [string][] }).s) {
      expect(hidden.has(row[0])).toBe(false);
      expect(published.has(row[0])).toBe(true);
    }
  });
  it("gives every indexable post related links and prev/next", () => {
    const d = getArticleDiscovery("hip-replacement-recovery-week-by-week");
    expect(d?.related.length).toBeGreaterThanOrEqual(3);
    expect(d?.next).toBeTruthy();
    expect(d?.related.some((r) => r.slug === "hip-replacement-recovery-week-by-week")).toBe(false);
    expect(getArticleDiscovery((noindex as string[])[0])).toBeNull();
  });
});

describe("what you'll learn", () => {
  it("uses article headings only and skips FAQ/references", () => {
    const html = '<h2 id="a">Week 1</h2><h2 id="b">Week 2</h2><h2 id="c">Frequently asked questions</h2><h2 id="d">References</h2>';
    expect(extractLearnItems(html).map((x) => x.text)).toEqual(["Week 1", "Week 2"]);
  });
});

describe("discovery tracking", () => {
  beforeEach(() => {
    __resetDiscoveryTracking();
    sessionStorage.clear();
    document.body.innerHTML = "";
  });
  it("fires typed click events and shop_click", () => {
    const gtag = vi.fn();
    (window as unknown as { gtag: typeof gtag }).gtag = gtag;
    initDiscoveryTracking();
    document.body.innerHTML =
      '<div data-track="related" data-track-placement="article_end"><a href="/blog/x">X</a></div>' +
      '<a id="s" href="https://shop.brandangels.co.uk/living-with-arthritis">Shop</a>' +
      '<span data-track="donate"><a href="/donate">Donate</a></span>';
    document.querySelectorAll("a").forEach((a) => a.addEventListener("click", (e) => e.preventDefault()));
    document.querySelectorAll("a").forEach((a) => a.click());
    const names = gtag.mock.calls.filter((c) => c[0] === "event").map((c) => c[1]);
    expect(names).toEqual(["related_article_click", "shop_click", "donation_click"]);
  });
});
