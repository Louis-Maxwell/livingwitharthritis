# 08 — SEO growth strategy

**Measurement IDs:** GA4 `G-ZLLSD3PXZ9`; GSC property for `livingwitharthritis.org.uk`.  
**Year 0 baseline:** **not yet exported** — fill `docs/YEAR-0-ANALYTICS-BASELINE.md` before claiming MoM multiples.

**Ambition framing:** **100,000 monthly organic visits/clicks** is an **aspirational Phase goal**, not a Year-1 commitment for a charity registered in mid-2026. Intermediate KPIs below matter more.

---

## Organic ramp (staged)

| Stage | Horizon | Organic KPI (set numbers after Year 0) | Focus |
|---|---|---|---|
| R0 | Week 0–2 | Baseline exported | GSC+GA4 truth |
| R1 | Mo 0–3 | Index hygiene; Champions CTR; branded query presence | Technical + trust |
| R2 | Mo 4–8 | Non-brand clicks up vs B₁; top 20 queries tracked | Content + links |
| R3 | Mo 9–12 | Trajectory review vs aspirational 100k | Authority + rebuild decision |

Do not publish “we will hit 100k in 12 months” externally without board acceptance of stretch risk.

---

## Technical SEO (harden Lovable first)

| Workstream | Action | Phase |
|---|---|---|
| Prerender / soft-404 | Continue city & dynamic route QA; CI title uniqueness gate | 1 |
| Canonical / duplicates | Library hub vs condition vs blog intent mapping | 1 |
| Sitemap | Keep sitemap accurate; exclude thin/noindex | 1 |
| CWV | Image weight, fonts, JS splitting; Lighthouse budgets already in repo | 1–2 |
| SPA meta | Ensure route-level titles/descriptions (existing patterns) | 1 |
| Internal links | Cluster nav on Champions; reduce orphan posts | 1–2 |
| SSR decision | Next.js SSG/SSR **when funded** — not emergency | 3 |

---

## Schema (JSON-LD)

Prioritise on templates:

- `Organization` + `NGO` / charity identifiers (Charity 1218461)  
- `WebSite` + `SearchAction`  
- `MedicalWebPage` / `Article` with `author`, `reviewedBy`, `dateModified`  
- `FAQPage` only for visible FAQs  
- `BreadcrumbList`  
- Avoid misleading `MedicalCondition` claims that imply diagnosis tool output

---

## Keyword opportunities (UK-oriented)

| Theme | Example terms | Volume notes | Opportunity |
|---|---|---|---|
| Head | arthritis | ~74k UK (Semrush public, Arthritis UK SERP context, Jul 2026) | Unrealistic #1 short-term; aim supporting content |
| Pain | managing arthritis pain; arthritis pain relief | High competition vs NHS/Arthritis UK | Differentiate UK living tips + pacing |
| Medicines adjacency | naproxen; glucosamine | Large volumes (public Semrush proxies) | Educational caution pages + disclaimers |
| Exercise | knee arthritis exercises UK | Strong LWA fit | Double down |
| Access | MSK self referral; PIP arthritis | UK-unique vs US sites | Priority wedge |
| Brand | living with arthritis; LWA | Build recognition | Consistency NAP-less (no public Oswestry address) |

Mark all unpaid volume figures as **estimates/proxies** until Louis’s Keyword Planner/Semrush export is attached.

---

## Competitor gaps to exploit

1. **Wait-list / FCP / MSK self-referral explainers** with local “how to find your service” patterns (without thin doorways).  
2. **Exercise product UX** (joint picker) — few charities match interactive clarity.  
3. **PIP evidence practicality** — diaries/clinic pack.  
4. **Independence narrative** for users confused with Arthritis UK.  
5. **Honest AI limits** — rare among health publishers.

Do not try to out-encyclopedia Cleveland Clinic on pathophysiology in Year 1.

---

## Backlinks for a UK charity (ethical)

| Source type | Tactic |
|---|---|
| Charity Commission / directories | Ensure listings accurate |
| Local/regional MSK & VCSE partners | Resource sharing, talks |
| University / student physio societies | Guest education pages |
| Podcasts / local radio | Founder clinician story |
| Helpful tools | Free PDFs (flare plan, PIP diary) cited by forums |
| Digital PR | Data-backed explainers (use only real analyses) |

Avoid PBN, paid link schemes, or fake testimonials for links.

---

## Champions programme

Continue SEO Champions work: speakable intros, FAQ safety, cluster nav, clinical review dates. Soft-404 and prerender regressions are release blockers.

*Next: [09-FEATURE-ROADMAP.md](./09-FEATURE-ROADMAP.md)*
