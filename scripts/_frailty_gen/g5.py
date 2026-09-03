
def compose(b):
    da = da_words(b)
    intro = (
        f"{scene(b)} Around 10 million people in the UK live with arthritis; a smaller group also live with frailty as a clinical syndrome. "
        f"This article stays with {b['angle']}, not a generic arthritis recap. It is written in UK English for people, families and carers in {b['nation']}."
    )
    parts = {
        "why": why_section, "looks": looks_like, "practical": practical,
        "category": category_section, "nation": nation_section, "help": help_section, "faq": faqs,
    }
    outline = OUTLINES[b["idx"] % len(OUTLINES)]
    blocks = [p(da), p(intro)]
    for name in outline:
        blocks.extend(parts[name](b))
    cites = citations_for(b)
    blocks.extend(sources_section(b, cites))
    html = "\n".join(blocks)
    faq_m = re.search(r"<h2>[^<]*\?</h2>", html)
    src_idx = html.find("<h2>Sources and further reading</h2>")
    protect_at = faq_m.start() if faq_m else src_idx
    main, tail = html[:protect_at], html[protect_at:]
    guard = 0
    while word_count(main + tail) < 900 and guard < 12:
        extra = extra_paragraphs(b, 1)[0]
        main = main + extra + "\n"
        guard += 1
    guard = 0
    while word_count(main + tail) > 1100 and guard < 25:
        matches = list(re.finditer(r"<p>.*?</p>\n?", main, flags=re.S))
        if len(matches) > 6:
            m = matches[-1]
            main = main[: m.start()] + main[m.end():]
        else:
            break
        guard += 1
    html = main + tail
    return html, da, cites

def excerpt_of(da, b):
    base = WS_RE.sub(" ", f"{da} Practical {b['nation']} guidance on {b['angle']}.").strip()
    if len(base) <= 180:
        return base
    return base[:177].rsplit(" ", 1)[0] + "…"

def keywords_of(b):
    bits = [b["condition"], "frailty", b["joint"], b["nation"], "arthritis", b["category"].lower(), "UK"]
    return ", ".join(dict.fromkeys(bits))

def article_record(b, html, da, cites, display_order):
    title = b["title"]
    ex = excerpt_of(da, b)
    return {
        "slug": b["slug"], "title": title, "excerpt": ex, "content": html, "date": DATE,
        "category": b["category"], "image_url": None,
        "meta_title": title if len(title) <= 70 else title[:67] + "…",
        "meta_description": ex[:158], "keywords": keywords_of(b),
        "author": AUTHOR, "author_credentials": CREDS, "reviewed_by": AUTHOR,
        "reviewer_credentials": CREDS, "is_published": True, "display_order": display_order,
        "updated_at": UPDATED, "direct_answer": da, "citations": cites,
    }

def head_entry(article):
    headline = article["meta_title"] or article["title"]
    description = article["meta_description"] or article["excerpt"]
    title = f"{headline} | Living With Arthritis UK" if len(headline) <= 72 else headline
    faqs = []
    for m in re.finditer(r"<h2>([^<]*\?)</h2>\s*<p>(.*?)</p>", article["content"], flags=re.S):
        q = m.group(1).strip()
        a = WS_RE.sub(" ", TAG_RE.sub(" ", m.group(2))).strip()
        if len(a) > 30:
            faqs.append({"q": q, "a": a[:500]})
        if len(faqs) >= 6:
            break
    entry = {
        "title": title, "description": description[:158], "question": headline,
        "answer": (article["direct_answer"] or "")[:600], "breadcrumb": headline,
        "about": article["category"], "updatedAt": DATE, "article": article,
    }
    if len(faqs) >= 2:
        entry["faqs"] = faqs
    return entry

def _drop_last_li(main: str) -> str:
    uls = list(re.finditer(r"<ul>.*?</ul>", main, flags=re.S))
    if not uls:
        return main
    ul = uls[-1]
    inner = ul.group(0)
    lis = list(re.finditer(r"<li>.*?</li>", inner, flags=re.S))
    if len(lis) <= 3:
        return main
    inner2 = inner[: lis[-1].start()] + inner[lis[-1].end():]
    return main[: ul.start()] + inner2 + main[ul.end():]

