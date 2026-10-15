import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import GbpMapSection from "../GbpMapSection";

describe("GbpMapSection", () => {
  it("shows placeholder when embed is unset (no fake address)", () => {
    render(<GbpMapSection embedUrl={null} />);
    expect(screen.getByTestId("gbp-map-placeholder")).toHaveTextContent(
      /Map goes live once Google Business Profile is verified/i,
    );
    expect(screen.queryByTestId("gbp-map-iframe")).not.toBeInTheDocument();
    expect(
      screen.getByText(/Area served: United Kingdom \(GB\)/i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Oswestry/i)).not.toBeInTheDocument();
  });

  it("renders iframe with width/height when allowlisted embed URL is set", () => {
    const url =
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d0!2d0!3d0";
    render(<GbpMapSection embedUrl={url} />);
    const iframe = screen.getByTestId("gbp-map-iframe");
    expect(iframe).toHaveAttribute("src", url);
    expect(iframe).toHaveAttribute("width", "800");
    expect(iframe).toHaveAttribute("height", "450");
    expect(screen.queryByTestId("gbp-map-placeholder")).not.toBeInTheDocument();
  });

  it("rejects disallowed override URLs and falls back to placeholder", () => {
    render(<GbpMapSection embedUrl="https://evil.example/maps/embed?pb=x" />);
    expect(screen.getByTestId("gbp-map-placeholder")).toBeInTheDocument();
    expect(screen.queryByTestId("gbp-map-iframe")).not.toBeInTheDocument();
  });
});
