import { describe, expect, it } from "vitest";
import { medicalEntityForRoute, normaliseRouteSchemaEntries, recordedRouteReview } from "../routeSchema";

describe("live schema parity", () => {
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
  it("does not carry an unsupported clinical date onto PIP", () => {
    expect(recordedRouteReview("/guides/benefits-pip")).toBeUndefined();
    const [page] = normaliseRouteSchemaEntries([{ "@type": "MedicalWebPage", reviewedBy: { name: "Louis Maxwell" }, lastReviewed: "2026-11-11" }], "/guides/benefits-pip");
    expect(page).toMatchObject({ "@type": "WebPage" });
    expect(page).not.toHaveProperty("reviewedBy");
    expect(page).not.toHaveProperty("lastReviewed");
  });
  it("reuses condition identities across library and condition subpages", () => {
    expect(medicalEntityForRoute("/library/polymyalgia")?.["@id"]).toBe(medicalEntityForRoute("/conditions/polymyalgia-rheumatica/symptoms")?.["@id"]);
    expect(recordedRouteReview("/library/naproxen")).toBe("2026-10-23");
    expect(recordedRouteReview("/conditions/gout/symptoms")).toBe("2026-09-17");
  });
});
