import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
const load = (slug: string) => JSON.parse(readFileSync(`src/content/blog/posts/${slug}.json`, "utf8"));
const slugs = ["rheumatology-appointment-what-to-expect-uk", "hospital-appointments-frailty-arthritis-uk"];
describe("practical appointments editorial batch four", () => {
  for (const slug of slugs) {
    it(`${slug} preserves access, printables, sources and honest review status`, () => {
      const p = load(slug);
      expect(p.slug).toBe(slug);
      expect(p.is_published).toBe(true);
      expect(p.reviewed_by).toBeNull();
      expect(p.reviewer_credentials).toBeNull();
      expect(p.last_reviewed).toBeUndefined();
      expect(p.editorial_review_note).toContain("not yet had a fresh clinical review");
      expect(p.updated_at).toBe("2026-11-18");
      expect(p.content).toContain("18 November 2026");
      expect(p.content).toContain("/resources/gp-appointment-symptom-medication-tracker.pdf");
      expect(p.content).toContain("/resources/symptom-flare-tracker");
      expect(p.content).toContain("awaiting separate clinical review");
      expect(p.content).not.toMatch(/Clinically reviewed by|earlier review dates apply to the existing guide/);
      expect(p.citations.length).toBeGreaterThanOrEqual(7);
      expect(existsSync(`public/openverse/${p.cover}`)).toBe(true);
      const credits = JSON.parse(readFileSync("public/openverse/ATTRIBUTION.json", "utf8"));
      expect(credits[p.cover]?.credit).toBe("Image: Living With Arthritis");
      expect(p.content).toContain("999");
    });
  }
  it("rheumatology explains uncertainty, results ownership and nation-specific urgent routes", () => {
    const p = load(slugs[0]);
    expect(p.content).toContain("A diagnosis is not guaranteed");
    expect(p.content).toContain("no blood test can definitively prove or rule it out");
    expect(p.content).toContain("Do not assume silence means everything is normal");
    expect(p.content).toContain("local GP out-of-hours service");
    expect(p.content).toContain("NHS 24 on 111");
    expect(p.content).not.toContain("This is a good outcome, even if it feels disappointing");
    expect(p.content).not.toMatch(/within 6 weeks of referral|within 1 working day/);
  });
  it("logistics separates schemes and avoids blanket eligibility, parking and fasting claims", () => {
    const p = load(slugs[1]);
    expect(p.content).toContain("does not by itself confirm eligibility");
    expect(p.content).toContain("A refund scheme does not automatically book a vehicle");
    expect(p.content).toContain("Agree taxi use in advance");
    expect(p.content).toContain("only if your preparation instructions allow it");
    expect(p.content).toContain("In England,");
    expect(p.content).toContain("Northern Ireland:");
    expect(p.content).toContain("valid Blue Badge holders");
    expect(p.content).not.toContain("every half hour");
  });
});
