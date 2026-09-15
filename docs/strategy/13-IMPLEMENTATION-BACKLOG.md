# 13 — Implementation backlog (MoSCoW)

User stories are written for Louis / future contractor. **Must** = Phase 1.

---

## Must have (Phase 1)

| ID | User story | Notes |
|---|---|---|
| M01 | As CEO, I can export Year 0 GA4/GSC baselines so we stop planning on fiction | `YEAR-0-ANALYTICS-BASELINE.md` |
| M02 | As a newly diagnosed visitor, I can see one clear next step on the homepage within 10 seconds | Homepage redesign |
| M03 | As a donor, I can complete giving with tracked `donate` events | Stripe path QA |
| M04 | As a visitor, I can contact the charity without relying solely on mailto | Forms |
| M05 | As clinical lead, I can record review dates on Champions and medicines pages | Checklist |
| M06 | As a keyboard user, I can reach Donate, Search, and main content | A11y Sprint A |
| M07 | As SEO owner, soft-404 and generic homepage titles cannot ship | CI gates |
| M08 | As trust owner, Home shows charity 1218461 + HCPC PH128483 + educational disclaimer | Trust strip |
| M09 | As privacy owner, analytics fire only after consent | Consent QA |
| M10 | As reader, top pain/exercise/PIP URLs cite NHS/NICE-class sources | Citation pass |

---

## Should have (Phase 1–2)

| ID | User story |
|---|---|
| S01 | As HCP, I can find clinic pack and shareable patient links from one hub |
| S02 | As subscriber, I receive a welcome series |
| S03 | As member of Connect, I understand moderation and response expectations |
| S04 | As searcher, internal links move me through a cluster without orphans |
| S05 | As donor, I understand research fund progress only when figures are accurate |
| S06 | As chat user, KB covers flares, PIP, and exercise safety questions |

---

## Could have (Phase 2–3)

| ID | User story |
|---|---|
| C01 | As peer, I can join a moderated forum |
| C02 | As visitor, AI assistant cites LWA pages with retrieval |
| C03 | As HCP, I can download CPD-lite slide kits |
| C04 | As editor, I have a content inventory dashboard |

---

## Won’t have (this year unless funded/regulated)

| ID | Item |
|---|---|
| W01 | Emergency Next.js rewrite without engineer funding |
| W02 | Diagnostic AI / image diagnosis |
| W03 | Invented testimonials or traffic PR |
| W04 | Public Oswestry registered address on site |
| W05 | Restoring Cloudflare/Supabase into live repo from this pack alone |
| W06 | Claiming peer parity with Arthritis Foundation US |

---

## Suggested Phase 1 sprint order

1. Baseline export (M01)  
2. CI/soft-404 hygiene (M07)  
3. Homepage hierarchy (M02) + trust strip (M08)  
4. Forms (M04) + donate QA (M03)  
5. A11y Sprint A (M06)  
6. Clinical + citations (M05, M10)  
7. Consent (M09)

*Next: [14-KPI-DASHBOARD.md](./14-KPI-DASHBOARD.md)*
