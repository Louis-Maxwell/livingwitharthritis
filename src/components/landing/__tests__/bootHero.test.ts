import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const here = dirname(fileURLToPath(import.meta.url));
const hero = readFileSync(resolve(here, "../OAHero.tsx"), "utf8");
const html = readFileSync(resolve(here, "../../../../index.html"), "utf8");

const compact = (value: string) => value.replace(/\s+/g, " ");

// The homepage paints this paragraph from index.html before React loads.
// If the visible sentence drifts, the boot shell and the real hero disagree
// and the handoff shifts.
const LCP_SENTENCE =
  "Stiff mornings, cancelled plans, the feeling that nobody quite gets it. Find practical help with pain, exercise, benefits and everyday life — written for UK readers.";

describe("homepage boot hero", () => {
  it("keeps the LCP sentence in both the HTML shell and OAHero", () => {
    expect(compact(hero)).toContain(LCP_SENTENCE);
    expect(compact(html)).toContain(LCP_SENTENCE);
  });

  it("keeps the calm headline and accessible help actions in both shells", () => {
    for (const source of [compact(hero), compact(html)]) {
      expect(source).toContain("Practical help for life with arthritis.");
      expect(source).toContain("home-practical-hero");
      expect(source).toContain("/guides/arthritis-pain-relief");
      expect(source).toContain("Find help for my situation");
      expect(source).toContain("call 999");
    }
  });

  it("does not preload the hero photo ahead of the entry scripts", () => {
    expect(html).not.toContain("as=\"image\"");
    expect(html).not.toContain("hero-friends-");
  });
});
