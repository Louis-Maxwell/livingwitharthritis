import { render, screen, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import BlogCategory from "../BlogCategory";

const conditionArticleCalls: string[][] = [];

vi.mock("@/hooks/useBlogArticles", () => ({
  useConditionArticles: (categories: string[]) => {
    conditionArticleCalls.push(categories);
    return { data: [] };
  },
}));

vi.mock("../BlogIndex", () => ({
  default: (props: { emitSeo?: boolean; initialCategory?: string }) => (
    <div
      data-testid="blog-index"
      data-emit-seo={String(props.emitSeo)}
      data-initial-category={props.initialCategory}
    />
  ),
}));

describe("BlogCategory", () => {
  it("retains category metadata and canonical category aliases", async () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={["/blog/category/exercise"]}>
          <Routes>
            <Route path="/blog/category/:category" element={<BlogCategory />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>,
    );

    await waitFor(() =>
      expect(document.title).toContain("Arthritis Exercise Articles"),
    );
    expect(screen.getByTestId("blog-index")).toHaveAttribute(
      "data-emit-seo",
      "false",
    );
    // The hub hands its canonical key to the shared index, which resolves
    // every alias label from the same map used for the ItemList query.
    expect(screen.getByTestId("blog-index")).toHaveAttribute(
      "data-initial-category",
      "exercise",
    );
    expect(conditionArticleCalls.at(-1)).toEqual([
      "Exercise",
      "Exercises",
      "Exercise Guides",
    ]);
  });
});
