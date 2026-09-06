import { beforeAll, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

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
  author: "Louis Maxwell",
  author_credentials: "First Contact Practitioner, HCPC PH128483",
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
vi.mock("@/hooks/useBlogViews", () => ({
  useBlogViews: vi.fn(() => 42),
}));
vi.mock("@/components/Header", () => ({ default: () => <div data-testid="header" /> }));
vi.mock("@/components/Footer", () => ({ default: () => <div data-testid="footer" /> }));
vi.mock("@/components/BlogComments", () => ({ default: () => <div data-testid="comments" /> }));
vi.mock("@/components/BlogHelpfulness", () => ({ default: () => <div data-testid="helpfulness" /> }));
vi.mock("@/components/RelatedArticles", () => ({ default: () => <div data-testid="related" /> }));
vi.mock("@/components/ScrollProgress", () => ({ default: () => null }));
vi.mock("@/components/ContinueReadingBar", () => ({ default: () => null }));
vi.mock("@/components/article/InlineRelatedStrip", () => ({ default: () => null }));
vi.mock("@/components/article/MidArticleNextSteps", () => ({ default: () => null }));
vi.mock("@/components/article/EndNextArticleCard", () => ({ default: () => null }));
vi.mock("@/components/HealthToolsCTA", () => ({ default: () => null }));
vi.mock("@/components/article/ArticleVoiceover", () => ({ default: () => null }));
vi.mock("@/components/TableOfContents", () => ({
  default: () => null,
  addHeadingIds: (html: string) => html,
}));
vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
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
    </HelmetProvider>,
  );
}

let BlogPostPage: React.ComponentType;
beforeAll(async () => {
  const mod = await import("../BlogPost");
  BlogPostPage = mod.default;
});

const HEADER_ID = "share-url-header-test-article";
const FOOTER_ID = "share-url-footer-test-article";
const EXPECTED_URL = "https://livingwitharthritis.org.uk/blog/test-article";

function shareBlocks() {
  return screen.getAllByRole("region", { name: "Share this article" });
}

describe("BlogPost SocialShareButtons regression", () => {
  beforeEach(() => {
    (useBlogArticle as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockArticle,
      isLoading: false,
      isSuccess: true,
      isError: false,
    });
  });

  it("renders SocialShareButtons twice with unique input ids for header and footer", () => {
    renderBlogPost("test-article");

    const blocks = shareBlocks();
    expect(blocks).toHaveLength(2);

    const headerInput = document.getElementById(HEADER_ID);
    const footerInput = document.getElementById(FOOTER_ID);
    expect(headerInput).toBeInstanceOf(HTMLInputElement);
    expect(footerInput).toBeInstanceOf(HTMLInputElement);
    expect(headerInput).not.toBe(footerInput);

    const ids = [...document.querySelectorAll<HTMLInputElement>('input[id^="share-url-"]')].map(
      (el) => el.id,
    );
    expect(ids).toEqual([HEADER_ID, FOOTER_ID]);
    expect(new Set(ids).size).toBe(2);
    expect(headerInput).toHaveValue(EXPECTED_URL);
    expect(footerInput).toHaveValue(EXPECTED_URL);
  });

  it("points each Copy link label htmlFor at the matching share URL input", () => {
    renderBlogPost("test-article");

    for (const id of [HEADER_ID, FOOTER_ID]) {
      const label = document.querySelector<HTMLLabelElement>(`label[for="${id}"]`);
      expect(label, `missing Copy link label for ${id}`).not.toBeNull();
      expect(label).toHaveTextContent("Copy link");
      const input = document.getElementById(id);
      expect(input).toBeInstanceOf(HTMLInputElement);
      expect(label!.htmlFor).toBe(id);
      expect(label!.htmlFor).toBe(input!.id);
    }
  });

  it("keeps share buttons and copy inputs keyboard-navigable with aria-labels in both locations", () => {
    renderBlogPost("test-article");
    const blocks = shareBlocks();
    expect(blocks).toHaveLength(2);

    const copyButtons = screen.getAllByRole("button", { name: "Copy link" });
    expect(copyButtons).toHaveLength(2);

    blocks.forEach((block, index) => {
      const instance = index === 0 ? "header" : "footer";
      const inputId = instance === "header" ? HEADER_ID : FOOTER_ID;
      const input = within(block).getByRole("textbox", { name: "Article URL" });
      expect(input).toHaveAttribute("id", inputId);
      expect(input).not.toHaveAttribute("tabindex", "-1");
      expect(input).not.toBeDisabled();
      input.focus();
      expect(input).toHaveFocus();

      const copy = within(block).getByRole("button", { name: "Copy link" });
      expect(copy).toHaveAttribute("aria-label", "Copy link");
      expect(copy).not.toHaveAttribute("tabindex", "-1");
      expect(copy).not.toBeDisabled();
      copy.focus();
      expect(copy).toHaveFocus();

      for (const network of ["Twitter", "Facebook", "WhatsApp", "Email"]) {
        const share = within(block).getByRole("link", { name: `Share on ${network}` });
        expect(share).toHaveAttribute("aria-label", `Share on ${network}`);
        expect(share).not.toHaveAttribute("tabindex", "-1");
        share.focus();
        expect(share).toHaveFocus();
      }
    });
  });

  it("selects the matching input for manual copy when clipboard write fails on both instances", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("clipboard denied"));
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    renderBlogPost("test-article");
    const copyButtons = screen.getAllByRole("button", { name: "Copy link" });
    expect(copyButtons).toHaveLength(2);

    for (const [index, id] of [HEADER_ID, FOOTER_ID].entries()) {
      fireEvent.click(copyButtons[index]);
      await vi.waitFor(() => {
        expect(writeText).toHaveBeenCalledWith(EXPECTED_URL);
      });
      const input = document.getElementById(id) as HTMLInputElement;
      expect(input).toHaveFocus();
      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(input.value.length);
    }
  });
});
