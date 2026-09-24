#!/usr/bin/env node
/**
 * Systematic title / meta_description pass over the checked-in blog catalog.
 *
 * Rules (aligned with Louis brief):
 * - title/meta_title describe the article topic (not vanity charity-only titles)
 * - strip trailing "| LWA" / "| Living With Arthritis" when the topic stands alone
 * - untruncate clearly clipped meta_title vs full title
 * - meta_description 140–160 where possible, complete words, no clickbait, educational
 * - leave accurate ranking titles alone
 *
 * Sources: blogArticles.json, blogList.json, frailty-batch.json, phase2-batch.json
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const FILES = [
  "src/data/blogArticles.json",
  "src/data/blogList.json",
  "src/content/blog/frailty-batch.json",
  "src/content/blog/phase2-batch.json",
];

const CHARITY_ONLY =
  /^(Living With Arthritis(\s+UK)?(\s*[|\-–—:]\s*(Charity(\s*\d+)?)?)?)$/i;
const BOILER =
  /\s*(Evidence-based UK guide from Living With Arthritis\.?|Trusted UK guidance from Living With Arthritis\.?)\s*$/i;
const DANGLING =
  /\b(and|the|for|with|to|of|a|an|in|on|from|or|as|by|at|your|our|is|are|be|than|that|this|when|who|what|how|not|solely|takes)$/i;
const AWKWARD_END =
  /\b(inflammatory|functional|emotional|practical|plain-En|plain-en|clinical|personal|daily|support|markers|living|mobility|severity)\.?$/i;

/** High-traffic / gold-pass metas — topic-accurate, 140–160, no churn on good titles. */
const GOLD_MD = {
  "mediterranean-diet-arthritis-14-day-plan":
    "A practical 14-day Mediterranean meal plan for arthritis using affordable UK supermarket ingredients — designed to support joints without miracle-cure claims.",
  "pip-for-arthritis-uk":
    "UK guide to Personal Independence Payment (PIP) when arthritis affects daily living or mobility: descriptors, evidence, applying and what to do if refused.",
  "expert-qa-should-i-apply-for-pip-if-my-arthritis-is-mild":
    "Should you apply for PIP if arthritis feels “mild”? Eligibility is about daily-living and mobility impact, not diagnosis severity — plain-English UK guidance.",
  "best-supplement-for-knee-joint":
    "Honest UK guide to knee joint supplements: modest evidence for a shortlist of options, quality pitfalls, and why exercise and NHS care still come first.",
  "physiotherapy-arthritis":
    "Physiotherapy for arthritis explained: NHS self-referral, what happens at assessment, hydrotherapy, home exercises and when private physio may help.",
  "arthritis-pain-management":
    "Manage arthritis pain with a whole-person UK approach: movement, heat and cold, medication, mindfulness, sleep, complementary therapies and emotional support.",
  "rheumatoid-arthritis-diet-uk":
    "Evidence-based RA diet guidance for the UK: anti-inflammatory foods, Mediterranean-style meals, foods to limit, and how nutrition sits beside DMARD care.",
  "best-walking-shoes-arthritis-uk":
    "Choose walking shoes for arthritis in the UK: cushioning, wide toe box, easy fastenings and NHS podiatry tips for painful feet, knees and hips.",
  "swimming-exercises-hip-osteoarthritis":
    "Warm-water swimming and pool drills for hip osteoarthritis in the UK: kinder strokes, pacing tips, and how pool work fits NHS exercise advice.",
  "free-arthritis-exercise-classes-england":
    "How to find free arthritis exercise classes across England — NHS programmes, charity schemes, social prescribing and online options for joint-friendly movement.",
};

const GOLD_TITLE = {
  "pip-for-arthritis-uk": {
    title: "PIP for Arthritis UK: Eligibility, Applying and Appeals",
    meta_title: "PIP for Arthritis UK: Eligibility, Forms & Appeals",
  },
};

