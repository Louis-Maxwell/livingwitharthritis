/** Search index wrapper. Sitemap defines the URL universe; the manifest is the shared publication contract. */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(dir);
const run = (cmd, args) => {
  const result = spawnSync(cmd, args, { cwd: root, stdio: "inherit" });
  if ((result.status ?? 1) !== 0) process.exit(result.status ?? 1);
};

run("bun", ["scripts/generate-sitemap.ts"]);
run("node", ["scripts/generate-content-manifest.mjs"]);
run("python3", [path.join(dir, "generate-search-index.py")]);
// Second pass enriches the manifest with the fresh search metadata generated
// from the same authoritative URL allow-list.
run("node", ["scripts/generate-content-manifest.mjs"]);
