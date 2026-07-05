#!/usr/bin/env python3
"""Generate ~5000 deduplicated, categorised UK keywords for Living With Arthritis.

Domains: arthritis, musculoskeletal, disability, frailty, elderly people.
Output: keywords.generated.ts (typed) + keywords.generated.json (raw).

Each keyword row: { keyword, intent, category, cluster, targetPage }
- intent: informational | commercial | transactional | navigational | local
- category: condition | exercise | diet | pain | flare | benefits | msk |
            frailty | elderly | disability | caregiving | treatment | local | trust
"""
import json, re

BASE = "https://livingwitharthritis.org.uk"
rows = []
seen = set()

def add(keyword, intent, category, cluster, target):
    k = re.sub(r"\s+", " ", keyword.strip().lower())
    if not k or k in seen:
        return
    seen.add(k)
    rows.append({
        "keyword": k,
        "intent": intent,
        "category": category,
        "cluster": cluster,
        "targetPage": target,
    })

# ---------- vocab ----------
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
    "cervical arthritis": "/conditions/osteoarthritis",
    "inflammatory arthritis": "/conditions/rheumatoid-arthritis",
    "degenerative arthritis": "/conditions/osteoarthritis",
    "seronegative arthritis": "/conditions/rheumatoid-arthritis",
}

joints = ["knee", "hip", "hand", "shoulder", "elbow", "wrist", "thumb", "finger",
          "ankle", "foot", "neck", "back", "spine", "toe", "jaw"]

info_templates = [
    "{c} symptoms", "{c} causes", "{c} treatment", "{c} diagnosis", "early signs of {c}",
    "what is {c}", "how to manage {c}", "living with {c}", "{c} flare up", "{c} in the morning",
    "{c} pain relief", "{c} exercises", "{c} diet", "{c} home remedies", "{c} stages",
    "{c} prognosis", "{c} vs osteoarthritis", "is {c} hereditary", "{c} and fatigue",
    "{c} nhs waiting times", "{c} nice guidelines", "{c} self management", "{c} explained",
    "{c} risk factors", "{c} complications", "{c} without medication", "{c} natural treatment",
    "how serious is {c}", "can {c} be cured", "{c} life expectancy", "{c} support uk",
    "{c} blood test", "{c} x ray", "{c} physiotherapy", "{c} swelling", "{c} stiffness",
]

commercial_templates = [
    "best supplements for {c}", "best mattress for {c}", "best shoes for {c}",
    "{c} braces", "{c} support gloves", "{c} gel", "{c} cream", "{c} tens machine",
    "{c} walking aids", "{c} ergonomic tools", "best painkillers for {c}",
    "{c} physiotherapist near me", "private {c} treatment cost uk", "{c} clinic uk",
    "{c} orthotics", "heat pads for {c}", "compression gloves for {c}",
]

question_templates = [
    "what helps {c} pain at home", "what foods make {c} worse", "can exercise make {c} worse",
    "should i rest or exercise with {c}", "when should i see a doctor about {c}",
    "how to sleep with {c}", "how to reduce {c} inflammation", "is {c} a disability uk",
    "can i claim pip for {c}", "does {c} qualify for a blue badge",
    "what weather is best for {c}", "how to explain {c} to family",
]

# ---------- condition-driven keywords ----------
for c, target in conditions.items():
    for t in info_templates:
        add(t.format(c=c), "informational", "condition", c, target)
    for t in commercial_templates:
        add(t.format(c=c), "commercial", "treatment", c, target)
    for t in question_templates:
        add(t.format(c=c), "informational", "condition", c, target)

# ---------- joint × exercise cluster ----------
ex_templates = [
    "{j} arthritis exercises", "best exercises for {j} arthritis", "{j} strengthening exercises",
    "{j} stretches for arthritis", "{j} mobility exercises", "gentle {j} exercises for seniors",
    "{j} exercises to avoid with arthritis", "seated {j} exercises", "{j} physiotherapy exercises",
    "{j} exercises at home", "{j} exercises for over 60s", "{j} pain exercises nhs",
    "how to strengthen {j} with arthritis", "safe {j} workout arthritis",
]
for j in joints:
    for t in ex_templates:
        add(t.format(j=j), "informational", "exercise", f"{j} exercise", "/exercise-hub")

