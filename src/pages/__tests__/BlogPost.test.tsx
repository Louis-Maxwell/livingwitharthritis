import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

// Mock hooks
const mockArticle = {
  slug: "test-article",
  title: "Managing Arthritis Pain",
  excerpt: "Tips for managing joint pain effectively.",
  content: "## Introduction\n\nArthritis affects millions of people in the UK.",
  date: "2025-06-15",
  category: "Health",
  image_url: null,
  meta_title: "Managing Arthritis Pain | LWA",
  meta_description: "Expert tips for managing arthritis pain.",
  keywords: "arthritis, pain management",
  author: "Dr. Sarah Johnson",
  author_credentials: "MSc Physiotherapy",
  reviewed_by: "Dr. Test Reviewer",
  reviewer_credentials: "Consultant Rheumatologist",
  is_published: true,
  display_order: 1,
};

vi.mock("@/hooks/useBlogArticles", () => ({
  useBlogArticle: vi.fn(),
  useRelatedArticles: vi.fn(() => []),
}));
vi.mock("@/hooks/useBlogViews", () => ({
  useBlogViews: vi.fn(() => 42),
}));
vi.mock("@/components/Header", () => ({ default: () => <div data-testid="header" /> }));
vi.mock("@/components/Footer", () => ({ default: () => <div data-testid="footer" /> }));
vi.mock("@/components/BlogComments", () => ({ default: () => <div data-testid="comments" /> }));
vi.mock("@/components/BlogHelpfulness", () => ({ default: () => <div data-testid="helpfulness" /> }));
vi.mock("@/components/RelatedArticles", () => ({ default: () => <div data-testid="related" /> }));
vi.mock("@/components/SocialShareButtons", () => ({ default: () => <div data-testid="share" /> }));
vi.mock("@/components/ScrollProgress", () => ({ default: () => null }));
vi.mock("@/components/ContinueReadingBar", () => ({ default: () => null }));
vi.mock("@/components/HealthToolsCTA", () => ({ default: () => null }));
vi.mock("@/components/TableOfContents", () => ({
  default: () => null,
  addHeadingIds: (html: string) => html,
}));

import { useBlogArticle } from "@/hooks/useBlogArticles";

function renderBlogPost(slug: string) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <HelmetProvider>
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={[`/blog/${slug}`]}>
          <Routes>
            <Route path="/blog/:slug" element={<BlogPostPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

// Lazy import to let mocks register first
let BlogPostPage: React.ComponentType;
beforeAll(async () => {
  const mod = await import("../BlogPost");
  BlogPostPage = mod.default;
});

describe("BlogPost Page", () => {
  it("shows loading skeleton when data is loading", () => {
    (useBlogArticle as ReturnType<typeof vi.fn>).mockReturnValue({
      data: undefined,
      isLoading: true,
      isSuccess: false,
      isError: false,
    });

    renderBlogPost("test-article");
    // Skeleton elements should render (no article title visible)
    expect(screen.queryByText("Managing Arthritis Pain")).not.toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("shows 'Article Not Found' for missing article", () => {
    (useBlogArticle as ReturnType<typeof vi.fn>).mockReturnValue({
      data: null,
      isLoading: false,
      isSuccess: true,
      isError: false,
    });

    renderBlogPost("nonexistent");
    expect(screen.getByText("Article Not Found")).toBeInTheDocument();
    expect(screen.getByText("← Back to blog")).toBeInTheDocument();
  });

  it("renders article title, author, and reviewer", () => {
    (useBlogArticle as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockArticle,
      isLoading: false,
      isSuccess: true,
      isError: false,
    });

    renderBlogPost("test-article");
    expect(screen.getByRole("heading", { level: 1, name: "Managing Arthritis Pain" })).toBeInTheDocument();
    expect(screen.getByText("Dr. Sarah Johnson")).toBeInTheDocument();
    expect(screen.getByText("MSc Physiotherapy")).toBeInTheDocument();
    // "Reviewed by ..." legitimately renders twice: an on-screen badge, and a
    // .print-only citation block (CSS-hidden on screen, jsdom doesn't apply
    // @media print so both are queryable here) — assert at least one match.
    expect(screen.getAllByText(/Reviewed by Dr. Test Reviewer/).length).toBeGreaterThan(0);
  });

  it("renders publish date in en-GB format", () => {
    (useBlogArticle as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockArticle,
      isLoading: false,
      isSuccess: true,
      isError: false,
    });

    renderBlogPost("test-article");
    expect(screen.getByText("15 June 2025")).toBeInTheDocument();
  });

  it("renders view count", () => {
    (useBlogArticle as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockArticle,
      isLoading: false,
      isSuccess: true,
      isError: false,
    });

    renderBlogPost("test-article");
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("renders breadcrumb navigation", () => {
    (useBlogArticle as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockArticle,
      isLoading: false,
      isSuccess: true,
      isError: false,
    });

    renderBlogPost("test-article");
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
  });

  it("renders related articles and comments sections", () => {
    (useBlogArticle as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockArticle,
      isLoading: false,
      isSuccess: true,
      isError: false,
    });

    renderBlogPost("test-article");
    expect(screen.getByTestId("related")).toBeInTheDocument();
    expect(screen.getByTestId("comments")).toBeInTheDocument();
    expect(screen.getByTestId("share")).toBeInTheDocument();
    expect(screen.getByTestId("helpfulness")).toBeInTheDocument();
  });

  it("uses default author when article has no author", () => {
    const noAuthor = { ...mockArticle, author: null, author_credentials: null };
    (useBlogArticle as ReturnType<typeof vi.fn>).mockReturnValue({
      data: noAuthor,
      isLoading: false,
      isSuccess: true,
      isError: false,
    });

    renderBlogPost("test-article");
    expect(screen.getByText("Living With Arthritis Clinical Review Board")).toBeInTheDocument();
    expect(screen.getByText("Evidence-based health content")).toBeInTheDocument();
  });
});
