import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

const mockArticle = {
  slug: "test-article",
  title: "Managing Arthritis Pain",
  excerpt: "Tips for managing joint pain effectively.",
  content: "## Introduction\\n\\nArthritis affects millions of people in the UK.",
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
  useRelatedArticles: vi.fn(() => []),
}));
vi.mock("@/hooks/useBlogViews", () => ({ useBlogViews: vi.fn(() => 42) }));
vi.mock("@/components/Header", () => ({ default: () => <div data-testid="header" /> }));
vi.mock("@/components/Footer", () => ({ default: () => <div data-testid="footer" /> }));
vi.mock("@/components/BlogComments", () => ({ default: () => null }));
vi.mock("@/components/BlogHelpfulness", () => ({ default: () => null }));
vi.mock("@/components/RelatedArticles", () => ({ default: () => null }));
vi.mock("@/components/SocialShareButtons", () => ({ default: () => null }));
vi.mock("@/components/ScrollProgress", () => ({ default: () => null }));
vi.mock("@/components/ContinueReadingBar", () => ({ default: () => null }));
vi.mock("@/components/HealthToolsCTA", () => ({ default: () => null }));
vi.mock("@/components/TableOfContents", () => ({ default: () => null, addHeadingIds: (html: string) => html }));
vi.mock("@/components/CrossLinkBanner", () => ({ default: () => null }));
vi.mock("@/components/InternalLinks", () => ({ default: () => null }));
vi.mock("@/components/NextReadStrip", () => ({ default: () => null }));
vi.mock("@/components/article/FeedbackPoll", () => ({ default: () => null }));
vi.mock("@/components/article/InlineRelatedStrip", () => ({ default: () => null }));
vi.mock("@/components/article/ArticleFaqSection", () => ({ default: () => null }));
vi.mock("@/components/article/ArticleClosingCTA", () => ({ default: () => null }));
vi.mock("@/components/blog/ArticleCitations", () => ({ default: () => null }));
vi.mock("@/components/seo/AnswerBox", () => ({ default: ({ children }: { children: React.ReactNode }) => <div>{children}</div> }));
vi.mock("@/components/article/KeyTakeaways", () => ({ default: () => null }));
vi.mock("@/components/MedicalReviewBadge", () => ({ default: () => null }));
vi.mock("@/lib/articleImages", () => ({
  getArticleImages: () => [
    { src: "/images/a.webp", alt: "a", credit: "" },
    { src: "/images/b.webp", alt: "b", credit: "" },
    { src: "/images/c.webp", alt: "c", credit: "" },
  ],
  coverImage: () => ({ src: "/images/a.webp", alt: "a" }),
}));

import { useBlogArticle } from "@/hooks/useBlogArticles";

beforeAll(() => {
  Object.defineProperty(window, "speechSynthesis", {
    configurable: true,
    value: {
      speak: vi.fn(),
      cancel: vi.fn(),
      pause: vi.fn(),
      resume: vi.fn(),
      getVoices: vi.fn(() => [{ lang: "en-GB", name: "British English", default: true, localService: true, voiceURI: "en-GB" }]),
      speaking: false,
      pending: false,
      paused: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    },
  });
  // @ts-expect-error test stub
  window.SpeechSynthesisUtterance = function SpeechSynthesisUtterance(this: { text: string }, text: string) { this.text = text; };
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
    </HelmetProvider>,
  );
}

let BlogPostPage: React.ComponentType;
beforeAll(async () => {
  const mod = await import("../BlogPost");
  BlogPostPage = mod.default;
});

describe("BlogPost ArticleVoiceover", () => {
  it("mounts a Listen player for a sample article", () => {
    (useBlogArticle as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockArticle,
      isLoading: false,
      isSuccess: true,
      isError: false,
    });
    renderBlogPost("test-article");
    const player = document.getElementById("listen");
    expect(player).toBeTruthy();
    expect(player).toHaveAttribute("aria-label", "Listen to this article");
    expect(screen.getByText(/Listen to this article/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /play article audio|pause article audio/i })).toBeInTheDocument();
  });
});
