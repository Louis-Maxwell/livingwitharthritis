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
  cluster: "flare-ups" | "exercises" | "treatments";
}> = [
  {
    name: "Rebuilding strength after a flare",
    slug: "deconditioning-after-arthritis-flare-uk",
    title: /Rebuilding Strength After an Arthritis Flare.*\(UK\)/i,
    cites: [
      "https://www.nhs.uk/tests-and-treatments/physiotherapy/",
      "https://www.nhs.uk/live-well/exercise/physical-activity-guidelines-older-adults/",
      "https://www.nhs.uk/live-well/exercise/strength-and-flexibility-exercises/sitting-exercises/",
      "https://www.nhs.uk/conditions/deep-vein-thrombosis-dvt/",
      "https://www.nhs.uk/conditions/rheumatoid-arthritis/treatment/",
      "https://www.nice.org.uk/guidance/ng226",
    ],
    links: [
      "/blog/arthritis-flare-up-what-to-do",
      "/resources/flare-action-plan",
      "/blog/energy-management-and-pacing-arthritis",
      "/blog/staying-active-arthritis-winter-uk",
      "/blog/strength-training-arthritis-beginners",
      "/blog/walking-with-arthritis-start-build-up-keep-going",
      "/blog/arthritis-physiotherapy-nhs-waiting-list",
      "/arthritis-waiting-list-help",
      "/blog/chest-infection-arthritis-frailty-uk",
      "/blog/confidence-after-fall-arthritis-frailty-uk",
      "/blog/pharmacist-medication-review-frail-arthritis-uk",
      "/exercises",
    ],
    cluster: "flare-ups",
  },
  {
    name: "Confidence after a fall",
    slug: "confidence-after-fall-arthritis-frailty-uk",
    title: /Fear of Falling After a Fall With Arthritis.*\(UK\)/i,
    cites: [
      "https://www.nhs.uk/conditions/falls/",
      "https://www.nhs.uk/live-well/exercise/physical-activity-guidelines-older-adults/",
      "https://www.nhs.uk/live-well/exercise/strength-and-flexibility-exercises/balance-exercises/",
      "https://www.nice.org.uk/guidance/ng249",
      "https://www.ageuk.org.uk/information-advice/health-wellbeing/exercise/falls-prevention/",
      "https://www.nhs.uk/conditions/head-injury-and-concussion/",
    ],
    links: [
      "/blog/ice-snow-arthritis-frailty-uk",
      "/blog/sleeping-tablets-falls-arthritis-frailty-uk",
      "/guides/fall-prevention-older-adults",
      "/blog/bone-protection-steroids-arthritis-frailty-uk",
      "/blog/pharmacist-medication-review-frail-arthritis-uk",
      "/blog/balance-training-arthritis",
      "/exercises/tai-chi-for-balance",
      "/blog/walking-aids-arthritis-uk",
      "/blog/deconditioning-after-arthritis-flare-uk",
      "/arthritis-mental-health",
    ],
    cluster: "exercises",
  },
  {
    name: "Pharmacist medication review",
    slug: "pharmacist-medication-review-frail-arthritis-uk",
    title: /Medication Review With Arthritis.*\(UK\)/i,
    cites: [
      "https://www.england.nhs.uk/primary-care/pharmacy/smr/",
      "https://www.nhs.uk/nhs-services/pharmacies/get-help-with-newly-prescribed-medicines/",
      "https://www.nice.org.uk/guidance/ng5",
      "https://www.nice.org.uk/guidance/ng249",
      "https://www.nhs.uk/conditions/falls/",
      "https://yellowcard.mhra.gov.uk/",
    ],
    links: [
      "/blog/starting-a-new-arthritis-medicine-questions-to-ask",
      "/blog/food-drink-and-arthritis-medicines-interactions",
      "/blog/sleeping-tablets-falls-arthritis-frailty-uk",
      "/blog/stopping-arthritis-medication-safely-a-step-by-step-guide",
      "/blog/steroid-emergency-card-frail-arthritis-uk",
      "/blog/bone-protection-steroids-arthritis-frailty-uk",
      "/blog/confidence-after-fall-arthritis-frailty-uk",
      "/blog/ra-steroids-frailty-infection-watch-uk",
      "/resources/flare-action-plan",
    ],
    cluster: "treatments",
  },
];

describe("GSC Champions 85–87 (19 Oct): strength after a flare + confidence after a fall + medication reviews", () => {
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

  it("deconditioning post leads with small steps, pacing, NHS physio self-referral and DVT red flags", () => {
    const json = JSON.parse(read("deconditioning-after-arthritis-flare-uk")) as Post;
    expect(json.content).toMatch(/refer yourself to NHS community musculoskeletal \(MSK\) services/);
    expect(json.content).toMatch(/at least 2 days a week/);
    expect(json.content).toMatch(/confined to bed for 3 days or more/);
    expect(json.content).toMatch(/do not stop them early/);
    expect(json.content.indexOf('href="/blog/arthritis-flare-up-what-to-do"')).toBeLessThan(1200);
    expect(json.content.indexOf('href="/blog/energy-management-and-pacing-arthritis"')).toBeLessThan(1400);
  });

  it("confidence-after-fall post covers GP/falls service, self-referral, getting up safely and CBT for fear of falling", () => {
    const json = JSON.parse(read("confidence-after-fall-arthritis-frailty-uk")) as Post;
    expect(json.content).toMatch(/specialist falls service/);
    expect(json.content).toMatch(/refer yourself to falls services/);
    expect(json.content).toMatch(/do not try to lift them yourself/);
    expect(json.content).toMatch(/cognitive behavioural/);
    expect(json.content).toMatch(/do not stop prescribed medicines yourself/i);
    expect(json.content.indexOf('href="/blog/ice-snow-arthritis-frailty-uk"')).toBeLessThan(1200);
  });

  it("medication review post explains SMR and NMS honestly and never-stop framing", () => {
    const json = JSON.parse(read("pharmacist-medication-review-frail-arthritis-uk")) as Post;
    expect(json.content).toMatch(/Structured Medication Review/);
    expect(json.content).toMatch(/New Medicine Service/);
    expect(json.content).toMatch(/Rheumatoid arthritis and osteoarthritis are not currently on the list/);
    expect(json.content).toMatch(/Never stop or change medicines yourself/);
    expect(json.content).toMatch(/Yellow Card/);
    expect(json.content.indexOf('href="/blog/starting-a-new-arthritis-medicine-questions-to-ask"')).toBeLessThan(1200);
  });

  it("flare-ups fronts deconditioning; exercises fronts confidence after a fall; treatments fronts medication reviews", () => {
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
        new RegExp(`<loc>https://livingwitharthritis.org.uk/blog/${slug}</loc>\\s*<lastmod>2026-10-19</lastmod>`),
      );
    }
  });
});
