#!/usr/bin/env python3
"""Bake public/search-index.json for GET /api/search (no Supabase)."""
import json, re, pathlib
from datetime import datetime, timezone

root = pathlib.Path(__file__).resolve().parent.parent

def count_words(html):
    if not html:
        return 0
    text = re.sub(r"<[^>]+>", " ", str(html))
    text = re.sub(r"&[a-z]+;", " ", text, flags=re.I)
    return len(re.findall(r"[A-Za-z][A-Za-z'-]*", text))

def map_topic(category):
    c = (category or "").strip().lower()
    if not c: return "Other"
    if "exercise" in c: return "Exercise"
    if "nutrition" in c or c == "diet": return "Nutrition"
    if "supplement" in c: return "Supplements"
    if "treatment" in c: return "Treatment"
    if "finance" in c or "benefit" in c or "pip" in c: return "Finances & Benefits"
    if "mental" in c: return "Mental Health"
    if "work" in c or "career" in c: return "Work & Career"
    if "condition" in c or c == "symptoms": return "Conditions"
    if any(x in c for x in ("lifestyle","travel","social","family","sleep","weather")): return "Lifestyle"
    if any(x in c for x in ("health","prevention","frailty","surgery")): return "Health"
    return "Other"

def guide_topic(cluster, path):
    if cluster == "support" and "benefits" in path: return "Finances & Benefits"
    if cluster == "lifestyle": return "Nutrition"
    if cluster == "msk": return "Exercise"
    if cluster in ("medication", "surgery"): return "Treatment"
    if cluster == "condition": return "Conditions"
    return "Guides & hubs"

HUB = [
  {"id":"hub-guides","title":"Arthritis guides hub","href":"/guides","excerpt":"Browse UK arthritis guides on benefits, exercise, diet, pain relief and NHS care.","topic":"Guides & hubs","wordCount":900,"keywords":["guides","hub","PIP","exercise","diet"]},
  {"id":"hub-diet","title":"Diet & nutrition hub","href":"/diet","excerpt":"Anti-inflammatory eating patterns and foods that may ease joint symptoms.","topic":"Guides & hubs","wordCount":1100,"keywords":["diet","nutrition","mediterranean","inflammation"]},
  {"id":"hub-about","title":"About Living With Arthritis UK","href":"/about","excerpt":"Who we are, our mission, and how we produce clinician-reviewed guidance.","topic":"Guides & hubs","wordCount":1000,"keywords":["about","charity","mission"]},
  {"id":"hub-benefits-pip","title":"Benefits & PIP hub","href":"/benefits-pip","excerpt":"Start here for Personal Independence Payment and related UK arthritis benefits.","topic":"Finances & Benefits","wordCount":850,"keywords":["PIP","benefits","disability","DLA"]},
  {"id":"hub-exercises","title":"Exercise hub","href":"/exercises","excerpt":"Joint-friendly exercise guides including tai chi, walking and strength work.","topic":"Guides & hubs","wordCount":1000,"keywords":["exercise","movement","tai chi"]},
  {"id":"hub-library","title":"Health library","href":"/library","excerpt":"Plain-English library of conditions, medications, supplements and treatments.","topic":"Guides & hubs","wordCount":800,"keywords":["library","medications","conditions"]},
  {"id":"hub-blog","title":"Blog","href":"/blog","excerpt":"Evidence-based arthritis articles written for people in the UK.","topic":"Guides & hubs","wordCount":700,"keywords":["blog","articles"]},
]

blog_list = json.loads((root / "src/data/blogList.json").read_text())
blog_articles = json.loads((root / "src/data/blogArticles.json").read_text())
guide_ts = (root / "src/lib/guideRegistry.ts").read_text()
guide_re = re.compile(
    r'\{\s*path:\s*"([^"]+)"\s*,\s*title:\s*"([^"]+)"\s*,\s*description:\s*"([^"]+)"\s*,\s*cluster:\s*"([^"]+)"\s*,?\s*\}'
)
guides = [{"path": m.group(1), "title": m.group(2), "description": m.group(3), "cluster": m.group(4)} for m in guide_re.finditer(guide_ts)]
word_by_slug = {a["slug"]: count_words(a.get("content")) for a in blog_articles}

blog_items = []
for a in blog_list:
    kws = [a.get("category") or ""]
    if isinstance(a.get("keywords"), str):
        kws += [k.strip() for k in re.split(r"[,;]", a["keywords"]) if k.strip()]
    blog_items.append({
        "id": f"blog-{a['slug']}",
        "title": a["title"],
        "href": f"/blog/{a['slug']}",
        "excerpt": a.get("excerpt") or "",
        "topic": map_topic(a.get("category")),
        "wordCount": word_by_slug.get(a["slug"], 0),
        "keywords": [k for k in kws if k],
    })

guide_items = [{
    "id": f"guide-{g['path']}",
    "title": g["title"],
    "href": g["path"],
    "excerpt": g["description"],
    "topic": guide_topic(g["cluster"], g["path"]),
    "wordCount": 1200,
    "keywords": [g["cluster"], g["title"]],
} for g in guides]

seen = set()
items = []
for item in HUB + guide_items + blog_items:
    if item["href"] in seen:
        continue
    seen.add(item["href"])
    items.append(item)

out = {
    "generatedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z",
    "version": 1,
    "items": items,
}
(root / "public/search-index.json").write_text(json.dumps(out, separators=(",", ":")))
print(f"[search-index] wrote {len(items)} items -> public/search-index.json")
