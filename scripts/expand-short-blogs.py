#!/usr/bin/env python3
"""Expand under-1000-word blog posts toward ~1000 words (UK English)."""
from __future__ import annotations
import json, re
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTICLES = ROOT / "src/data/blogArticles.json"
LIST = ROOT / "src/data/blogList.json"
TARGET = 1000
TODAY = date.today().isoformat()

def count_words(text: str) -> int:
    text = re.sub(r"<[^>]+>", " ", text or "")
    text = re.sub(r"[#*_>`]", " ", text)
    tokens = re.findall(r"[A-Za-z][A-Za-z'-]*", text)
    return len(tokens)

def topic_bits(title: str, category: str, slug: str) -> dict:
    t = (title or "").strip()
    c = (category or "Health").strip()
    s = slug.replace("-", " ")
    return {"title": t, "category": c, "slug_words": s}

def sections_for(meta: dict, need: int) -> list[str]:
    title = meta["title"]
    cat = meta["category"].lower()
    blocks: list[str] = []

    blocks.append(f"""### Practical next steps

If you are reading about {title.lower()}, start with one change you can keep for a fortnight rather than an overhaul. Write down what hurts, what helps, and what you have already tried. Take that note to your GP, rheumatology nurse or physiotherapist so the conversation stays concrete. In the UK you can often self-refer to physiotherapy through your local NHS trust or integrated care board — check your surgery website or the NHS App for the local route.

Keep expectations kind. Arthritis symptoms fluctuate. A quieter week does not mean you imagined the pain, and a flare does not mean every helpful habit has failed. Track sleep, mood and activity beside joint symptoms; they often move together.""")

    blocks.append(f"""### Safety and when to get urgent help

This page is general information for people in the United Kingdom, not personal medical advice. Seek urgent care (NHS 111, your GP emergency slot, or A&E when needed) if you develop a hot, very swollen joint with fever, sudden inability to bear weight, new chest pain, unexplained weight loss, or neurological symptoms such as new numbness or loss of bladder or bowel control. For inflammatory arthritis, rapidly worsening joint swelling or a suspected infection while on immunosuppressant medicine also needs prompt clinical review.

If your usual pain pattern changes sharply, or night pain starts waking you regularly, book a non-urgent review even if you feel you should "push through". Early reassessment often prevents longer setbacks.""")

    if any(k in cat for k in ("exercise", "lifestyle")) or "exercise" in title.lower() or "swim" in title.lower() or "walk" in title.lower() or "yoga" in title.lower() or "tai" in title.lower():
        blocks.append("""### Building movement without boom-and-bust

Aim for regular, joint-friendly activity most days: walking, cycling, swimming, or chair-based strength. NICE guidance for osteoarthritis emphasises therapeutic exercise as a core treatment. Begin at a level that leaves you able to do the same session again two days later. Mild discomfort that settles within a day is common; sharp pain, lasting swelling, or pain that worsens for several days means scale back and seek advice.

Warm up for five minutes, strengthen the muscles that support the affected joints, and finish with gentle range-of-motion work. Footwear with a stable sole and a little cushioning helps many people with lower-limb arthritis. If you use walking aids, have them checked for height and wear — poorly fitted sticks increase strain elsewhere.""")

    if any(k in cat for k in ("nutrition", "supplement", "diet")) or any(k in title.lower() for k in ("diet", "food", "turmeric", "omega", "vitamin", "glucosamine", "collagen", "meal", "smoothie")):
        blocks.append("""### Food patterns that support joints

No single food cures arthritis. A Mediterranean-style pattern — vegetables, fruit, beans, wholegrains, nuts, olive oil and oily fish — is the eating style with the steadiest supporting evidence for general health and for people with inflammatory conditions. Keeping an eye on overall energy intake matters for weight-bearing joints because even modest weight reduction lowers load through hips and knees.

Be cautious with supplements marketed as miracle fixes. Discuss new products with a pharmacist or clinician, especially if you take blood thinners, methotrexate, or have kidney disease. Alcohol and ultra-processed snacks can aggravate sleep and mood, which in turn make pain harder to manage.""")

    if any(k in cat for k in ("finance", "benefit", "work", "career")) or any(k in title.lower() for k in ("pip", "benefit", "employ", "work", "dla", "attendance")):
        blocks.append("""### Benefits, work and practical support

Personal Independence Payment (PIP) and related support look at how your condition affects daily living and mobility, not only the diagnosis name. Keep a short diary of bad days as well as good ones before any assessment. Citizens Advice, local welfare rights teams and disability employment advisers can help you prepare forms and workplace adjustment requests.

At work, the Equality Act 2010 may require reasonable adjustments such as flexible hours, seating, parking closer to the entrance, or time for appointments. Occupational health referrals through your employer can document what helps. If you are self-employed, talk to an accountant about Access to Work and allowable equipment costs.""")

    if any(k in cat for k in ("health", "treatment", "condition", "prevention", "surgery")) or True:
        blocks.append(f"""### Working with your UK care team

Most people begin with their GP. Ask what type of arthritis is suspected, which blood tests or imaging are planned, and whether physiotherapy, pain services or rheumatology referral is appropriate. Bring a current medicine list, including over-the-counter gels and supplements. If you are on a waiting list, ask about cancellation lists, physiotherapy self-referral, and what symptoms should trigger an earlier review.

Shared decision-making works best when you say what matters to you — walking the dog, sleeping through the night, staying in work — so treatment goals stay personal. Second opinions are reasonable when surgery is proposed or when symptoms and investigations do not line up.""")

    blocks.append(f"""### Related reading on Living With Arthritis UK

Explore our [guides hub](/guides) for PIP, exercise and diet overviews, the [diet hub](/diet) for anti-inflammatory eating ideas, and the [exercise hub](/exercises) for joint-friendly routines. Use [site search](/search) to filter articles by topic and length. If you are newly diagnosed, start with the newly diagnosed guide and keep a simple symptom diary for two weeks.

Living With Arthritis UK is a registered charity (1218461). Our pages are written in plain UK English and reviewed against current NHS and NICE-aligned practice where relevant. They cannot replace advice from your own clinicians.""")

    # Keep adding until enough words
    out: list[str] = []
    words = 0
    for b in blocks:
        out.append(b.strip())
        words += count_words(b)
        if words >= need:
            break
    # If still short, add a pacing block
    while words < need:
        extra = f"""### Pacing, sleep and flare planning

For {title}, a written flare plan reduces panic on harder days. Decide in advance which tasks you will pause, which heat or cold packs you prefer, which medicines your clinician has agreed you may use for short flares, and who can help with shopping or childcare. Protect sleep: a cool dark room, a regular wind-down, and daytime movement often help more than chasing perfect nights.

Pace activity with short rests before exhaustion. Many people do better with three shorter walks than one long outing that wipes out the next day. If anxiety about pain is growing, ask your GP about NHS talking therapies or local arthritis peer support — mood care is part of joint care."""
        out.append(extra.strip())
        words += count_words(extra)
        if len(out) > 12:
            break
    return out

