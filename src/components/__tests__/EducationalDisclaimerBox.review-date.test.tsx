import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import EducationalDisclaimerBox from "../seo/EducationalDisclaimerBox";

describe("clinical-review dates", () => {
  it("shows last reviewed and next review (+12 months)", () => {
    render(<MemoryRouter><EducationalDisclaimerBox lastReviewed="2026-10-23" /></MemoryRouter>);
    const line = screen.getByTestId("review-dates").textContent || "";
    expect(line).toContain("Louis Maxwell, HCPC PH128483");
    expect(line).toContain("Last reviewed 23 October 2026");
    expect(line).toContain("Next review 23 October 2027");
  });
  it("never shows 'review date not recorded' and never invents a date", () => {
    render(<MemoryRouter><EducationalDisclaimerBox /></MemoryRouter>);
    expect(screen.queryByText(/not recorded/i)).toBeNull();
    expect(screen.queryByText(/Last reviewed/)).toBeNull();
  });
});
