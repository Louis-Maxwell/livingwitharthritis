#!/usr/bin/env node
/**
 * Guard crawler access and sitemap discovery directives.
 *
 * This is intentionally a static check: crawler access is configured in
 * public/robots.txt and must remain reviewable before deployment.
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const file = resolve(root, "public/robots.txt");
const requiredAgents = [
  "GPTBot",
  "PerplexityBot",
  "ClaudeBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];
const errors = [];

if (!existsSync(file)) {
  errors.push("public/robots.txt is missing");
} else {
  const robots = readFileSync(file, "utf8");
  for (const agent of requiredAgents) {
    const block = robots.match(new RegExp("User-agent: " + agent + "[\\s\\S]*?(?=\\n\\s*User-agent:|\\s*$)", "i"))?.[0] ?? "";
    if (!block) errors.push("missing User-agent: " + agent);
    else if (!/^Allow:\s*\/\s*$/im.test(block)) errors.push(agent + " does not explicitly Allow: /");
  }
  for (const sitemap of [
    "Sitemap: https://livingwitharthritis.org.uk/sitemap-index.xml",
    "Sitemap: https://livingwitharthritis.org.uk/sitemap.xml",
  ]) {
    if (!robots.includes(sitemap)) errors.push("missing " + sitemap);
  }
}

if (errors.length) {
  console.error("crawler-access: " + errors.length + " failure(s)");
  for (const error of errors) console.error("- " + error);
  process.exit(1);
}
console.log("crawler-access: required AI crawler Allow directives and sitemap declarations are present");
