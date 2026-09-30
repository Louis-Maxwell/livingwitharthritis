/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { getClusterForPath, TOPIC_CLUSTERS } from "@/data/topicClusters";

const REVIEW = "2026-09-30";

const SICK_LINKS = [
  "/blog/access-to-work-scheme-arthritis-guide",
  "/benefits-pip",
  "/faq/arthritis-disability-benefits-uk",
  "/blog/pip-for-arthritis-uk",
  "/blog/carers-allowance-help-if-you-care-for-someone",
  "/guides/newly-diagnosed",
  "/guides/arthritis-pain-relief",
  "/guides/work-with-arthritis",
];

const CARERS_LINKS = [
  "/benefits-pip",
  "/faq/arthritis-disability-benefits-uk",
  "/blog/pip-for-arthritis-uk",
  "/blog/carers-assessment-arthritis-frailty-uk",
  "/blog/sick-pay-fit-notes-time-off-work-arthritis",
  "/blog/access-to-work-scheme-arthritis-guide",
  "/guides/newly-diagnosed",
  "/guides/arthritis-pain-relief",
];

const JOINT_LINKS = [
  "/conditions/osteoarthritis",
  "/guides/arthritis-pain-relief",
  "/exercises",
  "/blog/walking-with-arthritis-start-build-up-keep-going",
  "/blog/swimming-exercises-hip-osteoarthritis",
  "/blog/energy-management-and-pacing-arthritis",
  "/guides/newly-diagnosed",
  "/benefits-pip",
];

