import { beforeAll, describe, it, expect, vi } from "vitest";
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

// Emulate below-the-fold blocks that have never entered the viewport.
vi.mock("@/components/ViewportSection", () => ({ default: () => null }));
vi.mock("@/hooks/useBlogArticle", () => ({ useBlogArticle: vi.fn() }));
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

import { useBlogArticle } from "@/hooks/useBlogArticle";
import { loadMarkdownParser } from "@/lib/markdownParser";

// Fixtures are markdown; load the on-demand parser up front so renders are synchronous.
beforeAll(async () => {
  await loadMarkdownParser();
});

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


import tens from "@/content/blog/posts/tens-machines-arthritis-uk.json";

describe("Article evidence and FAQ visibility", () => {
  it("shows TENS safety and FAQs before deferred sections enter the viewport", async () => {
    vi.mocked(useBlogArticle).mockReturnValue({
      data: { ...mockArticle, ...tens },
      isLoading: false,
    } as unknown as ReturnType<typeof useBlogArticle>);
    renderBlogPost(tens.slug);
    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "TENS safety and reasons to avoid it" })).toBeInTheDocument();
      expect(screen.getByText(/says not to use it if you have epilepsy or a pacemaker/)).toBeInTheDocument();
      expect(screen.getByRole("region", { name: "Frequently asked questions" })).toBeInTheDocument();
      expect(screen.getByText("Will a TENS machine cure arthritis?")).toBeInTheDocument();
      expect(screen.getByText("No. Temporary symptom relief does not establish that a treatment alters the disease.")).toBeVisible();
    });
  });
});
