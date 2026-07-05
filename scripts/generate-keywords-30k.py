#!/usr/bin/env python3
"""Generate 30,000 deduplicated UK keywords: arthritis, frailty,
musculoskeletal, and arthritis in animals (dogs/cats/horses + breeds).
Output: keywords-30000.json (for public/data/, lazy-loaded — NOT bundled).
"""
import json, re
from collections import Counter

rows, seen = [], set()

def add(keyword, intent, category, cluster, target):
    k = re.sub(r"\s+", " ", keyword.strip().lower())
    if not k or k in seen: return
    seen.add(k)
    rows.append({"keyword": k, "intent": intent, "category": category,
                 "cluster": cluster, "targetPage": target})

conditions = {
    "osteoarthritis": "/conditions/osteoarthritis",
    "rheumatoid arthritis": "/conditions/rheumatoid-arthritis",
    "psoriatic arthritis": "/conditions/psoriatic-arthritis",
    "gout": "/conditions/gout",
    "ankylosing spondylitis": "/conditions/ankylosing-spondylitis",
    "fibromyalgia": "/conditions/fibromyalgia",
    "lupus": "/conditions/lupus",
    "juvenile arthritis": "/conditions/juvenile-arthritis",
    "reactive arthritis": "/conditions/reactive-arthritis",
    "polymyalgia rheumatica": "/conditions/polymyalgia-rheumatica",
    "knee arthritis": "/conditions/knee-arthritis",
    "hip arthritis": "/conditions/hip-arthritis",
    "hand arthritis": "/conditions/hand-arthritis",
    "shoulder arthritis": "/conditions/shoulder-arthritis",
    "elbow arthritis": "/conditions/elbow-arthritis",
    "spinal arthritis": "/conditions/osteoarthritis",
    "thumb arthritis": "/conditions/hand-arthritis",
    "wrist arthritis": "/conditions/hand-arthritis",
    "ankle arthritis": "/conditions/knee-arthritis",
    "foot arthritis": "/conditions/knee-arthritis",
    "neck arthritis": "/conditions/osteoarthritis",
    "facet joint arthritis": "/conditions/osteoarthritis",
    "cervical spondylosis": "/conditions/osteoarthritis",
    "inflammatory arthritis": "/conditions/rheumatoid-arthritis",
    "degenerative joint disease": "/conditions/osteoarthritis",
    "seronegative arthritis": "/conditions/rheumatoid-arthritis",
    "septic arthritis": "/conditions/reactive-arthritis",
    "palindromic rheumatism": "/conditions/rheumatoid-arthritis",
    "still's disease": "/conditions/juvenile-arthritis",
    "sjogren's syndrome": "/conditions/lupus",
    "scleroderma": "/conditions/lupus",
    "vasculitis": "/conditions/lupus",
    "pseudogout": "/conditions/gout",
    "bursitis": "/guides/musculoskeletal-health",
    "tendonitis": "/guides/musculoskeletal-health",
    "carpal tunnel syndrome": "/conditions/hand-arthritis",
    "frozen shoulder": "/conditions/shoulder-arthritis",
    "plantar fasciitis": "/guides/musculoskeletal-health",
    "tennis elbow": "/conditions/elbow-arthritis",
    "de quervain's tenosynovitis": "/conditions/hand-arthritis",
}

info_t = ["{c} symptoms","{c} causes","{c} treatment","{c} diagnosis","early signs of {c}",
    "what is {c}","how to manage {c}","living with {c}","{c} flare up","{c} pain relief",
    "{c} exercises","{c} diet","{c} home remedies","{c} stages","{c} prognosis",
    "is {c} hereditary","{c} and fatigue","{c} nhs","{c} nice guidelines","{c} self management",
    "{c} risk factors","{c} complications","can {c} be cured","{c} support uk","{c} blood test",
    "{c} physiotherapy","{c} swelling","{c} stiffness","{c} in women","{c} in men",
    "{c} in elderly","{c} in young adults","{c} and weather","{c} and sleep","{c} and work",
    "{c} and driving","{c} and depression","{c} and weight","{c} pain at night","{c} morning stiffness",
    "{c} first symptoms","{c} getting worse","{c} remission","{c} surgery options","{c} injections",
    "{c} medication list","{c} natural treatment","{c} vs fibromyalgia","{c} recovery time","{c} disability uk"]
