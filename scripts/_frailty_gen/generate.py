#!/usr/bin/env python3
from __future__ import annotations
import hashlib, json, re, sys
from pathlib import Path

ROOT = Path("/workspace/livingwitharthritis")
GEN = ROOT / "scripts/_frailty_gen"
OUT_CATALOG = ROOT / "src/content/blog/frailty-batch.json"
SLUGS_PATH = ROOT / "src/data/blog-slugs.generated.json"
HEAD_PATH = ROOT / "scripts/blog-head-data.json"
PRERENDER_PATH = ROOT / "src/data/prerender-routes.generated.json"
AUTHOR = "Louis Maxwell"
CREDS = "First Contact Practitioner, HCPC PH128483"
DATE = "2026-09-03"
UPDATED = "2026-09-03T00:00:00.000Z"
TAG_RE = re.compile(r"<[^>]+>")
WS_RE = re.compile(r"\s+")

NATION = {
    "England": {
        "health": "NHS England services via your GP",
        "urgent": "NHS 111",
        "extra": "In England, some areas have community frailty or neighbourhood teams. Your GP or a social prescriber can explain what exists locally. Pathways differ by integrated care board, so do not assume a named clinic in the next town is available to you.",
        "social": "your local council's adult social care team (the Care Act)",
    },
    "Scotland": {
        "health": "NHS Scotland services via your GP and Health and Social Care Partnership",
        "urgent": "NHS 24 on 111",
        "extra": "In Scotland, NHS Inform is a reliable first read. Rehab, reablement and care at home are organised locally. Island and Highland travel can turn a simple clinic into a two-day event, so ask early about closer blood tests or phone reviews.",
        "social": "your local Health and Social Care Partnership, including Self-directed Support conversations",
    },
    "Wales": {
        "health": "NHS Wales services via your GP and local health board",
        "urgent": "NHS 111 Wales",
        "extra": "In Wales, Dewis Cymru can help you browse local support. Rural travel, hills and limited buses matter as much as the joint diagnosis. Ask whether a community hospital, pharmacy service or home visit can cut the journey.",
        "social": "your local authority care and support team",
    },
    "Northern Ireland": {
        "health": "Health and Social Care in Northern Ireland via your GP and local Trust",
        "urgent": "your GP out-of-hours service or emergency services as directed on nidirect",
        "extra": "In Northern Ireland, nidirect explains how to start care conversations. Trust boundaries and waiting lists vary. If hills, steps or winter ice make the trip unsafe, say so when you book — staff cannot guess the pavement outside your door.",
        "social": "your local Health and Social Care Trust",
    },
}

