import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

/**
 * Guard: the site must never show invented donors, donation tickers or
 * hard-coded fundraising totals (a static "£X raised" goes stale the moment
 * someone donates). The live total belongs on the GoFundMe page.
 */
const SRC = resolve("src");

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (name === "__tests__" || name === "node_modules") continue;
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(tsx?|mjs)$/.test(name)) out.push(full);
  }
  return out;
}

const FORBIDDEN: Array<[RegExp, string]> = [
  [/fakeDonors?|prepareFakeDonations/i, "fabricated donor list"],
  [/donor_name\s*:\s*["'][A-Z]/, "hard-coded donor name"],
  [/\b(RAISED|RAISED_GBP)\s*=\s*\d/, "hard-coded raised total"],
  [/just donated|recently donated/i, "donation ticker copy"],
];

describe("no fake donor data", () => {
  const files = walk(SRC);

  it.each(FORBIDDEN)("src contains no %s pattern (%s)", (pattern) => {
    const offenders = files.filter((f) => pattern.test(readFileSync(f, "utf8")));
    expect(offenders).toEqual([]);
  });
});
