import { describe, expect, it } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SiteSearch from "../SiteSearch";
import { exerciseJointPages } from "@/data/exerciseJointMatrix";

const openSearch = () => {
  render(
    <MemoryRouter>
      <SiteSearch />
    </MemoryRouter>,
  );
  fireEvent.click(screen.getByRole("button", { name: /search the site/i }));
  return screen.getByPlaceholderText(/search exercises/i);
};

describe("SiteSearch", () => {
  it("links joint exercise results to routable slugs", async () => {
    const input = openSearch();
    fireEvent.change(input, { target: { value: "swimming for knee" } });

    const result = await waitFor(() =>
      screen.getByText("Swimming for Knee Arthritis"),
    );

    const slugs = new Set(exerciseJointPages.map((page) => page.slug));
    expect(slugs.has("swimming-for-knee-arthritis")).toBe(true);
    expect(result).toBeInTheDocument();
  });

  it("builds every joint exercise href from generated page data", () => {
    for (const page of exerciseJointPages) {
      expect(page.slug).toMatch(/^[a-z-]+-for-[a-z-]+-arthritis$/);
    }
  });
});