CITES = {
    "oa": ("NHS – Osteoarthritis", "https://www.nhs.uk/conditions/osteoarthritis/", "NHS"),
    "ra": ("NHS – Rheumatoid arthritis", "https://www.nhs.uk/conditions/rheumatoid-arthritis/", "NHS"),
    "pmr": ("NHS – Polymyalgia rheumatica", "https://www.nhs.uk/conditions/polymyalgia-rheumatica/", "NHS"),
    "gout": ("NHS – Gout", "https://www.nhs.uk/conditions/gout/", "NHS"),
    "falls": ("NHS – Falls", "https://www.nhs.uk/conditions/falls/", "NHS"),
    "osteo": ("NHS – Osteoporosis", "https://www.nhs.uk/conditions/osteoporosis/", "NHS"),
    "vitd": ("NHS – Vitamin D", "https://www.nhs.uk/conditions/vitamins-and-minerals/vitamin-d/", "NHS"),
    "exercise": ("NHS – Exercise", "https://www.nhs.uk/live-well/exercise/", "NHS"),
    "steroids": ("NHS – Steroids", "https://www.nhs.uk/conditions/steroids/", "NHS"),
    "nice_oa": ("NICE NG226 – Osteoarthritis in over 16s", "https://www.nice.org.uk/guidance/ng226", "NICE"),
    "nice_falls": ("NICE CG161 – Falls in older people", "https://www.nice.org.uk/guidance/cg161", "NICE"),
    "nice_multi": ("NICE NG56 – Multimorbidity", "https://www.nice.org.uk/guidance/ng56", "NICE"),
    "ageuk": ("Age UK – Frailty", "https://www.ageuk.org.uk/information-advice/health-wellbeing/conditions-illnesses/frailty/", "Age UK"),
    "pip": ("GOV.UK – Personal Independence Payment", "https://www.gov.uk/pip", "GOV.UK"),
    "aa": ("GOV.UK – Attendance Allowance", "https://www.gov.uk/attendance-allowance", "GOV.UK"),
    "care": ("GOV.UK – Getting social care", "https://www.gov.uk/how-to-get-social-care", "GOV.UK"),
    "charity": ("Find a charity – Charity Commission", "https://www.gov.uk/find-charity-information", "Charity Commission"),
    "nhsinform": ("NHS Inform", "https://www.nhsinform.scot", "NHS Inform"),
    "nidirect": ("nidirect", "https://www.nidirect.gov.uk", "nidirect"),
    "wales111": ("NHS 111 Wales", "https://111.wales.nhs.uk", "NHS Wales"),
    "111": ("NHS 111", "https://www.nhs.uk/nhs-services/urgent-and-emergency-care/nhs-111/", "NHS"),
}
TAG_CITES = {
    "oa": ["oa", "nice_oa"], "ra": ["ra", "nice_multi"], "pmr": ["pmr", "steroids"],
    "gout": ["gout", "falls"], "falls": ["falls", "nice_falls"], "bone": ["osteo", "falls"],
    "vitd": ["vitd", "osteo"], "exercise": ["exercise", "nice_oa"], "strength": ["exercise", "nice_oa"],
    "steroids": ["steroids", "ra"], "polypharmacy": ["nice_multi", "111"], "benefits": ["pip", "aa"],
    "socialcare": ["care", "ageuk"], "cga": ["ageuk", "nice_multi"], "hospital": ["falls", "nice_multi"],
    "nutrition": ["exercise", "vitd"], "winter": ["vitd", "falls"], "nhs": ["111", "ageuk"],
}

def md5_int(s: str) -> int:
    return int(hashlib.md5(s.encode("utf-8")).hexdigest(), 16)

def pick(seq, key: str, i: int = 0):
    return seq[(md5_int(f"{key}:{i}") + i) % len(seq)]

def visible_words(html: str):
    text = TAG_RE.sub(" ", html).replace("&nbsp;", " ").replace("&amp;", "&")
    return [w for w in WS_RE.sub(" ", text).strip().split(" ") if w]

def word_count(html: str) -> int:
    return len(visible_words(html))

def p(text: str) -> str:
    return f"<p>{text.strip()}</p>"

def h2(text: str) -> str:
    return f"<h2>{text.strip()}</h2>"

def ul(items) -> str:
    return "<ul>" + "".join(f"<li>{i}</li>" for i in items) + "</ul>"

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
    overlap = set(slugs) & existing
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
        "When {condition} meets frailty, everyday tasks in a {setting} can shrink faster than the joints alone would suggest. Here we focus on {angle}, for a {nation} reader, with self-management ideas and when to contact a GP, {urgent} or 999.",
        "Frailty is a clinical syndrome — not a personality trait — and {condition} can make it more visible. This article is about {angle}, written for people and carers in {nation}, especially around a {setting}.",
        "Painful {joint} plus slower recovery is a common UK picture in later life. This page explains {angle} if you live with {condition}, without pretending rest is always safer. Use it alongside your GP, not instead of them.",
        "Around 10 million people in the UK live with arthritis; some also live with frailty. This guide covers {angle} when {condition} affects {joint}, with a {nation} lens and a {setting} focus.",
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
    return [h2(pick(titles, b["slug"], 3))] + [p(x) for x in ordered[:4]]

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

