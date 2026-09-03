
def load_briefs():
    existing = set(json.loads(SLUGS_PATH.read_text()))
    briefs = []
    for path in sorted(GEN.glob("briefs_*.csv")):
        for line in path.read_text().splitlines():
            line = line.strip()
            if not line:
                continue
            slug, title, category, condition, joint, setting, nation, angle, tags = line.split("|")
            briefs.append({
                "slug": slug, "title": title, "category": category, "condition": condition,
                "joint": joint, "setting": setting, "nation": nation, "angle": angle,
                "tags": [t.strip() for t in tags.split(",") if t.strip()], "idx": len(briefs),
            })
    slugs = [b["slug"] for b in briefs]
    if len(slugs) != 250:
        raise SystemExit(f"expected 250 briefs, got {len(slugs)}")
    if len(set(slugs)) != 250:
        raise SystemExit("duplicate generated slugs")
    prev_batch = set()
    if OUT_CATALOG.exists():
        try:
            prev_batch = {a["slug"] for a in json.loads(OUT_CATALOG.read_text())}
        except Exception:
            prev_batch = set()
    original = existing - prev_batch
    overlap = set(slugs) & original
    if overlap:
        raise SystemExit(f"overlap with existing slugs: {overlap}")
    return briefs, existing

def citations_for(b):
    keys = []
    for t in b["tags"]:
        keys.extend(TAG_CITES.get(t, []))
    nat = b["nation"]
    keys.append({"Scotland": "nhsinform", "Wales": "wales111", "Northern Ireland": "nidirect"}.get(nat, "111"))
    keys.extend(["ageuk", "charity"])
    seen, out = [], []
    for k in keys:
        if k in seen or k not in CITES:
            continue
        seen.append(k)
        label, url, pub = CITES[k]
        out.append({"label": label, "url": url, "publisher": pub})
        if len(out) >= 4:
            break
    return out

def clamp_words(text, lo=40, hi=60):
    words = text.split()
    if len(words) < lo:
        text += " Keep 999 for emergencies such as chest pain, suspected hip fracture or a sudden inability to weight-bear."
        words = text.split()
    if len(words) > hi:
        text = " ".join(words[: hi - 1]) + "."
    return text

def da_words(b):
    nat = NATION[b["nation"]]
    templates = [
        "{cc} and frailty often travel together because pain changes how you walk, rise and recover. This UK guide looks at {angle} in a {setting} setting, with practical steps, warning signs and {nation} services. It is general information, not personal medical advice.",
        "When {condition} meets frailty, everyday tasks in a {setting} can shrink faster than the joints alone would suggest. Here we focus on {angle}, for readers in {nation}, with self-management ideas and when to contact a GP, {urgent} or 999.",
        "Frailty is a clinical syndrome — not a personality trait — and {condition} can make it more visible. This article is about {angle}, written for people and carers in {nation}, especially around a {setting}.",
        "Painful {joint} plus slower recovery is a common UK picture in later life. This page explains {angle} if you live with {condition}, without pretending rest is always safer. Use it alongside your GP, not instead of them.",
        "Around 10 million people in the UK live with arthritis; some also live with frailty. This guide covers {angle} when {condition} affects {joint}, with a focus on {nation} and a {setting} setting.",
    ]
    text = pick(templates, b["slug"], 1).format(
        condition=b["condition"], cc=b["condition"][0].upper() + b["condition"][1:],
        angle=b["angle"], setting=b["setting"], nation=b["nation"], joint=b["joint"],
        urgent=nat["urgent"],
    )
    return clamp_words(text)

def scene(b):
    bits = [
        "Picture the moment in a {setting} when your {joint} refuse a simple transfer and you feel your confidence drop faster than the pain score.",
        "It might be the kettle, the bathroom, the car door or the clinic corridor — a {setting} task that used to be automatic now asks more of {joint} than they can give on a stiff morning.",
        "Families often notice {condition} first as a slower walk across a {setting}, then as a person who starts declining invitations.",
        "A flare in {joint} can look like sudden frailty. True frailty is a wider loss of reserve: weaker recovery after a quiet week, an infection or a hospital night.",
        "In {nation}, clinicians may talk about frailty as a syndrome. You may simply feel that {condition} has stolen bounce from ordinary {setting} tasks.",
    ]
    return pick(bits, b["slug"], 2).format(**b)

