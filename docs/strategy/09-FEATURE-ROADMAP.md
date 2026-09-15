# 09 — Feature roadmap (12 months)

**Complexity:** 1 (trivial) – 5 (major). **Impact:** qualitative High/Med/Low for users or revenue.  
**Cost bands:** indicative GBP cash cost excluding founder time.

---

## Phase 1 — Months 0–3: Harden Lovable site

| ID | Feature | Complexity | Impact | Cost band | Tech notes |
|---|---|---|---|---|---|
| P1-01 | Year 0 GA4/GSC baseline export | 1 | High | £0 | `G-ZLLSD3PXZ9` |
| P1-02 | Homepage CTA / IA hierarchy | 2 | High | £0–£3k | Lovable/React |
| P1-03 | Contact/volunteer forms off mailto | 3 | High | £1k–£5k | Existing analytics events |
| P1-04 | Soft-404 / prerender / Champions CI gates | 3 | High | £0–£4k | Continue current CI |
| P1-05 | A11y Sprint A (keyboard, contrast, focus) | 3 | High | £1k–£6k | axe in CI |
| P1-06 | Clinical review on Champions + medicines | 2 | High | £0 (time) | Checklist |
| P1-07 | Trust strip + citation pass top URLs | 2 | High | £0–£2k | Content |
| P1-08 | Resource Centre / HCP hub aggregators | 2 | Med | £0–£3k | New thin pages |
| P1-09 | Cookie/analytics consent QA | 2 | Med | £0–£2k | DPIA already drafted |
| P1-10 | Local chatbot KB expand (still canned) | 2 | Med | £0–£2k | No live LLM required |

**Phase 1 principle:** No Next.js rewrite; no Supabase restore to live repo.

---

## Phase 2 — Months 4–8: Depth & distribution

| ID | Feature | Complexity | Impact | Cost band | Tech notes |
|---|---|---|---|---|---|
| P2-01 | Cornerstone upgrade programme (→40–60) | 3 | High | £5k–£20k | Editorial |
| P2-02 | UK backlink / partner outreach | 2 | High | £2k–£8k | Ops |
| P2-03 | Newsletter welcome + segments | 2 | High | £1k–£5k | ESP |
| P2-04 | Buddy/Connect quality + safeguarding | 3 | High | £2k–£10k | Process±light eng |
| P2-05 | Donation A/B (amounts, copy) | 2 | Med–High | £1k–£4k | GA4 |
| P2-06 | Events cadence + replay pages | 2 | Med | £1k–£6k | Content |
| P2-07 | Performance pass toward Lighthouse 95 aspirational | 3 | Med | £2k–£8k | Vite budgets |
| P2-08 | External clinical reviewer #1 (if recruited) | 2 | High | Honorarium | Governance |

---

## Phase 3 — Months 9–12: Scale prep

| ID | Feature | Complexity | Impact | Cost band | Tech notes |
|---|---|---|---|---|---|
| P3-01 | Rebuild go/no-go (Next.js/Supabase/Vercel) | 4 | Strategic | £0 decision / £40k–£120k+ build | Only if funded eng |
| P3-02 | Forum MVP | 5 | High | £15k–£50k+ | Needs moderation |
| P3-03 | AI assistant v2 (API LLM + retrieval) | 4 | Med–High | £5k–£25k | UK clinical safety case |
| P3-04 | HCP deeper toolkit | 3 | Med | £3k–£12k | |
| P3-05 | Personalisation (non-diagnostic) | 4 | Med | £5k–£20k | Privacy-heavy |

---

## Dependency graph (simple)

```text
Baseline analytics → conversion A/B
IA/homepage → content internal links → SEO
A11y + clinical review → trust → rankings
Community process → forum (later)
Hardened SPA → optional Next rebuild
```

*Next: [10-TECHNICAL-ARCHITECTURE.md](./10-TECHNICAL-ARCHITECTURE.md)*
