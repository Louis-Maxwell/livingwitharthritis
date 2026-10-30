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
    name: "Inflammatory arthritis flare week",
    slug: "inflammatory-arthritis-frailty-flare-week-uk",
    title: /Inflammatory Arthritis Flare Week: A Plan \(UK\)/i,
    category: "Pain & flares",
    cites: [
      "https://www.nice.org.uk/guidance/ng100",
      "https://www.nhs.uk/conditions/rheumatoid-arthritis/treatment/",
      "https://www.nhs.uk/medicines/methotrexate/side-effects-of-methotrexate/",
      "https://www.nhs.uk/conditions/septic-arthritis/",
      "https://www.nhs.uk/conditions/sepsis/",
      "https://www.nhs.uk/conditions/nsaids/",
    ],
    links: [
      "/blog/flare-versus-frailty-arthritis-uk",
      "/blog/arthritis-flare-up-what-to-do",
      "/blog/deconditioning-after-arthritis-flare-uk",
      "/blog/chair-based-exercise-ra-frailty-uk",
      "/resources/flare-action-plan",
      "/arthritis-flare-ups",
    ],
  },
  {
    name: "Dosette boxes with sore hands",
    slug: "dosette-boxes-arthritis-frailty-hands-uk",
    title: /Dosette Boxes and Pill Packs With Sore Hands \(UK\)/i,
    category: "Treatments & medicines",
    cites: [
      "https://www.nice.org.uk/guidance/ng5",
      "https://www.nice.org.uk/guidance/ng67",
      "https://www.nhs.uk/nhs-services/pharmacies/how-pharmacies-can-help/",
      "https://www.nhs.uk/medicines/methotrexate/how-and-when-to-take-methotrexate/",
      "https://www.gov.uk/guidance/equality-act-2010-guidance",
    ],
    links: [
      "/blog/pharmacist-medication-review-frail-arthritis-uk",
      "/blog/painkillers-older-adults-arthritis-caution-uk",
      "/blog/methotrexate-older-frail-adults-uk",
      "/blog/gadgets-aids-arthritis-uk",
      "/blog/hand-osteoarthritis-frailty-dressing-cooking-uk",
    ],
  },
  {
    name: "Hand osteoarthritis day to day",
    slug: "hand-osteoarthritis-frailty-dressing-cooking-uk",
    title: /Hand Osteoarthritis: Easier Dressing and Grip \(UK\)/i,
    category: "Diet & lifestyle",
    cites: [
      "https://www.nice.org.uk/guidance/ng226",
      "https://www.nhs.uk/conditions/osteoarthritis/living-with/",
      "https://www.nhs.uk/tests-and-treatments/occupational-therapy/",
      "https://www.nhs.uk/conditions/carpal-tunnel-syndrome/",
      "https://www.gov.uk/apply-needs-assessment-social-services",
    ],
    links: [
      "/blog/cooking-with-arthritis-uk",
      "/blog/thumb-base-pain-early-hand-arthritis",
      "/blog/hand-exercises-for-arthritis",
      "/blog/joint-protection-easier-everyday-tasks",
      "/blog/topical-nsaids-frail-hand-knee-oa-uk",
      "/blog/occupational-therapy-arthritis-uk",
    ],
  },
];

describe("GSC Champions 109–111 (30 Oct): inflammatory arthritis flare week, dosette boxes with sore hands, hand osteoarthritis day to day", () => {
  for (const c of cases) {
    it(`${c.name} is reviewed by Louis Maxwell with CTR meta, UK cites and customer-job links`, () => {
      const raw = read(c.slug);
      const json = JSON.parse(raw) as Post;
      expect(json.reviewStatus).toBeUndefined();
      expect(json.reviewed_by).toBe("Louis Maxwell");
      expect(json.reviewer_credentials).toMatch(/PH128483/);
      expect(json.last_reviewed).toBe("2026-10-30");
      expect(json.content).toMatch(/Clinically reviewed by Louis Maxwell \(HCPC PH128483\) on 30 October 2026/);
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

  it("flare week post hands off early to the flare guides and covers the advice line, moving hourly, DMARD infections and recovery", () => {
    const json = JSON.parse(read("inflammatory-arthritis-frailty-flare-week-uk")) as Post;
    const general = JSON.parse(read("arthritis-flare-up-what-to-do")) as Post;
    expect(json.content.indexOf('href="/blog/flare-versus-frailty-arthritis-uk"')).toBeLessThan(1800);
    expect(json.content.indexOf('href="/blog/arthritis-flare-up-what-to-do"')).toBeLessThan(1800);
    expect(json.content).toMatch(/advice line/i);
    expect(json.content).toMatch(/Keep moving a little every hour/);
    expect(json.content).toMatch(/DMARD/);
    expect(json.content).toMatch(/joint infection/i);
    expect(json.content).toMatch(/After the flare/);
    expect(json.title).not.toBe(general.title);
    expect(json.meta_title).not.toBe(general.meta_title);
  });

  it("dosette post hands off early to the medication review guide and covers suitability, easy-open tops and weekly methotrexate", () => {
    const json = JSON.parse(read("dosette-boxes-arthritis-frailty-hands-uk")) as Post;
    const general = JSON.parse(read("pharmacist-medication-review-frail-arthritis-uk")) as Post;
    expect(json.content.indexOf('href="/blog/pharmacist-medication-review-frail-arthritis-uk"')).toBeLessThan(1800);
    expect(json.content).toMatch(/Not every medicine can go in a box/);
    expect(json.content).toMatch(/easy-open tops/i);
    expect(json.content).toMatch(/methotrexate[^.]*once a week/i);
    expect(json.content).toMatch(/Equality Act 2010/);
    expect(json.title).not.toBe(general.title);
    expect(json.meta_title).not.toBe(general.meta_title);
  });

  it("hand OA post hands off early to cooking and thumb guides and covers dressing aids, OT and GP red flags", () => {
    const json = JSON.parse(read("hand-osteoarthritis-frailty-dressing-cooking-uk")) as Post;
    const general = JSON.parse(read("cooking-with-arthritis-uk")) as Post;
    expect(json.content.indexOf('href="/blog/cooking-with-arthritis-uk"')).toBeLessThan(1800);
    expect(json.content.indexOf('href="/blog/thumb-base-pain-early-hand-arthritis"')).toBeLessThan(1800);
    expect(json.content).toMatch(/button hook/i);
    expect(json.content).toMatch(/occupational therapist/i);
    expect(json.content).toMatch(/carpal tunnel/i);
    expect(json.content).toMatch(/When to see a GP/);
    expect(json.title).not.toBe(general.title);
    expect(json.meta_title).not.toBe(general.meta_title);
  });

  it("topic clusters list all three guides", () => {
    const ids = { "inflammatory-arthritis-frailty-flare-week-uk": "flare-ups", "dosette-boxes-arthritis-frailty-hands-uk": "treatments", "hand-osteoarthritis-frailty-dressing-cooking-uk": "osteoarthritis" } as const;
    for (const [slug, id] of Object.entries(ids)) {
      const cluster = TOPIC_CLUSTERS.find((c) => c.id === id)!;
      expect(cluster.supportingPaths).toContain(`/blog/${slug}`);
      expect(getClusterForPath(`/blog/${slug}`)).toBeTruthy();
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
        new RegExp(`<loc>https://livingwitharthritis.org.uk/blog/${slug}</loc>\\s*<lastmod>2026-10-30</lastmod>`),
      );
    }
  });
});