def practical(b):
    titles = [
        f"Practical self-management for {b['angle']}",
        f"Things you can try this week in a {b['setting']}",
        f"A frailty-aware plan for {b['joint']}",
        f"Small, repeatable steps — not a reinvention",
        f"Self-management that respects {b['condition']}",
    ]
    nat = NATION[b["nation"]]
    pool = [
        f"Keep a sit-to-stand practice at the height you actually use. A higher chair is not cheating if it lets {b['joint']} work without a panic haul.",
        f"Set an indoor walking loop with places to pause. Painful {b['joint']} prefer several short bouts to one heroic corridor.",
        f"Put the items you use at dawn — tablets, glasses, walking aid, phone — where you can reach them without a stretch that wrenches {b['joint']}.",
        f"If cooking is the barrier, use tinned fish, eggs, yoghurt, beans or leftover protein foods rather than skipping meals. Muscle needs raw material as well as movement.",
        f"Ask a pharmacist to look at the whole list if dizziness, constipation or night sedation have arrived with the pain tablets. Do not add a new painkiller just in case.",
        f"Treat a walking aid as joint protection and falls kit, not as a verdict. Wrist-friendly handles matter if {b['joint']} include hands.",
        f"Plan the scariest transfer of the day — often the bathroom — with lighting, a rail conversation and unhurried time. Rushing with stiff {b['joint']} is how near-misses happen.",
        f"After a flare, restart the smallest version of your usual movement within comfort, rather than waiting to feel back to normal. Normal rarely sends an email.",
        f"If you live in a {b['setting']}, tell one other person the plan for a fall: who to call, where the spare key sits, whether you wear a pendant you can actually press.",
        f"Book eye, foot and hearing checks as frailty care, not vanity. {b['condition'].capitalize()} already asks a lot of balance.",
        f"Use heat for stiffness if your skin is healthy, but protect thin skin. Never fall asleep on a hot water bottle.",
        f"Write three daily anchors: a meal, a movement, a conversation. Frailty grows in unstructured days.",
        f"If stairs are the bottleneck, get an occupational therapy conversation on the list while you temporarily live downstairs — drifting is how a camp-bed becomes a lifestyle.",
        f"Carers: help the last 20 percent of a task, not the first 80, unless pain or safety says otherwise. Practice is treatment for frailty.",
        f"In {b['nation']}, ask {nat['social']} about equipment and care options. Descriptions of grants and benefits here are not predictions of an award.",
    ]
    chosen = []
    for i in range(10):
        item = pick(pool, b["slug"] + "pr", i)
        if item not in chosen:
            chosen.append(item)
        if len(chosen) == 6:
            break
    intro = (
        f"None of this is a gym challenge. The aim is to keep {b['joint']} moving, keep protein in the day, and keep {b['angle']} from becoming the only story in the {b['setting']}. "
        f"If a physiotherapist, occupational therapist or frailty team has already given you a plan, follow that ahead of a webpage."
    )
    return [h2(pick(titles, b["slug"], 5)), p(intro), ul(chosen)]

