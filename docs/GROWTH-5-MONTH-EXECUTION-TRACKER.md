# Growth execution tracker — Months 1–5

**Window:** 11 Sep 2026 – 11 Feb 2027 (M1–M5)  
**Plan:** CEO Scenario **B** working envelope with Scenario **A** funded floor  
**Sources:** `docs/CEO-10-MONTH-GROWTH-EXECUTION-PLAN.md`, `docs/SEO-90-DAY-VISIBILITY-PLAN.md`  
**Constraint:** GitHub-only. No Lovable send_message. No Cloudflare. No Oswestry address. No fake visitor stats.

---

## Honest operating note

**100 million sessions is not the operating target.** That figure is Scenario C moonshot modelling only (extraordinary distribution / media capital). Monthly KPIs use **Year 0 GA4/GSC baselines** (B₁ locked 15 Sep 2026 — see `docs/YEAR-0-ANALYTICS-BASELINE.md`). Board stage-gate at Month 6.

---

## Month 1 must-do status (kickoff 11 Sep 2026)

| Must-do | Status | Notes |
|---|---|---|
| Lock Year 0 GA4/GSC baseline export process | **done** (locked B₁) | B₁ `Y0-28d-2026-08-18` filled 15 Sep 2026: sessions 888 / organic 59 / GSC 108 clicks · 8.73K impr · CTR 1.2% · pos 27.2 — `docs/YEAR-0-ANALYTICS-BASELINE.md` (raw CSV folder pending) |
| Content inventory SOT + remove unverifiable claims | **done** | `CONTENT_INVENTORY` live; public claims policy page shipped |
| Fundraising Regulator + Gift Aid pathway | **blocked-on-Louis** | Donate copy softened — do not claim Gift Aid live until HMRC/charity steps complete |
| Topic cluster map + internal link rules | **done** | `src/data/topicClusters.ts` + `TopicClusterNav` on champions |
| Upgrade SEO Champions 1–10 | **done** | Gold pass on existing URLs (no new doorway pages) |
| Champions 11–15 gold pass (early M2) | **done** | Steroids, Exercise hub, Diet hub, Disability support, Waiting-list help — disclaimer + cluster nav + review date 2026-09-14 |
| Champions 16–20 gold pass (interim) | **done** | Painkillers/NSAIDs, Shoulder pain relief, Hip arthritis, Rheumatoid arthritis, Can exercise make OA worse — disclaimer + cluster nav + review **2026-09-15**; interim until GSC re-prioritises |
| Champions 21–25 + treatment spoke gold pass (GSC-driven) | **done** | FaqArticle + BlogPost disclaimer/cluster; GSC blog paths in topicClusters; Azathioprine, Febuxostat, Knee replacement, Health services, Exercise guides (+ Shoulder OA, Arthritis, Mental health, Foods to avoid) — review **2026-09-16** |
| Champions 26–30 + PIP spoke gold pass (GSC-driven) | **done** | Benefits PIP hub, FAQ hub, symptom checker, supplements hub, glucosamine — disclaimer + cluster nav + citations + review **2026-09-16**; cluster density on GSC top-click blogs/FAQ/OA; Sheffield RA doorway redirects to RA hub |
| Champions 31–35 GSC subpage + condition template gold pass | **done** | ConditionSubpagePage + ConditionPageTemplate disclaimer/cluster (covers `/conditions/gout/treatment`, AS, PsA diet); diet/exercise/pain pillar CTR titles; gout treatment depth; cluster + chatbot KB for B₁ intents — review **2026-09-17** |
| Champions 36–40 library hub + chatbot density gold pass | **done** | Library hub + LibraryTopic disclaimer/cluster + pillar cross-links (OA/PIP/exercise/pain/diet); library OA/fibro/turmeric/walking-shoes in topicClusters; chatbot KB for arthritis head term + turmeric + walking shoes — review **2026-09-18** |
| Research fund campaign creative (M2 P1) | **done** | `docs/RESEARCH-FUND-CAMPAIGN-CREATIVE.md` — draft; Louis/trustee approve before posting |
| DPIA checklist for analytics/email | **done** | `docs/DPIA-ANALYTICS-EMAIL.md` |
| Google Ad Grants eligibility pack | **done** | `docs/GOOGLE-AD-GRANTS-PACK.md` — Louis must click apply |
| Email welcome + PECR (brought forward from M2) | **done** | `docs/EMAIL-WELCOME-SERIES.md` + signup form PECR tighten |
| Partner target list 50 (brought forward) | **done** | `docs/PARTNER-OUTREACH-50.md` — Louis sends |
| Linkable assets (flare + PIP) | **done** | `/resources/flare-action-plan`, `/resources/pip-evidence-diary` |
| HCP clinic pack v1 (page; distribution = later) | **done** | `/resources/clinic-pack` printable one-pager |
| Donate mobile CRO pass | **done** | Larger tap targets + clearer Gift Aid next-step copy |
| Moonshot media budget paper | **blocked-on-Louis** | Optional Scenario C stretch — not started |

