import { describe, expect, it } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import SearchPage from "@/pages/Search";

function renderSearch(initial = "/search") {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[initial]}>
        <Routes>
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe("Search page", () => {
  it("renders the search heading and filters", () => {
    renderSearch();
    expect(
      screen.getByRole("heading", { name: /find answers faster/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/search articles and guides/i)).toBeInTheDocument();
    expect(screen.getByText(/^Topic$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Word count$/i)).toBeInTheDocument();
  });

  it("filters results when a query is typed", () => {
    renderSearch();
    const input = screen.getByLabelText(/search articles and guides/i);
    fireEvent.change(input, { target: { value: "PIP" } });
    expect(screen.getByText(/result/i)).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 2 }).length).toBeGreaterThan(0);
  });

  it("honours topic query params", () => {
    renderSearch("/search?topic=Exercise");
    const selects = screen.getAllByRole("combobox");
    expect(selects[0]).toHaveValue("Exercise");
  });

  it("filters by under-1000 word-count bucket", () => {
    renderSearch();
    const selects = screen.getAllByRole("combobox");
    fireEvent.change(selects[1], { target: { value: "under1000" } });
    expect(selects[1]).toHaveValue("under1000");
    expect(screen.getByText(/result/i)).toBeInTheDocument();
  });
});
