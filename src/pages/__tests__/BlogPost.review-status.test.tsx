import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { PENDING_REVIEW_TEXT } from "@/lib/blog/review";

const baseArticle = {
  slug: "test-article",
  title: "Managing Arthritis Pain",
  excerpt: "Tips for managing joint pain effectively, written for people in the UK living with arthritis.",
  content: "## Introduction\n\nArthritis affects millions of people in the UK.",
  date: "2026-09-25",
  updated_at: "2026-09-25T09:00:00.000Z",
  category: "Health",
  image_url: null,
  meta_title: "Managing Arthritis Pain",
  meta_description: "Expert tips for managing arthritis pain.",
  keywords: "arthritis, pain management",
  author: "Louis Maxwell",
  author_credentials: "First Contact Practitioner, HCPC PH128483",
  // Verified reviewer: a reviewed guide WOULD show "Reviewed by" + reviewedBy.
  reviewed_by: "Maxwell",
  reviewer_credentials: "First Contact Practitioner, HCPC PH128483, CSP Member",
  is_published: true,
  display_order: 1,
};

vi.mock("@/hooks/useBlogArticle", () => ({ useBlogArticle: vi.fn() }));
vi.mock("@/hooks/useBlogArticles", () => ({
  useBlogArticle: vi.fn(),
  useRelatedArticles: vi.fn(() => ({ data: [] })),
  useNextArticle: vi.fn(() => ({ data: null })),
}));
vi.mock("@/components/Header", () => ({ default: () => <div data-testid="header" /> }));
vi.mock("@/components/Footer", () => ({ default: () => <div data-testid="footer" /> }));
vi.mock("@/components/BlogComments", () => ({ default: () => null }));
vi.mock("@/components/BlogHelpfulness", () => ({ default: () => null }));
vi.mock("@/components/RelatedArticles", () => ({ default: () => null }));
vi.mock("@/components/SocialShareButtons", () => ({ default: () => null }));
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

// A catalog-only pending flag (no guide is pending in the real catalog now).
vi.mock("@/lib/blog/reviewIndex", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/blog/reviewIndex")>();
  return {
    ...actual,
    getBlogReviewMeta: (slug: string | undefined | null) =>
      slug === "catalog-pending-fixture"
        ? { ...actual.getBlogReviewMeta("menopause-hrt-and-joint-pain")!, reviewStatus: "pending" as const }
        : actual.getBlogReviewMeta(slug),
  };
});

import { useBlogArticle } from "@/hooks/useBlogArticle";
import { loadMarkdownParser } from "@/lib/markdownParser";

// Fixtures are markdown; load the on-demand parser up front so renders are synchronous.
beforeAll(async () => {
  await loadMarkdownParser();
});

let BlogPostPage: React.ComponentType;
beforeAll(async () => {
  BlogPostPage = (await import("../BlogPost")).default;
});

function renderWith(article: Record<string, unknown>) {
  (useBlogArticle as ReturnType<typeof vi.fn>).mockReturnValue({
    data: article,
    isLoading: false,
    isSuccess: true,
    isError: false,
  });
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <HelmetProvider>
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={[`/blog/${article.slug}`]}>
          <Routes>
            <Route path="/blog/:slug" element={<BlogPostPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </HelmetProvider>,
  );
}

async function articleJsonLd(): Promise<Record<string, unknown>[]> {
  let nodes: Record<string, unknown>[] = [];
  await waitFor(() => {
    nodes = Array.from(document.head.querySelectorAll('script[type="application/ld+json"]'))
      .map((s) => JSON.parse(s.textContent || "{}"))
      .filter((n) => n["@type"] === "Article" || n["@type"] === "MedicalWebPage");
    expect(nodes.length).toBe(2);
  });
  return nodes;
}

describe("BlogPost clinical review status", () => {
  it("pending guide: shows the pending byline and never claims a review", async () => {
    renderWith({ ...baseArticle, reviewStatus: "pending" });
    expect(screen.getAllByText(PENDING_REVIEW_TEXT).length).toBeGreaterThanOrEqual(2);
    expect(screen.queryByText(/Clinically reviewed/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Reviewed by Maxwell/)).not.toBeInTheDocument();

    for (const node of await articleJsonLd()) {
      expect(node).not.toHaveProperty("reviewedBy");
      expect(node).not.toHaveProperty("lastReviewed");
      expect(node.author).toMatchObject({ "@type": "Person", name: "Louis Maxwell" });
      expect(node.publisher).toEqual({ "@id": "https://livingwitharthritis.org.uk/#organization" });
    }
  });

  it("pending flag from the catalog applies even if the loaded article lacks it", async () => {
    renderWith({ ...baseArticle, slug: "catalog-pending-fixture" });
    expect(screen.getAllByText(PENDING_REVIEW_TEXT).length).toBeGreaterThanOrEqual(1);
    expect(screen.queryByText(/Clinically reviewed/)).not.toBeInTheDocument();
  });

  it("guide flipped with blog:mark-reviewed shows 'Clinically reviewed'", async () => {
    renderWith({ ...baseArticle, slug: "menopause-hrt-and-joint-pain" });
    expect(screen.queryByText(PENDING_REVIEW_TEXT)).not.toBeInTheDocument();
    expect(screen.getByText(/Clinically reviewed · Louis Maxwell/)).toBeInTheDocument();
  });

  it("reviewed guide (default): unchanged 'Clinically reviewed' and reviewedBy", async () => {
    renderWith(baseArticle);
    expect(screen.queryByText(PENDING_REVIEW_TEXT)).not.toBeInTheDocument();
    expect(screen.getByText(/Clinically reviewed · Louis Maxwell/)).toBeInTheDocument();
    expect(screen.getAllByText(/Reviewed by Maxwell/).length).toBeGreaterThan(0);
    for (const node of await articleJsonLd()) {
      expect(node).toHaveProperty("reviewedBy");
    }
  });
});
