import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import MedicalDisclaimer from "../MedicalDisclaimer";
import { MEDICAL_DISCLAIMER_FULL, UK_URGENT_CARE, REVIEWED_DISCLAIMER_SHORT } from "@/data/reviewedPublicCopy";

vi.mock("@/components/Header", () => ({ default: () => null }));
vi.mock("@/components/Footer", () => ({ default: () => null }));
const pageId = "https://livingwitharthritis.org.uk/disclaimer#webpage";
const schemas = () => Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map((s) => JSON.parse(s.textContent || "{}"));
const renderPage = () => render(<HelmetProvider><MemoryRouter><MedicalDisclaimer /></MemoryRouter></HelmetProvider>);

describe("reviewed medical disclaimer", () => {
  it("shows the full educational wording and five distinct urgent-care categories", async () => {
    const { unmount } = renderPage();
    for (const paragraph of MEDICAL_DISCLAIMER_FULL) expect(screen.getByText(paragraph)).toBeVisible();
    for (const category of UK_URGENT_CARE) {
      expect(screen.getByRole("heading", { name: category.q })).toBeVisible();
      expect(screen.getByText(category.a)).toBeVisible();
    }
    await waitFor(() => expect(schemas().filter((s) => s["@id"] === pageId)).toHaveLength(1));
    const schema = schemas().find((s) => s["@id"] === pageId);
    expect(schema["@type"]).toBe("WebPage");
    expect(schema.description).toBe(REVIEWED_DISCLAIMER_SHORT);
    expect(schema).not.toHaveProperty("disclaimer");
    expect(schema).not.toHaveProperty("reviewedBy");
    expect(schema).not.toHaveProperty("lastReviewed");
    unmount();
    expect(schemas().filter((s) => s["@id"] === pageId)).toHaveLength(0);
  });

  it("reuses the static page entity rather than adding a competing page block", () => {
    const existing = document.createElement("script");
    existing.type = "application/ld+json";
    existing.setAttribute("data-static-route-schema", "");
    existing.textContent = JSON.stringify({ "@type": "WebPage", "@id": pageId, description: REVIEWED_DISCLAIMER_SHORT });
    document.head.appendChild(existing);
    try {
      const { unmount } = renderPage();
      expect(schemas().filter((s) => s["@id"] === pageId)).toHaveLength(1);
      unmount();
      expect(existing.isConnected).toBe(true);
    } finally { existing.remove(); }
  });
});
