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
  cluster: "diet" | "exercises";
}> = [
  {
    name: "Vitamin D and falls",
    slug: "vitamin-d-and-falls-arthritis-uk",
    title: /Vitamin D and Falls With Arthritis.*\(UK\)/i,
    cites: [
      "https://www.nhs.uk/conditions/vitamins-and-minerals/vitamin-d/",
      "https://www.nice.org.uk/guidance/ng249",
      "https://www.nhs.uk/conditions/falls/",
      "https://www.nhs.uk/live-well/exercise/physical-activity-guidelines-older-adults/",
      "https://www.nhs.uk/conditions/osteoporosis/",
      "https://www.nhs.uk/conditions/vitamins-and-minerals/calcium/",
    ],
    links: [
      "/blog/vitamin-d-winter-arthritis-frailty-uk",
      "/blog/vitamin-d-arthritis-uk",
      "/guides/fall-prevention-older-adults",
      "/blog/balance-training-arthritis",
      "/blog/pharmacist-medication-review-frail-arthritis-uk",
      "/blog/sleeping-tablets-falls-arthritis-frailty-uk",
      "/blog/confidence-after-fall-arthritis-frailty-uk",
      "/blog/bone-protection-steroids-arthritis-frailty-uk",
      "/guides/bone-density-osteoporosis",
      "/blog/ice-snow-arthritis-frailty-uk",
    ],
    cluster: "diet",
  },
  {
    name: "Chair yoga for stiff joints",
    slug: "chair-yoga-elderly-arthritis-stiffness",
    title: /Chair Yoga for Older Adults With Arthritis Stiffness.*\(UK\)/i,
    cites: [
      "https://www.nhs.uk/live-well/exercise/strength-and-flexibility-exercises/sitting-exercises/",
      "https://www.nhs.uk/live-well/exercise/physical-activity-guidelines-older-adults/",
      "https://www.nice.org.uk/guidance/ng226",
      "https://www.versusarthritis.org/about-arthritis/exercising-with-arthritis/",
    ],
    links: [
      "/blog/chair-exercises-older-adults-arthritis",
      "/blog/yoga-for-arthritis-beginners",
      "/exercises/seated-tai-chi-for-arthritis",
      "/blog/sit-to-stand-practice-frail-arthritis-uk",
      "/blog/balance-training-arthritis",
      "/blog/arthritis-flare-up-what-to-do",
      "/guides/bone-density-osteoporosis",
      "/blog/pharmacist-medication-review-frail-arthritis-uk",
      "/exercises",
    ],
    cluster: "exercises",
  },
  {
    name: "Sit-to-stand practice",
    slug: "sit-to-stand-practice-frail-arthritis-uk",
    title: /Sit-to-Stand Practice With Sore Hips or Knees.*\(UK\)/i,
    cites: [
      "https://www.nhs.uk/live-well/exercise/strength-and-flexibility-exercises/strength-exercises/",
      "https://www.nhs.uk/live-well/exercise/physical-activity-guidelines-older-adults/",
      "https://www.nice.org.uk/guidance/ng226",
      "https://www.nice.org.uk/guidance/ng249",
      "https://www.nhs.uk/tests-and-treatments/physiotherapy/",
    ],
    links: [
      "/blog/strength-training-arthritis-beginners",
      "/blog/chair-exercises-older-adults-arthritis",
      "/blog/deconditioning-after-arthritis-flare-uk",
      "/blog/arthritis-physiotherapy-nhs-waiting-list",
      "/blog/joint-protection-easier-everyday-tasks",
      "/blog/walking-aids-arthritis-uk",
      "/blog/carers-assessment-arthritis-frailty-uk",
      "/blog/pharmacist-medication-review-frail-arthritis-uk",
      "/blog/confidence-after-fall-arthritis-frailty-uk",
      "/guides/knee-exercises-for-osteoarthritis",
      "/guides/hip-exercises-for-osteoarthritis",
    ],
    cluster: "exercises",
  },
];

describe("GSC Champions 88–90 (20 Oct): vitamin D and falls + chair yoga + sit-to-stand", () => {
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
      expect((json.meta_description || "").length).toBeGreaterThanOrEqual(120);
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
      expect(raw).not.toMatch(/live in a (GP surgery|home)\b/i);
      expect(raw).not.toMatch(/The wider health picture around/i);
      expect(raw).not.toMatch(/\b\d{1,3}\s?%/);
      expect(json.keywords || "").not.toMatch(/England|Wales|Northern Ireland|Scotland|several joints/);
      expect(json.content).not.toMatch(/<\/h2>\s*<h2/);
      expect(json.content).not.toMatch(/<h2>\s*<\/h2>/);
      expect(json.content).not.toMatch(/\b\d+\s?mg\b/i);
    });
  }

  it("vitamin D post is honest that vitamin D alone is not proven to prevent falls and keeps NHS limits", () => {
    const json = JSON.parse(read("vitamin-d-and-falls-arthritis-uk")) as Post;
    expect(json.content).toMatch(/insufficient evidence to support taking vitamin D supplements specifically to lower the risk of falls/);
    expect(json.content).toMatch(/10 microgram/);
    expect(json.content).toMatch(/do not take more than 100 micrograms \(4,000 IU\) a day/);
    expect(json.content).toMatch(/frail or housebound/);
    expect(json.content).toMatch(/Do not stop prescribed medicines yourself/);
    expect(json.content).not.toMatch(/vitamin D (prevents|stops|reduces) falls/i);
    expect(json.content.indexOf('href="/blog/vitamin-d-winter-arthritis-frailty-uk"')).toBeLessThan(1200);
  });

  it("chair yoga post drops the unverifiable trial claim and adds condition-specific cautions", () => {
    const raw = read("chair-yoga-elderly-arthritis-stiffness");
    const json = JSON.parse(raw) as Post;
    expect(raw).not.toMatch(/JAMDA|clinical trial evidence confirms|ageinplace/i);
    expect(json.content).toMatch(/solid, stable chair without wheels/);
    expect(json.content).toMatch(/Hip replacement/);
    expect(json.content).toMatch(/Osteoporosis or a past spinal fracture/);
    expect(json.content).toMatch(/no full neck circles/);
    expect(json.content.indexOf('href="/blog/chair-exercises-older-adults-arthritis"')).toBeLessThan(1200);
  });

  it("sit-to-stand post follows the NHS steps with easier and harder versions and carer safety", () => {
    const json = JSON.parse(read("sit-to-stand-practice-frail-arthritis-uk")) as Post;
    expect(json.content).toMatch(/Stand up slowly using your legs, not your arms/);
    expect(json.content).toMatch(/Aim for 5 repetitions/);
    expect(json.content).toMatch(/at least 2 days a week/);
    expect(json.content).toMatch(/Do not pull on their arms/);
    expect(json.content).toMatch(/free care needs assessment/);
    expect(json.content.indexOf('href="/blog/strength-training-arthritis-beginners"')).toBeLessThan(1200);
  });

  it("diet fronts vitamin D and falls; exercises fronts sit-to-stand and chair yoga", () => {
    const byId = (id: string) => TOPIC_CLUSTERS.find((c) => c.id === id)!;
    for (const c of cases) {
      expect(byId(c.cluster).supportingPaths).toContain(`/blog/${c.slug}`);
      expect(getClusterForPath(`/blog/${c.slug}`)?.id).toBe(c.cluster);
    }
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
        new RegExp(`<loc>https://livingwitharthritis.org.uk/blog/${slug}</loc>\\s*<lastmod>2026-10-20</lastmod>`),
      );
    }
  });
});
