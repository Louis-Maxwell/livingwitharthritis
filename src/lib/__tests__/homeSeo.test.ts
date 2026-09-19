import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { HOME_PAGE_DESCRIPTION, HOME_PAGE_TITLE } from "@/lib/homeSeo";
import { GENERIC_HOME_TITLE } from "@/lib/prerenderReady";

describe("homepage SEO constants", () => {
  it("matches the static title and description in index.html", () => {
    const html = readFileSync(resolve(process.cwd(), "index.html"), "utf8");
    expect(html).toContain(`<title>${HOME_PAGE_TITLE}</title>`);
    expect(html).toContain(`content="${HOME_PAGE_DESCRIPTION}"`);
    expect(GENERIC_HOME_TITLE).toBe(HOME_PAGE_TITLE);
  });
});
