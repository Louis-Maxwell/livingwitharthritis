// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { getBlogCatalog } from "@/lib/blog/catalog";
import { checkGuideImages } from "@/lib/blog/imagePolicy";
import { coverImage, LOCAL_COVER_FALLBACK } from "@/lib/articleImages";
import { GUIDE_IMAGE_FALLBACK } from "@/lib/coverFallback";
import { swapToFallback, withImageDefaults } from "@/lib/imageFallback";

const root = path.resolve(__dirname, "../../..");
const exists = (p: string) => fs.existsSync(path.join(root, "public", `.${decodeURI(p)}`));
const postsDir = path.join(root, "src/content/blog/posts");

describe("guide images", () => {
  const published = new Set(getBlogCatalog().map((g) => g.slug));
  const posts = fs
    .readdirSync(postsDir)
    .map((f) => JSON.parse(fs.readFileSync(path.join(postsDir, f), "utf8")))
    .filter((p) => published.has(p.slug));

  it("covers every published guide", () => expect(posts.length).toBe(published.size));

  it("no guide references a missing local image, a non-allowlisted host or an image without alt", () => {
    const problems = posts.flatMap((p) => checkGuideImages(p.slug, p.cover, p.content ?? "", exists));
    expect(problems).toEqual([]);
  });

  it("every guide resolves to a real image file for cards, hero and OG", () => {
    const bad = [...published].filter((slug) => {
      const src = coverImage("", "", slug).src;
      return src === LOCAL_COVER_FALLBACK || !exists(src);
    });
    expect(bad).toEqual([]);
    expect(exists(GUIDE_IMAGE_FALLBACK)).toBe(true);
    expect(exists(LOCAL_COVER_FALLBACK)).toBe(true);
  });

  it("swaps a broken image to the branded fallback exactly once", () => {
    const img = document.createElement("img");
    img.setAttribute("src", "/openverse/does-not-exist.webp");
    expect(swapToFallback(img)).toBe(true);
    expect(img.getAttribute("src")).toBe(GUIDE_IMAGE_FALLBACK);
    expect(swapToFallback(img)).toBe(false);
  });

  it("adds lazy loading, alt and intrinsic size to body images", () => {
    const out = withImageDefaults('<p>x</p><img src="/a.webp" class="w-full">');
    expect(out).toContain('loading="lazy"');
    expect(out).toContain('alt=""');
    expect(out).toContain('width="1200"');
    expect(withImageDefaults('<img src="/a.webp" alt="A" loading="eager" width="10" height="5" />')).toBe(
      '<img src="/a.webp" alt="A" loading="eager" width="10" height="5" decoding="async" />',
    );
  });
});
