import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import DirectAnswerCapsule from "../DirectAnswerCapsule";
import answers from "@/data/priority-direct-answers.json";
import { buildStaticArticleInner } from "../../../../scripts/static-article-html.mjs";
import { readFileSync } from "node:fs";
import { headDataFor } from "../../../../scripts/inject-canonicals.mjs";
const routes = Object.keys(answers) as (keyof typeof answers)[];
afterEach(cleanup);
describe("priority source-linked clinical answers", () => {
  it.each(routes)("keeps %s concise, source-linked and consistent in raw HTML data", (route) => {
    const entry = answers[route];
    const words = entry.answer.trim().split(/\s+/).length;
    expect(words).toBeGreaterThanOrEqual(42);
    expect(words).toBeLessThanOrEqual(50);
    render(<DirectAnswerCapsule route={route} />);
    const region = screen.getByRole("region", { name: "Quick Answer" });
    expect(region).toHaveTextContent(entry.question);
    expect(region).toHaveTextContent(entry.answer);
    expect(screen.getByText(/awaiting a separate clinical review/)).toBeInTheDocument();
    expect(within(region).queryByText(/Reviewed by|Last reviewed/)).toBeNull();
    for (const source of entry.sources) expect(screen.getByRole("link", { name: source.label })).toHaveAttribute("href", source.url);
    const data = headDataFor(route);
    expect(data.answer).toBe(entry.answer);
    expect(data.reviewedBy).toBeUndefined();
    expect(data.lastReviewed).toBeUndefined();
    const raw = buildStaticArticleInner(data);
    expect(raw).toContain(entry.answer);
    expect(raw).toContain("UK terms explained for international readers");
    expect(raw).toContain("awaiting a separate clinical review");
  });
  it("does not attach earlier clinical review fields to revised lead pages", () => {
    for (const name of ["Knee", "Hip"]) {
      const source = readFileSync(`src/pages/conditions/${name}Arthritis.tsx`, "utf8");
      expect(source).not.toMatch(/"reviewedBy"|"lastReviewed"|<MedicalReviewBadge|<LastReviewed/);
      expect(source).toContain('reviewStatus="pending"');
    }
  });
  it("renders nothing outside the five-guide batch", () => {
    const { container } = render(<DirectAnswerCapsule route="/guides/benefits-pip" />);
    expect(container).toBeEmptyDOMElement();
  });
  it("explains names without treating codeine as a combination product", () => {
    render(<DirectAnswerCapsule route="/conditions/hip-arthritis" />);
    expect(screen.getByText(/known as acetaminophen/)).toBeInTheDocument();
    expect(screen.queryByText(/combination analgesics/)).toBeNull();
  });
});
