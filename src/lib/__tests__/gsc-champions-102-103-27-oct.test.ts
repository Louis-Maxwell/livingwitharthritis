/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { getClusterForPath, TOPIC_CLUSTERS } from "@/data/topicClusters";

type Post = {
  title: string;
  last_reviewed?: string;
  reviewStatus?: string;
  reviewed_by?: string | null;
  reviewer_credentials?: string | null;
  meta_title?: string;
  meta_description?: string;
  excerpt?: string;
  keywords?: string;
  category?: string;
  citations?: Array<{ url: string }>;
  content: string;
};

const read = (slug: string) =>
  readFileSync(resolve(process.cwd(), `src/content/blog/posts/${slug}.json`), "utf8");

const cases = [
  {
    name: "Seated exercise with RA",
    slug: "chair-based-exercise-ra-frailty-uk",
    title: /Seated Exercise With RA: Flare Days and Good Days \(UK\)/i,
    category: "Exercise & movement",
    cites: [
      "https://nras.org.uk/resource/exercise/",
      "https://www.nice.org.uk/guidance/ng100/chapter/Recommendations",
      "https://www.nhs.uk/live-well/exercise/strength-and-flexibility-exercises/sitting-exercises/",
      "https://www.nhs.uk/conditions/septic-arthritis/",
    ],
    links: [
      "/blog/chair-yoga-elderly-arthritis-stiffness",
      "/blog/seated-strength-frail-osteoarthritis-uk",
      "/blog/sit-to-stand-practice-frail-arthritis-uk",
      "/blog/ra-fatigue-frailty-energy-envelope-uk",
      "/blog/deconditioning-after-arthritis-flare-uk",
      "/blog/inflammatory-arthritis-frailty-flare-week-uk",
      "/blog/hand-exercises-for-arthritis",
      "/conditions/rheumatoid-arthritis",
    ],
  },
  {
    name: "Waking at night to pee",
    slug: "continence-night-trips-arthritis-frailty-uk",
    title: /Waking at Night to Pee With Arthritis: What Helps \(UK\)/i,
    category: "Conditions",
    cites: [
      "https://www.guysandstthomas.nhs.uk/health-information/nocturia-getting-night-pee",
      "https://www.nhs.uk/conditions/urinary-incontinence/treatment/",
      "https://www.nhs.uk/conditions/urinary-tract-infections-utis/",
      "https://www.nice.org.uk/guidance/ng123",
      "https://www.nice.org.uk/guidance/cg97",
    ],
    links: [
      "/blog/night-lights-arthritis-falls-frailty-uk",
      "/blog/commode-night-arthritis-frailty-uk",
      "/blog/toilet-frame-arthritis-frailty-uk",
      "/blog/uti-confusion-arthritis-frailty-uk",
      "/blog/pharmacist-medication-review-frail-arthritis-uk",
      "/blog/sleeping-tablets-falls-arthritis-frailty-uk",
      "/blog/sleep-apnoea-arthritis-frailty-uk",
    ],
  },
];

