/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { getClusterForPath, TOPIC_CLUSTERS } from "@/data/topicClusters";

const REVIEW = "2026-10-02";

const AA_LINKS = [
  "/benefits-pip",
  "/faq/arthritis-disability-benefits-uk",
  "/blog/pip-for-arthritis-uk",
  "/blog/carers-allowance-help-if-you-care-for-someone",
  "/blog/carers-assessment-arthritis-frailty-uk",
  "/resources/pip-evidence-diary",
  "/guides/newly-diagnosed",
  "/guides/arthritis-pain-relief",
  "/blog/joint-protection-easier-everyday-tasks",
];

const FLARE_LINKS = [
  "/arthritis-flare-ups",
  "/resources/flare-action-plan",
  "/guides/arthritis-pain-relief",
  "/blog/energy-management-and-pacing-arthritis",
  "/blog/joint-protection-easier-everyday-tasks",
  "/exercises",
  "/blog/walking-with-arthritis-start-build-up-keep-going",
  "/guides/newly-diagnosed",
  "/benefits-pip",
];

const FATIGUE_LINKS = [
  "/blog/energy-management-and-pacing-arthritis",
  "/guides/arthritis-pain-relief",
  "/exercises",
  "/arthritis-flare-ups",
  "/blog/joint-protection-easier-everyday-tasks",
  "/guides/newly-diagnosed",
  "/blog/access-to-work-scheme-arthritis-guide",
  "/benefits-pip",
];

