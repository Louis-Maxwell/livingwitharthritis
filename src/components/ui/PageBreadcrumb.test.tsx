import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import PageBreadcrumb from "./PageBreadcrumb";
import RouteFocus from "../RouteFocus";
import SeoDefaults from "../SeoDefaults";

afterEach(() => { cleanup(); document.head.innerHTML = ""; window.history.replaceState({}, "", "/"); });

describe("route-specific breadcrumb hydration", () => {
  for (const [path, segments] of [
    ["/faq", [{ label: "Arthritis FAQs" }]],
    ["/pets", [{ label: "Pets" }]],
    ["/pets/arthritis-in-cats", [{ label: "Pets", href: "/pets" }, { label: "Arthritis in Cats: The Silent Condition" }]],
  ] as const) {
    it(`keeps the correct route trail after static cleanup at ${path}`, async () => {
      window.history.replaceState({}, "", path);
      document.head.innerHTML = '<script id="ld-home-breadcrumb" type="application/ld+json">{"@type":"BreadcrumbList"}</script><script data-static-route-schema type="application/ld+json">{"@type":"BreadcrumbList"}</script>';
      render(<MemoryRouter initialEntries={[path]}><HelmetProvider><RouteFocus /><SeoDefaults /><PageBreadcrumb segments={[...segments]} /></HelmetProvider></MemoryRouter>);
      await waitFor(() => {
        const trails = [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => JSON.parse(s.textContent || "{}")).filter(s => s["@type"] === "BreadcrumbList");
        expect(trails).toHaveLength(1);
        const items = trails[0].itemListElement;
        expect(items[0]).toMatchObject({ name: "Home", item: "https://livingwitharthritis.org.uk/" });
        expect(items.at(-1)).toMatchObject({ name: segments.at(-1)?.label, item: `https://livingwitharthritis.org.uk${path}` });
        expect(document.getElementById("ld-home-breadcrumb")).toBeNull();
        expect(document.querySelector('[data-static-route-schema]')).toBeNull();
      });
    });
  }
});
