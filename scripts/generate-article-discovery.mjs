#!/usr/bin/env node
/**
 * Builds src/data/articleDiscovery.generated.json: a small, static index used by
 * <ArticleDiscovery> so "Read next", "Related arthritis guides" and
 * previous/next links render synchronously (they appear in prerendered HTML,
 * unlike the lazy, viewport-gated widgets further down the page).
 *
 * Only published catalog rows are used; posts in blog-noindex.json are never
 * suggested. Deterministic: same inputs -> same output.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const catalog = JSON.parse(readFileSync(resolve(root, "src/content/blog/catalog.generated.json"), "utf8"));
const noindex = new Set(JSON.parse(readFileSync(resolve(root, "src/data/blog-noindex.json"), "utf8")));

const STOP = new Set("a an and the of for to in on with your you is are how what why when can do does uk arthritis guide guides best tips about from after vs or at by it its".split(" "));
const tokens = (s) => new Set(String(s || "").toLowerCase().replace(/[^a-z0-9\s-]/g, " ").split(/[\s-]+/).filter((w) => w.length > 2 && !STOP.has(w)));

export function buildDiscovery(rows, hidden) {
  const pool = rows.filter((r) => r.slug && r.title && !hidden.has(r.slug));
  const meta = pool.map((r) => ({
    slug: r.slug,
    category: r.category || "",
    kw: new Set(String(r.keywords || "").toLowerCase().split(",").map((k) => k.trim()).filter(Boolean)),
    tk: new Set([...tokens(r.title), ...tokens(r.keywords)]),
    order: r.display_order ?? 0,
    date: r.date ?? "",
  }));
  const byCat = new Map();
  for (const m of meta) {
    if (!byCat.has(m.category)) byCat.set(m.category, []);
    byCat.get(m.category).push(m);
  }
  for (const list of byCat.values()) list.sort((a, b) => (b.order - a.order) || b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));

  const cats = [...new Set(pool.map((r) => r.category || ""))].sort();
  const idx = new Map(pool.map((r, i) => [r.slug, i]));
  const posts = pool.map((r) => [r.slug, r.title, cats.indexOf(r.category || ""), r.reading_minutes ?? 0]);
  const links = [];
  for (const m of meta) {
    const scored = [];
    for (const o of meta) {
      if (o.slug === m.slug) continue;
      let s = o.category === m.category ? 3 : 0;
      for (const k of m.kw) if (o.kw.has(k)) s += 2;
      let inter = 0;
      for (const t of m.tk) if (o.tk.has(t)) inter++;
      const union = m.tk.size + o.tk.size - inter;
      s += union ? (inter / union) * 10 : 0;
      if (s > 0) scored.push([s, o.slug]);
    }
    scored.sort((a, b) => b[0] - a[0] || a[1].localeCompare(b[1]));
    const list = byCat.get(m.category);
    const i = list.indexOf(m);
    const prev = list.length > 1 ? list[(i - 1 + list.length) % list.length].slug : null;
    const next = list.length > 1 ? list[(i + 1) % list.length].slug : null;
    const related = scored.map((x) => x[1]).filter((s) => s !== prev && s !== next).slice(0, 5);
    links[idx.get(m.slug)] = [prev ? idx.get(prev) : -1, next ? idx.get(next) : -1, related.map((s) => idx.get(s))];
  }
  return { c: cats, s: posts, l: links };
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.filename)) {
  const out = buildDiscovery(catalog, noindex);
  writeFileSync(resolve(root, "src/data/articleDiscovery.generated.json"), JSON.stringify(out) + "\n");
  console.log(`[article-discovery] ${out.s.length} indexable posts indexed`);
}