describe("GSC Champions 53–55 (30 Sep): sick-pay + carers + joint-protection", () => {
  const sick = readFileSync(
    resolve(process.cwd(), "src/content/blog/posts/sick-pay-fit-notes-time-off-work-arthritis.json"),
    "utf8",
  );
  const carers = readFileSync(
    resolve(
      process.cwd(),
      "src/content/blog/posts/carers-allowance-help-if-you-care-for-someone.json",
    ),
    "utf8",
  );
  const joint = readFileSync(
    resolve(process.cwd(), "src/content/blog/posts/joint-protection-easier-everyday-tasks.json"),
    "utf8",
  );
  const kb = readFileSync(resolve(process.cwd(), "src/lib/chatbot/knowledgeBase.ts"), "utf8");
  const llms = readFileSync(resolve(process.cwd(), "public/llms.txt"), "utf8");

  const sickJson = JSON.parse(sick) as {
    last_reviewed?: string;
    reviewStatus?: string;
    reviewed_by?: string;
    meta_title?: string;
    citations?: Array<{ url: string }>;
    content: string;
  };
  const carersJson = JSON.parse(carers) as {
    last_reviewed?: string;
    reviewStatus?: string;
    reviewed_by?: string;
    meta_title?: string;
    citations?: Array<{ url: string }>;
    content: string;
  };
  const jointJson = JSON.parse(joint) as {
    last_reviewed?: string;
    reviewStatus?: string;
    reviewed_by?: string;
    meta_title?: string;
    citations?: Array<{ url: string }>;
    content: string;
  };

  it("Sick pay blog is clinically reviewed 2026-09-30 with CTR meta, GOV.UK cites and customer-job links", () => {
    expect(sickJson.last_reviewed).toBe(REVIEW);
    expect(sickJson.reviewStatus).toBe("reviewed");
    expect(sickJson.reviewed_by).toBe("Louis Maxwell");
    expect(sickJson.meta_title).toMatch(/Sick Pay & Fit Notes for Arthritis UK/i);
    const urls = (sickJson.citations || []).map((c) => c.url);
    expect(urls).toEqual(
      expect.arrayContaining([
        "https://www.gov.uk/statutory-sick-pay",
        "https://www.gov.uk/taking-sick-leave",
        "https://www.gov.uk/definition-of-disability-under-equality-act-2010",
        "https://www.gov.uk/pip",
      ]),
    );
    for (const href of SICK_LINKS) {
      expect(sickJson.content.includes(`href="${href}"`), `Sick pay missing ${href}`).toBe(true);
    }
    expect(sickJson.content).toMatch(/1218461/);
    expect(sickJson.content).toMatch(/HCPC PH128483/);
    expect(sick).not.toMatch(/Oswestry/i);
    expect(sick).not.toMatch(/George Dingley|Crewe CW1/i);
  });

  it("Carer's Allowance blog is clinically reviewed 2026-09-30 with CTR meta and customer-job links", () => {
    expect(carersJson.last_reviewed).toBe(REVIEW);
    expect(carersJson.reviewStatus).toBe("reviewed");
    expect(carersJson.reviewed_by).toBe("Louis Maxwell");
    expect(carersJson.meta_title).toMatch(/Carer's Allowance UK for Arthritis Care/i);
    const urls = (carersJson.citations || []).map((c) => c.url);
    expect(urls).toEqual(
      expect.arrayContaining([
        "https://www.gov.uk/carers-allowance",
        "https://www.nhs.uk/social-care-and-support/support-and-benefits-for-carers/carer-assessments/",
        "https://www.gov.uk/pip",
      ]),
    );
    for (const href of CARERS_LINKS) {
      expect(carersJson.content.includes(`href="${href}"`), `Carers missing ${href}`).toBe(true);
    }
    expect(carersJson.content).toMatch(/1218461/);
    expect(carers).not.toMatch(/Oswestry/i);
  });

  it("Joint protection blog is clinically reviewed 2026-09-30 with CTR meta, NHS/NICE cites and customer-job links", () => {
    expect(jointJson.last_reviewed).toBe(REVIEW);
    expect(jointJson.reviewStatus).toBe("reviewed");
    expect(jointJson.reviewed_by).toBe("Louis Maxwell");
    expect(jointJson.meta_title).toMatch(/Joint Protection for Arthritis UK/i);
    const urls = (jointJson.citations || []).map((c) => c.url);
    expect(urls).toEqual(
      expect.arrayContaining([
        "https://www.nhs.uk/tests-and-treatments/occupational-therapy/",
        "https://www.nice.org.uk/guidance/ng226",
      ]),
    );
    expect(urls.some((u) => /versusarthritis\.org/i.test(u))).toBe(true);
    for (const href of JOINT_LINKS) {
      expect(jointJson.content.includes(`href="${href}"`), `Joint protection missing ${href}`).toBe(
        true,
      );
    }
    expect(jointJson.content).toMatch(/1218461/);
    expect(joint).not.toMatch(/Oswestry/i);
  });

  it("pip/osteoarthritis topicClusters front the three champion spokes", () => {
    const pip = TOPIC_CLUSTERS.find((c) => c.id === "pip")!;
    expect(pip.supportingPaths.slice(0, 7)).toEqual(
      expect.arrayContaining([
        "/blog/sick-pay-fit-notes-time-off-work-arthritis",
        "/blog/carers-allowance-help-if-you-care-for-someone",
      ]),
    );
    expect(getClusterForPath("/blog/sick-pay-fit-notes-time-off-work-arthritis")?.id).toBe("pip");
    expect(getClusterForPath("/blog/carers-allowance-help-if-you-care-for-someone")?.id).toBe("pip");
    const oa = TOPIC_CLUSTERS.find((c) => c.id === "osteoarthritis")!;
    expect(oa.supportingPaths).toEqual(
      expect.arrayContaining(["/blog/joint-protection-easier-everyday-tasks"]),
    );
    expect(getClusterForPath("/blog/joint-protection-easier-everyday-tasks")?.id).toMatch(
      /osteoarthritis|pain|symptoms/,
    );
  });

  it("chatbot KB and llms.txt surface the three gold-pass URLs", () => {
    expect(kb).toContain('url: "/blog/sick-pay-fit-notes-time-off-work-arthritis"');
    expect(kb).toContain('url: "/blog/carers-allowance-help-if-you-care-for-someone"');
    expect(kb).toContain('url: "/blog/joint-protection-easier-everyday-tasks"');
    expect(llms).toContain(
      "https://livingwitharthritis.org.uk/blog/sick-pay-fit-notes-time-off-work-arthritis",
    );
    expect(llms).toContain(
      "https://livingwitharthritis.org.uk/blog/carers-allowance-help-if-you-care-for-someone",
    );
    expect(llms).toContain(
      "https://livingwitharthritis.org.uk/blog/joint-protection-easier-everyday-tasks",
    );
    expect(kb).not.toMatch(/800-1,200\/mo/i);
  });
});
