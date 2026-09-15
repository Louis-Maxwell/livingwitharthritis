# Living With Arthritis UK — 12-month digital strategy pack

**Organisation:** Living With Arthritis (Charity Commission England & Wales **1218461**)  
**Founder / clinical lead:** Louis Maxwell, HCPC **PH128483**, CSP member, First Contact Practitioner  
**Site:** https://livingwitharthritis.org.uk/  
**Stack today:** Vite + React on Lovable + GitHub (CI deploy gate shipped)  
**Document date:** 15 September 2026 (Europe/London)  
**Audience:** Louis Maxwell (CEO / clinical lead), board, future funders and engineers

## How to use this pack

1. Start with **[00-EXECUTIVE-BRIEF.md](./00-EXECUTIVE-BRIEF.md)** — diagnosis, ambition, what not to do, Lovable-now vs rebuild-later.
2. Use **[01-COMPETITOR-GAP-ANALYSIS.md](./01-COMPETITOR-GAP-ANALYSIS.md)** when briefing partners or justifying investment.
3. Treat **[09-FEATURE-ROADMAP.md](./09-FEATURE-ROADMAP.md)** and **[13-IMPLEMENTATION-BACKLOG.md](./13-IMPLEMENTATION-BACKLOG.md)** as the working delivery spine for Phase 1.
4. Keep **[14-KPI-DASHBOARD.md](./14-KPI-DASHBOARD.md)** blank until GA4/GSC Year 0 baselines are exported (`docs/YEAR-0-ANALYTICS-BASELINE.md`).
5. One-file rollup for board packs: **[LWA-12-MONTH-DIGITAL-STRATEGY.md](./LWA-12-MONTH-DIGITAL-STRATEGY.md)**.

## File index

| # | File | Purpose |
|---|---|---|
| 00 | [00-EXECUTIVE-BRIEF.md](./00-EXECUTIVE-BRIEF.md) | Diagnosis, staged goals, investment thesis |
| 01 | [01-COMPETITOR-GAP-ANALYSIS.md](./01-COMPETITOR-GAP-ANALYSIS.md) | Six-benchmark gap table |
| 02 | [02-INFORMATION-ARCHITECTURE.md](./02-INFORMATION-ARCHITECTURE.md) | Sitemap mapped to existing routes |
| 03 | [03-HOMEPAGE-REDESIGN.md](./03-HOMEPAGE-REDESIGN.md) | Homepage spec + wireframes + flows |
| 04 | [04-ACCESSIBILITY-WCAG-22-AA.md](./04-ACCESSIBILITY-WCAG-22-AA.md) | A11y audit plan |
| 05 | [05-TRUST-EEAT-ROADMAP.md](./05-TRUST-EEAT-ROADMAP.md) | E-E-A-T / medical review |
| 06 | [06-COMMUNITY-FEATURES.md](./06-COMMUNITY-FEATURES.md) | Community product (when funded) |
| 07 | [07-CONTENT-STRATEGY.md](./07-CONTENT-STRATEGY.md) | Clusters + cornerstone path |
| 08 | [08-SEO-GROWTH-STRATEGY.md](./08-SEO-GROWTH-STRATEGY.md) | Technical SEO + ramp to aspirational 100k |
| 09 | [09-FEATURE-ROADMAP.md](./09-FEATURE-ROADMAP.md) | Phase 1–3 with cost bands |
| 10 | [10-TECHNICAL-ARCHITECTURE.md](./10-TECHNICAL-ARCHITECTURE.md) | Current vs target; rebuild trigger |
| 11 | [11-AI-INNOVATION-SPECS.md](./11-AI-INNOVATION-SPECS.md) | AI assistant specs + clinical safety |
| 12 | [12-CONVERSION-ANALYTICS.md](./12-CONVERSION-ANALYTICS.md) | Funnels, A/B, GA4 `G-ZLLSD3PXZ9` |
| 13 | [13-IMPLEMENTATION-BACKLOG.md](./13-IMPLEMENTATION-BACKLOG.md) | MoSCoW backlog + user stories |
| 14 | [14-KPI-DASHBOARD.md](./14-KPI-DASHBOARD.md) | KPIs without fake baselines |
| — | [LWA-12-MONTH-DIGITAL-STRATEGY.md](./LWA-12-MONTH-DIGITAL-STRATEGY.md) | Board rollup |

## Hard constraints (apply to all recommendations)

- Do not invent visitor counts, donation totals, or patient testimonials.
- Year 0 traffic baseline: **LOCKED** `Y0-28d-2026-08-18` (15 Sep 2026) in `docs/YEAR-0-ANALYTICS-BASELINE.md`.
- Do not place the Oswestry registered address on the public site.
- Clinical content remains educational, not diagnostic.
- Competing with Arthritis Foundation (US) as an equal peer within 12 months is unrealistic; goal is **credible UK digital leader on a clear path**.
- **100k+ monthly organic** is **aspirational** — intermediate KPIs apply first.
- Harden the current Lovable/Vite stack in Phase 1. Next.js / Supabase / Vercel is a **future rebuild when funded**, not an emergency rewrite this quarter.
- This pack is strategy only — do not restore Cloudflare/Supabase into the live repo from these documents.

## Known grounded state (public / repo, Sep 2026)

- ~**505** blog articles cited on the live homepage library band.
- Research fund progress shown publicly: **£5,000 of £50,000** (10%).
- Symptom checker, local canned chatbot, Champions SEO work, CI deploy gate, soft-404/city prerender gaps partially fixed, mailto forms still a conversion friction risk.
- Charity registered **15 June 2026** (new organisation — digital maturity expected to lag multi-decade peers).

---

*Prepared as a senior consulting deliverable for Louis Maxwell. UK English throughout.*
