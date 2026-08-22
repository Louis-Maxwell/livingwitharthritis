import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("donate ways-to-give destinations", () => {
  const src = readFileSync(resolve("src/pages/Donate.tsx"), "utf8");

  it("sends one-off gifts and Gift Aid to the donation form, not the Zakat page", () => {
    expect(src).toMatch(/title:\s*"One-Off Donation"[\s\S]*?href:\s*"\/donate#give"/);
    expect(src).toMatch(/title:\s*"Gift Aid"[\s\S]*?href:\s*"\/donate#give"/);
    expect(src).toMatch(/title:\s*"Zakat Appeal"[\s\S]*?href:\s*"\/zakat-appeal"/);
  });
});
