import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Link, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import RouteFocus from "./RouteFocus";

describe("RouteFocus", () => {
  it("removes a home-only trail on direct non-home loads", () => {
    const trail = document.createElement("script");
    trail.id = "ld-home-breadcrumb";
    document.head.append(trail);
    const mounted = render(<MemoryRouter initialEntries={["/faq"]}><RouteFocus /></MemoryRouter>);
    expect(document.getElementById("ld-home-breadcrumb")).toBeNull();
    mounted.unmount();
  });
  it("preserves the home trail on a direct home load", () => {
    const trail = document.createElement("script");
    trail.id = "ld-home-breadcrumb";
    document.head.append(trail);
    const mounted = render(<MemoryRouter initialEntries={["/"]}><RouteFocus /></MemoryRouter>);
    expect(document.getElementById("ld-home-breadcrumb")).toBe(trail);
    mounted.unmount();
    trail.remove();
  });
  it("focuses the new H1 after client-side navigation", async () => {
    Object.defineProperty(window, "scrollTo", {
      configurable: true,
      value: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={["/first"]}>
        <RouteFocus />
        <Routes>
          <Route
            path="/first"
            element={
              <main id="main-content">
                <h1>First page</h1>
                <Link to="/second">Next page</Link>
              </main>
            }
          />
          <Route
            path="/second"
            element={
              <main id="main-content">
                <h1>Second page</h1>
              </main>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "First page" })).not.toHaveFocus();
    fireEvent.click(screen.getByRole("link", { name: "Next page" }));

    await waitFor(() =>
      expect(screen.getByRole("heading", { name: "Second page" })).toHaveFocus(),
    );
  });
});
