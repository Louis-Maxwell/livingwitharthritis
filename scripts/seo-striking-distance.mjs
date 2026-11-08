#!/usr/bin/env node
/**
 * Read-only striking-distance report for a Google Search Console Queries export.
 *
 * It prints queries whose average position is between 4.0 and 15.0 and whose
 * impressions are at least the threshold. It does not edit pages, inject
 * answers, or write files.
 *
 * This site's recent 28-day export had no query at 250 impressions, so the
 * default threshold is 50. Raise it when a later export supports that bar.
 *
 * Usage:
 *   node scripts/seo-striking-distance.mjs path/to/gsc-queries.csv
 *   node scripts/seo-striking-distance.mjs path/to/gsc-queries.csv --min-impressions 50
 *   node scripts/seo-striking-distance.mjs path/to/gsc-queries.csv --min-impressions 250
 *
 * Expected columns (header names are matched loosely): Top queries, Clicks,
 * Impressions, CTR, Position.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const DEFAULT_MIN_IMPRESSIONS = 50;
export const MIN_POSITION = 4;
export const MAX_POSITION = 15;

/** Minimal CSV parser: commas, quotes, and escaped quotes. */
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  const src = String(text ?? "").replace(/^\uFEFF/, "");
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (c === '"') {
      if (quoted && src[i + 1] === '"') {
        cell += '"';
        i++;
      } else {
        quoted = !quoted;
      }
    } else if (!quoted && (c === "," || c === "\n")) {
      row.push(cell);
      cell = "";
      if (c === "\n") {
        rows.push(row);
        row = [];
      }
    } else if (!(c === "\r" && !quoted)) {
      cell += c;
    }
  }
  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => String(c).trim() !== ""));
}

function headerIndex(headers, names) {
  const norm = headers.map((h) => String(h).toLowerCase().replace(/[^a-z]/g, ""));
  for (const name of names) {
    const i = norm.indexOf(name);
    if (i !== -1) return i;
  }
  return -1;
}

function numberOf(value) {
  const n = Number(String(value ?? "").replace(/[%,,\s]/g, ""));
  return Number.isFinite(n) ? n : NaN;
}

/**
 * @param {string} csv
 * @param {{ minImpressions?: number, minPosition?: number, maxPosition?: number }} [opts]
 * @returns {{ query: string, clicks: number, impressions: number, ctr: string, position: number }[]}
 */
export function strikingDistanceQueries(csv, opts = {}) {
  const minImpressions = opts.minImpressions ?? DEFAULT_MIN_IMPRESSIONS;
  const minPosition = opts.minPosition ?? MIN_POSITION;
  const maxPosition = opts.maxPosition ?? MAX_POSITION;
  const rows = parseCsv(csv);
  if (!rows.length) return [];
  const headers = rows[0];
  const q = headerIndex(headers, ["topqueries", "query", "queries"]);
  const clicks = headerIndex(headers, ["clicks"]);
  const impressions = headerIndex(headers, ["impressions"]);
  const ctr = headerIndex(headers, ["ctr"]);
  const position = headerIndex(headers, ["position"]);
  if (q < 0 || impressions < 0 || position < 0) {
    throw new Error(
      "CSV must include query, Impressions and Position columns (Search Console Queries export).",
    );
  }
  const out = [];
  for (const row of rows.slice(1)) {
    const query = String(row[q] ?? "").trim();
    const impr = numberOf(row[impressions]);
    const pos = numberOf(row[position]);
    if (!query || !Number.isFinite(impr) || !Number.isFinite(pos)) continue;
    if (impr < minImpressions) continue;
    if (pos < minPosition || pos > maxPosition) continue;
    out.push({
      query,
      clicks: clicks >= 0 ? numberOf(row[clicks]) : NaN,
      impressions: impr,
      ctr: ctr >= 0 ? String(row[ctr] ?? "").trim() : "",
      position: pos,
    });
  }
  out.sort((a, b) => b.impressions - a.impressions || a.position - b.position || a.query.localeCompare(b.query));
  return out;
}

export function formatStrikingDistance(rows, minImpressions) {
  const lines = [
    `Striking distance: position ${MIN_POSITION}.0–${MAX_POSITION}.0, impressions ≥ ${minImpressions}.`,
    "Read-only. This report does not change pages.",
    rows.length
      ? `${rows.length} quer${rows.length === 1 ? "y" : "ies"}.`
      : minImpressions >= 250
        ? "No queries met this threshold. A 250-impression bar is empty on the recent 28-day export; try --min-impressions 50."
        : "No queries met this threshold.",
  ];
  for (const row of rows) {
    const clicks = Number.isFinite(row.clicks) ? row.clicks : "";
    lines.push(
      `${row.query}\t${clicks}\t${row.impressions}\t${row.ctr}\t${row.position.toFixed(2)}`,
    );
  }
  return lines.join("\n");
}

function argValue(argv, flag) {
  const i = argv.indexOf(flag);
  if (i === -1) return undefined;
  return argv[i + 1];
}

function isDirectRun() {
  const entry = process.argv[1];
  if (!entry) return false;
  try {
    return fileURLToPath(import.meta.url) === resolve(entry);
  } catch {
    return /seo-striking-distance\.mjs$/.test(entry);
  }
}

function main() {
  const file = process.argv.slice(2).find((a) => !a.startsWith("--"));
  if (!file) {
    console.error("Usage: node scripts/seo-striking-distance.mjs <gsc-queries.csv> [--min-impressions 50]");
    process.exit(1);
  }
  const raw = argValue(process.argv, "--min-impressions");
  const minImpressions = raw === undefined ? DEFAULT_MIN_IMPRESSIONS : Number(raw);
  if (!Number.isFinite(minImpressions) || minImpressions < 0) {
    console.error("--min-impressions must be a number of 0 or more.");
    process.exit(1);
  }
  const csv = readFileSync(resolve(file), "utf8");
  const rows = strikingDistanceQueries(csv, { minImpressions });
  console.log(formatStrikingDistance(rows, minImpressions));
}

if (isDirectRun()) main();
