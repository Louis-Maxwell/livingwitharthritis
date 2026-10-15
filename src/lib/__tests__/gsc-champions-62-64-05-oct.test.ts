/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { getClusterForPath, TOPIC_CLUSTERS } from "@/data/topicClusters";

type Post = {
  last_reviewed?: string;
  reviewStatus?: string;
  reviewed_by?: string | null;
  reviewer_credentials?: string | null;
  meta_title?: string;
  meta_description?: string;
  citations?: Array<{ url: string }>;
  content: string;
};

const read = (slug: string) =>
  readFileSync(resolve(process.cwd(), `src/content/blog/posts/${slug}.json`), "utf8");

const SLEEP_LINKS = [
  "/guides/arthritis-pain-relief",
  "/blog/arthritis-fatigue-management-uk",
  "/blog/energy-management-and-pacing-arthritis",
  "/arthritis-flare-ups",
  "/resources/flare-action-plan",
  "/exercises",
  "/blog/arthritis-and-mental-health-uk",
  "/guides/newly-diagnosed",
  "/benefits-pip",
];

const MH_LINKS = [
  "/arthritis-mental-health",
  "/blog/how-to-sleep-with-arthritis-uk",
  "/blog/arthritis-fatigue-management-uk",
  "/blog/energy-management-and-pacing-arthritis",
  "/resources/flare-action-plan",
  "/exercises",
  "/guides/newly-diagnosed",
  "/benefits-pip",
  "/blog/carers-assessment-arthritis-frailty-uk",
];

const COLD_LINKS = [
  "/guides/arthritis-pain-relief",
  "/exercises",
  "/blog/walking-with-arthritis-start-build-up-keep-going",
  "/blog/staying-active-arthritis-winter-uk",
  "/arthritis-flare-ups",
  "/blog/how-to-sleep-with-arthritis-uk",
  "/blog/attendance-allowance-arthritis-frailty-uk",
  "/benefits-pip",
];

const cases: Array<{
  name: string;
  slug: string;
  title: RegExp;
  cites: string[];
  links: string[];
}> = [
  {
    name: "Sleep",
    slug: "how-to-sleep-with-arthritis-uk",
    title: /How to Sleep with Arthritis: .*\(UK\)/i,
    cites: [
      "https://www.nhs.uk/conditions/insomnia/",
      "https://www.nhs.uk/conditions/sleep-apnoea/",
      "https://www.nice.org.uk/guidance/ng226",
    ],
    links: SLEEP_LINKS,
  },
  {
    name: "Mental health",
    slug: "arthritis-and-mental-health-uk",
    title: /Arthritis & Mental Health UK/i,
    cites: [
      "https://www.nhs.uk/mental-health/talking-therapies-medicine-treatments/talking-therapies-and-counselling/nhs-talking-therapies/",
      "https://www.nice.org.uk/guidance/cg91",
      "https://www.samaritans.org/",
    ],
    links: MH_LINKS,
  },
  {
    name: "Cold weather",
    slug: "cold-weather-arthritis-uk-winter",
    title: /Cold Weather Arthritis: .*\(UK\)/i,
    cites: [
      "https://www.nhs.uk/live-well/seasonal-health/keep-warm-keep-well/",
      "https://www.nhs.uk/conditions/vitamins-and-minerals/vitamin-d/",
      "https://www.gov.uk/winter-fuel-payment",
      "https://www.gov.uk/cold-weather-payment",
    ],
    links: COLD_LINKS,
  },
];

describe("GSC Champions 62–64 (5 Oct): sleep + mental health + cold weather", () => {
  for (const c of cases) {
    it(`${c.name} blog is pending clinical review (no reviewer or review date claimed) with CTR meta, UK cites and customer-job links`, () => {
      const raw = read(c.slug);
      const json = JSON.parse(raw) as Post;
      // Not yet clinically reviewed by Louis Maxwell: pending, with no reviewer
      // name or review date claimed anywhere in the post.
      expect(json.reviewStatus).toBe("pending");
      expect(json.last_reviewed).toBeUndefined();
      expect(json.reviewed_by).toBeNull();
      expect(json.reviewer_credentials).toBeNull();
      expect(json.content).not.toMatch(/Reviewed by/i);
      expect(json.content).toMatch(/Pending clinical review\./);
      expect(json.meta_title).toMatch(c.title);
      expect((json.meta_title || "").length).toBeLessThanOrEqual(60);
      expect((json.meta_description || "").length).toBeLessThanOrEqual(155);
      const urls = (json.citations || []).map((x) => x.url);
      expect(urls).toEqual(expect.arrayContaining(c.cites));
      for (const href of c.links) {
        expect(json.content.includes(`href="${href}"`), `${c.name} missing ${href}`).toBe(true);
      }
      expect(json.content).toMatch(/1218461/);
      expect(raw).not.toMatch(/Oswestry/i);
      expect(raw).not.toMatch(/George Dingley|Crewe CW1/i);
    });
  }

  it("drops unverifiable statistics from the old template copy", () => {
    expect(read("how-to-sleep-with-arthritis-uk")).not.toMatch(/80% of people/i);
    expect(read("arthritis-and-mental-health-uk")).not.toMatch(/2-3 times more likely/i);
    expect(read("cold-weather-arthritis-uk-winter")).not.toMatch(/25% less pain/i);
  });

  it("mental health blog surfaces crisis routes", () => {
    const json = JSON.parse(read("arthritis-and-mental-health-uk")) as Post;
    expect(json.content).toMatch(/116 123/);
    expect(json.content).toMatch(/999/);
    expect(json.content).toMatch(/NHS 111/);
  });

  it("pain and flare-up clusters front the three champion spokes", () => {
    const pain = TOPIC_CLUSTERS.find((c) => c.id === "pain")!;
    expect(pain.supportingPaths).toEqual(
      expect.arrayContaining([
        "/blog/how-to-sleep-with-arthritis-uk",
        "/blog/cold-weather-arthritis-uk-winter",
      ]),
    );
    const flare = TOPIC_CLUSTERS.find((c) => c.id === "flare-ups")!;
    expect(flare.supportingPaths).toEqual(
      expect.arrayContaining(["/blog/arthritis-and-mental-health-uk"]),
    );
    expect(getClusterForPath("/blog/how-to-sleep-with-arthritis-uk")?.id).toMatch(/pain|flare-ups/);
    expect(getClusterForPath("/blog/cold-weather-arthritis-uk-winter")?.id).toBe("pain");
    expect(getClusterForPath("/blog/arthritis-and-mental-health-uk")?.id).toBe("flare-ups");
  });

  it("chatbot KB and llms.txt surface the three gold-pass URLs", () => {
    const kb = readFileSync(resolve(process.cwd(), "src/lib/chatbot/knowledgeBase.ts"), "utf8");
    const llms = readFileSync(resolve(process.cwd(), "public/llms.txt"), "utf8");
    for (const slug of cases.map((c) => c.slug)) {
      expect(kb).toContain(`url: "/blog/${slug}"`);
      expect(llms).toContain(`https://livingwitharthritis.org.uk/blog/${slug}`);
    }
  });
});
