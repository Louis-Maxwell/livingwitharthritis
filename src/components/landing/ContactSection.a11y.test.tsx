// Static accessibility check for the Contact section.
//
// Renders the component in jsdom and runs axe-core against the resulting
// DOM with the WCAG 2.0 A/AA + 2.1 AA rulesets enabled. Fails if any
// violation is reported. Complements the interaction tests in
// ContactSection.test.tsx and the visual regression suite in tests/visual/.

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axe, { type AxeResults, type Result } from "axe-core";
import ContactSection from "./ContactSection";

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: () => ({ insert: vi.fn().mockResolvedValue({ error: null }) }),
    functions: { invoke: vi.fn().mockResolvedValue({ error: null }) },
  },
}));
vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));
vi.mock("@/lib/analytics", () => ({ trackContactSubmit: vi.fn() }));
vi.mock("@/lib/ga-events", () => ({ trackContactFormSubmit: vi.fn() }));

const AXE_OPTIONS: axe.RunOptions = {
  runOnly: {
    type: "tag",
    values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
  },
};

const formatViolations = (violations: Result[]) =>
  violations
    .map(
      (v) =>
        `\n[${v.impact ?? "unknown"}] ${v.id}: ${v.help}\n  ${v.helpUrl}\n  ${v.nodes
          .map((n) => n.target.join(" "))
          .join("\n  ")}`,
    )
    .join("\n");

describe("ContactSection accessibility", () => {
  let container: HTMLElement;

  beforeEach(() => {
    ({ container } = render(
      <MemoryRouter>
        <main id="main-content">
          <ContactSection />
        </main>
      </MemoryRouter>,
    ));
  });

  it("has no WCAG 2.1 AA violations at rest", async () => {
    const results: AxeResults = await axe.run(container, AXE_OPTIONS);
    expect(
      results.violations,
      `axe reported ${results.violations.length} violation(s):${formatViolations(results.violations)}`,
    ).toEqual([]);
  });
});
