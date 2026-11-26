import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
const post = (slug: string) => JSON.parse(readFileSync(`src/content/blog/posts/${slug}.json`, "utf8"));
describe("targeted safety source corrections", () => {
  it("does not suggest waiting six weeks before assessment for persistent swelling", () => {
    const j = post("signs-rheumatoid-arthritis-early-stages");
    expect(j.direct_answer).toContain("Persistent unexplained joint swelling needs prompt assessment");
    expect(j.content).toContain("blood tests should not hold up an urgent referral");
    expect(j.content).not.toContain("symptoms persist over 6 weeks");
  });
  it("separates urgent joint assessment from possible sepsis escalation", () => {
    const j = post("septic-arthritis-hot-swollen-joint-emergency");
    expect(j.direct_answer).toContain("urgent GP appointment or contact NHS 111");
    expect(j.content).toContain("Call 999 or go to A&amp;E");
    expect(j.content).not.toContain("Go to A&amp;E or call 999 if you think you might have it");
    expect(j.content).toContain("Fever is not always present, so do not wait for it");
  });
  it("uses the NRAS under16 estimate and keeps all revisions pending review", () => {
    const j = post("juvenile-arthritis-uk");
    expect(j.direct_answer).toContain("12,000 children under 16");
    expect(j.content).not.toContain("15,000");
    for (const slug of ["signs-rheumatoid-arthritis-early-stages", "septic-arthritis-hot-swollen-joint-emergency", "juvenile-arthritis-uk"]) {
      const value = post(slug);
      expect(value.reviewed_by).toBeNull();
      expect(value.last_reviewed).toBeUndefined();
      expect(value.editorial_review_note).toMatch(/not (yet )?had a fresh clinical review/);
    }
  });
});
