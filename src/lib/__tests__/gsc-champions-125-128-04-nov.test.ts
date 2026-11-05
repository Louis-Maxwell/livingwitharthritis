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
    name: "Wheelchair for distance",
    slug: "wheelchair-for-distance-arthritis-frailty-uk",
    title: /Wheelchair for Longer Distances With Arthritis \(UK\)/i,
    category: "Exercise & movement",
    cluster: "exercises",
    cites: [
      "https://www.redcross.org.uk/get-help/hire-a-wheelchair",
      "https://www.gov.uk/financial-help-disabled/vat-relief",
      "https://www.nice.org.uk/guidance/ng226",
    ],
    links: ["/blog/walking-aids-arthritis-uk", "/blog/short-term-equipment-loans-arthritis-uk", "/blog/blue-badge-frailty-arthritis-uk", "/blog/mobility-scooter-arthritis-frailty-uk"],
    early: ["/blog/walking-aids-arthritis-uk", "/blog/short-term-equipment-loans-arthritis-uk"],
    must: [/NHS wheelchair service/, /Passenger Assist/, /Keep walking and keep your legs strong/, /When to see your GP/],
  },
  {
    name: "Waiting for a community OT",
    slug: "community-ot-waiting-arthritis-frailty-uk",
    title: /Waiting for an OT With Arthritis/i,
    category: "Treatments & medicines",
    cluster: "treatments",
    cites: [
      "https://www.nhs.uk/conditions/occupational-therapy/",
      "https://www.nhs.uk/social-care-and-support/help-from-social-services-and-charities/getting-a-needs-assessment/",
      "https://livingmadeeasy.org.uk/",
    ],
    links: ["/blog/occupational-therapy-arthritis-uk", "/blog/social-care-needs-assessment-arthritis-uk", "/blog/disabled-facilities-grant-arthritis-frailty-uk", "/blog/kitchen-adaptations-arthritis-frailty-uk"],
    early: ["/blog/occupational-therapy-arthritis-uk", "/blog/social-care-needs-assessment-arthritis-uk"],
    must: [/Tell them if things change/, /Strip wash/, /Simple aids you can buy yourself/, /When to see your GP/],
  },
  {
    name: "Hip and knee transfers",
    slug: "hip-and-knee-oa-frailty-transfers-uk",
    title: /Hip and Knee Arthritis: Getting Up Safely \(UK\)/i,
    category: "Exercise & movement",
    cluster: "exercises",
    cites: ["https://www.nhs.uk/conditions/osteoarthritis/living-with/", "https://www.nice.org.uk/guidance/ng226", "https://www.nhs.uk/conditions/falls/"],
    links: ["/blog/hip-osteoarthritis-frailty-chair-rise-uk", "/blog/hip-oa-frailty-bed-mobility-uk", "/blog/hip-oa-frailty-getting-into-car-uk", "/blog/toilet-frame-arthritis-frailty-uk"],
    early: ["/blog/hip-osteoarthritis-frailty-chair-rise-uk", "/blog/hip-oa-frailty-bed-mobility-uk"],
    must: [/nose is over your toes/, /The basic way to sit down/, /Practise to get stronger/, /When to see your GP/],
  },
  {
    name: "Meal delivery",
    slug: "meal-delivery-arthritis-frailty-uk",
    title: /Meal Delivery When Arthritis Makes Cooking Hard \(UK\)/i,
    category: "Diet & lifestyle",
    cluster: "diet",
    cites: ["https://www.nhs.uk/conditions/malnutrition/", "https://www.gov.uk/attendance-allowance", "https://www.food.gov.uk/safety-hygiene/chilling"],
    links: ["/blog/cooking-with-arthritis-uk", "/blog/kitchen-adaptations-arthritis-frailty-uk", "/blog/appetite-loss-arthritis-frailty-uk", "/blog/attendance-allowance-arthritis-frailty-uk"],
    early: ["/blog/cooking-with-arthritis-uk", "/blog/kitchen-adaptations-arthritis-frailty-uk"],
    must: [/Meals on wheels from the council/, /Eating well enough/, /Food safety/, /When to see your GP/],
  },
];

describe("GSC Champions 125–128 (4 Nov): wheelchair for distance, waiting for an OT, hip and knee transfers, meal delivery", () => {
  for (const c of cases) {
    it(`${c.name} is reviewed by Louis Maxwell with CTR meta, UK cites and customer-job links`, () => {
      const raw = read(c.slug);
      const json = JSON.parse(raw) as Post;
      expect(json.reviewStatus).toBeUndefined();
      expect(json.reviewed_by).toBe("Louis Maxwell");
      expect(json.reviewer_credentials).toMatch(/PH128483/);
      expect(json.last_reviewed).toBe("2026-11-04");
      expect(json.content).toMatch(/Clinically reviewed by Louis Maxwell \(HCPC PH128483\) on 4 November 2026/);
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

  for (const c of cases) {
    it(`${c.name} hands off early and keeps its customer jobs`, () => {
      const json = JSON.parse(read(c.slug)) as Post;
      for (const href of c.early) {
        const idx = json.content.indexOf(`href="${href}"`);
        expect(idx).toBeGreaterThan(-1);
        expect(idx).toBeLessThan(1800);
      }
      for (const re of c.must) expect(json.content).toMatch(re);
      expect(json.content).not.toMatch(/£\d/);
    });
  }

  it("topic clusters list all four guides", () => {
    for (const c of cases) {
      const cluster = TOPIC_CLUSTERS.find((x) => x.id === c.cluster)!;
      expect(cluster.supportingPaths).toContain(`/blog/${c.slug}`);
      expect(getClusterForPath(`/blog/${c.slug}`)).toBeTruthy();
    }
  });

  it("chatbot KB, llms.txt, ai.txt and sitemap surface all four rewritten URLs", () => {
    const kb = readFileSync(resolve(process.cwd(), "src/lib/chatbot/knowledgeBase.ts"), "utf8");
    const llms = readFileSync(resolve(process.cwd(), "public/llms.txt"), "utf8");
    const ai = readFileSync(resolve(process.cwd(), "public/ai.txt"), "utf8");
    const sitemap = readFileSync(resolve(process.cwd(), "public/sitemap.xml"), "utf8");
    for (const slug of cases.map((c) => c.slug)) {
      expect(kb).toContain(`url: "/blog/${slug}"`);
      expect(llms).toContain(`https://livingwitharthritis.org.uk/blog/${slug}`);
      expect(ai).toContain(`https://livingwitharthritis.org.uk/blog/${slug}`);
      expect(sitemap).toMatch(
        new RegExp(`<loc>https://livingwitharthritis.org.uk/blog/${slug}</loc>\\s*<lastmod>2026-11-\\d{2}</lastmod>`),
      );
    }
  });
});
