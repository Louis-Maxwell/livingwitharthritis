// Keeps the crawler head data for /guides/benefits-pip (scripts/ai-head-data.json)
// in step with the page's own content in src/data/benefitsGuides/pipGuideContent.ts:
// the answer block, takeaways, body, HowTo steps, visible FAQs and sources.
// Run: bun scripts/sync-pip-guide-head.ts   (checked by pip-guide-head-sync.test.ts)
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { buildPipGuideHead } from "../src/data/benefitsGuides/pipGuideHead";

const FILE = resolve("scripts/ai-head-data.json");
const data = JSON.parse(readFileSync(FILE, "utf8"));
const route = "/guides/benefits-pip";
data[route] = { ...data[route], ...buildPipGuideHead() };
writeFileSync(FILE, `${JSON.stringify(data, null, 2)}\n`);
console.log(`[sync-pip-guide-head] updated ${route}`);
