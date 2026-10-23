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
  cluster: "treatments" | "symptoms";
}> = [
  {
    name: "Methotrexate in later life",
    slug: "methotrexate-older-frail-adults-uk",
    title: /Methotrexate in Later Life.*\(UK\)/i,
    category: "Treatments & medicines",
    cites: [
      "https://www.nhs.uk/medicines/methotrexate/how-and-when-to-take-methotrexate/",
      "https://www.nhs.uk/medicines/methotrexate/side-effects-of-methotrexate/",
      "https://www.nhs.uk/medicines/methotrexate/common-questions-about-methotrexate/",
      "https://www.gov.uk/drug-safety-update/methotrexate-once-weekly-for-autoimmune-diseases-new-measures-to-reduce-risk-of-fatal-overdose-due-to-inadvertent-daily-instead-of-weekly-dosing",
      "https://www.nice.org.uk/guidance/ng100",
      "https://nras.org.uk/resource/methotrexate/",
      "https://yellowcard.mhra.gov.uk/",
    ],
    links: [
      "/blog/dmards-explained-how-methotrexate-slows-rheumatoid-arthritis",
      "/blog/managing-methotrexate-side-effects-practical-tips",
      "/blog/ra-monitoring-older-frail-adults-uk",
      "/blog/blood-test-transport-arthritis-frailty-uk",
      "/blog/vaccines-on-dmards-and-biologics-uk-guide",
      "/blog/flu-jab-arthritis-frailty-uk",
      "/blog/shingles-vaccine-arthritis-frailty-uk",
      "/blog/uti-confusion-arthritis-frailty-uk",
      "/blog/chest-infection-arthritis-frailty-uk",
      "/blog/pharmacist-medication-review-frail-arthritis-uk",
      "/blog/stopping-arthritis-medication-safely-a-step-by-step-guide",
    ],
    cluster: "treatments",
  },
  {
    name: "RA later in life: first months",
    slug: "late-onset-ra-frailty-first-months-uk",
    title: /Rheumatoid Arthritis Later in Life: First Months.*\(UK\)/i,
    category: "Conditions",
    cites: [
      "https://www.nice.org.uk/guidance/ng100/chapter/Recommendations",
      "https://www.nhs.uk/conditions/rheumatoid-arthritis/treatment/",
      "https://www.nhs.uk/conditions/rheumatoid-arthritis/living-with/",
      "https://www.nhs.uk/live-well/exercise/physical-activity-guidelines-older-adults/",
      "https://nras.org.uk/resource/what-is-ra/",
    ],
    links: [
      "/guides/newly-diagnosed",
      "/blog/methotrexate-older-frail-adults-uk",
      "/blog/ra-monitoring-older-frail-adults-uk",
      "/blog/rheumatology-appointment-what-to-expect-uk",
      "/blog/how-arthritis-is-diagnosed-tests-scans-results",
      "/blog/chair-based-exercise-ra-frailty-uk",
      "/blog/sit-to-stand-practice-frail-arthritis-uk",
      "/blog/ra-fatigue-frailty-energy-envelope-uk",
      "/blog/arthritis-flare-up-what-to-do",
    ],
    cluster: "symptoms",
  },
  {
    name: "RA monitoring in later life",
    slug: "ra-monitoring-older-frail-adults-uk",
    title: /RA Monitoring in Later Life.*\(UK\)/i,
    category: "Conditions",
    cites: [
      "https://www.nice.org.uk/guidance/ng100/chapter/Recommendations",
      "https://www.nhs.uk/conditions/rheumatoid-arthritis/living-with/",
      "https://nras.org.uk/resource/monitoring-ra/",
      "https://yellowcard.mhra.gov.uk/",
    ],
    links: [
      "/blog/methotrexate-older-frail-adults-uk",
      "/blog/late-onset-ra-frailty-first-months-uk",
      "/blog/arthritis-blood-tests-explained-uk",
      "/blog/blood-test-transport-arthritis-frailty-uk",
      "/blog/leflunomide-for-arthritis-blood-tests-side-effects",
      "/blog/sulfasalazine-for-arthritis-what-to-expect",
      "/blog/rheumatology-clinic-frail-older-adult-uk",
      "/blog/ra-steroids-frailty-infection-watch-uk",
      "/blog/arthritis-flare-up-what-to-do",
    ],
    cluster: "treatments",
  },
];

describe("GSC Champions 94–96 (22 Oct): methotrexate in later life + RA first months + RA monitoring", () => {
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
      expect(raw).not.toMatch(/osteoarthritis/i);
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

  it("methotrexate post keeps the once-weekly, infection and vaccine safety messages without doses", () => {
    const json = JSON.parse(read("methotrexate-older-frail-adults-uk")) as Post;
    expect(json.content).toMatch(/<strong>once a week<\/strong>/);
    expect(json.content).toMatch(/taken it daily instead of weekly, contact NHS 111/);
    expect(json.content).toMatch(/every 1 to 2 weeks/);
    expect(json.content).toMatch(/every 2 to 3 months/);
    expect(json.content).toMatch(/Do not decide alone/);
    expect(json.content).toMatch(/trimethoprim and co-trimoxazole/);
    expect(json.content).toMatch(/nasal spray is a live vaccine/);
    expect(json.content).toMatch(/It does not give doses/);
    expect(json.content.indexOf('href="/blog/dmards-explained-how-methotrexate-slows-rheumatoid-arthritis"')).toBeLessThan(1500);
  });

  it("first-months post follows NICE NG100 (early DMARD, monthly checks, treat-to-target) and keeps people moving", () => {
    const json = JSON.parse(read("late-onset-ra-frailty-first-months-uk")) as Post;
    expect(json.content).toMatch(/ideally within 3 months of persistent symptoms starting/);
    expect(json.content).toMatch(/checked monthly by the specialist team until the target is reached/);
    expect(json.content).toMatch(/up to 12 weeks/);
    expect(json.content).toMatch(/at least 2 days a week/);
    expect(json.content).toMatch(/0800 298 7650/);
    expect(json.content.indexOf('href="/guides/newly-diagnosed"')).toBeLessThan(1500);
  });

  it("monitoring post covers disease activity, safety tests, the annual review and what to report, distinct from the methotrexate post", () => {
    const json = JSON.parse(read("ra-monitoring-older-frail-adults-uk")) as Post;
    const mtx = JSON.parse(read("methotrexate-older-frail-adults-uk")) as Post;
    expect(json.content).toMatch(/DAS28/);
    expect(json.content).toMatch(/What the annual review should cover/);
    expect(json.content).toMatch(/What to report between appointments/);
    expect(json.content).toMatch(/never reduce or stop on your own/);
    expect(json.content.indexOf('href="/blog/methotrexate-older-frail-adults-uk"')).toBeLessThan(1200);
    expect(mtx.content.indexOf('href="/blog/ra-monitoring-older-frail-adults-uk"')).toBeLessThan(1500);
    // distinct jobs: the monitoring page does not repeat the methotrexate vaccine section
    expect(json.content).not.toMatch(/Vaccines while taking methotrexate/);
    expect(mtx.content).not.toMatch(/What the annual review should cover/);
  });

  it("treatments fronts methotrexate and RA monitoring; symptoms (newly diagnosed) fronts RA first months", () => {
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
        new RegExp(`<loc>https://livingwitharthritis.org.uk/blog/${slug}</loc>\\s*<lastmod>2026-10-22</lastmod>`),
      );
    }
  });
});
