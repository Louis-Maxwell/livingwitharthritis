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

  it("permits only external executable scripts while leaving JSON-LD as data", () => {
    for (const policy of [meta, directives(headerCsp)]) {
      const sources = policy.get("script-src") ?? [];
      expect(sources).toContain("'self'");
      expect(sources).not.toContain("'unsafe-inline'");
      expect(sources).not.toContain("'unsafe-eval'");
    }
    expect(headers).toMatch(/^\s*X-Frame-Options: DENY$/m);
    const scripts = [...indexHtml.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
    const inlineData = scripts.filter(([, attrs, body]) => body.trim() && /type=["']application\/ld\+json["']/i.test(attrs));
    expect(inlineData.length).toBeGreaterThanOrEqual(2);
    for (const [, attrs, body] of scripts) {
      if (body.trim()) {
        expect(attrs).toMatch(/type=["']application\/ld\+json["']/i);
        expect(() => JSON.parse(body)).not.toThrow();
      } else if (attrs.includes("src=")) {
        expect(attrs).toMatch(/src=["']\/(?:security\/|src\/)/i);
      }
    }
    const classicSources = scripts.filter(([, attrs]) => /src=["']\/security\//.test(attrs));
    expect(classicSources).toHaveLength(4);
    for (const [, attrs] of classicSources) {
      const path = attrs.match(/src=["'](\/security\/[^"']+)/)?.[1];
      expect(path).toBeTruthy();
      expect(readFileSync(resolve(root, "public" + path), "utf8").length).toBeGreaterThan(0);
    }
    expect(indexHtml.indexOf('src="/security/analytics-consent.js"')).toBeLessThan(indexHtml.indexOf('src="/src/main.tsx"'));
    const prerender = readFileSync(resolve(root, "scripts/prerender-routes.mjs"), "utf8");
    const inject = readFileSync(resolve(root, "scripts/inject-canonicals.mjs"), "utf8");
    expect(prerender).not.toContain('unsafe-inline');
    expect(inject).toContain('type="application/ld+json"');
    expect(inject).not.toMatch(/<script\\s*>/i);
    expect(indexHtml).toContain('id="root-organization-jsonld" type="application/ld+json"');
  });

  it("does not allow unused vendors, eval or plugins", () => {
    expect(metaCsp).not.toMatch(/unsafe-eval|stripe|paypal|resend|lovable/i);
    expect(meta.get("object-src")).toEqual(["'none'"]);
  });
});
