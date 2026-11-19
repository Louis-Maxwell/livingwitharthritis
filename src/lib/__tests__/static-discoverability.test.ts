import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const home = readFileSync("index.html", "utf8");
const knee = readFileSync("public/resources/knee-joint-map.html", "utf8");
const scripts = (html: string) => [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));

describe("static discovery parity", () => {
  it("gives the home crawler a real trail with the existing hydration id", () => {
    expect(home).toContain('id="ld-home-breadcrumb"');
    const trails = scripts(home).filter(s => s["@type"] === "BreadcrumbList");
    expect(trails).toHaveLength(1);
    expect(trails[0].itemListElement).toEqual([{ "@type": "ListItem", position: 1, name: "Home", item: "https://livingwitharthritis.org.uk/" }]);
    const injector = readFileSync("scripts/inject-canonicals.mjs", "utf8");
    expect(injector).toContain('route === "/" ? html : html.replace');
    expect(injector).toContain("ld-home-breadcrumb");
    const enrich = injector.slice(injector.indexOf("function enrichHead"));
    expect(enrich.indexOf("ld-home-breadcrumb")).toBeLessThan(enrich.indexOf("if (!d) return out"));
  });
  it("gives the standalone knee resource one real two-level trail", () => {
    const trails = scripts(knee).filter(s => s["@type"] === "BreadcrumbList");
    expect(trails).toHaveLength(1);
    expect(trails[0].itemListElement.map((i: { position: number }) => i.position)).toEqual([1, 2]);
    expect(knee).toContain("Separate clinical review pending");
  });
  it("uses linked primary guidance rather than unsupported strongest-diet claims", () => {
    expect(home).not.toContain("strongest evidence base for arthritis symptom relief");
    expect(home).toContain('href="https://www.nice.org.uk/guidance/ng226/chapter/Recommendations"');
    expect(home).toContain('href="https://www.nhs.uk/conditions/arthritis/"');
    expect(home).toContain("No single food or diet cures arthritis");
  });
});
