/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { getClusterForPath, TOPIC_CLUSTERS } from "@/data/topicClusters";

const REVIEW = "2026-09-29";

const ABOUT_LINKS = [
  "/guides/newly-diagnosed",
  "/guides/arthritis-pain-relief",
  "/conditions/osteoarthritis",
  "/exercises",
  "/benefits-pip",
  "/faq/arthritis-disability-benefits-uk",
  "/symptom-checker",
  "/diet",
];

const NEWLY_LINKS = [
  "/guides/arthritis-pain-relief",
  "/conditions/osteoarthritis",
  "/benefits-pip",
  "/faq/arthritis-disability-benefits-uk",
  "/blog/access-to-work-scheme-arthritis-guide",
  "/exercises",
  "/blog/walking-with-arthritis-start-build-up-keep-going",
  "/blog/swimming-exercises-hip-osteoarthritis",
  "/blog/joint-protection-easier-everyday-tasks",
  "/symptom-checker",
];

const ACCESS_LINKS = [
  "/benefits-pip",
  "/faq/arthritis-disability-benefits-uk",
  "/blog/pip-for-arthritis-uk",
  "/blog/sick-pay-fit-notes-time-off-work-arthritis",
  "/blog/carers-allowance-help-if-you-care-for-someone",
  "/guides/newly-diagnosed",
  "/guides/arthritis-pain-relief",
  "/library/access-to-work",
];

const WALKING_LINKS = [
  "/exercises",
  "/blog/swimming-exercises-hip-osteoarthritis",
  "/blog/best-walking-shoes-arthritis-uk",
  "/conditions/osteoarthritis",
  "/guides/arthritis-pain-relief",
  "/guides/newly-diagnosed",
  "/blog/joint-protection-easier-everyday-tasks",
  "/benefits-pip",
];

