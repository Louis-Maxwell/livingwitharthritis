/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { TOPIC_CLUSTERS, getClusterForPath } from "@/data/topicClusters";

const REVIEW = "2026-09-28";

const OA_LINKS = [
  "/guides/arthritis-pain-relief",
  "/exercises",
  "/blog/swimming-exercises-hip-osteoarthritis",
  "/blog/best-supplement-for-knee-joint",
  "/blog/walking-with-arthritis-start-build-up-keep-going",
  "/blog/best-walking-shoes-arthritis-uk",
  "/benefits-pip",
  "/faq/arthritis-disability-benefits-uk",
  "/blog/joint-protection-easier-everyday-tasks",
];

const PAIN_LINKS = [
  "/blog/swimming-exercises-hip-osteoarthritis",
  "/blog/walking-with-arthritis-start-build-up-keep-going",
  "/blog/best-walking-shoes-arthritis-uk",
  "/conditions/osteoarthritis",
  "/exercises",
  "/benefits-pip",
  "/faq/arthritis-disability-benefits-uk",
  "/blog/omega-3-foods-for-joints",
];

const EXERCISE_LINKS = [
  "/blog/swimming-exercises-hip-osteoarthritis",
  "/blog/walking-with-arthritis-start-build-up-keep-going",
  "/guides/knee-exercises-for-osteoarthritis",
  "/guides/hip-exercises-for-osteoarthritis",
];

const PIP_LINKS = [
  "/faq/arthritis-disability-benefits-uk",
  "/blog/pip-for-arthritis-uk",
  "/blog/access-to-work-scheme-arthritis-guide",
  "/blog/sick-pay-fit-notes-time-off-work-arthritis",
  "/blog/carers-allowance-help-if-you-care-for-someone",
];

