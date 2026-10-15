/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { getClusterForPath, TOPIC_CLUSTERS } from "@/data/topicClusters";

const REVIEW = "2026-10-01";

const CARERS_LINKS = [
  "/blog/carers-allowance-help-if-you-care-for-someone",
  "/benefits-pip",
  "/faq/arthritis-disability-benefits-uk",
  "/blog/pip-for-arthritis-uk",
  "/blog/sick-pay-fit-notes-time-off-work-arthritis",
  "/blog/access-to-work-scheme-arthritis-guide",
  "/guides/newly-diagnosed",
  "/guides/arthritis-pain-relief",
];

const PACING_LINKS = [
  "/guides/arthritis-pain-relief",
  "/exercises",
  "/blog/joint-protection-easier-everyday-tasks",
  "/blog/walking-with-arthritis-start-build-up-keep-going",
  "/arthritis-flare-ups",
  "/guides/newly-diagnosed",
  "/blog/access-to-work-scheme-arthritis-guide",
  "/benefits-pip",
];

const WORK_LINKS = [
  "/blog/access-to-work-scheme-arthritis-guide",
  "/blog/sick-pay-fit-notes-time-off-work-arthritis",
  "/guides/work-with-arthritis",
  "/blog/energy-management-and-pacing-arthritis",
  "/benefits-pip",
  "/faq/arthritis-disability-benefits-uk",
  "/guides/newly-diagnosed",
  "/guides/arthritis-pain-relief",
];

