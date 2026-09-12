#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";

const path = "public/_headers";
if (!existsSync(path)) {
  console.error("✗ public/_headers missing");
  process.exit(1);
}
const text = readFileSync(path, "utf8");
const required = [
  "Strict-Transport-Security:",
  "X-Content-Type-Options: nosniff",
  "X-Frame-Options: DENY",
  "Referrer-Policy: strict-origin-when-cross-origin",
  "Content-Security-Policy:",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action",
];
const missing = required.filter((rule) => !text.includes(rule));
const forbidden = [];
if (/script-src[^\n]*\*\s/.test(text)) forbidden.push("wildcard script-src source");
if (/script-src[^\n]*'unsafe-eval'/.test(text)) forbidden.push("unsafe-eval in script-src");

if (missing.length || forbidden.length) {
  console.error("✗ security header audit failed");
  missing.forEach((item) => console.error(`  missing: ${item}`));
  forbidden.forEach((item) => console.error(`  forbidden: ${item}`));
  process.exit(1);
}
console.log("✓ security headers — HSTS, clickjacking, MIME, referrer, CSP and form restrictions present");
