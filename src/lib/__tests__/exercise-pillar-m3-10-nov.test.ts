import { inlineReviewRecords } from "@/test/inlineReviewRecords";
import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import { CITATIONS_EXERCISE_HUB } from "@/data/clinical/ukCitations";

const hub = inlineReviewRecords(readFileSync(resolve(__dirname, "../../pages/ExerciseHub.tsx"), "utf8"));
const guide = readFileSync(resolve(__dirname, "../../pages/pillar/ExerciseGuide.tsx"), "utf8");

describe("Month 3 exercise pillar (10 Nov)", () => {
  it("is reviewed by Louis Maxwell and dated", () => {
    expect(hub).toContain('credential="HCPC PH128483"');
    expect(hub).toContain('dateModified: "2026-11-10"');
    expect(hub).toContain("reviewedBy: LOUIS_MAXWELL_REF");
    expect(hub).toContain('<LastReviewed date="2026-11-10" />');
    expect(hub).toContain('EducationalDisclaimerBox lastReviewed="2026-11-10"');
    expect(guide).toContain('EducationalDisclaimerBox lastReviewed="2026-11-10"');
    expect(guide).toContain("Reviewed by Louis Maxwell");
  });

  it("has the customer-first blocks", () => {
    for (const s of [
      "Exercise today: start here",
      "Red flags: stop and get help",
      "Is it safe? How to read pain when you exercise",
      "Pick your starting point",
      "Flare days: do less, not nothing",
      "When to see your GP or a physiotherapist",
      "For carers and family",
      "NHS 111",
      "999",
    ]) expect(hub).toContain(s);
  });

  it("links people to their next job", () => {
    for (const p of [
      "/guides/arthritis-pain-relief",
      "/guides/newly-diagnosed",
      "/arthritis-flare-ups",
      "/resources/flare-action-plan",
      "/guides/can-exercise-make-osteoarthritis-worse",
      "/conditions/rheumatoid-arthritis",
      "/arthritis-waiting-list-help",
      "/guides/benefits-pip",
    ]) expect(hub).toContain(`to="${p}"`);
  });

  it("drops unsourced statistics and overclaims", () => {
    for (const s of ["StatCounter", "DonutChart", "HorizontalBar", "up to 40%", "8.75", "more effective than painkillers", "Physiotherapy Approved", "Living With Arthritis UK", "pending clinical review"]) {
      expect(hub).not.toContain(s);
    }
    for (const s of ["over 60%", "up to 30%", "up to 90%", "Cochrane", "single most", "4 kg per step", "Statistics cited", "Living With Arthritis UK", "pending clinical review"]) {
      expect(guide).not.toContain(s);
    }
    expect(hub).not.toMatch(/Oswestry/i);
    expect(guide).not.toMatch(/Oswestry/i);
  });

  it("cites NICE and NHS", () => {
    const urls = CITATIONS_EXERCISE_HUB.map((c) => c.url);
    expect(urls).toContain("https://www.nice.org.uk/guidance/ng226");
    expect(urls).toContain("https://www.nice.org.uk/guidance/ng100");
    expect(urls).toContain("https://www.nhs.uk/conditions/osteoarthritis/");
  });
});