describe("GSC Champions 47–48 (28 Sep): early M3 pillar deepen (pain / OA / exercise / PIP)", () => {
  const oa = readFileSync(
    resolve(process.cwd(), "src/pages/conditions/Osteoarthritis.tsx"),
    "utf8",
  );
  const pain = readFileSync(
    resolve(process.cwd(), "src/pages/guides/ArthritisPainRelief.tsx"),
    "utf8",
  );
  const exercise = readFileSync(
    resolve(process.cwd(), "src/pages/ExerciseHub.tsx"),
    "utf8",
  );
  const pip = readFileSync(
    resolve(process.cwd(), "src/pages/BenefitsPipHub.tsx"),
    "utf8",
  );
  const kb = readFileSync(
    resolve(process.cwd(), "src/lib/chatbot/knowledgeBase.ts"),
    "utf8",
  );

  it("OA pillar has review 2026-09-28 and customer-job cross-links", () => {
    expect(oa).toContain(`EducationalDisclaimerBox lastReviewed="${REVIEW}"`);
    for (const href of OA_LINKS) {
      expect(oa.includes(`"${href}"`) || oa.includes(`'${href}'`) || oa.includes(`to="${href}"`), `OA missing ${href}`).toBe(true);
    }
    expect(oa).toMatch(/NICE|nhs\.uk/i);
    expect(oa).not.toMatch(/Oswestry/i);
    expect(oa).not.toMatch(/800-1,200\/mo/i);
    expect(getClusterForPath("/conditions/osteoarthritis")?.id).toBe("osteoarthritis");
  });

  it("Pain pillar has review 2026-09-28 and denser cluster links", () => {
    expect(pain).toContain(`EducationalDisclaimerBox lastReviewed="${REVIEW}"`);
    for (const href of PAIN_LINKS) {
      expect(
        pain.includes(`to="${href}"`) || pain.includes(`"${href}"`),
        `Pain missing ${href}`,
      ).toBe(true);
    }
    expect(pain).not.toMatch(/Oswestry/i);
    expect(getClusterForPath("/guides/arthritis-pain-relief")?.id).toBe("pain");
  });

  it("Exercise hub has review 2026-09-28 and surfaces swimming + walking", () => {
    expect(exercise).toContain(`EducationalDisclaimerBox lastReviewed="${REVIEW}"`);
    for (const href of EXERCISE_LINKS) {
      expect(
        exercise.includes(`"${href}"`) || exercise.includes(`to="${href}"`) || exercise.includes(`href: "${href}"`),
        `Exercise missing ${href}`,
      ).toBe(true);
    }
    expect(getClusterForPath("/exercises")?.id).toBe("exercises");
  });

  it("PIP hub has review 2026-09-28 and work/carer support blogs", () => {
    expect(pip).toContain(`EducationalDisclaimerBox lastReviewed="${REVIEW}"`);
    for (const href of PIP_LINKS) {
      expect(pip.includes(`"${href}"`) || pip.includes(`href: "${href}"`), `PIP missing ${href}`).toBe(true);
    }
    expect(pip.toLowerCase()).toContain("gov.uk");
    expect(pip).not.toMatch(/Oswestry/i);
    expect(getClusterForPath("/benefits-pip")?.id).toBe("pip");
  });

  it("topicClusters fronts gold-pass / walking / joint-protection / PIP work blogs", () => {
    const oaCluster = TOPIC_CLUSTERS.find((c) => c.id === "osteoarthritis")!;
    const exCluster = TOPIC_CLUSTERS.find((c) => c.id === "exercises")!;
    const pipCluster = TOPIC_CLUSTERS.find((c) => c.id === "pip")!;
    const painCluster = TOPIC_CLUSTERS.find((c) => c.id === "pain")!;

    expect(oaCluster.supportingPaths).toEqual(
      expect.arrayContaining([
        "/blog/swimming-exercises-hip-osteoarthritis",
        "/blog/walking-with-arthritis-start-build-up-keep-going",
        "/blog/joint-protection-easier-everyday-tasks",
        "/blog/best-walking-shoes-arthritis-uk",
      ]),
    );
    expect(exCluster.supportingPaths.slice(0, 4)).toEqual(
      expect.arrayContaining([
        "/blog/swimming-exercises-hip-osteoarthritis",
        "/blog/walking-with-arthritis-start-build-up-keep-going",
      ]),
    );
    expect(pipCluster.supportingPaths).toEqual(
      expect.arrayContaining([
        "/faq/arthritis-disability-benefits-uk",
        "/blog/pip-for-arthritis-uk",
        "/blog/sick-pay-fit-notes-time-off-work-arthritis",
        "/blog/carers-allowance-help-if-you-care-for-someone",
        "/blog/access-to-work-scheme-arthritis-guide",
      ]),
    );
    expect(painCluster.supportingPaths).toEqual(
      expect.arrayContaining([
        "/blog/walking-with-arthritis-start-build-up-keep-going",
        "/blog/joint-protection-easier-everyday-tasks",
      ]),
    );

    expect(getClusterForPath("/blog/swimming-exercises-hip-osteoarthritis")?.id).toBe(
      "osteoarthritis",
    );
    expect(getClusterForPath("/faq/arthritis-disability-benefits-uk")?.id).toBe("pip");
  });

  it("chatbot KB points OA / exercise / PIP intents at real gold-pass URLs", () => {
    expect(kb).toContain('url: "/blog/swimming-exercises-hip-osteoarthritis"');
    expect(kb).toContain('url: "/blog/walking-with-arthritis-start-build-up-keep-going"');
    expect(kb).toContain('url: "/faq/arthritis-disability-benefits-uk"');
    expect(kb).toContain('url: "/blog/sick-pay-fit-notes-time-off-work-arthritis"');
    expect(kb).toContain('url: "/blog/carers-allowance-help-if-you-care-for-someone"');
    expect(kb).toContain('url: "/guides/arthritis-pain-relief"');
    expect(kb).not.toMatch(/800-1,200\/mo/i);
  });
});
