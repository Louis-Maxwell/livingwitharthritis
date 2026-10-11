import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import EducationalDisclaimerBox from "../seo/EducationalDisclaimerBox";

describe("clinical-review date provenance", () => {
  it("does not invent a date when none is recorded", () => {
    render(<MemoryRouter><EducationalDisclaimerBox /></MemoryRouter>);
    expect(screen.getByText(/Review date not recorded/)).toBeTruthy();
    expect(screen.queryByText(/Clinically reviewed/)).toBeNull();
  });
  it("preserves pending status without a review date", () => {
    render(<MemoryRouter><EducationalDisclaimerBox reviewStatus="pending" /></MemoryRouter>);
    expect(screen.getByTestId("review-status-pending")).toBeTruthy();
    expect(screen.queryByText(/Clinically reviewed/)).toBeNull();
  });
});