def category_section(b):
    cat = b["category"]
    if cat == "Exercise":
        title = pick([f"Movement that still counts with {b['condition']}", f"Strength and steady steps for frail {b['joint']}", f"How to train without picking a fight with a flare"], b["slug"], 6)
        body = [
            f"Strength work for frail adults is usually sit-to-stand, pushing through the feet, and gentle resistance — not lunges on a glossy video. With {b['condition']}, the joint may complain at the bottom of a movement. Shorten the range, slow the lowering, and keep breathing.",
            f"Balance practice can be as modest as standing with a worktop in reach, or a community Tai Chi-style class that will not rush you. If {b['joint']} will not tolerate standing today, seated marching and seated rows still tell muscle it is wanted.",
            f"Hydrotherapy or a warm leisure pool can help some people, but changing rooms, steps and hair-washing are part of the energy budget. A class you cannot get dressed after is not a class.",
            f"NICE treats exercise as core osteoarthritis care. That does not mean no pain, no gain. Extra pain which settles within a day or so is different from pain that spirals. If you are unsure, ask community physiotherapy — and while you wait, keep the gentle version going.",
        ]
    elif cat == "Nutrition":
        title = pick([f"Food, fluid and muscle when {b['condition']} shrinks cooking", f"Eating to support frail {b['joint']}", f"Kitchen reality: {b['angle']}"], b["slug"], 6)
        body = [
            f"Frailty loves skipped meals. {b['condition'].capitalize()} makes that easy: sore {b['joint']} turn a sandwich into a logistics problem. Ready-to-eat protein — yoghurt, cheese, eggs, tinned fish, beans, leftover chicken — is a strategy, not a failure.",
            f"A Mediterranean-style pattern (vegetables, fruit, pulses, olive oil, fish when you can) is a familiar UK nutrition message. Keep the spirit, shrink the labour. Frozen vegetables and tinned tomatoes count.",
            f"NHS advice is that adults should consider a daily 10 microgram vitamin D supplement in autumn and winter. That is not a cure for {b['condition']}. Mention it to a pharmacist if you already take other tablets or have kidney problems.",
            f"If appetite is falling, drinks can carry nourishment, but night-time fluid can also create toilet rushes on stiff {b['joint']}. Front-load drinks earlier in the day and keep a well-lit, unhurried route to the loo.",
        ]
    elif cat == "Treatment":
        title = pick([f"Medicines, reviews and {b['condition']} in later life", f"Treatment conversations that include frailty", f"Tablets, topical options and what not to DIY"], b["slug"], 6)
        body = [
            f"Older adults with {b['condition']} often collect medicines for pain, sleep, stomach protection, blood pressure and more. Each tablet may have a reason. Together they can add dizziness, constipation, dry mouth or night sedation — all of which make {b['joint']} less trustworthy.",
            f"Do not start, stop or double painkillers because a neighbour swears by them. Some anti-inflammatory tablets are a poor fit with kidney, heart or stomach problems. Some stronger pain medicines increase falls risk. A pharmacist or GP can look at the whole list. This page will not give doses.",
            f"Topical anti-inflammatory gels are sometimes a gentler first step for a single painful joint. Steroid tablets or injections may have a place in inflammatory disease, but they are not free — infection risk, sleep, mood, sugar and bone all sit in the same conversation, especially if you are already frail.",
            f"If you take steroids, know whether you need a steroid emergency card and never stop a long course suddenly. If you take methotrexate or other immune-modulating drugs, infection and blood-test logistics are part of frailty care, not a separate rheumatology-only issue.",
        ]
    elif cat == "Mental Health":
        title = pick([f"Mood, fear and identity when {b['joint']} slow the week", f"The mental load of {b['angle']}", f"Confidence is a frailty issue too"], b["slug"], 6)
        body = [
            f"Fear of falling, low mood and loneliness are not extras. They are mechanisms. If you expect {b['joint']} to fail in a {b['setting']}, you sit. Sitting trains frailty. That is physiology, not weakness of character.",
            f"After a fall or a flare of {b['condition']}, people often need a deliberate confidence plan: one accompanied walk, one visitor, one practised transfer, not a lecture about positive thinking.",
            f"NHS talking therapies and social prescribing exist in many parts of {b['nation']}. They are allowed to be for older people with long-term conditions. If low mood, poor sleep or loss of interest last more than a couple of weeks, tell the GP. If you have thoughts of harming yourself, that is urgent — use {NATION[b['nation']]['urgent']} or 999.",
            f"Carers' mood matters as well. A household cannot run on one exhausted person hauling another off the toilet. A carer's assessment is a practical tool, not a betrayal.",
        ]
    elif cat == "Health":
        title = pick([f"The wider health picture around {b['condition']}", f"Frailty as a syndrome, not a single joint story", f"What to put on the problem list besides {b['joint']}"], b["slug"], 6)
        body = [
            f"Comprehensive geriatric assessment is a long name for a simple idea: look at movement, memory, mood, medicines, continence, bone, hearing, vision, home and who helps — not only the scan of {b['joint']}. Ask for that whole-person look if {b['angle']} is taking over.",
            f"Infection, delirium, constipation, unplanned weight loss and a new inability to get off the floor are frailty red flags. They are not a bad arthritis day. They need timely clinical advice.",
            f"Bone health sits next to {b['condition']} because a fall on a fragile hip or spine changes everything. Painful joints already alter how you walk. Add thin bone and the stakes rise. That is why vitamin D conversations, strength and a home safety look belong together.",
            f"If you have other long-term conditions — heart failure, COPD, diabetes, kidney disease — pacing has to serve all of them. A walking plan that wrecks breathing or blood sugar is not a good arthritis plan.",
        ]
    else:
        title = pick([f"Home, roles and rhythm with {b['condition']} and frailty", f"Making a {b['setting']} work harder for you", f"Lifestyle changes that are really clinical care"], b["slug"], 6)
        body = [
            f"Most frailty lives in ordinary rooms. Rails, lighting, chair height, a kettle that does not demand a full kettle-lift, and a toilet you can get off again are treatment. Occupational therapy exists for this.",
            f"Walking aids, Blue Badge applications, community transport and downstairs living are all tools. None of them is a moral failure. Used well, they keep you in the world so {b['joint']} still get some practice.",
            f"Benefits such as Personal Independence Payment or Attendance Allowance have rules, forms and waiting. Living With Arthritis will not tell you that you will qualify. We will tell you that an honest diary of {b['angle']} — the help you need on bad days, not your best Tuesday — is what assessors need if you do apply.",
            f"Keep a social appointment that does not depend on a heroic walk. A library, a faith group with a ramp, a phone befriender or a day centre can be as clinical as a tablet because isolation shrinks appetite, mood and muscle.",
        ]
    start = md5_int(b["slug"] + "cat") % 2
    body = body[start:] + body[:start]
    return [h2(title)] + [p(x) for x in body]

