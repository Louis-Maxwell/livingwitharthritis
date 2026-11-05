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
    name: "Hospital appointments",
    slug: "hospital-appointments-frailty-arthritis-uk",
    title: /Hospital Appointments With Arthritis \(UK\)/i,
    category: "Treatments & medicines",
    cluster: "treatments",
    cites: [
      "https://www.nhs.uk/nhs-services/hospitals/going-into-hospital/how-to-organise-transport-to-and-from-hospital/",
      "https://www.nhs.uk/nhs-services/help-with-health-costs/healthcare-travel-costs-scheme-htcs/",
      "https://www.gov.uk/government/publications/nhs-patient-visitor-and-staff-car-parking-principles",
      "https://www.nhs.uk/nhs-services/hospitals/what-is-pals-patient-advice-and-liaison-service/",
    ],
    links: [
      "/blog/blood-test-transport-arthritis-frailty-uk",
      "/blog/rheumatology-appointment-what-to-expect-uk",
      "/blog/hospital-stay-arthritis-frailty-what-to-pack-uk",
      "/blog/community-transport-arthritis-frailty-uk",
      "/blog/blue-badge-frailty-arthritis-uk",
      "/blog/carers-assessment-arthritis-frailty-uk",
    ],
    early: ["/blog/blood-test-transport-arthritis-frailty-uk", "/blog/rheumatology-appointment-what-to-expect-uk"],
    must: [/Eye clinic days/, /do not plan to drive yourself home/, /free parking to people in greatest need/, /If you cannot get there/],
  },
  {
    name: "Council needs assessment",
    slug: "social-care-needs-assessment-arthritis-uk",
    title: /Council Needs Assessment for Arthritis \(UK\)/i,
    category: "Carers & family",
    cluster: "pip",
    cites: [
      "https://www.nhs.uk/social-care-and-support/help-from-social-services-and-charities/getting-a-needs-assessment/",
      "https://www.gov.uk/apply-needs-assessment-social-services",
      "https://www.gov.uk/government/publications/care-act-statutory-guidance/care-and-support-statutory-guidance",
      "https://www.lgo.org.uk/",
    ],
    links: [
      "/blog/short-term-equipment-loans-arthritis-uk",
      "/blog/carers-assessment-arthritis-frailty-uk",
      "/blog/attendance-allowance-arthritis-frailty-uk",
      "/blog/direct-payments-arthritis-frailty-uk",
      "/blog/occupational-therapy-arthritis-uk",
      "/blog/reablement-after-discharge-arthritis-uk",
    ],
    early: ["/blog/short-term-equipment-loans-arthritis-uk", "/blog/carers-assessment-arthritis-frailty-uk"],
    must: [/significant pain, distress or anxiety/, /Describe bad days as well as good ones/, /financial assessment \(means test\)/, /Local Government and Social Care Ombudsman/],
  },
  {
    name: "Loneliness and arthritis",
    slug: "loneliness-arthritis-frailty-social-contact-uk",
    title: /Loneliness and Arthritis: Getting Back in Touch \(UK\)/i,
    category: "Mental health & fatigue",
    cluster: "flare-ups",
    cites: [
      "https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/feelings-and-symptoms/loneliness-in-older-people/",
      "https://www.ageuk.org.uk/services/silverline/",
      "https://www.ageuk.org.uk/services/befriending-services/",
      "https://www.samaritans.org/how-we-can-help/contact-samaritan/",
    ],
    links: [
      "/blog/depression-arthritis-when-to-seek-help",
      "/blog/bereavement-arthritis-frailty-living-alone-uk",
      "/blog/social-prescribing-arthritis-frailty-uk",
      "/blog/talking-therapies-pain-older-arthritis-uk",
      "/blog/community-transport-arthritis-frailty-uk",
      "/blog/slow-walking-groups-arthritis-frailty-uk",
    ],
    early: ["/blog/depression-arthritis-when-to-seek-help", "/blog/bereavement-arthritis-frailty-living-alone-uk"],
    must: [/116 123/, /0800 4 70 80 90/, /befriending/i, /low mood for more than two weeks/],
  },
];

describe("GSC Champions 119–121 (3 Nov): hospital appointments, council needs assessments, loneliness", () => {
  for (const c of cases) {
    it(`${c.name} is reviewed by Louis Maxwell with CTR meta, UK cites and customer-job links`, () => {
      const raw = read(c.slug);
      const json = JSON.parse(raw) as Post;
      expect(json.reviewStatus).toBeUndefined();
      expect(json.reviewed_by).toBe("Louis Maxwell");
      expect(json.reviewer_credentials).toMatch(/PH128483/);
      expect(json.last_reviewed).toBe("2026-11-03");
      expect(json.content).toMatch(/Clinically reviewed by Louis Maxwell \(HCPC PH128483\) on 3 November 2026/);
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

  for (const c of cases) {
    it(`${c.name} hands off early and keeps its customer jobs`, () => {
      const json = JSON.parse(read(c.slug)) as Post;
      for (const href of c.early) {
        const idx = json.content.indexOf(`href="${href}"`);
        expect(idx).toBeGreaterThan(-1);
        expect(idx).toBeLessThan(1800);
      }
      for (const re of c.must) expect(json.content).toMatch(re);
      expect(json.content).not.toMatch(/£\d/);
    });
  }

  it("topic clusters list all three guides", () => {
    for (const c of cases) {
      const cluster = TOPIC_CLUSTERS.find((x) => x.id === c.cluster)!;
      expect(cluster.supportingPaths).toContain(`/blog/${c.slug}`);
      expect(getClusterForPath(`/blog/${c.slug}`)).toBeTruthy();
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
        new RegExp(`<loc>https://livingwitharthritis.org.uk/blog/${slug}</loc>\\s*<lastmod>2026-11-\\d{2}</lastmod>`),
      );
    }
  });
});
