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
  keywords?: string;
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
  cluster: "pain" | "treatments";
}> = [
  {
    name: "Sleeping tablets and night falls",
    slug: "sleeping-tablets-falls-arthritis-frailty-uk",
    title: /Sleeping Tablets.*Falls.*Arthritis.*\(UK\)/i,
    cites: [
      "https://www.nhs.uk/conditions/insomnia/",
      "https://www.nhs.uk/live-well/sleep-and-tiredness/how-to-get-to-sleep/",
      "https://www.nice.org.uk/guidance/mtg70",
      "https://www.nhs.uk/medicines/zolpidem/side-effects-of-zolpidem/",
      "https://www.nhs.uk/conditions/falls/",
      "https://www.nice.org.uk/guidance/ng249",
    ],
    links: [
      "/blog/how-to-sleep-with-arthritis-uk",
      "/blog/arthritis-and-sleep-problems",
      "/blog/sleep-quality-arthritis-pain",
      "/blog/sleep-and-pain-management-arthritis",
      "/blog/best-sleep-positions-joint-pain",
      "/blog/night-lights-arthritis-falls-frailty-uk",
      "/guides/fall-prevention-older-adults",
      "/blog/codeine-drowsiness-falls-arthritis-uk",
      "/blog/ice-snow-arthritis-frailty-uk",
      "/resources/flare-action-plan",
    ],
    cluster: "pain",
  },
  {
    name: "Sleep apnoea",
    slug: "sleep-apnoea-arthritis-frailty-uk",
    title: /Sleep Apnoea With Arthritis.*\(UK\)/i,
    cites: [
      "https://www.nhs.uk/conditions/sleep-apnoea/",
      "https://www.nhs.uk/conditions/insomnia/",
      "https://www.nhs.uk/conditions/falls/",
      "https://www.gov.uk/obstructive-sleep-apnoea-and-driving",
      "https://www.nice.org.uk/guidance/mtg70",
    ],
    links: [
      "/blog/how-to-sleep-with-arthritis-uk",
      "/blog/arthritis-and-sleep-problems",
      "/blog/sleep-quality-arthritis-pain",
      "/blog/sleeping-tablets-falls-arthritis-frailty-uk",
      "/blog/best-sleep-positions-joint-pain",
      "/blog/sleep-and-pain-management-arthritis",
      "/blog/arthritis-fatigue-management-uk",
      "/guides/fall-prevention-older-adults",
      "/arthritis-flare-ups",
    ],
    cluster: "pain",
  },
  {
    name: "Bone protection on steroids",
    slug: "bone-protection-steroids-arthritis-frailty-uk",
    title: /Bone Protection on Steroids With Arthritis.*\(UK\)/i,
    cites: [
      "https://www.nhs.uk/conditions/osteoporosis/causes/",
      "https://www.nhs.uk/conditions/osteoporosis/",
      "https://www.nhs.uk/conditions/osteoporosis/prevention/",
      "https://www.nhs.uk/medicines/prednisolone/side-effects-of-prednisolone-tablets-and-liquid/",
      "https://www.nhs.uk/conditions/vitamins-and-minerals/vitamin-d/",
      "https://www.nhs.uk/conditions/falls/",
    ],
    links: [
      "/guides/bone-density-osteoporosis",
      "/blog/steroid-emergency-card-frail-arthritis-uk",
      "/blog/ra-steroids-frailty-infection-watch-uk",
      "/blog/vitamin-d-winter-arthritis-frailty-uk",
      "/guides/steroids-for-arthritis",
      "/guides/fall-prevention-older-adults",
      "/blog/ice-snow-arthritis-frailty-uk",
      "/exercises",
      "/resources/flare-action-plan",
      "/conditions/rheumatoid-arthritis",
    ],
    cluster: "treatments",
  },
];

