/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import blogArticles from "@/data/blogArticles.json";
import { getClusterForPath } from "@/data/topicClusters";

type Row = {
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

const SLUGS = ["pip-for-arthritis-uk", "omega-3-foods-for-joints"] as const;

const ALLOWED_HOSTS = [
  "www.nhs.uk",
  "www.nice.org.uk",
  "versusarthritis.org",
  "www.gov.uk",
];

const CUSTOMER_JOB_HREFS = [
  "/guides/arthritis-pain-relief",
  "/guides/newly-diagnosed",
  "/benefits-pip",
  "/diet",
];

describe("GSC next B₁ thin blogs gold-pass (23 Sep evening): PIP + omega-3 foods", () => {
  const bySlug = new Map(
    (blogArticles as Row[]).map((row) => [row.slug, row]),
  );
  const heads = JSON.parse(
    readFileSync(resolve(process.cwd(), "scripts/blog-head-data.json"), "utf8"),
  ) as Record<string, { title?: string; description?: string; updatedAt?: string }>;

  for (const slug of SLUGS) {
    it(`${slug} has unique meta, review date, citations and customer-job links`, () => {
      const row = bySlug.get(slug);
      expect(row, slug).toBeTruthy();
      expect(row!.meta_title?.trim().length).toBeGreaterThan(40);
      expect(row!.meta_description?.trim().length).toBeGreaterThan(110);
      expect(row!.meta_description).not.toMatch(/\.\.\.$/);
      expect(row!.updated_at?.startsWith("2026-09-23")).toBe(true);
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
        expect(html.includes(`href="${href}"`), `${slug} missing ${href}`).toBe(true);
      }
      expect(html.toLowerCase().includes("doi.org/10.")).toBe(false);
      expect(html).not.toMatch(/Dr\.\s+Anil\s+Patel/i);
      expect(html).not.toMatch(/Oswestry/i);
      expect(html).not.toMatch(/800-1,200\/mo/i);

      expect(getClusterForPath(`/blog/${slug}`)).toBeTruthy();

      const head = heads[`/blog/${slug}`];
      expect(head?.title?.trim().length).toBeGreaterThan(30);
      expect(head?.description?.trim().length).toBeGreaterThan(80);
      expect(head?.updatedAt).toBe("2026-09-23");
    });
  }

  it("keeps distinct share titles between PIP and omega-3 blogs", () => {
    const a = heads["/blog/pip-for-arthritis-uk"]?.title;
    const b = heads["/blog/omega-3-foods-for-joints"]?.title;
    expect(a && b && a !== b).toBe(true);
  });

  it("PIP links Access to Work; omega-3 links supplements hubs and food-first limits", () => {
    const pip = bySlug.get("pip-for-arthritis-uk")!.content;
    const omega = bySlug.get("omega-3-foods-for-joints")!.content;
    expect(pip).toContain('href="/library/access-to-work"');
    expect(pip).toMatch(/not legal advice|not personal legal/i);
    expect(omega).toContain('href="/supplements"');
    expect(omega).toContain('href="/blog/best-supplement-for-knee-joint"');
    expect(omega).toMatch(/do not rebuild|not rebuild|food-first/i);
  });
});
