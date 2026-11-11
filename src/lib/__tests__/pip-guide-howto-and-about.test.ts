import { describe, it, expect } from "vitest";
import headData from "../../../scripts/ai-head-data.json";
import { buildPipGuideHead } from "@/data/benefitsGuides/pipGuideHead";
import {
  PIP_GUIDE_ANSWER,
  PIP_GUIDE_HTML,
  PIP_HOWTO_STEPS,
  PIP_ACTIVITY_ROWS,
} from "@/data/benefitsGuides/pipGuideContent";
import { PAGE_AEO } from "@/data/page-aeo";

const words = (s: string) => s.trim().split(/\s+/).length;
const data = headData as Record<string, Record<string, unknown>>;

describe("/guides/benefits-pip claim answer", () => {
  it("has a 45-65 word answer with the verified claim facts", () => {
    expect(words(PIP_GUIDE_ANSWER)).toBeGreaterThanOrEqual(45);
    expect(words(PIP_GUIDE_ANSWER)).toBeLessThanOrEqual(65);
    for (const fact of ["0800 917 2222", "PIP2", "within 1 month", "assessment", "mandatory reconsideration", "tribunal"]) {
      expect(PIP_GUIDE_ANSWER).toContain(fact);
    }
    expect(PAGE_AEO["/guides/benefits-pip"].answer).toBe(PIP_GUIDE_ANSWER);
  });

  it("renders every HowTo step visibly with an anchor, and the 12 activities", () => {
    expect(PIP_HOWTO_STEPS.length).toBeGreaterThanOrEqual(6);
    for (const s of PIP_HOWTO_STEPS) expect(PIP_GUIDE_HTML).toContain(`<li id="${s.id}">`);
    expect(PIP_ACTIVITY_ROWS).toHaveLength(12);
    expect(PIP_ACTIVITY_ROWS.filter((r) => r.part === "Mobility")).toHaveLength(2);
    expect(PIP_GUIDE_HTML).toContain("Last checked:");
  });

  it("crawler head data is in sync with the page (run bun scripts/sync-pip-guide-head.ts)", () => {
    const expected = buildPipGuideHead();
    const actual = data["/guides/benefits-pip"];
    for (const [k, v] of Object.entries(expected)) expect(actual[k], k).toEqual(v);
    expect((expected.faqs as unknown[]).length).toBeGreaterThanOrEqual(4);
  });
});

describe("/about free-offer answer", () => {
  it("states charity number, founder and what is free, in step with crawler data", () => {
    const aeo = PAGE_AEO["/about"];
    expect(words(aeo.answer)).toBeGreaterThanOrEqual(45);
    expect(words(aeo.answer)).toBeLessThanOrEqual(65);
    expect(aeo.answer).toContain("1218461");
    expect(aeo.answer).toContain("David Williams");
    expect(aeo.answer).not.toMatch(/Living With Arthritis\s*\(?UK/);
    expect(data["/about"].answer).toBe(aeo.answer);
    expect(data["/about"].faqs).toEqual((aeo.faqs ?? []).map((f) => ({ q: f.q, a: f.a })));
    const org = data["/about"].organization as Record<string, unknown>;
    expect((org.founder as { name: string }).name).toBe("David Williams");
    expect((org.employee as { jobTitle: string }).jobTitle).toBe("Operations Director");
  });
});