describe("GSC Champions 59–61 (2 Oct): attendance-allowance + flare-up + fatigue", () => {
  const aa = readFileSync(
    resolve(
      process.cwd(),
      "src/content/blog/posts/attendance-allowance-arthritis-frailty-uk.json",
    ),
    "utf8",
  );
  const flare = readFileSync(
    resolve(process.cwd(), "src/content/blog/posts/arthritis-flare-up-what-to-do.json"),
    "utf8",
  );
  const fatigue = readFileSync(
    resolve(process.cwd(), "src/content/blog/posts/arthritis-fatigue-management-uk.json"),
    "utf8",
  );
  const kb = readFileSync(resolve(process.cwd(), "src/lib/chatbot/knowledgeBase.ts"), "utf8");
  const llms = readFileSync(resolve(process.cwd(), "public/llms.txt"), "utf8");

  const aaJson = JSON.parse(aa) as {
    last_reviewed?: string;
    reviewStatus?: string;
    reviewed_by?: string;
    meta_title?: string;
    citations?: Array<{ url: string }>;
    content: string;
  };
  const flareJson = JSON.parse(flare) as {
    last_reviewed?: string;
    reviewStatus?: string;
    reviewed_by?: string;
    meta_title?: string;
    citations?: Array<{ url: string }>;
    content: string;
  };
  const fatigueJson = JSON.parse(fatigue) as {
    last_reviewed?: string;
    reviewStatus?: string;
    reviewed_by?: string;
    meta_title?: string;
    citations?: Array<{ url: string }>;
    content: string;
  };

  it("Attendance Allowance blog is clinically reviewed 2026-10-02 with CTR meta and customer-job links", () => {
    expect(aaJson.last_reviewed).toBe(REVIEW);
    expect(aaJson.reviewStatus).toBe("reviewed");
    expect(aaJson.reviewed_by).toBe("Louis Maxwell");
    expect(aaJson.meta_title).toMatch(/Attendance Allowance UK for Arthritis/i);
    const urls = (aaJson.citations || []).map((c) => c.url);
    expect(urls).toEqual(
      expect.arrayContaining([
        "https://www.gov.uk/attendance-allowance",
        "https://www.gov.uk/attendance-allowance/eligibility",
        "https://www.gov.uk/pip",
      ]),
    );
    for (const href of AA_LINKS) {
      expect(aaJson.content.includes(`href="${href}"`), `Attendance Allowance missing ${href}`).toBe(
        true,
      );
    }
    expect(aaJson.content).toMatch(/1218461/);
    expect(aaJson.content).toMatch(/HCPC PH128483/);
    expect(aa).not.toMatch(/Oswestry/i);
    expect(aa).not.toMatch(/George Dingley|Crewe CW1/i);
  });

  it("Flare-up blog is clinically reviewed 2026-10-02 with CTR meta, NHS/Arthritis UK cites and customer-job links", () => {
    expect(flareJson.last_reviewed).toBe(REVIEW);
    expect(flareJson.reviewStatus).toBe("reviewed");
    expect(flareJson.reviewed_by).toBe("Louis Maxwell");
    expect(flareJson.meta_title).toMatch(/Arthritis Flare-Up UK/i);
    const urls = (flareJson.citations || []).map((c) => c.url);
    expect(urls).toEqual(
      expect.arrayContaining([
        "https://www.arthritis-uk.org/information-and-support/understanding-arthritis/managing-arthritis-symptoms/managing-arthritis-flare-ups/",
        "https://www.nhs.uk/conditions/rheumatoid-arthritis/",
        "https://www.nhs.uk/conditions/osteoarthritis/",
        "https://www.nice.org.uk/guidance/ng226",
      ]),
    );
    for (const href of FLARE_LINKS) {
      expect(flareJson.content.includes(`href="${href}"`), `Flare missing ${href}`).toBe(true);
    }
    expect(flareJson.content).toMatch(/1218461/);
    expect(flare).not.toMatch(/Oswestry/i);
  });

  it("Fatigue blog is clinically reviewed 2026-10-02 with CTR meta, NHS/Arthritis UK cites and customer-job links", () => {
    expect(fatigueJson.last_reviewed).toBe(REVIEW);
    expect(fatigueJson.reviewStatus).toBe("reviewed");
    expect(fatigueJson.reviewed_by).toBe("Louis Maxwell");
    expect(fatigueJson.meta_title).toMatch(/Arthritis Fatigue UK/i);
    const urls = (fatigueJson.citations || []).map((c) => c.url);
    expect(urls).toEqual(
      expect.arrayContaining([
        "https://www.arthritis-uk.org/information-and-support/understanding-arthritis/managing-arthritis-symptoms/managing-fatigue/",
        "https://www.nhs.uk/live-well/sleep-and-tiredness/",
        "https://www.nice.org.uk/guidance/ng226",
        "https://www.nhs.uk/tests-and-treatments/occupational-therapy/",
      ]),
    );
    for (const href of FATIGUE_LINKS) {
      expect(fatigueJson.content.includes(`href="${href}"`), `Fatigue missing ${href}`).toBe(true);
    }
    expect(fatigueJson.content).toMatch(/1218461/);
    expect(fatigue).not.toMatch(/Oswestry/i);
  });

  it("pip/pain/flare topicClusters front the three champion spokes", () => {
    const pip = TOPIC_CLUSTERS.find((c) => c.id === "pip")!;
    expect(pip.supportingPaths.slice(0, 10)).toEqual(
      expect.arrayContaining(["/blog/attendance-allowance-arthritis-frailty-uk"]),
    );
    expect(getClusterForPath("/blog/attendance-allowance-arthritis-frailty-uk")?.id).toBe("pip");
    const pain = TOPIC_CLUSTERS.find((c) => c.id === "pain")!;
    expect(pain.supportingPaths).toEqual(
      expect.arrayContaining([
        "/blog/arthritis-fatigue-management-uk",
        "/blog/arthritis-flare-up-what-to-do",
      ]),
    );
    const flareCluster = TOPIC_CLUSTERS.find((c) => c.id === "flare-ups")!;
    expect(flareCluster.supportingPaths).toEqual(
      expect.arrayContaining([
        "/blog/arthritis-flare-up-what-to-do",
        "/blog/arthritis-fatigue-management-uk",
      ]),
    );
    expect(getClusterForPath("/blog/arthritis-flare-up-what-to-do")?.id).toMatch(/flare-ups|pain/);
    expect(getClusterForPath("/blog/arthritis-fatigue-management-uk")?.id).toMatch(
      /pain|flare-ups|symptoms/,
    );
  });

  it("chatbot KB and llms.txt surface the three gold-pass URLs", () => {
    expect(kb).toContain('url: "/blog/attendance-allowance-arthritis-frailty-uk"');
    expect(kb).toContain('url: "/blog/arthritis-flare-up-what-to-do"');
    expect(kb).toContain('url: "/blog/arthritis-fatigue-management-uk"');
    expect(llms).toContain(
      "https://livingwitharthritis.org.uk/blog/attendance-allowance-arthritis-frailty-uk",
    );
    expect(llms).toContain("https://livingwitharthritis.org.uk/blog/arthritis-flare-up-what-to-do");
    expect(llms).toContain(
      "https://livingwitharthritis.org.uk/blog/arthritis-fatigue-management-uk",
    );
    expect(kb).not.toMatch(/800-1,200\/mo/i);
  });
});
