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
    name: "Pacing housework",
    slug: "pacing-housework-arthritis-frailty-uk",
    title: /Pacing Housework With Arthritis \(UK\)/i,
    category: "Diet & lifestyle",
    cluster: "pain",
    cites: [
      "https://www.nhs.uk/social-care-and-support/care-services-equipment-and-care-homes/household-gadgets-and-equipment-to-make-life-easier/",
      "https://www.nhs.uk/social-care-and-support/help-from-social-services-and-charities/getting-a-needs-assessment/",
      "https://www.nhs.uk/conditions/occupational-therapy/",
      "https://www.gov.uk/attendance-allowance",
    ],
    links: [
      "/blog/pacing-techniques-arthritis-pain",
      "/blog/joint-protection-easier-everyday-tasks",
      "/blog/activity-diary-arthritis-frailty-uk",
      "/blog/kitchen-adaptations-arthritis-frailty-uk",
      "/blog/occupational-therapy-arthritis-uk",
      "/blog/social-care-needs-assessment-arthritis-uk",
    ],
    early: ["/blog/pacing-techniques-arthritis-pain", "/blog/joint-protection-easier-everyday-tasks"],
    must: [/plan, prioritise, pace/i, /boom and bust/, /Visitors, family days and weekends/, /When to get help with housework/],
  },
  {
    name: "Osteoporosis and arthritis",
    slug: "osteoporosis-arthritis-frailty-bone-joint-uk",
    title: /Osteoporosis and Arthritis: Protecting Bones \(UK\)/i,
    category: "Conditions",
    cluster: "treatments",
    cites: [
      "https://www.nhs.uk/conditions/osteoporosis/",
      "https://www.nhs.uk/conditions/dexa-scan/",
      "https://www.nice.org.uk/guidance/cg146",
      "https://theros.org.uk/information-and-support/bone-health/exercise-for-bones/",
    ],
    links: [
      "/blog/bone-protection-steroids-arthritis-frailty-uk",
      "/blog/lwa-archive-osteoporosis-vs-arthritis-what-s-the-difference",
      "/blog/vitamin-d-winter-arthritis-frailty-uk",
      "/blog/falls-clinic-arthritis-what-to-expect-uk",
      "/blog/strength-training-arthritis-beginners",
      "/blog/living-alone-falls-plan-arthritis-uk",
    ],
    early: ["/blog/bone-protection-steroids-arthritis-frailty-uk", "/blog/lwa-archive-osteoporosis-vs-arthritis-what-s-the-difference"],
    must: [/usually causes no obvious symptoms/, /DEXA scan/, /fracture liaison service/, /Do not drive yourself/],
  },
  {
    name: "Night pain and sleep in later life",
    slug: "sleep-arthritis-frailty-night-pain-uk",
    title: /Night Pain and Sleep With Arthritis in Later Life/i,
    category: "Pain & flares",
    cluster: "pain",
    cites: [
      "https://www.nhs.uk/conditions/insomnia/",
      "https://www.nhs.uk/live-well/sleep-and-tiredness/how-to-get-to-sleep/",
      "https://www.nhs.uk/conditions/falls/",
      "https://www.nice.org.uk/guidance/ng193",
    ],
    links: [
      "/blog/how-to-sleep-with-arthritis-uk",
      "/blog/sleep-and-pain-management-arthritis",
      "/blog/sleeping-tablets-falls-arthritis-frailty-uk",
      "/blog/night-lights-arthritis-falls-frailty-uk",
      "/blog/continence-night-trips-arthritis-frailty-uk",
      "/blog/best-sleep-positions-joint-pain",
    ],
    early: ["/blog/how-to-sleep-with-arthritis-uk", "/blog/sleep-and-pain-management-arthritis"],
    must: [/Sit on the edge of the bed/, /CBT-I/, /Never go to sleep with a heat pack/, /When night pain needs checking/],
  },
];

describe("GSC Champions 122–124 (4 Nov): pacing housework, osteoporosis with arthritis, night pain and sleep", () => {
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

  it("topic clusters list all three guides", () => {
    for (const c of cases) {
      const cluster = TOPIC_CLUSTERS.find((x) => x.id === c.cluster)!;
      expect(cluster.supportingPaths).toContain(`/blog/${c.slug}`);
      expect(getClusterForPath(`/blog/${c.slug}`)).toBeTruthy();
    }
  });

  it("chatbot KB, llms.txt, ai.txt and sitemap surface all three rewritten URLs", () => {
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
