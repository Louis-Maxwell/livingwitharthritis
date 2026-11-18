import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RecommendedNextStep from "../RecommendedNextStep";
import { recommendedNextSteps, recommendedNextStepsHtml } from "@/lib/recommendedNextSteps.mjs";
import { trackEvent } from "@/lib/analytics";
vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));

describe("evidence-led reading journeys", () => {
  it("sends footwear readers to a blank record and foot guidance, not generic painkillers", () => {
    const paths = recommendedNextSteps("/blog/best-plantar-fasciitis-shoes-women-uk").map(x => x.href);
    expect(paths).toEqual(["/resources/symptom-flare-tracker", "/conditions/foot-and-ankle-arthritis"]);
    const html = recommendedNextStepsHtml("/blog/best-plantar-fasciitis-shoes-women-uk");
    paths.forEach(path => expect(html).toContain(`href="${path}"`));
  });
  it("retains evidence and interaction destinations for supplement queries", () => {
    expect(recommendedNextSteps("/blog/best-supplement-for-knee-joint").map(x => x.href)).toEqual([
      "/supplements", "/blog/medication-supplement-interactions-arthritis",
    ]);
  });
  it("emits one navigation signal with no query or fragment, not a conversion", () => {
    vi.mocked(trackEvent).mockClear();
    render(<MemoryRouter><RecommendedNextStep path="/blog/pip-for-arthritis-uk?email=private#details" placement="end" /></MemoryRouter>);
    fireEvent.click(screen.getByRole("link", { name: "Printable PIP evidence diary" }));
    expect(trackEvent).toHaveBeenCalledTimes(1);
    expect(trackEvent).toHaveBeenCalledWith("recommended_next_step_click", {
      source_path: "/blog/pip-for-arthritis-uk", target_path: "/resources/pip-evidence-diary", placement: "end",
    });
  });
});

// The component uses the shared analytics path. Its loader remains fail-closed
// without consent; optional analytics never block a useful article link.
