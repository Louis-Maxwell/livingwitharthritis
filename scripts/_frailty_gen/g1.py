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
