import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const page = readFileSync(resolve(__dirname, "../../pages/pillar/BenefitsPIPGuide.tsx"), "utf8");

describe("Month 3 PIP pillar (11 Nov)", () => {
  it("does not invent a clinical review date when the record has none", () => {
    expect(page).toContain('"@type": "WebPage"');
    expect(page).not.toContain('"reviewedBy": LOUIS_MAXWELL_REF');
    expect(page).not.toContain('"lastReviewed":');
    expect(page).toContain("Clinical review date not recorded.");
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
