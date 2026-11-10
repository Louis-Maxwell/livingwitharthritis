/// <reference types="node" />
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  RECOMMENDED_NEXT_STEP_HREFS,
  recommendedNextSteps,
  recommendedNextStepsHtml,
} from "@/lib/recommendedNextSteps.mjs";
import {
  buildStaticArticleInner,
  stripBodyBloat,
  stripDocumentBodyBloat,
} from "../../../scripts/static-article-html.mjs";
import { buildJsonLd } from "../../../scripts/inject-canonicals.mjs";
import { blogPostSchema } from "@/lib/blog/schema";
import { getPageAeo } from "@/data/page-aeo";

const app = readFileSync(resolve("src/App.tsx"), "utf8");
const post = (slug: string) =>
  JSON.parse(readFileSync(resolve(`src/content/blog/posts/${slug}.json`), "utf8"));
const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
const AEO_POSTS = [
  "hip-replacement-recovery-week-by-week",
  "pip-for-arthritis-uk",
  "best-supplements-arthritis-uk",
];

describe("Recommended next step content loops", () => {
  it("every destination is a real route", () => {
    for (const href of RECOMMENDED_NEXT_STEP_HREFS) {
      expect(app.includes(`path="${href}"`), href).toBe(true);
    }
  });

  it("uses the agreed mappings for priority pages", () => {
    const hrefs = (p: string) => recommendedNextSteps(p).map((l) => l.href);
    expect(hrefs("/blog/hip-replacement-recovery-week-by-week")).toEqual([
      "/guides/hip-exercises-for-osteoarthritis",
      "/guides/painkillers-and-nsaids",
    ]);
    expect(hrefs("/blog/pip-for-arthritis-uk")).toEqual([
      "/resources/pip-evidence-diary",
      "/guides/benefits-pip",
    ]);
    expect(hrefs("/exercises")[0]).toBe("/guides/knee-exercises-for-osteoarthritis");
  });

  it("never links to itself, always gives two relative links without tracking params", () => {
    for (const p of ["/guides/benefits-pip", "/guides/exercise", "/blog/anything", "/guides/arthritis-pain-relief"]) {
      const links = recommendedNextSteps(p, "pain relief exercise");
      expect(links).toHaveLength(2);
      for (const l of links) {
        expect(l.href).not.toBe(p);
        expect(l.href).toMatch(/^\/[a-z0-9/-]+$/);
        expect(l.label.length).toBeGreaterThan(8);
      }
    }
  });

  it("prerenders as plain HTML", () => {
    const html = recommendedNextStepsHtml("/blog/pip-for-arthritis-uk");
    expect(html).toContain('aria-label="Recommended next step"');
    expect(html).toContain('href="/resources/pip-evidence-diary"');
    expect(html).not.toMatch(/utm_/);
  });

  it("is wired into blog posts (mid + end), guide layout and the exercise hub", () => {
    const blog = readFileSync(resolve("src/pages/BlogPost.tsx"), "utf8");
    expect(blog).toContain('placement="mid"');
    expect(blog).toContain('placement="end"');
    expect(readFileSync(resolve("src/components/guides/GuideOnwardJourney.tsx"), "utf8")).toContain("<RecommendedNextStep");
    expect(readFileSync(resolve("src/pages/ExerciseHub.tsx"), "utf8")).toContain('path="/exercises" placement="mid"');
  });
});

