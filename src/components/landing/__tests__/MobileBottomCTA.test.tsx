import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import MobileBottomCTA from "../MobileBottomCTA";

vi.mock("@/lib/ga-events", () => ({ trackMobileBottomCTA: vi.fn() }));

beforeEach(() => {
  sessionStorage.clear();
  Object.defineProperty(window, "scrollY", { value: 500, configurable: true });
});
afterEach(cleanup);

function mount() {
  return render(<MemoryRouter><MobileBottomCTA /><Routes>
    <Route path="/" element={<p>Home</p>} />
    <Route path="/guides/arthritis-pain-relief" element={<p>Pain guide</p>} />
  </Routes></MemoryRouter>);
}

describe("Mobile help navigation", () => {
  it("stays dismissed after more scrolling, even if storage is unavailable", () => {
    mount();
    const storage = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("Storage blocked"); });
    try {
      fireEvent.click(screen.getByRole("button", { name: "Dismiss" }));
      fireEvent.scroll(window);
      expect(screen.queryByRole("button", { name: "Dismiss" })).toBeNull();
    } finally { storage.mockRestore(); }
  });

  it("keeps the dismissal on a later mount in the same session", () => {
    const first = mount();
    fireEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    first.unmount();
    mount();
    fireEvent.scroll(window);
    expect(screen.queryByRole("button", { name: "Dismiss" })).toBeNull();
  });

  it("opens a help guide through the router without a document reload", () => {
    mount();
    fireEvent.click(screen.getByRole("link", { name: "Relief" }));
    expect(screen.getByText("Pain guide")).toBeInTheDocument();
  });
});
