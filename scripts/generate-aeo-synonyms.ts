// Export PAGE_AEO cross-market synonym blocks to JSON for the static prerender
// pipeline (inject-canonicals.mjs runs under plain node and cannot import .ts).
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { PAGE_AEO } from "../src/data/page-aeo";

const out: Record<string, { term: string; variants: string }[]> = {};
for (const [route, page] of Object.entries(PAGE_AEO)) {
  if (page.synonyms?.length) out[route] = page.synonyms;
}
writeFileSync(resolve("scripts/aeo-synonyms.json"), JSON.stringify(out, null, 2) + "\n");
console.log(`[aeo-synonyms] wrote ${Object.keys(out).length} routes`);