---

## What shipped this kickoff

- Tracker (this file)
- `/about/editorial-claims-policy` + footer/legal cluster link
- Champions 1–10 gold pass (speakable / FAQ / disclaimer / cluster nav / meta hygiene)
- Printable flare action plan + PIP evidence diary
- HCP clinic pack one-pager (QR/UTM; charity 1218461; phone/email; no address)
- Partner outreach 50, Ad Grants pack, PECR welcome series, DPIA, Year 0 SOP
- Donate UX honesty pass on Gift Aid registration status

---

## Louis action list (blocked until you act)

1. ~~**GA4 export**~~ — **done / locked B₁** (15 Sep 2026) — `docs/YEAR-0-ANALYTICS-BASELINE.md` (optional: drop raw CSVs into `docs/exports/year0-2026-09-15/` later)
2. ~~**GSC export**~~ — **done / locked B₁** (same window; top pages drive Champions 21–25)
3. **Fundraising Regulator** — complete pathway / badge eligibility actions
4. **Gift Aid** — HMRC / charity Gift Aid registration; only then turn on live reclaim messaging
5. **Google Ad Grants** — Google for Nonprofits + Ad Grants login/apply (see pack)
6. **Outreach sends** — first wave from `docs/PARTNER-OUTREACH-50.md` (public contact routes only)
7. **Social posting** — live posts per `docs/SOCIAL-CADENCE-SOPS.md` (and approve research-fund creative first)
8. **Clinical sign-off** — spot-check Month 1 champion disclaimer dates / treatment wording (esp. steroids / NSAIDs / DMARDs, gout treatment, AS, PIP copy, supplements/turmeric caution, library topics and symptom-checker CTAs)
9. **Lovable publish** — publish the latest GitHub `main` so cluster/CRO/gold-pass pages are live

---

## Daily log — 18 Sep 2026 (M1, weekday run)

**Programme month:** M1 (11 Sep – ~11 Oct 2026). Champions 36–40 from yesterday’s next-3 (library pillar polish + chatbot head-term density). No new doorway cities.

### Shipped
- **Champions 36–40 (library + chatbot):** gold-pass chrome on `Library` hub and `LibraryTopic` template (all `/library/:slug`) — `EducationalDisclaimerBox` + `TopicClusterNav` + clinical review **2026-09-18**
- **Pillar cross-links** from thin library topics toward `/conditions/osteoarthritis`, `/guides/exercise`, `/guides/arthritis-pain-relief`, `/guides/diet`, `/benefits-pip` (SEO overlays + category defaults via `getLibraryPillarRelated`)
- **Cluster map:** library OA/arthritis/fibromyalgia/turmeric/glucosamine/access-to-work + blog walking-shoes / turmeric fronted in `topicClusters`; `getClusterForPath` maps `/library/:slug` without inheriting hub→symptoms
- **Library hub CTR title** polish (OA / PIP / exercise / pain framing)
- **Chatbot KB:** stronger “arthritis” head-term intent; dedicated turmeric + walking-shoes topics with real internal links (`/supplements/turmeric`, `/blog/turmeric-for-arthritis`, `/library/turmeric`, `/blog/best-walking-shoes-arthritis-uk`)

