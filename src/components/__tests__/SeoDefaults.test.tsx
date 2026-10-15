import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, waitFor } from "@testing-library/react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import SeoDefaults from "../SeoDefaults";
import SeoHead from "../SeoHead";

afterEach(() => { cleanup(); document.head.innerHTML = ""; });

function mount(page: React.ReactNode) {
  return render(<MemoryRouter initialEntries={["/about"]}><HelmetProvider>
    <SeoDefaults />{page}
  </HelmetProvider></MemoryRouter>);
}

describe("Social image metadata", () => {
  it("removes a stale secure image when a raw Helmet page changes the image", async () => {
    document.head.innerHTML = '<meta property="og:image" content="https://example.com/home.png"><meta property="og:image:secure_url" content="https://example.com/home.png">';
    mount(<Helmet><meta property="og:image" content="https://example.com/article.png" /></Helmet>);
    await waitFor(() => {
      expect(document.head.querySelector('meta[property="og:image"]')?.getAttribute("content")).toBe("https://example.com/article.png");
      expect(document.head.querySelector('meta[property="og:image:secure_url"]')).toBeNull();
    });
  });

  it("emits matching image URLs and one canonical for shared SEO pages", async () => {
    document.head.innerHTML = '<meta property="og:image:secure_url" content="https://example.com/home.png">';
    mount(<SeoHead title="About the charity" description="Meet the charity" path="/about" image="/og/about.png" />);
    await waitFor(() => {
      const image = document.head.querySelector('meta[property="og:image"]')?.getAttribute("content");
      const secure = document.head.querySelectorAll('meta[property="og:image:secure_url"]');
      expect(secure).toHaveLength(1);
      expect(secure[0].getAttribute("content")).toBe(image);
      expect(document.head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    });
  });
});
