import { readFileSync } from "node:fs";
const safety = JSON.parse(readFileSync(new URL("../../src/data/childArthritisSafety.json", import.meta.url), "utf8"));
const esc = value => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
export function childSafetyBodyHtml() {
  return `<section aria-label="Child joint and eye safety"><h2>A child with joint symptoms: when to get help</h2><p>${esc(safety.gp)}</p><h3>Emergency help</h3><p>${esc(safety.emergency)}</p><h3>Eye symptoms and screening</h3><p>${esc(safety.eyes)}</p><h3>Exercise must fit the child</h3><p>${esc(safety.exercise)}</p><p>${esc(safety.pending)}</p><h3>Sources checked for this update</h3><ul>${safety.sources.map(s => `<li><a href="${esc(s.url)}">${esc(s.label)}</a></li>`).join("")}</ul></section>`;
}
