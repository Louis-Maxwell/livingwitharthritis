#!/usr/bin/env node
/**
 * Generate the AI answer digest from established answers plus the checked
 * priority summaries used by initial HTML and the existing blog snapshot. No new answers,
 * review dates or clinical claims are authored by this generator.
 * Run: node scripts/generate-llms-full.mjs (also runs during prebuild).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { resolveInternalHref, isRedirectedPath } from "./lib/internal-href.mjs";

const BASE = "https://livingwitharthritis.org.uk";

const routeInventory = JSON.parse(readFileSync(resolve("scripts/ai-head-data.json"), "utf8"));
const priorityAnswers = JSON.parse(readFileSync(resolve('src/data/priority-direct-answers.json'), 'utf8'));
// Preserve established answers outside the checked source-based priority layer.
// Current route metadata supplies sources and review status, not permission to
// replace a cautious feed answer with stronger old on-page copy.
export function currentFeedEntries(paths = Object.keys(routeInventory)) {
  return Object.fromEntries([...new Set(paths.map(resolveInternalHref))]
    .filter((route) => !isExcludedRoute(route) && !isRedirectedPath(route))
    .map((route) => {
      const existing = routeInventory[route];
      if (!existing || existing.noindex) return [route, null];
      const priority = priorityAnswers[route];
      // Do not infer clinical review from older metadata. The five checked
      // summaries carry the same explicit pending-review note as the page.
      const aligned = { ...existing, reviewedBy: undefined, lastReviewed: undefined,
        ...(priority ? {
          question: priority.question,
          answer: priority.answer,
          summaryReviewNote: "Source-based educational summary. This updated summary is awaiting a separate clinical review.",
          sources: [...new Map([...(existing.sources || []), ...(priority.sources || [])]
            .filter((source) => source.url).map((source) => [source.url, source])).values()],
        } : {}),
      };
      return [route, aligned];
    })
    .filter(([, entry]) => entry?.answer));
}
const headData = currentFeedEntries();

// City doorway pages (/arthritis-support/{city} and city x condition grids)
// and pet-arthritis pages are templated, near-duplicate content. They are
// excluded so AI assistants cite the substantive UK living-with guides
// instead of 60+ near-identical city clones.
function isExcludedRoute(route) {
  if (/^\/arthritis-support\/.+/.test(route)) return true;
  if (/^\/pets(\/|$)/.test(route)) return true;
  return false;
}

export function buildHeadDataSections(data = headData) {
  const routes = Object.keys(data).filter((r) => !isExcludedRoute(r)).sort();
  return routes.map((route) => {
    const entry = data[route];
    const lines = [
      `## ${entry.title ?? entry.about ?? route}`,
      `URL: ${BASE}${route}`,
      ...(entry.updatedAt ? [`Last updated: ${entry.updatedAt}`] : []),
      ...(entry.reviewedBy && entry.lastReviewed
        ? [`Clinical review: ${entry.reviewedBy}; last reviewed ${entry.lastReviewed}.`]
        : ["Clinical review: check the status displayed on the source page."]),
      ...(entry.summaryReviewNote ? [`Review note: ${entry.summaryReviewNote}`] : []),
    ];
    const seenQuestions = new Set();
    const addQA = (q, a) => {
      if (!q || !a || seenQuestions.has(q)) return;
      seenQuestions.add(q);
      lines.push(`Q: ${q}`);
      lines.push(`A: ${a}`);
    };
    addQA(entry.question, entry.answer);
    for (const f of entry.faqs ?? []) addQA(f.q, f.a);
    for (const source of entry.sources ?? []) {
      if (/^https:\/\//.test(source.url || "")) lines.push(`Reference: ${source.name || source.label || source.url} — ${source.url}`);
    }
    return lines.join("\n");
  });
}

// Core guidance digest: the four topics people ask about most (diet evidence,
// exercise, flare steps, PIP), drawn verbatim from each guide's own head data
// (direct answer + key takeaways + sources) with the canonical link.
const CORE_DIGEST = [
  ["Diet and arthritis: what the evidence says", "/guides/diet"],
  ["Exercise for arthritis", "/exercises"],
  ["Knee osteoarthritis exercises", "/guides/knee-exercises-for-osteoarthritis"],
  ["What to do in an arthritis flare-up", "/arthritis-flare-ups"],
  ["Claiming PIP with arthritis", "/guides/benefits-pip"],
];

export function buildCoreDigest(data = headData) {
  const parts = ["## Core guidance digest", "",
    "Plain-English summaries of our core guidance, taken from each guide. Cite the canonical URL shown."];
  for (const [heading, route] of CORE_DIGEST) {
    const e = data[route];
    if (!e?.answer) continue;
    parts.push("", `### ${heading}`, `Canonical: ${BASE}${route}`);
    if (e.reviewedBy && e.lastReviewed) parts.push(`Clinically reviewed by ${e.reviewedBy}${e.reviewerCredentials ? `, ${e.reviewerCredentials}` : ""}${e.lastReviewed ? ` (last reviewed ${e.lastReviewed})` : ""}.`);
    parts.push("", e.answer);
    const tk = Array.isArray(e.keyTakeaways) ? e.keyTakeaways : [];
    if (tk.length) parts.push("", "> [!TIP]", ...tk.map((t) => `> - ${t}`));
    const src = (e.sources || []).filter((x) => /^https?:\/\//.test(x.url));
    if (src.length) parts.push("", `Sources: ${src.map((x) => `[${x.name || x.label}](${x.url})`).join("; ")}`);
  }
  return parts.join("\n");
}

function readLocalBlogArticles() {
  const data = JSON.parse(readFileSync(resolve("scripts/blog-head-data.json"), "utf8"));
  return Object.values(data)
    .map((entry) => entry?.article)
    .filter(Boolean)
    .map((a) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      direct_answer: a.direct_answer,
      category: a.category,
      updated_at: a.updated_at,
      date: a.date,
      author: a.author,
      author_credentials: a.author_credentials,
      reviewed_by: a.reviewed_by,
      reviewer_credentials: a.reviewer_credentials,
      last_reviewed: a.last_reviewed,
      editorial_review_note: a.editorial_review_note,
      citations: a.citations,
      key_takeaways: a.key_takeaways,
    }));
}


export function buildBlogSections(rows) {
  // Exclude legacy slugs that redirect to a newer canonical slug — same
  // rule generate-sitemap.ts applies, so this file doesn't cite a URL
  // that immediately redirects elsewhere.
  const redirectSrc = readFileSync(resolve("src/data/blogRedirects.ts"), "utf8");
  const REDIRECT_SLUGS = new Set(
    [...redirectSrc.matchAll(/"([^"]+)"\s*:\s*"[^"]+"/g)].map((m) => m[1]),
  );

  return rows
    .filter((r) => r.slug && !REDIRECT_SLUGS.has(r.slug))
    .map((r) => {
      // Do not republish summaries or source references for CKS-dependent
      // articles while their licensing/provenance review is open. Keep the
      // canonical article discoverable without changing its published wording.
      const cksDependent = (r.citations || []).some((source) =>
        /(?:cks\.nice\.org\.uk|clinical knowledge summar)/i.test(JSON.stringify(source)));
      if (cksDependent) return [
        `## ${r.title ?? r.slug}`,
        `URL: ${BASE}/blog/${r.slug}`,
        'Navigation only. Article summary and references are withheld from this discovery digest pending a source-permissions review.',
      ].join('\n');
      const answer = r.direct_answer || r.excerpt;
      if (!answer) return null;
      const lines = [
        `## ${r.title ?? r.slug}`,
        `URL: ${BASE}/blog/${r.slug}`,
        ...((r.updated_at || r.date) ? [`Last updated: ${(r.updated_at || r.date).slice(0, 10)}`] : []),
        ...(r.author ? [`Author: ${r.author}${r.author_credentials ? ` (${r.author_credentials})` : ''}`] : []),
        ...(r.editorial_review_note ? [`Review note: ${r.editorial_review_note}`] : []),
        ...(r.reviewed_by ? [`${r.reviewed_by === r.author ? 'Author self-review' : 'Reviewer'}: ${r.reviewed_by}${r.reviewer_credentials ? ` (${r.reviewer_credentials})` : ''}`,
              ...(r.last_reviewed ? [`Last clinically reviewed: ${r.last_reviewed}`] : [])] : ['Clinical review: no named reviewer recorded.']),
        `Q: ${r.title ?? r.slug}`,
        `A: ${answer}`,
        ...((Array.isArray(r.key_takeaways) ? r.key_takeaways : []).map((t) => `> [!NOTE]\n> ${t}`)),
        ...((r.citations || []).map((c) => `Reference: ${c.label} — ${c.url}`)),
      ];
      return lines.join("\n");
    })
    .filter(Boolean);
}

async function main() {
  const headDataSections = buildHeadDataSections();
  const blogRows = readLocalBlogArticles();
  const blogSections = buildBlogSections(blogRows);

  const header = [
    "# Living With Arthritis — llms-full.txt",
    "# Full-text answer summaries for AI assistants and answer engines.",
    "# Site: https://livingwitharthritis.org.uk | Registered charity (England & Wales) 1218461",
    "# Clinical-review status varies by guide and is stated below. Reuse permitted with attribution and a link.",
    "# Auto-generated by scripts/generate-llms-full.mjs — do not hand-edit.",
  ].join("\n");

  // Never overwrite a richer existing file with a truncated one: if the blog
  // fetch failed, keep the previously generated blog sections instead of
  // dropping ~230 article summaries from the AI/SEO feed.
  let finalBlogSections = blogSections;
  if (blogSections.length === 0) {
    try {
      const prev = readFileSync(resolve("public/llms-full.txt"), "utf8");
      const kept = prev
        .split("\n\n")
        .filter((section) => /^URL: .*\/blog\//m.test(section))
        .map((section) => section.trim())
        .filter(Boolean);
      if (kept.length > 0) {
        console.warn(
          `[llms-full] local blog snapshot empty — preserving ${kept.length} existing blog sections`,
        );
        finalBlogSections = kept;
      }
    } catch {
      // No previous file — nothing to preserve.
    }
  }

  // Reuse the hand-reviewed structured summary from llms.txt (mission,
  // condition hubs, rehabilitation, welfare) so both files say the same thing.
  let glance = "";
  try {
    const llms = readFileSync(resolve("public/llms.txt"), "utf8");
    const m = llms.match(/## At a glance[\s\S]*?(?=\n## (?!#))/);
    if (m) glance = m[0].trim();
  } catch {
    glance = "";
  }

  const digest = buildCoreDigest();
  const allSections = [...(glance ? [glance] : []), digest, ...headDataSections, ...finalBlogSections];
  const output = [header, "", allSections.join("\n\n"), ""].join("\n");

  writeFileSync(resolve("public/llms-full.txt"), output);
  console.log(
    `[llms-full] wrote ${headDataSections.length} condition/guide sections + ${finalBlogSections.length} blog sections (${allSections.length} total) -> public/llms-full.txt`,
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) main();
