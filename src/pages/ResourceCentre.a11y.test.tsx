// Light axe smoke check for Resource Centre aggregator (Week-1 a11y extend).
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import axe, { type AxeResults, type Result } from "axe-core";
import ResourceCentre from "./ResourceCentre";

vi.mock("@/components/Header", () => ({
  default: () => <header role="banner">Header</header>,
}));
vi.mock("@/components/Footer", () => ({
  default: () => <footer role="contentinfo">Footer</footer>,
}));

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
        `\n[${v.impact ?? "unknown"}] ${v.id}: ${v.help}\n  ${v.nodes
          .map((n) => n.target.join(" "))
          .join("\n  ")}`,
    )
    .join("\n");

describe("ResourceCentre accessibility", () => {
  it("has no WCAG 2.1 AA violations at rest", async () => {
    const { container } = render(
      <HelmetProvider>
        <MemoryRouter>
          <ResourceCentre />
        </MemoryRouter>
      </HelmetProvider>,
    );
    const results: AxeResults = await axe.run(container, AXE_OPTIONS);
    expect(
      results.violations,
      `axe reported ${results.violations.length} violation(s):${formatViolations(results.violations)}`,
    ).toEqual([]);
  });

  it("exposes a single main landmark with skip target", () => {
    const { container } = render(
      <HelmetProvider>
        <MemoryRouter>
          <ResourceCentre />
        </MemoryRouter>
      </HelmetProvider>,
    );
    const mains = container.querySelectorAll("main#main-content");
    expect(mains).toHaveLength(1);
    expect(mains[0].getAttribute("role")).toBe("main");
  });
});
