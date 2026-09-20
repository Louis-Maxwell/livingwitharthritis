import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { HOME_PAGE_TITLE } from "@/lib/homeSeo";

describe("homepage title lock", () => {
  it("keeps Helmet title identical to index.html", () => {
    const html = readFileSync(resolve(process.cwd(), "index.html"), "utf8");
    const match = html.match(/<title>([^<]+)<\/title>/);
    expect(match?.[1]).toBe(HOME_PAGE_TITLE);

    const indexPage = readFileSync(resolve(process.cwd(), "src/pages/Index.tsx"), "utf8");
    expect(indexPage).toContain("HOME_PAGE_TITLE");
    expect(indexPage).not.toMatch(/You're Not Alone With Joint Pain/);
  });
});
