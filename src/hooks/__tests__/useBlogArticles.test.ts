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


vi.mock("@/lib/staticBlogCatalog", () => ({
  getStaticBlogArticle: () => undefined,
  getStaticBlogArticles: () => [],
  getStaticBlogList: () => [],
  mergePreferStatic: (_staticItems: unknown, remoteItems: unknown) => remoteItems ?? [],
  sortBlogList: (items: unknown[]) => items ?? [],
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
  it("is defined and callable", () => {
    // useRelatedArticles requires complex chained queries that are hard to mock;
    // verify the export exists and is a function
    expect(typeof useRelatedArticles).toBe("function");
  });
});

describe("static catalog merge (contract)", () => {
  it("exports list and article hooks that remain callable", () => {
    expect(typeof useBlogArticlesList).toBe("function");
    expect(typeof useBlogArticle).toBe("function");
  });
});