comm_t = ["best supplements for {c}","best mattress for {c}","best shoes for {c}","{c} braces",
    "{c} support gloves","{c} gel","{c} cream","{c} tens machine","{c} walking aids",
    "best painkillers for {c}","{c} physiotherapist near me","private {c} treatment cost uk",
    "{c} clinic uk","heat pads for {c}","compression sleeve for {c}","best chair for {c}",
    "best pillow for {c}","{c} insoles","{c} splint","best exercise equipment for {c}"]
mods = ["", " uk", " nhs", " 2026", " for elderly", " for over 60s", " at home",
    " without medication", " guide", " help", " advice", " explained"]

for c, target in conditions.items():
    for t in info_t:
        base = t.format(c=c)
        for m in mods:
            add(base + m, "informational", "condition", c, target)
    for t in comm_t:
        add(t.format(c=c), "commercial", "treatment", c, target)
        add(t.format(c=c) + " uk", "commercial", "treatment", c, target)
        add(t.format(c=c) + " reviews", "commercial", "treatment", c, target)

# ---------- animals: species-level ----------
species = {
    "dogs": "dog", "cats": "cat", "horses": "horse", "rabbits": "rabbit",
    "senior dogs": "dog", "older cats": "cat", "elderly dogs": "dog", "ponies": "horse",
}
animal_t = ["arthritis in {s}","arthritis in {s} symptoms","arthritis in {s} treatment",
    "signs of arthritis in {s}","how to help {s} with arthritis","joint supplements for {s}",
    "arthritis pain relief for {s}","best food for {s} with arthritis","exercise for {s} with arthritis",
    "arthritis in {s} home remedies","when to see a vet arthritis {s}","glucosamine for {s}",
    "hydrotherapy for {s}","arthritis in {s} back legs","{s} limping arthritis",
    "cbd for {s} arthritis uk","arthritis medication for {s}","how to make {s} with arthritis comfortable",
    "arthritis in {s} life expectancy","cold weather and arthritis in {s}","ramps for {s} with arthritis",
    "orthopaedic bed for {s}","massage for {s} with arthritis","acupuncture for {s} arthritis",
    "yumove for {s} reviews","librela for {s}","{s} joint care","{s} stiff after sleeping",
    "{s} struggling with stairs","natural anti inflammatory for {s}"]
animal_mods = ["", " uk", " cost", " vet advice", " at home", " that works", " reviews", " 2026"]
for s in species:
    for t in animal_t:
        base = t.format(s=s)
        for m in animal_mods:
            intent = "commercial" if any(w in base for w in ["supplement","food","bed","ramp","yumove","librela","cbd","medication","cost"]) else "informational"
            add(base + m, intent, "animals", f"animals:{species[s]}", "/blog")

# ---------- animals: dog breeds ----------
breeds = ["labrador","golden retriever","german shepherd","french bulldog","cocker spaniel",
    "springer spaniel","staffordshire bull terrier","border collie","dachshund","boxer",
    "rottweiler","greyhound","whippet","beagle","pug","bulldog","jack russell","cavalier king charles spaniel",
    "shih tzu","chihuahua","husky","doberman","great dane","bernese mountain dog","corgi",
    "westie","yorkshire terrier","poodle","labradoodle","cockapoo","bichon frise","schnauzer",
    "akita","mastiff","newfoundland","st bernard","dalmatian","weimaraner","vizsla","pointer",
    "setter","lurcher","patterdale terrier","border terrier","spaniel"]
breed_t = ["arthritis in {b}s","{b} arthritis symptoms","{b} arthritis treatment",
    "joint supplements for {b}s","{b} hip dysplasia vs arthritis","{b} back leg weakness",
    "exercise for {b} with arthritis","best dog bed for {b} with arthritis",
    "{b} limping back leg","{b} joint problems","when do {b}s get arthritis",
    "{b} arthritis age","help my {b} has arthritis","{b} stiff joints"]
for b in breeds:
    for t in breed_t:
        add(t.format(b=b), "informational", "animals", "animals:dog breeds", "/blog")
        add(t.format(b=b) + " uk", "informational", "animals", "animals:dog breeds", "/blog")

