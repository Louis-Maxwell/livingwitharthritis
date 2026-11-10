import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import GeoPageActions from "@/components/geo/GeoPageActions";

const renderAt = (path: string) =>
  render(
    <MemoryRouter>
      <GeoPageActions path={path} title="How to claim PIP for arthritis" />
    </MemoryRouter>,
  );

describe("GeoPageActions", () => {
  it("renders share and email cards on a priority page", () => {
    renderAt("/guides/benefits-pip");
    const share = screen.getByTestId("whatsapp-action-card");
    const link = share.querySelector('a[href^="https://wa.me/?text="]');
    expect(link).not.toBeNull();
    expect(decodeURIComponent(link!.getAttribute("href")!)).toContain(
      "https://livingwitharthritis.org.uk/guides/benefits-pip",
    );
    const resource = screen.getByTestId("resource-download-card");
    expect(resource.querySelector('input[type="email"]')).not.toBeNull();
    expect(resource.querySelector('a[href="/resources/pip-evidence-diary"]')).not.toBeNull();
  });

  it("renders nothing on other pages", () => {
    const { container } = renderAt("/guides/diet");
    expect(container.innerHTML).toBe("");
  });
});