### Still blocked on Louis
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply
- First partner outreach wave from `docs/PARTNER-OUTREACH-50.md`
- Live social posting per SOP; approve research-fund creative before posts
- Clinical spot-check of Champions 26–40 (library/turmeric/PIP wording)
- Optional Scenario C moonshot media budget paper
- **Lovable publish** of latest GitHub `main` so gold-pass/library/chatbot pages are live

### Next 3 digital actions (GTM)
1. Cluster density / gold-pass on remaining high-impr GSC URLs not yet chrome’d (blog walking-shoes + turmeric pages themselves if still thin)
2. Louis: Regulator / Gift Aid / Ad Grants / outreach / social (still blocked-on-Louis)
3. Symptom-checker / FAQ hub CRO follow-up using next GSC refresh (no invented KPIs)

## Daily log — 17 Sep 2026 (M1, weekday run)

**Programme month:** M1 (11 Sep – ~11 Oct 2026). Champions 31–35 from B₁ / recent GSC impressions (no new doorway cities).

### Shipped
- **Champions 31–35 (GSC-driven leverage):** gold-pass chrome on `ConditionSubpagePage` (all `/conditions/:condition/:subpage`, incl. `/conditions/gout/treatment` and `/conditions/psoriatic-arthritis/diet`) and `ConditionPageTemplate` (incl. `/conditions/ankylosing-spondylitis`) — `EducationalDisclaimerBox` + `TopicClusterNav` + review **2026-09-17**
- **CTR / title hygiene** on high-impression zero-click pillars: `/guides/diet`, `/guides/exercise`, `/guides/arthritis-pain-relief`; flare guide dated review
- **Gout treatment depth** in `conditionSubpages` (acute vs prevention, UK pathway themes, educational-not-prescribing)
- **Cluster map:** gout treatment / gout / AS / rheumatologist FAQ / diet & exercise pillars fronted in `topicClusters`
- **Chatbot KB:** gout treatment + diet/supplement GSC phrases; links to treatment subpage and omega-3 / glucosamine blogs

### Still blocked on Louis
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply
- First partner outreach wave from `docs/PARTNER-OUTREACH-50.md`
- Live social posting per SOP; approve research-fund creative before posts
- Clinical spot-check of Champions 26–35 (gout treatment, AS, diet/exercise pillars, PIP/supplements)
- Optional Scenario C moonshot media budget paper
- **Lovable publish** of latest GitHub `main` so gold-pass/CTR pages are live

### Next 3 digital actions (GTM)
1. Early M3 pillar polish: OA / PIP / exercise / pain cross-links from remaining high-impr library pages (`/library/*` thin URLs)
2. Louis: Regulator / Gift Aid / Ad Grants / outreach / social (still blocked-on-Louis)
3. Chatbot KB pass for “arthritis” head term + walking-shoes / turmeric blog internal links if GSC still shows 0-click impressions

## Daily log — 14 Sep 2026 (M1, weekday run)

**Programme month:** M1 (11 Sep – ~11 Oct 2026); early pull of M2 digital foundations.

### Shipped
- SEO Champions **11–15** gold pass: `SteroidsGuide`, `ExerciseHub`, `DietHub`, `DisabilitySupport`, `WaitingListHelp` — `EducationalDisclaimerBox`, `TopicClusterNav`, AEO where missing, clinical review date **2026-09-14**
- `docs/SOCIAL-CADENCE-SOPS.md` — FB/IG/LI weekly cadence + templates (M2 P0)
- `docs/CLINICAL-REVIEW-CHECKLIST.md` — formal clinical gate for YMYL (M2 P0)

### Still blocked on Louis
- ~~Year 0 GA4/GSC exports~~ — **done** 15 Sep 2026 (`Y0-28d-2026-08-18`)
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply
- First partner outreach wave from `docs/PARTNER-OUTREACH-50.md`
- Live social posting per new SOP; clinical spot-check of treatment champions (esp. steroids)
- Optional Scenario C moonshot media budget paper

