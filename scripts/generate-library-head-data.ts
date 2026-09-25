// Builds scripts/library-head-data.json from reviewed library topics
// (src/data/healthTopics.ts) plus unique SEO overlays. inject-canonicals.mjs
// bakes this into the first HTML response so /library/:slug is not a
// "Library — slug" teaser (the Soft 404 pattern GSC rejected on 12 Sep 2026).

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { healthTopics, type HealthTopicSection } from "../src/data/healthTopics";
import { getLibraryTopicSeo, type ExtraSection } from "../src/data/libraryTopicSeo";
import { exactRedirectPathSet } from "./seo-redirect-map.mjs";

const OUT = resolve("scripts/library-head-data.json");

function esc(value: string): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function sectionHtml(section: HealthTopicSection | ExtraSection): string {
  const paras = section.body
    ? section.body
        .split("\n\n")
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p) => `<p>${esc(p)}</p>`)
        .join("")
    : "";
  const bullets =
    section.bullets && section.bullets.length > 0
      ? `<ul>${section.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>`
      : "";
  return `<h2>${esc(section.heading)}</h2>${paras}${bullets}`;
}

function firstParagraph(topicBody: string, fallback: string): string {
  const para = topicBody
    .split("\n\n")
    .map((p) => p.trim())
    .find((p) => p.length > 40);
  return (para || fallback).slice(0, 320);
}

export function buildLibraryHeadData() {
  const data: Record<
    string,
    {
      title: string;
      description: string;
      question: string;
      answer: string;
      breadcrumb: string;
      about: string;
      bodyHtml: string;
      faqs?: { q: string; a: string }[];
    }
  > = {};

  const seen = new Set<string>();
  for (const topic of healthTopics) {
    if (seen.has(topic.slug)) continue;
    seen.add(topic.slug);
    const route = `/library/${topic.slug}`;
    if (exactRedirectPathSet().has(route)) continue;

    const seo = getLibraryTopicSeo(topic.slug);
    const heading = seo?.h1 ?? topic.title;
    const title = (seo?.title ?? `${topic.title} | Living With Arthritis UK`).slice(
      0,
      115,
    );
    const description = (
      seo?.description ||
      topic.subtitle ||
      `${topic.title} — plain-English information from Living With Arthritis UK.`
    ).slice(0, 158);
    const firstBody =
      topic.sections.find((s) => s.body?.trim())?.body?.trim() ?? topic.subtitle;
    const extra = seo?.extraSections ?? [];
    const bodyHtml = [...topic.sections, ...extra].map(sectionHtml).join("");

    data[route] = {
      title,
      description,
      question: heading,
      answer: firstParagraph(firstBody, description),
      breadcrumb: topic.title,
      about: topic.title,
      bodyHtml,
      ...(seo?.faqs && seo.faqs.length > 0 ? { faqs: seo.faqs } : {}),
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
    return /generate-library-head-data\.ts$/.test(entry);
  }
}

if (isDirectRun()) {
  const data = buildLibraryHeadData();
  writeFileSync(OUT, `${JSON.stringify(data, null, 2)}\n`);
  console.log(
    `[library-head-data] wrote ${Object.keys(data).length} library topics -> ${OUT}`,
  );
}
