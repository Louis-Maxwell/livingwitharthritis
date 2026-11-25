import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import assets from "../../../scripts/data/printable-companions.json";
import { headDataFor } from "../../../scripts/inject-canonicals.mjs";
const expected = {
  "chair-exercise-guide.pdf": "637df4d0dbdc5543dc949ab23d22b803ed7ab8f5cb5084800132dc165dc61b38",
  "joint-friendly-eating-checklist.pdf": "bb94114c0277d810957bc4291ebbfab011410eda9a4b8fec8cc61c7c5d19904a"
} as const;
describe("illustrated printable downloads", () => {
  it.each(Object.entries(expected))("preserves the reviewed PDF bytes for %s", (name, sha) => {
    const bytes = Buffer.from(assets[name as keyof typeof assets], "base64");
    expect(bytes.subarray(0, 5).toString()).toBe("%PDF-");
    expect(createHash("sha256").update(bytes).digest("hex")).toBe(sha);
    const href = `/resources/${name}`;
    expect(readFileSync("src/pages/ResourceCentre.tsx", "utf8")).toContain(href);
    expect(headDataFor("/resource-centre").bodyHtml).toContain(href);
  });
});
