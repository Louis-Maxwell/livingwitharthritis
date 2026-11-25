import { describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import SearchPage from "@/pages/SearchPage";

vi.mock("@/components/Header", () => ({ default: () => <header>Header</header> }));
vi.mock("@/components/Footer", () => ({ default: () => <footer>Footer</footer> }));
vi.mock("@/components/ui/PageHero", () => ({
  default: ({ title }: { title: string }) => <h1>{title}</h1>,
}));

function SearchNavigation() {
  const navigate = useNavigate();
  return <><button onClick={() => navigate('/search?q=PIP&topic=Finances%20%26%20Benefits')}>PIP search link</button><button onClick={() => navigate(-1)}>Browser back</button></>;
}

function renderSearch(initial = "/search") {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[initial]}>
        <SearchNavigation /><Routes>
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe("Search page", () => {
  it("treats unknown URL filters as defaults instead of silently excluding every result", () => {
    renderSearch('/search?q=knee&topic=invalid-topic&length=bogus');
    expect(screen.getByRole('combobox', { name: /topic/i })).toHaveValue('All');
    expect(screen.getByRole('combobox', { name: /word count/i })).toHaveValue('any');
    expect(screen.getAllByRole('heading', { level: 2 }).length).toBeGreaterThan(0);
  });
  it("clears the query and filters, restores results and focuses the search input", () => {
    renderSearch('/search?q=zzzznomatch&topic=Exercise&length=over1000');
    expect(screen.getByText('No matches for that search')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Clear search and filters' }));
    expect(screen.getByRole('searchbox', { name: 'Search articles and hubs' })).toHaveValue('');
    expect(screen.getByRole('searchbox', { name: 'Search articles and hubs' })).toHaveFocus();
    expect(within(screen.getByRole('region', { name: 'Search results' })).getAllByRole('heading', { level: 2 })).toHaveLength(50);
  });
  it("updates query and filters for same-page navigation and browser Back", () => {
    renderSearch('/search?q=knee&topic=Exercise');
    fireEvent.click(screen.getByRole('button', { name: 'PIP search link' }));
    expect(screen.getByRole('searchbox', { name: 'Search articles and hubs' })).toHaveValue('PIP');
    expect(screen.getByRole('combobox', { name: /topic/i })).toHaveValue('Finances & Benefits');
    fireEvent.click(screen.getByRole('button', { name: 'Browser back' }));
    expect(screen.getByRole('searchbox', { name: 'Search articles and hubs' })).toHaveValue('knee');
    expect(screen.getByRole('combobox', { name: /topic/i })).toHaveValue('Exercise');
  });

  it("limits initial rendering and keeps further results accessible", () => {
    renderSearch();
    const results = within(screen.getByRole("region", { name: "Search results" }));
    expect(results.getAllByRole("heading", { level: 2 })).toHaveLength(50);
    fireEvent.click(screen.getByRole("button", { name: /show more results/i }));
    expect(results.getAllByRole("heading", { level: 2 })).toHaveLength(100);
  });
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

  it("keeps literal filter-default words searchable and allows spaces while typing", () => {
    renderSearch();
    const input = screen.getByRole('searchbox', { name: 'Search articles and hubs' });
    for (const value of ['All', 'any', 'knee ', 'knee exercises']) {
      fireEvent.change(input, { target: { value } });
      expect(input).toHaveValue(value);
    }
  });
  it("honours topic query params", () => {
    renderSearch("/search?topic=Exercise");
    const topic = screen.getByRole("combobox", { name: /topic/i }) as HTMLSelectElement;
    expect(topic.value).toBe("Exercise");
  });
});
