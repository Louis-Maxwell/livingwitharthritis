/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  assertSafeBlogInventory,
  isValidCitySupportRoute,
} from "@/lib/seoBuildSafety";
// Supabase config removed - restore in test
const SUPABASE_PROJECT_ID = "eswdtpmknwjxtvkyxvmi";
const SUPABASE_URL = "https://eswdtpmknwjxtvkyxvmi.supabase.co";
import {
  GENERIC_HOME_TITLE,
  isPrerenderDocumentReady,
} from "@/lib/prerenderReady";
import {
  BLOG_CATEGORY_KEYS,
  canonicalBlogCategoryKey,
} from "@/data/blogCategories";

describe("SEO build safety", () => {
  it("blocks unexplained canonical blog inventory loss above five percent", () => {
    expect(() => assertSafeBlogInventory(237, 224, false)).toThrow(
      /refusing to reduce canonical blog inventory/,
    );
    expect(() => assertSafeBlogInventory(237, 226, false)).not.toThrow();
    expect(() => assertSafeBlogInventory(237, 0, true)).not.toThrow();
  });

  it("does not prerender invalid regional routes that navigate over the homepage", () => {
    const source = readFileSync(
      resolve(process.cwd(), "scripts/prerender-routes.mjs"),
      "utf8",
    );

    expect(source).not.toContain('"/regions/england"');
    expect(source).not.toContain('"/regions/northern-ireland"');
    expect(source).toContain('"/regions/scotland"');
    expect(source).toContain('"/regions/wales"');
  });

  it("protects the Search Console cycling URL from a client-side redirect", () => {
    const redirects = readFileSync(
      resolve(process.cwd(), "src/data/blogRedirects.ts"),
      "utf8",
    );

    expect(redirects).not.toContain(
      '"arthritis-and-cycling-uk": "cycling-with-arthritis"',
    );
  });

  it("excludes generated city routes without real city content", () => {
    const cities = new Set(["belfast", "bristol"]);
    const conditions = new Set(["osteoarthritis", "rheumatoid-arthritis"]);

    expect(
      isValidCitySupportRoute(
        "/arthritis-support/belfast/osteoarthritis",
        cities,
        conditions,
      ),
    ).toBe(true);
    expect(
      isValidCitySupportRoute("/arthritis-support/oswestry", cities, conditions),
    ).toBe(false);
    expect(
      isValidCitySupportRoute(
        "/arthritis-support/bristol/not-a-condition",
        cities,
        conditions,
      ),
    ).toBe(false);
  });

  it("does not publish a fabricated regional office or telephone", () => {
    const regionSource = readFileSync(
      resolve(process.cwd(), "src/pages/regions/RegionHub.tsx"),
      "utf8",
    );

    expect(regionSource).not.toContain('"@type": "LocalBusiness"');
    expect(regionSource).not.toContain("+44 20 1234 5678");
  });

  it("keeps the knee consolidation destination evidence-led", () => {
    const kneeSource = readFileSync(
      resolve(
        process.cwd(),
        "src/pages/blog/KneeOsteoarthritisExercises.tsx",
      ),
      "utf8",
    );

    expect(kneeSource).toContain(
      "Knee Arthritis Exercises: Safe Exercises for Pain, Strength & Mobility",
    );
    expect(kneeSource).toContain("https://www.nice.org.uk/guidance/ng226");
    expect(kneeSource).toContain(
      "https://www.nhs.uk/conditions/osteoarthritis/treatment/",
    );
    expect(kneeSource).not.toContain("reduce stress on the knee joint by 20–40%");
    expect(kneeSource).not.toContain("Buoyancy reduces joint stress by 80%");
    expect(kneeSource).not.toContain("Often eases pain within 1–2 sessions");
  });

  it("keeps blog category pages in the prerender inventory", () => {
    const sitemapSource = readFileSync(
      resolve(process.cwd(), "scripts/generate-sitemap.ts"),
      "utf8",
    );

    expect(sitemapSource).toContain('p.startsWith("/blog/category/")');
  });

  it("does not auto-prefix the current path into empty locale stubs", () => {
    const source = readFileSync(
      resolve(process.cwd(), "src/components/LanguageSwitcher.tsx"),
      "utf8",
    );
    expect(source).toContain("TRANSLATED_BASE_PATHS");
    expect(source).not.toContain("First-visit browser language auto-redirect");
    expect(source).not.toContain("navigate(buildLangUrl(browser, basePath)");
  });

  it("does not emit thin city×condition, city×service or exercise×condition URLs", () => {
    const sitemapSource = readFileSync(
      resolve(process.cwd(), "scripts/generate-sitemap.ts"),
      "utf8",
    );

    expect(sitemapSource).not.toContain("`/arthritis-support/${c}/${cond}`");
    expect(sitemapSource).not.toContain("`/uk/${city}/${svc}`");
    expect(sitemapSource).not.toContain("`/exercises/${j}/for/${c}`");
    expect(sitemapSource).toContain("`/conditions/${c}/${s}`");
    expect(sitemapSource).toContain("src/data/conditionSubpages.ts");
    expect(sitemapSource).toContain("src/data/faqArticles.ts");
    expect(sitemapSource).toContain("src/data/healthTopics.ts");
    expect(sitemapSource).toContain("`/faq/${slug}`");
    expect(sitemapSource).toContain("`/library/${slug}`");

    const edgeSitemap = readFileSync(
      resolve(process.cwd(), "supabase/functions/generate-sitemap/index.ts"),
      "utf8",
    );
    expect(edgeSitemap).not.toContain("`/arthritis-support/${slug}/${cond}`");
    expect(edgeSitemap).toContain("`/conditions/${c}/${s}`");
    expect(edgeSitemap).toContain('loc: "/donate"');
  });

  it("does not list thin combinatorial URLs on the HTML sitemap or city hubs", () => {
    const htmlSitemap = readFileSync(
      resolve(process.cwd(), "src/pages/Sitemap.tsx"),
      "utf8",
    );
    const cityHub = readFileSync(
      resolve(process.cwd(), "src/pages/CityArthritisPage.tsx"),
      "utf8",
    );
    const xml = readFileSync(
      resolve(process.cwd(), "public/sitemap.xml"),
      "utf8",
    );

    expect(htmlSitemap).not.toContain("`/exercises/${j}/for/${condSlug}`");
    expect(htmlSitemap).not.toContain("`/uk/${c}/${sSlug}`");
    expect(htmlSitemap).not.toContain("`/arthritis-support/${c.slug}/${condSlug}`");
    expect(htmlSitemap).toContain('href: "/chat"');
    expect(cityHub).not.toContain("`/arthritis-support/${cityData.slug}/${c.slug}`");
    expect(xml).not.toMatch(/\/arthritis-support\/[^/<]+\/[^/<]+</);
    expect(xml).not.toMatch(/\/uk\/[^/<]+\/[^/<]+</);
    expect(xml).not.toMatch(/\/exercises\/[^/<]+\/for\//);
    expect(xml).not.toMatch(/https:\/\/livingwitharthritis\.org\.uk\/(es|fr|de|pt)(\/|<)/);
    expect(xml).toContain("/donate");
    expect(xml).toContain("/community");
    expect(xml).toContain("/chat");
    expect(xml).toContain("/about");
    expect(xml).toContain("/conditions/fibromyalgia/exercises");
    expect(xml).toContain("/conditions/polymyalgia-rheumatica/diet");
    expect(xml).toContain("/conditions/shoulder-arthritis");
    expect(xml).toContain("/conditions/gout/diet");
    expect(xml).toContain("/conditions/knee-arthritis/treatment");
    expect(xml).toContain("/faq/can-arthritis-cause-fatigue");
    expect(xml).toContain("/library/fibromyalgia");
  });

  it("lists FAQ and library pages from the public FAQ and library hubs", () => {
    const faqPage = readFileSync(
      resolve(process.cwd(), "src/pages/FAQ.tsx"),
      "utf8",
    );
    const faqArticle = readFileSync(
      resolve(process.cwd(), "src/pages/FaqArticle.tsx"),
      "utf8",
    );
    const index = readFileSync(
      resolve(process.cwd(), "src/components/FaqArticleIndex.tsx"),
      "utf8",
    );

    expect(faqPage).toContain("FaqArticleIndex");
    expect(faqPage).toContain("ItemList");
    expect(index).toContain("`/faq/${article.slug}`");
    expect(faqArticle).toContain('path: "/faq"');
    expect(faqArticle).toContain('to="/donate"');
    expect(faqArticle).toContain("speakable-intro");
  });

  it("exposes dedicated FAQ and library sitemaps from the index", () => {
    const generator = readFileSync(
      resolve(process.cwd(), "scripts/generate-sitemap.ts"),
      "utf8",
    );
    const indexXml = readFileSync(
      resolve(process.cwd(), "public/sitemap-index.xml"),
      "utf8",
    );

    expect(generator).toContain("sitemap-faq.xml");
    expect(generator).toContain("sitemap-library.xml");
    expect(indexXml).toContain("/sitemap-faq.xml");
    expect(indexXml).toContain("/sitemap-library.xml");
  });

  it("consolidates database category variants onto canonical hubs", () => {
    expect(canonicalBlogCategoryKey("Exercise Guides")).toBe("exercise");
    expect(canonicalBlogCategoryKey("Treatments")).toBe("treatment");
    expect(canonicalBlogCategoryKey("Family & Relationships")).toBe(
      "lifestyle",
    );
    expect(canonicalBlogCategoryKey("Expert Q&A")).toBe("health");
    expect(new Set(BLOG_CATEGORY_KEYS).size).toBe(BLOG_CATEGORY_KEYS.length);
  });

  it("falls back to the active production Supabase project", () => {
    expect(SUPABASE_PROJECT_ID).toBe("eswdtpmknwjxtvkyxvmi");
    expect(SUPABASE_URL).toBe(
      "https://eswdtpmknwjxtvkyxvmi.supabase.co",
    );
  });

  it("waits for route-specific prerender content and metadata", () => {
    document.title = GENERIC_HOME_TITLE;
    document.body.innerHTML = "<main><h1>Anti-Inflammatory Diet</h1></main>";

    expect(
      isPrerenderDocumentReady(document, "/blog/anti-inflammatory-diet"),
    ).toBe(false);

    document.title = "Anti-Inflammatory Diet for Arthritis";
    expect(
      isPrerenderDocumentReady(document, "/blog/anti-inflammatory-diet"),
    ).toBe(true);

    document.body.innerHTML = "<main><div>Loading</div></main>";
    expect(
      isPrerenderDocumentReady(document, "/blog/anti-inflammatory-diet"),
    ).toBe(false);
  });
});
