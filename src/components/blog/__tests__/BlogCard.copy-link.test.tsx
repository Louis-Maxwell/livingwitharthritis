import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BlogCard from "@/components/blog/BlogCard";

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

const post = {
  slug: "turmeric-for-arthritis",
  title: "Turmeric for arthritis",
  excerpt: "A short UK-focused excerpt about turmeric and joint pain.",
  date: "2026-01-15",
  category: "Supplements",
  author: "Louis Maxwell",
};

describe("BlogCard copy link", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("copies the canonical article URL from the listing card", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(
      <MemoryRouter>
        <BlogCard post={post} />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: /Copy link to Turmeric for arthritis/i }));
    await vi.waitFor(() => {
      expect(writeText).toHaveBeenCalledWith(
        "https://livingwitharthritis.org.uk/blog/turmeric-for-arthritis",
      );
    });
    expect(await screen.findByRole("button", { name: "Copied" })).toBeInTheDocument();
  });
});
