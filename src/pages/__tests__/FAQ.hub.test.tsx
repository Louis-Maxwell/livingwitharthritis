import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import FAQ from "@/pages/FAQ";
import { faqArticles } from "@/data/faqArticles";

vi.mock("@/components/Header", () => ({
  default: () => <header>Site header</header>,
}));
vi.mock("@/components/Footer", () => ({
  default: () => <footer>Site footer</footer>,
}));

describe("FAQ hub", () => {
  it("lists every in-depth FAQ as a clickable card", async () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <FAQ />
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(
      await screen.findByRole("heading", {
        name: /arthritis questions, answered in plain english/i,
      }),
    ).toBeInTheDocument();

    for (const article of faqArticles) {
      const link = screen.getByRole("link", {
        name: (accessibleName) => accessibleName.includes(article.question),
      });
      expect(link).toHaveAttribute("href", `/faq/${article.slug}`);
    }
  });
});
