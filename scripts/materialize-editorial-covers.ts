// Exact reviewed title-card bytes stored as text for deterministic builds.
// No network request, image conversion or new dependency is needed.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve } from "node:path";

export function materializeEditorialCovers(root = process.cwd()) {
  const source = resolve(root, "scripts/data/editorial-covers.json");
  if (!existsSync(source)) return;
  const assets = JSON.parse(readFileSync(source, "utf8")) as Record<string, { sha256: string; base64: string }>;
  const output = resolve(root, "public/openverse");
  mkdirSync(output, { recursive: true });
  for (const [name, asset] of Object.entries(assets)) {
    if (!/^lwa-title-[a-z-]+\.webp$/.test(name)) throw new Error("Unexpected editorial cover filename");
    const bytes = Buffer.from(asset.base64, "base64");
    if (bytes.subarray(0, 4).toString() !== "RIFF" || bytes.subarray(8, 12).toString() !== "WEBP") throw new Error("Invalid editorial WebP");
    if (createHash("sha256").update(bytes).digest("hex") !== asset.sha256) throw new Error("Editorial cover checksum mismatch");
    const target = resolve(output, name);
    writeFileSync(target, bytes);
  }
}
