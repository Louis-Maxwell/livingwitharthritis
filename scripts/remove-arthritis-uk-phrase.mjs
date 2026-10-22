/**
 * Final public-output guard for the retired “Arthritis (UK)” wording.
 *
 * Source content may retain UK context where it is clinically or legally
 * relevant, but this exact presentation is not part of the public brand or
 * article-title system. Run after all post-build HTML and search assets have
 * been generated so every published surface uses the same wording.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_ROOT = join(process.cwd(), "dist");
const RETIRED_PHRASE = /arthritis\s*\(uk\)/gi;
const TEXT_EXTENSIONS = new Set([".html", ".json", ".txt", ".xml", ".js", ".css"]);

function walk(directory) {
  for (const entry of readdirSync(directory)) {
    const target = join(directory, entry);
    const stat = statSync(target);
    if (stat.isDirectory()) {
      walk(target);
      continue;
    }

    const extension = entry.slice(entry.lastIndexOf(".")).toLowerCase();
    if (!TEXT_EXTENSIONS.has(extension)) continue;
    const current = readFileSync(target, "utf8");
    const next = current.replace(RETIRED_PHRASE, "Arthritis");
    if (next !== current) writeFileSync(target, next);
  }
}

walk(OUTPUT_ROOT);
console.log("[public-wording] removed retired “Arthritis (UK)” wording from build output");