# ---------- diet cluster ----------
diet_terms = [
    "anti inflammatory diet for arthritis", "mediterranean diet arthritis", "foods to avoid with arthritis",
    "best foods for joint pain", "turmeric for arthritis", "omega 3 for arthritis",
    "ginger for inflammation", "arthritis diet plan uk", "anti inflammatory recipes uk",
    "does sugar cause inflammation", "dairy and arthritis", "gluten and arthritis",
    "weight loss for knee arthritis", "supplements for joint health", "glucosamine and chondroitin",
    "collagen for joints", "vitamin d and arthritis", "arthritis breakfast ideas",
    "anti inflammatory snacks", "arthritis meal prep", "cod liver oil for joints",
    "cherry juice for gout", "purine foods to avoid gout", "arthritis and alcohol",
    "hydration and joint pain", "arthritis friendly cooking", "best oily fish for arthritis",
]
diet_modifiers = ["", " uk", " nhs", " evidence", " reviews", " that work", " for beginners",
                  " for seniors", " for elderly", " plan", " list", " 7 day"]
for d in diet_terms:
    for m in diet_modifiers:
        add(d + m, "informational", "diet", "diet", "/diet-hub")

# ---------- pain & flare cluster ----------
pain_terms = [
    "arthritis pain relief at home", "how to ease arthritis pain", "natural arthritis pain relief",
    "arthritis flare up what to do", "arthritis flare up causes", "arthritis flare up treatment",
    "how long does an arthritis flare last", "reduce joint inflammation fast",
    "heat or ice for arthritis", "arthritis pain at night", "arthritis morning stiffness relief",
    "arthritis pain in cold weather", "topical pain relief arthritis", "tens machine for arthritis",
    "best painkiller for arthritis uk", "codeine for arthritis", "naproxen for arthritis",
    "arthritis pain management plan", "chronic joint pain help", "flare up survival kit",
]
pain_mods = ["", " uk", " nhs", " for elderly", " without medication", " quickly", " overnight"]
for p in pain_terms:
    for m in pain_mods:
        add(p + m, "informational", "pain", "pain & flare", "/guides/arthritis-pain-relief")

# ---------- musculoskeletal cluster ----------
msk_terms = [
    "musculoskeletal health", "msk conditions", "musculoskeletal pain causes", "msk physiotherapy",
    "back pain and arthritis", "joint hypermobility", "tendonitis vs arthritis", "bursitis treatment",
    "sciatica exercises", "lower back pain relief", "muscle loss with age", "sarcopenia treatment",
    "how to build muscle after 60", "bone density exercises", "osteoporosis and arthritis",
    "improve grip strength elderly", "balance exercises for seniors", "posture and joint pain",
    "msk waiting list nhs", "first contact practitioner msk", "physiotherapy self referral uk",
    "joint protection techniques", "occupational therapy arthritis", "hydrotherapy for joints",
    "walking for joint health", "swimming for arthritis", "tai chi for arthritis",
    "yoga for arthritis", "pilates for joint pain", "resistance bands for seniors",
]
msk_mods = ["", " uk", " nhs", " for over 60s", " for elderly", " at home", " guide", " exercises"]
for t in msk_terms:
    for m in msk_mods:
        add(t + m, "informational", "msk", "musculoskeletal", "/guides/musculoskeletal-health")

# ---------- frailty & elderly cluster ----------
frailty_terms = [
    "frailty in elderly", "how to prevent frailty", "frailty assessment", "clinical frailty scale",
    "fall prevention for elderly", "how to prevent falls at home", "strength and balance classes",
    "otago exercise programme", "mobility aids for elderly", "getting up after a fall",
    "elderly muscle weakness", "staying active in old age", "exercise for over 70s",
    "chair exercises for seniors", "gentle exercise for elderly", "arthritis in old age",
    "elderly joint pain help", "home adaptations for arthritis", "grab rails for bathroom",
    "walking frame vs rollator", "care at home for arthritis", "loneliness and chronic pain",
    "keeping independent with arthritis", "elderly nutrition for muscle", "protein for older adults",
    "vitamin d for over 65s", "winter safety for elderly", "cold weather joint pain elderly",
]
frailty_mods = ["", " uk", " nhs", " guide", " tips", " at home", " near me", " free"]
for t in frailty_terms:
    for m in frailty_mods:
        cat = "frailty" if "frail" in t or "fall" in t else "elderly"
        add(t + m, "informational", cat, "frailty & elderly", "/guides/frailty-management-hub")

