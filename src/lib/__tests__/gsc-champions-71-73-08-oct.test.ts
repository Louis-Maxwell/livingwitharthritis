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

const cases: Array<{ name: string; slug: string; title: RegExp; cites: string[]; links: string[] }> = [
  {
    name: "Vitamin D in winter",
    slug: "vitamin-d-winter-arthritis-frailty-uk",
    title: /Vitamin D in Winter with Arthritis.*\(UK\)/i,
    cites: [
      "https://www.nhs.uk/conditions/vitamins-and-minerals/vitamin-d/",
      "https://www.nhs.uk/conditions/osteoporosis/prevention/",
      "https://www.nhs.uk/conditions/osteoporosis/causes/",
      "https://www.gov.uk/government/publications/sacn-vitamin-d-and-health-report",
    ],
    links: [
      "/blog/vitamin-d-and-falls-arthritis-uk",
      "/blog/bone-protection-steroids-arthritis-frailty-uk",
      "/blog/osteoporosis-arthritis-frailty-bone-joint-uk",
      "/blog/best-supplements-arthritis-uk",
      "/conditions/rheumatoid-arthritis",
      "/guides/fall-prevention-older-adults",
      "/exercises",
      "/diet",
      "/blog/carers-assessment-arthritis-frailty-uk",
      "/blog/winter-arthritis-frailty-cold-houses-uk",
    ],
  },
  {
    name: "Sleep and pain cycle",
    slug: "sleep-quality-arthritis-pain",
    title: /Poor Sleep and Arthritis Pain.*\(UK\)/i,
    cites: [
      "https://www.nhs.uk/conditions/insomnia/",
      "https://www.nhs.uk/live-well/sleep-and-tiredness/how-to-get-to-sleep/",
      "https://www.nice.org.uk/guidance/mtg70",
    ],
    links: [
      "/blog/how-to-sleep-with-arthritis-uk",
      "/blog/arthritis-and-sleep-problems",
      "/blog/best-sleep-positions-joint-pain",
      "/guides/arthritis-pain-relief",
      "/blog/sleeping-tablets-falls-arthritis-frailty-uk",
      "/blog/sleep-apnoea-arthritis-frailty-uk",
      "/blog/arthritis-fatigue-management-uk",
      "/blog/energy-management-and-pacing-arthritis",
      "/blog/depression-arthritis-when-to-seek-help",
      "/resources/flare-action-plan",
    ],
  },
  {
    name: "What keeps you awake",
    slug: "arthritis-and-sleep-problems",
    title: /Arthritis and Sleep Problems.*\(UK\)/i,
    cites: [
      "https://www.nhs.uk/conditions/insomnia/",
      "https://www.nhs.uk/conditions/restless-legs-syndrome/",
      "https://www.nhs.uk/conditions/sleep-apnoea/",
      "https://www.nhs.uk/medicines/prednisolone/",
    ],
    links: [
      "/blog/how-to-sleep-with-arthritis-uk",
      "/blog/sleep-quality-arthritis-pain",
      "/blog/best-sleep-positions-joint-pain",
      "/blog/sleep-apnoea-arthritis-frailty-uk",
      "/blog/continence-night-trips-arthritis-frailty-uk",
      "/blog/sleeping-tablets-falls-arthritis-frailty-uk",
      "/conditions/rheumatoid-arthritis",
      "/library/fibromyalgia",
      "/blog/arthritis-and-mental-health-uk",
      "/arthritis-flare-ups",
    ],
  },
];

