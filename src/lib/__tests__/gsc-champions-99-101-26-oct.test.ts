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

const cases: Array<{
  name: string;
  slug: string;
  title: RegExp;
  category: string;
  cites: string[];
  links: string[];
  cluster: "treatments" | "flare-ups";
}> = [
  {
    name: "RA fatigue in later life",
    slug: "ra-fatigue-frailty-energy-envelope-uk",
    title: /RA Fatigue in Later Life: Pacing and Checks \(UK\)/i,
    category: "Mental health & fatigue",
    cites: [
      "https://nras.org.uk/resource/fatigue/",
      "https://www.nhs.uk/conditions/tiredness-and-fatigue/",
      "https://www.nice.org.uk/guidance/ng100/chapter/Recommendations",
      "https://www.nhs.uk/conditions/insomnia/",
    ],
    links: [
      "/blog/arthritis-fatigue-management-uk",
      "/blog/energy-management-and-pacing-arthritis",
      "/blog/ra-monitoring-older-frail-adults-uk",
      "/blog/sleep-apnoea-arthritis-frailty-uk",
      "/blog/depression-arthritis-when-to-seek-help",
      "/blog/chair-based-exercise-ra-frailty-uk",
    ],
    cluster: "flare-ups",
  },
  {
    name: "Getting to blood tests when travel is hard",
    slug: "blood-test-transport-arthritis-frailty-uk",
    title: /Getting to Blood Tests When Travel Is Hard \(UK\)/i,
    category: "Conditions",
    cites: [
      "https://www.nhs.uk/nhs-services/hospitals/going-into-hospital/how-to-organise-transport-to-and-from-hospital/",
      "https://www.england.nhs.uk/wp-content/uploads/2022/05/B1244-nepts-eligibility-criteria.pdf",
      "https://www.nhs.uk/nhs-services/help-with-health-costs/healthcare-travel-costs-scheme-htcs/",
      "https://www.nhs.uk/tests-and-treatments/blood-tests/",
    ],
    links: [
      "/blog/ra-monitoring-older-frail-adults-uk",
      "/blog/methotrexate-older-frail-adults-uk",
      "/blog/community-transport-arthritis-frailty-uk",
      "/blog/blue-badge-frailty-arthritis-uk",
      "/guides/benefits-pip",
    ],
    cluster: "treatments",
  },
  {
    name: "Preparing for a rheumatology appointment",
    slug: "rheumatology-clinic-frail-older-adult-uk",
    title: /Rheumatology Appointments in Later Life \(UK\)/i,
    category: "Treatments & medicines",
    cites: [
      "https://www.nice.org.uk/guidance/ng100/chapter/Recommendations",
      "https://nras.org.uk/resource/how-to-approach-your-rheumatology-consultation/",
      "https://www.nhs.uk/nhs-services/hospitals/what-is-pals-patient-advice-and-liaison-service/",
    ],
    links: [
      "/blog/ra-monitoring-older-frail-adults-uk",
      "/blog/late-onset-ra-frailty-first-months-uk",
      "/blog/blood-test-transport-arthritis-frailty-uk",
      "/blog/hospital-appointments-frailty-arthritis-uk",
      "/guides/newly-diagnosed",
    ],
    cluster: "treatments",
  },
];

describe("GSC Champions 99–101 (26 Oct): RA fatigue, blood-test transport, rheumatology appointments", () => {
  for (const c of cases) {
    it(`${c.name} is reviewed by Louis Maxwell with CTR meta, UK cites and customer-job links`, () => {
      const raw = read(c.slug);
      const json = JSON.parse(raw) as Post;
      expect(json.reviewStatus).toBeUndefined();
      expect(json.reviewed_by).toBe("Louis Maxwell");
      expect(json.reviewer_credentials).toMatch(/PH128483/);
      expect(json.last_reviewed).toBe("2026-10-26");
      expect(json.content).not.toMatch(/pending clinical review/i);
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

  it("RA fatigue post hands off early to the general fatigue and pacing guides and says when tiredness needs a GP check", () => {
    const json = JSON.parse(read("ra-fatigue-frailty-energy-envelope-uk")) as Post;
    const general = JSON.parse(read("arthritis-fatigue-management-uk")) as Post;
    expect(json.content.indexOf('href="/blog/arthritis-fatigue-management-uk"')).toBeLessThan(1800);
    expect(json.content).toMatch(/anaemia/i);
    expect(json.content).toMatch(/thyroid/i);
    expect(json.content).toMatch(/Samaritans/);
    expect(json.content).toMatch(/116 123/);
    expect(json.title).not.toBe(general.title);
    expect(json.meta_title).not.toBe(general.meta_title);
  });

  it("blood-test transport post covers patient transport, travel costs and never stopping a medicine over a missed test", () => {
    const json = JSON.parse(read("blood-test-transport-arthritis-frailty-uk")) as Post;
    expect(json.content).toMatch(/non-emergency patient transport/i);
    expect(json.content).toMatch(/Healthcare Travel Costs Scheme/);
    expect(json.content).toMatch(/HC5\(T\)/);
    expect(json.content).toMatch(/If you miss a test/);
    expect(json.content).toMatch(/Scotland, Wales and Northern Ireland run their own/);
  });

  it("rheumatology appointment post covers what to bring, flare access and the NICE annual review", () => {
    const json = JSON.parse(read("rheumatology-clinic-frail-older-adult-uk")) as Post;
    expect(json.content).toMatch(/medicines list/i);
    expect(json.content).toMatch(/rapid access to specialist care for flares/i);
    expect(json.content).toMatch(/annual review/i);
    expect(json.content).toMatch(/PALS/);
  });

  it("flare-ups fronts RA fatigue; treatments fronts blood-test transport and rheumatology appointments", () => {
    const byId = (id: string) => TOPIC_CLUSTERS.find((c) => c.id === id)!;
    for (const c of cases) {
      expect(byId(c.cluster).supportingPaths).toContain(`/blog/${c.slug}`);
      expect(getClusterForPath(`/blog/${c.slug}`)?.id).toBe(c.cluster);
    }
  });

  it("the article page always renders blog guides as reviewed (no pending state)", () => {
    const page = readFileSync(resolve(process.cwd(), "src/pages/BlogPost.tsx"), "utf8");
    expect(page).not.toMatch(/isPendingReview/);
    expect(page).toMatch(/reviewStatus="reviewed"/);
    expect(page).toMatch(/isVerifiedMaxwellReviewer\(reviewerName, reviewerCreds\)/);
  });

  it("chatbot KB, llms.txt, ai.txt and sitemap surface the three rewritten URLs", () => {
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