# ---------- disability & benefits cluster ----------
benefits_terms = [
    "pip for arthritis", "how to claim pip arthritis", "pip points for arthritis",
    "pip mobility arthritis", "attendance allowance arthritis", "universal credit arthritis",
    "blue badge for arthritis", "blue badge hidden disability", "disability benefits uk arthritis",
    "adult disability payment scotland", "access to work arthritis", "esa for arthritis",
    "pip assessment tips arthritis", "pip appeal arthritis", "is arthritis a disability uk",
    "equality act arthritis workplace", "reasonable adjustments arthritis work",
    "council tax reduction disability", "motability scheme arthritis", "carers allowance uk",
    "disabled facilities grant", "vat relief disability aids", "free prescriptions arthritis",
    "bus pass disability uk", "railcard disabled persons", "warm home discount disability",
]
benefits_mods = ["", " 2026", " uk", " how much", " eligibility", " form help", " calculator",
                 " explained", " checklist"]
for t in benefits_terms:
    for m in benefits_mods:
        add(t + m, "commercial", "benefits", "disability & benefits", "/guides/benefits-pip")

# ---------- caregiving cluster ----------
carer_terms = [
    "how to help someone with arthritis", "caring for elderly parent with arthritis",
    "carer support arthritis uk", "helping a partner with chronic pain",
    "arthritis carer tips", "supporting someone newly diagnosed arthritis",
    "carer burnout help uk", "respite care arthritis", "carer assessment uk",
    "adaptations for a disabled relative", "communicating about chronic pain",
]
carer_mods = ["", " uk", " nhs", " guide", " advice", " near me"]
for t in carer_terms:
    for m in carer_mods:
        add(t + m, "informational", "caregiving", "caregiving", "/guides/disability-support")

# ---------- local SEO cluster (city × intent) ----------
cities = ["london", "manchester", "birmingham", "leeds", "glasgow", "liverpool", "bristol",
          "sheffield", "edinburgh", "cardiff", "newcastle", "nottingham", "belfast", "leicester",
          "southampton", "portsmouth", "brighton", "coventry", "hull", "plymouth", "stoke",
          "wolverhampton", "derby", "swansea", "sunderland", "oxford", "cambridge", "york",
          "oswestry", "shrewsbury", "telford", "chester", "wrexham", "reading", "milton keynes",
          "aberdeen", "dundee", "norwich", "exeter", "bournemouth"]
local_templates = [
    "arthritis support {city}", "arthritis physiotherapy {city}", "arthritis clinic {city}",
    "rheumatology {city} nhs", "arthritis exercise class {city}", "tai chi classes {city}",
    "hydrotherapy pool {city}", "arthritis support group {city}", "physiotherapy near me {city}",
    "arthritis help {city}",
]
for city in cities:
    slug = city.replace(" ", "-")
    target = f"/arthritis-support/{slug}"
    for t in local_templates:
        add(t.format(city=city), "local", "local", f"local:{city}", target)

# ---------- trust / brand / navigational ----------
trust_terms = [
    "living with arthritis charity", "living with arthritis uk", "is living with arthritis a real charity",
    "living with arthritis charity number", "free arthritis physiotherapy uk",
    "arthritis charity donation uk", "gift aid arthritis donation", "arthritis charity gift aid",
    "trusted arthritis information uk", "medically reviewed arthritis advice",
    "arthritis charity vs versus arthritis", "best arthritis websites uk",
    "arthritis foundation uk equivalent", "nhs approved arthritis exercises",
]
for t in trust_terms:
    intent = "navigational" if "living with arthritis" in t else "informational"
    add(t, intent, "trust", "trust & brand", "/trust-credibility")

# ---------- glossary / definitions (GEO) ----------
glossary = ["dmard", "biologic drugs", "nsaid", "corticosteroid injection", "synovium",
            "cartilage", "hla-b27", "rheumatoid factor", "anti-ccp", "esr blood test",
            "crp inflammation", "joint effusion", "crepitus", "flare up", "remission arthritis",
            "seronegative", "enthesitis", "dactylitis", "morning stiffness", "bone spurs",
            "osteophytes", "subchondral", "pannus", "ankylosis", "uric acid", "tophi",
            "physiotherapy triage", "musculoskeletal", "proprioception", "range of motion"]
