import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MedicalDisclaimerStrip from "@/components/MedicalDisclaimerStrip";
import { DisclaimerStripShown } from "@/components/disclaimerChrome";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";

describe("disclaimer strip nesting", () => {
  it("renders one strip in layout and skips a nested duplicate", () => {
    render(
      <MemoryRouter>
        <MedicalDisclaimerStrip />
        <DisclaimerStripShown>
          <MedicalDisclaimerStrip />
        </DisclaimerStripShown>
      </MemoryRouter>,
    );
    expect(screen.getAllByLabelText("Medical educational disclaimer")).toHaveLength(1);
  });

  it("drops duplicate short copy in EducationalDisclaimerBox when the layout strip is shown", () => {
    render(
      <MemoryRouter>
        <MedicalDisclaimerStrip />
        <DisclaimerStripShown>
          <EducationalDisclaimerBox lastReviewed="2026-09-16" />
        </DisclaimerStripShown>
      </MemoryRouter>,
    );
    expect(screen.getAllByLabelText("Medical educational disclaimer")).toHaveLength(1);
    expect(screen.getByLabelText("Educational disclaimer and clinical review")).toBeInTheDocument();
    // Short strip copy appears once (layout), not again inside the review box.
    expect(screen.getAllByText(/not a diagnosis or personal medical advice/i)).toHaveLength(1);
  });
});
