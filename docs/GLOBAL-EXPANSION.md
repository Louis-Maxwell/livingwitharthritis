# Global Expansion Strategy — Living With Arthritis

> **Status:** Strategic roadmap, v1.0 (June 2026)
> **Owner:** Maxwell + Trustees
> **Horizon:** 12 months to global presence; 36 months to category leadership
> **Investment:** $70K–$130K Year 1
> **Target:** Grow from ~40K to 245K–415K monthly visitors (+5–10×)

---

## Executive Summary

Living With Arthritis is a UK-registered patient education charity. Its content (evidence-based arthritis, MSK, frailty, and disability guidance reviewed by HCPC-registered physiotherapist Maxwell, PH128483) is globally relevant but currently reaches mostly English-speaking audiences plus an early footprint in Spanish, French, German, and Portuguese (foundation shipped, machine-translated, pending native review).

This document sets out a 12-month plan to extend the site to **20 languages covering ~85% of the world's internet population**, with a measured, quality-first rollout that protects the site's E-E-A-T signals on YMYL (medical) content.

| Metric | Today | Month 6 | Month 12 |
|---|---|---|---|
| Languages live | 5 (EN + 4 MT) | 10 (reviewed) | 20 |
| Monthly visitors | ~40K | 120K–180K | 245K–415K |
| Tier-1 translated pages | 0 | 600 | 1,200 |
| Local expert reviewers | 1 (UK) | 6 | 12+ |
| Regional partnerships | 0 | 5 | 15+ |
| Annual ad spend (paid) | £0 | $1.5K/mo | $4K/mo |
| Capital required | — | $35K cum. | $70K–$130K |

**Headline ROI:** at the midpoint of projections (330K visitors, ~10% donate-page CTR uplift), cost-per-acquired-supporter falls from ~£3.20 to ~£0.85 — a 3.7× efficiency gain on top of 8× reach.

---

## Section 1 — Market Analysis

### 1.1 Current geographic gaps

| Region | Internet users (B) | Arthritis prevalence | Site coverage today |
|---|---|---|---|
| Anglophone West (UK/US/CA/AU/IE/NZ) | 0.55 | ~22% adults | **Strong** |
| Latin America | 0.49 | ~20% | **Weak** (MT only) |
| Western Europe (non-EN) | 0.35 | ~24% | **Weak** (MT only) |
| Sub-Saharan Africa | 0.62 | ~15% (rising) | **None** |
| MENA | 0.40 | ~18% | **None** |
| South Asia | 0.85 | ~22% | **None** |
| Southeast Asia | 0.55 | ~16% | **None** |
| East Asia (CN/JP/KR) | 1.10 | ~25% (aging) | **None** |

### 1.2 Priority language list (Year 1 target: 20)

Ranked by **(addressable internet users) × (arthritis prevalence) × (English-content scarcity) × (ad-CPM economics)**.

| Tier | Lang | Region focus | Speakers (online) | Notes |
|---|---|---|---|---|
| 1 | Spanish (es-ES, es-MX) | ES, MX, AR, CO | 470M | Two locales, shared base |
| 1 | French (fr-FR, fr-CA) | FR, CA-QC, W. Africa | 280M | |
| 1 | German (de-DE) | DE, AT, CH | 130M | High ad CPMs, aging |
| 1 | Portuguese (pt-BR, pt-PT) | BR, PT, Angola | 260M | Brazil = primary |
| 2 | Hindi (hi-IN) | India | 600M | Huge volume, low CPM |
| 2 | Arabic (ar) | MENA | 420M | RTL build needed |
| 2 | Mandarin (zh-CN, zh-TW) | CN, TW, SG | 1.1B | Great firewall — distribute via Baidu / Weibo |
| 2 | Japanese (ja-JP) | Japan | 110M | Highly aging society |
| 2 | Italian (it-IT) | Italy | 65M | |
| 2 | Russian (ru) | RU, CIS | 260M | |
| 3 | Bengali (bn) | BD, IN-WB | 270M | |
| 3 | Indonesian (id-ID) | Indonesia | 200M | |
| 3 | Turkish (tr-TR) | Turkey | 80M | |
| 3 | Korean (ko-KR) | Korea | 80M | |
| 3 | Vietnamese (vi-VN) | Vietnam | 75M | |
| 3 | Polish (pl-PL) | Poland | 40M | |
| 3 | Dutch (nl-NL) | NL, BE | 30M | |
| 3 | Thai (th-TH) | Thailand | 55M | |
| 3 | Swahili (sw) | E. Africa | 100M | |
| 3 | Tagalog (fil-PH) | Philippines | 90M | |