describe("GSC Champions 56–58 (1 Oct): carers-assessment + pacing + work", () => {
  const carers = readFileSync(
    resolve(
      process.cwd(),
      "src/content/blog/posts/carers-assessment-arthritis-frailty-uk.json",
    ),
    "utf8",
  );
  const pacing = readFileSync(
    resolve(
      process.cwd(),
      "src/content/blog/posts/energy-management-and-pacing-arthritis.json",
    ),
    "utf8",
  );
  const work = readFileSync(
    resolve(process.cwd(), "src/content/blog/posts/arthritis-and-work-uk.json"),
    "utf8",
  );
  const kb = readFileSync(resolve(process.cwd(), "src/lib/chatbot/knowledgeBase.ts"), "utf8");
  const llms = readFileSync(resolve(process.cwd(), "public/llms.txt"), "utf8");

  const carersJson = JSON.parse(carers) as {
    last_reviewed?: string;
    reviewStatus?: string;
    reviewed_by?: string;
    meta_title?: string;
    citations?: Array<{ url: string }>;
    content: string;
  };
  const pacingJson = JSON.parse(pacing) as {
    last_reviewed?: string;
    reviewStatus?: string;
    reviewed_by?: string;
    meta_title?: string;
    citations?: Array<{ url: string }>;
    content: string;
  };
  const workJson = JSON.parse(work) as {
    last_reviewed?: string;
    reviewStatus?: string;
    reviewed_by?: string;
    meta_title?: string;
    citations?: Array<{ url: string }>;
    content: string;
  };

  it("Carer's assessment blog is clinically reviewed 2026-10-01 with CTR meta and customer-job links", () => {
    expect(carersJson.last_reviewed).toBe(REVIEW);
    expect(carersJson.reviewStatus).toBe("reviewed");
    expect(carersJson.reviewed_by).toBe("Louis Maxwell");
    expect(carersJson.meta_title).toMatch(/Carer's Assessment UK for Arthritis Care/i);
    const urls = (carersJson.citations || []).map((c) => c.url);
    expect(urls).toEqual(
      expect.arrayContaining([
        "https://www.nhs.uk/social-care-and-support/support-and-benefits-for-carers/carer-assessments/",
        "https://www.gov.uk/carers-allowance",
        "https://www.nhs.uk/social-care-and-support/",
      ]),
    );
    for (const href of CARERS_LINKS) {
      expect(carersJson.content.includes(`href="${href}"`), `Carers assessment missing ${href}`).toBe(
        true,
      );
    }
    expect(carersJson.content).toMatch(/1218461/);
    expect(carersJson.content).toMatch(/HCPC PH128483/);
    expect(carers).not.toMatch(/Oswestry/i);
    expect(carers).not.toMatch(/George Dingley|Crewe CW1/i);
  });

  it("Pacing blog is clinically reviewed 2026-10-01 with CTR meta, NHS/NICE cites and customer-job links", () => {
    expect(pacingJson.last_reviewed).toBe(REVIEW);
    expect(pacingJson.reviewStatus).toBe("reviewed");
    expect(pacingJson.reviewed_by).toBe("Louis Maxwell");
    expect(pacingJson.meta_title).toMatch(/Pacing & Energy Management for Arthritis Fatigue UK/i);
    const urls = (pacingJson.citations || []).map((c) => c.url);
    expect(urls).toEqual(
      expect.arrayContaining([
        "https://www.nhs.uk/live-well/sleep-and-tiredness/",
        "https://www.nice.org.uk/guidance/ng226",
        "https://www.nhs.uk/tests-and-treatments/occupational-therapy/",
      ]),
    );
    expect(urls.some((u) => /^https:\/\/(?:[a-z0-9-]+\.)*arthritis-uk\.org(?:\/|$)/i.test(u))).toBe(true);
    for (const href of PACING_LINKS) {
      expect(pacingJson.content.includes(`href="${href}"`), `Pacing missing ${href}`).toBe(true);
    }
    expect(pacingJson.content).toMatch(/1218461/);
    expect(pacing).not.toMatch(/Oswestry/i);
  });

  it("Arthritis at work blog is clinically reviewed 2026-10-01 with CTR meta, GOV.UK cites and customer-job links", () => {
    expect(workJson.last_reviewed).toBe(REVIEW);
    expect(workJson.reviewStatus).toBe("reviewed");
    expect(workJson.reviewed_by).toBe("Louis Maxwell");
    expect(workJson.meta_title).toMatch(/Arthritis at Work UK: Rights, Adjustments/i);
    const urls = (workJson.citations || []).map((c) => c.url);
    expect(urls).toEqual(
      expect.arrayContaining([
        "https://www.gov.uk/definition-of-disability-under-equality-act-2010",
        "https://www.gov.uk/access-to-work",
        "https://www.gov.uk/flexible-working",
        "https://www.acas.org.uk/reasonable-adjustments",
      ]),
    );
    for (const href of WORK_LINKS) {
      expect(workJson.content.includes(`href="${href}"`), `Work missing ${href}`).toBe(true);
    }
    expect(workJson.content).toMatch(/1218461/);
    expect(work).not.toMatch(/Oswestry/i);
  });

  it("pip/pain/flare topicClusters front the three champion spokes", () => {
    const pip = TOPIC_CLUSTERS.find((c) => c.id === "pip")!;
    expect(pip.supportingPaths.slice(0, 8)).toEqual(
      expect.arrayContaining([
        "/blog/carers-assessment-arthritis-frailty-uk",
        "/blog/arthritis-and-work-uk",
      ]),
    );
    expect(getClusterForPath("/blog/carers-assessment-arthritis-frailty-uk")?.id).toBe("pip");
    expect(getClusterForPath("/blog/arthritis-and-work-uk")?.id).toBe("pip");
    const pain = TOPIC_CLUSTERS.find((c) => c.id === "pain")!;
    expect(pain.supportingPaths).toEqual(
      expect.arrayContaining(["/blog/energy-management-and-pacing-arthritis"]),
    );
    const flare = TOPIC_CLUSTERS.find((c) => c.id === "flare-ups")!;
    expect(flare.supportingPaths).toEqual(
      expect.arrayContaining(["/blog/energy-management-and-pacing-arthritis"]),
    );
    expect(getClusterForPath("/blog/energy-management-and-pacing-arthritis")?.id).toMatch(
      /pain|flare-ups|symptoms/,
    );
  });

  it("chatbot KB and llms.txt surface the three gold-pass URLs", () => {
    expect(kb).toContain('url: "/blog/carers-assessment-arthritis-frailty-uk"');
    expect(kb).toContain('url: "/blog/energy-management-and-pacing-arthritis"');
    expect(kb).toContain('url: "/blog/arthritis-and-work-uk"');
    expect(llms).toContain(
      "https://livingwitharthritis.org.uk/blog/carers-assessment-arthritis-frailty-uk",
    );
    expect(llms).toContain(
      "https://livingwitharthritis.org.uk/blog/energy-management-and-pacing-arthritis",
    );
    expect(llms).toContain("https://livingwitharthritis.org.uk/blog/arthritis-and-work-uk");
    expect(kb).not.toMatch(/800-1,200\/mo/i);
  });
});
