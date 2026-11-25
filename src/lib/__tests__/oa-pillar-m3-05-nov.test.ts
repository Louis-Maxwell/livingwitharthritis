import { inlineReviewRecords } from "@/test/inlineReviewRecords";
import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import { TOPIC_CLUSTERS, getClusterForPath } from "@/data/topicClusters";

const oa = inlineReviewRecords(readFileSync(resolve(__dirname, "../../pages/conditions/Osteoarthritis.tsx"), "utf8"));
const scope = readFileSync(resolve(__dirname, "../../../docs/M3-LINKABLE-ASSET-PDF-SCOPE.md"), "utf8");
const tracker = readFileSync(resolve(__dirname, "../../../docs/GROWTH-5-MONTH-EXECUTION-TRACKER.md"), "utf8");

describe("Month 3 OA pillar (5 Nov)", () => {
  it("is reviewed and dated 2026-11-05", () => {
    expect(oa).toContain('credential="HCPC PH128483"');
    expect(oa).toContain('"dateModified": "2026-11-05"');
    expect(oa).toContain('"lastReviewed": "2026-11-05"');
    expect(oa).toContain('<LastReviewed date="2026-11-05" />');
    expect(oa).toContain('date="November 2026"');
    expect(oa).toContain('EducationalDisclaimerBox lastReviewed="2026-11-05"');
    expect(oa).toContain("LOUIS_MAXWELL_REF");
    expect(oa).toContain('<UrgentHelpAndSources path="/conditions/osteoarthritis"');
  });

  it("has the customer-first blocks", () => {
    for (const s of [
      "OA right now: start here",
      "Red flags: get help now",
      "What osteoarthritis is (plain English)",
      "Diagnosis: GP first, imaging not always first",
      "Core treatments: exercise, weight, information",
      "Pain relief aligned with NICE NG226",
      "Treatments NICE does not recommend for OA",
      "When to see your GP",
      "NHS 111",
      "999",
      "NG226",
    ]) {
      expect(oa).toContain(s);
    }
  });

  it("links to gold-pass spokes and hubs", () => {
    for (const p of [
      "/guides/arthritis-pain-relief",
      "/exercises",
      "/guides/hip-exercises-for-osteoarthritis",
      "/guides/knee-exercises-for-osteoarthritis",
      "/blog/swimming-exercises-hip-osteoarthritis",
      "/blog/walking-with-arthritis-start-build-up-keep-going",
      "/blog/best-walking-shoes-arthritis-uk",
      "/blog/joint-protection-easier-everyday-tasks",
      "/blog/knee-osteoarthritis-frailty-staying-steady-home-uk",
      "/blog/hip-and-knee-oa-frailty-transfers-uk",
      "/blog/seated-strength-frail-osteoarthritis-uk",
      "/guides/painkillers-and-nsaids",
      "/guides/benefits-pip",
      "/faq/arthritis-disability-benefits-uk",
      "/resources/flare-action-plan",
      "/guides/newly-diagnosed",
      "/conditions/rheumatoid-arthritis",
      "/blog/best-supplement-for-knee-joint",
    ]) {
      expect(oa).toContain(`to="${p}"`);
    }
  });

  it("drops unsafe, outdated or banned lines", () => {
    for (const s of [
      "2025-12-15",
      "June 2026",
      "2026-09-28",
      "Living With Arthritis UK",
      "pending clinical review",
      "Oswestry",
      "500-1000 mg",
      "anti-inflammatory diet cures",
      "Viscosupplementation",
      "platelet-rich plasma",
    ]) {
      expect(oa).not.toContain(s);
    }
  });

  it("keeps TopicClusterNav on the OA path and surfaces recent Champions", () => {
    expect(oa).toContain('TopicClusterNav path="/conditions/osteoarthritis"');
    expect(getClusterForPath("/conditions/osteoarthritis")?.id).toBe("osteoarthritis");
    const cluster = TOPIC_CLUSTERS.find((c) => c.id === "osteoarthritis")!;
    // Keep GSC hip-exercises / swimming / FAQ in the first sibling slots; add transfers
    // without stealing knee-steady / seated-strength primary ownership from exercises.
    expect(cluster.supportingPaths.slice(0, 4)).toEqual(
      expect.arrayContaining([
        "/guides/hip-exercises-for-osteoarthritis",
        "/blog/swimming-exercises-hip-osteoarthritis",
        "/faq/what-is-osteoarthritis",
        "/blog/hip-and-knee-oa-frailty-transfers-uk",
      ]),
    );
    expect(getClusterForPath("/blog/knee-osteoarthritis-frailty-staying-steady-home-uk")?.id).toBe("exercises");
    expect(getClusterForPath("/blog/seated-strength-frail-osteoarthritis-uk")?.id).toBe("exercises");
  });

  it("scopes the M3 PIP evidence checklist PDF (not shipped)", () => {
    expect(scope).toMatch(/PIP evidence checklist/i);
    expect(scope).toContain("/resources/pip-evidence-diary");
    expect(scope).toMatch(/not shipped|scope only|later weekday/i);
    expect(scope).toContain("Louis Maxwell");
  });

  it("tracker has a 5 Nov daily log", () => {
    expect(tracker).toContain("## Daily log — 5 Nov 2026");
    expect(tracker).toMatch(/OA pillar|osteoarthritis/i);
  });
});
