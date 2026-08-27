import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/badge";

describe("Badge", () => {
  it("renders a badge element", () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
  });

  it("applies default variant classes", () => {
    const { container } = render(<Badge>Default</Badge>);
    const badge = container.querySelector("div");
    expect(badge?.className).toContain("badge");
  });

  it("applies secondary variant", () => {
    const { container } = render(<Badge variant="secondary">Secondary</Badge>);
    const badge = container.querySelector("div");
    expect(badge).toBeInTheDocument();
  });

  it("applies destructive variant", () => {
    const { container } = render(<Badge variant="destructive">Error</Badge>);
    const badge = container.querySelector("div");
    expect(badge).toBeInTheDocument();
  });

  it("applies outline variant", () => {
    const { container } = render(<Badge variant="outline">Outline</Badge>);
    const badge = container.querySelector("div");
    expect(badge).toBeInTheDocument();
  });

  it("accepts custom className", () => {
    const { container } = render(
      <Badge className="custom-class">Custom</Badge>
    );
    const badge = container.querySelector("div");
    expect(badge?.className).toContain("custom-class");
  });
});
