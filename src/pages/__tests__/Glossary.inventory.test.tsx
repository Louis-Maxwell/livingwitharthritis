import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Glossary from "../Glossary";
import GlossaryTerm from "../GlossaryTerm";
import { GLOSSARY_CONTENT } from "@/data/glossary-content";
import { GLOSSARY_ROUTES } from "@/data/glossary-routes.generated";

vi.mock("@/components/Header", () => ({ default: () => <div /> }));
vi.mock("@/components/Footer", () => ({ default: () => <div /> }));

const written = GLOSSARY_ROUTES.filter((path) => path !== "/glossary" && GLOSSARY_CONTENT[path.replace("/glossary/", "")]);
const pending = GLOSSARY_ROUTES.find((path) => path !== "/glossary" && !GLOSSARY_CONTENT[path.replace("/glossary/", "")])!;
function page(path = "/glossary") {
  return render(<HelmetProvider><MemoryRouter initialEntries={[path]}><Routes>
    <Route path="/glossary" element={<Glossary />} />
    <Route path="/glossary/:term" element={<GlossaryTerm />} />
  </Routes></MemoryRouter></HelmetProvider>);
}

describe("glossary published definitions", () => {
  it("lists only written definitions and uses their existing labels", () => {
    page();
    const main = screen.getByRole("main");
    const links = within(main).getAllByRole("link");
    expect(links.map((link) => link.getAttribute("href")).sort()).toEqual([...written].sort());
    for (const path of written) {
      const entry = GLOSSARY_CONTENT[path.replace("/glossary/", "")];
      expect(within(main).getByRole("link", { name: entry.label })).toHaveAttribute("href", path);
    }
    expect(main).toHaveTextContent(`definitions of ${written.length} arthritis`);
    expect(links.some((link) => link.getAttribute("href") === pending)).toBe(false);
  });

  it("publishes the same written inventory in DefinedTermSet schema", async () => {
    page();
    await waitFor(() => {
      const schema = Array.from(document.head.querySelectorAll('script[type="application/ld+json"]'))
        .map((node) => JSON.parse(node.textContent || "{}"))
        .find((node) => node["@type"] === "DefinedTermSet");
      expect(schema).toBeDefined();
      expect(schema.hasDefinedTerm.map((term: { url: string }) => new URL(term.url).pathname).sort()).toEqual([...written].sort());
      expect(schema.hasDefinedTerm.every((term: { description?: string }) => !!term.description?.trim())).toBe(true);
    });
  });

  it("keeps reserved placeholder routes accessible but related links point to written definitions", () => {
    page(pending);
    const main = screen.getByRole("main");
    expect(main).toHaveTextContent("A fuller definition is being written");
    const related = within(main).getAllByRole("link").filter((link) => link.getAttribute("href") !== "/glossary");
    expect(related.length).toBeGreaterThan(0);
    for (const link of related) expect(written).toContain(link.getAttribute("href"));
  });
});
