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

const cases: Array<{ name: string; slug: string; title: RegExp; cites: string[]; links: string[] }> = [
  {
    name: "Steroid emergency card",
    slug: "steroid-emergency-card-frail-arthritis-uk",
    title: /Steroid Emergency Card With Arthritis.*\(UK\)/i,
    cites: [
      "https://www.nhs.uk/medicines/prednisolone/common-questions-about-prednisolone-tablets-and-liquid/",
      "https://www.nhs.uk/medicines/prednisolone/how-and-when-to-take-prednisolone-tablets-and-liquid/",
      "https://www.nhs.uk/conditions/addisons-disease/",
      "https://www.endocrinology.org/clinical-practice/clinical-guidance/adrenal-crisis/",
      "https://www.nhs.uk/conditions/sepsis/",
    ],
    links: [
      "/blog/ra-steroids-frailty-infection-watch-uk",
      "/guides/steroids-for-arthritis",
      "/blog/steroid-injections-vs-oral-steroids-when-each-makes-sense",
      "/resources/flare-action-plan",
      "/blog/covid-winter-arthritis-frailty-uk",
      "/blog/carers-assessment-arthritis-frailty-uk",
      "/guides/bone-density-osteoporosis",
      "/arthritis-flare-ups",
    ],
  },
  {
    name: "Shingles vaccine",
    slug: "shingles-vaccine-arthritis-frailty-uk",
    title: /Shingles Vaccine With Arthritis.*\(UK\)/i,
    cites: [
      "https://www.nhs.uk/vaccinations/shingles-vaccine/",
      "https://www.nhs.uk/conditions/shingles/",
      "https://www.nhs.uk/medicines/prednisolone/common-questions-about-prednisolone-tablets-and-liquid/",
    ],
    links: [
      "/blog/vaccines-on-dmards-and-biologics-uk-guide",
      "/blog/flu-jab-arthritis-frailty-uk",
      "/blog/ra-steroids-frailty-infection-watch-uk",
      "/blog/chest-infection-arthritis-frailty-uk",
      "/guides/painkillers-and-nsaids",
      "/conditions/rheumatoid-arthritis",
      "/arthritis-flare-ups",
    ],
  },
  {
    name: "UTI and confusion",
    slug: "uti-confusion-arthritis-frailty-uk",
    title: /UTI and Sudden Confusion With Arthritis.*\(UK\)/i,
    cites: [
      "https://www.nhs.uk/conditions/urinary-tract-infections-utis/",
      "https://www.nhs.uk/symptoms/confusion/",
      "https://www.nhs.uk/conditions/kidney-infection/",
      "https://www.nhs.uk/conditions/sepsis/",
      "https://www.nice.org.uk/guidance/cg103",
    ],
    links: [
      "/blog/steroid-emergency-card-frail-arthritis-uk",
      "/blog/chest-infection-arthritis-frailty-uk",
      "/blog/covid-winter-arthritis-frailty-uk",
      "/guides/painkillers-and-nsaids",
      "/guides/fall-prevention-older-adults",
      "/blog/carers-assessment-arthritis-frailty-uk",
      "/blog/delirium-hospital-arthritis-frailty-uk",
    ],
  },
];

describe("GSC Champions 79–81 (15 Oct): steroid emergency card + shingles vaccine + UTI confusion", () => {
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
      // Educational, not prescribing: no steroid doses for the public to self-administer
      expect(json.content).not.toMatch(/\b100\s?mg hydrocortisone|hydrocortisone 100\s?mg/i);
    });
  }

  it("steroid card post separates the red and blue cards and never-stop framing", () => {
    const json = JSON.parse(read("steroid-emergency-card-frail-arthritis-uk")) as Post;
    expect(json.content).toMatch(/Red NHS Steroid Emergency Card/);
    expect(json.content).toMatch(/Blue steroid treatment card/);
    expect(json.content).toMatch(/longer than 3 weeks/);
    expect(json.content).toMatch(/more than 40mg a day/);
    expect(json.content).toMatch(/Do not stop, skip or lower your steroid dose yourself/);
    expect(json.content).toMatch(/adrenal crisis/);
    expect(json.content).toMatch(/dentist/);
    // Early hand-off to the gold-pass steroids infection guide (Champion 78)
    expect(json.content.indexOf('href="/blog/ra-steroids-frailty-infection-watch-uk"')).toBeLessThan(1200);
  });

  it("shingles post uses NHS eligibility and non-live vaccine framing", () => {
    const json = JSON.parse(read("shingles-vaccine-arthritis-frailty-uk")) as Post;
    expect(json.content).toMatch(/turning 65/);
    expect(json.content).toMatch(/aged 70 to 79/);
    expect(json.content).toMatch(/severely weakened immune system/);
    expect(json.content).toMatch(/non-live/);
    expect(json.content).toMatch(/within 3 days/);
    expect(json.content).toMatch(/Do not stop or pause your arthritis medicines/);
    expect(json.content).toMatch(/one side/);
  });

  it("UTI post carries NHS frail-adult signs, 999 for sudden confusion and the methotrexate antibiotic caution", () => {
    const json = JSON.parse(read("uti-confusion-arthritis-frailty-uk")) as Post;
    expect(json.content).toMatch(/older, frail people/);
    expect(json.content).toMatch(/suddenly becomes confused, drowsy or has difficulty speaking/);
    expect(json.content).toMatch(/65 or older/);
    expect(json.content).toMatch(/trimethoprim and co-trimoxazole/);
    expect(json.content).toMatch(/Do not stop, skip or pause arthritis medicines yourself/);
    expect(json.content).toMatch(/should not be assumed/);
  });

  it("treatments cluster fronts the three champion spokes", () => {
    const treatments = TOPIC_CLUSTERS.find((c) => c.id === "treatments")!;
    for (const slug of cases.map((c) => c.slug)) {
      expect(treatments.supportingPaths).toContain(`/blog/${slug}`);
      expect(getClusterForPath(`/blog/${slug}`)?.id).toBe("treatments");
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
        new RegExp(`<loc>https://livingwitharthritis.org.uk/blog/${slug}</loc>\\s*<lastmod>2026-10-15</lastmod>`),
      );
    }
  });
});
