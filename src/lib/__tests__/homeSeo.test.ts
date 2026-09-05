import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { HOME_PAGE_TITLE } from "@/lib/homeSeo";

describe("homepage title lock", () => {
  it("keeps index.html <title> identical to HOME_PAGE_TITLE", () => {
    const html = readFileSync(resolve("index.html"), "utf8");
    const match = html.match(/<title>([^<]+)<\/title>/);
    expect(match?.[1]).toBe(HOME_PAGE_TITLE);
  });
});
