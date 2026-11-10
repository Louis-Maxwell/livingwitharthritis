import { afterEach, describe, expect, it } from "vitest";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { auditPrioritySocialMeta, PRIORITY_SOCIAL_ROUTES } from "../check-social-meta.mjs";

const temporaryDirectories = [];
afterEach(() => {
  for (const dir of temporaryDirectories.splice(0)) rmSync(dir, { recursive: true, force: true });
});

function fixture(route, index) {
  const title = "Priority guide " + index + " | Living With Arthritis";
  const description = ("Social preview validation for route " + route + ". ").padEnd(145, "a");
  const image = "https://livingwitharthritis.org.uk/og/landing-share.png";
  const meta = (kind, name, value) => '<meta ' + kind + '="' + name + '" content="' + value + '">';
  return [
    "<html><head>",
    meta("property", "og:site_name", "Living With Arthritis"),
    meta("property", "og:type", route === "/faq" ? "website" : "article"),
    meta("property", "og:title", title),
    meta("name", "twitter:title", title),
    meta("property", "og:description", description),
    meta("name", "twitter:description", description),
    meta("property", "og:image", image),
    meta("name", "twitter:image", image),
    meta("name", "twitter:card", "summary_large_image"),
    "</head><body></body></html>",
  ].join("\n");
}

function buildFixtures() {
  const dist = mkdtempSync(join(tmpdir(), "lwa-social-meta-"));
  temporaryDirectories.push(dist);
  for (const [index, route] of PRIORITY_SOCIAL_ROUTES.entries()) {
    const file = join(dist, route.slice(1), "index.html");
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, fixture(route, index), "utf8");
  }
  return dist;
}

describe("priority prerender social metadata", () => {
  it("covers exactly the seven agreed canonical URLs", () => {
    expect(PRIORITY_SOCIAL_ROUTES).toEqual([
      "/blog/medication-supplement-interactions-arthritis",
      "/blog/pip-for-arthritis-uk",
      "/blog/best-plantar-fasciitis-shoes-women-uk",
      "/faq/is-arthritis-a-disability",
      "/faq",
      "/guides/benefits-pip",
      "/guides/dmards-vs-biologics",
    ]);
  });

  it("accepts valid, route-specific HTML for all seven URLs", () => {
    expect(auditPrioritySocialMeta(buildFixtures())).toEqual([]);
  });

  it("fails when any priority route is not prerendered", () => {
    const dist = buildFixtures();
    rmSync(join(dist, "guides/dmards-vs-biologics/index.html"));
    expect(auditPrioritySocialMeta(dist)).toContain(
      "/guides/dmards-vs-biologics: missing prerendered index.html",
    );
  });

  it("catches missing tags, duplicates and fallback card types", () => {
    const dist = buildFixtures();
    const route = "/guides/dmards-vs-biologics";
    const file = join(dist, route.slice(1), "index.html");
    const html = readFileSync(file, "utf8")
      .replace('<meta name="twitter:card" content="summary_large_image">', "")
      .replace("<head>", '<head><meta property="og:title" content="Duplicate">');
    writeFileSync(file, html);
    const failures = auditPrioritySocialMeta(dist);
    expect(failures.some((f) => f.includes("expected exactly one twitter:card, found 0"))).toBe(true);
    expect(failures.some((f) => f.includes("expected exactly one og:title, found 2"))).toBe(true);
  });

  it("rejects invalid HTTPS images, overlong text and incorrect page types", () => {
    const dist = buildFixtures();
    const route = "/faq";
    const file = join(dist, route.slice(1), "index.html");
    const html = readFileSync(file, "utf8")
      .replace('content="website"', 'content="article"')
      .replace('content="summary_large_image"', 'content="summary"')
      .replaceAll("https://livingwitharthritis.org.uk/og/landing-share.png", "http://example.com/share.png")
      .replace('content="Priority guide 4 | Living With Arthritis"', 'content="' + "x".repeat(61) + '"');
    writeFileSync(file, html);
    const failures = auditPrioritySocialMeta(dist);
    expect(failures.some((f) => f.includes("expected og:type website"))).toBe(true);
    expect(failures.some((f) => f.includes("incorrect twitter:card"))).toBe(true);
    expect(failures.some((f) => f.includes("must be an absolute HTTPS URL"))).toBe(true);
    expect(failures.some((f) => f.includes("og:title must be under 60 characters"))).toBe(true);
  });
});
