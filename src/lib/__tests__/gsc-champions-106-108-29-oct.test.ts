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
    name: "Flare or something else",
    slug: "flare-versus-frailty-arthritis-uk",
    title: /Arthritis Flare or Something Else\? Warning Signs \(UK\)/i,
    category: "Pain & flares",
    cites: [
      "https://www.nhs.uk/symptoms/confusion/",
      "https://www.nhs.uk/conditions/septic-arthritis/",
      "https://www.nhs.uk/conditions/sepsis/",
      "https://www.nhs.uk/conditions/polymyalgia-rheumatica/",
      "https://www.nhs.uk/conditions/stroke/",
      "https://www.nice.org.uk/guidance/ng100",
    ],
    links: [
      "/blog/arthritis-flare-up-what-to-do",
      "/blog/inflammatory-arthritis-frailty-flare-week-uk",
      "/blog/deconditioning-after-arthritis-flare-uk",
      "/blog/arthritis-flare-early-warning-signs",
      "/arthritis-flare-ups",
    ],
  },
  {
    name: "Waiting for community physio",
    slug: "community-physio-wait-frail-arthritis-uk",
    title: /Waiting for Community Physio With Arthritis \(UK\)/i,
    category: "Treatments & medicines",
    cites: [
      "https://www.nhs.uk/tests-and-treatments/physiotherapy/",
      "https://www.nice.org.uk/guidance/ng226",
      "https://escape-pain.org/",
      "https://www.gov.uk/apply-needs-assessment-social-services",
    ],
    links: [
      "/blog/arthritis-physiotherapy-nhs-waiting-list",
      "/blog/physiotherapy-home-visit-frail-oa-uk",
      "/blog/sit-to-stand-practice-frail-arthritis-uk",
      "/blog/seated-strength-frail-osteoarthritis-uk",
      "/arthritis-waiting-list-help",
    ],
  },
  {
    name: "Protein when cooking is hard",
    slug: "protein-painful-joints-frailty-uk",
    title: /Protein When Arthritis Makes Cooking Hard \(UK\)/i,
    category: "Diet & lifestyle",
    cites: [
      "https://www.nhs.uk/conditions/malnutrition/",
      "https://www.bda.uk.com/resource/malnutrition.html",
      "https://www.nice.org.uk/guidance/cg32",
      "https://www.nhs.uk/conditions/kidney-disease/",
    ],
    links: [
      "/blog/protein-requirements-arthritis-uk",
      "/blog/appetite-loss-arthritis-frailty-uk",
      "/blog/cooking-with-arthritis-uk",
      "/guides/diet",
    ],
  },
];

describe("GSC Champions 106–108 (29 Oct): flare or something else, waiting for physio, protein when cooking is hard", () => {
  for (const c of cases) {
    it(`${c.name} is reviewed by Louis Maxwell with CTR meta, UK cites and customer-job links`, () => {
      const raw = read(c.slug);
      const json = JSON.parse(raw) as Post;
      expect(json.reviewStatus).toBeUndefined();
      expect(json.reviewed_by).toBe("Louis Maxwell");
      expect(json.reviewer_credentials).toMatch(/PH128483/);
      expect(json.last_reviewed).toBe("2026-10-29");
      expect(json.content).toMatch(/Clinically reviewed by Louis Maxwell \(HCPC PH128483\) on 29 October 2026/);
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

  it("flare post hands off early to the general flare guides and covers infection, joint infection, PMR and stroke", () => {
    const json = JSON.parse(read("flare-versus-frailty-arthritis-uk")) as Post;
    const general = JSON.parse(read("arthritis-flare-up-what-to-do")) as Post;
    expect(json.content.indexOf('href="/blog/arthritis-flare-up-what-to-do"')).toBeLessThan(1800);
    expect(json.content).toMatch(/sudden confusion/i);
    expect(json.content).toMatch(/joint infection/i);
    expect(json.content).toMatch(/polymyalgia rheumatica/i);
    expect(json.content).toMatch(/stroke/i);
    expect(json.title).not.toBe(general.title);
    expect(json.meta_title).not.toBe(general.meta_title);
  });

  it("physio wait post hands off early to the NHS waiting list guide and covers self-referral, home visits and when not to wait", () => {
    const json = JSON.parse(read("community-physio-wait-frail-arthritis-uk")) as Post;
    const general = JSON.parse(read("arthritis-physiotherapy-nhs-waiting-list")) as Post;
    expect(json.content.indexOf('href="/blog/arthritis-physiotherapy-nhs-waiting-list"')).toBeLessThan(1800);
    expect(json.content).toMatch(/self-refer/i);
    expect(json.content).toMatch(/home visit/i);
    expect(json.content).toMatch(/When not to wait/);
    expect(json.title).not.toBe(general.title);
    expect(json.meta_title).not.toBe(general.meta_title);
  });

  it("protein post hands off early to the protein needs guide and covers no-cook foods, swallowing and kidney checks", () => {
    const json = JSON.parse(read("protein-painful-joints-frailty-uk")) as Post;
    const general = JSON.parse(read("protein-requirements-arthritis-uk")) as Post;
    expect(json.content.indexOf('href="/blog/protein-requirements-arthritis-uk"')).toBeLessThan(1800);
    expect(json.content).toMatch(/No-cook and low-effort protein/);
    expect(json.content).toMatch(/swallow/i);
    expect(json.content).toMatch(/kidney/i);
    expect(json.title).not.toBe(general.title);
    expect(json.meta_title).not.toBe(general.meta_title);
  });

  it("topic clusters list all three guides", () => {
    const ids = { "flare-versus-frailty-arthritis-uk": "flare-ups", "community-physio-wait-frail-arthritis-uk": "treatments", "protein-painful-joints-frailty-uk": "diet" } as const;
    for (const [slug, id] of Object.entries(ids)) {
      const cluster = TOPIC_CLUSTERS.find((c) => c.id === id)!;
      expect(cluster.supportingPaths).toContain(`/blog/${slug}`);
      expect(getClusterForPath(`/blog/${slug}`)).toBeTruthy();
    }
  });

  it("new exercise cluster posts from #274 carry Louis Maxwell's review and unique covers", () => {
    const slugs = ["what-is-arthritis", "arthritis-exercise-for-beginners", "arthritis-exercise-programme", "arthritis-health-guides", "gentle-exercises-for-arthritis"];
    const covers = new Set<string>();
    for (const slug of slugs) {
      const json = JSON.parse(read(slug)) as Post & { cover?: string; author?: string };
      expect(json.reviewed_by).toBe("Louis Maxwell");
      expect(json.reviewer_credentials).toMatch(/PH128483/);
      expect(json.author).toBe("Louis Maxwell");
      expect(json.cover).toBeTruthy();
      expect(covers.has(json.cover!)).toBe(false);
      covers.add(json.cover!);
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
        new RegExp(`<loc>https://livingwitharthritis.org.uk/blog/${slug}</loc>\\s*<lastmod>2026-10-29</lastmod>`),
      );
    }
  });
});
