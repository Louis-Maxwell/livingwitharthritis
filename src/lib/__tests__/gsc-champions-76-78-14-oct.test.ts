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
    name: "Chest infection",
    slug: "chest-infection-arthritis-frailty-uk",
    title: /Chest Infection With Arthritis.*\(UK\)/i,
    cites: [
      "https://www.nhs.uk/conditions/chest-infection/",
      "https://www.nhs.uk/conditions/pneumonia/",
      "https://www.nhs.uk/conditions/sepsis/",
      "https://www.nhs.uk/vaccinations/pneumococcal-vaccine/",
      "https://www.nice.org.uk/guidance/ng138",
    ],
    links: [
      "/blog/covid-winter-arthritis-frailty-uk",
      "/blog/flu-jab-arthritis-frailty-uk",
      "/blog/vaccines-on-dmards-and-biologics-uk-guide",
      "/blog/ra-steroids-frailty-infection-watch-uk",
      "/guides/painkillers-and-nsaids",
      "/blog/energy-management-and-pacing-arthritis",
      "/blog/staying-active-arthritis-winter-uk",
      "/blog/winter-arthritis-frailty-cold-houses-uk",
      "/guides/fall-prevention-older-adults",
      "/arthritis-flare-ups",
    ],
  },
  {
    name: "Ice and snow",
    slug: "ice-snow-arthritis-frailty-uk",
    title: /Ice and Snow With Arthritis.*\(UK\)/i,
    cites: [
      "https://www.nhs.uk/conditions/falls/",
      "https://www.nhs.uk/conditions/broken-hip/",
      "https://www.nhs.uk/conditions/head-injury-and-concussion/",
      "https://www.nice.org.uk/guidance/ng249",
      "https://www.metoffice.gov.uk/weather/warnings-and-advice/uk-warnings",
    ],
    links: [
      "/guides/fall-prevention-older-adults",
      "/blog/best-walking-shoes-arthritis-uk",
      "/blog/walking-aids-arthritis-uk",
      "/exercises/tai-chi-for-balance",
      "/blog/staying-active-arthritis-winter-uk",
      "/blog/cold-weather-arthritis-uk-winter",
      "/blog/vitamin-d-winter-arthritis-frailty-uk",
      "/blog/winter-arthritis-frailty-cold-houses-uk",
      "/guides/bone-density-osteoporosis",
      "/exercises",
    ],
  },
  {
    name: "Steroids and infection",
    slug: "ra-steroids-frailty-infection-watch-uk",
    title: /Steroids and Infection With Rheumatoid Arthritis.*\(UK\)/i,
    cites: [
      "https://www.nhs.uk/conditions/steroids/",
      "https://www.nhs.uk/medicines/prednisolone/common-questions-about-prednisolone-tablets-and-liquid/",
      "https://www.nhs.uk/medicines/prednisolone/side-effects-of-prednisolone-tablets-and-liquid/",
      "https://www.nhs.uk/conditions/sepsis/",
      "https://www.versusarthritis.org/about-arthritis/treatments/drugs/steroids/",
    ],
    links: [
      "/guides/steroids-for-arthritis",
      "/conditions/rheumatoid-arthritis",
      "/blog/chest-infection-arthritis-frailty-uk",
      "/blog/covid-winter-arthritis-frailty-uk",
      "/blog/flu-jab-arthritis-frailty-uk",
      "/blog/vaccines-on-dmards-and-biologics-uk-guide",
      "/guides/bone-density-osteoporosis",
      "/guides/fall-prevention-older-adults",
      "/blog/carers-assessment-arthritis-frailty-uk",
      "/arthritis-flare-ups",
    ],
  },
];

