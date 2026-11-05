import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import { TAI_CHI_VIDEOS } from "@/components/exercises/TaiChiAnimations";

const ROOT = process.cwd();
const PUBLIC = join(ROOT, "public");

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx?|mdx?|json)$/.test(name) && !name.endsWith(".asset.json")) out.push(p);
  }
  return out;
}

/** Every "/exercise-videos/..." path mentioned anywhere in src/. */
function referencedMedia(): string[] {
  const found = new Set<string>();
  for (const f of walk(join(ROOT, "src"))) {
    for (const m of readFileSync(f, "utf8").matchAll(/["'`](\/exercise-videos\/[\w./-]+\.(?:mp4|webm|jpg|jpeg|png|webp))["'`]/g)) {
      found.add(m[1]);
    }
  }
  for (const v of Object.values(TAI_CHI_VIDEOS)) {
    found.add(v.src);
    found.add(v.poster);
  }
  return [...found].sort();
}

function assertRealFile(rel: string) {
  const p = join(PUBLIC, rel);
  expect(existsSync(p), `${rel} is referenced but missing from public/`).toBe(true);
  const buf = readFileSync(p);
  expect(buf.length, `${rel} is too small to be real media (placeholder?)`).toBeGreaterThan(10_000);
  const head = buf.subarray(0, 16).toString("latin1");
  expect(head.trimStart().startsWith("{"), `${rel} is a JSON placeholder, not media`).toBe(false);
  if (rel.endsWith(".mp4")) expect(head.slice(4, 8), `${rel} is not an MP4`).toBe("ftyp");
  if (/\.jpe?g$/.test(rel)) expect(buf[0] === 0xff && buf[1] === 0xd8, `${rel} is not a JPEG`).toBe(true);
}

describe("exercise videos", () => {
  it("references at least the five tai chi demos", () => {
    expect(Object.keys(TAI_CHI_VIDEOS)).toHaveLength(5);
  });

  for (const rel of referencedMedia()) {
    it(`${rel} exists and is real media`, () => assertRealFile(rel));
  }

  it("keeps self-hosted clips small (≤5MB)", () => {
    for (const v of Object.values(TAI_CHI_VIDEOS)) {
      expect(statSync(join(PUBLIC, v.src)).size).toBeLessThanOrEqual(5 * 1024 * 1024);
    }
  });

  it("has no .asset.json placeholders in public/exercise-videos", () => {
    const dir = join(PUBLIC, "exercise-videos");
    const stubs = readdirSync(dir).filter((n) => n.endsWith(".asset.json"));
    expect(stubs).toEqual([]);
  });

  it("video players never preload the full file", () => {
    for (const f of ["ExerciseVideo.tsx", "ExerciseVideoModal.tsx"]) {
      const s = readFileSync(join(ROOT, "src/components/exercises", f), "utf8");
      expect(s).toMatch(/preload="(none|metadata)"/);
      expect(s).not.toMatch(/preload="auto"/);
    }
  });
});
