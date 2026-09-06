import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MidArticleNextSteps from "@/components/article/MidArticleNextSteps";

vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));

describe("MidArticleNextSteps", () => {
  it("biases toward exercise links for exercise-themed articles", () => {
    render(
      <MemoryRouter>
        <MidArticleNextSteps
          category="Exercise"
          title="Knee exercises for osteoarthritis"
          keywords="knee, physio, movement"
        />
      </MemoryRouter>,
    );
    expect(screen.getByRole("link", { name: /Joint exercises/i })).toHaveAttribute(
      "href",
      "/exercises",
    );
    expect(screen.getByText(/Practical next steps/i)).toBeInTheDocument();
  });

  it("biases toward diet links for nutrition articles", () => {
    render(
      <MemoryRouter>
        <MidArticleNextSteps
          category="Diet"
          title="Anti-inflammatory foods"
          keywords="nutrition, mediterranean"
        />
      </MemoryRouter>,
    );
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/diet");
  });
});
