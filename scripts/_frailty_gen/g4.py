
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