describe("GSC Champions 49–52 (29 Sep): about + newly-diagnosed + Access to Work + walking", () => {
  const about = readFileSync(resolve(process.cwd(), "src/pages/AboutUs.tsx"), "utf8");
  const newly = readFileSync(
    resolve(process.cwd(), "src/pages/guides/NewlyDiagnosed.tsx"),
    "utf8",
  );
  const access = readFileSync(
    resolve(process.cwd(), "src/content/blog/posts/access-to-work-scheme-arthritis-guide.json"),
    "utf8",
  );
  const walking = readFileSync(
    resolve(
      process.cwd(),
      "src/content/blog/posts/walking-with-arthritis-start-build-up-keep-going.json",
    ),
    "utf8",
  );
  const kb = readFileSync(resolve(process.cwd(), "src/lib/chatbot/knowledgeBase.ts"), "utf8");
  const accessJson = JSON.parse(access) as {
    last_reviewed?: string;
    reviewStatus?: string;
    reviewed_by?: string;
    meta_title?: string;
    citations?: Array<{ url: string }>;
    content: string;
  };
  const walkingJson = JSON.parse(walking) as {
    last_reviewed?: string;
    reviewStatus?: string;
    content: string;
  };

  it("About page has review 2026-09-29, customer-job CRO links, no private address", () => {
    expect(about).toContain(`EducationalDisclaimerBox lastReviewed="${REVIEW}"`);
    expect(about).toMatch(/Registered charity 1218461 · Free guides/);
    for (const href of ABOUT_LINKS) {
      expect(
        about.includes(`to="${href}"`) || about.includes(`"${href}"`),
        `About missing ${href}`,
      ).toBe(true);
    }
    expect(about).toMatch(/Gift Aid/);
    expect(about).not.toMatch(/Oswestry/i);
    expect(about).not.toMatch(/George Dingley|Crewe CW1/i);
    expect(about).not.toMatch(/800-1,200\/mo/i);
  });

  it("Newly diagnosed has review 2026-09-29, cluster nav, NHS/NICE cites, dense customer-job links", () => {
    expect(newly).toContain(`EducationalDisclaimerBox lastReviewed="${REVIEW}"`);
    expect(newly).toContain(`lastReviewed: "${REVIEW}"`);
    expect(newly).toContain('<TopicClusterNav path="/guides/newly-diagnosed" />');
    expect(
      [...newly.matchAll(/https?:\/\/[^\s"'<>]+/gi)].some((match) =>
        /^https:\/\/(?:[a-z0-9-]+\.)*nhs\.uk\/conditions\/arthritis(?:\/|$)/i.test(match[0]),
      ),
    ).toBe(true);
    expect(
      [...newly.matchAll(/https?:\/\/[^\s"'<>]+/gi)].some((match) =>
        /^https:\/\/(?:[a-z0-9-]+\.)*nice\.org\.uk\/guidance\/ng226(?:\/|$)/i.test(match[0]),
      ),
    ).toBe(true);
    expect(
      [...newly.matchAll(/https?:\/\/[^\s"'<>]+/gi)].some((match) =>
        /^https:\/\/(?:[a-z0-9-]+\.)*nice\.org\.uk\/guidance\/ng100(?:\/|$)/i.test(match[0]),
      ),
    ).toBe(true);
    expect(
      [...newly.matchAll(/https?:\/\/[^\s"'<>]+/gi)].some((match) =>
        /^https:\/\/(?:[a-z0-9-]+\.)*arthritis-uk\.org(?:\/|$)/i.test(match[0]),
      ),
    ).toBe(true);
    for (const href of NEWLY_LINKS) {
      expect(
        newly.includes(`to="${href}"`) || newly.includes(`"${href}"`),
        `Newly diagnosed missing ${href}`,
      ).toBe(true);
    }
    expect(newly).not.toMatch(/Oswestry/i);
    expect(getClusterForPath("/guides/newly-diagnosed")?.id).toBe("symptoms");
  });

  it("Access to Work blog (rewritten in Benefits batch 3, pending re-review) keeps GOV.UK citations and customer-job links", () => {
    expect(accessJson.reviewStatus).toBe("pending");
    expect(accessJson.last_reviewed).toBeUndefined();
    expect(accessJson.meta_title).toMatch(/Access to Work for Arthritis: .*\(UK\)/i);
    const urls = (accessJson.citations || []).map((c) => c.url);
    expect(urls).toEqual(
      expect.arrayContaining([
        "https://www.gov.uk/access-to-work",
        "https://www.gov.uk/definition-of-disability-under-equality-act-2010",
        "https://www.gov.uk/reasonable-adjustments-for-disabled-workers",
        "https://www.gov.uk/pip",
      ]),
    );
    for (const href of ACCESS_LINKS) {
      expect(accessJson.content.includes(`href="${href}"`), `Access to Work missing ${href}`).toBe(
        true,
      );
    }
    expect(
      [...accessJson.content.matchAll(/https?:\/\/[^\s"'<>]+/gi)].some((match) =>
        /^https:\/\/(?:[a-z0-9-]+\.)*gov\.uk\/access-to-work(?:\/|$)/.test(match[0]),
      ),
    ).toBe(true);
    expect(access).not.toMatch(/Oswestry/i);
  });

  it("Walking with arthritis blog has review 2026-09-29 and denser customer-job links", () => {
    expect(walkingJson.last_reviewed).toBe(REVIEW);
    expect(walkingJson.reviewStatus).toBe("reviewed");
    for (const href of WALKING_LINKS) {
      expect(walkingJson.content.includes(`href="${href}"`), `Walking missing ${href}`).toBe(true);
    }
    expect(walking).toMatch(/nhs\.uk|NICE/i);
    expect(walking).not.toMatch(/Oswestry/i);
  });

  it("symptoms topicCluster fronts newly-diagnosed customer-job spokes", () => {
    const symptoms = TOPIC_CLUSTERS.find((c) => c.id === "symptoms")!;
    expect(symptoms.pillarPath).toBe("/guides/newly-diagnosed");
    expect(symptoms.supportingPaths).toEqual(
      expect.arrayContaining([
        "/symptom-checker",
        "/conditions/osteoarthritis",
        "/guides/arthritis-pain-relief",
        "/exercises",
        "/blog/walking-with-arthritis-start-build-up-keep-going",
        "/blog/joint-protection-easier-everyday-tasks",
      ]),
    );
    // PIP cluster keeps ownership of Access to Work / disability FAQ (do not steal into symptoms)
    expect(getClusterForPath("/blog/access-to-work-scheme-arthritis-guide")?.id).toBe("pip");
    expect(getClusterForPath("/faq/arthritis-disability-benefits-uk")?.id).toBe("pip");
  });

  it("chatbot KB points newly-diagnosed intent at the real checklist URL plus work/PIP spokes", () => {
    expect(kb).toContain('url: "/guides/newly-diagnosed"');
    expect(kb).toContain('url: "/blog/access-to-work-scheme-arthritis-guide"');
    expect(kb).toContain('url: "/guides/arthritis-pain-relief"');
    expect(kb).toContain('url: "/about"');
    expect(kb).not.toMatch(/800-1,200\/mo/i);
  });
});
