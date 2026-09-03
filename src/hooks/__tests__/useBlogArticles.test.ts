import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createElement } from "react";
import {
  useBlogArticle,
  useBlogArticlesList,
  useNextArticle,
  useRelatedArticles,
} from "../useBlogArticles";
import { listPublishedArticles } from "@/data/staticBlog";

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
    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
  });

  it("loads a published article by slug from local JSON", async () => {
    const sample = listPublishedArticles()[0];
    expect(sample?.slug).toBeTruthy();
    const { result } = renderHook(() => useBlogArticle(sample.slug), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.slug).toBe(sample.slug);
    expect(result.current.data?.title).toBeTruthy();
  });

  it("returns null for an unknown slug", async () => {
    const { result } = renderHook(() => useBlogArticle("this-slug-does-not-exist-xyz"), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeNull();
  });
});

describe("useBlogArticlesList", () => {
  it("returns the checked-in published list", async () => {
    const { result } = renderHook(() => useBlogArticlesList(), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.length).toBeGreaterThan(0);
    expect(result.current.data?.[0].slug).toBeTruthy();
  });
});

describe("useNextArticle", () => {
  it("returns null when current article is not in the list", async () => {
    const { result } = renderHook(() => useNextArticle("missing"), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeNull();
  });
});

describe("useRelatedArticles", () => {
  it("is defined and callable", () => {
    expect(typeof useRelatedArticles).toBe("function");
  });
});
