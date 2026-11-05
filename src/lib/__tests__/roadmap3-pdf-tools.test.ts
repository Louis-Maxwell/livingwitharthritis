import { describe, expect, it } from "vitest";
import { resolveSeoRedirect } from "@/lib/seoRedirects";
import { toolNameForPath } from "@/lib/auto-events";

describe("retired legacy PDFs and tool_use mapping", () => {
  it("sends legacy article PDFs to an HTML page", () => {
    expect(resolveSeoRedirect("/articles/003-anti-inflammatory-diet.pdf")).toBe("/blog/anti-inflammatory-diet");
    expect(resolveSeoRedirect("/articles/999-not-a-real-guide.pdf")).toBe("/blog");
    expect(resolveSeoRedirect("/downloads/arthritis-starter-guide-preview.pdf")).toBe("/arthritis-starter-guide");
  });
  it("maps interactive tool routes", () => {
    expect(toolNameForPath("/symptom-checker")).toBe("symptom_checker");
    expect(toolNameForPath("/tools/waiting-time/")).toBe("waiting_time_calculator");
    expect(toolNameForPath("/blog")).toBeNull();
  });
});
