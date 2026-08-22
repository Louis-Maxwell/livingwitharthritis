import { describe, expect, it } from "vitest";
import { refreshBlogLastmods } from "../../../supabase/functions/_shared/sitemap-lastmod";

const SITE_URL = "https://livingwitharthritis.org.uk";

describe("refreshBlogLastmods", () => {
  it("updates blog dates from the database and preserves other route dates", () => {
    const xml = `<?xml version="1.0"?>
<urlset>
  <url><loc>${SITE_URL}/</loc><lastmod>2026-07-10</lastmod></url>
  <url><loc>${SITE_URL}/blog/gentle-exercise</loc><lastmod>2026-01-01</lastmod></url>
</urlset>`;

    const result = refreshBlogLastmods(
      xml,
      new Map([["gentle-exercise", "2026-08-21T14:05:00Z"]]),
      SITE_URL,
    );

    expect(result).toContain(
      `<loc>${SITE_URL}/</loc><lastmod>2026-07-10</lastmod>`,
    );
    expect(result).toContain(
      `<loc>${SITE_URL}/blog/gentle-exercise</loc><lastmod>2026-08-21</lastmod>`,
    );
  });

  it("adds a lastmod only when an authoritative blog date exists", () => {
    const xml = `<urlset>
  <url><loc>${SITE_URL}/blog/known</loc></url>
  <url><loc>${SITE_URL}/blog/unknown</loc></url>
</urlset>`;

    const result = refreshBlogLastmods(
      xml,
      new Map([["known", "2026-08-20"]]),
      SITE_URL,
    );

    expect(result).toContain(
      `<loc>${SITE_URL}/blog/known</loc>\n    <lastmod>2026-08-20</lastmod>`,
    );
    expect(result).toContain(`<loc>${SITE_URL}/blog/unknown</loc></url>`);
  });

  it("does not modify entries for another origin", () => {
    const xml =
      `<urlset><url><loc>https://example.com/blog/known</loc><lastmod>2020-01-01</lastmod></url></urlset>`;

    expect(
      refreshBlogLastmods(
        xml,
        new Map([["known", "2026-08-20"]]),
        SITE_URL,
      ),
    ).toBe(xml);
  });
});
