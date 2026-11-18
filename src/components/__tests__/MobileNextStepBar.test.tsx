import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import MobileNextStepBar from "../MobileNextStepBar";

function page(path = "/glossary") {
  return render(<MemoryRouter initialEntries={[path]}><Routes>
    <Route path="*" element={<MobileNextStepBar />} />
    <Route path="/self-help" element={<h1>Symptom quiz destination</h1>} />
    <Route path="/arthritis-waiting-list-help" element={<h1>Local healthcare destination</h1>} />
  </Routes></MemoryRouter>);
}

beforeEach(() => localStorage.clear());

describe("mobile next-step navigation", () => {
  it("keeps navigation in normal flow instead of a fixed content overlay", () => {
    page();
    const nav = screen.getByRole("navigation", { name: "Suggested next step" });
    expect(nav).not.toHaveClass("fixed", "sticky");
    expect(nav).toHaveClass("relative", "lg:hidden");
    expect(nav.style.bottom).toBe("");
    expect(nav.style.paddingBottom).toContain("68px");
  });

  it("retains full wrapping labels and minimum touch height for both actions", () => {
    page();
    for (const label of ["Symptom quiz", "Local healthcare help"]) {
      const action = screen.getByRole("button", { name: label });
      expect(action).toHaveClass("min-h-[44px]", "min-w-0");
      expect(action.querySelector("span")).toHaveClass("whitespace-normal", "break-words");
      expect(action.querySelector("span")).not.toHaveClass("truncate");
    }
  });

  it.each([
    ["Symptom quiz", "Symptom quiz destination"],
    ["Local healthcare help", "Local healthcare destination"],
  ])("preserves the %s destination", (label, heading) => {
    page();
    fireEvent.click(screen.getByRole("button", { name: label }));
    expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
  });

  it("retains dismissal and its saved preference", () => {
    page();
    fireEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(screen.queryByRole("navigation", { name: "Suggested next step" })).not.toBeInTheDocument();
    expect(Number(localStorage.getItem("nextStepBar:dismissedAt"))).toBeGreaterThan(0);
  });

  it("does not show on transactional routes", () => {
    page("/donation-result/success");
    expect(screen.queryByRole("navigation", { name: "Suggested next step" })).not.toBeInTheDocument();
  });
});