### Next 3 digital actions (GTM)
1. Champions **16–20** (fill with GSC when baselines land; otherwise next high-intent hubs)
2. Research fund campaign creative draft (M2 P1)
3. Internal-link / cluster density pass on remaining treatment spoke pages

## Daily log — 15 Sep 2026 (M1, weekday run)

**Programme month:** M1 (11 Sep – ~11 Oct 2026); early pull of M2 digital foundations.

### Shipped
- SEO Champions **16–20** gold pass (interim hubs while GSC baselines blocked): `PainkillersNsaidsGuide`, `ShoulderPainRelief`, `HipArthritis`, `RheumatoidArthritis`, `CanExerciseMakeOsteoarthritisWorse` — `EducationalDisclaimerBox`, `TopicClusterNav`, AEO where missing, clinical review date **2026-09-15**; speakable intros on hip/RA condition pages
- Topic cluster map: `/conditions/rheumatoid-arthritis` added to **treatments** `supportingPaths`
- `docs/RESEARCH-FUND-CAMPAIGN-CREATIVE.md` — Research fund campaign creative draft (M2 P1); ~£5k → £50k honest framing

### Still blocked on Louis
- ~~Year 0 GA4/GSC exports~~ — **done** 15 Sep 2026 (`Y0-28d-2026-08-18`)
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply
- First partner outreach wave from `docs/PARTNER-OUTREACH-50.md`
- Live social posting per SOP; clinical spot-check of treatment champions (esp. steroids / NSAIDs / RA)
- Optional Scenario C moonshot media budget paper
- Approve research-fund creative before any live posts

### Next 3 digital actions (GTM)
1. Internal-link density pass on remaining treatment spoke pages (cluster nav + contextual links)
2. Ad Grants follow-up docs / checklist if Louis has started Google for Nonprofits apply
3. Champions **21–25** gold pass (or symptom-checker CRO if GSC still blocked)


## Daily log — 16 Sep 2026 (M1, weekday run)

**Programme month:** M1 (11 Sep – ~11 Oct 2026).

### Shipped
- **Year 0 baseline B₁ committed** — `docs/YEAR-0-ANALYTICS-BASELINE.md` locked (sessions 888 / organic 59 / GSC 108 · 8.73K · CTR 1.2% · pos 27.2); raw export folder noted as pending
- **Champions 21–25 (GSC-driven)** — `FaqArticle` + `BlogPost` get `EducationalDisclaimerBox` + `TopicClusterNav`; GSC top blog URLs mapped in `topicClusters` supportingPaths; `getClusterForPath` checks PATH_INDEX before blog-slug heuristic
- **Treatment / condition spoke gold pass** — Azathioprine, Febuxostat, Knee replacement, Health services, Exercise guides (+ Shoulder arthritis, Arthritis overview, Mental health, Foods to avoid) — disclaimer + cluster nav + review date **2026-09-16**

### Still blocked on Louis
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply (pack already has Louis click list)
- First partner outreach wave from `docs/PARTNER-OUTREACH-50.md`
- Live social posting per SOP; approve research-fund creative before posts
- Clinical spot-check of treatment champions (steroids / NSAIDs / azathioprine / febuxostat)
- Optional Scenario C moonshot media budget paper
- Optional: drop Year 0 raw GA4/GSC files into `docs/exports/year0-2026-09-15/`

### Next 3 digital actions (GTM)
1. Internal-link / cluster density on remaining high-impression GSC URLs not yet gold-passed (e.g. `/conditions/osteoarthritis` hygiene, Sheffield support page if indexed)
2. Symptom-checker / FAQ hub CRO pass using B₁ top queries
3. Champions **26–30** from next GSC refresh (or PIP/benefits spoke density if impressions stay benefits-heavy)

## Daily log — 16 Sep 2026 (afternoon) (M1, weekday run)

**Programme month:** M1 (11 Sep – ~11 Oct 2026). Cluster density + CRO from locked B₁. No new KPIs.