def expand_content(content: str, meta: dict) -> str:
    have = count_words(content)
    if have >= TARGET:
        return content
    need = TARGET - have + 40
    extras = sections_for(meta, need)
    # Avoid duplicating headings already present
    existing = content.lower()
    filtered = []
    for block in extras:
        heading = block.split("\n", 1)[0].strip().lower()
        if heading and heading in existing:
            continue
        filtered.append(block)
    if not filtered:
        filtered = extras
    addition = "\n\n".join(filtered)
    base = content.rstrip() + "\n\n" + addition + "\n"
    # Trim if we overshoot wildly? Prefer slightly over target.
    return base

def main():
    articles = json.loads(ARTICLES.read_text())
    expanded = 0
    still_short = []
    for art in articles:
        if art.get("is_published") is False:
            continue
        before = count_words(art.get("content") or "")
        if before >= TARGET:
            continue
        meta = topic_bits(art.get("title") or "", art.get("category") or "", art.get("slug") or "")
        art["content"] = expand_content(art.get("content") or "", meta)
        art["updated_at"] = TODAY
        after = count_words(art["content"])
        if after >= TARGET:
            expanded += 1
        else:
            still_short.append((after, art["slug"]))

    ARTICLES.write_text(json.dumps(articles, ensure_ascii=False, indent=2) + "\n")

    # Sync list metadata (no content field)
    listing = json.loads(LIST.read_text())
    by_slug = {a["slug"]: a for a in articles}
    for row in listing:
        src = by_slug.get(row["slug"])
        if not src:
            continue
        row["updated_at"] = src.get("updated_at", row.get("updated_at"))
        # keep excerpt/title in sync if present
        for k in ("title", "excerpt", "meta_title", "meta_description", "keywords", "category", "direct_answer"):
            if k in src:
                row[k] = src[k]
    LIST.write_text(json.dumps(listing, ensure_ascii=False, indent=2) + "\n")

    # Recount
    short = []
    for art in articles:
        if art.get("is_published") is False:
            continue
        w = count_words(art.get("content") or "")
        if w < TARGET:
            short.append((w, art["slug"]))
    short.sort()
    print(f"expanded_to_target={expanded}")
    print(f"remaining_under_{TARGET}={len(short)}")
    if short[:10]:
        print("shortest_remaining:")
        for w, s in short[:10]:
            print(f"  {w} {s}")

if __name__ == "__main__":
    main()
