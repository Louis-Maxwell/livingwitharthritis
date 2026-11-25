#!/usr/bin/env node
import { readFileSync } from "node:fs";
const json = (p) => JSON.parse(readFileSync(p, "utf8").replace(/^\uFEFF/, ""));
const metadata = json("seo-metadata.json");
const heads = json("scripts/blog-head-data.json");
const routes = ["/blog/hip-replacement-arthritis-uk","/blog/hip-replacement-recovery-week-by-week","/blog/best-supplements-arthritis-uk"];
const failures = [];
const check = (route, data) => {
  if (!data) return failures.push(route + ": missing head data");
  const title = String(data.title || ""), description = String(data.description || "");
  if (!title || title.length >= 60) failures.push(route + ": title missing or not under 60 characters");
  if (!description || description.length < 140 || description.length > 155) failures.push(route + ": description missing or outside 140–155 characters");
  if (/Living\s+With\s+Arthritis\s+UK\b/i.test(title + " " + description)) failures.push(route + ": invalid brand suffix");
  if (data.faqs && (data.faqs.length < 4 || data.faqs.length > 6)) failures.push(route + ": FAQ count outside 4–6");
};
for (const route of routes) check(route, heads[route]);
check("/guides/benefits-pip", metadata["/guides/benefits-pip"]);
if (failures.length) { console.error("[priority-seo-audit] FAIL"); failures.forEach((x) => console.error("- " + x)); process.exitCode = 1; }
else console.log("[priority-seo-audit] PASS — priority metadata and FAQ inputs are within policy");