def nation_section(b):
    nat = NATION[b["nation"]]
    title = pick([
        f"Help in {b['nation']} if {b['condition']} and frailty overlap",
        f"Who to talk to locally in {b['nation']}",
        f"{b['nation']} services, without inventing a clinic",
    ], b["slug"], 7)
    body = [
        f"Start with your GP practice and {nat['health']}. For urgent but non-emergency advice use {nat['urgent']}. For chest pain, suspected hip fracture, sudden new weakness, or a fall with a bang to the head on blood thinners, use 999.",
        nat["extra"],
        f"Ask about community physiotherapy, occupational therapy, reablement after hospital, podiatry, pharmacy reviews and {nat['social']}. Names of teams change. The functions do not: get you moving, get you equipped, get the medicines tidier, get a human being through the door if you cannot get out.",
        f"Age UK and local advice agencies can help with forms. The Charity Commission listing for Living With Arthritis (1218461) is public if you want to check who we are. We are independent of Arthritis UK.",
    ]
    return [h2(title)] + [p(x) for x in body]

def help_section(b):
    title = pick(["When to get help", "Red flags — do not wait this out", "GP, 111 or 999?"], b["slug"], 8)
    items = [
        "A hot, very swollen joint with fever, or feeling systemically unwell — seek urgent clinical advice. A joint infection is an emergency.",
        "A fall with a new inability to weight-bear, a shortened or rotated leg, or severe hip or groin pain — 999.",
        "A knock to the head, especially if you take blood thinners — do not sleep it off as a plan.",
        "Sudden confusion, new incontinence, or a crash in mobility over hours to days — think infection or delirium, not only arthritis.",
        f"Chest pain, trouble breathing, or signs of a stroke — 999, not a wait for the {b['condition']} nurse.",
        f"Unplanned weight loss, repeated falls, or {b['angle']} that is clearly worsening week by week — book the GP and say you are worried about frailty as well as {b['joint']}.",
        f"If you cannot get to the surgery because of {b['condition']}, ask about a home visit or a proper phone review. Silence is not a care plan.",
    ]
    chosen = []
    for i in range(8):
        it = pick(items, b["slug"] + "help", i)
        if it not in chosen:
            chosen.append(it)
        if len(chosen) == 5:
            break
    intro = (
        f"This is not personal medical advice. When {b['joint']} and frailty overlap, wait until Monday is sometimes right and sometimes dangerous. "
        f"If you are unsure, {NATION[b['nation']]['urgent']} can help you choose. Living With Arthritis cannot triage you."
    )
    return [h2(title), p(intro), ul(chosen)]

