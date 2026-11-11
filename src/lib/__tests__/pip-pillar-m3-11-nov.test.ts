import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const page = readFileSync(resolve(__dirname, "../../pages/pillar/BenefitsPIPGuide.tsx"), "utf8");

describe("Month 3 PIP pillar (11 Nov)", () => {
  it("is reviewed by Louis Maxwell and dated", () => {
    expect(page).toContain('reviewer="Louis Maxwell"');
    expect(page).toContain('credential="HCPC PH128483"');
    expect(page).toContain('"reviewedBy": LOUIS_MAXWELL_REF');
    expect(page).toContain('"dateModified": "2026-11-11"');
    expect(page).toContain('<LastReviewed date="2026-11-11" />');
    expect(page).toContain('EducationalDisclaimerBox lastReviewed="2026-11-11"');
  });

  it("routes each visitor to their next job", () => {
    expect(page).toContain("Start here: where are you with PIP?");
    for (const a of ["#eligibility", "#points", "#claim", "#form", "#assessment", "#challenge", "#free-help", "#nations"]) {
      expect(page).toContain(`href="${a}"`);
    }
    for (const p of ["/resources/pip-evidence-diary", "/blog/attendance-allowance-arthritis-frailty-uk", "/blog/carers-allowance-help-if-you-care-for-someone"]) {
      expect(page).toContain(`to="${p}"`);
    }
  });

  it("keeps trust rules", () => {
    for (const s of ["pending clinical review", "Living With Arthritis UK"]) expect(page).not.toContain(s);
    expect(page).not.toMatch(/Oswestry/i);
    expect(page).toContain("not benefits advice");
  });
});
