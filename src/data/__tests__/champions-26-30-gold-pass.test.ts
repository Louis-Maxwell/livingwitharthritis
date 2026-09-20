import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const pages = [
  "src/pages/BenefitsPipHub.tsx",
  "src/pages/supplements/SupplementsHub.tsx",
  "src/pages/supplements/Glucosamine.tsx",
  "src/pages/FAQ.tsx",
  "src/pages/SymptomChecker.tsx",
];

describe("Champions 26–30 gold pass", () => {
  it.each(pages)("%s includes disclaimer, cluster nav, review date and citations", (rel) => {
    const src = readFileSync(resolve(process.cwd(), rel), "utf8");
    expect(src).toContain("EducationalDisclaimerBox");
    expect(src).toContain("TopicClusterNav");
    // BenefitsPipHub refreshed in the 20 Sep visibility sprint; others remain 2026-09-16.
    expect(src).toMatch(/2026-09-1[6]|2026-09-20/);
    expect(src).toContain("ArticleCitations");
    expect(src).toMatch(/ukCitations/);
  });
});
