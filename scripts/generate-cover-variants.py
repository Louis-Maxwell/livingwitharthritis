#!/usr/bin/env python3
"""Generate 640w cover variants + the cover-variants manifest for BlogCard srcset.

Manual maintenance script - NOT part of the CI/build pipeline (needs Pillow,
which the JS build cannot depend on). Re-run locally when covers are added or
replaced, then commit public/openverse/variants/640/ and
src/content/blog/cover-variants.generated.json.

For every cover in public/openverse/ wider than 700px a 640w WebP (q75) is
written to public/openverse/variants/640/<same name>. BlogCard serves the
variant to small viewports via srcset and falls back to single-src behaviour
for covers missing from the manifest.

Requires: python3 + Pillow (pip install pillow).
"""
import json
import os

from PIL import Image

SRC = "public/openverse"
DST = "public/openverse/variants/640"
MANIFEST = "src/content/blog/cover-variants.generated.json"
MIN_WIDTH = 700
TARGET_WIDTH = 640


def main() -> None:
    os.makedirs(DST, exist_ok=True)
    manifest = {}
    for name in sorted(os.listdir(SRC)):
        path = os.path.join(SRC, name)
        if not os.path.isfile(path) or not name.lower().endswith(".webp"):
            continue
        with Image.open(path) as im:
            w, h = im.size
            entry = {"w": w, "v640": False}
            if w > MIN_WIDTH:
                resized = im.resize(
                    (TARGET_WIDTH, round(h * TARGET_WIDTH / w)), Image.LANCZOS
                )
                resized.save(os.path.join(DST, name), "WEBP", quality=75, method=4)
                entry["v640"] = True
        manifest[name] = entry
    with open(MANIFEST, "w") as fh:
        json.dump(manifest, fh, separators=(",", ":"), sort_keys=True)
    made = sum(1 for e in manifest.values() if e["v640"])
    print(f"covers: {len(manifest)}, variants: {made}")


if __name__ == "__main__":
    main()
