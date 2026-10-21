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
  cluster: "exercises" | "treatments";
}> = [
  {
    name: "Knee OA staying steady at home",
    slug: "knee-osteoarthritis-frailty-staying-steady-home-uk",
    title: /Knee Osteoarthritis: Staying Steady at Home.*\(UK\)/i,
    cites: [
      "https://www.nhs.uk/conditions/falls/",
      "https://www.nhs.uk/conditions/falls/prevention/",
      "https://www.nice.org.uk/guidance/ng226",
      "https://www.nice.org.uk/guidance/ng249",
      "https://www.nhs.uk/live-well/exercise/strength-and-flexibility-exercises/balance-exercises/",
    ],
    links: [
      "/guides/knee-exercises-for-osteoarthritis",
      "/blog/sit-to-stand-practice-frail-arthritis-uk",
      "/blog/confidence-after-fall-arthritis-frailty-uk",
      "/blog/best-exercises-osteoarthritis-knee-pain-home",
      "/blog/balance-training-arthritis",
      "/blog/walking-aids-arthritis-uk",
      "/guides/fall-prevention-older-adults",
      "/blog/arthritis-physiotherapy-nhs-waiting-list",
      "/blog/pharmacist-medication-review-frail-arthritis-uk",
    ],
    cluster: "exercises",
  },
  {
    name: "Seated strength",
    slug: "seated-strength-frail-osteoarthritis-uk",
    title: /Seated Strength Exercises for Osteoarthritis.*\(UK\)/i,
    cites: [
      "https://www.nhs.uk/live-well/exercise/physical-activity-guidelines-older-adults/",
      "https://www.nhs.uk/live-well/exercise/strength-and-flexibility-exercises/sitting-exercises/",
      "https://www.nice.org.uk/guidance/ng226",
    ],
    links: [
      "/blog/chair-exercises-older-adults-arthritis",
      "/blog/sit-to-stand-practice-frail-arthritis-uk",
      "/blog/resistance-band-workouts-arthritis",
      "/blog/strength-training-arthritis-beginners",
      "/blog/arthritis-flare-up-what-to-do",
      "/blog/deconditioning-after-arthritis-flare-uk",
      "/blog/chair-yoga-elderly-arthritis-stiffness",
      "/blog/arthritis-physiotherapy-nhs-waiting-list",
    ],
    cluster: "exercises",
  },
  {
    name: "Painkillers in later life",
    slug: "painkillers-older-adults-arthritis-caution-uk",
    title: /Painkillers in Later Life With Arthritis.*\(UK\)/i,
    cites: [
      "https://www.nice.org.uk/guidance/ng226/chapter/Recommendations",
      "https://www.nhs.uk/medicines/paracetamol-for-adults/",
      "https://www.nhs.uk/medicines/ibuprofen-for-adults/",
      "https://www.nhs.uk/medicines/codeine/",
      "https://yellowcard.mhra.gov.uk/",
    ],
    links: [
      "/guides/painkillers-and-nsaids",
      "/blog/pharmacist-medication-review-frail-arthritis-uk",
      "/blog/topical-nsaids-often-overlooked-often-effective",
      "/blog/nsaid-stomach-protection-when-you-need-a-ppi",
      "/blog/paracetamol-for-arthritis-pain-what-the-evidence-says",
      "/blog/nsaids-and-arthritis-benefits-risks-and-safer-use",
      "/blog/stopping-arthritis-medication-safely-a-step-by-step-guide",
      "/blog/sleeping-tablets-falls-arthritis-frailty-uk",
      "/guides/arthritis-pain-relief",
    ],
    cluster: "treatments",
  },
];

describe("GSC Champions 91–93 (21 Oct): knee OA steady at home + seated strength + painkillers in later life", () => {
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

  it("knee post gives the NHS get-up-after-a-fall steps and NICE walking-aid advice", () => {
    const json = JSON.parse(read("knee-osteoarthritis-frailty-staying-steady-home-uk")) as Post;
    expect(json.content).toMatch(/roll onto your side, push up onto your hands and knees/);
    expect(json.content).toMatch(/walking aids such as walking sticks are worth considering/);
    expect(json.content).toMatch(/at least 2 days a week/);
    expect(json.content).toMatch(/Do not stop prescribed medicines yourself/);
    expect(json.content.indexOf('href="/guides/knee-exercises-for-osteoarthritis"')).toBeLessThan(1200);
  });

  it("seated strength post explains effort and progression and hands off to the chair routine", () => {
    const json = JSON.parse(read("seated-strength-frail-osteoarthritis-uk")) as Post;
    expect(json.content).toMatch(/the last two or three feel hard/);
    expect(json.content).toMatch(/Change one thing at a time/);
    expect(json.content).toMatch(/at least 2 days a week/);
    expect(json.content.indexOf('href="/blog/chair-exercises-older-adults-arthritis"')).toBeLessThan(1200);
  });

  it("painkillers post follows NICE NG226, gives no doses and keeps safety routes", () => {
    const json = JSON.parse(read("painkillers-older-adults-arthritis-caution-uk")) as Post;
    expect(json.content).toMatch(/Do not routinely offer paracetamol or weak opioids/);
    expect(json.content).toMatch(/Do not offer strong opioids for osteoarthritis/);
    expect(json.content).toMatch(/lowest effective dose for the shortest time/);
    expect(json.content).toMatch(/It does not give doses/);
    expect(json.content).toMatch(/Do not stop or change prescribed medicines yourself/);
    expect(json.content).toMatch(/go to A&amp;E straight away, even if you feel well/);
    expect(json.content).not.toMatch(/\b\d+\s?(mg|milligrams?|tablets? a day)\b/i);
    expect(json.content.indexOf('href="/guides/painkillers-and-nsaids"')).toBeLessThan(1200);
  });

  it("exercises fronts knee steady-at-home and seated strength; treatments fronts painkillers in later life", () => {
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
        new RegExp(`<loc>https://livingwitharthritis.org.uk/blog/${slug}</loc>\\s*<lastmod>2026-10-21</lastmod>`),
      );
    }
  });
});
