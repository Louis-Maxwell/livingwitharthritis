import { render, screen, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import BlogCategory from "../BlogCategory";

vi.mock("@/hooks/useBlogArticles", () => ({
  useConditionArticles: () => ({ data: [] }),
}));

vi.mock("../BlogIndex", () => ({
  default: (props: { emitSeo?: boolean; categoryAliases?: string[] }) => (
    <div
      data-testid="blog-index"
      data-emit-seo={String(props.emitSeo)}
      data-aliases={props.categoryAliases?.join("|")}
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
    expect(screen.getByTestId("blog-index")).toHaveAttribute(
      "data-aliases",
      "Exercise|Exercises|Exercise Guides",
    );
  });
});