for g in glossary:
    add(f"what is {g}", "informational", "treatment", "glossary", "/glossary")
    add(f"{g} meaning", "informational", "treatment", "glossary", "/glossary")
    add(f"{g} explained", "informational", "treatment", "glossary", "/glossary")

# ---------- treatment / comparison (GEO) ----------
comparisons = [
    "paracetamol vs ibuprofen for arthritis", "glucosamine vs turmeric", "heat vs cold for joints",
    "swimming vs walking for arthritis", "yoga vs pilates for arthritis",
    "knee replacement vs injections", "physiotherapy vs surgery arthritis",
    "nhs vs private rheumatology", "tens vs heat therapy", "walking stick vs crutch",
    "rollator vs walking frame", "steroid injection vs hyaluronic acid",
    "biologics vs dmards", "osteoarthritis vs rheumatoid arthritis",
    "arthritis vs fibromyalgia", "gout vs pseudogout", "bursitis vs arthritis",
    "tendonitis vs arthritis", "sciatica vs hip arthritis",
]
comp_mods = ["", " uk", " which is better", " for seniors", " nhs", " reviews"]
for c in comparisons:
    for m in comp_mods:
        add(c + m, "commercial", "treatment", "comparisons", "/guides/arthritis-pain-relief")

# ---------- newly diagnosed / first steps ----------
newly = [
    "just diagnosed with arthritis", "arthritis first 30 days", "what to do after arthritis diagnosis",
    "questions to ask rheumatologist", "arthritis newly diagnosed guide", "coming to terms with arthritis",
    "arthritis and mental health", "depression and chronic pain uk", "arthritis fatigue management",
    "working with arthritis", "telling my employer about arthritis", "driving with arthritis uk",
]
newly_mods = ["", " uk", " nhs", " advice", " help", " checklist", " support"]
for t in newly:
    for m in newly_mods:
        add(t + m, "informational", "condition", "newly diagnosed", "/guides/newly-diagnosed")

# ---------- symptoms & daily-living longtails ----------
daily_terms = [
    "how to open jars with arthritis", "dressing aids for arthritis", "kitchen gadgets for arthritis",
    "best pillow for neck arthritis", "how to garden with arthritis", "arthritis friendly exercise dvd",
    "typing with arthritis", "driving aids for arthritis hands", "arthritis and sleep problems",
    "best chair for arthritis sufferers", "getting out of bed with arthritis", "arthritis stair aids",
    "shoes for swollen arthritic feet", "arthritis gloves for typing", "jar openers for weak hands",
    "button hooks for arthritis", "arthritis friendly phone", "voice control for disabled hands",
    "raised toilet seat arthritis", "long handled shoe horn", "easy grip cutlery elderly",
    "arthritis walking shoes womens", "arthritis walking shoes mens", "electric can opener arthritis",
]
daily_mods = ["", " uk", " reviews", " amazon uk", " best", " nhs", " cheap"]
for t in daily_terms:
    for m in daily_mods:
        intent = "commercial" if any(w in t for w in ["best", "aids", "gadgets", "shoes", "chair", "pillow", "gloves", "opener", "cutlery", "seat", "horn"]) else "informational"
        add(t + m, intent, "elderly", "daily living", "/health-tools")

# ---------- women / men / age specific ----------
demo_terms = [
    "arthritis in women", "menopause and joint pain", "arthritis after pregnancy",
    "arthritis in your 30s", "arthritis in your 40s", "early onset arthritis",
    "arthritis in men", "arthritis and testosterone", "hand arthritis in women",
    "hormones and joint pain", "arthritis after 50", "arthritis in young adults",
]
demo_mods = ["", " uk", " symptoms", " treatment", " causes", " help", " nhs"]
for t in demo_terms:
    for m in demo_mods:
        add(t + m, "informational", "condition", "demographics", "/conditions/osteoarthritis")

