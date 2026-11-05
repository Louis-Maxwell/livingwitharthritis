#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
const root = process.cwd();
const ignored = new Set(["node_modules", ".git", "dist", "coverage", "test-results"]);
const extensions = new Set([".js", ".jsx", ".ts", ".tsx", ".md", ".mdx", ".html", ".json", ".txt"]);
function filesIn(dir) {
  const result = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...filesIn(full));
    else if (extensions.has(path.extname(entry.name))) result.push(full);
  }
  return result;
}
const files = filesIn(root);
const urls = new Map();
const urlPattern = /(?:https?:\/\/|www\.)[^\s"'<>\\]\[\]}]+/gi;
for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  for (const raw of source.match(urlPattern) ?? []) {
    const url = raw.replace(/[.,;:!?]+$/, "");
    const line = source.slice(0, source.indexOf(raw)).split("\n").length;
    const list = urls.get(url) ?? [];
    list.push(path.relative(root, file) + ":" + line);
    urls.set(url, list);
  }
}
const errors = [];
for (const [raw, locations] of urls) {
  const candidate = raw.startsWith("www.") ? "https://" + raw : raw;
  let parsed;
  try { parsed = new URL(candidate); } catch {
    errors.push(raw + " — invalid URL (" + locations.join(", ") + ")");
    continue;
  }
  if (!["http:", "https:"].includes(parsed.protocol)) {
    errors.push(raw + " — unsupported protocol (" + locations.join(", ") + ")");
    continue;
  }
  if (parsed.username || parsed.password) errors.push(raw + " — credentials in URL (" + locations.join(", ") + ")");
  if (parsed.hostname === "threads.com" || (parsed.hostname === "threads.net" && parsed.pathname === "/")) errors.push(raw + " — use a specific Threads profile/post URL (" + locations.join(", ") + ")");
  if (parsed.hostname === "wa.me" && parsed.pathname === "/") errors.push(raw + " — WhatsApp URL is missing a destination (" + locations.join(", ") + ")");
}
console.log("Scanned " + files.length + " source files and " + urls.size + " unique absolute URLs.");
if (errors.length) {
  console.error("\nExternal-link guard failures:");
  for (const error of errors) console.error("- " + error);
  process.exitCode = 1;
}
if (process.env.CHECK_EXTERNAL_LINKS === "1") {
  const candidates = [...urls.keys()].filter((url) => /^https?:\/\//i.test(url)).slice(0, 100);
  let networkFailures = 0;
  for (const url of candidates) {
    try {
      const response = await fetch(url, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(8000) });
      if (response.status >= 400) {
        console.error("Network check: " + response.status + " " + url);
        networkFailures++;
      }
    } catch (error) {
      console.error("Network check failed: " + url + " — " + error.message);
      networkFailures++;
    }
  }
  if (networkFailures) process.exitCode = 1;
}
