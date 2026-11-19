import { readFileSync } from "node:fs";
import { ROUTE_TITLE_OVERRIDES } from "../../data/routeTitleOverrides";
import { describe, expect, it } from "vitest";
import { medicalEntityForRoute, normaliseRouteSchemaEntries, recordedRouteReview } from "../routeSchema";

describe("live schema parity", () => {
  it("uses the recorded foot review date visibly and one PIP breadcrumb emitter", () => {
    const foot = readFileSync("src/pages/conditions/FootAndAnkleArthritis.tsx", "utf8");
    const pip = readFileSync("src/pages/pillar/BenefitsPIPGuide.tsx", "utf8");
    expect(foot).toContain("Clinical review date not recorded.");
    expect(recordedRouteReview("/conditions/foot-and-ankle-arthritis")).toBeUndefined();
    expect(foot).not.toContain("<MedicalReviewBadge");
    expect(pip).not.toContain('"@type": "BreadcrumbList"');
    expect(pip.match(/<PageBreadcrumb /g)).toHaveLength(1);
  });
  it("keeps the swimming title identical to the static head", () => {
    expect(ROUTE_TITLE_OVERRIDES["/exercises/swimming-for-knee-arthritis"]).toBe("Swimming for Knee Arthritis: 3 Exercises & Safety Tips");
  });
  it("keeps one medical page and FAQ through repeated hydration passes", () => {
    const input = [
      { "@type": "MedicalWebPage", about: { name: "Osteoarthritis" } },
      { "@type": "MedicalWebPage", lastReviewed: "2099-01-01" },
      { "@type": "FAQPage", mainEntity: [] },
      { "@type": "FAQPage", mainEntity: [] },
    ];
    const first = normaliseRouteSchemaEntries(input, "/conditions/osteoarthritis");
    expect(first.filter(Boolean)).toHaveLength(2);
    expect(first[0]).toMatchObject({ lastReviewed: "2026-11-05", reviewedBy: { name: "Louis Maxwell" }, about: { "@id": expect.stringContaining("#medical-entity"), sameAs: ["https://www.nhs.uk/conditions/osteoarthritis/"] } });
    expect(normaliseRouteSchemaEntries(first, "/conditions/osteoarthritis")).toEqual(first);
  });
  it("retains app-owned page nodes when Helmet later removes the static fallback", () => {
    const staticPage = { "@type": "MedicalWebPage", name: "Static fallback" };
    const appPage = { "@type": "MedicalWebPage", name: "Mounted page" };
    const first = normaliseRouteSchemaEntries([staticPage, appPage], "/conditions/osteoarthritis", [false, true]);
    expect(first[0]).toBeNull();
    expect(first[1]).toMatchObject({ "@type": "MedicalWebPage", name: "Mounted page", lastReviewed: "2026-11-05" });
    const afterStaticRemoval = normaliseRouteSchemaEntries([first[1]], "/conditions/osteoarthritis", [true]);
    expect(afterStaticRemoval[0]).toEqual(first[1]);
  });
  it("does not carry an unsupported clinical date onto PIP", () => {
    expect(recordedRouteReview("/guides/benefits-pip")).toBeUndefined();
    const [page] = normaliseRouteSchemaEntries([{ "@type": "MedicalWebPage", reviewedBy: { name: "Louis Maxwell" }, lastReviewed: "2026-11-11" }], "/guides/benefits-pip");
    expect(page).toMatchObject({ "@type": "WebPage" });
    expect(page).not.toHaveProperty("reviewedBy");
    expect(page).not.toHaveProperty("lastReviewed");
  });
  it("keeps one app-owned breadcrumb across hydration without changing other page types", () => {
    const staticTrail = { "@type": "BreadcrumbList", itemListElement: [{ name: "Static" }] };
    const appTrail = { "@type": "BreadcrumbList", itemListElement: [{ name: "Visible page" }] };
    for (const route of ["/library", "/conditions/hip-arthritis/treatment", "/exercises", "/about"]) {
      const input = [staticTrail, { "@graph": [appTrail, { "@type": "Organization", name: "Charity" }] }];
      const output = normaliseRouteSchemaEntries(input, route, [false, true]);
      expect(output[0]).toBeNull();
      expect(output[1]).toEqual(input[1]);
      expect(normaliseRouteSchemaEntries(output, route, [false, true])).toEqual(output);
    }
    const about = { "@type": "WebPage", name: "About", lastReviewed: "unchanged" };
    expect(normaliseRouteSchemaEntries([about], "/about")).toEqual([about]);
  });
  it("reuses condition identities across library and condition subpages", () => {
    expect(medicalEntityForRoute("/library/polymyalgia")?.["@id"]).toBe(medicalEntityForRoute("/conditions/polymyalgia-rheumatica/symptoms")?.["@id"]);
    expect(recordedRouteReview("/library/naproxen")).toBe("2026-10-23");
    expect(recordedRouteReview("/conditions/gout/symptoms")).toBe("2026-09-17");
  });
});
