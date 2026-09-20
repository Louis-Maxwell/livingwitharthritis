/**
 * Evening visibility pass (20 Sep 2026): high-intent pages must ship unique
 * static head data (not the homepage title), cross-link customer jobs, and
 * stay indexable. Soft-404 guard: unknown slugs remain noindex.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const ai = JSON.parse(
  readFileSync(resolve(root, "scripts/ai-head-data.json"), "utf8"),
) as Record<
  string,
  { title?: string; description?: string; updatedAt?: string; faqs?: unknown[] }
>;
const sitemap = readFileSync(resolve(root, "public/sitemap.xml"), "utf8");
const indexNow = readFileSync(resolve(root, "scripts/indexnow-ping.mjs"), "utf8");
const llms = readFileSync(resolve(root, "public/llms.txt"), "utf8");
const homepageTitle = ai["/"]?.title ?? "";

const HUBS = [
  {
    path: "/guides/arthritis-pain-relief",
    file: "src/pages/guides/ArthritisPainRelief.tsx",
    titleIncludes: "Pain Relief",
    mustLink: [
      "/guides/newly-diagnosed",
      "/benefits-pip",
      "/blog/best-walking-shoes-arthritis-uk",
      "/supplements/turmeric",
      "/diet/mediterranean-diet-for-arthritis",
    ],
  },
  {
    path: "/guides/newly-diagnosed",
    file: "src/pages/guides/NewlyDiagnosed.tsx",
    titleIncludes: "Newly Diagnosed",
    mustLink: [
      "/guides/arthritis-pain-relief",
      "/benefits-pip",
      "/diet/mediterranean-diet-for-arthritis",
      "/blog/best-walking-shoes-arthritis-uk",
    ],
  },
  {
    path: "/benefits-pip",
    file: "src/pages/BenefitsPipHub.tsx",
    titleIncludes: "PIP",
    mustLink: [
      "/guides/newly-diagnosed",
      "/guides/arthritis-pain-relief",
      "/blog/best-walking-shoes-arthritis-uk",
      "/diet/mediterranean-diet-for-arthritis",
    ],
  },
  {
    path: "/diet/mediterranean-diet-for-arthritis",
    file: "src/pages/diet/MediterraneanDietForArthritis.tsx",
    titleIncludes: "Mediterranean",
    mustLink: [
      "/guides/arthritis-pain-relief",
      "/guides/newly-diagnosed",
      "/benefits-pip",
      "/supplements/turmeric",
    ],
  },
  {
    path: "/supplements/turmeric",
    file: "src/pages/supplements/Turmeric.tsx",
    titleIncludes: "Turmeric",
    mustLink: [
      "/guides/arthritis-pain-relief",
      "/guides/newly-diagnosed",
      "/benefits-pip",
      "/diet/mediterranean-diet-for-arthritis",
      "/blog/turmeric-for-arthritis",
    ],
  },
] as const;

describe("evening visibility pass — unique heads", () => {
  it("homepage head is customer-first and not a 100M claim", () => {
    expect(homepageTitle).toMatch(/Living With Arthritis UK/i);
    expect(homepageTitle).not.toMatch(/100\s*million|100M/i);
    expect(ai["/"]?.description ?? "").not.toMatch(/100\s*million|100M/i);
  });

  for (const hub of HUBS) {
    it(`${hub.path} has unique static title/description (not homepage)`, () => {
      const head = ai[hub.path];
      expect(head, hub.path).toBeTruthy();
      expect(head!.title?.trim().length).toBeGreaterThan(30);
      expect(head!.description?.trim().length).toBeGreaterThan(80);
      expect(head!.title).toMatch(new RegExp(hub.titleIncludes, "i"));
      expect(head!.title).not.toBe(homepageTitle);
      expect(head!.updatedAt).toBe("2026-09-20");
    });
  }

  it("mediterranean + turmeric static heads carry visible FAQ pairs", () => {
    expect((ai["/diet/mediterranean-diet-for-arthritis"]?.faqs ?? []).length).toBeGreaterThanOrEqual(4);
    expect((ai["/supplements/turmeric"]?.faqs ?? []).length).toBeGreaterThanOrEqual(4);
    expect((ai["/guides/newly-diagnosed"]?.faqs ?? []).length).toBeGreaterThanOrEqual(4);
  });
});

describe("evening visibility pass — internal links + TopicClusterNav", () => {
  for (const hub of HUBS) {
    it(`${hub.path} links customer jobs and keeps cluster nav where patterned`, () => {
      const src = readFileSync(resolve(root, hub.file), "utf8");
      for (const href of hub.mustLink) {
        const hit =
          src.includes(`to="${href}"`) ||
          src.includes(`to={'${href}'}`) ||
          src.includes(`"${href}"`) ||
          src.includes(`'${href}'`);
        expect(hit, `${hub.path} missing ${href}`).toBe(true);
      }
      // TopicClusterNav is the established pattern on these hubs
      expect(src).toMatch(/TopicClusterNav/);
    });
  }
});

describe("evening visibility pass — crawl + AI discovery", () => {
  for (const hub of HUBS) {
    it(`sitemap lists ${hub.path} with 2026-09-20 lastmod`, () => {
      const re = new RegExp(
        `<loc>https://livingwitharthritis\\.org\\.uk${hub.path.replace(/\//g, "\\/")}</loc>\\s*<lastmod>2026-09-20</lastmod>`,
      );
      expect(sitemap).toMatch(re);
    });
  }

  it("IndexNow ping list includes mediterranean + turmeric supplement", () => {
    expect(indexNow).toContain("'/diet/mediterranean-diet-for-arthritis'");
    expect(indexNow).toContain("'/supplements/turmeric'");
    expect(indexNow).toContain("'/guides/arthritis-pain-relief'");
    expect(indexNow).toContain("'/benefits-pip'");
  });

  it("llms.txt prefers the evening-pass hubs", () => {
    expect(llms).toContain("/diet/mediterranean-diet-for-arthritis");
    expect(llms).toContain("/supplements/turmeric");
    expect(llms).toContain("/guides/arthritis-pain-relief");
    expect(llms).toContain("/benefits-pip");
  });

  it("robots.txt allows the hubs (no Disallow on guides/diet/supplements/blog)", () => {
    const robots = readFileSync(resolve(root, "public/robots.txt"), "utf8");
    expect(robots).toMatch(/Allow:\s*\//);
    expect(robots).not.toMatch(/Disallow:\s*\/guides/);
    expect(robots).not.toMatch(/Disallow:\s*\/diet/);
    expect(robots).not.toMatch(/Disallow:\s*\/supplements/);
    expect(robots).not.toMatch(/Disallow:\s*\/blog/);
    expect(robots).not.toMatch(/Disallow:\s*\/benefits-pip/);
  });
});

describe("evening visibility pass — soft-404 guard", () => {
  it("NotFound stays noindex; real hubs are not noindex in source", () => {
    const notFound = readFileSync(resolve(root, "src/pages/NotFound.tsx"), "utf8");
    expect(notFound).toMatch(/noindex/);
    for (const hub of HUBS) {
      const src = readFileSync(resolve(root, hub.file), "utf8");
      expect(src).not.toMatch(/noindex/);
    }
  });

  it("seo-identity test still present for charity / robots / ai.txt", () => {
    expect(existsSync(resolve(root, "src/lib/__tests__/seo-identity.test.ts"))).toBe(true);
  });
});
