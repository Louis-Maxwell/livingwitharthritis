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
  citations?: Array<{ url: string }>;
  content: string;
};

const read = (slug: string) =>
  readFileSync(resolve(process.cwd(), `src/content/blog/posts/${slug}.json`), "utf8");

const cases: Array<{ name: string; slug: string; title: RegExp; cites: string[]; links: string[] }> = [
  {
    name: "Winter viruses",
    slug: "covid-winter-arthritis-frailty-uk",
    title: /Winter Viruses and Arthritis Medicines.*\(UK\)/i,
    cites: [
      "https://www.nhs.uk/vaccinations/flu-vaccine/",
      "https://www.nhs.uk/vaccinations/covid-19-vaccine/",
      "https://www.nhs.uk/conditions/covid-19/treatments-for-covid-19/",
    ],
    links: [
      "/blog/flu-jab-arthritis-frailty-uk",
      "/blog/vaccines-on-dmards-and-biologics-uk-guide",
      "/blog/shingles-vaccine-arthritis-frailty-uk",
      "/conditions/rheumatoid-arthritis",
      "/blog/staying-active-arthritis-winter-uk",
      "/blog/winter-arthritis-frailty-cold-houses-uk",
      "/arthritis-flare-ups",
      "/blog/energy-management-and-pacing-arthritis",
      "/guides/fall-prevention-older-adults",
      "/blog/carers-assessment-arthritis-frailty-uk",
    ],
  },
  {
    name: "Cold home",
    slug: "winter-arthritis-frailty-cold-houses-uk",
    title: /Cold Home and Arthritis.*\(UK\)/i,
    cites: [
      "https://www.nhs.uk/live-well/seasonal-health/keep-warm-keep-well/",
      "https://www.gov.uk/winter-fuel-payment",
      "https://www.gov.uk/cold-weather-payment",
      "https://www.gov.uk/the-warm-home-discount-scheme",
    ],
    links: [
      "/exercises",
      "/blog/staying-active-arthritis-winter-uk",
      "/guides/fall-prevention-older-adults",
      "/benefits-pip",
      "/blog/attendance-allowance-arthritis-frailty-uk",
      "/blog/carers-allowance-help-if-you-care-for-someone",
      "/blog/cold-weather-arthritis-uk-winter",
      "/guides/arthritis-pain-relief",
    ],
  },
  {
    name: "Sleep positions",
    slug: "best-sleep-positions-joint-pain",
    title: /Best Sleep Positions for Joint Pain.*\(UK\)/i,
    cites: [
      "https://www.nhs.uk/live-well/sleep-and-tiredness/how-to-get-to-sleep/",
      "https://www.nhs.uk/conditions/insomnia/",
      "https://www.nice.org.uk/guidance/ng226",
    ],
    links: [
      "/blog/how-to-sleep-with-arthritis-uk",
      "/guides/arthritis-pain-relief",
      "/blog/sleep-apnoea-arthritis-frailty-uk",
      "/blog/sleeping-tablets-falls-arthritis-frailty-uk",
      "/exercises",
      "/arthritis-flare-ups",
    ],
  },
];

describe("GSC Champions 68–70 (7 Oct): winter viruses + cold home + sleep positions", () => {
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
      expect(raw).not.toMatch(/Oswestry/i);
      expect(raw).not.toMatch(/George Dingley|Crewe CW1/i);
    });
  }

  it("drops unverifiable statistics, fake reviewer and template copy", () => {
    const covid = read("covid-winter-arthritis-frailty-uk");
    const cold = read("winter-arthritis-frailty-cold-houses-uk");
    const sleep = read("best-sleep-positions-joint-pain");
    for (const raw of [covid, cold]) {
      expect(raw).not.toMatch(/If you live in a home, tell one other person/i);
      expect(raw).not.toMatch(/several joints prefer|today's several joints/i);
      expect(raw).not.toMatch(/10 million people/i);
    }
    expect(sleep).not.toMatch(/25% less pain/i);
    expect(sleep).not.toMatch(/Clinical Review Board/i);
    expect(sleep).not.toMatch(/2–3 weeks/);
  });

  it("winter viruses blog keeps medicine safety framing and urgent routes", () => {
    const json = JSON.parse(read("covid-winter-arthritis-frailty-uk")) as Post;
    expect(json.content).toMatch(/Do not stop or pause arthritis medicines yourself/);
    expect(json.content).toMatch(/never stop steroid tablets suddenly/);
    expect(json.content).toMatch(/999/);
    expect(json.content).toMatch(/NHS 111/);
  });

  it("clusters front the three champion spokes", () => {
    const byId = (id: string) => TOPIC_CLUSTERS.find((c) => c.id === id)!;
    expect(byId("treatments").supportingPaths).toContain("/blog/covid-winter-arthritis-frailty-uk");
    expect(getClusterForPath("/blog/covid-winter-arthritis-frailty-uk")?.id).toBe("treatments");
    expect(getClusterForPath("/blog/winter-arthritis-frailty-cold-houses-uk")?.id).toBe(
      getClusterForPath("/blog/cold-weather-arthritis-uk-winter")?.id,
    );
    expect(getClusterForPath("/blog/best-sleep-positions-joint-pain")?.id).toBe(
      getClusterForPath("/blog/cold-weather-arthritis-uk-winter")?.id,
    );
  });

  it("chatbot KB and llms.txt surface the three gold-pass URLs", () => {
    const kb = readFileSync(resolve(process.cwd(), "src/lib/chatbot/knowledgeBase.ts"), "utf8");
    const llms = readFileSync(resolve(process.cwd(), "public/llms.txt"), "utf8");
    for (const slug of cases.map((c) => c.slug)) {
      expect(kb).toContain(`url: "/blog/${slug}"`);
      expect(llms).toContain(`https://livingwitharthritis.org.uk/blog/${slug}`);
    }
  });
});