# ---------- prevention & lifestyle ----------
prevent_terms = [
    "how to prevent arthritis", "reduce arthritis risk", "joint health tips",
    "protect your knees", "exercise to prevent joint pain", "healthy joints diet",
    "smoking and arthritis", "obesity and osteoarthritis", "occupation and arthritis risk",
    "genetics and arthritis risk", "stay mobile as you age", "keep joints healthy over 50",
]
prevent_mods = ["", " uk", " naturally", " tips", " guide", " nhs", " for life"]
for t in prevent_terms:
    for m in prevent_mods:
        add(t + m, "informational", "msk", "prevention", "/guides/preventative-msk-health")

# ---------- top up toward 5000 with joint×condition×modifier longtails ----------
extra_mods = ["nhs", "uk", "at home", "for seniors", "for over 60s", "for over 70s", "without surgery",
              "exercises pdf", "free guide", "support near me", "reddit uk", "forum uk",
              "self help", "video", "nice guideline", "physiotherapy plan"]
for c in conditions:
    for m in extra_mods:
        add(f"{c} {m}", "informational", "condition", c, conditions[c])
        if len(rows) >= 5000:
            break
    if len(rows) >= 5000:
        break

# top-up if still short: joint + generic
if len(rows) < 5000:
    for j in joints:
        for m in extra_mods:
            add(f"{j} joint pain {m}", "informational", "msk", "joint pain", "/guides/musculoskeletal-health")
            if len(rows) >= 5000:
                break
        if len(rows) >= 5000:
            break

# ---------- research / statistics / awareness (GEO authority) ----------
stat_terms = [
    "arthritis statistics uk", "how many people have arthritis uk", "arthritis prevalence uk",
    "cost of arthritis to nhs", "arthritis research uk", "new arthritis treatments 2026",
    "arthritis awareness week uk", "world arthritis day", "arthritis and work statistics uk",
    "osteoarthritis statistics", "rheumatoid arthritis statistics uk", "gout prevalence uk",
    "arthritis waiting times nhs", "rheumatology waiting list uk", "arthritis in the workplace uk",
    "economic impact of arthritis", "arthritis disability statistics uk", "musculoskeletal conditions uk stats",
]
stat_mods = ["", " 2026", " latest", " report", " data", " nhs", " explained"]
for t in stat_terms:
    for m in stat_mods:
        add(t + m, "informational", "trust", "research & stats", "/guides/uk-arthritis")

# ---------- region-level ----------
regions = ["england", "scotland", "wales", "northern ireland"]
region_templates = [
    "arthritis support {r}", "rheumatology waiting times {r}", "physiotherapy self referral {r}",
    "arthritis services {r} nhs", "disability benefits {r}", "blue badge scheme {r}",
]
for r in regions:
    slug = r.replace(" ", "-")
    for t in region_templates:
        add(t.format(r=r), "local", "local", f"region:{r}", f"/regions/{slug}")

# ---------- final deterministic fill to exactly 5000 (condition × city) ----------
for city in cities:
    slug = city.replace(" ", "-")
    for c, target in conditions.items():
        add(f"{c} help in {city}", "local", "local", f"local:{city}", f"/arthritis-support/{slug}")
        if len(rows) >= 5000:
            break
    if len(rows) >= 5000:
        break

rows = rows[:5000]

# ---------- write outputs ----------
with open("keywords.generated.json", "w") as f:
    json.dump(rows, f, indent=0)

# summary
from collections import Counter
cat = Counter(r["category"] for r in rows)
intent = Counter(r["intent"] for r in rows)

header = f"""// AUTO-GENERATED — do not edit by hand. Regenerate with scripts/generate-keywords.py
// {len(rows)} deduplicated UK keywords across arthritis, musculoskeletal,
// disability, frailty and elderly-care topics. Used by the Keyword Strategy
// dashboard (/admin/keyword-strategy) and to inform internal-linking + meta.
//
// Categories: {dict(cat)}
// Intents:    {dict(intent)}

export type KeywordIntent =
  | "informational" | "commercial" | "transactional" | "navigational" | "local";

export interface KeywordRow {{
  keyword: string;
  intent: KeywordIntent;
  category: string;
  cluster: string;
  targetPage: string;
}}

export const GENERATED_KEYWORDS: KeywordRow[] = """

with open("keywords.generated.ts", "w") as f:
    f.write(header)
    f.write(json.dumps(rows, indent=2))
    f.write(";\n\nexport default GENERATED_KEYWORDS;\n")

print(f"Wrote {len(rows)} keywords")
print("By category:", dict(cat))
print("By intent:", dict(intent))
