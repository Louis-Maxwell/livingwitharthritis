#!/usr/bin/env python3
"""Generate branded title-card covers for blog posts that have no real photo.

Some imported archive posts pointed at 46-byte 1x1 placeholder webps, so their
cards and og:image rendered blank. This writes a 1200x675 Living With Arthritis
title card per slug to public/openverse/lwa-title-<slug>.webp (unique per post,
so the unique-cover catalog guard still holds) and records a credit in
public/openverse/ATTRIBUTION.json and alt text in src/data/cover-alt-overrides.json.

Usage: python3 scripts/generate-branded-covers.py slug1 slug2 ...
"""
import json, sys, textwrap
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
POSTS = ROOT / "src/content/blog/posts"
OUT = ROOT / "public/openverse"
FONT = "/usr/share/fonts/truetype/sand-box/google/Inter/Inter-VariableFont_opsz,wght.ttf"
FALLBACK_FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
RED = (214, 0, 0)
W, H = 1200, 675


def font(size, bold=True):
    try:
        f = ImageFont.truetype(FONT, size)
        try:
            f.set_variation_by_name("Bold" if bold else "Regular")
        except Exception:
            pass
        return f
    except OSError:
        return ImageFont.truetype(FALLBACK_FONT, size)


def render(title: str, category: str, dest: Path):
    im = Image.new("RGB", (W, H), (255, 250, 248))
    d = ImageDraw.Draw(im)
    d.rectangle([0, 0, 28, H], fill=RED)
    # soft decorative circles (joint motif)
    for cx, cy, r, col in ((1050, 120, 220, (253, 228, 228)), (1120, 560, 160, (250, 210, 210))):
        d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=col)
    d.text((90, 80), category.upper(), font=font(30), fill=RED)
    size = 76
    lines = textwrap.wrap(title, 24)
    while len(lines) > 4 and size > 48:
        size -= 6
        lines = textwrap.wrap(title, int(24 * 76 / size))
    y = 150
    f = font(size)
    for line in lines[:5]:
        d.text((90, y), line, font=f, fill=(25, 25, 25))
        y += int(size * 1.18)
    d.text((90, H - 95), "Living With Arthritis", font=font(34), fill=RED)
    d.text((90, H - 52), "Registered charity 1218461 · livingwitharthritis.org.uk", font=font(24, False), fill=(90, 90, 90))
    im.save(dest, "WEBP", quality=82, method=6)


def main(slugs):
    attr_path = OUT / "ATTRIBUTION.json"
    attr = json.loads(attr_path.read_text())
    alt_path = ROOT / "src/data/cover-alt-overrides.json"
    alts = json.loads(alt_path.read_text())
    for slug in slugs:
        p = POSTS / f"{slug}.json"
        post = json.loads(p.read_text())
        name = f"lwa-title-{slug}.webp"
        render(post["title"], post.get("category") or "Guide", OUT / name)
        attr[name] = {
            "source": "living-with-arthritis",
            "title": f"Title card: {post['title']}",
            "credit": "Image: Living With Arthritis",
        }
        alts[name] = f"Title card reading \u201c{post['title']}\u201d from Living With Arthritis"
        post["cover"] = name
        p.write_text(json.dumps(post, ensure_ascii=False, indent=2) + "\n")
    attr_path.write_text(json.dumps(attr, ensure_ascii=False, indent=2))
    alt_path.write_text(json.dumps(alts, ensure_ascii=False, indent=2) + "\n")


if __name__ == "__main__":
    main(sys.argv[1:])
