/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  assertSafeBlogInventory,
  isValidCitySupportRoute,
} from "@/lib/seoBuildSafety";
import {
  SUPABASE_PROJECT_ID,
  SUPABASE_URL,
} from "@/integrations/supabase/config";
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

  it("consolidates database category variants onto canonical hubs", () => {
    expect(canonicalBlogCategoryKey("Exercise Guides")).toBe("exercise");
    expect(canonicalBlogCategoryKey("Treatments")).toBe("treatment");
    expect(canonicalBlogCategoryKey("Family & Relationships")).toBe(
      "lifestyle",
    );
    expect(canonicalBlogCategoryKey("Expert Q&A")).toBe("health");
    expect(new Set(BLOG_CATEGORY_KEYS).size).toBe(BLOG_CATEGORY_KEYS.length);
  });

  it("keeps the homepage preload and API preconnect in sync", () => {
    const indexHtml = readFileSync(
      resolve(process.cwd(), "index.html"),
      "utf8",
    );
    const heroSource = readFileSync(
      resolve(process.cwd(), "src/components/landing/OAHero.tsx"),
      "utf8",
    );

    expect(indexHtml).toContain("/openverse/hero-friends-800.webp");
    expect(heroSource).toContain(
      'const HERO_IMG = "/openverse/hero-friends-800.webp"',
    );
    expect(indexHtml).not.toContain("/openverse/hero-couple-800.webp");
    expect(indexHtml).toContain("https://eswdtpmknwjxtvkyxvmi.supabase.co");
    expect(indexHtml).not.toContain("https://zrvcejlncpndjfyuvcrd.supabase.co");
  });

  it("falls back to the active production Supabase project", () => {
    expect(SUPABASE_PROJECT_ID).toBe("eswdtpmknwjxtvkyxvmi");
    expect(SUPABASE_URL).toBe(
      "https://eswdtpmknwjxtvkyxvmi.supabase.co",
    );
  });

  it("waits for route-specific prerender content and metadata", () => {
    document.title = GENERIC_HOME_TITLE;
    document.head.insertAdjacentHTML(
      "beforeend",
      '<link rel="canonical" href="https://livingwitharthritis.org.uk/blog/anti-inflammatory-diet">',
    );
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

  it("waits for blog listing cards before prerender snapshots", () => {
    document.title = "Arthritis Blog UK | Diet, Exercise & Pain Management Guides";
    document.head.innerHTML =
      '<link rel="canonical" href="https://livingwitharthritis.org.uk/blog">';
    document.body.innerHTML = "<main><h1>Arthritis Advice</h1></main>";

    expect(isPrerenderDocumentReady(document, "/blog")).toBe(false);

    document.body.innerHTML =
      '<main data-blog-listing="ready"><h1>Arthritis Advice</h1><a href="/blog/example">Example</a></main>';
    expect(isPrerenderDocumentReady(document, "/blog")).toBe(true);
  });

  it("keeps Google sign-in on the account page", () => {
    const authSource = readFileSync(
      resolve(process.cwd(), "src/pages/Auth.tsx"),
      "utf8",
    );
    expect(authSource).toContain('providers={["google"]}');
    expect(authSource).not.toContain("providers={[]}");
  });

  it("ships a Netlify 404 page without a homepage catch-all", () => {
    const netlify = readFileSync(resolve(process.cwd(), "netlify.toml"), "utf8");
    const notFound = readFileSync(resolve(process.cwd(), "public/404.html"), "utf8");

    expect(netlify).toContain('to = "/404.html"');
    expect(netlify).toContain("status = 404");
    expect(netlify).not.toMatch(
      /from\s*=\s*"\/\*"[\s\S]{0,80}to\s*=\s*"\/index\.html"[\s\S]{0,40}status\s*=\s*200/,
    );
    expect(notFound).toContain("noindex");
    expect(notFound).toContain("We could not find that page");
  });
});