describe("GSC Champions 102–103 (27 Oct): seated exercise with RA, waking at night to pee", () => {
  for (const c of cases) {
    it(`${c.name} is reviewed by Louis Maxwell with CTR meta, UK cites and customer-job links`, () => {
      const raw = read(c.slug);
      const json = JSON.parse(raw) as Post;
      expect(json.reviewStatus).toBeUndefined();
      expect(json.reviewed_by).toBe("Louis Maxwell");
      expect(json.reviewer_credentials).toMatch(/PH128483/);
      expect(json.last_reviewed).toBe("2026-10-27");
      expect(json.content).toMatch(/Clinically reviewed by Louis Maxwell \(HCPC PH128483\) on 27 October 2026/);
      expect(raw).not.toMatch(/pending clinical review/i);
      expect(json.category).toBe(c.category);
      expect(json.meta_title).toMatch(c.title);
      expect(json.meta_title).not.toMatch(/(for|with) Arthritis UK/i);
      expect((json.meta_title || "").length).toBeLessThanOrEqual(55);
      expect((json.meta_description || "").length).toBeLessThanOrEqual(150);
      expect((json.meta_description || "").length).toBeGreaterThanOrEqual(120);
      expect(json.excerpt).toBe(json.meta_description);
      const urls = (json.citations || []).map((x) => x.url);
      expect(urls).toEqual(expect.arrayContaining(c.cites));
      for (const href of c.links) {
        expect(json.content.includes(`href="${href}"`), `${c.name} missing ${href}`).toBe(true);
      }
      expect(json.content).toMatch(/1218461/);
      expect(json.content).toMatch(/999/);
      expect(json.content).toMatch(/NHS 111/);
      expect(json.content).toMatch(/never stop or change a prescribed medicine yourself/i);
      expect(raw).not.toMatch(/Oswestry/i);
      expect(raw).not.toMatch(/George Dingley|Crewe CW1/i);
      expect(raw).not.toMatch(/Living With Arthritis UK/);
    });

    it(`${c.name} drops the broken frailty template, fake stats, doses and unnamed reviewer labels`, () => {
      const raw = read(c.slug);
      const json = JSON.parse(raw) as Post;
      expect(raw).not.toMatch(/10 million/i);
      expect(raw).not.toMatch(/smaller group also live with frailty/i);
      expect(raw).not.toMatch(/several joints/i);
      expect(raw).not.toMatch(/Rockwood Clinical Frailty Scale/i);
      expect(raw).not.toMatch(/NICE is clear that exercise is core care for osteoarthritis/i);
      expect(raw).not.toMatch(/pacing, protein and practised transfers/i);
      expect(raw).not.toMatch(/Clinical (Review Board|Advisory Panel)/i);
      expect(raw).not.toMatch(/written for people and carers in (England|Wales|Scotland|Northern Ireland)/i);
      expect(raw).not.toMatch(/NG56/);
      expect(raw).not.toMatch(/\b\d{1,3}\s?%/);
      expect(json.keywords || "").not.toMatch(/England|Wales|Northern Ireland|Scotland|several joints|frailty/);
      expect(json.content).not.toMatch(/<\/h2>\s*<h2/);
      expect(json.content).not.toMatch(/<h2>\s*<\/h2>/);
      expect(json.content).not.toMatch(/\b\d+(\.\d+)?\s?(mg|milligrams?|micrograms?)\b/i);
    });
  }

  it("RA seated exercise post hands off early to chair yoga and seated strength (no overlap with 89/92) and covers flare-day safety", () => {
    const json = JSON.parse(read("chair-based-exercise-ra-frailty-uk")) as Post;
    const yoga = JSON.parse(read("chair-yoga-elderly-arthritis-stiffness")) as Post;
    const strength = JSON.parse(read("seated-strength-frail-osteoarthritis-uk")) as Post;
    expect(json.content.indexOf('href="/blog/chair-yoga-elderly-arthritis-stiffness"')).toBeLessThan(1800);
    expect(json.content.indexOf('href="/blog/seated-strength-frail-osteoarthritis-uk"')).toBeLessThan(1800);
    expect(json.content).toMatch(/range-of-movement/i);
    expect(json.content).toMatch(/rapid access to specialist care for flares/i);
    expect(json.content).toMatch(/hand exercise programme/i);
    expect(json.content).toMatch(/podiatrist/i);
    expect(json.content).toMatch(/joint infection/i);
    for (const other of [yoga, strength]) {
      expect(json.title).not.toBe(other.title);
      expect(json.meta_title).not.toBe(other.meta_title);
    }
  });

  it("night-time pee post stays on the bladder job (route lighting is Champion 97) and covers continence care and red flags", () => {
    const json = JSON.parse(read("continence-night-trips-arthritis-frailty-uk")) as Post;
    const lights = JSON.parse(read("night-lights-arthritis-falls-frailty-uk")) as Post;
    expect(json.content.indexOf('href="/blog/night-lights-arthritis-falls-frailty-uk"')).toBeLessThan(1800);
    expect(json.content).toMatch(/NHS continence service/);
    expect(json.content).toMatch(/pelvic floor muscle training/i);
    expect(json.content).toMatch(/bladder diary/i);
    expect(json.content).toMatch(/blood in your pee/i);
    expect(json.content).toMatch(/cannot pee at all/i);
    expect(json.content).toMatch(/Do not cut your total fluids/);
    expect(json.title).not.toBe(lights.title);
    expect(json.meta_title).not.toBe(lights.meta_title);
  });

  it("the exercises cluster lists both guides", () => {
    const ex = TOPIC_CLUSTERS.find((c) => c.id === "exercises")!;
    for (const c of cases) {
      expect(ex.supportingPaths).toContain(`/blog/${c.slug}`);
      expect(getClusterForPath(`/blog/${c.slug}`)).toBeTruthy();
    }
  });

  it("chatbot KB, llms.txt, ai.txt and sitemap surface both rewritten URLs", () => {
    const kb = readFileSync(resolve(process.cwd(), "src/lib/chatbot/knowledgeBase.ts"), "utf8");
    const llms = readFileSync(resolve(process.cwd(), "public/llms.txt"), "utf8");
    const ai = readFileSync(resolve(process.cwd(), "public/ai.txt"), "utf8");
    const sitemap = readFileSync(resolve(process.cwd(), "public/sitemap.xml"), "utf8");
    for (const slug of cases.map((c) => c.slug)) {
      expect(kb).toContain(`url: "/blog/${slug}"`);
      expect(llms).toContain(`https://livingwitharthritis.org.uk/blog/${slug}`);
      expect(ai).toContain(`https://livingwitharthritis.org.uk/blog/${slug}`);
      expect(sitemap).toMatch(
        new RegExp(`<loc>https://livingwitharthritis.org.uk/blog/${slug}</loc>\\s*<lastmod>2026-1[01]-\\d{2}</lastmod>`),
      );
    }
  });
});
