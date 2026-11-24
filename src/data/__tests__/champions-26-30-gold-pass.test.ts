import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { inlineReviewRecords } from "@/test/inlineReviewRecords";
import { describe, expect, it } from "vitest";

const pages = [
  "src/pages/pillar/BenefitsPIPGuide.tsx",
  "src/pages/supplements/SupplementsHub.tsx",
  "src/pages/supplements/Glucosamine.tsx",
  "src/pages/FAQ.tsx",
  "src/pages/SymptomChecker.tsx",
];

describe("Champions 26–30 gold pass", () => {
  it.each(pages)("%s includes disclaimer, cluster nav, review date and citations", (rel) => {
    if (rel === "src/pages/supplements/Glucosamine.tsx") {
      const wrapper = readFileSync(resolve(process.cwd(), rel), "utf8");
      const shared = readFileSync(resolve(process.cwd(), "src/components/seo/SupplementSafetyGuide.tsx"), "utf8");
      const copy = JSON.parse(readFileSync(resolve(process.cwd(), "src/data/supplementSafety24.json"), "utf8"));
      expect(wrapper).toContain('slug="glucosamine"');
      expect(shared).toContain("EducationalDisclaimerBox");
      expect(shared).toContain("TopicClusterNav");
      expect(shared).toContain('reviewStatus="pending"');
      expect(copy.glucosamine.sources.some((source: { url: string }) => source.url.includes("nice.org.uk/guidance/ng226"))).toBe(true);
      return;
    }
    const src = inlineReviewRecords(readFileSync(resolve(process.cwd(), rel), "utf8"));
    expect(src).toContain("EducationalDisclaimerBox");
    expect(src).toContain("TopicClusterNav");
    // An editorial revision awaiting clinical review must not inherit an old date.
    if (rel === "src/pages/supplements/SupplementsHub.tsx") {
      expect(src).toContain('reviewStatus="pending"');
      expect(src).toContain("Earlier review dates do not attest to this revision.");
    } else {
      expect(src).toMatch(/2026-09-1[6]|2026-09-20|2026-09-21|2026-09-28|2026-10-23|2026-11-11/);
    }
    expect(src).toContain("ArticleCitations");
    expect(src).toMatch(/ukCitations/);
  });
});
