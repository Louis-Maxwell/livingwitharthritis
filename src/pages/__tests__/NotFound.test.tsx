import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "@/pages/NotFound";

vi.mock("@/components/Header", () => ({ default: () => <header>Header</header> }));
vi.mock("@/components/Footer", () => ({ default: () => <footer>Footer</footer> }));
vi.mock("@/components/SeoHead", () => ({ default: () => null }));
vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));

describe("NotFound", () => {
  it("offers search and popular recovery links", () => {
    render(
      <MemoryRouter initialEntries={["/missing-page"]}>
        <NotFound />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: /could not find that page/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/search articles/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^home$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^blog$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^exercises$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^donate$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /report a broken link/i })).toBeInTheDocument();
  });
});