def faqs(b):
    qs = [
        (f"Can frailty improve if I still have painful {b['joint']}?",
         f"Sometimes the frailty part can shift even if {b['condition']} remains. Strength, protein, reviewing dizzy medicines, treating a flare, and practising transfers can return reserve. Improvement is not guaranteed and it is rarely dramatic, but frailer this month is not always a one-way door. Work with clinicians rather than copying an online challenge."),
        (f"Is a walking aid giving in if I have {b['condition']}?",
         f"No. An aid that matches your {b['joint']} can protect joints, reduce fear and keep you walking far enough to keep muscle. A poorly fitted stick that hurts a wrist is the problem, not the concept. Ask physiotherapy or occupational therapy to look at height and grip."),
        (f"How do I tell an arthritis flare from a frailty slide?",
         f"A flare of {b['condition']} is usually more joint pain, stiffness or swelling in a known pattern. A frailty slide is broader: weaker recovery, smaller meals, more time in the chair, maybe confusion or falls. They can happen together. If the whole person is changing, do not only increase pain gel."),
        (f"Should I stop exercising during {b['angle']}?",
         f"Complete rest for more than a short flare period usually makes {b['joint']} and muscle worse. Keep a smaller version: seated strength, indoor loops, or the two sit-to-stands you can still do. If exercise causes pain that spirals or a joint that will not settle, get clinical advice."),
        (f"Will I get PIP or Attendance Allowance because I have {b['condition']} and frailty?",
         f"Nobody honest can promise that. These are legal tests about how your difficulties affect daily living or personal care, not about a diagnosis name. Keep a diary of {b['angle']} on typical and bad days. Use GOV.UK and independent advice. Living With Arthritis does not decide claims."),
        (f"Do I need a geriatrician as well as a rheumatologist?",
         f"Not always. Many people are supported by GP, community physio and, where it exists, a frailty team. If medicines are stacking, falls are repeating, or memory and continence are changing alongside {b['condition']}, ask whether a comprehensive older-person assessment would help."),
        (f"What should a carer do in the {b['setting']} without taking over?",
         f"Stand nearby for the risky bit, set the environment up (chair height, shoes, light), and leave the bits the person can still do. Taking over every transfer trains both of you into a hoist-by-default life. If moving and handling is already unsafe, stop DIY lifting and ask for a proper care and OT review."),
        (f"Are painkillers the main treatment for frail {b['condition']}?",
         f"No. For osteoarthritis, NICE puts exercise, weight management where relevant, and topical options at the centre. Tablets may help some people some of the time, but in frail adults they need a hard look at stomach, kidneys, heart, constipation and falls. Never share someone else's medicines."),
    ]
    chosen = []
    for i in range(12):
        item = pick(qs, b["slug"] + "faq", i)
        if item not in chosen:
            chosen.append(item)
        if len(chosen) == 3:
            break
    out = []
    for q, a in chosen:
        out.append(h2(q))
        out.append(p(a))
    return out

def sources_section(b, cites):
    items = [f'<a href="{c["url"]}">{c["label"]}</a> ({c["publisher"]})' for c in cites]
    return [
        h2("Sources and further reading"),
        p(f"Use these organisations for the underlying clinical framing. They are not copied here. Living With Arthritis adds practical {b['nation']} context for {b['condition']} and frailty."),
        ul(items),
        p("<em>Living With Arthritis is a UK charity (registered charity 1218461), independent of Arthritis UK. This page is general information, not personal medical advice. Speak to your GP, pharmacist, or "
          + NATION[b["nation"]]["urgent"] + ". Call 999 in an emergency.</em>"),
    ]

