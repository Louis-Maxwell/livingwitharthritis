import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
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
  reviewed_by: "Maxwell",
  reviewer_credentials: "First Contact Practitioner, HCPC PH128483, CSP Member",
  is_published: true,
  display_order: 1,
};

vi.mock("@/hooks/useBlogArticles", () => ({
  useBlogArticle: vi.fn(),
  useRelatedArticles: vi.fn(() => ({ data: [] })),
  useNextArticle: vi.fn(() => ({ data: null })),
}));
vi.mock("@/components/Header", () => ({ default: () => <div data-testid="header" /> }));
vi.mock("@/components/Footer", () => ({ default: () => <div data-testid="footer" /> }));
vi.mock("@/components/BlogComments", () => ({ default: () => <div data-testid="comments" /> }));
vi.mock("@/components/BlogHelpfulness", () => ({ default: () => <div data-testid="helpfulness" /> }));
vi.mock("@/components/RelatedArticles", () => ({ default: () => <div data-testid="related" /> }));
vi.mock("@/components/SocialShareButtons", () => ({ default: () => <div data-testid="share" /> }));
vi.mock("@/components/ScrollProgress", () => ({ default: () => null }));
vi.mock("@/components/ContinueReadingBar", () => ({ default: () => null }));
vi.mock("@/components/article/InlineRelatedStrip", () => ({ default: () => null }));
vi.mock("@/components/article/MidArticleNextSteps", () => ({ default: () => null }));
vi.mock("@/components/article/EndNextArticleCard", () => ({ default: () => null }));
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

  it("shows the noindex 404 experience for a missing article", () => {
    (useBlogArticle as ReturnType<typeof vi.fn>).mockReturnValue({
      data: null,
      isLoading: false,
      isSuccess: true,
      isError: false,
    });

    renderBlogPost("nonexistent");
    expect(
      screen.getByRole("heading", { level: 1, name: /could not find that page/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Article library" })).toBeInTheDocument();
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
    expect(screen.getAllByText(/Reviewed by Maxwell/).length).toBeGreaterThan(0);
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

  it("does not display visitor or view counts (no fake engagement metrics)", () => {
    (useBlogArticle as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockArticle,
      isLoading: false,
      isSuccess: true,
      isError: false,
    });

    renderBlogPost("test-article");
    // Listing/post UI refuses fabricated or orphan view metrics.
    expect(screen.queryByText("42")).not.toBeInTheDocument();
    expect(screen.queryByText(/views/i)).not.toBeInTheDocument();
    // Bookmark toggle is available (localStorage, keyed by slug).
    expect(screen.getAllByRole("button", { name: /bookmark/i }).length).toBeGreaterThan(0);
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

  it("renders related articles and comments sections", async () => {
    (useBlogArticle as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockArticle,
      isLoading: false,
      isSuccess: true,
      isError: false,
    });

    renderBlogPost("test-article");
    expect(screen.getAllByTestId("share").length).toBeGreaterThan(0);
    await waitFor(() => {
      expect(screen.getByTestId("related")).toBeInTheDocument();
      expect(screen.getByTestId("comments")).toBeInTheDocument();
      expect(screen.getByTestId("helpfulness")).toBeInTheDocument();
    });
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
    expect(screen.getByText("Living With Arthritis UK Editorial Team")).toBeInTheDocument();
    expect(screen.getByText("Editorial content")).toBeInTheDocument();
  });

  it("does not claim an unverified generic review or generic citations", async () => {
    (useBlogArticle as ReturnType<typeof vi.fn>).mockReturnValue({
      data: {
        ...mockArticle,
        reviewed_by: "Clinical Advisory Panel",
        reviewer_credentials: "Physiotherapy input",
        citations: null,
      },
      isLoading: false,
      isSuccess: true,
      isError: false,
    });

    renderBlogPost("test-article");
    expect(screen.queryByText(/Reviewed by Clinical Advisory Panel/)).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Sources & References" }),
    ).not.toBeInTheDocument();

    const readSchemas = () =>
      Array.from(
        document.head.querySelectorAll<HTMLScriptElement>(
          'script[type="application/ld+json"]',
        ),
      ).map((script) => JSON.parse(script.textContent || "{}"));
    const articleSchema = await waitFor(() => {
      const schema = readSchemas().find(
        (candidate) => candidate["@type"] === "Article",
      );
      expect(schema).toBeDefined();
      return schema;
    });
    expect(articleSchema["@id"]).toBe(
      "https://livingwitharthritis.org.uk/blog/test-article#article",
    );
    expect(articleSchema.reviewedBy).toBeUndefined();
    expect(articleSchema.citation).toBeUndefined();
    expect(
      readSchemas().some((schema) => schema["@type"] === "FAQPage"),
    ).toBe(false);
  });
});
