# M3 linkable asset PDF — scope (5 Nov 2026)

**Status:** scoped only — **not shipped**. Implementation is a later weekday after the remaining pillar gold passes (exercise, PIP).

**Chosen asset:** **PIP evidence checklist PDF** (static downloadable file that complements the existing printable page `/resources/pip-evidence-diary`).

**Not chosen this round:** MSK self-referral explainer. That remains a strong M3/M4 candidate for physio-clinic outreach, but flare and PIP already have live printable pages; the highest-ROI first PDF is a partner-ready file that deepens an asset we already review and promote, without inventing a new public URL.

---

## Why this asset (linkability + partner outreach)

1. **Complements an existing page** — `/resources/pip-evidence-diary` already has `window.print()` and UTM’d print links. A static PDF in `public/downloads/` gives Citizens Advice, welfare-rights teams, rheumatology / MSK clinics and carers’ organisations something they can host, email or print in bulk without loading our SPA.
2. **CEO plan alignment** — `docs/CEO-10-MONTH-GROWTH-EXECUTION-PLAN.md` lists “PIP checklist PDF, flare plan, MSK self-referral explainer” as quarterly linkable assets. Flare plan is already live as a printable page; PIP checklist PDF is the next natural ship.
3. **Outreach fit** — First 15 partner sends (`docs/M2-FIRST-15-OUTREACH-SEND-SHEET.md`) already alternate flare plan and PIP diary. A downloadable PDF URL is easier to cite in resource directories and NHS / LA “local offer” pages than a React route alone.
4. **No new doorway page** — scope is a file + a thin “Download PDF” control on the existing diary page, not a new public path.

---

## Content outline (1–2 sides A4)

Reviewed by **Louis Maxwell (HCPC PH128483)** before publish. Educational only — not legal advice; PIP rules can change; point readers to GOV.UK.

1. **Header** — Living With Arthritis logo, charity 1218461, title “PIP evidence checklist for arthritis (UK)”, date reviewed, “independent of Versus Arthritis / Arthritis UK”.
2. **What this is for** — one short paragraph: help you note how arthritis affects daily living and mobility on good and bad days before a PIP claim or review.
3. **Daily living prompts** (tick / note lines) — preparing food; eating and drinking; medicines; washing and bathing; toilet; dressing; communicating; reading; mixing with people; budgeting. Mirror the existing diary prompts; do not invent new entitlement claims.
4. **Mobility prompts** — planning a journey; moving around (distance, aids, rests, falls / near misses).
5. **Evidence tips** — keep a week of notes including bad days; ask GP / physio / OT for supporting letters; bring aids and medicine lists; never exaggerate and never under-describe pain, time or help needed.
6. **Redirections** — QR or short URLs to `/resources/pip-evidence-diary`, `/guides/benefits-pip`, `/faq/arthritis-disability-benefits-uk`, GOV.UK PIP.
7. **Footer** — educational disclaimer, NHS 111 / 999 for medical emergencies (not PIP), contact email / phone from `src/config/contact` (no Oswestry address).

---

## Print / PDF delivery approach

| Option | Role |
|---|---|
| **Existing** `window.print()` on `/resources/pip-evidence-diary` | Keep — browser “Print / save as PDF” for individuals |
| **New** static PDF at e.g. `public/downloads/pip-evidence-checklist.pdf` | Partner-linkable file; versioned filename or `?v=2026-11` when content changes |
| **Page enhancement** | Add a clear “Download PDF” button above the fold on the diary page (print styles unchanged) |

Prefer generating the PDF from the reviewed checklist content (HTML → print CSS → PDF, or designed once in a simple A4 layout). Do **not** upload an unverified third-party PIP form.

---

## Review

- Clinical / editorial review by **Louis Maxwell (HCPC PH128483)** before the PDF is linked publicly.
- Check GOV.UK PIP pages on the ship day for any rule wording we quote.
- Ban list: medicine doses, invented award rates or success percentages, Oswestry address, “Living With Arthritis UK”, “pending clinical review”.

---

## UTM plan

| Placement | Example |
|---|---|
| On-page download button | `?utm_source=site&utm_medium=pdf-download&utm_campaign=m3-pip-checklist&utm_content=diary-page` |
| Partner email / resource list | `?utm_source=partner&utm_medium=pdf&utm_campaign=m3-pip-checklist&utm_content={partner-slug}` |
| Clinic pack / HCP follow-up | `?utm_source=clinic-pack&utm_medium=pdf&utm_campaign=m3-pip-checklist` |
| QR on printed PDF back to diary | `?utm_source=pdf&utm_medium=qr&utm_campaign=m3-pip-checklist&utm_content=print` |

Track downloads qualitatively via server logs / GA4 file-download events once consent-gated analytics is confirmed (GA4 `G-ZLLSD3PXZ9`).

---

## Success metric (qualitative — no invented numbers)

- At least one external resource page or partner newsletter **links the PDF or diary URL** after outreach.
- On-site: download button used; diary page retains print usage.
- Do **not** claim traffic multiples until a fresh GSC/GA4 export exists.

---

## Next implementation steps (later weekday)

1. Draft A4 checklist copy from `src/pages/resources/PipEvidenceDiary.tsx` + `pipDiaryContent` (no new claims).
2. Louis Maxwell review pass.
3. Produce `public/downloads/pip-evidence-checklist.pdf`; add Download button + sitemap/llms mention if needed.
4. Vitest gate that the PDF file exists and the diary page links it.
5. Add PDF URL to partner send sheet + clinic-pack distribution doc; Louis sends.
6. Optional follow-on: MSK self-referral explainer PDF (England pattern + devolved-nation signpost) once exercise pillar is gold-passed.