### 1.3 Healthcare-spending overlay
High-spend, high-aging markets (DE, JP, IT, FR, KR) get **content depth + paid acquisition**.
High-volume, low-spend markets (IN, ID, BD, NG-via-EN) get **content breadth + organic + community**.

---

## Section 2 — Technical Infrastructure

### 2.1 URL structure (already adopted)
**Subdirectory** (`/es/`, `/fr/`, …) on the single root domain.

| Pattern | Used? | Why |
|---|---|---|
| `/{lang}/` subdirectory | **✅ Yes** | Consolidates domain authority, simpler ops |
| `lang.example.com` subdomain | ❌ | Splits PageRank, more DNS overhead |
| `example.fr` ccTLD | ❌ (future) | Best local signal but 20× infra cost |

Locale variants use `/{lang}-{region}/` only where SERPs diverge meaningfully (e.g. `/es-mx/`, `/pt-br/`).

### 2.2 Hreflang
Already emitted by `src/components/SeoDefaults.tsx` for `en-GB`, `es`, `fr`, `de`, `pt`, `x-default`. **Action:** expand to full 20 once each language has ≥ 60 reviewed pages. Avoid hreflang to machine-translated pages once Google can detect parity drops.

### 2.3 Language detection & redirect
- First visit: read `navigator.languages`, match against supported list, **suggest** via banner (don't force-redirect — Google penalises this and breaks crawl).
- Persist choice in `localStorage` (key: `lwa_locale`).
- Manual switcher in header (already shipped: `LanguageSwitcher.tsx`).
- Server-side, set `Vary: Accept-Language` once we move beyond Vite static hosting.

### 2.4 Sitemaps
`sitemap-index.xml` references one sitemap per language (`sitemap-es.xml`, etc). Each child sitemap lists only **reviewed** URLs for that locale; MT-only pages are excluded until review.

### 2.5 RTL & CJK readiness
- Arabic / Hebrew: add `dir="rtl"` toggle in `LocalizedLayout`; audit Tailwind logical properties (`ps-`, `pe-`, `ms-`).
- CJK: load Noto Sans CJK subset by locale; verify line-height tokens; avoid italic.

### 2.6 Performance budget per locale
LCP < 2.5s on 4G in-region. Use Cloudflare's regional POPs (already on the .org.uk domain) and `loading="lazy"` for hero images outside the fold.

---

## Section 3 — Content Localization Strategy

### 3.1 Tier model

| Tier | Pages | Languages | Translation source | Reviewer required |
|---|---|---|---|---|
| **T1 — Core** | 60 (homepage, 6 conditions, 5 pillars, 20 FAQs, donate, about, contact) | All 20 | Professional translator | **Yes** — local clinician |
| **T2 — High-traffic** | 40 (top blog posts, diet hub, exercise hub) | Top 10 | Professional + post-edit MT | Yes |
| **T3 — Long-tail** | 200+ | Top 6 | Post-edited MT | Spot-check only |
| **T4 — Archive** | All others | EN only | n/a | n/a |

### 3.2 Workflow
1. Source EN page locked in `src/content/{slug}.mdx` with stable frontmatter.
2. Export to XLIFF via script (`scripts/export-xliff.ts` — to build).
3. Send to translator (Gengo / Smartling / human partner).
4. Reviewer (local physiotherapist or rheumatology nurse) signs off → adds `reviewedBy` JSON-LD with their credentials and registration body.
5. Import back into `src/content/{lang}/{slug}.mdx`.
6. Sitemap-{lang}.xml regenerated; hreflang updated.

### 3.3 Cultural adaptation (not just translation)
- **Healthcare references:** swap NHS pathways for the local system (SUS in Brazil, Seguridad Social in Spain, gesetzliche Krankenversicherung in Germany, Ayushman Bharat in India).
- **Units:** metric everywhere except en-US.
- **Imagery:** replace photography to reflect local demographics; avoid stock that reads as Western.
- **Religious/dietary:** Mediterranean diet content adapted for halal/kosher/Hindu vegetarian variants.
- **Tone:** formal (de-DE Sie, fr-FR vous, ja-JP keigo) by default; informal where local norm (es-MX tú).

### 3.4 Local expert credentials model
Each locale has its own `MedicalReviewBadge` instance with:
- Local registration body (e.g. AEF in Spain, COFFITO in Brazil, Physio Deutschland)
- Locally verifiable registration number
- Linked profile page in that language

---

## Section 4 — Localized SEO Strategy

### 4.1 Keyword research per language
Use Semrush + Ahrefs per locale. Don't translate UK keywords directly — search intent diverges.

**Example — "knee osteoarthritis exercises":**
| Lang | Local query | Monthly volume | KD |
|---|---|---|---|
| es-MX | "ejercicios para artrosis de rodilla" | 27K | 31 |
| pt-BR | "exercícios para artrose no joelho" | 22K | 28 |
| de-DE | "übungen bei kniearthrose" | 14K | 42 |
| fr-FR | "exercices arthrose genou" | 9K | 35 |
| hi-IN | "घुटने के दर्द के लिए व्यायाम" | 33K | 18 |

### 4.2 Per-locale meta
Hand-write meta titles and descriptions per locale — never auto-translate metadata.

### 4.3 Local link building
| Region | Target sites | Tactic |
|---|---|---|
| Spain | inforeuma.com, conartritis.org | Guest article, study citation |
| Brazil | reumatologia.org.br, SBR | Translation of NICE summaries |
| Germany | rheuma-liga.de | Joint webinar |
| India | iraindia.com (Indian Rheumatology Association) | Patient leaflet co-branding |
| Mexico | colegiomexicanodereumatologia.org | Spanish-language exercise videos |

### 4.4 Local SEO signals
- Google Business Profile per major country with localised description (no UK phone).
- Wikipedia citations in target languages (linking to translated source pages).
- Local schema.org `audience.geographicArea` per page.

---

## Section 5 — Regional Partnerships & Credibility

### 5.1 Partner identification template
For each region: 1× patient association + 1× clinical society + 1× academic centre.

| Region | Patient assoc. | Clinical society | Academic |
|---|---|---|---|
| Spain | ConArtritis | SER (Sociedad Española de Reumatología) | Hospital Clínic Barcelona |
| Brazil | ANAPAR | SBR | USP Reumatologia |
| Germany | Deutsche Rheuma-Liga | DGRh | Charité Berlin |
| France | AFLAR | SFR | AP-HP Cochin |
| India | Arthritis Foundation of India | IRA | AIIMS Delhi |
| Mexico | Fundación Mexicana para Enfermos Reumáticos | CMR | UNAM Facultad de Medicina |

### 5.2 Outreach template (one-pager)
Subject: Free, evidence-based arthritis content for {region} patients — would you review?
Body: 3 paragraphs — who we are, what we offer (free translated content, attribution to their org), what we ask (named reviewer + backlink). Sent in local language.

### 5.3 "Local Expert" badge
JSON-LD `reviewedBy.Person` with `memberOf.MedicalOrganization`. Renders as a uniform badge across languages, with locally-verifiable credentials.

---

## Section 6 — Region-Specific Content

### 6.1 Unique articles (not translations)
Per region, commission 5–10 originals:
- "How to access rheumatology care in {country}" (system navigation)
- "{Country} disability benefits for arthritis patients"
- "Top {country} rheumatology centres"
- "Traditional {region} remedies — what the evidence says" (highly clickable, must be rigorous)

### 6.2 Video / short-form
One YouTube channel per top-6 language. Re-record 10 core exercise videos with local physio voiceover. Cross-post to TikTok and Instagram Reels.

### 6.3 Community channels
| Region | Primary channel |
|---|---|
| LatAm, ES | WhatsApp groups (Communities) |
| Brazil | WhatsApp + Telegram |
| China | WeChat Official Account |
| MENA | Telegram + WhatsApp |
| India | WhatsApp + ShareChat |
| Europe | Email newsletter + Facebook Groups |

---

## Section 7 — Paid Marketing

### 7.1 Channel mix by region
| Region | Google Ads | Meta | TikTok | YouTube | Local |
|---|---|---|---|---|---|
| Western Europe | 40% | 30% | 5% | 20% | 5% |
| LatAm | 30% | 45% | 15% | 10% | — |
| MENA | 20% | 55% | 15% | 10% | — |
| India | 25% | 30% | 25% | 10% | 10% (ShareChat) |
| Japan | 50% | 10% | 5% | 25% | 10% (LINE) |

### 7.2 Budget allocation (Year 1, $48K paid total)
| Region | Year-1 spend |
|---|---|
| LatAm | $12K |
| Western Europe (non-EN) | $14K |
| India | $8K |
| MENA | $6K |
| East Asia | $5K |
| Africa | $3K |

---

## Section 8 — Implementation Roadmap

```text
Month 1–2  Setup            ─ tech infra (done), hire 6 local reviewers, contract translation vendor
Month 2–3  Translate T1     ─ 60 pages × 6 langs (ES, FR, DE, PT, IT, AR) = 360 reviewed pages
Month 3–4  Launch wave 1    ─ hreflang go-live for 6 langs, PR + partnership announcements
Month 4–6  Content + comms  ─ T2 translation, YouTube channels, community groups
Month 6–9  Expand to 12     ─ + Hindi, Mandarin, Japanese, Russian, Korean, Indonesian
Month 9–12 Expand to 20     ─ + Bengali, Turkish, Vietnamese, Polish, Dutch, Thai, Swahili, Tagalog
```

Decision gate at month 4 and month 9: pause new languages if any live locale is < 60% of projected traffic.

---

## Section 9 — Budget Breakdown

| Line item | Low | High |
|---|---|---|
| Professional translation (T1+T2, 100 pages × 20 langs avg 800 wds @ $0.08–0.14) | $12,800 | $22,400 |
| Local expert review (12 reviewers × $500–1,200 retainer × 12 mo) | $7,200 | $17,300 |
| Regional partnerships (memberships, co-branding fees) | $3,000 | $8,000 |
| Paid ads (Year 1) | $36,000 | $48,000 |
| YouTube channel setup (6 langs × video production) | $6,000 | $15,000 |
| Local SEO & link building | $4,000 | $10,000 |
| Tooling (Smartling/Crowdin, hreflang monitor, Semrush expanded) | $3,000 | $5,000 |
| Contingency (10%) | — | $5,000 |
| **Total Year 1** | **$72,000** | **$130,700** |

---

## Section 10 — Success Metrics & Projections

### 10.1 Traffic projection by region (Month 12)
| Region | Low | High |
|---|---|---|
| Anglophone (existing) | 55K | 70K |
| LatAm | 50K | 95K |
| Western Europe (non-EN) | 45K | 75K |
| India + South Asia | 40K | 80K |
| MENA | 20K | 35K |
| East Asia | 20K | 35K |
| Africa + SE Asia | 15K | 25K |
| **Total monthly** | **245K** | **415K** |

### 10.2 KPIs
- Indexed pages per locale (target: ≥ 60 by month 6 for T1 locales)
- Average position for top-10 local keywords (target: page 1 for ≥ 30% by month 9)
- Click-through rate from SERP (target: ≥ 4.5% on featured snippets)
- Donate-page conversion (target: 0.8% → 1.2% blended)
- Returning visitor rate (target: ≥ 28%)
- AI citation appearances (Perplexity / ChatGPT browsing): track via brand-mention monitor

### 10.3 Regional penetration timeline
M3: 6 langs live · M6: 10 langs reviewed · M9: 15 langs · M12: 20 langs.

---

## Section 11 — Next Steps & Decision Points

### 11.1 Immediate (this quarter)
1. **Decide first 6 languages** for professional review (recommendation: ES, FR, DE, PT, IT, AR).
2. **Select translation vendor** — shortlist: Smartling (enterprise), Gengo (mid-tier), Tomedes (medical specialism).
3. **Recruit local reviewers** — start with Spain (ConArtritis network) and Brazil (SBR network).
4. **Open Google Ads accounts** per top-6 country with local payment methods.
5. **Decide investment cadence** — single fundraise ($100K) or staged quarterly ($25K × 4).

### 11.2 Decision tree
```text
Is funding ≥ $100K secured?
├── Yes → run Months 1–6 in parallel, all 6 T1 langs simultaneously
└── No  → sequence: ES + PT (LatAm focus, lowest cost) → FR + DE → IT + AR
           reassess after each pair launches
```

### 11.3 Outreach templates
Drafts stored in `docs/outreach/` (to author): partner intro, reviewer brief, translator brief, press release per locale.

### 11.4 Launch sequence per language
1. Translation complete & reviewed
2. Local meta + JSON-LD authored
3. Add to `sitemap-index.xml`
4. Enable hreflang
5. Announce to local partner
6. Submit to Google Search Console (separate property per language)
7. Spin up community channel
8. Start paid acquisition at $500/mo for first 60 days
9. Review traffic; scale or pause at day 60

---

## Appendix A — Key risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| MT pages hurt E-E-A-T | High | High | Never index until human-reviewed |
| Medical claims mis-localised | Medium | Critical | Local clinician sign-off, indemnity check |
| Donation processing in foreign currency | Medium | Medium | Stripe multi-currency; Gift Aid only for UK |
| Cultural mis-step in imagery/copy | Medium | High | Native reviewer cultural sign-off |
| Partner conflict-of-interest | Low | Medium | Written policy; no commercial sponsors |
| Burn rate exceeds fundraising | Medium | High | Quarterly gate; pause-or-scale rule |

## Appendix B — Glossary
- **MT** — machine translation
- **YMYL** — Your Money or Your Life (Google quality category)
- **E-E-A-T** — Experience, Expertise, Authoritativeness, Trust
- **hreflang** — HTML tag specifying language + region of a page
- **T1/T2/T3** — content tiers (see §3.1)

---

*Document maintained by the Living With Arthritis trustees. Revisions logged in git history. Last updated: June 2026.*
