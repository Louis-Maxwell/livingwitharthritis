#!/usr/bin/env python3
"""Audit + refill unique Openverse/Commons covers for blog slugs (1:1)."""
from __future__ import annotations
import hashlib, json, os, re, time, urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from io import BytesIO
from pathlib import Path
from PIL import Image

ROOT = Path("/workspace/livingwitharthritis")
OUT = ROOT / "public/openverse"
ATTR = OUT / "ATTRIBUTION.json"
MAP = ROOT / "src/data/blog-cover-map.generated.json"
SLUGS = ROOT / "src/data/blog-slugs.generated.json"
UA = "LivingWithArthritisUK/1.0 (https://livingwitharthritis.org.uk; info@livingwitharthritis.org.uk)"
TOKEN = os.environ.get("OPENVERSE_TOKEN", "").strip() or None

QUERIES = [
  "elderly walking park", "senior stretching exercise", "physiotherapy elderly",
  "tai chi elderly", "yoga seniors class", "walking cane elderly",
  "hand therapy arthritis", "knee physiotherapy", "older couple walking outdoors",
  "senior swimming pool", "gardening elderly allotment", "healthy vegetables salad bowl",
  "fruit bowl fresh", "mediterranean diet vegetables", "olive oil food healthy",
  "berries yogurt breakfast", "community seniors group", "occupational therapy elderly",
  "balance exercise elderly", "chair yoga seniors", "physical therapy clinic elderly",
  "older woman walking dog", "pilates seniors", "hydrotherapy pool elderly",
  "arthritic hands close up", "shoulder stretch exercise", "resistance band exercise elderly",
  "nordic walking seniors", "caregiver helping elderly walk", "senior fitness class",
  "water aerobics seniors", "leafy greens salad", "grilled salmon vegetables",
  "herbal tea cup", "turmeric spice food", "ginger tea cup", "smoothie bowl fruit",
  "whole grain breakfast", "beans salad healthy", "allotment gardening elderly",
  "park bench seniors talking", "wheelchair outdoor park", "nurse helping elderly patient walk",
  "osteoarthritis exercise", "walking aid frailty", "hip mobility stretch elderly",
  "senior dance class", "choir seniors singing", "knitting elderly hands",
  "market shopping elderly", "seaside promenade elderly walking", "countryside walking path",
  "coastal walk elderly", "adaptive kitchen elderly", "mobility scooter park",
  "grandparent grandchild park", "volunteer helping senior", "uk canal walk",
  "bridge walking elderly", "physio knee exercise", "joint stretch physiotherapy",
  "elderly woman gardening", "elderly man walking stick", "senior woman yoga mat",
  "older adults walking group", "retirement walking club", "gentle exercise elderly",
  "aqua aerobics class", "warm pool therapy", "hand exercises arthritis",
  "wrist physiotherapy", "ankle mobility exercise", "posture stretch elderly",
  "healthy breakfast fruit", "vegetable soup bowl", "salmon salad plate",
  "nuts seeds healthy snack", "green tea cup", "walking frame elderly outdoor",
  "zimmer frame park", "day centre seniors activity", "community centre exercise class",
]

MUST = re.compile(
  r"elder|senior|old(?:er)?\s+(?:man|woman|people|person|couple|adult)|pensioner|retire|"
  r"physio|physical[\s-]?therap|occupational[\s-]?therap|yoga|tai[\s-]?chi|pilates|stretch|exercise|fitness|hydrother|"
  r"cane|walking[\s-]?frame|zimmer|wheelchair|mobility|garden|allotment|swim|nordic|hik|"
  r"salad|fruit|berr|vegetable|olive|mediterranean|soup|smoothie|ginger|turmeric|tea|"
  r"caregiver|carer|nurse|volunteer|choir|park|knee|hip|hand|joint|arthritis|rheumat|"
  r"grandparent|wellness|walk(?:ing)?|aerobics|resistance|balance",
  re.I,
)

BLOCK = re.compile(
  r"arthritis\s*uk|versus\s*arthritis|nude|naked|porn|erotic|stripper|bondage|sex|lingerie|"
  r"gore|bloody|wound|amputation|corpse|skull|autopsy|surgery\s*photo|"
  r"moth|butterfly|insect|larva|lepidoptera|coleoptera|taxon|grave|tomb|cemetery|funeral|"
  r"melania|trump|soldier|military|airmen|weapon|gun|rifle|paul\s*walker|hardy\s*boys|toddler|cigar|"
  r"holocaust|theresienstadt|concentration|nazi|"
  r"commencement\s*parade|centerfold|midget|jefferson|medici|darwin\s*statue|"
  r"biography\s*of|president\s*of|edwardian\s*man|convent\s*garden\b|"
  r"peony|blooms\s*from|book\s*of\s*marie|single\s*seater|pmvs|"
  r"baby|infant|newborn|pregnancy\s*ultrasound|fetus",
  re.I,
)