# ---------- frailty / elderly / falls (expanded) ----------
fr_terms = ["frailty in elderly","preventing frailty","frailty assessment nhs","clinical frailty scale",
    "fall prevention elderly","falls in the elderly causes","fear of falling elderly","balance exercises seniors",
    "strength training over 70","chair exercises elderly","walking aids elderly","staying independent old age",
    "muscle loss elderly","sarcopenia","protein for elderly","vitamin d elderly","bone density over 60",
    "osteoporosis prevention","hip fracture recovery elderly","getting up after a fall","home safety elderly",
    "grab rails elderly","stairlifts uk","live in care arthritis","dementia and arthritis","frailty and arthritis",
    "elderly mobility exercises","postural hypotension elderly","medication review elderly","winter care elderly",
    "loneliness elderly uk","day centres for elderly","befriending services elderly","meals on wheels uk",
    "power of attorney health uk","care needs assessment uk","carers allowance","respite care uk",
    "elderly exercise classes near me","social prescribing uk"]
fr_mods = ["", " uk", " nhs", " guide", " tips", " near me", " 2026", " free", " cost", " how to"]
for t in fr_terms:
    for m in fr_mods:
        add(t + m, "informational", "frailty", "frailty & elderly", "/guides/frailty-management-hub")

# ---------- MSK expanded ----------
msk_terms = ["musculoskeletal health","msk physiotherapy","back pain relief","lower back pain exercises",
    "neck pain relief","sciatica treatment","posture correction","desk job back pain","joint pain causes",
    "muscle strengthening over 50","core exercises for back pain","stretching routine for stiffness",
    "hypermobility syndrome","fibromyalgia vs msk pain","physio self referral","nhs physiotherapy waiting time",
    "occupational health msk","ergonomic assessment","manual handling and joints","repetitive strain injury",
    "tai chi for arthritis","yoga for joint pain","pilates for beginners over 60","aqua aerobics arthritis",
    "swimming for back pain","walking football over 60","strength and balance programme","otago exercises",
    "resistance band exercises seniors","hand grip strengthener"]
for t in msk_terms:
    for m in fr_mods:
        add(t + m, "informational", "msk", "musculoskeletal", "/guides/musculoskeletal-health")

# ---------- local: ~200 UK towns × templates ----------
towns = ["london","birmingham","manchester","leeds","glasgow","liverpool","bristol","sheffield",
"edinburgh","cardiff","newcastle","nottingham","belfast","leicester","southampton","portsmouth",
"brighton","coventry","hull","plymouth","stoke on trent","wolverhampton","derby","swansea",
"sunderland","oxford","cambridge","york","oswestry","shrewsbury","telford","chester","wrexham",
"reading","milton keynes","aberdeen","dundee","norwich","exeter","bournemouth","luton","bolton",
"bradford","stockport","wigan","doncaster","rotherham","barnsley","wakefield","huddersfield",
"halifax","oldham","rochdale","salford","preston","blackpool","blackburn","burnley","lancaster",
"carlisle","middlesbrough","darlington","durham","gateshead","south shields","hartlepool",
"scunthorpe","grimsby","lincoln","mansfield","chesterfield","northampton","kettering","corby",
"peterborough","ipswich","colchester","chelmsford","southend","basildon","romford","enfield",
"croydon","bromley","kingston upon thames","watford","st albans","hemel hempstead","stevenage",
"bedford","slough","high wycombe","aylesbury","banbury","swindon","gloucester","cheltenham",
"worcester","hereford","stafford","cannock","walsall","dudley","west bromwich","solihull",
"redditch","nuneaton","rugby","warwick","stratford upon avon","bath","weston super mare",
"taunton","yeovil","bridgwater","torquay","paignton","exmouth","truro","falmouth","penzance",
"st austell","newquay","barnstaple","salisbury","poole","weymouth","dorchester","winchester",
"basingstoke","andover","eastleigh","fareham","gosport","chichester","worthing","crawley",
"horsham","eastbourne","hastings","maidstone","canterbury","ashford","folkestone","dover",
"gillingham","dartford","guildford","woking","farnborough","aldershot","bracknell","maidenhead",
"newbury","didcot","abingdon","witney","kidderminster","burton upon trent","tamworth","lichfield",
"loughborough","hinckley","grantham","boston","skegness","kings lynn","great yarmouth","lowestoft",
"bury st edmunds","newmarket","harlow","bishops stortford","hertford","welwyn garden city",
"dunstable","leighton buzzard","rugeley","stourbridge","halesowen","smethwick","bilston",
"willenhall","bloxwich","perth","stirling","inverness","paisley","east kilbride","hamilton",
"kilmarnock","ayr","dumfries","falkirk","livingston","dunfermline","kirkcaldy","greenock",
"newport","swindon town","bangor","llandudno","rhyl","aberystwyth","carmarthen","merthyr tydfil",
"bridgend","barry","pontypridd","neath","port talbot","llanelli","derry","lisburn","newry",
"bangor northern ireland","ballymena","omagh","enniskillen","coleraine"]
local_t = ["arthritis support {t}","arthritis physiotherapy {t}","physiotherapist {t}",
    "arthritis exercise class {t}","tai chi class {t}","hydrotherapy {t}","rheumatology {t}",
    "arthritis support group {t}","falls prevention class {t}","chair yoga {t}"]
