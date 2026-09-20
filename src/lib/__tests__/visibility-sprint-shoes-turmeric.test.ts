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
};

const SLUGS = [
  "best-walking-shoes-arthritis-uk",
  "turmeric-for-arthritis",
] as const;

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

describe("visibility sprint: walking shoes + turmeric gold-pass", () => {
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
      expect(row!.updated_at?.startsWith("2026-09-20")).toBe(true);
      expect(row!.direct_answer && row!.direct_answer.length > 80).toBe(true);

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
      // No invented DOI / fake academic theatre
      expect(html).not.toMatch(/doi\.org\/10\./i);
      expect(html).not.toMatch(/Dr\.\s+Anil\s+Patel/i);

      expect(getClusterForPath(`/blog/${slug}`)).toBeTruthy();

      const head = heads[`/blog/${slug}`];
      expect(head?.title?.trim().length).toBeGreaterThan(30);
      expect(head?.description?.trim().length).toBeGreaterThan(80);
      expect(head?.updatedAt).toBe("2026-09-20");
    });
  }

  it("keeps distinct share titles between the two champion blogs", () => {
    const a = heads["/blog/best-walking-shoes-arthritis-uk"]?.title;
    const b = heads["/blog/turmeric-for-arthritis"]?.title;
    expect(a && b && a !== b).toBe(true);
  });
});

describe("visibility sprint: customer-job hub polish", () => {
  it("pain relief, newly diagnosed and PIP hubs carry 2026-09-20 review + next-step CTAs", () => {
    const pain = readFileSync(
      resolve(process.cwd(), "src/pages/guides/ArthritisPainRelief.tsx"),
      "utf8",
    );
    const newly = readFileSync(
      resolve(process.cwd(), "src/pages/guides/NewlyDiagnosed.tsx"),
      "utf8",
    );
    const pip = readFileSync(
      resolve(process.cwd(), "src/pages/BenefitsPipHub.tsx"),
      "utf8",
    );

    expect(pain).toContain('lastReviewed="2026-09-20"');
    expect(pain).toContain("/guides/newly-diagnosed");
    expect(pain).toContain("/benefits-pip");
    expect(pain).toMatch(/pain relief/i);

    expect(newly).toContain('lastReviewed="2026-09-20"');
    expect(newly).toContain("/guides/arthritis-pain-relief");
    expect(newly).toContain("/benefits-pip");

    expect(pip).toContain('lastReviewed="2026-09-20"');
    expect(pip).toContain("/guides/benefits-pip");
    expect(pip).toContain("Next step");
  });

  it("pain relief schema is UK speakable and dated 20 Sep 2026", () => {
    const pain = readFileSync(
      resolve(process.cwd(), "src/pages/guides/ArthritisPainRelief.tsx"),
      "utf8",
    );
    expect(pain).toContain('dateModified": "2026-09-20"');
    expect(pain).toContain("SpeakableSpecification");
    expect(pain).toContain(".speakable-intro");
  });
});
