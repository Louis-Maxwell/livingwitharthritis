import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

const SAMPLE_POSTS = [
  {
    slug: "pip-for-arthritis-uk",
    title: "PIP for Arthritis UK: How to Apply",
    meta_title: "PIP for Arthritis UK: How to Apply",
    excerpt: "A practical UK guide to Personal Independence Payment for people with arthritis.",
    date: "2026-06-10",
    category: "Finances & Benefits",
    image_url: null,
    display_order: 10,
    author: "Louis Maxwell",
    updated_at: "2026-06-10T00:00:00.000Z",
  },
  {
    slug: "turmeric-for-arthritis",
    title: "Turmeric for Arthritis: Evidence and UK Safety",
    meta_title: "Turmeric for Arthritis UK: Evidence & Safety",
    excerpt: "What the evidence shows for turmeric and curcumin in arthritis, plus UK safety notes.",
    date: "2026-05-20",
    category: "Supplements",
    image_url: null,
    display_order: 9,
    author: "Louis Maxwell",
    updated_at: null,
  },
  {
    slug: "knee-arthritis-exercises-uk",
    title: "Knee Arthritis Exercises UK",
    meta_title: "Knee Arthritis Exercises UK — Safe Routines",
    excerpt: "Physiotherapist-designed knee osteoarthritis exercises for UK readers.",
    date: "2026-03-01",
    category: "Exercise",
    image_url: null,
    display_order: 8,
    author: "Louis Maxwell",
    updated_at: null,
  },
];

vi.mock("@/hooks/useBlogArticles", () => ({
  useBlogArticlesList: vi.fn(() => ({ data: SAMPLE_POSTS, isLoading: false })),
}));
vi.mock("@/components/Header", () => ({ default: () => <div data-testid="header" /> }));
vi.mock("@/components/Footer", () => ({ default: () => <div data-testid="footer" /> }));
vi.mock("@/components/ui/PageHero", () => ({
  default: ({ title, subtitle }: { title: import("react").ReactNode; subtitle?: string }) => (
    <div data-testid="hero">
      <h1>{title}</h1>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  ),
}));

import BlogArchive from "../BlogArchive";

function renderArchive(path = "/blog/archive") {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <HelmetProvider>
      <QueryClientProvider client={client}>
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route path="/blog/archive" element={<BlogArchive />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </HelmetProvider>,
  );
}

describe("BlogArchive page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the archive route with unique browse-by-date intent", () => {
    renderArchive();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/archive/i);
    expect(screen.getByRole("navigation", { name: /filter archive by topic/i })).toBeInTheDocument();
    expect(screen.getByText(/Showing/i)).toBeInTheDocument();
  });

  it("lists every published sample slug with date, title and category", () => {
    renderArchive();
    for (const post of SAMPLE_POSTS) {
      const link = document.querySelector(`[data-archive-slug="${post.slug}"]`);
      expect(link, post.slug).toBeTruthy();
      expect(link).toHaveAttribute("href", `/blog/${post.slug}`);
      const row = link as HTMLElement;
      expect(within(row).getByRole("time")).toBeInTheDocument();
      expect(row.textContent).toMatch(/PIP|Turmeric|Knee/i);
    }
    expect(document.querySelectorAll("[data-archive-slug]").length).toBe(SAMPLE_POSTS.length);
  });

  it("exposes year headings for keyboard/landmarks", () => {
    renderArchive();
    const year = document.getElementById("year-heading-2026");
    expect(year).toBeTruthy();
    expect(year?.tagName).toBe("H2");
    expect(year?.textContent).toMatch(/2026/);
  });
});
