/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { PRERENDER_ROUTES } from "../../../scripts/prerender-routes.mjs";
import { rewriteHead } from "../../../scripts/inject-canonicals.mjs";
import {
  HOME_SHELL_HEADING,
  buildStaticArticleInner,
  htmlHasFullArticle,
  replaceSeoFallback,
} from "../../../scripts/static-article-html.mjs";
import { readEmbeddedBlogArticle } from "@/lib/embeddedBlogArticle";
import blogSlugs from "@/data/blog-slugs.generated.json";

const TEMPLATE = `<!doctype html>
<html lang="en-GB">
  <head>
    <title>Living With Arthritis | UK charity for arthritis and frailty support</title>
    <meta name="description" content="UK charity homepage description" />
    <meta property="og:url" content="https://livingwitharthritis.org.uk/" />
    <link rel="canonical" href="https://livingwitharthritis.org.uk/" />
  </head>
  <body>
    <div id="root">
      <div id="seo-fallback" aria-hidden="true" style="position:absolute;width:1px;height:1px;overflow:hidden;">
      <main>
        <h1>${HOME_SHELL_HEADING}</h1>
        <p>Living With Arthritis is a UK charity helping the 10 million people in Britain living with arthritis and joint pain.</p>
      </main>
      </div>
    </div>
  </body>
</html>`;

const WORK_ARTICLE = {
  slug: "arthritis-and-work-uk",
  title: "Arthritis at Work UK – Rights, Adjustments & Practical Tips",
  excerpt: "Managing arthritis while working in the UK.",
  content: `## Workplace rights

In the UK, arthritis can be a disability under the Equality Act 2010 when it has a substantial long-term effect on day-to-day activities.

Employers must consider reasonable adjustments such as flexible hours, ergonomic equipment and Access to Work funding.

## Talking to your employer

Prepare a short note covering your diagnosis, the tasks that are hardest, and the adjustments that would help. Occupational health can support that conversation.`,
  date: "2026-06-08",
  category: "Lifestyle",
  image_url: null,
  meta_title: "Arthritis at Work UK – Rights, Adjustments & Practical Tips",
  meta_description: "Managing arthritis while working in the UK.",
  keywords: null,
  author: "Maxwell",
  author_credentials: "First Contact Practitioner",
  reviewed_by: "Maxwell",
  reviewer_credentials: "HCPC PH128483",
  is_published: true,
  display_order: 1,
  updated_at: "2026-08-31",
  direct_answer:
    "In the UK, arthritis is considered a disability under the Equality Act 2010 if it significantly affects daily activities for at least 12 months.",
  citations: null,
};

const WORK_HEAD = {
  title:
    "Arthritis at Work UK – Rights, Adjustments & Practical Tips | Living With Arthritis UK",
  description: "Managing arthritis while working in the UK.",
  question: "Arthritis at Work UK – Rights, Adjustments & Practical Tips",
  answer: WORK_ARTICLE.direct_answer,
  breadcrumb: "Arthritis at Work UK",
  about: "Lifestyle",
  updatedAt: "2026-08-31",
  article: WORK_ARTICLE,
};