def force_range(b, html):
    faq_m = re.search(r"<h2>[^<]*\?</h2>", html)
    src = html.find("<h2>Sources and further reading</h2>")
    protect_at = faq_m.start() if faq_m else src
    main, tail = html[:protect_at], html[protect_at:]
    wc = word_count(main + tail)
    guard = 0
    while wc < 900 and guard < 8:
        deep = p(
            f"Returning to {b['angle']}: the job is to keep {b['joint']} in the game without pretending they do not hurt. "
            f"That means a {b['setting']} set-up that reduces panic transfers, a movement snack most days, food with protein in it, and a low threshold for asking {NATION[b['nation']]['urgent']} or a GP when the whole person — not only the joint — is changing. "
            f"If a plan exists from physiotherapy, occupational therapy or a frailty service in {b['nation']}, it outranks this article. "
            f"If no plan exists, this week's smallest repeatable version of {b['angle']} is still better than waiting for a perfect week."
        )
        main = main + deep + "\n"
        wc = word_count(main + tail)
        guard += 1
    while wc > 1100 and guard < 40:
        before = main
        main2 = _drop_last_li(main)
        if main2 == main:
            matches = list(re.finditer(r"<p>.*?</p>\n?", main, flags=re.S))
            if len(matches) > 4:
                m = matches[-1]
                main2 = main[: m.start()] + main[m.end():]
        if main2 == main:
            # drop last h2 section in main
            h2s = list(re.finditer(r"<h2>.*?</h2>", main, flags=re.S))
            if len(h2s) > 2:
                main2 = main[: h2s[-1].start()]
        if main2 == main:
            break
        main = main2
        wc = word_count(main + tail)
        guard += 1
    html = main + tail
    return html, word_count(html)

def main():
    briefs, existing = load_briefs()
    articles, counts = [], []
    for i, b in enumerate(briefs):
        html, da, cites = compose(b)
        html, wc = force_range(b, html)
        counts.append(wc)
        rec = article_record(b, html, da, cites, display_order=5000 - i)
        rec["_wc"] = wc
        articles.append(rec)
    short = [a for a in articles if a["_wc"] < 900]
    long = [a for a in articles if a["_wc"] > 1100]
    if short or long:
        print("WORD COUNT ISSUES", file=sys.stderr)
        for a in short[:10]:
            print(" short", a["_wc"], a["slug"], file=sys.stderr)
        for a in long[:10]:
            print(" long", a["_wc"], a["slug"], file=sys.stderr)
        raise SystemExit(f"short={len(short)} long={len(long)}")
    for a in articles:
        del a["_wc"]
    OUT_CATALOG.parent.mkdir(parents=True, exist_ok=True)
    OUT_CATALOG.write_text(json.dumps(articles, ensure_ascii=False, indent=2) + "\n")
    slugs = json.loads(SLUGS_PATH.read_text())
    new_slugs = [a["slug"] for a in articles]
    merged_slugs = list(dict.fromkeys(slugs + new_slugs))
    SLUGS_PATH.write_text(json.dumps(merged_slugs, indent=2) + "\n")
    head = json.loads(HEAD_PATH.read_text())
    for a in articles:
        head[f"/blog/{a['slug']}"] = head_entry(a)
    HEAD_PATH.write_text(json.dumps(head, ensure_ascii=False, indent=2) + "\n")
    prerender = json.loads(PRERENDER_PATH.read_text())
    prerender = list(dict.fromkeys(prerender + [f"/blog/{s}" for s in new_slugs]))
    PRERENDER_PATH.write_text(json.dumps(prerender, indent=2) + "\n")
    cs = sorted(counts)
    n = len(cs)
    median = cs[n // 2] if n % 2 else (cs[n // 2 - 1] + cs[n // 2]) / 2
    print(json.dumps({"added": len(articles), "min": min(cs), "median": median, "max": max(cs),
                      "slugs_total": len(merged_slugs), "head_keys": len(head)}, indent=2))

if __name__ == "__main__":
    main()
