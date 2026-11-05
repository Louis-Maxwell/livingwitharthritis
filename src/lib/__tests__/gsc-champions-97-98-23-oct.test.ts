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
  excerpt?: string;
  keywords?: string;
  category?: string;
  citations?: Array<{ url: string }>;
  content: string;
};

const read = (slug: string) =>
  readFileSync(resolve(process.cwd(), `src/content/blog/posts/${slug}.json`), "utf8");

const cases: Array<{
  name: string;
  slug: string;
  title: RegExp;
  category: string;
  cites: string[];
  links: string[];
  cluster: "treatments" | "exercises";
}> = [
  {
    name: "Night lights and safer night-time trips",
    slug: "night-lights-arthritis-falls-frailty-uk",
    title: /Night Lights and Safer Night-Time Trips \(UK\)/i,
    category: "Pain & flares",
    cites: [
      "https://www.nhs.uk/conditions/falls/prevention/",
      "https://www.guysandstthomas.nhs.uk/health-information/nocturia-getting-night-pee",
      "https://www.nhs.uk/conditions/low-blood-pressure-hypotension/",
      "https://www.ageuk.org.uk/information-advice/health-wellbeing/exercise/falls-prevention/",
    ],
    links: [
      "/blog/continence-night-trips-arthritis-frailty-uk",
      "/blog/commode-night-arthritis-frailty-uk",
      "/blog/confidence-after-fall-arthritis-frailty-uk",
      "/blog/sit-to-stand-practice-frail-arthritis-uk",
      "/blog/sleeping-tablets-falls-arthritis-frailty-uk",
      "/blog/living-alone-falls-plan-arthritis-uk",
      "/guides/fall-prevention-older-adults",
    ],
    cluster: "exercises",
  },
  {
    name: "Topical NSAIDs in later life",
    slug: "topical-nsaids-frail-hand-knee-oa-uk",
    title: /Topical NSAIDs in Later Life: Knee and Hand OA \(UK\)/i,
    category: "Treatments & medicines",
    cites: [
      "https://www.nice.org.uk/guidance/ng226/chapter/Recommendations",
      "https://www.nhs.uk/conditions/osteoarthritis/treatment/",
      "https://www.nhs.uk/medicines/diclofenac/",
      "https://www.nhs.uk/conditions/nsaids/",
      "https://yellowcard.mhra.gov.uk/",
    ],
    links: [
      "/blog/topical-nsaids-often-overlooked-often-effective",
      "/blog/painkillers-older-adults-arthritis-caution-uk",
      "/blog/pharmacist-medication-review-frail-arthritis-uk",
      "/blog/heat-versus-ice-frail-arthritis-uk",
      "/guides/painkillers-and-nsaids",
    ],
    cluster: "treatments",
  },
];

describe("GSC Champions 97–98 (23 Oct): night lights + topical NSAIDs in later life", () => {
  for (const c of cases) {
    it(`${c.name} blog is clinically reviewed by Louis Maxwell with CTR meta, UK cites and customer-job links`, () => {
      const raw = read(c.slug);
      const json = JSON.parse(raw) as Post;
      expect(json.reviewStatus).toBeUndefined();
      expect(json.last_reviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(json.reviewed_by).toMatch(/Louis Maxwell/);
      expect(json.reviewer_credentials).toMatch(/PH128483/);
            expect(json.content).not.toMatch(/Pending clinical review/i);
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

    it(`${c.name} drops the broken frailty template, fake stats and unnamed reviewer labels`, () => {
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
      expect(raw).not.toMatch(/for readers in (England|Wales|Scotland|Northern Ireland)/i);
      expect(raw).not.toMatch(/live in a (GP surgery|home)\b/i);
      expect(raw).not.toMatch(/NG56/);
      expect(raw).not.toMatch(/\b\d{1,3}\s?%/);
      expect(json.keywords || "").not.toMatch(/England|Wales|Northern Ireland|Scotland|several joints|frailty/);
      expect(json.content).not.toMatch(/<\/h2>\s*<h2/);
      expect(json.content).not.toMatch(/<h2>\s*<\/h2>/);
      expect(json.content).not.toMatch(/\b\d+(\.\d+)?\s?(mg|milligrams?|micrograms?)\b/i);
    });
  }

  it("night lights post covers the whole route, getting up in stages and when night trips need a GP", () => {
    const json = JSON.parse(read("night-lights-arthritis-falls-frailty-uk")) as Post;
    expect(json.content).toMatch(/motion-sensor/i);
    expect(json.content).toMatch(/edge of the bed/i);
    expect(json.content).toMatch(/water tablets/i);
    expect(json.content).toMatch(/If you fall at night/);
    expect(json.content.indexOf('href="/blog/continence-night-trips-arthritis-frailty-uk"')).toBeGreaterThan(-1);
  });

  it("topical NSAIDs post is narrowed to the later-life safety job and hands off early to the general explainer", () => {
    const json = JSON.parse(read("topical-nsaids-frail-hand-knee-oa-uk")) as Post & { title: string };
    const general = JSON.parse(read("topical-nsaids-often-overlooked-often-effective")) as Post & { title: string };
    expect(json.content.indexOf('href="/blog/topical-nsaids-often-overlooked-often-effective"')).toBeLessThan(1500);
    expect(json.content).toMatch(/naked flame/i);
    expect(json.content).toMatch(/blood thinner/i);
    expect(json.content).toMatch(/asthma/i);
    expect(json.content).toMatch(/pharmacist/i);
    expect(json.title).not.toBe(general.title);
    expect(json.meta_title).not.toBe(general.meta_title);
  });

  it("exercises (falls) fronts night lights; treatments fronts topical NSAIDs in later life", () => {
    const byId = (id: string) => TOPIC_CLUSTERS.find((c) => c.id === id)!;
    for (const c of cases) {
      expect(byId(c.cluster).supportingPaths).toContain(`/blog/${c.slug}`);
      expect(getClusterForPath(`/blog/${c.slug}`)?.id).toBe(c.cluster);
    }
  });

  it("chatbot KB, llms.txt, ai.txt and sitemap surface the two gold-pass URLs", () => {
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
