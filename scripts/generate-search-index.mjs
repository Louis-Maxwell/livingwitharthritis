/** Thin wrapper — implementation is generate-search-index.py */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const script = path.join(dir, "generate-search-index.py");
const result = spawnSync("python3", [script], { stdio: "inherit" });
process.exit(result.status ?? 1);
