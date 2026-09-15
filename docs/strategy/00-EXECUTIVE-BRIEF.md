# 00 — Executive brief

**Living With Arthritis UK · Charity 1218461**  
**12-month digital redesign & enhancement strategy**  
**15 September 2026 (Europe/London)**

---

## 1. Diagnosis (honest)

Living With Arthritis UK is a **new** England-and-Wales CIO (registered June 2026) with an unusually strong digital footprint for its age: a large educational library (~505 articles on the public site), condition hubs, exercise and diet pathways, a symptom checker, a local educational chatbot, Stripe donations, research-fund progress (**£5k of £50k** as shown publicly), and recent engineering hygiene (CI deploy gate, soft-404/city prerender work, Champions SEO).

It is **not** yet a peer of Arthritis Foundation (US) or Arthritis UK (formerly Versus Arthritis) on brand recognition, research endowment, helpline scale, or organic market share. Framing a 12-month plan as “catch the US Arthritis Foundation” would set the organisation up to fail. The correct ambition is:

> Become a **credible UK digital leader** for practical, clinician-reviewed living-with-arthritis guidance — visibly independent, trustworthy, and growing on a staged KPI path — while the charity builds community, fundraising, and clinical governance capacity.

**Year 0 traffic baseline is not yet exported.** Do not quote monthly sessions or organic users until Louis completes the GA4/GSC export in `docs/YEAR-0-ANALYTICS-BASELINE.md` (property `G-ZLLSD3PXZ9`).

### Strengths to protect

| Strength | Evidence |
|---|---|
| Clinician-founded E-E-A-T core | Louis Maxwell, HCPC PH128483, FCP / advanced physio practice |
| Content volume | ~505 articles; hubs for OA/RA, exercise, diet, mental health, PIP |
| UK pathway language | NHS / FCP / MSK / PIP framing (competitive vs US publishers) |
| Product experiments | Symptom checker, joint picker, local chatbot, research fund meter |
| Engineering discipline improving | GitHub CI gate on Lovable deploy; prerender/soft-404 remediation |

### Structural gaps vs mature competitors

1. **Trust density** — single named clinical reviewer vs multi-specialty medical boards (Mayo/Cleveland/Arthritis Foundation).
2. **Community depth** — Connect Groups / Buddy exist as product surfaces; moderated forums and helpline scale lag Arthritis Foundation / Arthritis Action membership models.
3. **Conversion plumbing** — mailto-heavy contact paths; donation and newsletter funnels need measurement-led iteration after baseline export.
4. **SSR / crawl predictability** — SPA + prerender on Lovable is workable but not equal to NHS/Mayo document architecture.
5. **Brand / backlink moat** — decades of .gov/.nhs/.edu citations favour Arthritis UK, NHS, NRAS.
6. **Accessibility polish** — WCAG 2.2 AA must be treated as a delivery programme, not a badge claim.
7. **Homepage clarity** — strong empathy, but competing CTAs (donate, Zakat, joint picker, symptom quiz, research meter) dilute primary jobs-to-be-done.
8. **HCP channel** — Healthcare Professionals section is under-specified vs specialist-society expectations.
9. **Operational capacity** — founder-led clinical + product + fundraising; Phase 1 must be doable without a full engineering team.
10. **Index quality risk** — city/local templates and thin variants remain a soft-404/SEO debt class even after partial fixes.

---

## 2. Ambition (12 months)

**North star (12 months):** Recognised among UK arthritis seekers as a trustworthy *practical living* destination — second-wave choice after NHS/Arthritis UK for day-to-day self-management — with measurable growth in organic visibility, newsletter, donations, and peer-support engagement.

**Positioning line (internal):**  
*Independent UK charity. Clinician-reviewed education. Peer support. Not a diagnosis service. Not Arthritis UK.*

**What success looks like (qualitative):**

- Homepage and IA make the four primary journeys obvious in under 10 seconds.
- Top Champions pages pass clinical review, citation, and a11y gates.
- Year 0 baselines published internally; Month 6 and Month 12 show clear directional improvement (not invented multiples).
- Lovable stack is hardened (performance, forms, prerender, CI) so a future Next.js rebuild is a *choice*, not a rescue.

---

## 3. Staged goals (do not skip stages)

### Phase 1 — Months 0–3: Harden & clarify (Lovable)

| Goal | Intermediate KPI (no fake baselines) |
|---|---|
| Export Year 0 GA4 + GSC | Tables in `YEAR-0-ANALYTICS-BASELINE.md` filled |
| Homepage IA + CTA hierarchy | One primary path per persona; donate secondary until path chosen |
| Forms off mailto where possible | Contact / volunteer / HCP enquiry → tracked submit events |
| Soft-404 / city / Champions hygiene | Zero known soft-404 patterns on Champions; GSC coverage triage |
| Clinical review ritual | Checklist used on all medicines / red-flag / exercise Champions |
| A11y sprint 1 | Skip link, focus, contrast, form labels on top templates |
| Research fund honesty | Keep public meter accurate (£5k / £50k until updated from real gifts) |

