import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomeNewsletterBand from "../HomeNewsletterBand";
import { CHARITY } from "@/config/charity";

describe("HomeNewsletterBand", () => {
  it("renders its own headline, distinct from other newsletter placements", () => {
    render(
      <MemoryRouter>
        <HomeNewsletterBand />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("heading", { name: /new arthritis guides, straight to your inbox/i }),
    ).toBeInTheDocument();
  });

  it("states the charity identity and unsubscribe fact without a download promise", () => {
    render(
      <MemoryRouter>
        <HomeNewsletterBand />
      </MemoryRouter>,
    );
    const matches = screen.getAllByText(/unsubscribe anytime/i);
    const copy = matches.find((el) => el.textContent?.includes(CHARITY.number));
    expect(copy, "band copy naming the charity number").toBeTruthy();
    expect(copy?.textContent).not.toMatch(/download|delivered to your inbox/i);
  });

  it("uses the settled homepage signup sequence", () => {
    render(
      <MemoryRouter>
        <HomeNewsletterBand />
      </MemoryRouter>,
    );
    expect(screen.getByRole("button", { name: /get free guides/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });
});
