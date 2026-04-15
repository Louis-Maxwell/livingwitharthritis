import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createElement } from "react";

// Mock supabase client
const mockSelect = vi.fn();
const mockEq = vi.fn();
const mockNeq = vi.fn();
const mockLt = vi.fn();
const mockNot = vi.fn();
const mockOrder = vi.fn();
const mockLimit = vi.fn();
const mockSingle = vi.fn();

const chainable = () => ({
  select: mockSelect,
  eq: mockEq,
  neq: mockNeq,
  lt: mockLt,
  not: mockNot,
  order: mockOrder,
  limit: mockLimit,
  single: mockSingle,
});

// Each mock returns the chainable object so calls can be chained
beforeEach(() => {
  vi.clearAllMocks();
  [mockSelect, mockEq, mockNeq, mockLt, mockNot, mockOrder, mockLimit].forEach(
    (fn) => fn.mockReturnValue(chainable())
  );
});

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: vi.fn(() => chainable()),
  },
}));

import {
  useBlogArticle,
  useBlogArticlesList,
  useNextArticle,
  useRelatedArticles,
} from "../useBlogArticles";

function createWrapper() {
  const qc = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: qc }, children);
}

describe("useBlogArticle", () => {
  it("returns null when slug is undefined", async () => {
    const { result } = renderHook(() => useBlogArticle(undefined), {
      wrapper: createWrapper(),
    });
    // Query is disabled so data stays undefined
    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
  });

  it("fetches a single article by slug", async () => {
    const article = { slug: "test", title: "Test Article", content: "Hello" };
    mockSingle.mockResolvedValueOnce({ data: article, error: null });

    const { result } = renderHook(() => useBlogArticle("test"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(article);
  });

  it("throws on supabase error", async () => {
    mockSingle.mockResolvedValueOnce({
      data: null,
      error: { message: "not found" },
    });

    const { result } = renderHook(() => useBlogArticle("bad-slug"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});

describe("useBlogArticlesList", () => {
  it("returns empty array on empty result", async () => {
    mockOrder.mockReturnValueOnce({
      ...chainable(),
      then: undefined,
    });
    // The final call in the chain resolves the promise
    mockOrder.mockResolvedValueOnce({ data: [], error: null });

    const { result } = renderHook(() => useBlogArticlesList(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([]);
  });
});

describe("useNextArticle", () => {
  it("returns next article by date", async () => {
    // First call: get current article's date
    mockSingle.mockResolvedValueOnce({
      data: { date: "2025-06-01", display_order: 1 },
      error: null,
    });
    // Second call: get next (older) article
    mockSingle.mockResolvedValueOnce({
      data: { slug: "next-article", title: "Next Article" },
      error: null,
    });

    const { result } = renderHook(() => useNextArticle("current-slug"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({
      slug: "next-article",
      title: "Next Article",
    });
  });

  it("wraps around when no older article exists", async () => {
    mockSingle
      .mockResolvedValueOnce({
        data: { date: "2020-01-01", display_order: 99 },
        error: null,
      })
      .mockResolvedValueOnce({ data: null, error: null }) // no older
      .mockResolvedValueOnce({
        data: { slug: "newest", title: "Newest" },
        error: null,
      });

    const { result } = renderHook(() => useNextArticle("oldest-slug"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({ slug: "newest", title: "Newest" });
  });

  it("returns null when current article not found", async () => {
    mockSingle.mockResolvedValueOnce({ data: null, error: null });

    const { result } = renderHook(() => useNextArticle("missing"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeNull();
  });
});

describe("useRelatedArticles", () => {
  it("returns same-category articles when enough exist", async () => {
    const related = [
      { slug: "a1", title: "A1", excerpt: "", date: "2025-01-01", category: "Health" },
      { slug: "a2", title: "A2", excerpt: "", date: "2025-01-02", category: "Health" },
      { slug: "a3", title: "A3", excerpt: "", date: "2025-01-03", category: "Health" },
    ];

    mockSingle.mockResolvedValueOnce({
      data: { category: "Health" },
      error: null,
    });
    mockLimit.mockResolvedValueOnce({ data: related, error: null });

    const { result } = renderHook(() => useRelatedArticles("current"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(3);
  });
});
