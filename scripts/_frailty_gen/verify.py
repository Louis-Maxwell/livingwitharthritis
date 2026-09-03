import json, re
from pathlib import Path
from collections import Counter
root = Path("/workspace/livingwitharthritis")
arts = json.loads((root/"src/content/blog/frailty-batch.json").read_text())
slugs = json.loads((root/"src/data/blog-slugs.generated.json").read_text())
head = json.loads((root/"scripts/blog-head-data.json").read_text())
new = set(a["slug"] for a in arts)
old = set(slugs) - new
print("catalog", len(arts))
print("slugs file", len(slugs), "unique", len(set(slugs)))
print("new in slugs", sum(1 for a in arts if a["slug"] in slugs))
print("head new", sum(1 for a in arts if f"/blog/{a['slug']}" in head))
print("overlap old", len(new & old))
TAG=re.compile(r"<[^>]+>")
def wc(html):
    return len([w for w in TAG.sub(" ", html).split() if w])
counts=[wc(a["content"]) for a in arts]
print("wc min/med/max", min(counts), sorted(counts)[len(counts)//2], max(counts))
das=[len(a["direct_answer"].split()) for a in arts]
print("da min/max", min(das), max(das), "out", sum(1 for n in das if n<40 or n>60))
print("authors", Counter(a["author"] for a in arts))
print("creds", Counter(a["author_credentials"] for a in arts))
print("published", Counter(a["is_published"] for a in arts))
print("image null", sum(1 for a in arts if a["image_url"] is None))
print("cats", Counter(a["category"] for a in arts))
print("dates", Counter(a["date"] for a in arts))
opens=[]
for a in arts:
    text=TAG.sub(" ", a["content"])
    opens.append(" ".join(text.split()[:25]))
print("unique openings", len(set(opens)))
a=arts[0]
print("SAMPLE slug", a["slug"])
print("SAMPLE title", a["title"])
print("SAMPLE da", a["direct_answer"])
print("SAMPLE cites", a["citations"])
print("SAMPLE start", a["content"][:400].replace("\n"," "))
print("catalog MB", round((root/"src/content/blog/frailty-batch.json").stat().st_size/1e6,2))
print("head MB", round((root/"scripts/blog-head-data.json").stat().st_size/1e6,2))
pr=json.loads((root/"src/data/prerender-routes.generated.json").read_text())
print("prerender blog new", sum(1 for a in arts if f"/blog/{a['slug']}" in pr), "prerender total", len(pr))
# h2 questions
faq_ok=0
for a in arts:
    qs=re.findall(r"<h2>([^<]*\?)</h2>", a["content"])
    if len(qs)>=3:
        faq_ok+=1
print("articles with 3 faq h2", faq_ok)
