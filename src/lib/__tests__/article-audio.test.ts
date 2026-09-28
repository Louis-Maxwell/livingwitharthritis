import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { ARTICLE_AUDIO_SLUGS } from "@/data/articleAudio";

describe("article audio registry", () => {
  it("lists exactly the recordings in public/audio", () => {
    const dir = resolve(__dirname, "../../../public/audio");
    const files = existsSync(dir)
      ? readdirSync(dir).filter((f) => f.endsWith(".mp3")).map((f) => f.replace(/\.mp3$/, ""))
      : [];
    expect([...ARTICLE_AUDIO_SLUGS].sort()).toEqual(files.sort());
  });
});
