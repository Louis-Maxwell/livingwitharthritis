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
    name: "Gout winter dehydration",
    slug: "gout-winter-dehydration-frailty-uk",
    title: /Gout in Winter.*Dehydration.*\(UK\)/i,
    cites: [
      "https://www.nhs.uk/conditions/gout/",
      "https://www.nhs.uk/conditions/dehydration/",
      "https://www.nice.org.uk/guidance/ng219",
      "https://www.versusarthritis.org/about-arthritis/conditions/gout/",
    ],
    links: [
      "/conditions/gout",
      "/conditions/gout/treatment",
      "/blog/gout-medication-uk",
      "/guides/febuxostat-for-gout",
      "/blog/gout-flare-up-diet-foods-avoid",
      "/blog/gout-older-people-frailty-hydration-uk",
      "/blog/winter-arthritis-frailty-cold-houses-uk",
      "/guides/diet",
    ],
  },
  {
    name: "Night pain management",
    slug: "sleep-and-pain-management-arthritis",
    title: /Night Pain Management for Arthritis.*\(UK\)/i,
    cites: [
      "https://www.nhs.uk/live-well/sleep-and-tiredness/how-to-get-to-sleep/",
      "https://www.nhs.uk/conditions/insomnia/",
      "https://www.nhs.uk/conditions/osteoarthritis/treatment/",
      "https://www.nice.org.uk/guidance/ng226",
      "https://www.nhs.uk/conditions/rheumatoid-arthritis/",
    ],
    links: [
      "/blog/how-to-sleep-with-arthritis-uk",
      "/blog/best-sleep-positions-joint-pain",
      "/blog/sleep-quality-arthritis-pain",
      "/blog/arthritis-and-sleep-problems",
      "/guides/arthritis-pain-relief",
      "/arthritis-flare-ups",
      "/blog/arthritis-fatigue-management-uk",
      "/exercises",
    ],
  },
];

describe("GSC Champions 74–75 (13 Oct): gout winter dehydration + night pain toolkit", () => {
  for (const c of cases) {
    it(`${c.name} blog is clinically reviewed by Louis Maxwell with CTR meta, UK cites and customer-job links`, () => {
      const raw = read(c.slug);
      const json = JSON.parse(raw) as Post;
      expect(json.reviewStatus).toBeUndefined();
      expect(json.last_reviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(json.reviewed_by).toMatch(/Louis Maxwell/);
      expect(json.reviewer_credentials).toMatch(/PH128483/);
            expect(json.content).not.toMatch(/Pending clinical review/i);
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

  it("drops frailty-template copy, wrong-condition OA advice and fake stats", () => {
    const gout = read("gout-winter-dehydration-frailty-uk");
    const night = read("sleep-and-pain-management-arthritis");
    expect(gout).not.toMatch(/10 million/i);
    expect(gout).not.toMatch(/smaller group also live with frailty/i);
    expect(gout).not.toMatch(/Rockwood Clinical Frailty Scale/i);
    expect(gout).not.toMatch(/NICE is clear that exercise is core care for osteoarthritis/i);
    expect(gout).not.toMatch(/<h2>The wider health picture around gout<\/h2>\s*<h2>/);
    expect(night).not.toMatch(/Clinical Advisory Panel/i);
    expect(night).not.toMatch(/Clinical Review Board/i);
    expect(night).not.toMatch(/up to 80%/i);
    expect(night).not.toMatch(/25% less pain/i);
  });

  it("gout blog keeps NHS dehydration and urate-lowering safety framing", () => {
    const json = JSON.parse(read("gout-winter-dehydration-frailty-uk")) as Post;
    expect(json.content).toMatch(/dehydration/i);
    expect(json.content).toMatch(/uric acid/i);
    expect(json.content).toMatch(/Do not stop urate-lowering|keep taking it during a flare/i);
    expect(json.content).toMatch(/drink lots of water|Drink plenty of fluids/i);
  });

  it("night-pain post has a distinct toolkit job and hands off to the gold-pass sleep guide", () => {
    const night = JSON.parse(read("sleep-and-pain-management-arthritis")) as Post;
    const cycle = JSON.parse(read("sleep-quality-arthritis-pain")) as Post;
    const problems = JSON.parse(read("arthritis-and-sleep-problems")) as Post;
    expect(night.content).toMatch(/overnight.*pain toolkit|pain toolkit/i);
    expect(night.content).toMatch(/Do not stop, skip or change the dose or timing of prescribed medicines yourself/);
    expect(night.meta_title).not.toEqual(cycle.meta_title);
    expect(night.meta_title).not.toEqual(problems.meta_title);
    expect(night.content.indexOf('href="/blog/how-to-sleep-with-arthritis-uk"')).toBeLessThan(1500);
  });

  it("clusters front the two champion spokes", () => {
    const byId = (id: string) => TOPIC_CLUSTERS.find((c) => c.id === id)!;
    expect(byId("treatments").supportingPaths).toContain("/blog/gout-winter-dehydration-frailty-uk");
    expect(byId("pain").supportingPaths).toContain("/blog/sleep-and-pain-management-arthritis");
    expect(getClusterForPath("/blog/gout-winter-dehydration-frailty-uk")?.id).toBe("treatments");
    expect(getClusterForPath("/blog/sleep-and-pain-management-arthritis")?.id).toBe(
      getClusterForPath("/blog/how-to-sleep-with-arthritis-uk")?.id,
    );
  });

  it("chatbot KB and llms.txt surface the two gold-pass URLs", () => {
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