### Phase 2 — Months 4–8: Depth & distribution

| Goal | Intermediate KPI |
|---|---|
| Cornerstone programme | Path toward **~40–60** true cornerstones (not claiming 200 already exist) from the ~505-post corpus |
| UK backlink programme | Charity directories, MSK partners, guest explainers — track referring domains |
| Community MVP (lightweight) | Connect Groups + Buddy quality; forum only if moderation funded |
| Newsletter nurture | Welcome series live; open/click reported from real ESP data |
| Organic ramp | **Target band (aspirational intermediate):** meaningful MoM organic click growth from Year 0 — exact % set after baseline |

### Phase 3 — Months 9–12: Scale prep + rebuild decision

| Goal | Intermediate KPI |
|---|---|
| Evaluate Next.js/Supabase/Vercel rebuild | Go/no-go against revenue/grants + dedicated eng budget |
| HCP microsite depth | Clinic pack downloads + HCP newsletter segment |
| AI assistant v2 | Still educational; clinical safety case documented |
| **100k monthly organic** | **Aspirational Phase goal** — label as stretch; success if ramp trajectory and authority metrics justify continued investment even if 100k is not hit |

---

## 4. What NOT to do

1. **Do not** rewrite the stack to Next.js this quarter without funded engineering capacity.
2. **Do not** restore Cloudflare Workers / Supabase into the live repo as an emergency “quick fix” from this strategy pack.
3. **Do not** invent testimonials, traffic figures, or cure claims for PR or SEO.
4. **Do not** put the Oswestry registered address on the public website; use Charity Commission register linkage and appropriate contact channels.
5. **Do not** position LWA as clinically authoritative over NHS/NICE pathways.
6. **Do not** ship diagnostic AI, dose advice, or treatment plans.
7. **Do not** chase US Arthritis Foundation feature parity (helpline staffing, research grants at scale) in Year 1.
8. **Do not** publish “200 cornerstones” or “100k organic” as current facts.
9. **Do not** expand city pages without unique value — thin local pages recreate soft-404 risk.
10. **Do not** let donate/Zakat/research CTAs bury the newly diagnosed journey on the homepage.

---

## 5. Investment thesis: Lovable now vs rebuild later

| Question | Recommendation |
|---|---|
| Stay on Lovable + Vite/React + GitHub? | **Yes for Phase 1–2**, unless a grant specifically funds an engineer for a rebuild. |
| Why? | Content and conversion work dominate ROI; stack rewrite burns months of founder time for little user-visible gain while CI/prerender are improving. |
| When to rebuild (Next.js + TypeScript + Tailwind + Supabase/Postgres + Vercel)? | When **dedicated engineering** is funded **and** SSR/auth/community/forum requirements exceed what a hardened SPA + prerender can safely deliver. |
| Emergency rewrite this quarter? | **No.** |
| Parallel work that reduces rebuild cost later | Clean IA, component discipline, content model (hubs/cornerstones), analytics events, a11y patterns, clinical metadata (`lastReviewed`, author/reviewer). |

**Board one-liner:**  
*Spend the next two quarters making the current site trustworthy, fast, measurable, and clear. Buy the Next.js rebuild when income or grants can pay for an engineer — not before.*

---

## 6. Recommended investment shape (indicative)

Figures are **order-of-magnitude bands** for planning, not quotes.

| Phase | Focus | Indicative cash + time |
|---|---|---|
| 1 (0–3 mo) | Harden Lovable, IA, a11y, forms, Champions, baseline analytics | **£2k–£12k** tools/contractors + heavy founder clinical time |
| 2 (4–8 mo) | Content depth, SEO/backlinks, community MVP, conversion tests | **£8k–£35k** (content, moderation trials, design) |
| 3 (9–12 mo) | Scale features + rebuild go/no-go | **£0** if no rebuild; **£40k–£120k+** if funded Next.js rebuild + backend |

---

## 7. Decision asked of Louis / board

1. Approve Phase 1 scope: **harden current stack**, not rewrite.
2. Complete Year 0 analytics export within 14 days of adopting this pack.
3. Ring-fence clinical review time for Champions and medicines pages.
4. Defer full community forum and LLM chatbot until moderation + safety budget exists.
5. Treat **100k organic** as a stretch north star with intermediate GSC click/impression milestones.

---

*Next document: [01-COMPETITOR-GAP-ANALYSIS.md](./01-COMPETITOR-GAP-ANALYSIS.md)*
