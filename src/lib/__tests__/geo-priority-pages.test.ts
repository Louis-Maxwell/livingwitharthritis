/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { GEO_TOP_PAGES } from "@/data/geoTopPages";
import geoPageSchema from "@/data/geo-page-schema.json";
import { conditionSubpages } from "@/data/conditionSubpages";
import { buildSubpageFaqs } from "@/data/conditionSubpageFaqs";
import { buildWhatsAppMessage } from "@/lib/whatsappShare";
import { buildJsonLd } from "../../../scripts/inject-canonicals.mjs";
import { buildStaticArticleInner } from "../../../scripts/static-article-html.mjs";

const BASE = "https://livingwitharthritis.org.uk";
const sitemap = readFileSync(resolve("public/sitemap.xml"), "utf8");
const app = readFileSync(resolve("src/App.tsx"), "utf8");
const aiHead = JSON.parse(readFileSync(resolve("scripts/ai-head-data.json"), "utf8"));
const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
const inSitemap = (path: string) => sitemap.includes(`<loc>${BASE}${path}</loc>`);
const schema = geoPageSchema as unknown as Record<string, Record<string, unknown>>;

const PRIORITY = [
  "/blog/hip-replacement-recovery-week-by-week",
  "/blog/best-supplements-arthritis-uk",
  "/guides/knee-exercises-for-osteoarthritis",
  "/guides/benefits-pip",
  "/blog/pip-for-arthritis-uk",
  "/conditions/polymyalgia-rheumatica/symptoms",
];

describe("GEO priority pages", () => {
  it("share and resource cards are configured for exactly the priority pages", () => {
    expect(Object.keys(GEO_TOP_PAGES).sort()).toEqual([...PRIORITY].sort());
    for (const path of PRIORITY) expect(inSitemap(path), path).toBe(true);
  });

  it("resource cards only link resources that exist and never promise a PDF", () => {
    for (const [path, page] of Object.entries(GEO_TOP_PAGES)) {
      const text = `${page.resource.title} ${page.resource.description}`;
      expect(/\bPDF\b/.test(text) && !page.resource.printable, `${path}: PDF promised`).toBe(false);
      if (page.resource.link) {
        expect(app.includes(`path="${page.resource.link.href}"`), page.resource.link.href).toBe(true);
      }
    }
  });

  it("WhatsApp message names the charity and the canonical URL", () => {
    const msg = buildWhatsAppMessage("Title", `${BASE}/guides/benefits-pip`, "Summary.");
    expect(msg).toContain("Living With Arthritis (registered charity 1218461)");
    expect(msg).toContain(`${BASE}/guides/benefits-pip`);
    expect(msg).not.toMatch(/Living With Arthritis UK/);
  });

  it("schema entity data covers the priority pages with verified identifiers", () => {
    // Knee and PIP claim guides carry their entity data in ai-head-data.json.
    for (const path of PRIORITY) {
      expect(schema[path]?.about || aiHead[path]?.condition || aiHead[path]?.sources, path).toBeTruthy();
    }
    const json = JSON.stringify(geoPageSchema);
    expect(json).not.toMatch(/Living With Arthritis UK/);
    for (const m of json.matchAll(/"sameAs":\s*"([^"]+)"/g)) {
      expect(m[1]).toMatch(/^https:\/\/id\.nlm\.nih\.gov\/mesh\/D\d{6}$/);
    }
    expect(json).toContain('"code":"M35.3"');
  });

  it("static JSON-LD for PMR symptoms has reviewer, coded entity and citations", () => {
    const route = "/conditions/polymyalgia-rheumatica/symptoms";
    const html = buildJsonLd(route, `${BASE}${route}`, { title: "PMR symptoms", description: "d", question: "q", answer: "a" });
    const doc = new DOMParser().parseFromString(html, "text/html");
    const page = [...doc.querySelectorAll('script[type="application/ld+json"]')]
      .map((s) => JSON.parse(s.textContent || "{}"))
      .find((g) => g["@type"] === "MedicalWebPage");
    expect(page.reviewedBy.name).toBe("Louis Maxwell");
    expect(page.reviewedBy.identifier.value).toBe("PH128483");
    expect(page.lastReviewed).toBe("2026-09-17");
    expect(page.about.code.code).toBe("M35.3");
    expect(page.citation.length).toBeGreaterThanOrEqual(3);
  });

  it("knee guide is a MedicalWebPage in the static head", () => {
    const route = "/guides/knee-exercises-for-osteoarthritis";
    const html = buildJsonLd(route, `${BASE}${route}`, aiHead[route]);
    expect(html).toContain('"@type":"MedicalWebPage"');
    expect(html).toContain('"reviewedBy"');
    expect(html).toContain('"citation"');
  });
});

describe("Answer blocks and FAQs", () => {
  it("PMR symptoms: 45-65 word answer, 3-4 takeaways, at least 4 condition-specific FAQs", () => {
    const sub = conditionSubpages["polymyalgia-rheumatica"].symptoms;
    expect(words(sub.quickAnswer ?? "")).toBeGreaterThanOrEqual(45);
    expect(words(sub.quickAnswer ?? "")).toBeLessThanOrEqual(65);
    expect(sub.keyTakeaways?.length).toBeGreaterThanOrEqual(3);
    expect(sub.keyTakeaways?.length).toBeLessThanOrEqual(4);
    const faqs = buildSubpageFaqs("Polymyalgia rheumatica", "PMR", "symptoms", "polymyalgia-rheumatica");
    expect(faqs.length).toBeGreaterThanOrEqual(4);
    expect(faqs.every((f) => /polymyalgia|PMR/i.test(f.question + f.answer))).toBe(true);
    expect(sub.quickAnswer).toContain("45 minutes");
  });



  it("static HTML renders guide takeaways under the answer", () => {
    const html = buildStaticArticleInner({
      question: "Q?",
      answer: "An answer.",
      keyTakeaways: ["One fact.", "Two facts.", "Three facts."],
      takeawaysHeading: "Key takeaways",
    });
    expect(html).toContain(">Key takeaways</h2>");
    expect(html.indexOf("answer-box")).toBeLessThan(html.indexOf("Key takeaways"));
  });
});

