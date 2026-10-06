/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { getClusterForPath, TOPIC_CLUSTERS } from "@/data/topicClusters";

const REVIEW = "2026-10-06";

type Post = {
  last_reviewed?: string;
  reviewStatus?: string;
  reviewed_by?: string;
  meta_title?: string;
  meta_description?: string;
  citations?: Array<{ url: string }>;
  content: string;
};

const read = (slug: string) =>
  readFileSync(resolve(process.cwd(), `src/content/blog/posts/${slug}.json`), "utf8");

const cases: Array<{
  name: string;
  slug: string;
  title: RegExp;
  cites: string[];
  links: string[];
}> = [
  {
    name: "Staying active in winter",
    slug: "staying-active-arthritis-winter-uk",
    title: /Staying Active with Arthritis in Winter UK/i,
    cites: [
      "https://www.nhs.uk/live-well/exercise/physical-activity-guidelines-older-adults/",
      "https://www.nhs.uk/conditions/falls/",
      "https://www.nice.org.uk/guidance/ng226",
    ],
    links: [
      "/exercises",
      "/blog/walking-with-arthritis-start-build-up-keep-going",
      "/blog/swimming-exercises-hip-osteoarthritis",
      "/blog/cold-weather-arthritis-uk-winter",
      "/blog/energy-management-and-pacing-arthritis",
      "/guides/fall-prevention-older-adults",
      "/arthritis-flare-ups",
      "/guides/arthritis-pain-relief",
      "/guides/newly-diagnosed",
    ],
  },
  {
    name: "Depression",
    slug: "depression-arthritis-when-to-seek-help",
    title: /Depression and Arthritis UK/i,
    cites: [
      "https://www.nhs.uk/mental-health/conditions/depression-in-adults/overview/",
      "https://www.nhs.uk/mental-health/talking-therapies-medicine-treatments/talking-therapies-and-counselling/nhs-talking-therapies/",
      "https://www.nice.org.uk/guidance/cg91",
      "https://www.samaritans.org/",
    ],
    links: [
      "/arthritis-mental-health",
      "/blog/arthritis-and-mental-health-uk",
      "/blog/how-to-sleep-with-arthritis-uk",
      "/blog/energy-management-and-pacing-arthritis",
      "/resources/flare-action-plan",
      "/exercises",
      "/blog/carers-assessment-arthritis-frailty-uk",
      "/benefits-pip",
      "/guides/newly-diagnosed",
    ],
  },
  {
    name: "Flu jab",
    slug: "flu-jab-arthritis-frailty-uk",
    title: /Flu Jab and Arthritis UK/i,
    cites: [
      "https://www.nhs.uk/vaccinations/flu-vaccine/",
      "https://www.nhs.uk/conditions/flu/",
      "https://www.nhs.uk/vaccinations/pneumococcal-vaccine/",
    ],
    links: [
      "/blog/vaccines-on-dmards-and-biologics-uk-guide",
      "/blog/biologic-side-effects-infections-injections-and-monitoring",
      "/conditions/rheumatoid-arthritis",
      "/blog/carers-allowance-help-if-you-care-for-someone",
      "/blog/cold-weather-arthritis-uk-winter",
      "/blog/staying-active-arthritis-winter-uk",
      "/arthritis-flare-ups",
      "/guides/newly-diagnosed",
    ],
  },
];

describe("GSC Champions 65–67 (6 Oct): winter activity + depression + flu jab", () => {
  for (const c of cases) {
    it(`${c.name} blog is clinically reviewed ${REVIEW} with CTR meta, UK cites and customer-job links`, () => {
      const raw = read(c.slug);
      const json = JSON.parse(raw) as Post;
      expect(json.last_reviewed).toBe(REVIEW);
      expect(json.reviewStatus).toBe("reviewed");
      expect(json.reviewed_by).toBe("Louis Maxwell");
      expect(json.meta_title).toMatch(c.title);
      expect((json.meta_title || "").length).toBeLessThanOrEqual(60);
      expect((json.meta_description || "").length).toBeLessThanOrEqual(155);
      const urls = (json.citations || []).map((x) => x.url);
      expect(urls).toEqual(expect.arrayContaining(c.cites));
      for (const href of c.links) {
        expect(json.content.includes(`href="${href}"`), `${c.name} missing ${href}`).toBe(true);
      }
      expect(json.content).toMatch(/1218461/);
      expect(json.content).toMatch(/HCPC PH128483/);
      expect(raw).not.toMatch(/Oswestry/i);
      expect(raw).not.toMatch(/George Dingley|Crewe CW1/i);
    });
  }

  it("drops unverifiable statistics and template copy", () => {
    const winter = read("staying-active-arthritis-winter-uk");
    expect(winter).not.toMatch(/20–30%/);
    expect(winter).not.toMatch(/up to 90%/i);
    expect(winter).not.toMatch(/Public Health England/i);
    const dep = read("depression-arthritis-when-to-seek-help");
    expect(dep).not.toMatch(/1 in 3/i);
    expect(dep).not.toMatch(/25% less pain/i);
    const flu = read("flu-jab-arthritis-frailty-uk");
    expect(flu).not.toMatch(/If you live in a GP surgery/i);
    expect(flu).not.toMatch(/several joints prefer/i);
  });

  it("depression blog surfaces crisis routes", () => {
    const json = JSON.parse(read("depression-arthritis-when-to-seek-help")) as Post;
    expect(json.content).toMatch(/116 123/);
    expect(json.content).toMatch(/999/);
    expect(json.content).toMatch(/NHS 111/);
  });

  it("flu jab blog keeps medicine safety framing", () => {
    const json = JSON.parse(read("flu-jab-arthritis-frailty-uk")) as Post;
    expect(json.content).toMatch(/Do not stop or pause your arthritis medicines yourself/);
    expect(json.content).toMatch(/not contain live virus/);
  });

  it("clusters front the three champion spokes", () => {
    const byId = (id: string) => TOPIC_CLUSTERS.find((c) => c.id === id)!;
    expect(byId("exercises").supportingPaths).toContain("/blog/staying-active-arthritis-winter-uk");
    expect(byId("flare-ups").supportingPaths).toContain("/blog/depression-arthritis-when-to-seek-help");
    expect(byId("treatments").supportingPaths).toContain("/blog/flu-jab-arthritis-frailty-uk");
    expect(getClusterForPath("/blog/staying-active-arthritis-winter-uk")?.id).toBe("exercises");
    expect(getClusterForPath("/blog/depression-arthritis-when-to-seek-help")?.id).toBe("flare-ups");
    expect(getClusterForPath("/blog/flu-jab-arthritis-frailty-uk")?.id).toBe("treatments");
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
