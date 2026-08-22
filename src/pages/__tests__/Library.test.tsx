import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Library from "../Library";

vi.mock("@/components/Header", () => ({ default: () => null }));
vi.mock("@/components/Footer", () => ({ default: () => null }));

describe("Library search from the address bar", () => {
  it("filters topics using the q parameter", () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={["/library?q=turmeric"]}>
          <Library />
        </MemoryRouter>
      </HelmetProvider>,
    );

    const search = screen.getByLabelText("Search the health library");
    expect(search).toHaveValue("turmeric");
    expect(screen.getAllByRole("heading", { name: /turmeric/i }).length).toBeGreaterThan(0);
    expect(screen.queryByRole("heading", { name: /^Health Library$/ })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /osteoarthritis/i })).not.toBeInTheDocument();
  });
});
