import { describe, expect, it } from "vitest";
import { complementaryTherapies } from "@/data/hubGuides/complementaryTherapies";
import { drugGuide } from "@/data/hubGuides/drugGuide";
import { buildHubGuideHeadData } from "../../../scripts/generate-hub-guide-head-data";
import { headDataFor } from "../../../scripts/inject-canonicals.mjs";

const copy = (guide: typeof drugGuide) => JSON.stringify(guide);

describe("condition-specific treatment safety revision", () => {
  it("does not promote OA acupuncture, TENS or glucosamine trials", () => {
    const text = copy(complementaryTherapies);
    expect(text).toContain("not to offer acupuncture or dry needling");
    expect(text).toContain("not to offer TENS");
    expect(text).toContain("not to offer glucosamine");
    expect(text).toContain("specialist physiotherapy");
    expect(text).not.toContain("fair trial for 2 to 3 months");
  });
  it("preserves the OA medicine hierarchy and stopping precautions", () => {
    const text = copy(drugGuide);
    for (const term of ["topical NSAID", "gastroprotection", "infrequent short-term", "not tolerated or ineffective", "against strong opioids", "Do not stop an existing opioid suddenly"]) expect(text).toContain(term);
  });
  it.each([complementaryTherapies, drugGuide])("keeps urgent joint assessment distinct from routine self-care: $slug", guide => {
    expect(copy(guide)).toContain("NHS 111");
    expect(copy(guide)).toMatch(/without a fever/);
    expect(copy(guide)).toContain("999");
    expect(guide.reviewStatus).toBe("pending");
  });
  it.each([complementaryTherapies, drugGuide])("keeps generated and final static data current: $slug", guide => {
    const route = `/${guide.slug}`;
    const generated = buildHubGuideHeadData()[route];
    const final = headDataFor(route);
    expect(final.answer).toBe(guide.answer);
    expect(final.faqs).toEqual(generated.faqs);
    expect(final.bodyHtml).toBe(generated.bodyHtml);
    expect(final.bodyHtml).toContain("Awaiting separate clinical review");
    expect(final.sources).toEqual(generated.sources);
    expect(final.lastReviewed).toBeUndefined();
    expect(final.reviewedBy).toBeUndefined();
    expect(final.reviewLine).toBeUndefined();
  });
});
