import { describe, expect, it } from "vitest";
import safety from "@/data/childArthritisSafety.json";
import { juvenileArthritisData } from "@/data/juvenileArthritisGuide";
import { buildSubpageFaqs } from "@/data/conditionSubpageFaqs";
import { conditionSubpages } from "@/data/conditionSubpages";
import { headDataFor } from "../../../scripts/inject-canonicals.mjs";

const routes = ["", "/symptoms", "/treatment", "/exercises", "/diet"];
describe("child-specific arthritis safety", () => {
  it("does not turn a diagnostic duration into a waiting rule", () => {
    expect(safety.gp).toContain("Do not wait two or six weeks");
    expect(juvenileArthritisData.tagline).not.toContain("full joint function");
    expect(conditionSubpages["juvenile-arthritis"].symptoms.whenToSeeGP).toContain("Do not wait");
  });
  it("keeps emergency and eye pathways explicit", () => {
    expect(safety.emergency).toContain("999");
    expect(safety.emergency).toContain("cannot put weight");
    expect(safety.eyes).toContain("NHS 111");
    expect(safety.eyes).toContain("without symptoms");
  });
  it.each(["symptoms", "treatment", "exercises", "diet"] as const)("uses child-specific %s FAQs", type => {
    const faq = JSON.stringify(buildSubpageFaqs("Juvenile arthritis", "JIA", type, "juvenile-arthritis"));
    expect(faq).not.toMatch(/150 minutes|6–8 weeks|turmeric|Mediterranean-style anti-inflammatory diet/);
    expect(faq).toMatch(/child|paediatric/);
  });
  it.each(routes)("keeps final static safety and review status current: %s", suffix => {
    const final = headDataFor(`/conditions/juvenile-arthritis${suffix}`);
    expect(final.bodyHtml).toContain("Do not wait two or six weeks");
    expect(final.bodyHtml).toContain("without symptoms");
    expect(final.bodyHtml).toContain("Awaiting separate clinical review");
    expect(final.bodyHtml).not.toMatch(/full joint function|15,000|150 minutes/);
    expect(final.lastReviewed).toBeUndefined();
    expect(final.reviewedBy).toBeUndefined();
    expect(final.reviewLine).toBeUndefined();
    expect(Array.isArray(final.sources) && final.sources.length).toBeGreaterThanOrEqual(5);
  });
});
