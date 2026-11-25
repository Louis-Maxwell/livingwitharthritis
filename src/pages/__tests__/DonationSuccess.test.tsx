import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DonationSuccess from "@/pages/DonationSuccess";
import { trackDonationComplete } from "@/lib/analytics";

vi.mock("@/components/Header", () => ({ default: () => <header>Header</header> }));
vi.mock("@/components/Footer", () => ({ default: () => <footer>Footer</footer> }));
vi.mock("@/components/SeoHead", () => ({ default: () => null }));
vi.mock("@/lib/analytics", () => ({ trackDonationComplete: vi.fn() }));

describe("donation return evidence", () => {
  it.each([
    "/donation-result/success?amount=500&session_id=forged",
    "/donation-result?donation=success&amount=500&transaction_id=forged",
    "/donation-result?donation=cancelled",
    "/donation-result",
  ])("does not confirm money or record revenue from %s", (path) => {
    render(<MemoryRouter initialEntries={[path]}><DonationSuccess /></MemoryRouter>);
    expect(trackDonationComplete).not.toHaveBeenCalled();
    expect(screen.getByText(/check your payment provider receipt or account/i)).toBeInTheDocument();
    expect(screen.queryByText(/donation has been received|payment was not processed|no charge was made/i)).not.toBeInTheDocument();
  });
});
