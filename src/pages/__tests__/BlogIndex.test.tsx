import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import BlogIndex from "../BlogIndex";

const posts = [
  {
    slug: "sarcopenia-muscle-loss",
    title: "Sarcopenia and muscle loss",
    excerpt: "Keeping strength as you age.",
    date: "2026-01-01",
    category: "Prevention & Longevity",
    image_url: "/images/frailty.webp",
    display_order: 3,
  },
  {
    slug: "knee-exercises",
    title: "Knee exercises for arthritis",
    excerpt: "A low-impact routine.",
    date: "2026-01-02",
    category: "Exercises",
    image_url: "/images/knee.webp",
    display_order: 2,
  },
  {
    slug: "hand-exercises",
    title: "Hand exercises for arthritis",
    excerpt: "Grip and dexterity work.",
    date: "2026-01-03",
    category: "Exercise Guides",
    image_url: "/images/hand.webp",
    display_order: 1,
  },
];

vi.mock("@/hooks/useBlogArticles", () => ({
  useBlogArticlesList: () => ({ data: posts, isLoading: false }),
  useFeaturedArticles: () => ({ data: [posts[1]] }),
}));

vi.mock("@/hooks/useBlogViews", () => ({
  useBlogViewCounts: () => ({ "knee-exercises": 900, "hand-exercises": 120 }),
}));

vi.mock("@/components/Header", () => ({ default: () => null }));
vi.mock("@/components/Footer", () => ({ default: () => null }));
vi.mock("@/components/InternalLinks", () => ({ default: () => null }));

const renderIndex = (initialCategory?: string) =>
  render(
    <HelmetProvider>
      <MemoryRouter>
        <BlogIndex initialCategory={initialCategory} emitSeo={false} />
      </MemoryRouter>
    </HelmetProvider>,
  );

describe("BlogIndex", () => {
  it("keeps a category hub filtered to its own articles", () => {
    renderIndex("frailty");

    expect(screen.getByText("Sarcopenia and muscle loss")).toBeInTheDocument();
    expect(screen.queryByText("Knee exercises for arthritis")).toBeNull();
    expect(screen.queryByText(/Editor's Picks/)).toBeNull();
    expect(screen.queryByText(/Trending Now/)).toBeNull();
  });

  it("counts the alias labels that the grid actually filters on", () => {
    renderIndex();

    expect(
      screen.getByRole("button", { name: /^Exercise\s*\(2\)$/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /^Frailty\s*\(1\)$/ }),
    ).toBeInTheDocument();
  });

  it("turns hub chips into links so the URL matches the list", () => {
    renderIndex("frailty");

    expect(screen.getByRole("link", { name: /^Exercise\s*\(2\)$/ })).toHaveAttribute(
      "href",
      "/blog/category/exercise",
    );
    expect(screen.getByRole("link", { name: "All" })).toHaveAttribute(
      "href",
      "/blog",
    );
  });
});
