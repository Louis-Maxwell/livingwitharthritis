// Builds scripts/hub-guide-head-data.json from src/data/hubGuides so the
// editorial hub guides (treatments/*, guides/work-with-arthritis,
// guides/travel-with-arthritis) ship their full body, FAQs and titles in
// the first HTML response. inject-canonicals.mjs merges this per route.

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { HUB_GUIDES, HUB_GUIDE_REVIEWER, type HubGuide } from "../src/data/hubGuides";

const OUT = resolve("scripts/hub-guide-head-data.json");

function esc(value: string): string {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function attr(value: string): string {
  return esc(value).replace(/"/g, "&quot;");
}

export function hubGuideBodyHtml(guide: HubGuide): string {
  const review =
    `<p class="reviewed-by">Written by ${esc(HUB_GUIDE_REVIEWER.name)}, ${esc(HUB_GUIDE_REVIEWER.credentials)}. ` +
    `Updated ${esc(guide.updated)}.` +
    (guide.reviewStatus === "pending-clinical-review" ? " Pending clinical review." : "") +
    `</p>`;
  const sections = guide.sections
    .map((s) => {
      const paras = s.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("");
      const bullets = s.bullets?.length ? `<ul>${s.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : "";
      const links = s.links?.length
        ? `<p>Read more: ${s.links.map((l) => `<a href="${attr(l.href)}">${esc(l.label)}</a>`).join(" · ")}</p>`
        : "";
      return `<h2>${esc(s.heading)}</h2>${paras}${bullets}${links}`;
    })
    .join("");
  const related = guide.related.length
    ? `<h2>Related guides</h2><ul>${guide.related
        .map((l) => `<li><a href="${attr(l.href)}">${esc(l.label)}</a></li>`)
        .join("")}</ul>`
    : "";
  return review + sections + related;
}

export function buildHubGuideHeadData() {
  const data: Record<string, Record<string, unknown>> = {};
  for (const guide of HUB_GUIDES) {
    data[`/${guide.slug}`] = {
      title: `${guide.metaTitle} | Living With Arthritis`,
      description: guide.description,
      question: guide.title,
      answer: guide.answer,
      breadcrumb: guide.breadcrumbs[guide.breadcrumbs.length - 1]?.label ?? guide.title,
      about: guide.title,
      updatedAt: guide.updated,
      bodyHtml: hubGuideBodyHtml(guide),
      faqs: guide.faqs.map((f) => ({ q: f.q, a: f.a })),
    };
  }
  return data;
}

function isDirectRun() {
  const entry = process.argv[1];
  if (!entry) return false;
  try {
    return fileURLToPath(import.meta.url) === resolve(entry);
  } catch {
    return /generate-hub-guide-head-data\.ts$/.test(entry);
  }
}

if (isDirectRun()) {
  const data = buildHubGuideHeadData();
  writeFileSync(OUT, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`[hub-guide-head-data] wrote ${Object.keys(data).length} hub guides -> ${OUT}`);
}
