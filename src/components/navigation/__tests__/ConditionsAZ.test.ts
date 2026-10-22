import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { CONDITIONS_AZ } from "../conditionsAZData";

describe("ConditionsAZ", () => {
  it("only links to /conditions routes that exist in App.tsx", () => {
    const app = readFileSync("src/App.tsx", "utf8");
    for (const c of CONDITIONS_AZ) expect(app).toContain(`path="${c.href}"`);
  });
  it("is alphabetical", () => {
    const labels = CONDITIONS_AZ.map((c) => c.label.toLowerCase());
    expect([...labels].sort()).toEqual(labels);
  });
});
