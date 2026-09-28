import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { NEWSLETTER_FORMSUBMIT_URL } from "@/lib/backendSubmit";

const root = resolve(__dirname, "../../..");
const indexHtml = readFileSync(resolve(root, "index.html"), "utf8");
const headers = readFileSync(resolve(root, "public/_headers"), "utf8");

const metaCsp = indexHtml.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)"/)?.[1] ?? "";
const headerCsp = headers.match(/^\s*Content-Security-Policy: (.+)$/m)?.[1]?.trim() ?? "";

function directives(policy: string): Map<string, string[]> {
  return new Map(
    policy
      .split(";")
      .map((part) => part.trim().split(/\s+/))
      .filter((tokens) => tokens[0])
      .map(([name, ...values]) => [name, values]),
  );
}

function allows(policy: Map<string, string[]>, directive: string, url: string): boolean {
  const { protocol, host } = new URL(url);
  return (policy.get(directive) ?? []).some((source) => {
    if (source === `${protocol}//${host}`) return true;
    const wildcard = source.match(/^https:\/\/\*\.(.+)$/);
    return Boolean(wildcard && host.endsWith(`.${wildcard[1]}`));
  });
}

describe("Content-Security-Policy", () => {
  const meta = directives(metaCsp);

  it("is identical in index.html and public/_headers (headers add only frame-ancestors)", () => {
    expect(metaCsp).not.toBe("");
    expect(headerCsp).toBe(`${metaCsp}; frame-ancestors 'none'`);
  });

  it("allows every third party the site actually calls", () => {
    expect(allows(meta, "connect-src", NEWSLETTER_FORMSUBMIT_URL)).toBe(true);
    expect(allows(meta, "script-src", "https://www.googletagmanager.com/gtag/js?id=G-ZLLSD3PXZ9")).toBe(true);
    expect(allows(meta, "script-src", "https://app.evarist.ai/script.js")).toBe(true);
    expect(allows(meta, "connect-src", "https://region1.google-analytics.com/g/collect")).toBe(true);
    expect(allows(meta, "frame-src", "https://www.google.com/maps/embed?pb=x")).toBe(true);
  });

  it("does not allow unused vendors, eval or plugins", () => {
    expect(metaCsp).not.toMatch(/unsafe-eval|stripe|paypal|resend|lovable/i);
    expect(meta.get("object-src")).toEqual(["'none'"]);
  });
});