describe("GSC Champions 82–84 (16 Oct): sleeping tablets/falls + sleep apnoea + bone protection on steroids", () => {
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

    it(`${c.name} drops the broken frailty template, fake stats and unnamed reviewer labels`, () => {
      const raw = read(c.slug);
      const json = JSON.parse(raw) as Post;
      expect(raw).not.toMatch(/10 million/i);
      expect(raw).not.toMatch(/smaller group also live with frailty/i);
      expect(raw).not.toMatch(/several joints/i);
      expect(raw).not.toMatch(/Rockwood Clinical Frailty Scale/i);
      expect(raw).not.toMatch(/NICE is clear that exercise is core care for osteoarthritis/i);
      expect(raw).not.toMatch(/Normal rarely sends an email/i);
      expect(raw).not.toMatch(/Clinical (Review Board|Advisory Panel)/i);
      expect(raw).not.toMatch(/written for people and carers in (England|Wales|Scotland|Northern Ireland)/i);
      expect(raw).not.toMatch(/Treating frailty as a clinical syndrome keeps the focus/i);
      expect(json.keywords || "").not.toMatch(/England|Wales|Northern Ireland|several joints/);
      expect(json.content).not.toMatch(/<\/h2>\s*<h2/);
      expect(json.content).not.toMatch(/<h2>\s*<\/h2>/);
      expect(json.content).not.toMatch(/\b100\s?mg hydrocortisone|hydrocortisone 100\s?mg/i);
    });
  }

  it("sleeping tablets post prefers CBT-I, never-stop framing and night-fall safety", () => {
    const json = JSON.parse(read("sleeping-tablets-falls-arthritis-frailty-uk")) as Post;
    expect(json.content).toMatch(/rarely prescribe sleeping pills/i);
    expect(json.content).toMatch(/CBT/);
    expect(json.content).toMatch(/Sleepio/);
    expect(json.content).toMatch(/Do not stop, skip or change the dose yourself/);
    expect(json.content).toMatch(/over the age of 65|over 65/);
    expect(json.content.indexOf('href="/blog/how-to-sleep-with-arthritis-uk"')).toBeLessThan(1200);
  });

  it("sleep apnoea post carries NHS signs, CPAP high-level and early hand-off to sleep hubs", () => {
    const json = JSON.parse(read("sleep-apnoea-arthritis-frailty-uk")) as Post;
    expect(json.content).toMatch(/gasping, snorting or choking/);
    expect(json.content).toMatch(/CPAP/);
    expect(json.content).toMatch(/can make sleep apnoea worse/);
    expect(json.content).toMatch(/DVLA/);
    expect(json.content.indexOf('href="/blog/how-to-sleep-with-arthritis-uk"')).toBeLessThan(1200);
    expect(json.content.indexOf('href="/blog/arthritis-and-sleep-problems"')).toBeLessThan(1400);
  });

  it("bone protection post never-stops steroids, cites NHS steroid/osteoporosis risk and hands off to bone density guide", () => {
    const json = JSON.parse(read("bone-protection-steroids-arthritis-frailty-uk")) as Post;
    expect(json.content).toMatch(/high-dose steroid tablets/);
    expect(json.content).toMatch(/DEXA/);
    expect(json.content).toMatch(/10 micrograms/);
    expect(json.content).toMatch(/Never stop, skip or lower steroid tablets yourself|Do not stop, skip or lower your steroid dose yourself/);
    expect(json.content.indexOf('href="/guides/bone-density-osteoporosis"')).toBeLessThan(1200);
    expect(json.content).not.toMatch(/\b\d+\s?mg\b.*prednisolone|prednisolone.*\b\d+\s?mg\b/i);
  });

  it("pain cluster fronts sleeping tablets and sleep apnoea; treatments fronts bone protection", () => {
    const pain = TOPIC_CLUSTERS.find((c) => c.id === "pain")!;
    const treatments = TOPIC_CLUSTERS.find((c) => c.id === "treatments")!;
    expect(pain.supportingPaths).toContain("/blog/sleeping-tablets-falls-arthritis-frailty-uk");
    expect(pain.supportingPaths).toContain("/blog/sleep-apnoea-arthritis-frailty-uk");
    expect(treatments.supportingPaths).toContain("/blog/bone-protection-steroids-arthritis-frailty-uk");
    expect(getClusterForPath("/blog/sleeping-tablets-falls-arthritis-frailty-uk")?.id).toBe("pain");
    expect(getClusterForPath("/blog/sleep-apnoea-arthritis-frailty-uk")?.id).toBe("pain");
    expect(getClusterForPath("/blog/bone-protection-steroids-arthritis-frailty-uk")?.id).toBe("treatments");
  });

  it("chatbot KB, llms.txt, ai.txt and sitemap surface the three gold-pass URLs", () => {
    const kb = readFileSync(resolve(process.cwd(), "src/lib/chatbot/knowledgeBase.ts"), "utf8");
    const llms = readFileSync(resolve(process.cwd(), "public/llms.txt"), "utf8");
    const ai = readFileSync(resolve(process.cwd(), "public/ai.txt"), "utf8");
    const sitemap = readFileSync(resolve(process.cwd(), "public/sitemap.xml"), "utf8");
    for (const slug of cases.map((c) => c.slug)) {
      expect(kb).toContain(`url: "/blog/${slug}"`);
      expect(llms).toContain(`https://livingwitharthritis.org.uk/blog/${slug}`);
      expect(ai).toContain(`https://livingwitharthritis.org.uk/blog/${slug}`);
      expect(sitemap).toMatch(
        new RegExp(`<loc>https://livingwitharthritis.org.uk/blog/${slug}</loc>\\s*<lastmod>2026-10-16</lastmod>`),
      );
    }
  });
});