# Prefer thematic filenames; drop historical art / random portraits with weak fit
WEAK_DROP = re.compile(
  r"jefferson|medici|darwin|biography|president|edwardian|portrait\s*of|statue|"
  r"hallfield|church\s*road|edgbaston|day\s*nu|coffee\s*party|lombard|"
  r"kuching|raymond|elmer|sheffield\s*2016|herd\s*of|"
  r"male\s*fitness|fitness\s*person|centerfold|bondage|stripper|"
  r"commencement|parade_\d|op-senior-night|senior-night-meet|"
  r"swimming-pool-1961|learning-to-swim|file-at-full-stretch|"
  r"tibetan|kalachakra|dalai|prayer\s*wheel",
  re.I,
)

def get(url, timeout=60, token=None):
  headers = {"User-Agent": UA}
  if token:
    headers["Authorization"] = f"Bearer {token}"
  req = urllib.request.Request(url, headers=headers)
  with urllib.request.urlopen(req, timeout=timeout) as r:
    return r.read()

def getj(url, token=None):
  return json.loads(get(url, token=token).decode("utf-8", "replace"))

def slugify(s):
  return (re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")[:45] or "image")

def to_webp(data, max_side=1000, q=74):
  im = Image.open(BytesIO(data)).convert("RGB")
  w, h = im.size
  sc = min(1.0, max_side / max(w, h))
  if sc < 1:
    im = im.resize((int(w * sc), int(h * sc)), Image.Resampling.LANCZOS)
  b = BytesIO()
  im.save(b, format="WEBP", quality=q, method=4)
  return b.getvalue()

def ok(title, blob=""):
  text = f"{title} {blob}"
  if BLOCK.search(text):
    return False
  if WEAK_DROP.search(text):
    return False
  return bool(MUST.search(title) or MUST.search(blob))

def content_hash(path: Path) -> str:
  return hashlib.md5(path.read_bytes()).hexdigest()

def main():
  OUT.mkdir(parents=True, exist_ok=True)
  slugs = json.loads(SLUGS.read_text())
  need = len(slugs)
  attr = {}
  if ATTR.exists():
    try:
      attr = json.loads(ATTR.read_text())
    except Exception:
      attr = {}

  # Audit existing files
  kept = []
  seen_keys = set()
  seen_hashes = set()
  removed = 0
  for path in sorted(OUT.glob("*.webp")):
    if path.name.startswith("hero-"):
      continue
    meta = attr.get(path.name) or {"title": path.name, "source": "existing"}
    title = str(meta.get("title") or path.name)
    blob = json.dumps(meta)
    # Drop weak/blocked by filename or metadata
    if BLOCK.search(path.name) or WEAK_DROP.search(path.name) or not ok(title, blob):
      # Keep curated category originals (arthritis-/community-/nutrition-/wellness-)
      if not re.match(r"^(arthritis|community|nutrition|wellness)-\d{2}-", path.name):
        path.unlink(missing_ok=True)
        attr.pop(path.name, None)
        removed += 1
        continue
    h = content_hash(path)
    if h in seen_hashes:
      path.unlink(missing_ok=True)
      attr.pop(path.name, None)
      removed += 1
      continue
    seen_hashes.add(h)
    kept.append(path.name)
    attr.setdefault(path.name, meta)
    if meta.get("id"):
      seen_keys.add(f"o:{meta['id']}")
    if meta.get("source") == "wikimedia_commons" and meta.get("title"):
      seen_keys.add(f"c:{meta['title']}")
    seen_keys.add(f"file:{path.name}")

  print(f"kept {len(kept)} after audit (removed {removed})", flush=True)

  collected = list(kept)

  def add_file(fname, webp_bytes, meta, key):
    nonlocal collected
    if len(collected) >= need:
      return False
    if key in seen_keys:
      return False
    h = hashlib.md5(webp_bytes).hexdigest()
    if h in seen_hashes:
      return False
    while (OUT / fname).exists() or fname in collected:
      fname = f"cover-{len(collected)+1:04d}-{slugify(meta.get('title') or 'img')}-{h[:6]}.webp"
    (OUT / fname).write_bytes(webp_bytes)
    attr[fname] = meta
    collected.append(fname)
    seen_keys.add(key)
    seen_hashes.add(h)
    return True

  # Openverse gather
  if len(collected) < need:
    candidates = []
    for q in QUERIES:
      if len(candidates) > (need - len(collected)) * 4:
        break
      for page in range(1, 6):
        params = urllib.parse.urlencode({
          "q": q, "license": "cc0,pdm,by,by-sa", "mature": "false",
          "page_size": "40", "page": str(page),
        })
        url = f"https://api.openverse.org/v1/images/?{params}"
        try:
          data = getj(url, token=TOKEN)
        except Exception as e:
          print("ov", q, page, e, flush=True)
          time.sleep(0.5)
          break
        results = data.get("results") or []
        if not results:
          break
        for it in results:
          iid = it.get("id") or it.get("identifier")
          if not iid or f"o:{iid}" in seen_keys:
            continue
          title = it.get("title") or ""
          tags = " ".join((t.get("name") if isinstance(t, dict) else str(t)) for t in (it.get("tags") or []))
          blob = f"{title} {it.get('creator','')} {tags}"
          if not ok(title, blob):
            continue
          w, h = it.get("width") or 0, it.get("height") or 0
          if w and h and (w < 350 or h < 250):
            continue
          candidates.append({
            "key": f"o:{iid}",
            "title": title or str(iid),
            "url": f"https://api.openverse.org/v1/images/{iid}/thumb/",
            "fallback": it.get("url"),
            "meta": {
              "source": "openverse", "id": iid, "title": title,
              "creator": it.get("creator"), "license": it.get("license"),
              "license_url": it.get("license_url"),
              "foreign_landing_url": it.get("foreign_landing_url"),
              "attribution": it.get("attribution"), "query": q,
            },
          })
        time.sleep(0.12)
      time.sleep(0.05)
    print(f"openverse candidates {len(candidates)}", flush=True)

    def fetch_one(item):
      raw = None
      for u in [item.get("url"), item.get("fallback")]:
        if not u:
          continue
        try:
          raw = get(u, token=TOKEN if "openverse.org" in u else None)
          if raw and len(raw) > 1000:
            break
        except Exception:
          raw = None
      if not raw:
        return None
      try:
        webp = to_webp(raw)
      except Exception:
        return None
      if len(webp) < 1500:
        return None
      return item, webp

    with ThreadPoolExecutor(max_workers=10) as ex:
      futs = [ex.submit(fetch_one, c) for c in candidates]
      for fut in as_completed(futs):
        if len(collected) >= need:
          break
        res = fut.result()
        if not res:
          continue
        item, webp = res
        fname = f"cover-{len(collected)+1:04d}-{slugify(item['title'])}.webp"
        if add_file(fname, webp, item["meta"], item["key"]) and len(collected) % 25 == 0:
          print(f"[{len(collected)}/{need}]", flush=True)
          ATTR.write_text(json.dumps(attr, indent=2, sort_keys=True) + "\n")

  # Commons fill
  if len(collected) < need:
    print("commons fill", flush=True)
    for q in QUERIES:
      if len(collected) >= need:
        break
      params = urllib.parse.urlencode({
        "action": "query", "format": "json", "generator": "search",
        "gsrnamespace": "6", "gsrlimit": "50", "gsrsearch": q,
        "prop": "imageinfo", "iiprop": "url|size|mime|extmetadata", "iiurlwidth": "1000",
      })
      try:
        data = getj("https://commons.wikimedia.org/w/api.php?" + params)
      except Exception as e:
        print("commons", e, flush=True)
        continue
      for p in ((data.get("query") or {}).get("pages") or {}).values():
        if len(collected) >= need:
          break
        title = (p.get("title") or "").replace("File:", "")
        key = f"c:{p.get('pageid')}"
        if key in seen_keys:
          continue
        ii = (p.get("imageinfo") or [{}])[0]
        if (ii.get("mime") or "") not in {"image/jpeg", "image/png", "image/webp"}:
          continue
        meta_ext = ii.get("extmetadata") or {}
        if not ok(title, json.dumps(meta_ext)):
          continue
        thumb = ii.get("thumburl") or ii.get("url")
        if not thumb:
          continue
        try:
          raw = get(thumb)
          webp = to_webp(raw)
        except Exception:
          continue
        if len(webp) < 1500:
          continue
        artist = re.sub(r"<[^>]+>", "", ((meta_ext.get("Artist") or {}).get("value") or "")).strip()
        meta = {
          "source": "wikimedia_commons", "title": title, "creator": artist,
          "license": ((meta_ext.get("LicenseShortName") or {}).get("value") or ""),
          "query": q,
        }
        fname = f"cover-{len(collected)+1:04d}-{slugify(title)}.webp"
        if add_file(fname, webp, meta, key) and len(collected) % 25 == 0:
          print(f"[{len(collected)}/{need}]", flush=True)

  print(f"final collected {len(collected)}", flush=True)
  if len(collected) < need:
    raise SystemExit(f"shortfall {len(collected)}<{need}")

  # Trim attr to existing files only
  existing = set(collected)
  attr = {k: v for k, v in attr.items() if k in existing}
  # Also drop orphan cover files beyond need? keep extras unmapped is ok but we take first need after deterministic sort
  salt = "lwa-openverse-covers-v1"
  files = sorted(collected[:need], key=lambda f: hashlib.sha256(f"{salt}:{f}".encode()).hexdigest())
  mapping = {slug: files[i] for i, slug in enumerate(sorted(slugs))}
  assert len(set(mapping.values())) == len(mapping)
  # Verify files exist
  missing = [f for f in mapping.values() if not (OUT / f).exists()]
  if missing:
    raise SystemExit(f"map references missing files: {len(missing)}")
  MAP.write_text(json.dumps(mapping, indent=2, sort_keys=True) + "\n")
  ATTR.write_text(json.dumps(attr, indent=2, sort_keys=True) + "\n")
  print("unique", len(set(mapping.values())), "slugs", len(mapping), flush=True)

if __name__ == "__main__":
  main()