describe("GSC Champions 71–73 (8 Oct): vitamin D in winter + sleep–pain cycle + what keeps you awake", () => {
  for (const c of cases) {
    it(`${c.name} blog is pending clinical review with CTR meta, UK cites and customer-job links`, () => {
      const raw = read(c.slug);
      const json = JSON.parse(raw) as Post;
      expect(json.reviewStatus).toBe("pending");
      expect(json.last_reviewed).toBeUndefined();
      expect(json.reviewed_by).toBeNull();
      expect(json.reviewer_credentials).toBeNull();
      expect(json.content).not.toMatch(/Reviewed by/i);
      expect(json.content).toMatch(/Pending clinical review\./);
      expect(json.meta_title).toMatch(c.title);
      expect(json.meta_title).not.toMatch(/(for|with) Arthritis UK/i);
      expect((json.meta_title || "").length).toBeLessThanOrEqual(60);
      expect((json.meta_description || "").length).toBeLessThanOrEqual(155);
      const urls = (json.citations || []).map((x) => x.url);
      expect(urls).toEqual(expect.arrayContaining(c.cites));
      for (const href of c.links) {
        expect(json.content.includes(`href="${href}"`), `${c.name} missing ${href}`).toBe(true);
      }
      expect(json.content).toMatch(/1218461/);
      expect(json.content).toMatch(/999/);
      expect(json.content).toMatch(/NHS 111/);
      expect(raw).not.toMatch(/Oswestry/i);
      expect(raw).not.toMatch(/George Dingley|Crewe CW1/i);
      expect(raw).not.toMatch(/Living With Arthritis UK/);
    });
  }

  it("drops unverifiable statistics, fake reviewers and template copy", () => {
    const vitD = read("vitamin-d-winter-arthritis-frailty-uk");
    const quality = read("sleep-quality-arthritis-pain");
    const problems = read("arthritis-and-sleep-problems");
    expect(vitD).not.toMatch(/several joints/i);
    expect(vitD).not.toMatch(/without miracle claims/i);
    expect(vitD).not.toMatch(/10 million/i);
    for (const raw of [quality, problems]) {
      expect(raw).not.toMatch(/up to 80%/i);
      expect(raw).not.toMatch(/Clinical Advisory Panel/i);
      expect(raw).not.toMatch(/UK Patient Education Desk/i);
      expect(raw).not.toMatch(/Practical next steps for/i);
    }
    expect(quality).not.toMatch(/Hannah Clarke/i);
    expect(problems).not.toMatch(/10 million/i);
    expect(problems).not.toMatch(/7–10 years/);
    expect(problems).not.toMatch(/Emma|Simba|Tempur/);
  });

  it("vitamin D blog keeps NHS dose framing and medicine safety", () => {
    const json = JSON.parse(read("vitamin-d-winter-arthritis-frailty-uk")) as Post;
    expect(json.content).toMatch(/10 micrograms \(400 IU\)/);
    expect(json.content).toMatch(/100 micrograms \(4,000 IU\)/);
    expect(json.content).toMatch(/not a treatment for arthritis/);
    expect(json.content).toMatch(/Never stop steroid tablets suddenly/);
  });

  it("sleep posts each have a distinct job and hand off to the gold-pass sleep guide", () => {
    const quality = JSON.parse(read("sleep-quality-arthritis-pain")) as Post;
    const problems = JSON.parse(read("arthritis-and-sleep-problems")) as Post;
    expect(quality.content).toMatch(/two-week sleep and pain diary/i);
    expect(problems.content).toMatch(/Restless legs/);
    expect(problems.content).toMatch(/Do not stop, skip or change the timing of prescribed medicines yourself/);
    expect(quality.meta_title).not.toEqual(problems.meta_title);
    for (const json of [quality, problems]) {
      expect(json.content.indexOf('href="/blog/how-to-sleep-with-arthritis-uk"')).toBeLessThan(1500);
    }
  });

  it("clusters front the three champion spokes", () => {
    const byId = (id: string) => TOPIC_CLUSTERS.find((c) => c.id === id)!;
    expect(byId("diet").supportingPaths).toContain("/blog/vitamin-d-winter-arthritis-frailty-uk");
    expect(byId("pain").supportingPaths).toContain("/blog/sleep-quality-arthritis-pain");
    expect(byId("pain").supportingPaths).toContain("/blog/arthritis-and-sleep-problems");
    expect(getClusterForPath("/blog/vitamin-d-winter-arthritis-frailty-uk")?.id).toBe("diet");
    expect(getClusterForPath("/blog/sleep-quality-arthritis-pain")?.id).toBe(
      getClusterForPath("/blog/best-sleep-positions-joint-pain")?.id,
    );
    expect(getClusterForPath("/blog/arthritis-and-sleep-problems")?.id).toBe(
      getClusterForPath("/blog/best-sleep-positions-joint-pain")?.id,
    );
  });

  it("chatbot KB and llms.txt surface the three gold-pass URLs", () => {
    const kb = readFileSync(resolve(process.cwd(), "src/lib/chatbot/knowledgeBase.ts"), "utf8");
    const llms = readFileSync(resolve(process.cwd(), "public/llms.txt"), "utf8");
    const ai = readFileSync(resolve(process.cwd(), "public/ai.txt"), "utf8");
    for (const slug of cases.map((c) => c.slug)) {
      expect(kb).toContain(`url: "/blog/${slug}"`);
      expect(llms).toContain(`https://livingwitharthritis.org.uk/blog/${slug}`);
      expect(ai).toContain(`https://livingwitharthritis.org.uk/blog/${slug}`);
    }
  });
});
