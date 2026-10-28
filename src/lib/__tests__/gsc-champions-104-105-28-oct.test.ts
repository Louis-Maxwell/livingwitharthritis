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
    name: "Heat and cold with thin skin, numbness or diabetes",
    slug: "heat-versus-ice-frail-arthritis-uk",
    title: /Heat or Ice With Thin Skin, Numbness or Diabetes \(UK\)/i,
    category: "Pain & flares",
    cites: [
      "https://www.nhs.uk/conditions/osteoarthritis/treatment/",
      "https://www.nhs.uk/conditions/burns-and-scalds/",
      "https://www.nhs.uk/conditions/peripheral-neuropathy/",
      "https://www.nhs.uk/conditions/raynauds/",
      "https://www.nice.org.uk/guidance/ng226",
    ],
    links: [
      "/blog/heat-or-ice-for-arthritis",
      "/blog/heat-packs-frail-arthritis-uk",
      "/blog/cold-weather-arthritis-uk-winter",
      "/blog/winter-arthritis-frailty-cold-houses-uk",
      "/blog/diabetes-arthritis-frailty-feet-uk",
      "/blog/skin-pressure-care-arthritis-frailty-uk",
      "/arthritis-flare-ups",
      "/guides/arthritis-pain-relief",
    ],
  },
  {
    name: "Living alone falls plan",
    slug: "living-alone-falls-plan-arthritis-uk",
    title: /Living Alone With Arthritis: Your Falls Plan \(UK\)/i,
    category: "Exercise & movement",
    cites: [
      "https://www.nhs.uk/conditions/falls/",
      "https://www.nice.org.uk/guidance/ng249",
      "https://www.gov.uk/apply-needs-assessment-social-services",
      "https://www.ageuk.org.uk/information-advice/health-wellbeing/exercise/falls-prevention/",
    ],
    links: [
      "/blog/night-lights-arthritis-falls-frailty-uk",
      "/blog/community-alarm-arthritis-frailty-uk",
      "/blog/pendant-alarm-arthritis-swollen-fingers-uk",
      "/blog/falls-response-service-arthritis-uk",
      "/blog/confidence-after-fall-arthritis-frailty-uk",
      "/blog/sit-to-stand-practice-frail-arthritis-uk",
      "/guides/fall-prevention-older-adults",
    ],
  },
];

describe("GSC Champions 104–105 (28 Oct): heat and cold safety, living alone falls plan", () => {
  for (const c of cases) {
    it(`${c.name} is reviewed by Louis Maxwell with CTR meta, UK cites and customer-job links`, () => {
      const raw = read(c.slug);
      const json = JSON.parse(raw) as Post;
      expect(json.reviewStatus).toBeUndefined();
      expect(json.reviewed_by).toBe("Louis Maxwell");
      expect(json.reviewer_credentials).toMatch(/PH128483/);
      expect(json.last_reviewed).toBe("2026-10-28");
      expect(json.content).toMatch(/Clinically reviewed by Louis Maxwell \(HCPC PH128483\) on 28 October 2026/);
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

  it("heat and cold post hands off early to the general heat-or-ice guide and covers numb feet, burns and red flags", () => {
    const json = JSON.parse(read("heat-versus-ice-frail-arthritis-uk")) as Post;
    const general = JSON.parse(read("heat-or-ice-for-arthritis")) as Post;
    expect(json.content.indexOf('href="/blog/heat-or-ice-for-arthritis"')).toBeLessThan(1800);
    expect(json.content).toMatch(/numb feet/i);
    expect(json.content).toMatch(/cool running water for 20 minutes/);
    expect(json.content).toMatch(/Never sleep with a heat pack/);
    expect(json.content).toMatch(/Raynaud/);
    expect(json.content).toMatch(/joint infection/i);
    expect(json.title).not.toBe(general.title);
    expect(json.meta_title).not.toBe(general.meta_title);
  });

  it("living alone post stays on the falls plan (route lighting is Champion 97) and covers alarms, access, getting up and 999", () => {
    const json = JSON.parse(read("living-alone-falls-plan-arthritis-uk")) as Post;
    const lights = JSON.parse(read("night-lights-arthritis-falls-frailty-uk")) as Post;
    expect(json.content.indexOf('href="/blog/night-lights-arthritis-falls-frailty-uk"')).toBeLessThan(1800);
    expect(json.content).toMatch(/key safe/i);
    expect(json.content).toMatch(/daily check-in/i);
    expect(json.content).toMatch(/roll onto your side/i);
    expect(json.content).toMatch(/change position about every 30 minutes/);
    expect(json.content).toMatch(/care needs assessment/);
    expect(json.content).toMatch(/head, neck, back or hip/);
    expect(json.title).not.toBe(lights.title);
    expect(json.meta_title).not.toBe(lights.meta_title);
  });

  it("topic clusters list both guides", () => {
    const pain = TOPIC_CLUSTERS.find((c) => c.id === "pain")!;
    const ex = TOPIC_CLUSTERS.find((c) => c.id === "exercises")!;
    expect(pain.supportingPaths).toContain("/blog/heat-versus-ice-frail-arthritis-uk");
    expect(ex.supportingPaths).toContain("/blog/living-alone-falls-plan-arthritis-uk");
    for (const c of cases) expect(getClusterForPath(`/blog/${c.slug}`)).toBeTruthy();
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
        new RegExp(`<loc>https://livingwitharthritis.org.uk/blog/${slug}</loc>\\s*<lastmod>2026-10-28</lastmod>`),
      );
    }
  });
});
