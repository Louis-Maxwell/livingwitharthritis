/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { ALL_BLOG_POSTS as blogArticles } from "@/test/blogPosts";
import { getClusterForPath } from "@/data/topicClusters";

type Row = {
  slug: string;
  title: string;
  meta_title?: string | null;
  meta_description?: string | null;
  content: string;
  updated_at?: string | null;
  reviewStatus?: string;
  editorial_review_note?: string;
  citations?: { label: string; url: string; publisher?: string }[] | null;
  direct_answer?: string | null;
  author?: string | null;
  reviewed_by?: string | null;
};

const SLUGS = [
  "swimming-exercises-hip-osteoarthritis",
  "best-supplement-for-knee-joint",
] as const;

const ALLOWED_HOSTS = [
  "www.nhs.uk",
  "www.nice.org.uk",
  "www.arthritis-uk.org",
  "arthritis-uk.org",
  "www.gov.uk",
  "www.sps.nhs.uk",
  "www.swimming.org",
  "www.cochrane.org",
];

const RELEVANT_HREFS: Record<string, string[]> = {
  "swimming-exercises-hip-osteoarthritis": ["/conditions/osteoarthritis", "/exercises", "/guides/hip-exercises-for-osteoarthritis"],
  "best-supplement-for-knee-joint": ["/conditions/osteoarthritis", "/supplements", "/supplements/glucosamine"],
};

describe("GSC champions 43–44: swimming hip OA + knee supplements gold-pass (23 Sep)", () => {
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
      expect((row!.updated_at?.slice(0, 10) ?? "") >= "2026-09-23").toBe(true);
      expect(row!.direct_answer && row!.direct_answer.length > 80).toBe(true);
      expect(row!.author).toMatch(/Louis Maxwell/i);
      if (row!.reviewStatus === "pending" || row!.editorial_review_note) {
        expect(row!.reviewed_by).toBeNull();
        expect(row!.editorial_review_note).toContain("not yet had a fresh clinical review");
      } else {
        expect(row!.reviewed_by).toMatch(/Louis Maxwell/i);
      }

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
      for (const href of RELEVANT_HREFS[slug]) {
        expect(html.includes(`href="${href}"`), `${slug} missing ${href}`).toBe(true);
      }
      expect(html.toLowerCase().includes("doi.org/10.")).toBe(false);
      expect(html).not.toMatch(/Dr\.\s+Anil\s+Patel/i);
      expect(html).not.toMatch(/Dr\.\s+Emma\s+Foster/i);
      expect(html).not.toMatch(/Dr\.\s+Sarah\s+Bennett/i);
      expect(html).not.toMatch(/800-1,200\/mo/i);
      expect(html).not.toMatch(/Oswestry/i);

      expect(getClusterForPath(`/blog/${slug}`)).toBeTruthy();

      const head = heads[`/blog/${slug}`];
      expect(head?.title?.trim().length).toBeGreaterThan(30);
      expect(head?.description?.trim().length).toBeGreaterThan(80);
      expect(head?.updatedAt).toBe(row!.updated_at?.slice(0, 10));
    });
  }

  it("keeps distinct share titles between the two GSC champion blogs", () => {
    const a = heads["/blog/swimming-exercises-hip-osteoarthritis"]?.title;
    const b = heads["/blog/best-supplement-for-knee-joint"]?.title;
    expect(a && b && a !== b).toBe(true);
  });

  it("swimming page links OA + exercise hubs; knee page links supplements hubs", () => {
    const swim = bySlug.get("swimming-exercises-hip-osteoarthritis")!.content;
    const knee = bySlug.get("best-supplement-for-knee-joint")!.content;
    expect(swim).toContain('href="/conditions/osteoarthritis"');
    expect(swim).toContain('href="/exercises"');
    expect(knee).toContain('href="/supplements"');
    expect(knee).toContain('href="/supplements/glucosamine"');
    expect(knee).toContain("It does not claim that any of them rebuilds knee cartilage");
  });
});