### Shipped
- **Cluster / internal-link density** on GSC top-click blog, FAQ and OA URLs: GSC champion paths moved to the front of `topicClusters` supportingPaths so `TopicClusterNav` surfaces swimming/hip OA, knee supplements, PIP FAQ/blog, omega-3 and RA diet; OA hub gains those real related links plus `CITATIONS_OA`
- **Symptom-checker + FAQ hub CRO** from B₁ demand (PIP/benefits, swimming/hip OA, knee supplements, OA): stronger next-step CTAs to PIP FAQ, OA, exercise/hip OA (still educational-not-diagnostic); FAQ hub high-intent related guides (PIP blog, disability support, waiting-list); benefits FAQ extra related guides
- **Champions 26–30 gold pass** (pages that lacked the 21–25 pattern): `/benefits-pip`, `/faq`, `/symptom-checker`, `/supplements`, `/supplements/glucosamine` — `EducationalDisclaimerBox` + `TopicClusterNav` + lastReviewed **2026-09-16** + real NHS/NICE/Versus Arthritis/GOV.UK citations; Louis Maxwell HCPC PH128483
- **Thin Sheffield doorway**: `/arthritis-support/sheffield/rheumatoid-arthritis` exact 301 to `/conditions/rheumatoid-arthritis` (no new city pages; do not promote)
- Homepage: small FAQ (PIP/exercise/OA) pointer. About: light OA / exercise / PIP FAQ links only

### Still blocked on Louis
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply (pack already has Louis click list)
- First partner outreach wave from `docs/PARTNER-OUTREACH-50.md`
- Live social posting per SOP; approve research-fund creative before posts
- Clinical spot-check of treatment champions (steroids / NSAIDs / azathioprine / febuxostat) **and** this afternoon’s PIP/supplements/symptom-checker wording
- Optional Scenario C moonshot media budget paper
- Optional: drop Year 0 raw GA4/GSC files into `docs/exports/year0-2026-09-15/`
- **Lovable publish** of this GitHub main commit

### Next 3 digital actions (GTM)
1. Champions **31–35** from the next GSC refresh (do not invent new doorway cities)
2. Louis: Regulator / Gift Aid / Ad Grants / outreach / social (still blocked-on-Louis)
3. Clinical spot-check of Champions 26–30 (PIP copy + supplements caution + symptom-checker CTAs)

## Months 2–5 (forward look — not started this kickoff)

| Month | Window (approx) | Focus |
|---|---|---|
| M2 | Oct–Nov 2026 | Champions 11–30; outreach engine; social SOPs — **11–20 + social/clinical + research-fund creative by 15 Sep** |
| M3 | Nov–Dec 2026 | Pillars gold; Ad Grants live if approved; community pilot |
| M4 | Dec 2026–Jan 2027 | Content machine; HCP pack distribution; mid-size grants |
| M5 | Jan–Feb 2027 | PR + NE outreach; care home/pharmacy pilots; CRO follow-up |

Update this tracker at each monthly close with honest A vs B traffic multiples from Year 0 — never invent figures.

## Daily log — 15 Sep 2026 (evening) — Year 0 baseline locked

**Programme month:** M1 (11 Sep – ~11 Oct 2026).

### Shipped
- Exported GA4 (`G-ZLLSD3PXZ9`, 18 Aug–14 Sep) + GSC (last 28d ≈ 17 Aug–13 Sep) and filled `docs/YEAR-0-ANALYTICS-BASELINE.md`
- Baseline ID **B₁ = `Y0-28d-2026-08-18`**: 888 sessions, 212 engaged, 843 active users, 59 organic-search sessions; GSC 108 clicks / 8.73K impressions / 1.2% CTR / pos 27.2
- Named conversion events in window: `donation_click` 6, `chat_start` 1; donate/lead/sign_up/purchase still 0
- Raw export folder `docs/exports/year0-2026-09-15/` still pending (headline B₁ locked from UI exports)
- Conversion analytics doc updated: Year 0 no longer “not yet exported”

### Unblocked
- Conversion / A/B lift reporting vs B₁ (still no public marketing claims without Louis sign-off)

### Still blocked on Louis
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply
- First partner outreach wave from `docs/PARTNER-OUTREACH-50.md`
- Live social posting per SOP; clinical spot-check of treatment champions
- Optional Scenario C moonshot media budget paper
