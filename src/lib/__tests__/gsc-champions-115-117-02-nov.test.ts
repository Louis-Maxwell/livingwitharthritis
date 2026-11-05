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
    name: "COPD and arthritis",
    slug: "copd-arthritis-frailty-breathlessness-uk",
    title: /COPD and Arthritis: Staying Active \(UK\)/i,
    category: "Exercise & movement",
    cites: [
      "https://www.nhs.uk/conditions/chronic-obstructive-pulmonary-disease-copd/treatment/",
      "https://www.nice.org.uk/guidance/ng115",
      "https://www.nice.org.uk/guidance/ng226",
      "https://www.nhs.uk/medicines/methotrexate/side-effects-of-methotrexate/",
      "https://www.nhs.uk/vaccinations/flu-vaccine/",
    ],
    links: [
      "/blog/chest-infection-arthritis-frailty-uk",
      "/blog/ra-fatigue-frailty-energy-envelope-uk",
      "/blog/chair-based-exercise-ra-frailty-uk",
      "/blog/walking-aids-arthritis-uk",
      "/blog/methotrexate-older-frail-adults-uk",
      "/blog/flu-jab-arthritis-frailty-uk",
    ],
  },
  {
    name: "Borrowing mobility equipment",
    slug: "short-term-equipment-loans-arthritis-uk",
    title: /Borrowing Mobility Equipment for Arthritis \(UK\)/i,
    category: "Diet & lifestyle",
    cites: [
      "https://www.nhs.uk/social-care-and-support/care-services-equipment-and-care-homes/household-gadgets-and-equipment-to-make-life-easier/",
      "https://www.gov.uk/apply-needs-assessment-social-services",
      "https://www.nhs.uk/social-care-and-support/care-after-a-hospital-stay/",
      "https://www.redcross.org.uk/get-help/borrow-a-wheelchair",
      "https://www.gov.uk/financial-help-disabled/vat-relief",
    ],
    links: [
      "/blog/gadgets-aids-arthritis-uk",
      "/blog/walking-aids-arthritis-uk",
      "/blog/disabled-facilities-grant-arthritis-frailty-uk",
      "/blog/reablement-after-discharge-arthritis-uk",
      "/blog/occupational-therapy-arthritis-uk",
      "/blog/night-lights-arthritis-falls-frailty-uk",
    ],
  },
];

describe("GSC Champions 115 and 117 (2 Nov): COPD and arthritis, borrowing mobility equipment", () => {
  for (const c of cases) {
    it(`${c.name} is reviewed by Louis Maxwell with CTR meta, UK cites and customer-job links`, () => {
      const raw = read(c.slug);
      const json = JSON.parse(raw) as Post;
      expect(json.reviewStatus).toBeUndefined();
      expect(json.reviewed_by).toBe("Louis Maxwell");
      expect(json.reviewer_credentials).toMatch(/PH128483/);
      expect(json.last_reviewed).toBe("2026-11-02");
      expect(json.content).toMatch(/Clinically reviewed by Louis Maxwell \(HCPC PH128483\) on 2 November 2026/);
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

  it("COPD post hands off early to chest infection and fatigue guides and covers rehab, inhalers and methotrexate lung warnings", () => {
    const json = JSON.parse(read("copd-arthritis-frailty-breathlessness-uk")) as Post;
    const general = JSON.parse(read("chest-infection-arthritis-frailty-uk")) as Post;
    expect(json.content.indexOf('href="/blog/chest-infection-arthritis-frailty-uk"')).toBeLessThan(1800);
    expect(json.content.indexOf('href="/blog/ra-fatigue-frailty-energy-envelope-uk"')).toBeLessThan(1800);
    expect(json.content).toMatch(/Pulmonary rehabilitation: ask for it/);
    expect(json.content).toMatch(/Tell the team about your arthritis/);
    expect(json.content).toMatch(/Inhalers when your hands are stiff/);
    expect(json.content).toMatch(/Methotrexate<\/strong> can rarely cause inflammation of the lungs/);
    expect(json.content).not.toMatch(/nidirect/i);
    expect(json.title).not.toBe(general.title);
    expect(json.meta_title).not.toBe(general.meta_title);
  });

  it("equipment post hands off early to products and mobility aid guides and keeps the merged second-hand buying advice", () => {
    const json = JSON.parse(read("short-term-equipment-loans-arthritis-uk")) as Post;
    const general = JSON.parse(read("gadgets-aids-arthritis-uk")) as Post;
    expect(json.content.indexOf('href="/blog/gadgets-aids-arthritis-uk"')).toBeLessThan(1800);
    expect(json.content.indexOf('href="/blog/walking-aids-arthritis-uk"')).toBeLessThan(1800);
    expect(json.content).toMatch(/free if you are assessed as needing them/);
    expect(json.content).toMatch(/community equipment service/);
    expect(json.content).toMatch(/British Red Cross/);
    expect(json.content).toMatch(/Second-hand equipment<\/strong>/);
    expect(json.content).toMatch(/Giving equipment back/);
    expect(json.content).not.toMatch(/£\d/);
    expect(json.title).not.toBe(general.title);
    expect(json.meta_title).not.toBe(general.meta_title);
  });

  it("topic clusters list both guides", () => {
    const cluster = TOPIC_CLUSTERS.find((c) => c.id === "exercises")!;
    for (const slug of cases.map((c) => c.slug)) {
      expect(cluster.supportingPaths).toContain(`/blog/${slug}`);
      expect(getClusterForPath(`/blog/${slug}`)).toBeTruthy();
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
        new RegExp(`<loc>https://livingwitharthritis.org.uk/blog/${slug}</loc>\\s*<lastmod>2026-11-\\d{2}</lastmod>`),
      );
    }
  });
});
