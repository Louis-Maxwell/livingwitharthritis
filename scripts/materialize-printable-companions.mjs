// The reviewed printable PDF bytes are kept in text form for deterministic builds.
// No patient data is collected. No network request or Python dependency is needed.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
const assets = JSON.parse(readFileSync(new URL("./data/printable-companions.json", import.meta.url), "utf8"));
const output = new URL("../public/resources/", import.meta.url);
mkdirSync(output, { recursive: true });
for (const [name, encoded] of Object.entries(assets)) {
  if (!/^[a-z-]+\.pdf$/.test(name)) throw new Error("Unexpected printable filename");
  const bytes = Buffer.from(encoded, "base64");
  if (bytes.subarray(0, 5).toString() !== "%PDF-") throw new Error("Invalid printable PDF");
  writeFileSync(new URL(name, output), bytes);
}
console.log(`[printables] wrote ${Object.keys(assets).length} reviewed-layout PDF assets`);
