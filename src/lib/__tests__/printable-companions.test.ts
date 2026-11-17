import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { resolveSeoRedirect } from "@/lib/seoRedirects";
import printableBytes from "../../../scripts/data/printable-companions.json";
import { headDataFor, rewriteHead } from "../../../scripts/inject-canonicals.mjs";
describe("printable personal companion toolkit", () => {
  it("resolves the printed short URL to the existing canonical hub", () => {
    expect(resolveSeoRedirect("/tracker")).toBe("/resources/symptom-flare-tracker");
    expect(readFileSync("public/_redirects", "utf8")).toContain("/tracker /resources/symptom-flare-tracker 301");
  });
  it.each(["gp-appointment-symptom-medication-tracker", "flare-up-daily-log"])("includes a real PDF and visible/static download for %s", (name) => {
    const path = `/resources/${name}.pdf`;
    expect(Buffer.from(printableBytes[name + ".pdf" as keyof typeof printableBytes], "base64").subarray(0, 4).toString()).toBe("%PDF");
    expect(readFileSync("src/pages/resources/SymptomFlareTracker.tsx", "utf8")).toContain(path);
    expect(headDataFor("/resources/symptom-flare-tracker").bodyHtml).toContain(path);
  });
  it("does not present expanded guidance or new blank sheets as freshly reviewed", () => {
    const data = headDataFor("/resources/symptom-flare-tracker");
    expect(data.reviewedBy).toBeUndefined();
    expect(data.lastReviewed).toBeUndefined();
    expect(data.bodyHtml).toContain("separate clinical review pending");
    expect(data.bodyHtml).toContain("NHS 111");
    expect(data.bodyHtml).toContain("call 999");
    const html = rewriteHead("<html><head><title>Home</title></head><body><div id=\"root\"></div></body></html>", "/resources/symptom-flare-tracker");
    expect(html).toContain("/resources/flare-up-daily-log.pdf");
    expect(html).not.toContain('"reviewedBy"');
  });
});