def extra_paragraphs(b, n):
    extras = [
        f"Shoes matter more than motivational quotes. Floppy slippers turn sore {b['joint']} into a wobble. A closed, fitted indoor shoe with a proper back is unglamorous and useful.",
        f"If you use a rise-recline chair, avoid living in the fully tilted position all afternoon. It is comfortable, and it is also a muscle holiday your {b['joint']} will pay for at teatime.",
        f"Keep a current medicine list in a known place — many people use the fridge — so a locum, paramedic or neighbour is not guessing while your {b['condition']} hurts.",
        f"Hospital bags for people with {b['condition']} should include usual walking aids, glasses, hearing kit, a medicine list and something that reminds staff you usually walk. Bare feet on a shiny ward are not a plan.",
        f"Winter in {b['nation']} adds ice, darker afternoons and heavier coats. Practise the coat, the doorstep and the bin walk on a kind day, not during the first frost.",
        f"If family live far away, a scheduled video call is better than an occasional guilty silence. {b['angle'][0].upper() + b['angle'][1:]} gets worse in unstructured weeks.",
        f"Do not crush tablets or stop bone medicines because a dental appointment is coming. Tell the dentist and the GP. Improvised medicine changes are a common way frail weeks go wrong.",
        f"A bad night with {b['condition']} is a reason to simplify the next day, not to cancel every movement. Two sit-to-stands and a protein breakfast still count.",
        f"If you are in a care home, ask that {b['condition']} and your usual walking method are on the care plan, not only history of arthritis. New staff cannot guess that you still stand to the commode.",
        f"Community pharmacy in {b['nation']} can often deliver, check inhaler or eye-drop technique, and flag duplicates. Use one pharmacy if you can, so the list is whole.",
    ]
    return [p(pick(extras, b["slug"] + "ex", i)) for i in range(n)]

OUTLINES = [
    ["why", "looks", "practical", "category", "nation", "help", "faq"],
    ["looks", "why", "category", "practical", "help", "nation", "faq"],
    ["why", "category", "practical", "looks", "nation", "help", "faq"],
    ["practical", "why", "looks", "nation", "category", "help", "faq"],
    ["why", "looks", "nation", "practical", "category", "help", "faq"],
    ["category", "why", "practical", "looks", "help", "nation", "faq"],
    ["looks", "practical", "why", "category", "nation", "help", "faq"],
    ["why", "practical", "looks", "category", "help", "nation", "faq"],
]

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
    guard = 0
    while word_count(html) < 900 and guard < 12:
        extra = extra_paragraphs(b, 1)[0]
        src_idx = html.find("<h2>Sources and further reading</h2>")
        html = html[:src_idx] + extra + "\n" + html[src_idx:]
        guard += 1
    guard = 0
    while word_count(html) > 1100 and guard < 25:
        src_idx = html.find("<h2>Sources and further reading</h2>")
        before = html[:src_idx]
        matches = list(re.finditer(r"<p>.*?</p>\n?", before, flags=re.S))
        if len(matches) > 8:
            m = matches[-1]
            html = before[: m.start()] + html[src_idx:]
        else:
            break
        guard += 1
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

def force_range(b, html):
    wc = word_count(html)
    guard = 0
    while wc < 900 and guard < 8:
        deep = p(
            f"Returning to {b['angle']}: the job is to keep {b['joint']} in the game without pretending they do not hurt. "
            f"That means a {b['setting']} set-up that reduces panic transfers, a movement snack most days, food with protein in it, and a low threshold for asking {NATION[b['nation']]['urgent']} or a GP when the whole person — not only the joint — is changing. "
            f"If a plan exists from physiotherapy, occupational therapy or a frailty service in {b['nation']}, it outranks this article. "
            f"If no plan exists, this week's smallest repeatable version of {b['angle']} is still better than waiting for a perfect week."
        )
        html = html.replace("<h2>Sources and further reading</h2>", deep + "\n<h2>Sources and further reading</h2>", 1)
        wc = word_count(html)
        guard += 1
    if wc > 1100:
        src = html.find("<h2>Sources and further reading</h2>")
        before, after = html[:src], html[src:]
        paras = re.findall(r"<p>.*?</p>", before, flags=re.S)
        while word_count(before + after) > 1100 and len(paras) > 10:
            before = before.replace(paras[-1], "", 1)
            paras = paras[:-1]
        html = before + after
        wc = word_count(html)
    return html, wc

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