for t_ in towns:
    slug = t_.replace(" ", "-")
    for tpl in local_t:
        add(tpl.format(t=t_), "local", "local", f"local:{t_}", f"/arthritis-support/{slug}")

# condition-in-town longtails to reach depth
for t_ in towns:
    slug = t_.replace(" ", "-")
    for c in list(conditions)[:20]:
        add(f"{c} help {t_}", "local", "local", f"local:{t_}", f"/arthritis-support/{slug}")
        add(f"{c} physio {t_}", "local", "local", f"local:{t_}", f"/arthritis-support/{slug}")

# ---------- benefits & disability expanded ----------
ben = ["pip for arthritis","pip assessment arthritis","pip mobility component","attendance allowance",
    "blue badge arthritis","universal credit limited capability","esa support group","access to work",
    "disabled facilities grant","motability","carers allowance","council tax disability reduction",
    "free bus pass disability","disabled railcard","vat exemption mobility aids","warm home discount",
    "pension credit","housing benefit disability","work capability assessment","fit note arthritis",
    "reasonable adjustments work","equality act disability","tribunal appeal pip","mandatory reconsideration"]
ben_mods = ["", " uk", " 2026", " how to apply", " eligibility", " points", " rates", " form",
    " phone number", " calculator", " success rate", " for arthritis"]
for t in ben:
    for m in ben_mods:
        add(t + m, "commercial", "benefits", "disability & benefits", "/guides/benefits-pip")

# ---------- diet expanded ----------
diet = ["anti inflammatory diet","mediterranean diet","foods that reduce inflammation","omega 3 foods",
    "turmeric benefits","ginger for pain","vitamin d foods","calcium rich foods","collagen supplements",
    "glucosamine chondroitin","arthritis diet plan","gout diet","low purine foods","weight loss for joints",
    "anti inflammatory breakfast","anti inflammatory dinner recipes","best fish for arthritis",
    "nightshades and arthritis","sugar and inflammation","alcohol and gout","coffee and arthritis",
    "green tea inflammation","bone broth joints","apple cider vinegar arthritis","cherry juice gout"]
diet_mods = ["", " uk", " nhs", " plan", " recipes", " for arthritis", " evidence", " shopping list",
    " 7 day", " for seniors", " reviews", " does it work"]
for t in diet:
    for m in diet_mods:
        add(t + m, "informational", "diet", "diet", "/diet-hub")

non_condition = [r for r in rows if r["category"] != "condition"]
condition = [r for r in rows if r["category"] == "condition"]
quota = 30000 - len(non_condition)
rows_final = non_condition + condition[:max(quota, 0)]
rows_final = rows_final[:30000]
with open("keywords-30000.json", "w") as f:
    json.dump(rows_final, f, separators=(",", ":"))

cat = Counter(r["category"] for r in rows_final)
intent = Counter(r["intent"] for r in rows_final)
print(f"generated={len(rows)} kept={len(rows_final)} unique={len(set(r['keyword'] for r in rows_final))}")
print("categories:", dict(cat))
print("intents:", dict(intent))
