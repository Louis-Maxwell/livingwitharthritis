import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { TRUSTED_SERVICES } from "../TrustedLocalServices";

const src = readFileSync(join(process.cwd(), "src/pages/TrustedLocalServices.tsx"), "utf8");

describe("Trusted local services page", () => {
  it("lists Tragus with an honest outbound link", () => {
    const t = TRUSTED_SERVICES.find((s) => s.url === "https://tragusuk.com/");
    expect(t?.cta).toBe("Visit Tragus");
    expect(t?.location).toMatch(/Dartford/);
    expect(src).toMatch(/target="_blank"/);
    expect(src).toMatch(/rel="noopener (nofollow|sponsored)"/);
  });
  it("carries the third-party disclaimer and correct charity name", () => {
    expect(src).toContain("Living With Arthritis is not responsible for third-party services");
    expect(src).not.toMatch(/Living With Arthritis UK|for Arthritis UK/);
  });
  it("is routed, in the footer and in the sitemap", () => {
    const r = (p: string) => readFileSync(join(process.cwd(), p), "utf8");
    expect(r("src/App.tsx")).toContain('path="/trusted-local-services"');
    expect(r("src/components/Footer.tsx")).toContain('href: "/trusted-local-services"');
    expect(r("scripts/generate-sitemap.ts")).toContain('push("/trusted-local-services")');
  });
});