describe("static blog HTML for Soft 404s", () => {
  it("prerenders every published blog slug and the hand-arthritis exercises page", () => {
    const missing = (blogSlugs as string[]).filter(
      (slug) => !PRERENDER_ROUTES.includes(`/blog/${slug}`),
    );
    expect(missing).toEqual([]);
    expect(PRERENDER_ROUTES).toContain("/blog/arthritis-and-work-uk");
    expect(PRERENDER_ROUTES).toContain("/blog/best-diet-for-joint-pain-uk");
    expect(PRERENDER_ROUTES).toContain("/conditions/hand-arthritis/exercises");
    expect(
      PRERENDER_ROUTES.filter((route: string) =>
        /^\/arthritis-support\/[^/]+\/[^/]+$/.test(route),
      ),
    ).toEqual([]);
  });

  it("writes unique article heading and body into the first HTML", () => {
    const html = rewriteHead(
      TEMPLATE,
      "/blog/arthritis-and-work-uk",
      WORK_HEAD,
    );

    expect(html).toContain(
      "<title>Arthritis at Work UK – Rights, Adjustments &amp; Practical Tips | Living With Arthritis UK</title>",
    );
    expect(html).toContain(
      'rel="canonical" href="https://livingwitharthritis.org.uk/blog/arthritis-and-work-uk"',
    );
    expect(html).toContain("Equality Act 2010");
    expect(html).toContain("Access to Work");
    expect(html).toContain("Occupational health");
    expect(html).toContain('id="static-article"');
    expect(html).not.toContain(HOME_SHELL_HEADING);
    expect(html).not.toContain(
      "10 million people in Britain living with arthritis",
    );
    expect(htmlHasFullArticle(html, WORK_HEAD)).toBe(true);
  });

  it("replaces the homepage fallback with a clipped unique article (no FOUC)", () => {
    const inner = buildStaticArticleInner({
      question: "Best exercises for hand arthritis",
      answer:
        "Daily range-of-motion and gentle grip work preserves hand function.",
      bodyHtml:
        "<p>Daily range-of-motion and gentle grip work preserves hand function, reduces stiffness, and protects the small joints from contracture.</p><ul><li>Maintains finger and thumb range of motion</li></ul>",
    });
    const html = replaceSeoFallback(TEMPLATE, inner, { visible: false });

    expect(html).toContain("Best exercises for hand arthritis");
    expect(html).toContain("small joints from contracture");
    expect(html).toContain("clip:rect(0 0 0 0)");
    expect(html).toContain('aria-hidden="true"');
    expect(html).not.toContain(HOME_SHELL_HEADING);
  });

  it("keeps unique article HTML in rewriteHead without painting it", () => {
    const html = rewriteHead(
      TEMPLATE,
      "/blog/arthritis-and-work-uk",
      WORK_HEAD,
    );
    expect(html).toContain("Equality Act 2010");
    expect(html).toContain("clip:rect(0 0 0 0)");
    expect(html).toContain('aria-hidden="true"');
  });

  it("reads an embedded article only when the slug matches", () => {
    document.body.innerHTML = `<script type="application/json" id="static-article-data">${JSON.stringify(
      WORK_ARTICLE,
    )}</script>`;

    expect(readEmbeddedBlogArticle<{ slug?: string; content?: string; title?: string }>(document, "arthritis-and-work-uk")?.title).toBe(
      WORK_ARTICLE.title,
    );
    expect(readEmbeddedBlogArticle(document, "best-diet-for-joint-pain-uk")).toBeNull();
  });

  it("keeps the published blog inventory in blog-head-data.json", () => {
    const heads = JSON.parse(
      readFileSync(resolve(process.cwd(), "scripts/blog-head-data.json"), "utf8"),
    ) as Record<string, { article?: { content?: string } }>;

    expect(heads["/blog/arthritis-and-work-uk"]).toBeTruthy();
    expect(heads["/blog/best-diet-for-joint-pain-uk"]).toBeTruthy();
    expect(
      heads["/blog/arthritis-and-work-uk"].article?.content,
    ).toMatch(/Equality Act|workplace|Access to Work/i);
    expect(
      heads["/blog/best-diet-for-joint-pain-uk"].article?.content?.length ?? 0,
    ).toBeGreaterThan(400);
    const missing = (blogSlugs as string[]).filter(
      (slug) => !heads[`/blog/${slug}`]?.article?.content,
    );
    expect(missing).toEqual([]);

    const conditions = JSON.parse(
      readFileSync(
        resolve(process.cwd(), "scripts/condition-head-data.json"),
        "utf8",
      ),
    ) as Record<string, { bodyHtml?: string; question?: string }>;
    expect(conditions["/conditions/hand-arthritis/exercises"]?.question).toMatch(
      /hand arthritis/i,
    );
    expect(
      conditions["/conditions/hand-arthritis/exercises"]?.bodyHtml,
    ).toMatch(/grip|finger|range-of-motion/i);
  });
});
