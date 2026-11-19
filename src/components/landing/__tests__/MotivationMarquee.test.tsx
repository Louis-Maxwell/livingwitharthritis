import { fireEvent, render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import MotivationMarquee from "../MotivationMarquee";

const css = readFileSync("src/index.css", "utf8");

describe("restored original orange encouragement banner", () => {
  it("keeps one accessible quote while decorative copies scroll", () => {
    const { container } = render(<MotivationMarquee />);
    expect(screen.getByRole("region", { name: "A little encouragement" })).toBeInTheDocument();
    expect(container.querySelector(".sr-only")?.textContent).toBe("Nothing is impossible until you make it happen !!");
    expect(container.querySelector(".motivation-marquee__viewport")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelectorAll(".motivation-marquee__group")).toHaveLength(2);
  });

  it("lets a visitor pause and resume the original scrolling animation", () => {
    const { container } = render(<MotivationMarquee />);
    const track = container.querySelector(".motivation-marquee__track") as HTMLElement;
    fireEvent.click(screen.getByRole("button", { name: "Pause scrolling message" }));
    expect(track.style.animationPlayState).toBe("paused");
    expect(screen.getByRole("button", { name: "Resume scrolling message" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "Resume scrolling message" }));
    expect(track.style.animationPlayState).toBe("running");
  });

  it("places the restored ribbon directly after the hero, before the job router", () => {
    const page = readFileSync("src/pages/Index.tsx", "utf8");
    expect(page).toMatch(/<OAHero \/>\s*<MotivationMarquee \/>/);
    expect(page.indexOf("<MotivationMarquee />")).toBeLessThan(page.indexOf("<HomeJobRouter />"));
  });

  it("retains original orange, hover/focus pause and reduced-motion fallback", () => {
    const start = css.indexOf("/* Lightweight, seamless right-to-left encouragement banner. */");
    const block = css.slice(start, css.indexOf("/* Accessibility and interaction-performance baseline.", start));
    expect(block).toContain("background: #c84308");
    expect(block).toContain("animation: lwaMotivationScroll 36s linear infinite");
    expect(block).toContain(".motivation-marquee:focus-within");
    expect(block).toContain(".motivation-marquee:hover");
    expect(block).toContain("@media (prefers-reduced-motion: reduce)");
    expect(block).toContain("animation: none");
    expect(block).toContain("min-width: 100vw");
    expect(block).toContain("order: -1");
    expect(block).toContain("white-space: normal");
  });
});
