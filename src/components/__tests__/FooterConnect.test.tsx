import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import FooterConnect from "../FooterConnect";
import { getSocialLinksForContext } from "@/config/social-media";

describe("footer Connect cards", () => {
  it("keeps every configured destination with visible labels and safe external links", () => {
    render(<FooterConnect />);
    const nav = screen.getByRole("navigation", { name: "Connect with us" });
    const links = within(nav).getAllByRole("link");
    const expected = getSocialLinksForContext("footer");
    expect(links).toHaveLength(expected.length);
    for (const link of expected) {
      const node = links.find(a => a.getAttribute("href") === link.url);
      expect(node).toBeDefined();
      expect(node).toHaveTextContent(link.displayName);
      if (!link.url.startsWith("mailto:")) {
        expect(node).toHaveAttribute("target", "_blank");
        expect(node?.getAttribute("rel")).toContain("noopener");
        expect(node).toHaveAccessibleName(`Visit ${link.displayName} (opens in a new tab)`);
      }
    }
    expect(within(nav).getByRole("link", { name: "Email Living With Arthritis" })).not.toHaveAttribute("target");
    for (const icon of nav.querySelectorAll("svg")) expect(icon).toHaveAttribute("aria-hidden", "true");
  });
});
