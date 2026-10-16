#!/usr/bin/env node
/**
 * Release guard for security, indexability, and AI-discovery invariants.
 * Dependency-free so it can run in CI and on a clean checkout.
 */
import { readFileSync, existsSync } from "node:fs";

const SITE_ORIGIN = "https://livingwitharthritis.org.uk";
const failures = [];
const read = (path) => {
  if (!existsSync(path)) {
    failures.push("missing required file: " + path);
    return "";
  }
  return readFileSync(path, "utf8");
};
const escapeRegex = (value) => value.replace(/[.*+?^$()|[\]\\]/g, "\\$&");

const robots = read("public/robots.txt");
const sitemap = read("public/sitemap.xml");
const sitemapIndex = read("public/sitemap-index.xml");
const headers = read("public/_headers");
const security = read("public/.well-known/security.txt");
const llms = read("public/llms.txt");
const llmsFull = read("public/llms-full.txt");
const ai = read("public/ai.txt");
const wellKnownAi = read("public/.well-known/ai.txt");
const answerEngineText = read("public/answer-engine.json");

const canonicalSitemaps = [
  SITE_ORIGIN + "/sitemap-index.xml",
  SITE_ORIGIN + "/sitemap.xml",
];
const advertisedSitemaps = [...robots.matchAll(/^Sitemap:\s*(\S+)\s*$/gim)].map(
  (match) => match[1],
);
for (const expected of canonicalSitemaps) {
  if (!advertisedSitemaps.includes(expected)) {
    failures.push("robots.txt must advertise canonical sitemap: " + expected);
  }
}

const extractLocs = (xml, label) => {
  if (/<loc>\s*http:\/\//i.test(xml)) {
    failures.push(label + " contains an HTTP URL");
  }

  const locs = [...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map((match) =>
    match[1].trim(),
  );
  if (!locs.length) failures.push(label + " has no URL entries");
  if (new Set(locs).size !== locs.length) {
    failures.push(label + " contains duplicate <loc> values");
  }

  for (const loc of locs) {
    try {
      const url = new URL(loc);
      if (url.origin !== SITE_ORIGIN) {
        failures.push(label + " contains a non-canonical host: " + loc);
      }
      if (url.search || url.hash) {
        failures.push(label + " contains a query string or fragment: " + loc);
      }
    } catch {
      failures.push(label + " contains an invalid URL: " + loc);
    }
  }

  return locs;
};

const locs = extractLocs(sitemap, "sitemap.xml");
const sitemapIndexLocs = extractLocs(sitemapIndex, "sitemap-index.xml");
if (!sitemapIndexLocs.includes(SITE_ORIGIN + "/sitemap.xml")) {
  failures.push("sitemap-index.xml must reference the canonical sitemap.xml");
}

const privatePrefixes = [
  "/admin",
  "/auth",
  "/dashboard",
  "/checkout",
  "/callback",
  "/debug",
  "/donation-result",
  "/unsubscribe",
  "/newsletter/confirm",
];
for (const loc of locs) {
  try {
    const path = new URL(loc).pathname;
    if (
      privatePrefixes.some(
        (prefix) => path === prefix || path.startsWith(prefix + "/"),
      )
    ) {
      failures.push("private route exposed in sitemap: " + path);
    }
  } catch {
    // Invalid URLs are reported by extractLocs.
  }
}

const requiredHeaders = [
  "Strict-Transport-Security: max-age=63072000; includeSubDomains; preload",
  "X-Content-Type-Options: nosniff",
  "X-Frame-Options: DENY",
  "Referrer-Policy: strict-origin-when-cross-origin",
  "Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()",
  "Cross-Origin-Opener-Policy: same-origin",
  "Cross-Origin-Resource-Policy: same-origin",
  "X-Permitted-Cross-Domain-Policies: none",
];
for (const header of requiredHeaders) {
  if (!headers.includes(header)) {
    failures.push("security header missing from public/_headers: " + header);
  }
}

const csp = headers.match(/^\s*Content-Security-Policy:\s*(.+)$/mi)?.[1] || "";
const requiredCspDirectives = [
  "default-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
];
if (!csp) {
  failures.push("Content-Security-Policy missing from public/_headers");
} else {
  for (const directive of requiredCspDirectives) {
    if (!csp.includes(directive)) {
      failures.push("Content-Security-Policy missing directive: " + directive);
    }
  }
}

if (
  !/^Contact:\s*mailto:/mi.test(security) ||
  !new RegExp(
    "^Canonical:\\s*" +
      escapeRegex(SITE_ORIGIN) +
      "/\\.well-known/security\\.txt\\s*$",
    "mi",
  ).test(security)
) {
  failures.push("security.txt must have a mail contact and canonical URL");
}
const expiresValue = security.match(/^Expires:\s*(\S+)\s*$/mi)?.[1];
const expiresAt = expiresValue ? Date.parse(expiresValue) : Number.NaN;
if (!Number.isFinite(expiresAt)) {
  failures.push("security.txt must contain a valid Expires timestamp");
} else {
  const minimumValidity = 30 * 24 * 60 * 60 * 1000;
  if (expiresAt - Date.now() < minimumValidity) {
    failures.push("security.txt expires in less than 30 days");
  }
}

const publicAiPaths = [
  "/llms.txt",
  "/llms-full.txt",
  "/ai.txt",
  "/answer-engine.json",
  "/.well-known/ai.txt",
];
for (const path of publicAiPaths) {
  const pattern = new RegExp(
    "^Allow:\\s*" + escapeRegex(path) + "\\s*$",
    "mi",
  );
  if (!pattern.test(robots)) {
    failures.push("robots.txt must explicitly expose AI discovery path: " + path);
  }
}

const identityMarkers = [SITE_ORIGIN, "1218461", "PH128483"];
for (const [path, value] of [
  ["public/llms.txt", llms],
  ["public/llms-full.txt", llmsFull],
  ["public/ai.txt", ai],
  ["public/.well-known/ai.txt", wellKnownAi],
  ["public/answer-engine.json", answerEngineText],
]) {
  for (const marker of identityMarkers) {
    if (!value.includes(marker)) {
      failures.push(path + ' is missing verified identity marker: "' + marker + '"');
    }
  }
}
if (llmsFull.length < 1_000) {
  failures.push("llms-full.txt is unexpectedly short");
}
for (const discoveryUrl of [
  SITE_ORIGIN + "/llms-full.txt",
  SITE_ORIGIN + "/.well-known/ai.txt",
  SITE_ORIGIN + "/answer-engine.json",
]) {
  if (!llms.includes(discoveryUrl)) {
    failures.push("llms.txt must link to discovery resource: " + discoveryUrl);
  }
}

try {
  const answerEngine = JSON.parse(answerEngineText);
  if (answerEngine?.url !== SITE_ORIGIN + "/answer-engine.json") {
    failures.push("answer-engine.json must declare its canonical URL");
  }
  if (answerEngine?.mainEntity?.charityNumber !== "1218461") {
    failures.push("answer-engine.json must declare charity number 1218461");
  }
  if (!answerEngine?.usageGuidance?.medicalDisclaimer) {
    failures.push("answer-engine.json must include a medical disclaimer");
  }
} catch {
  failures.push("answer-engine.json must contain valid JSON");
}

if (failures.length) {
  console.error(failures.map((failure) => "FAIL: " + failure).join("\n"));
  process.exit(1);
}

console.log(
  "PASS: security, sitemap and AI-discovery guardrails checked " +
    locs.length +
    " sitemap URLs and " +
    publicAiPaths.length +
    " AI resources",
);