describe("AEO on priority pages", () => {
  it.each(AEO_POSTS)("%s has a 45-58 word direct answer and 3-4 takeaways", (slug) => {
    const p = post(slug);
    expect(blogPostSchema.safeParse(p).success).toBe(true);
    expect(words(p.direct_answer)).toBeGreaterThanOrEqual(45);
    expect(words(p.direct_answer)).toBeLessThanOrEqual(58);
    expect(p.key_takeaways.length).toBeGreaterThanOrEqual(3);
    expect(p.key_takeaways.length).toBeLessThanOrEqual(4);
    // Search-question subheadings stay in the body (q-heading), FAQ section keeps >= 4 questions.
    expect((p.content.match(/class="q-heading"/g) || []).length).toBeGreaterThanOrEqual(4);
    const faq = p.content.slice(p.content.search(/<h2>Frequently asked questions<\/h2>/));
    expect((faq.match(/<h3>[^<]*\?<\/h3>/g) || []).length).toBeGreaterThanOrEqual(4);
    expect(JSON.stringify(p)).not.toMatch(/Living With Arthritis UK/);
  });

  it("knee guide answer is 45-58 words with 3-4 takeaways", () => {
    const aeo = getPageAeo("/guides/knee-exercises-for-osteoarthritis")!;
    expect(words(aeo.answer)).toBeGreaterThanOrEqual(45);
    expect(words(aeo.answer)).toBeLessThanOrEqual(58);
    expect(aeo.takeaways!.length).toBeGreaterThanOrEqual(3);
    expect(aeo.faqs ?? []).toHaveLength(0); // FAQPage comes from PageSchema only
  });

  it("static article HTML shows takeaways and the next step", () => {
    const p = post("pip-for-arthritis-uk");
    const html = buildStaticArticleInner({ article: p, answer: p.direct_answer, title: p.title });
    expect(html).toContain("Key clinical takeaways");
    expect(html).toContain('aria-label="Recommended next step"');
  });
});

describe("schema and crawler HTML", () => {
  it("binds the reviewer to Louis Maxwell with his HCPC number on the MedicalWebPage", () => {
    const p = post("hip-replacement-recovery-week-by-week");
    const out = buildJsonLd("/blog/x", "https://livingwitharthritis.org.uk/blog/x", { title: p.title, description: "d", article: p });
    const graphs = [...out.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
    const page = graphs.find((g) => g["@type"] === "MedicalWebPage");
    const article = graphs.find((g) => g["@type"] === "Article");
    expect(page.reviewedBy).toMatchObject({ "@type": "Person", name: "Louis Maxwell", jobTitle: "Physiotherapist" });
    expect(page.reviewedBy.identifier.value).toBe("PH128483");
    expect(article.citation.some((c: { url: string }) => /nice\.org\.uk\/guidance\/ng157/.test(c.url))).toBe(true);
    expect(out).not.toMatch(/speakable|medicalAudience/);
  });

  it("strips decorative SVG, comments and stray JSON from body only", () => {
    const body = `<p>Hi</p><svg aria-hidden="true"><path d="M0"/></svg><!-- note --><script type="application/json" id="x">{"a":1}</script><script type="application/json" id="static-article-data">{}</script>`;
    const out = stripBodyBloat(body);
    expect(out).toBe(`<p>Hi</p><script type="application/json" id="static-article-data">{}</script>`);
    const doc = `<html><head><script type="application/ld+json">{}</script><!-- keep --></head><body>${body}</body></html>`;
    const stripped = stripDocumentBodyBloat(doc);
    expect(stripped).toContain('<script type="application/ld+json">{}</script><!-- keep -->');
    expect(stripped).not.toContain("<svg");
  });

  it("BlogPost Article schema no longer carries WebPage-only review fields", () => {
    const blog = readFileSync(resolve("src/pages/BlogPost.tsx"), "utf8");
    const article = blog.slice(blog.indexOf('"@type": "Article"'), blog.indexOf('"@type": "BreadcrumbList"'));
    expect(article).not.toContain("reviewSchemaFields");
    expect(blog).not.toContain('"medicalAudience"');
  });

  it("llms files carry the structured summary", () => {
    for (const f of ["public/llms.txt", "public/llms-full.txt"]) {
      expect(existsSync(resolve(f))).toBe(true);
      const t = readFileSync(resolve(f), "utf8");
      expect(t).toContain("### Welfare and benefits pathways");
      expect(t).toContain("1218461");
      expect(t).not.toMatch(/Living With Arthritis UK/);
    }
  });
});
