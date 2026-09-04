import { describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import SearchPage from "@/pages/SearchPage";

vi.mock("@/components/Header", () => ({ default: () => <header>Header</header> }));
vi.mock("@/components/Footer", () => ({ default: () => <footer>Footer</footer> }));
vi.mock("@/components/ui/PageHero", () => ({
  default: ({ title }: { title: string }) => <h1>{title}</h1>,
}));

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
  it("renders heading filters and query results", () => {
    renderSearch();
    expect(screen.getByRole("heading", { name: /find answers faster/i })).toBeInTheDocument();
    const input = screen.getByPlaceholderText(/search pip/i);
    expect(input).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /topic/i })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /word count/i })).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "PIP" } });
    expect(screen.getByText(/result/i)).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 2 }).length).toBeGreaterThan(0);
  });

  it("honours topic query params", () => {
    renderSearch("/search?topic=Exercise");
    const topic = screen.getByRole("combobox", { name: /topic/i }) as HTMLSelectElement;
    expect(topic.value).toBe("Exercise");
  });
});
