/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { ALL_BLOG_POSTS as blogArticles } from "@/test/blogPosts";
import { faqArticles } from "@/data/faqArticles";
import { getClusterForPath } from "@/data/topicClusters";

type BlogRow = {
  slug: string;
  title: string;
  meta_title?: string | null;
  meta_description?: string | null;
  content: string;
  updated_at?: string | null;
  citations?: { label: string; url: string; publisher?: string }[] | null;
  direct_answer?: string | null;
  author?: string | null;
  reviewed_by?: string | null;
};

const BLOG_SLUG = "anti-inflammatory-diet-rheumatoid-arthritis";
const FAQ_SLUG = "arthritis-disability-benefits-uk";

const ALLOWED_HOSTS = [
  "www.nhs.uk",
  "www.nice.org.uk",
  "versusarthritis.org",
  "www.gov.uk",
  "www.mygov.scot",
  "mygov.scot",
];

const CUSTOMER_JOB_HREFS = [
  "/guides/arthritis-pain-relief",
  "/guides/newly-diagnosed",
  "/benefits-pip",
  "/diet",
];

describe("GSC Champions 45–46 (24 Sep): disability benefits FAQ + RA anti-inflammatory diet", () => {
  const bySlug = new Map(
    (blogArticles as BlogRow[]).map((row) => [row.slug, row]),
  );
  const heads = JSON.parse(
    readFileSync(resolve(process.cwd(), "scripts/blog-head-data.json"), "utf8"),
  ) as Record<string, { title?: string; description?: string; updatedAt?: string }>;
  const faqPage = readFileSync(
    resolve(process.cwd(), "src/pages/FaqArticle.tsx"),
    "utf8",
  );

  it("FAQ arthritis-disability-benefits-uk has CTR meta, review date, GOV.UK cites, cluster and links", () => {
    const article = faqArticles.find((a) => a.slug === FAQ_SLUG);
    expect(article).toBeTruthy();
    expect(article!.seoTitle?.trim().length).toBeGreaterThan(40);
    expect(article!.metaDescription?.trim().length).toBeGreaterThan(110);
    expect(article!.lastReviewed).toBe("2026-09-24");
    expect(article!.quickAnswer.toLowerCase()).toMatch(/not legal advice|educational/);

    const cites = article!.citations ?? [];
    expect(cites.length).toBeGreaterThanOrEqual(3);
    for (const c of cites) {
      expect(c.label.length).toBeGreaterThan(3);
      expect(c.url).toMatch(/^https:\/\//);
      const host = new URL(c.url).hostname;
      expect(ALLOWED_HOSTS.some((h) => host === h || host.endsWith(`.${h}`))).toBe(
        true,
      );
    }
    expect(cites.some((c) => c.url.includes("gov.uk/pip"))).toBe(true);

    expect(getClusterForPath(`/faq/${FAQ_SLUG}`)?.id).toBe("pip");
    expect(faqPage).toContain("href: '/library/access-to-work'");
    expect(faqPage).toContain("href: '/benefits-pip'");
    expect(faqPage).toContain("href: '/blog/pip-for-arthritis-uk'");
    expect(faqPage).toContain("href: '/guides/disability-support'");
    expect(faqPage).toContain("article.lastReviewed");
    expect(faqPage).toContain("article.seoTitle");
    expect(faqPage).not.toMatch(/Oswestry/i);
  });

  it("blog anti-inflammatory-diet-rheumatoid-arthritis has unique meta, review, citations and customer-job links", () => {
    const row = bySlug.get(BLOG_SLUG);
    expect(row, BLOG_SLUG).toBeTruthy();
    expect(row!.meta_title?.trim().length).toBeGreaterThan(40);
    expect(row!.meta_description?.trim().length).toBeGreaterThan(110);
    expect(row!.meta_description).not.toMatch(/\.\.\.$/);
    expect(row!.updated_at?.startsWith("2026-09-24")).toBe(true);
    expect(row!.direct_answer && row!.direct_answer.length > 80).toBe(true);
    expect(row!.author).toMatch(/Louis Maxwell/i);
    expect(row!.reviewed_by).toMatch(/Louis Maxwell/i);

    const cites = row!.citations ?? [];
    expect(cites.length).toBeGreaterThanOrEqual(3);
    for (const c of cites) {
      expect(c.label.length).toBeGreaterThan(3);
      expect(c.url).toMatch(/^https:\/\//);
      const host = new URL(c.url).hostname;
      expect(ALLOWED_HOSTS.some((h) => host === h || host.endsWith(`.${h}`))).toBe(
        true,
      );
    }

    const html = row!.content;
    for (const href of CUSTOMER_JOB_HREFS) {
      expect(html.includes(`href="${href}"`), `missing ${href}`).toBe(true);
    }
    expect(html).toContain('href="/conditions/rheumatoid-arthritis"');
    expect(html).toContain('href="/blog/omega-3-foods-for-joints"');
    expect(html).toContain('href="/supplements"');
    expect(html).toMatch(/not a cure|Not a cure|food-first/i);
    expect(html.toLowerCase().includes("doi.org/10.")).toBe(false);
    expect(html).not.toMatch(/Dr\.\s+Anil\s+Patel/i);
    expect(html).not.toMatch(/Oswestry/i);
    expect(html).not.toMatch(/800-1,200\/mo/i);

    expect(getClusterForPath(`/blog/${BLOG_SLUG}`)).toBeTruthy();

    const head = heads[`/blog/${BLOG_SLUG}`];
    expect(head?.title?.trim().length).toBeGreaterThan(30);
    expect(head?.description?.trim().length).toBeGreaterThan(80);
    expect(head?.updatedAt).toBe("2026-09-24");
  });

  it("keeps distinct share titles between FAQ seoTitle and RA diet blog", () => {
    const faq = faqArticles.find((a) => a.slug === FAQ_SLUG)!;
    const blogTitle = heads[`/blog/${BLOG_SLUG}`]?.title;
    expect(faq.seoTitle && blogTitle && faq.seoTitle !== blogTitle).toBe(true);
  });
});