function stripHtml(s) {
  return String(s || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function clipAtWord(text, hi) {
  const t = String(text || "").replace(/\s+/g, " ").trim();
  if (t.length <= hi) return t;
  const cut = t.slice(0, hi);
  const i = cut.lastIndexOf(" ");
  return (i > 40 ? cut.slice(0, i) : cut).replace(/[\s,;:\-–—]+$/g, "");
}

function lastToken(text) {
  const t = String(text || "")
    .trim()
    .replace(/[.!?…]+$/g, "");
  const parts = t.split(/\s+/);
  return (parts[parts.length - 1] || "").toLowerCase();
}

function looksIncompleteToken(token) {
  const t = String(token || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
  if (!t) return false;
  const ok = new Set([
    "uk", "nhs", "pip", "oa", "ra", "gp", "ice", "heat", "pain", "diet", "home",
    "plan", "care", "tips", "safe", "help", "do", "use", "fit", "hip", "knee",
    "hand", "foot", "neck", "back", "rest", "walk", "swim", "yoga", "food",
    "fish", "oil", "joint", "joints", "guide", "first", "start", "flares",
    "flare", "adults", "older", "daily", "sleep", "work", "best", "body",
    "hips", "cold", "mild", "self", "step", "move", "easy", "hard", "risk",
    "drug", "dose", "meal", "week", "year", "cost", "form", "list", "note",
    "next", "open", "read", "link", "page", "post", "team",
  ]);
  if (ok.has(t)) return false;
  if (
    t.endsWith("tion") ||
    t.endsWith("sion") ||
    t.endsWith("ment") ||
    t.endsWith("ness") ||
    t.endsWith("able") ||
    t.endsWith("ible") ||
    t.endsWith("ing") ||
    t.endsWith("ed") ||
    t.endsWith("ly") ||
    t.endsWith("ous") ||
    t.endsWith("ive") ||
    t.endsWith("ical")
  ) {
    return false;
  }
  if (t.length >= 2 && t.length <= 5) {
    const complete = new Set([
      ...ok,
      "the", "and", "for", "with", "from", "your", "this", "that", "when",
      "what", "how", "who", "are", "was", "has", "have", "been", "more",
      "most", "some", "into", "over", "after", "about", "other", "also",
      "only", "just", "than", "then", "them", "they", "their", "there",
      "these", "those", "which", "while", "where", "would", "could",
      "should", "might", "must", "need", "needs", "using", "based",
      "adult", "shoes", "class", "pool", "safe",
    ]);
    return !complete.has(t);
  }
  return false;
}

function isBadMd(md) {
  const s = String(md || "").trim();
  if (!s || CHARITY_ONLY.test(s)) return true;
  if (s.length < 120 || s.length > 165) return true;
  if (s.endsWith("...") || s.endsWith("…")) return true;
  const core = s.replace(/[.!?]+$/g, "");
  if (DANGLING.test(core) || AWKWARD_END.test(core)) return true;
  if (looksIncompleteToken(lastToken(s))) return true;
  return false;
}

function makeMetaDesc(text, lo = 140, hi = 158) {
  let t = String(text || "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(BOILER, "")
    .replace(/\.\.\./g, " ")
    .replace(/…/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!t) return "";
  if (t.length > hi) {
    const window = t.slice(0, hi + 1);
    let best = -1;
    for (const sep of [". ", "? ", "! "]) {
      const idx = window.lastIndexOf(sep);
      if (idx >= lo - 1) best = Math.max(best, idx);
    }
    if (best >= 0) {
      const out = window.slice(0, best + 1).trim();
      return isBadMd(out) ? "" : out;
    }
    t = clipAtWord(t, hi);
  }
  for (let i = 0; i < 5; i++) {
    const core = t.replace(/[.!?]+$/g, "");
    if (DANGLING.test(core) || AWKWARD_END.test(core) || looksIncompleteToken(lastToken(core))) {
      if (!core.includes(" ")) return "";
      t = core.slice(0, core.lastIndexOf(" ")).replace(/[\s,;:\-–—]+$/g, "");
      continue;
    }
    break;
  }
  if (t.length < lo) return "";
  if (!/[.!?]$/.test(t)) t += ".";
  return isBadMd(t) ? "" : t;
}

function firstSentences(content, n = 3) {
  const parts = stripHtml(content).split(/(?<=[.!?])\s+/);
  return parts.slice(0, n).join(" ").trim();
}

function improveTitle(row) {
  let title = String(row.title || "").trim();
  let meta = String(row.meta_title || "").trim();
  const reasons = [];
  const primary = meta || title;
  if (!primary || CHARITY_ONLY.test(primary)) {
    let words = String(row.slug || "").replace(/-/g, " ");
    words = words.replace(/\buk\b/gi, "UK");
    const built = words
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .replace(/\bPip\b/g, "PIP")
      .replace(/\bNhs\b/g, "NHS");
    return { title: built, meta_title: built, reasons: ["rebuild-charity"] };
  }
  if (meta && title.startsWith(meta) && title.length > meta.length + 5) {
    if (
      DANGLING.test(meta) ||
      /(With|For|And|About|After|vs|Versus)$/.test(meta) ||
      (meta.length >= 45 && !/[.?!):]$/.test(meta))
    ) {
      meta = title.length <= 65 ? title : clipAtWord(title, 65);
      reasons.push("untrunc-meta");
    }
  }
  if (
    title &&
    meta &&
    meta.startsWith(title) &&
    meta.length > title.length + 5 &&
    meta.length <= 90
  ) {
    if (
      DANGLING.test(title) ||
      /(With|For|And|About|After)$/.test(title) ||
      (title.length >= 45 && !/[.?!):]$/.test(title))
    ) {
      title = meta;
      reasons.push("untrunc-title");
    }
  }
  const brandSuffix = /^(.+?)\s*[|\-–—]\s*(LWA|Living With Arthritis( UK)?)\s*$/i;
  for (const key of ["meta", "title"]) {
    const val = key === "meta" ? meta : title;
    const m = val.match(brandSuffix);
    if (m && m[1].trim().length >= 25) {
      if (key === "meta") meta = m[1].trim();
      else title = m[1].trim();
      reasons.push("strip-brand-suffix");
    }
  }
  if (!meta && title) {
    meta = title.length <= 65 ? title : clipAtWord(title, 65);
    reasons.push("fill-meta-title");
  }
  if (!reasons.length) return null;
  return { title, meta_title: meta, reasons };
}

function rebuildMd(row) {
  if (GOLD_MD[row.slug]) return GOLD_MD[row.slug];
  const da = String(row.direct_answer || "").trim();
  const excerpt = String(row.excerpt || "")
    .replace(BOILER, "")
    .trim();
  const first = firstSentences(row.content || "", 3);
  for (const c of [excerpt, da, first]) {
    if (!c || c.length < 100) continue;
    const cleaned = makeMetaDesc(c.length > 400 ? firstSentences(c, 3) : c);
    if (cleaned) return cleaned;
  }
  const title = String(row.meta_title || row.title || "").trim();
  return (
    makeMetaDesc(
      `${title}. Practical educational UK guidance for people living with arthritis. Information only — not a personal diagnosis or treatment plan.`,
    ) || `${title}. Practical educational UK guidance for people living with arthritis.`
  );
}

function padShort(md, title) {
  let s = String(md || "").trim();
  if (s.length >= 140) return s;
  for (const closer of [
    " Educational UK guide — not a personal diagnosis.",
    " Plain-English UK guide (not a diagnosis).",
    " UK educational guide.",
  ]) {
    const cand = (s.endsWith(".") ? s : `${s}.`) + closer;
    const n = cand.replace(/\s+/g, " ").trim().replace(/\.\./g, ".");
    if (n.length >= 140 && n.length <= 160) return n;
  }
  let cand = `${title}. Practical educational UK guidance for people living with arthritis — information only, not a diagnosis.`;
  cand = cand.replace(/\s+/g, " ").trim();
  if (cand.length > 158) cand = `${clipAtWord(cand, 157)}.`;
  return cand;
}

const stats = {};
const bump = (k) => {
  stats[k] = (stats[k] || 0) + 1;
};

const catalogs = FILES.map((rel) => ({
  rel,
  rows: JSON.parse(readFileSync(resolve(rel), "utf8")),
}));

let titleChanges = 0;
let mdChanges = 0;
const changedSlugs = new Set();

for (const cat of catalogs) {
  for (const row of cat.rows) {
    if (!row?.slug) continue;
    let changed = false;

    const goldTitle = GOLD_TITLE[row.slug];
    if (goldTitle) {
      if (row.title !== goldTitle.title || row.meta_title !== goldTitle.meta_title) {
        row.title = goldTitle.title;
        row.meta_title = goldTitle.meta_title;
        titleChanges += 1;
        bump("gold-title");
        changed = true;
      }
    } else {
      const tr = improveTitle(row);
      if (tr) {
        if (tr.title !== row.title || tr.meta_title !== row.meta_title) {
          row.title = tr.title;
          row.meta_title = tr.meta_title;
          titleChanges += 1;
          tr.reasons.forEach(bump);
          changed = true;
        }
      }
    }

    const before = String(row.meta_description || "").trim();
    let next = before;
    if (GOLD_MD[row.slug]) {
      next = GOLD_MD[row.slug];
    } else if (isBadMd(before)) {
      next = rebuildMd(row);
      bump("rewrite-md");
    } else if (/^[A-Za-z0-9]/.test(before.slice(-1)) && before.length >= 140 && before.length <= 160 && !looksIncompleteToken(lastToken(before))) {
      next = `${before}.`;
      bump("punctuate-md");
    }
    next = padShort(next, row.meta_title || row.title || "");
    if (next && next !== before) {
      row.meta_description = next;
      mdChanges += 1;
      changed = true;
      const ex = String(row.excerpt || "").trim();
      if (isBadMd(ex) || ex.endsWith("...") || ex.endsWith("…")) {
        const da = String(row.direct_answer || "").trim();
        row.excerpt = makeMetaDesc(da || next, 140, 200) || next;
        bump("rewrite-excerpt");
      }
    }
    if (changed) changedSlugs.add(row.slug);
  }
}

// Keep blogList aligned with blogArticles for shared slugs
const articles = catalogs.find((c) => c.rel.endsWith("blogArticles.json")).rows;
const list = catalogs.find((c) => c.rel.endsWith("blogList.json")).rows;
const bySlug = new Map(articles.map((r) => [r.slug, r]));
for (const row of list) {
  const a = bySlug.get(row.slug);
  if (!a) continue;
  for (const f of ["title", "meta_title", "meta_description", "excerpt"]) {
    if (a[f] !== row[f]) {
      row[f] = a[f];
      bump("sync-list");
    }
  }
}

for (const cat of catalogs) {
  writeFileSync(resolve(cat.rel), `${JSON.stringify(cat.rows, null, 2)}\n`);
}

console.log(JSON.stringify({ stats, titleChanges, mdChanges, uniqueSlugs: changedSlugs.size }, null, 2));
