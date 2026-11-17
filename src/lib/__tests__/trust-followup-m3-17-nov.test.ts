import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

/**
 * M3 trust follow-up (17 Nov 2026):
 * - /corporate-giving tiers promised perks that do not exist (gala table,
 *   advisory seat, reporting dashboard, VIP events, board briefings).
 * - /self-help myth cards rotated named "Source:" labels onto cards
 *   regardless of topic.
 * - The /press fact sheet PDF carried unsourced UK prevalence and cost figures.
 * Keep them out.
 */
const read = (p: string) => readFileSync(resolve(__dirname, "../../..", p), "utf8");

describe("M3 trust follow-up (17 Nov)", () => {
  it("corporate tiers only promise deliverable benefits", () => {
    const src = read("src/pages/CorporateGiving.tsx");
    for (const re of [/gala table/i, /advisory seat/i, /reporting dashboard/i, /VIP event/i, /board briefings/i, /ergonomic assessments/i, /National campaign partnership/i]) {
      expect(src).not.toMatch(re);
    }
    expect(src).toMatch(/agree every partnership in writing/i);
  });

  it("myth cards no longer rotate named source labels", () => {
    const src = read("src/components/VirtualPhysioSection.tsx");
    expect(src).not.toMatch(/sourceLabels/);
    expect(src).not.toMatch(/Journal of the American Board/);
    expect(src).toMatch(/Reviewed by Louis Maxwell \(HCPC PH128483\)/);
  });

  it("fact sheet PDF has no unsourced UK figures", () => {
    const src = read("src/lib/generatePdf.ts");
    const start = src.indexOf("export function generateArthritisFactSheet");
    const body = src.slice(start, src.indexOf("savePdf(", start));
    for (const re of [/10 million/i, /1 in 6/, /£20\.7 billion/, /30 million lost/, /£10 billion/, /£1 billion/, /15,000 children/, /400,000/]) {
      expect(body).not.toMatch(re);
    }
    expect(body).toMatch(/NICE NG226/);
    expect(body).toMatch(/1218461/);
    expect(body).not.toContain("Living With Arthritis UK");
  });

  it("crawler snapshot for /corporate-giving is clean", () => {
    const bodies = JSON.parse(read("scripts/data/rendered-bodies.json")) as Record<string, string>;
    const body = bodies["/corporate-giving"] ?? "";
    for (const re of [/gala table/i, /advisory seat/i, /dashboard/i, /VIP/]) expect(body).not.toMatch(re);
  });
});
