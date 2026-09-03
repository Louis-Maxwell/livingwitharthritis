
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