def why_section(b):
    titles = [
        f"Why {b['condition']} and frailty so often meet",
        f"The overlap: painful {b['joint']} and a frailer body",
        f"What 'frailty' means when you already have {b['condition']}",
        f"Pain, muscle and recovery: the {b['nation']} picture",
        f"Not 'just getting old': {b['angle']}",
    ]
    paras = [
        f"Arthritis is about joints, tendons and the way pain changes movement. Frailty is about the whole system — muscle, stamina, appetite, mood, medicines and how quickly you bounce back after a setback. {b['condition'].capitalize()} sits in the middle because sore {b['joint']} quietly train you to sit more, shorten your stride and skip the movements that keep muscle.",
        f"NICE is clear that exercise is core care for osteoarthritis, not an optional extra after tablets. That still holds if you are becoming frailer, but the dose must respect today's {b['joint']} and today's energy. Rest has a place in a flare; rest as a lifestyle is how deconditioning joins the diagnosis.",
        f"Clinicians sometimes use tools such as the Rockwood Clinical Frailty Scale in hospital. It is not a DIY label and it is not a moral judgement. Painful {b['joint']} can make you look slower on a scale even when the driver is arthritis, so tell staff what is new this week versus what is your usual {b['condition']}.",
        f"Around 10 million people in the UK live with arthritis. Only some also live with frailty. The practical question is not the label. It is whether {b['angle']} is shrinking your {b['setting']} life — and what you can change this week without pretending pain is imaginary.",
        f"Living With Arthritis is an independent UK charity (1218461), not part of Arthritis UK. We write for patients and carers. We do not replace {NATION[b['nation']]['health']}.",
    ]
    start = md5_int(b["slug"]) % 3
    ordered = paras[start:] + paras[:start]
    return [h2(pick(titles, b["slug"], 3))] + [p(x) for x in ordered[:3]]

def looks_like(b):
    titles = [
        f"What this can look like in a {b['setting']}",
        f"A {b['nation']} day with {b['condition']} and less reserve",
        f"Signs the overlap is affecting {b['joint']}",
        f"How {b['angle']} shows up in real rooms",
        f"Flare, fear and slowing down",
    ]
    items = [
        f"Transfers that used to be boring — bed, chair, toilet, car — now need a pause, a push-up or a second person, especially when {b['joint']} are cold.",
        f"Shorter outdoor range, then shorter indoor range, then a {b['setting']} that has quietly rearranged itself around the chair.",
        f"Skipping meals or drinks because getting to the kitchen with sore {b['joint']} feels like a project.",
        f"New fear after a near-miss, even if you did not hit the floor. Fear of falling is itself a reason people sit more.",
        f"A hospital or infection week that ends with clothes feeling looser and stairs feeling taller.",
        f"A flare of {b['condition']} that lasts, then a slower baseline even when the flare eases.",
        f"Carers doing the last steps of a task to be kind, which removes the last practice the muscles were getting.",
        f"Night toilet trips, poor lighting and stiff {b['joint']} stacking into a falls risk that nobody named.",
    ]
    seen = []
    for i in range(8):
        c = pick(items, b["slug"], i)
        if c not in seen:
            seen.append(c)
        if len(seen) == 5:
            break
    para = (
        f"In a {b['setting']}, {b['angle']} is rarely one dramatic collapse. It is usually a stack of small avoidances. "
        f"People with {b['condition']} already know boom-and-bust. Frailty adds a longer payback: a quiet weekend can cost the following Thursday."
    )
    return [h2(pick(titles, b["slug"], 4)), p(para), ul(seen)]
