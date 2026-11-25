import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const paths = ["src/content/blog/posts/how-nhs-referrals-work-arthritis.json", "src/content/blog/posts/preparing-for-joint-replacement-uk.json", "src/content/blog/posts/mri-scan-arthritis-explained.json", "src/data/waitingGuides/waitingListHelpContent.ts"];
const oldUrl = "https://www.nhsinform.scot/waiting-times/outpatient-waiting-times/";
const newUrl = "https://www.nhsinform.scot/care-support-and-rights/health-rights/access/nhs-scotland-waiting-times";

describe("Scottish waiting-time source links", () => {
  for (const path of paths) {
    it(`keeps the current NHS inform waiting-time source in ${path}`, () => {
      const source = readFileSync(path, "utf8");
      expect(source).not.toContain(oldUrl);
      expect(source).toContain(newUrl);
    });
  }
  it("normalises older static-head snapshots at build time", () => {
    const source = readFileSync("scripts/inject-canonicals.mjs", "utf8");
    expect(source).toContain(".replaceAll(");
    expect(source).toContain(oldUrl);
    expect(source).toContain(newUrl);
  });
});
