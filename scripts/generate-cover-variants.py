#!/usr/bin/env python3
"""Generate 640w + 960w cover variants + the cover-variants manifest for BlogCard srcset.

Manual maintenance script - NOT part of the CI/build pipeline (needs Pillow,
which the JS build cannot depend on). Re-run locally when covers are added or
replaced, then commit public/openverse/variants/640/ and
src/content/blog/cover-variants.generated.json.

For every cover in public/openverse/ wider than 700px a 640w WebP (q75) is
written to public/openverse/variants/640/<same name>, and covers wider than
1000px also get a 960w WebP under variants/960/ (high-DPR phones render
100vw cards at up to ~1080 device px). BlogCard serves the variants via
srcset and falls back to single-src behaviour for covers missing from the
manifest.

Requires: python3 + Pillow (pip install pillow).
"""
import json
import os

from PIL import Image

SRC = "public/openverse"
DST_640 = "public/openverse/variants/640"
DST_960 = "public/openverse/variants/960"
MANIFEST = "src/content/blog/cover-variants.generated.json"
MIN_WIDTH_640 = 700
MIN_WIDTH_960 = 1000


def main() -> None:
    os.makedirs(DST_640, exist_ok=True)
    os.makedirs(DST_960, exist_ok=True)
    manifest = {}
    for name in sorted(os.listdir(SRC)):
        path = os.path.join(SRC, name)
        if not os.path.isfile(path) or not name.lower().endswith(".webp"):
            continue
        with Image.open(path) as im:
            w, h = im.size
            entry = {"w": w, "v640": False, "v960": False}
            for dst, min_w, target in (
                (DST_640, MIN_WIDTH_640, 640),
                (DST_960, MIN_WIDTH_960, 960),
            ):
                if w > min_w:
                    resized = im.resize(
                        (target, round(h * target / w)), Image.LANCZOS
                    )
                    resized.save(os.path.join(dst, name), "WEBP", quality=75, method=4)
                    entry["v640" if target == 640 else "v960"] = True
        manifest[name] = entry
    with open(MANIFEST, "w") as fh:
        json.dump(manifest, fh, separators=(",", ":"), sort_keys=True)
    made = sum(1 for e in manifest.values() if e["v640"])
    made960 = sum(1 for e in manifest.values() if e["v960"])
    print(f"covers: {len(manifest)}, 640w variants: {made}, 960w variants: {made960}")


if __name__ == "__main__":
    main()
