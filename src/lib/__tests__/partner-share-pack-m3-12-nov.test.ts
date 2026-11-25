import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const partners = readFileSync(resolve(__dirname, "../../pages/Partners.tsx"), "utf8");
const hcp = readFileSync(resolve(__dirname, "../../pages/HealthcareProfessionals.tsx"), "utf8");

describe("M3 partner pilot: /partners share-today pack (12 Nov)", () => {
  it("links all four gold pillars and the printable packs", () => {
    expect(partners).toContain("Free resources you can share today");
    for (const p of [
      "/guides/arthritis-pain-relief",
      "/conditions/osteoarthritis",
      "/exercises",
      "/guides/benefits-pip",
      "/resources/clinic-pack",
      "/resources/flare-action-plan",
      "/resources/pip-evidence-diary",
      "/guides/newly-diagnosed",
    ]) {
      expect(partners).toContain(`href: "${p}"`);
    }
    expect(partners).toContain("Louis Maxwell (HCPC PH128483)");
  });

  it("makes no reach, SEO or co-branding promises", () => {
    for (const s of ["Reach 10M+", "E-E-A-T", "backlinks", "Co-Branded", "pending clinical review", "Living With Arthritis UK"]) {
      expect(partners).not.toContain(s);
    }
    expect(partners).not.toMatch(/Oswestry/i);
  });

  it("HCP page shares the pain pillar too", () => {
    expect(hcp).toContain('href: "/guides/arthritis-pain-relief"');
  });
});