describe("GSC Champions 76–78 (14 Oct): chest infection + ice and snow + steroids infection watch", () => {
  for (const c of cases) {
    it(`${c.name} blog is clinically reviewed by Louis Maxwell with CTR meta, UK cites and customer-job links`, () => {
      const raw = read(c.slug);
      const json = JSON.parse(raw) as Post;
      expect(json.reviewStatus).toBeUndefined();
      expect(json.last_reviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(json.reviewed_by).toMatch(/Louis Maxwell/);
      expect(json.reviewer_credentials).toMatch(/PH128483/);
            expect(json.content).not.toMatch(/Pending clinical review/i);
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
      expect(raw).not.toMatch(/If you live in a (GP surgery|home)/i);
      expect(raw).not.toMatch(/Rockwood Clinical Frailty Scale/i);
      expect(raw).not.toMatch(/NICE is clear that exercise is core care for osteoarthritis/i);
      expect(raw).not.toMatch(/Normal rarely sends an email/i);
      expect(raw).not.toMatch(/Clinical (Review Board|Advisory Panel)/i);
      expect(raw).not.toMatch(/written for people and carers in (Wales|Scotland|Northern Ireland)/i);
      expect(json.keywords || "").not.toMatch(/Wales|Northern Ireland|several joints/);
      // No empty headings (an <h2> immediately followed by another <h2>)
      expect(json.content).not.toMatch(/<\/h2>\s*<h2/);
      expect(json.content).not.toMatch(/<h2>\s*<\/h2>/);
    });
  }

  it("chest infection post follows NHS self-care and never-stop-medicines framing", () => {
    const json = JSON.parse(read("chest-infection-arthritis-frailty-uk")) as Post;
    expect(json.content).toMatch(/7 to 10 days/);
    expect(json.content).toMatch(/more than 3 weeks/);
    expect(json.content).toMatch(/Do not stop, skip or pause arthritis medicines yourself/);
    expect(json.content).toMatch(/Never stop steroid tablets suddenly/);
    expect(json.content).toMatch(/coughing up blood/);
    expect(json.content).toMatch(/sepsis/i);
    // Early hand-off to the gold-pass winter viruses plan
    expect(json.content.indexOf('href="/blog/covid-winter-arthritis-frailty-uk"')).toBeLessThan(1600);
  });

  it("ice and snow post uses NHS falls steps and 999 / NHS 111 routes", () => {
    const json = JSON.parse(read("ice-snow-arthritis-frailty-uk")) as Post;
    expect(json.content).toMatch(/Roll onto your side/);
    expect(json.content).toMatch(/cannot get up/);
    expect(json.content).toMatch(/head, neck, back or hip/);
    expect(json.content).toMatch(/blood-thinning medicine/);
    expect(json.content).toMatch(/do not try to lift them/);
    expect(json.content).toMatch(/strength and balance/);
  });

  it("steroids post carries NHS infection signs, contact warnings and steroid-card framing", () => {
    const json = JSON.parse(read("ra-steroids-frailty-infection-watch-uk")) as Post;
    expect(json.content).toMatch(/chickenpox, shingles or measles/);
    expect(json.content).toMatch(/Do not stop, skip or change the dose of steroid tablets yourself/);
    expect(json.content).toMatch(/steroid emergency card/);
    expect(json.content).toMatch(/blue steroid treatment card/);
    expect(json.content).toMatch(/pain when you pee/);
    expect(json.content).not.toMatch(/osteoarthritis/i);
  });

  it("clusters front the three champion spokes", () => {
    const byId = (id: string) => TOPIC_CLUSTERS.find((c) => c.id === id)!;
    expect(byId("treatments").supportingPaths).toContain("/blog/chest-infection-arthritis-frailty-uk");
    expect(byId("treatments").supportingPaths).toContain("/blog/ra-steroids-frailty-infection-watch-uk");
    expect(byId("exercises").supportingPaths).toContain("/blog/ice-snow-arthritis-frailty-uk");
    expect(getClusterForPath("/blog/chest-infection-arthritis-frailty-uk")?.id).toBe("treatments");
    expect(getClusterForPath("/blog/ra-steroids-frailty-infection-watch-uk")?.id).toBe("treatments");
    expect(getClusterForPath("/blog/ice-snow-arthritis-frailty-uk")?.id).toBe("exercises");
  });

  it("chatbot KB, llms.txt and ai.txt surface the three gold-pass URLs", () => {
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

describe("14 Oct trust spot-check: no unverifiable review claims", () => {
  it("no blog post or the /self-help virtual physio section claims a clinical-team review it has not had", async () => {
    const { readdirSync } = await import("node:fs");
    const dir = resolve(process.cwd(), "src/content/blog/posts");
    for (const file of readdirSync(dir).filter((f) => f.endsWith(".json"))) {
      const raw = readFileSync(resolve(dir, file), "utf8");
      expect(raw, file).not.toMatch(/reviewed by our clinical team/i);
      expect(raw, file).not.toMatch(/Clinical (Review Board|Advisory Panel)/i);
      expect(raw, file).not.toMatch(/Hannah Clarke/i);
    }
    const physio = readFileSync(resolve(process.cwd(), "src/components/VirtualPhysioSection.tsx"), "utf8");
    expect(physio).not.toMatch(/reviewed by our HCPC-registered physiotherapists/i);
  });
});
