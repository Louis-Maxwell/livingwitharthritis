import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import PET_ARTICLES from "@/data/pets-arthritis.generated";

describe("pet image truth and provenance", () => {
  it("uses one checked animal illustration per article, not unrelated people photos", () => {
    expect(PET_ARTICLES).toHaveLength(8);
    for (const article of PET_ARTICLES) {
      expect(article.images).toHaveLength(1);
      const image = article.images[0];
      expect(image.url).toMatch(/^\/images\/pets\/[\w-]+\.webp$/);
      expect(existsSync(`public${image.url}`)).toBe(true);
      expect(image.alt).not.toMatch(/senior|vet|arthrit|pain/i);
      expect(image.caption).toContain("not identified as having arthritis");
      expect(image.source).toMatch(/^https:\/\/commons.wikimedia.org\/wiki\/File:/);
      expect(image.credit.length).toBeGreaterThan(2);
      expect(["Public domain", "CC0 1.0", "CC BY 3.0"]).toContain(image.license);
      expect(image.licenseUrl).toMatch(/^https:\/\/creativecommons.org\//);
      expect(image.changes).toContain("WebP");
    }
  });
  it("shows source and licence credits on articles and hub cards", () => {
    for (const page of ["PetArticle", "PetsHub"]) expect(readFileSync(`src/pages/${page}.tsx`, "utf8")).toContain("<PetPhotoCredits");
  });
});
