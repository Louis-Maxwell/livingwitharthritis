# Growth execution tracker — Months 1–5

> **Clinical review (26 Oct 2026):** Louis Maxwell decided every new or rewritten guide is reviewed by him by default. Older rows below that say "pending clinical review" are historical; no blog post is pending now.

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
| Champions 41–42 blog shoes + turmeric + customer-job hubs | **done** | Gold-pass `/blog/best-walking-shoes-arthritis-uk` + `/blog/turmeric-for-arthritis` (unique meta, citations, customer-job links, review **2026-09-20**); polish pain-relief / newly-diagnosed / benefits-PIP above-fold CTAs |
| Champions 43–44 GSC top blogs (swimming hip OA + knee supplements) | **done** | Gold-pass `/blog/swimming-exercises-hip-osteoarthritis` + `/blog/best-supplement-for-knee-joint` — disclaimer-grade citations + cluster/customer-job links + review **2026-09-23**; B₁ #1/#2 click URLs |
| Champions 45–46 GSC FAQ + RA diet gold-pass | **done** | Gold-pass `/faq/arthritis-disability-benefits-uk` (B₁ #3 clicks) + `/blog/anti-inflammatory-diet-rheumatoid-arthritis` (B₁ #10) — CTR meta, Louis Maxwell HCPC review **2026-09-24**, GOV.UK/NHS/NICE/Versus Arthritis cites, Access to Work + customer-job links, food-first/not-a-cure framing |
| Champions 47–48 / early M3 pillar deepen (pain / OA / exercise / PIP) | **done** | Pillar lastReviewed **2026-09-28**; denser customer-job cross-links to gold-passed B₁ blogs/FAQ + walking / joint-protection / sick-pay / carers blogs; topicClusters + chatbot KB refresh; Vitest `gsc-champions-47-48-28-sep.test.ts` |
| Champions 49–52 about + newly-diagnosed + Access to Work + walking | **done** | Gold-pass `/about` (B₁ trust CRO), `/guides/newly-diagnosed`, `/blog/access-to-work-scheme-arthritis-guide`, `/blog/walking-with-arthritis-start-build-up-keep-going` — review **2026-09-29**, CTR meta, NHS/NICE/GOV.UK/Versus Arthritis cites, dense customer-job links; symptoms cluster + chatbot KB; Vitest `gsc-champions-49-52-29-sep.test.ts` |
| Champions 53–55 sick-pay + carers + joint-protection | **done** | Gold-pass `/blog/sick-pay-fit-notes-time-off-work-arthritis`, `/blog/carers-allowance-help-if-you-care-for-someone`, `/blog/joint-protection-easier-everyday-tasks` — CTR meta, Louis Maxwell HCPC review **2026-09-30**, GOV.UK/NHS/NICE/Versus Arthritis cites, dense customer-job links; pip/OA/pain cluster fronting + chatbot KB; Vitest `gsc-champions-53-55-30-sep.test.ts` |
| Champions 56–58 carers-assessment + pacing + work | **done** | Gold-pass `/blog/carers-assessment-arthritis-frailty-uk`, `/blog/energy-management-and-pacing-arthritis`, `/blog/arthritis-and-work-uk` — CTR meta, Louis Maxwell HCPC review **2026-10-01**, NHS/GOV.UK/NICE/Arthritis UK/Acas cites, dense customer-job links; pip/pain/flare cluster fronting + chatbot KB; Vitest `gsc-champions-56-58-01-oct.test.ts` |
| Champions 59–61 attendance-allowance + flare-up + fatigue | **done** | Gold-pass `/blog/attendance-allowance-arthritis-frailty-uk`, `/blog/arthritis-flare-up-what-to-do`, `/blog/arthritis-fatigue-management-uk` — CTR meta, Louis Maxwell HCPC review **2026-10-02**, GOV.UK/NHS/NICE/Arthritis UK cites, dense customer-job links; pip/pain/flare cluster fronting + chatbot KB; Vitest `gsc-champions-59-61-02-oct.test.ts` |
| Champions 62–64 sleep + mental health + cold weather | **done** | Gold-pass `/blog/how-to-sleep-with-arthritis-uk`, `/blog/arthritis-and-mental-health-uk`, `/blog/cold-weather-arthritis-uk-winter` — full rewrites replacing template copy and unverifiable stats ("80%", "2-3 times", "25% less pain"); CTR meta, **pending clinical review** (not yet reviewed by Louis Maxwell; the 2026-10-05 review claim was removed 6 Oct), NHS/NICE/GOV.UK/Samaritans cites, crisis routes on mental health, dense customer-job links; pain/flare cluster fronting + chatbot KB; Vitest `gsc-champions-62-64-05-oct.test.ts` |
| Champions 65–67 winter activity + depression + flu jab | **done** | Gold-pass `/blog/staying-active-arthritis-winter-uk`, `/blog/depression-arthritis-when-to-seek-help`, `/blog/flu-jab-arthritis-frailty-uk` — full rewrites removing unsourced stats ("20–30%", "up to 90%", "1 in 3", "25% less pain") and broken frailty template copy; CTR meta, **pending clinical review** (not yet reviewed by Louis Maxwell; the 2026-10-06 review claim was removed 6 Oct), NHS/NICE/UKHSA/Samaritans cites, crisis routes on depression, flu-jab eligibility from NHS page (England; devolved nations signposted); exercises/flare/treatments cluster fronting + chatbot KB; Vitest `gsc-champions-65-67-06-oct.test.ts` |
| Champions 68–70 winter viruses + cold home + sleep positions | **done** | Gold-pass `/blog/covid-winter-arthritis-frailty-uk`, `/blog/winter-arthritis-frailty-cold-houses-uk`, `/blog/best-sleep-positions-joint-pain` — full rewrites removing broken frailty template copy, the repeated "10 million" line, the unsourced "25% less pain interference" claim and a "Clinical Review Board" reviewer label that named no real reviewer; CTR meta, **pending clinical review**, NHS/GOV.UK/NICE/UKHSA cites, sick-day plan with never-stop-medicines framing, heating help (Winter Fuel / Cold Weather / Warm Home Discount), positions by joint linking to the gold-pass sleep URL; treatments/pain cluster fronting + chatbot KB; Vitest `gsc-champions-68-70-07-oct.test.ts` |
| Champions 71–73 winter vitamin D + sleep–pain cycle + what keeps you awake | **done** | Gold-pass `/blog/vitamin-d-winter-arthritis-frailty-uk`, `/blog/sleep-quality-arthritis-pain`, `/blog/arthritis-and-sleep-problems` — full rewrites removing broken frailty template copy ("several joints", the "10 million" line), unsourced "up to 80%" sleep-disturbance claims, mattress/brand/price filler, a named reviewer line ("Dr. Hannah Clarke") that we cannot verify and the unnamed "Clinical Advisory Panel" label; CTR meta, **pending clinical review**, NHS/NICE/GOV.UK cites (NHS vitamin D 10 micrograms Oct–Mar and 100 microgram upper limit, osteoporosis/steroids, insomnia self-help, NICE MTG70 Sleepio, restless legs, sleep apnoea, prednisolone timing), never-change-medicines framing; the two sleep posts now have distinct jobs (pain–sleep cycle + two-week diary; cause-by-cause checklist) and hand off to the gold-pass sleep URL; diet/pain cluster fronting + chatbot KB; Vitest `gsc-champions-71-73-08-oct.test.ts` |
| Champions 74–75 gout winter dehydration + night pain toolkit | **done** | Gold-pass `/blog/gout-winter-dehydration-frailty-uk`, `/blog/sleep-and-pain-management-arthritis` — full rewrites removing broken frailty template copy (repeated "10 million" line, empty heading, OA exercise advice on a gout page) and overlapping sleep filler; CTR meta, **pending clinical review**, NHS/NICE/Versus Arthritis cites (gout + dehydration triggers, NG219, insomnia/OA treatment), never-change-medicines / keep urate-lowering in flare framing; night-pain post has a distinct overnight pain-toolkit job and hands off to `/blog/how-to-sleep-with-arthritis-uk`; treatments/pain cluster fronting + chatbot KB; Vitest `gsc-champions-74-75-13-oct.test.ts` |
| Champions 76–78 chest infection + ice and snow + steroids infection watch | **done** | Gold-pass `/blog/chest-infection-arthritis-frailty-uk`, `/blog/ice-snow-arthritis-frailty-uk`, `/blog/ra-steroids-frailty-infection-watch-uk`: full rewrites removing broken frailty template copy ("10 million" line, "several joints", random-nation filler, empty heading, OA exercise advice on non-OA pages). Each has CTR meta and is **pending clinical review**. Cites NHS chest infection / pneumonia / sepsis / falls / broken hip / head injury / steroids / prednisolone, NICE NG138 / NG120 / NG249, Met Office warnings and Versus Arthritis. Never stop or change medicines yourself; never stop steroids suddenly; steroid cards; chickenpox/shingles/measles contact. Treatments/exercises cluster fronting + chatbot KB; Vitest `gsc-champions-76-78-14-oct.test.ts` |
| Champions 79–81 steroid emergency card + shingles vaccine + UTI confusion | **done** | Gold-pass `/blog/steroid-emergency-card-frail-arthritis-uk`, `/blog/shingles-vaccine-arthritis-frailty-uk`, `/blog/uti-confusion-arthritis-frailty-uk`: full rewrites of broken frailty-template copy ("10 million" line, "several joints", England / Northern Ireland filler, OA advice on non-OA pages). Each has CTR meta and is **pending clinical review**. Cites NHS prednisolone (red vs blue steroid cards), NHS Addison's (adrenal crisis 999 signs), Society for Endocrinology, NHS shingles vaccine and shingles, NHS UTIs, sudden confusion, kidney infection, sepsis, NHS methotrexate interactions and NICE CG103. No steroid doses given; never stop or change medicines yourself. Treatments cluster fronting + chatbot KB; Vitest `gsc-champions-79-81-15-oct.test.ts` |
| Champions 82–84 sleeping tablets/falls + sleep apnoea + bone protection on steroids | **done** | Gold-pass `/blog/sleeping-tablets-falls-arthritis-frailty-uk`, `/blog/sleep-apnoea-arthritis-frailty-uk`, `/blog/bone-protection-steroids-arthritis-frailty-uk`: full rewrites of broken frailty-template copy. Each has CTR meta and is **pending clinical review**. Cites NHS insomnia / Sleepio / zolpidem falls risk / sleep apnoea / osteoporosis causes & prevention / prednisolone long-term bone thinning / vitamin D / falls, NICE MTG70 / NG249, GOV.UK driving. Never stop or change medicines yourself; no public steroid or sleeping-tablet dosing. Pain/treatments cluster fronting + chatbot KB; Vitest `gsc-champions-82-84-16-oct.test.ts` |
| Champions 85–87 strength after a flare + confidence after a fall + medication reviews | **done** | Gold-pass `/blog/deconditioning-after-arthritis-flare-uk`, `/blog/confidence-after-fall-arthritis-frailty-uk`, `/blog/pharmacist-medication-review-frail-arthritis-uk`: full rewrites of broken frailty-template copy ("10 million" line, "several joints", random-nation filler, empty headings, OA advice on non-OA pages). Each has CTR meta and is **pending clinical review**. Cites NHS physiotherapy (MSK self-referral) / older-adult activity guidelines / sitting, strength and balance exercises / DVT / RA treatment / falls / head injury / broken hip / walking aids / Talking Therapies / paracetamol, NHS England Structured Medication Reviews, NHS New Medicine Service, NICE NG226 / NG249 / NG5, Age UK falls prevention, Arthritis UK (formerly Versus Arthritis) exercise and MHRA Yellow Card. Never stop or change medicines yourself; no doses. Flare-ups/exercises/treatments cluster fronting + chatbot KB; Vitest `gsc-champions-85-87-19-oct.test.ts` |
| Champions 88–90 vitamin D and falls + chair yoga + sit-to-stand | **done** | Gold-pass `/blog/vitamin-d-and-falls-arthritis-uk`, `/blog/chair-yoga-elderly-arthritis-stiffness`, `/blog/sit-to-stand-practice-frail-arthritis-uk`: full rewrites of broken frailty-template copy (and, on chair yoga, an unverifiable trial claim and a made-up website). Each has CTR meta and is **pending clinical review**. Cites NHS vitamin D / calcium / osteoporosis / falls / physiotherapy / older-adult activity guidelines / sitting and strength exercises, NICE NG249 (vitamin D not proven to prevent falls on its own) / NG226, Royal Osteoporosis Society, Age UK and Arthritis UK (formerly Versus Arthritis) exercise. No doses beyond NHS public vitamin D advice. Diet/exercises cluster fronting + chatbot KB; Vitest `gsc-champions-88-90-20-oct.test.ts`; triage list re-ranked for 89–98 |
| Champions 91–93 knee OA steady at home + seated strength + painkillers in later life | **done** | Gold-pass `/blog/knee-osteoarthritis-frailty-staying-steady-home-uk`, `/blog/seated-strength-frail-osteoarthritis-uk`, `/blog/painkillers-older-adults-arthritis-caution-uk`: full rewrites of broken frailty-template copy ("10 million" line, "several joints", random-nation filler, Rockwood scale filler). Each has CTR meta and is **pending clinical review**. Cites NHS falls / preventing falls / getting up after a fall / strength, balance and sitting exercises / older-adult activity guidelines / walking aids / paracetamol / ibuprofen / NSAIDs / co-codamol / codeine / gabapentin / stomach ulcer, NICE NG226 (pain-medicine recommendations 1.4.2–1.4.7, walking aids 1.3.10–1.3.11) / NG249, Age UK falls prevention, Arthritis UK (formerly Versus Arthritis) exercise and MHRA Yellow Card. No doses; never stop or change medicines yourself. Seated strength narrowed to effort and progression so it does not duplicate the chair routine. Exercises/treatments cluster fronting + chatbot KB; Vitest `gsc-champions-91-93-21-oct.test.ts` |
| Champions 94–96 methotrexate in later life + RA first months + RA monitoring | **done** | Gold-pass `/blog/methotrexate-older-frail-adults-uk`, `/blog/late-onset-ra-frailty-first-months-uk`, `/blog/ra-monitoring-older-frail-adults-uk`: full rewrites of broken frailty-template copy ("10 million" line, "several joints", random-nation filler, Rockwood scale filler, OA exercise advice on RA/medicines pages, NICE NG56 filler). Each has CTR meta and is **pending clinical review**. Cites NHS methotrexate (how to take / side effects / common questions) / RA diagnosis, treatment, living with and complications / blood tests / flu, shingles and pneumococcal vaccines / sepsis / older-adult activity guidelines / 111, NICE NG100 (1.1.5, 1.2.1–1.2.3, 1.4.1–1.4.3, 1.7–1.9), MHRA Drug Safety Update (once-weekly methotrexate) and Yellow Card, NRAS methotrexate / what is RA / exercise / monitoring RA, Arthritis UK (formerly Versus Arthritis) methotrexate and RA, GOV.UK Attendance Allowance. No doses; never stop or change medicines yourself. Methotrexate (weekly routine, infections, vaccines) and RA monitoring (DAS28, safety tests, annual review, what to report) kept as distinct jobs and cross-linked. Treatments / symptoms (newly diagnosed) cluster fronting + chatbot KB; Vitest `gsc-champions-94-96-22-oct.test.ts` |
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

## Month 1 close-out (11 Sep – 11 Oct 2026) — written 12 Oct 2026

The planned Fri 9 Oct close-out run did not complete, so this is written on the first M2 weekday. Figures below are only those recorded in this repo; no new GA4/GSC numbers have been exported since B₁ (14 Sep), so **no traffic multiple vs Year 0 is claimed for M1**.

| M1 KPI (CEO plan §11) | Scenario A floor | Scenario B | Status |
|---|---|---|---|
| Traffic | Year 0 export live; GSC verified | + Ad Grants submitted | **A met** (B₁ locked 15 Sep). B not met: Ad Grants pack ready, application not submitted (Louis) |
| Social | Profiles audited; 3-platform cadence | Carousel design system | SOPs + carousel assets in repo; live cadence is Louis-owned (no new Facebook posts / ads without asking) |
| Email | PECR forms audited; welcome draft | ESP chosen; first 100 consented | **A met** (`docs/EMAIL-WELCOME-SERIES.md`, PECR form tighten). B: ESP choice + consented count not recorded |
| Partnerships | 20 targets researched | 10 outreach emails sent | **A met** (50 targets, `docs/PARTNER-OUTREACH-50.md`). B: no sends recorded (Louis) |
| Revenue | Gift Aid status confirmed | 2 grant apps in draft | Gift Aid still blocked-on-Louis (donate copy does not claim it). Grant drafts live with the Grant writer agent, not this repo |
| Content | Inventory CI; 8 refreshes | 12 refreshes + 4 new | **B exceeded on refreshes**: Champions 1–73 gold-passed on existing URLs (no doorway pages); new pages limited to linkable assets (flare plan, PIP diary, clinic pack) |
| Conversions | Donate path QA | Checker → email CTA live | Donate mobile CRO pass shipped; donate buttons now go to GoFundMe |

**Honest read:** M1 content and governance work is ahead of plan. Everything that needs a human outside GitHub (Ad Grants, Regulator, Gift Aid, outreach, clinical sign-off, fresh GSC/GA4 export) is still with Louis, and that is the gap between Scenario A and B.

## Month 2 must-do status (12 Oct – ~11 Nov 2026)

| Must-do (CEO plan §12, M2) | Status | Notes |
|---|---|---|
| Champions 11–30 upgraded | **done** (in M1) | Now at 103 (Champions 102–103 shipped 27 Oct, after 99–101 on 26 Oct); Champions 104–108 queued in `docs/M2-FRAILTY-TEMPLATE-TRIAGE.md` (220 template posts left) |
| Email welcome + PECR compliance | **done** (brought forward) | ESP send-live is Louis-owned |
| Partner target list 50 + first 15 outreaches | list **done**; sends **blocked-on-Louis** | First 15 from `docs/PARTNER-OUTREACH-50.md`, public contact routes only |
| Social cadence SOPs (FB/IG/LI) | **done** | `docs/SOCIAL-CADENCE-SOPS.md`; posting needs Louis's go-ahead |
| Clinical review checklist formalised | **done** | `docs/CLINICAL-REVIEW-CHECKLIST.md`; since 26 Oct 2026 every published guide is reviewed by Louis Maxwell (HCPC PH128483); the 27 Oct gate `review-labelling-27-oct.test.ts` keeps "pending clinical review" off the site |
| Research fund campaign creative | **done** (draft) | Louis/trustee approval before posting |
| **Trust sweep: remove unnamed reviewer labels** | **done** (12–14 Oct) | 12 Oct: 74 blog posts + `/expert-articles`. 14 Oct spot-check: "reviewed by our clinical team" removed from 23 pending posts, and the `/self-help` virtual-physio section no longer claims review "by our HCPC-registered physiotherapists". No "Clinical Review Board" / "Clinical Advisory Panel" / "Dr. Hannah Clarke" left in any page or post. The remaining template defects (empty headings in 239 posts) are tracked in the triage doc |
| Frailty-template triage plan | **done** (14 Oct) | `docs/M2-FRAILTY-TEMPLATE-TRIAGE.md`: 245 posts left, grouped by topic, next 10 Champions (79–88) picked by season + inbound links; re-rank when a fresh GSC export arrives; mechanical sweep option awaits Louis's decision |
| HCP clinic-pack distribution prep | **done** (13 Oct) | `docs/HCP-CLINIC-PACK-DISTRIBUTION.md` (#189); sends are Louis-owned |

M2 KPI targets (A / B): organic +10–20% / +25–40% vs the M1 cohort (needs a fresh GSC export to measure), 5 / 15 partner conversations, Regulator pathway progressed / 3 grant apps submitted, email signup rate tracked / tool completion tracked.

---

## Daily log — 27 Oct 2026 (M2 day 12, weekday run)

**Programme month:** M2 (12 Oct – ~11 Nov 2026). Tracker next-3 from 26 Oct: Champions 102–103, then 104–105. Two PRs today, both through the GitHub API only (no clone, no Lovable credits / CloudAgent / other AI tools). PR #286 (trust labelling) merged first; Champions 102–103 shipped as rewrites on their existing URLs: no redirects, no URLs removed, no new pages, no invented traffic claims.

**Review status:** Louis's 26 Oct decision applies: every new or rewritten guide is reviewed by Louis Maxwell (HCPC PH128483). The `hasVerifiedReviewer` check on the article page had already been fixed on `main` by #279 (`isVerifiedMaxwellReviewer` matches "Louis Maxwell" plus PH128483); today's gate locks that in.

### Shipped
- **PR #286 — trust labelling:** last "pending clinical review" wording removed from llms.txt / ai.txt (Champions 99–101 lines), the enterprise audit script and audit doc, the blog-guide how-to, the triage doc, this tracker's M2 row and three condition-page code comments. New gate `src/lib/__tests__/review-labelling-27-oct.test.ts`: no "pending clinical review" in site source or public text files; every published post reviewed by Louis Maxwell with PH128483 and no pending status; `isVerifiedMaxwellReviewer` true for every published post; article page keeps the fixed reviewer check
- **Champion 102 — `/blog/chair-based-exercise-ra-frailty-uk`:** full rewrite into "Seated exercise with rheumatoid arthritis: flare days and good days". Flare-day range-of-movement moves, building up between flares, hands and feet (hand exercise programme, podiatrist), what NICE NG100 says about physiotherapy and rapid access for flares, when to stop and get help (possible joint infection: same day / NHS 111 / 999). Early handoff to Champion 89 (chair yoga routine) and Champion 92 (seated strength). Cites NRAS, NICE NG100 and NHS pages
- **Champion 103 — `/blog/continence-night-trips-arthritis-frailty-uk`:** full rewrite into "Waking at night to pee with arthritis: causes, what helps and when to see a GP". Common causes, drink and medicine timing (ask the pharmacist or GP, never stop a prescribed medicine yourself), bladder diary, pelvic floor muscle training and bladder training, NHS continence service, red flags (blood in pee, cannot pee at all, fever / confusion with possible UTI). Handoff to Champion 97 for lighting and the route. Cites Guy's and St Thomas' nocturia leaflet, NHS and NICE NG123 / CG97
- Both: CTR meta (titles ≤55 characters, descriptions 120–150), "Clinically reviewed by Louis Maxwell (HCPC PH128483) on 27 October 2026", charity 1218461, educational-not-diagnostic wording; no frailty-template filler, no "10 million", no percentages, no doses, no addresses
- **`topicClusters.ts`:** both in the exercises cluster (with triggers "exercise during an ra flare", "waking at night to pee")
- **Chatbot KB:** exercise entry and sleep entry `related` links
- Sitemap `lastmod` **2026-10-27** (from real `updated_at`) + sitemap-index; llms.txt / ai.txt preferred cites + Q&A lines
- Catalog / RSS / head data / review index / content stats / keyword files / search index / llms-full / prerender routes regenerated. The regeneration also brought `scripts/blog-head-data.json` back in line with the citations already in the post JSON on `main` and added `/resources/symptom-flare-tracker` to the prerender list (both already on `main` in source)
- **Triage doc:** 102–103 ticked; 220 template posts left
- **Tests:** `src/lib/__tests__/gsc-champions-102-103-27-oct.test.ts` (reviewed by Louis Maxwell, CTR meta, real UK cites, links, safety lines, template / stats / dose bans, overlap handoffs, cluster, KB / llms / ai / sitemap). Full Vitest suite run before push (results in the PR)

### Still blocked on Louis
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply
- First 15 partner outreaches (`docs/M2-FIRST-15-OUTREACH-SEND-SHEET.md`); NHS / clinic intros (`docs/HCP-CLINIC-PACK-DISTRIBUTION.md`); live social posts (no new Facebook posts / ads without asking)
- Decide on the mechanical frailty-template sweep across the remaining 220 posts vs Champion-by-Champion only
- **Lovable publish** of latest GitHub `main` (only if Louis does it himself; no Lovable credits), then GSC URL Inspection on the two URLs
- Fresh GSC Pages/Queries + GA4 export (needed to measure the M2 traffic KPI honestly and to re-rank on real demand)
- Host: www→apex 301, true HTTP 404 (SPA limitation) — still open

### Next 3 digital actions (GTM)
1. Champions 104–105 (`heat-versus-ice-frail-arthritis-uk`, `living-alone-falls-plan-arthritis-uk`), reviewed by Louis Maxwell
2. Champions 106–108 (flare versus something else, waiting for community physio, protein when cooking is hard)
3. Re-rank the next 10 after 108 from inbound links, or from real demand if a GSC export arrives

## Daily log — 26 Oct 2026 (M2 day 11, weekday run)

**Programme month:** M2 (12 Oct – ~11 Nov 2026). Tracker next-3 from 23 Oct: Champions 99–101 (RA fatigue, blood-test transport, rheumatology clinic). All three shipped as rewrites on their existing URLs: no redirects, no URLs removed, no new pages, no invented traffic claims, no Lovable credits / CloudAgent / other AI tools. Since 23 Oct, `main` gained Louis's sitewide clinical-review sign-off (#262, #268), the 301 merges (#264, #265) and the thin-archive expansions (#266, #267); none of today's three URLs was merged or redirected.

**Review status (needs Louis):** Louis's 23 Oct audit covered the text that existed then. Today's three guides are new text, so they carry **no reviewer** (`reviewed_by` empty, no `last_reviewed`) and a "Pending clinical review" line in the disclaimer. The article page now shows a pending byline instead of "Clinical reviewer: … Review date not recorded" when a guide has no reviewer (`src/pages/BlogPost.tsx`), and the sitewide "no pending" test has an explicit allowlist of these three slugs only. When Louis signs them off: restore `reviewed_by` / `reviewer_credentials` / `last_reviewed`, drop the pending sentence and remove the slugs from the allowlist.

### Shipped
- **Champion 99 — `/blog/ra-fatigue-frailty-energy-envelope-uk`:** full rewrite into "RA fatigue in later life: pacing, sleep, mood and when tiredness needs checking". Why it can hit harder (disease activity, pain and sleep, mood, deconditioning, other conditions and medicines), NHS GP triggers and blood tests (anaemia, diabetes, thyroid), sleep apnoea, medication review, NICE NG100 periodic assessment and annual review, pacing the energy envelope, gentle activity and physio / OT, NHS sleep habits and CBT, mood (NICE psychological support, NHS Talking Therapies, 111 mental health option, Samaritans 116 123, 999), questions for the team, carers, red flags. Opening handoff to the general fatigue and pacing guides. **Pending clinical review**
- **Champion 100 — `/blog/blood-test-transport-arthritis-frailty-uk`:** full rewrite into "getting to monitoring blood tests when travel is hard". Why tests matter (NICE drug monitoring), telling the team early, tests nearer home / better time / home visits if housebound (varies by area), NHS non-emergency patient transport (NHS page + NHS England 2022 eligibility criteria; other nations run their own), the Healthcare Travel Costs Scheme in England (qualifying benefits, Low Income Scheme, taxi agreed in advance, escorts, HC5(T) within 3 months), community transport, Blue Badge, PIP, on the day, results in the NHS App, missed tests (call the team, never stop a medicine yourself), carers, infection red flags. **Pending clinical review**
- **Champion 101 — `/blog/rheumatology-clinic-frail-older-adult-uk`:** full rewrite into "preparing for a rheumatology appointment later in life". What to bring (top concerns, full medicines list, symptom and function notes, falls), telling the clinic about hearing / sight / memory / mobility needs, getting there, bringing someone, questions to ask, what NICE NG100 says care should include (shared decisions, written information, named coordinator, physio / OT / podiatry, rapid flare access, annual review), before you leave, after (clinic letter, NHS App, PALS, patient-initiated follow-up), carers, when not to wait. **Pending clinical review**
- **`topicClusters.ts`:** flare-ups fronts RA fatigue; treatments fronts blood-test transport and rheumatology appointments
- **Chatbot KB:** fatigue entry, RA entry and methotrexate entry `related` links to the three URLs
- Sitemap `lastmod` **2026-10-26** on all three URLs (from real `updated_at`) + sitemap-index; llms.txt / ai.txt preferred cites + Q&A lines
- Catalog / head data / review index / content stats / keyword files / search index / llms-full regenerated
- **Triage doc:** 99–101 ticked; 222 template posts left
- **Tests:** `src/lib/__tests__/gsc-champions-99-101-26-oct.test.ts` (pending status, CTR meta, real UK cites, links, safety lines, template / stats / dose bans, cluster, KB / llms / ai / sitemap, pending byline on the article page); `m2-trust-sweep-12-oct.test.ts` narrowed to an explicit three-slug allowlist. Full Vitest suite, lint and typecheck run before push (results in the PR)

### Still blocked on Louis
- Clinical review sign-off for Champions 99–101 (esp. the NHS patient transport / travel costs summary in 100 and the "when not to wait" lists)
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply
- First 15 partner outreaches (`docs/M2-FIRST-15-OUTREACH-SEND-SHEET.md`); NHS / clinic intros (`docs/HCP-CLINIC-PACK-DISTRIBUTION.md`); live social posts (no new Facebook posts / ads without asking)
- Decide on the mechanical frailty-template sweep across the remaining 222 posts vs Champion-by-Champion only
- **Lovable publish** of latest GitHub `main` (only if Louis does it himself; no Lovable credits), then GSC URL Inspection on the three URLs
- Fresh GSC Pages/Queries + GA4 export (needed to measure the M2 traffic KPI honestly and to re-rank on real demand)
- Host: www→apex 301, true HTTP 404 (SPA limitation) — still open

### Next 3 digital actions (GTM)
1. Champions 102–103 (chair-based exercise with RA after an overlap check against Champions 89 and 92; continence at night, paired with 97)
2. Champions 104–105 (heat versus ice with thin skin or poor sensation; living alone falls plan) for winter
3. If Louis approves: one mechanical trust sweep PR across the remaining template posts; otherwise re-rank on real demand as soon as a fresh GSC export lands

---

## Daily log — 23 Oct 2026 (M2 day 10, weekday run)

**Programme month:** M2 (12 Oct – ~11 Nov 2026). Tracker next-3 from 22 Oct: Champions 97–98, then re-rank 99–108. Both Champions shipped and the re-rank is done. Topical NSAIDs (98) was checked against `topical-nsaids-often-overlooked-often-effective` first: both have inbound links and different jobs, so 98 was narrowed (not consolidated) to the later-life safety job with an opening handoff to the general explainer. Night lights (97) was narrowed to lighting and the route at night, handing off to the continence and commode posts. Rewrites, not redirects; no URLs removed, no new pages, no invented traffic claims, no Lovable credits / CloudAgent. Yesterday's Security Audit vitest advisory is already fixed on `main` (#249, vitest 5.0.5); Louis's 23 Oct commit (accessible PDF download buttons + DOMPurify patch) is noted, no action needed.

### Shipped
- **Champion 97 — `/blog/night-lights-arthritis-falls-frailty-uk`:** full rewrite into "night lights and safer night-time trips to the toilet with arthritis". Why night-time is risky (stiff joints on waking, low light, standing up quickly, half-asleep), lighting the whole route (plug-in and motion-sensor lights, switches within reach), getting up in stages (sit on the edge of the bed first), clearing the route, when it is more than lighting (getting up more often than you used to, dizziness on standing, water tablets and sleeping tablets, new confusion), council needs assessment for equipment, living alone, what to do after a fall at night, carers. Cites NHS falls prevention, NICE NG249, Guy's and St Thomas' NHS nocturia guidance, NHS low blood pressure, Age UK. **Pending clinical review**
- **Champion 98 — `/blog/topical-nsaids-frail-hand-knee-oa-uk`:** full rewrite into "topical NSAIDs in later life: safer pain relief for knee and hand osteoarthritis". Who they suit (NICE NG226 offer for knee OA, consider for other joints), how to use a gel, NHS naked-flame fire warning, older skin and diclofenac sunlight advice, check with a pharmacist first (blood thinners, asthma, kidney / heart / stomach problems, not alongside NSAID tablets), hands, other options (heat or cold, capsaicin, exercise), NHS 111 / 999 and Yellow Card. No doses. **Pending clinical review**
- **`topicClusters.ts`:** exercises (falls) fronts night lights; treatments fronts topical NSAIDs in later life (+ search triggers)
- **Chatbot KB:** sleep entry `related` + night-time toilet keywords; NSAIDs entry `related` + topical / gel keywords
- Sitemap `lastmod` **2026-10-23** on both URLs (from real `updated_at`) + sitemap-index; llms.txt / ai.txt preferred cites + Q&A lines
- Catalog / head data / content stats / search index regenerated; review-status test now expects Champions 62–98 pending
- **Triage doc:** 97–98 ticked; **re-ranked Champions 99–108** (inbound links + pairing with recent gold-pass posts; still no GSC export), led by the four RA template posts; 225 template posts left
- **Tests:** `src/lib/__tests__/gsc-champions-97-98-23-oct.test.ts` (also checks 98 stays distinct from the general topical NSAIDs guide and blocks dose wording); full Vitest suite, lint, typecheck and build run before push (results in the PR)

### Still blocked on Louis
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply
- First 15 partner outreaches (`docs/M2-FIRST-15-OUTREACH-SEND-SHEET.md`); NHS / clinic intros (`docs/HCP-CLINIC-PACK-DISTRIBUTION.md`); live social posts (no new Facebook posts / ads without asking)
- Clinical review: pending Champions 62–98 (esp. today's topical NSAID "check with a pharmacist first" list and the night-time "when it is more than lighting" GP triggers), the 74 swept posts, the 23 posts fixed 14 Oct and the four `/expert-articles` pieces; then `npm run blog:mark-reviewed -- <slug>`
- Decide on the mechanical frailty-template sweep across the remaining 225 posts vs Champion-by-Champion only
- **Lovable publish** of latest GitHub `main`, then GSC URL Inspection on the two URLs
- Fresh GSC Pages/Queries + GA4 export (needed to measure the M2 traffic KPI honestly and to re-rank on real demand)
- Approve research-fund creative before campaign posts
- Host: www→apex 301, true HTTP 404 (SPA limitation) — still open

### Next 3 digital actions (GTM)
1. Champions 99–101 (RA fatigue, blood-test transport, rheumatology clinic) from the 23 Oct re-rank
2. Champions 102–103 (chair-based exercise with RA after an overlap check against Champions 89 and 92; continence at night, paired with 97)
3. If Louis approves: one mechanical trust sweep PR across the remaining template posts; otherwise re-rank on real demand as soon as a fresh GSC export lands

---

## Daily log — 22 Oct 2026 (M2 day 9, weekday run)

**Programme month:** M2 (12 Oct – ~11 Nov 2026). Tracker next-3 from 21 Oct: Champions 94–96 as a medicines-safety and newly-diagnosed RA set. All three shipped. Each was checked against yesterday's #247 blog reorganisation first: none was consolidated or noindexed, so URLs and #247 categories are unchanged (methotrexate stays in Treatments & medicines; the two RA posts stay in Conditions). Methotrexate (94) and RA monitoring (96) were split into distinct jobs and cross-linked so they do not compete. Rewrites, not redirects; no URLs removed, no new pages, no doorway cities, no invented traffic claims, no Lovable credits / CloudAgent.

### Shipped
- **Champion 94 — `/blog/methotrexate-older-frail-adults-uk`:** full rewrite into "methotrexate in later life: blood tests, infections, vaccines and safety". Once-weekly on the same day (MHRA daily-dosing warning, patient card, keep it apart from daily tablets and blister packs, folic acid on a different day, NHS missed-dose rule, NHS 111 if taken daily by mistake), why the blood tests matter (NHS every 1 to 2 weeks at first, every 2 to 3 months once stable; who checks results; alcohol before a test), infections and sick days ("ask, do not guess", tell every prescriber, trimethoprim / co-trimoxazole, quiet infection signs in older people, chickenpox / shingles contact, sepsis to 999), vaccines (flu injection not nasal spray, pneumococcal, non-live shingles, COVID-19, live vaccines ask first), other medicines and supplements, never change the dose yourself, NHS 111 / 999 symptom lists and Yellow Card, carer checklist. No doses. **Pending clinical review**
- **Champion 95 — `/blog/late-onset-ra-frailty-first-months-uk`:** full rewrite into "diagnosed with rheumatoid arthritis later in life: the first months". Treated the same as at any age (NICE treat-to-target), baseline tests (anti-CCP, hand and foot X-rays, function questionnaire), first DMARD ideally within 3 months, short steroid bridge, safety checks before methotrexate, monthly CRP / DAS28 until target, step-up, up to 12 weeks to work, named contact and advice line, other medicines and bone protection, staying active (NHS RA rest/activity balance, older-adult strength and balance on at least 2 days a week, NICE physio / OT / podiatry access), fatigue and mood, carers, NRAS and Arthritis UK helplines, Attendance Allowance, when to get help. **Pending clinical review**
- **Champion 96 — `/blog/ra-monitoring-older-frail-adults-uk`:** full rewrite into "rheumatoid arthritis monitoring in later life: blood tests, reviews and what to report". Two kinds of monitoring (is it controlled / is the medicine safe), DAS28 explained with NICE example targets, NICE monthly-until-target then 6-month and annual review, safety blood tests and shared care with the GP (hands off to the methotrexate post for the weekly routine, and to leflunomide / sulfasalazine guides), what the NICE annual review should cover, what to report between appointments (incl. new cough, eye symptoms, hand numbness or unsteadiness), making monitoring easier, carers. **Pending clinical review**
- **`topicClusters.ts`:** treatments fronts methotrexate in later life and RA monitoring; symptoms (newly diagnosed pillar) fronts RA first months (+ search triggers)
- **Chatbot KB:** methotrexate `related` + keywords; RA `related` + late-onset / monitoring / DAS28 keywords
- Sitemap `lastmod` **2026-10-22** on the three URLs (from real `updated_at`) + sitemap-index; llms.txt / ai.txt preferred cites + Q&A lines
- Catalog / head data / content stats / search index regenerated; review-status test now expects Champions 62–96 pending
- **Triage doc:** 94–96 ticked; 227 template posts left
- **Tests:** `src/lib/__tests__/gsc-champions-94-96-22-oct.test.ts` (also blocks any mg / microgram dose wording and checks 94 and 96 stay distinct); full Vitest suite, lint, typecheck and build run locally before push (results in the PR)

### Still blocked on Louis
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply
- First 15 partner outreaches (`docs/M2-FIRST-15-OUTREACH-SEND-SHEET.md`); NHS / clinic intros (`docs/HCP-CLINIC-PACK-DISTRIBUTION.md`); live social posts (no new Facebook posts / ads without asking)
- Clinical review: pending Champions 62–96 (esp. today's methotrexate sick-day wording "ask, do not guess", the quiet-infection-signs line for older people, the NICE NG100 monitoring summary and DAS28 example targets), the 74 swept posts, the 23 posts fixed 14 Oct and the four `/expert-articles` pieces; then `npm run blog:mark-reviewed -- <slug>`
- Decide on the mechanical frailty-template sweep across the remaining 227 posts vs Champion-by-Champion only
- **Lovable publish** of latest GitHub `main`, then GSC URL Inspection on the three URLs
- Fresh GSC Pages/Queries + GA4 export (needed to measure the M2 traffic KPI honestly and to re-rank the triage list on real demand)
- Approve research-fund creative before campaign posts
- Host: www→apex 301, true HTTP 404 (SPA limitation) — still open

### Next 3 digital actions (GTM)
1. Champions 97–98 (night lights; topical NSAIDs after an overlap check against `topical-nsaids-often-overlooked-often-effective`)
2. Re-rank Champions 99–108, starting with the four RA template posts today's gold-pass set now links to (`blood-test-transport-arthritis-frailty-uk`, `rheumatology-clinic-frail-older-adult-uk`, `chair-based-exercise-ra-frailty-uk`, `ra-fatigue-frailty-energy-envelope-uk`) and skipping anything #247 redirected or noindexed
3. If Louis approves: one mechanical trust sweep PR across the remaining template posts; otherwise re-rank on real demand as soon as a fresh GSC export lands

---

## Daily log — 21 Oct 2026 (M2 day 8, weekday run)

**Programme month:** M2 (12 Oct – ~11 Nov 2026). Tracker next-3 from 20 Oct: Champions 91–93 from the re-ranked list. All three shipped. Seated strength was checked against the 20-minute chair routine first and narrowed (not consolidated) to a distinct job, because it had 4 inbound links and a different search intent ("how to make chair exercise build strength"). Rewrites, not redirects; no URLs removed, no new pages, no doorway cities, no invented traffic claims, no Lovable credits / CloudAgent.

### Shipped
- **Champion 91 — `/blog/knee-osteoarthritis-frailty-staying-steady-home-uk`:** full rewrite into "knee osteoarthritis: staying steady at home". Why sore knees make you less steady (quadriceps weakness), five home changes (clear and light the main route, proper indoor shoes, things within reach, somewhere to hold), strength and balance on at least 2 days a week (sit-to-stand, seated knee straightening, heel raises, supported balance), NICE NG226 walking-aid advice and the "not routinely" line on braces and insoles, night-time and toilet trips, the NHS get-up-after-a-fall steps (with a cushion under sore knees) and what to do if you cannot get up, GP / NHS 111 / 999 routes. **Pending clinical review**
- **Champion 92 — `/blog/seated-strength-frail-osteoarthritis-uk`:** full rewrite into "seated strength exercises: how to make chair exercise build strength". Hands off in the first paragraph to the 20-minute chair routine and sit-to-stand. How hard it should feel (last two or three repetitions hard, no breath-holding), five seated moves for the big muscle groups, one-change-at-a-time progression (repetitions, slower lowering, holds, light weights, bands, then standing work), joint care (comfortable range, next-day pain rule, flare days, hand OA grip, joint replacement), when to get help. **Pending clinical review**
- **Champion 93 — `/blog/painkillers-older-adults-arthritis-caution-uk`:** full rewrite into "painkillers in later life: safer use and what to check". Why age changes things, what NICE NG226 actually says (exercise first, topical NSAID for knee OA, oral NSAID lowest dose shortest time with a PPI, paracetamol and weak opioids not routinely offered, no strong opioids for OA), RA painkillers do not control disease, NHS "ask first" list for NSAIDs, hidden paracetamol in combination products and the A&E-even-if-you-feel-well overdose rule, codeine / opioid drowsiness, constipation, falls and do-not-stop-suddenly, gabapentinoid unsteadiness, ways to need fewer tablets, NHS 111 / 999 routes and Yellow Card. No doses. **Pending clinical review**
- **`topicClusters.ts`:** exercises fronts knee steady-at-home and seated strength; treatments fronts painkillers in later life (+ search triggers)
- **Chatbot KB:** exercise-general `related` + seated strength / knee giving way keywords; pain `related` + painkillers-in-later-life keywords
- Sitemap `lastmod` **2026-10-21** on the three URLs (from real `updated_at`) + sitemap-index; llms.txt / ai.txt preferred cites + Q&A lines
- Catalog / head data / content stats / search index regenerated; review-status test now expects Champions 62–93 pending
- **Triage doc:** 91–93 ticked, topical NSAIDs (98) flagged for an overlap check against the existing topical NSAIDs guide; 230 template posts left
- **Tests:** `src/lib/__tests__/gsc-champions-91-93-21-oct.test.ts` (also blocks any dose wording on the painkillers page); full Vitest suite green (122 files / 816 tests); lint, typecheck and blog catalog check clean (blog HTML gate left to CI, as on 20 Oct)

### Still blocked on Louis
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply
- First 15 partner outreaches (`docs/M2-FIRST-15-OUTREACH-SEND-SHEET.md`); NHS / clinic intros (`docs/HCP-CLINIC-PACK-DISTRIBUTION.md`); live social posts (no new Facebook posts / ads without asking)
- Clinical review: pending Champions 62–93 (esp. today's NICE NG226 medicines summary on the painkillers page, the "weigh under 50kg" paracetamol caution, and the get-up-after-a-fall advice for people with painful knees), the 74 swept posts, the 23 posts fixed 14 Oct and the four `/expert-articles` pieces; then `npm run blog:mark-reviewed -- <slug>`
- Decide on the mechanical frailty-template sweep across the remaining 230 posts vs Champion-by-Champion only
- **Lovable publish** of latest GitHub `main`, then GSC URL Inspection on the three URLs
- Fresh GSC Pages/Queries + GA4 export (needed to measure the M2 traffic KPI honestly and to re-rank the triage list on real demand)
- Approve research-fund creative before campaign posts
- Host: www→apex 301, true HTTP 404 (SPA limitation) — still open

### Next 3 digital actions (GTM)
1. Champions 94–96 (methotrexate in later life, late-onset RA first months, RA monitoring) as a medicines-safety and newly-diagnosed RA set
2. Champions 97–98 (night lights, topical NSAIDs after an overlap check), then re-rank the next 10
3. If Louis approves: one mechanical trust sweep PR across the remaining template posts; otherwise re-rank on real demand as soon as a fresh GSC export lands

---

## Daily log — 20 Oct 2026 (M2 day 7, weekday run)

**Programme month:** M2 (12 Oct – ~11 Nov 2026). Tracker next-3 from 19 Oct: Champion 88, then re-rank the triage list. Champion 88 shipped, the list was re-ranked (still no fresh GSC export, so by inbound links, season and harm), and the top two re-ranked posts shipped as Champions 89–90 because they pair with the falls and strength work from 19 Oct. Rewrites, not redirects; no URLs removed, no new pages, no doorway cities, no invented traffic claims, no Lovable credits / CloudAgent.

### Shipped
- **Champion 88 — `/blog/vitamin-d-and-falls-arthritis-uk`:** full rewrite into "vitamin D and falls: what it can and cannot do". NHS vitamin D role (calcium, phosphate, bones and muscles), NHS 10 microgram autumn/winter advice and all-year advice if frail, housebound, in a care home or with dark skin, the 100 microgram (4,000 IU) upper limit and why too much harms, follow a prescribed dose and check kidney problems. NICE NG249 stated plainly: not enough evidence that vitamin D alone lowers falls. What does help (falls service, strength and balance at least 2 days a week, medicines review, eyes and feet, home hazard assessment, winter extras), bones after a minor fall, steroid / RA bone questions, DEXA, calcium food-first. Hands off early to the gold-pass winter vitamin D guide. **Pending clinical review**
- **Champion 89 — `/blog/chair-yoga-elderly-arthritis-stiffness`:** full rewrite into "chair yoga for older adults with stiff joints". Removed an unverifiable trial claim, a made-up website and unsupported "measurable improvement in 4–6 weeks" copy. NHS chair set-up, a gentle routine built from NHS sitting exercises (chest stretch, upper-body twist, hip marching, ankle stretch, neck turn, no full neck circles), extra care after hip replacement, RA/AS in the neck, osteoporosis or spinal fracture and dizziness, finding a class, stop / 999 / NHS 111 routes; honest that chair yoga is mainly flexibility, so pair it with strength and balance. Hands off early to chair exercises, yoga for beginners and seated tai chi. **Pending clinical review**
- **Champion 90 — `/blog/sit-to-stand-practice-frail-arthritis-uk`:** full rewrite into "sit-to-stand practice with arthritis". NHS sit-to-stand steps (5 slow repetitions), easier and harder versions, chair safety, hip/knee replacement chair-height advice, discomfort guidance, NHS physio self-referral, OT equipment and free council care needs assessment, carers must not pull or lift, dizziness on standing and medicines review. Hands off early to strength training, chair exercises and strength after a flare. **Pending clinical review**
- **Triage re-rank:** `docs/M2-FRAILTY-TEMPLATE-TRIAGE.md` now lists Champions 89–98 with inbound-link counts and reasons (91 knee OA staying steady at home, 92 seated strength (consolidation check), 93 painkillers in later life, 94 methotrexate, 95 late-onset RA, 96 RA monitoring, 97 night lights, 98 topical NSAIDs) plus reserves; 233 template posts left
- **`topicClusters.ts`:** exercises fronts sit-to-stand and chair yoga; diet fronts vitamin D and falls (+ search triggers)
- **Chatbot KB:** exercise-general `related` + chair yoga / sit-to-stand keywords; supplements `related` + vitamin D and falls keywords
- Sitemap `lastmod` **2026-10-20** on the three URLs (from real `updated_at`) + sitemap-index; llms.txt / ai.txt preferred cites + Q&A lines
- Catalog / head data / content stats / search index regenerated; review-status test now expects Champions 62–90 pending
- **Tests:** `src/lib/__tests__/gsc-champions-88-90-20-oct.test.ts` (also blocks the removed trial claim and any "vitamin D prevents falls" wording); full Vitest suite green (121 files / 802 tests) + dependency-security node tests; lint, typecheck and blog catalog check clean (the local blog HTML gate script fails to start on this box's Node 20 on `main` too, a jsdom/parse5 loader issue, so it is left to CI)

### Still blocked on Louis
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply
- First 15 partner outreaches (`docs/M2-FIRST-15-OUTREACH-SEND-SHEET.md`); NHS / clinic intros (`docs/HCP-CLINIC-PACK-DISTRIBUTION.md`); live social posts (no new Facebook posts / ads without asking)
- Clinical review: pending Champions 62–90 (esp. today's vitamin D all-year and kidney wording, the chair yoga cautions for hip replacement, RA neck and osteoporosis, and the sit-to-stand "mild aching that settles within a day" guidance), the 74 swept posts, the 23 posts fixed 14 Oct and the four `/expert-articles` pieces; then `npm run blog:mark-reviewed -- <slug>`
- Decide on the mechanical frailty-template sweep across the remaining 233 posts vs Champion-by-Champion only
- **Lovable publish** of latest GitHub `main`, then GSC URL Inspection on the three URLs
- Fresh GSC Pages/Queries + GA4 export (needed to measure the M2 traffic KPI honestly and to re-rank the triage list on real demand)
- Approve research-fund creative before campaign posts
- Host: www→apex 301, true HTTP 404 (SPA limitation) — still open

### Next 3 digital actions (GTM)
1. Champions 91–93 from the re-ranked list: `knee-osteoarthritis-frailty-staying-steady-home-uk`, `seated-strength-frail-osteoarthritis-uk` (check overlap with chair exercises first; consolidate if it duplicates) and `painkillers-older-adults-arthritis-caution-uk`
2. Champions 94–96 (methotrexate, late-onset RA, RA monitoring) as a medicines-safety and newly-diagnosed RA set
3. If Louis approves: one mechanical trust sweep PR across the remaining template posts; otherwise re-rank on real demand as soon as a fresh GSC export lands

---

## Daily log — 19 Oct 2026 (M2 day 6, weekday run)

**Programme month:** M2 (12 Oct – ~11 Nov 2026). Tracker next-3 from 16 Oct: Champions 85–87 from `docs/M2-FRAILTY-TEMPLATE-TRIAGE.md`. Picked because `deconditioning-after-arthritis-flare-uk` is the most-linked template post (7 inbound, including the printable flare action plan), `confidence-after-fall-arthritis-frailty-uk` pairs with Champion 77 (ice and snow) for winter falls, and `pharmacist-medication-review-frail-arthritis-uk` has 5 inbound links from medicines-safety posts. Built on top of Louis's 18 Oct PIP-visibility and supporter-conversion commits. Rewrites, not redirects; no URLs removed, no new pages, no doorway cities, no invented traffic claims, no Lovable credits / CloudAgent.

### Shipped
- **Champion 85 — `/blog/deconditioning-after-arthritis-flare-uk`:** full rewrite into "getting your strength back after an arthritis flare or illness week". Small, frequent movement in week 1 (sit-to-stands, moving every hour or so, NHS sitting exercises), one-thing-at-a-time build-up over weeks 2–6 towards the NHS older-adult guidelines (strength and balance at least 2 days a week), pacing to avoid boom and bust, NHS physio routes (MSK self-referral in many areas, first contact physios, home visits, MCSP + HCPC if private), do not stop flare steroids early, DVT (3+ days in bed) and hot-swollen-joint red flags. Hands off early to `/blog/arthritis-flare-up-what-to-do`, the flare action plan and `/blog/energy-management-and-pacing-arthritis`. **Pending clinical review**
- **Champion 86 — `/blog/confidence-after-fall-arthritis-frailty-uk`:** full rewrite into "scared of falling again? rebuilding confidence after a fall". Age UK and NHS framing that moving more (not less) helps, see a GP after any fall, NHS falls service content (strength and balance, home check, medicines review), self-referral where available, step-by-step return to walking, NHS get-up-from-the-floor steps, telecare/personal alarms, NICE NG249 cognitive behavioural approaches for fear of falling, NHS Talking Therapies self-referral, carers must not lift, 999/111/GP routes. Hands off early to Champion 77 ice and snow, Champion 82 sleeping tablets and the falls prevention guide. **Pending clinical review**
- **Champion 87 — `/blog/pharmacist-medication-review-frail-arthritis-uk`:** full rewrite into "medication reviews with arthritis: how to get one and what to ask". NHS England Structured Medication Reviews (who is prioritised), NHS New Medicine Service (England, listed conditions incl. gout and osteoporosis; RA and OA honestly noted as not on the list), what to bring, questions to ask (falls, interactions, paracetamol doubling, sick day rules, bone protection, packaging for stiff hands), never stop or change medicines yourself, MHRA Yellow Card, NICE NG249 medication review for falls. Hands off early to the reviewed new-medicine questions post and food/drink interactions post. **Pending clinical review**
- **`topicClusters.ts`:** flare-ups fronts deconditioning; exercises fronts confidence after a fall; treatments fronts medication reviews (+ search triggers)
- **Chatbot KB:** flare `related` + keywords; exercise-general `related` + fear-of-falling keywords; NSAIDs `related` + medication-review keywords; weather-cold `related` + confidence after a fall
- Sitemap `lastmod` **2026-10-19** on the three URLs + sitemap-index; llms.txt / ai.txt preferred cites + Q&A lines
- Catalog / head data / content stats / search index regenerated; review-status test now expects Champions 62–87 pending; triage doc marks 85–87 done (236 template posts left)
- **Tests:** `src/lib/__tests__/gsc-champions-85-87-19-oct.test.ts` (also blocks percentages and mg doses on the three pages); full Vitest suite green (120 files / 788 tests) + dependency-security node tests; lint, typecheck, blog catalog check and internal links check clean

### Still blocked on Louis
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply
- First 15 partner outreaches (`docs/M2-FIRST-15-OUTREACH-SEND-SHEET.md`); NHS / clinic intros (`docs/HCP-CLINIC-PACK-DISTRIBUTION.md`); live social posts (no new Facebook posts / ads without asking)
- Clinical review: pending Champions 62–87 (esp. today's week-by-week rebuild wording and "some aching that settles by the next day" guidance, the NHS get-up-from-the-floor steps on the falls page, and the medication-review lists of medicines that may need a planned reduction), the 74 swept posts, the 23 posts fixed 14 Oct and the four `/expert-articles` pieces; then `npm run blog:mark-reviewed -- <slug>`
- Decide on the mechanical frailty-template sweep across the remaining 236 posts vs Champion-by-Champion only
- **Lovable publish** of latest GitHub `main`, then GSC URL Inspection on the three URLs
- Fresh GSC Pages/Queries + GA4 export (needed to measure the M2 traffic KPI honestly and to re-rank the triage list)
- Approve research-fund creative before campaign posts
- Host: www→apex 301, true HTTP 404 (SPA limitation) — still open

### Next 3 digital actions (GTM)
1. Champion 88 from the triage doc: `vitamin-d-and-falls-arthritis-uk` — narrow to vitamin D and falls/bones (NICE NG249: no evidence for vitamin D specifically to prevent falls, follow NHS bone and muscle advice) and hand off early to the gold-pass winter vitamin D guide
2. Re-rank the triage list and pick the next 10 Champions (89–98): use a fresh GSC export if Louis supplies one, otherwise inbound links + season (reserves include `chair-yoga-elderly-arthritis-stiffness`, `delirium-hospital-arthritis-frailty-uk`, `living-alone-falls-plan-arthritis-uk`, `anxiety-about-falling-arthritis-uk`, `hospital-deconditioning-arthritis-stay-uk`)
3. If Louis approves: one mechanical trust sweep PR across the remaining template posts

---

## Daily log — 16 Oct 2026 (M2 day 5, weekday run)

**Programme month:** M2 (12 Oct – ~11 Nov 2026). Tracker next-3 from 15 Oct: Champions 82–84 from `docs/M2-FRAILTY-TEMPLATE-TRIAGE.md`. Picked because gold-pass sleep posts already link to sleeping tablets and sleep apnoea, and the vitamin D winter guide links to bone protection on steroids (pairs with Champions 78/79). Rewrites, not redirects; no URLs removed, no new pages, no doorway cities, no invented traffic claims, no Lovable credits / CloudAgent.

### Shipped
- **Champion 82 — `/blog/sleeping-tablets-falls-arthritis-frailty-uk`:** full rewrite into "sleeping tablets, night falls and arthritis: safer options first". NHS insomnia self-help first, pharmacy sleep aids short-term only, CBT for insomnia / NICE Sleepio before long courses of tablets, GPs rarely prescribe sleeping pills and only for days or weeks, zolpidem next-day drowsiness and falls risk especially over 65, never stop prescribed sleep medicines yourself, night lights / clear path / walking aids, hand-off to gold-pass sleep and falls posts. **Pending clinical review**
- **Champion 83 — `/blog/sleep-apnoea-arthritis-frailty-uk`:** full rewrite into "sleep apnoea and arthritis: signs, referral and why tired days hurt more". NHS OSA signs (pauses, gasping, loud snoring, daytime sleepiness), see a GP, sleep-clinic tests and CPAP at high level, sleeping pills can make apnoea worse, DVLA / driving note, how poor sleep worsens pain perception, early hand-off to `/blog/how-to-sleep-with-arthritis-uk` and `/blog/arthritis-and-sleep-problems`. **Pending clinical review**
- **Champion 84 — `/blog/bone-protection-steroids-arthritis-frailty-uk`:** full rewrite into "bone protection on steroids with arthritis: scans, vitamin D and falls". NHS long-term high-dose steroid tablets and RA as osteoporosis risk factors, questions to ask (bone protection, DEXA, FRAX/Q-Fracture, vitamin D/calcium, steroid cards), T-score framing without dosing regimens, NHS 10 microgram vitamin D Oct–Mar / all-year if frail, calcium food-first (~700mg), falls prevention, never stop steroids yourself; hands off early to `/guides/bone-density-osteoporosis` and Champions 78/79. **Pending clinical review**
- **`topicClusters.ts`:** pain fronts sleeping tablets + sleep apnoea; treatments fronts bone protection (+ search triggers)
- **Chatbot KB:** sleep `related` + keywords; steroids `related` + bone protection / bone density; supplements `related` + bone protection
- Sitemap `lastmod` **2026-10-16** on the three URLs + sitemap-index; llms.txt / ai.txt preferred cites + Q&A lines
- Catalog / head data / content stats / search index regenerated; review-status test now expects Champions 62–84 pending; triage doc marks 82–84 done (239 template posts left)
- **Tests:** `src/lib/__tests__/gsc-champions-82-84-16-oct.test.ts` (also blocks public hydrocortisone dosing and steroid mg regimens)

### Still blocked on Louis
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply
- First 15 partner outreaches (`docs/M2-FIRST-15-OUTREACH-SEND-SHEET.md`); NHS / clinic intros (`docs/HCP-CLINIC-PACK-DISTRIBUTION.md`); live social posts (no new Facebook posts / ads without asking)
- Clinical review: pending Champions 62–84 (esp. today's sleeping-tablet / CBT-I framing, sleep apnoea CPAP and DVLA note, and bone-protection / never-stop-steroids wording), the 74 swept posts, the 23 posts fixed 14 Oct and the four `/expert-articles` pieces; then `npm run blog:mark-reviewed -- <slug>`
- Decide on the mechanical frailty-template sweep across the remaining 239 posts vs Champion-by-Champion only
- **Lovable publish** of latest GitHub `main`, then GSC URL Inspection on the three URLs
- Fresh GSC Pages/Queries + GA4 export (needed to measure the M2 traffic KPI honestly and to re-rank the triage list)
- Approve research-fund creative before campaign posts
- Host: www→apex 301, true HTTP 404 (SPA limitation) — still open

### Next 3 digital actions (GTM)
1. Champions 85–86 from the triage doc: `deconditioning-after-arthritis-flare-uk` (most-linked template post) and `confidence-after-fall-arthritis-frailty-uk`
2. Champions 87–88: `pharmacist-medication-review-frail-arthritis-uk` and `vitamin-d-and-falls-arthritis-uk` (hand off early to the gold-pass winter vitamin D guide)
3. If Louis approves: one mechanical trust sweep PR across the remaining template posts; otherwise re-rank the triage list as soon as a fresh GSC export lands

---

## Daily log — 15 Oct 2026 (M2 day 4, weekday run)

**Programme month:** M2 (12 Oct – ~11 Nov 2026). Tracker next-3 from 14 Oct: Champions 79–81 from `docs/M2-FRAILTY-TEMPLATE-TRIAGE.md`. Picked because the printable flare action plan links to the steroid card post, the gold-pass winter viruses guide links to shingles, and winter infections with sudden confusion are a real October–November risk for older readers. Rewrites, not redirects; no URLs removed, no new pages, no doorway cities, no invented traffic claims, no Lovable credits / CloudAgent.

### Shipped
- **Champion 79 — `/blog/steroid-emergency-card-frail-arthritis-uk`:** full rewrite into "steroid emergency cards and arthritis: who needs one and when to show it". Explains adrenal insufficiency in plain words (NHS prednisolone page), the red NHS Steroid Emergency Card vs the blue steroid treatment card (longer than 3 weeks or more than 40mg a day), keeping both (Society for Endocrinology), PDF / phone lock-screen copy, who should ask about a card (long or high-dose courses, repeated joint injections, several steroid types), when to show it (A&E, procedures, dentist, new clinicians, carers), sick-day questions to agree in advance (no doses given), NHS adrenal crisis 999 signs and frailty / carer prompts. Hands off early to Champion 78. **Pending clinical review**
- **Champion 80 — `/blog/shingles-vaccine-arthritis-frailty-uk`:** full rewrite into "shingles vaccine and arthritis: who is eligible and is it safe with your medicines?". NHS England eligibility (turning 65, 70 to 79, 18+ with a severely weakened immune system; second dose to 81), devolved nations signposted, ask your team whether your DMARD / biologic / JAK / steroid counts, non-live vaccine safe on prednisolone (NHS), never pause medicines for a vaccine, dose intervals, side effects, early shingles signs and the pharmacist-within-3-days / urgent GP / NHS 111 routes, post-herpetic neuralgia. **Pending clinical review**
- **Champion 81 — `/blog/uti-confusion-arthritis-frailty-uk`:** full rewrite into "UTIs and sudden confusion with arthritis: signs in older people and who to call". NHS UTI signs plus the older / frail / catheter signs (delirium, worse leaking, rigors), 999 for sudden confusion with the NHS while-you-wait steps, the NHS urgent GP / NHS 111 list (65+, weakened immune system, kidney pain), methotrexate with trimethoprim / co-trimoxazole caution (NHS), paracetamol over NSAIDs when unwell, arthritis-specific barriers (drinking less to avoid painful toilet trips, OT aids, safe night trips), recovery and NICE CG103 delirium follow-up. States that confusion should not be assumed to be a UTI. **Pending clinical review**
- **`topicClusters.ts`:** treatments fronts all three (+ steroid card / shingles vaccine / urine infection triggers)
- **Chatbot KB:** steroids `related` + steroid card guide; DMARDs `related` + shingles + UTI; weather-cold `related` + shingles + UTI (+ shingles vaccine / shingles jab / urine infection confusion keywords)
- Sitemap `lastmod` **2026-10-15** on the three URLs + sitemap-index; llms.txt / ai.txt preferred cites + Q&A lines
- Catalog / head data / content stats / search index regenerated; review-status test now expects Champions 62–81 pending; triage doc marks 79–81 done (242 template posts left)
- **Tests:** `src/lib/__tests__/gsc-champions-79-81-15-oct.test.ts` (also blocks any public hydrocortisone dosing line)

### Still blocked on Louis
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply
- First 15 partner outreaches (`docs/M2-FIRST-15-OUTREACH-SEND-SHEET.md`); NHS / clinic intros (`docs/HCP-CLINIC-PACK-DISTRIBUTION.md`); live social posts (no new Facebook posts / ads without asking)
- Clinical review: pending Champions 62–81 (esp. today's steroid-card sick-day and adrenal crisis wording, shingles eligibility on immune-suppressing medicines, and the methotrexate antibiotic line), the 74 swept posts, the 23 posts fixed 14 Oct and the four `/expert-articles` pieces; then `npm run blog:mark-reviewed -- <slug>`
- Decide on the mechanical frailty-template sweep across the remaining 242 posts vs Champion-by-Champion only
- **Lovable publish** of latest GitHub `main`, then GSC URL Inspection on the three URLs
- Fresh GSC Pages/Queries + GA4 export (needed to measure the M2 traffic KPI honestly and to re-rank the triage list)
- Approve research-fund creative before campaign posts
- Host: www→apex 301, true HTTP 404 (SPA limitation) — still open

### Next 3 digital actions (GTM)
1. Champions 82–84 from the triage doc: `sleeping-tablets-falls-arthritis-frailty-uk`, `sleep-apnoea-arthritis-frailty-uk`, `bone-protection-steroids-arthritis-frailty-uk`
2. Champions 85–86: `deconditioning-after-arthritis-flare-uk` (most-linked template post, also linked from the flare action plan) and `confidence-after-fall-arthritis-frailty-uk`
3. If Louis approves: one mechanical trust sweep PR across the remaining template posts; otherwise re-rank the triage list as soon as a fresh GSC export lands

---

## Daily log — 14 Oct 2026 (M2 day 3, weekday run)

**Programme month:** M2 (12 Oct – ~11 Nov 2026). Tracker next-3 from 13 Oct: frailty-template triage or next seasonal spokes, a leftover trust/accuracy pass, and HCP clinic-pack distribution prep (already done 13 Oct, #189, so not redone). No fresh GSC export, so I picked today's three by October/November relevance: a winter chest infection, icy pavements and falls, and infection risk on steroid tablets. Rewrites, not redirects; no URLs removed, no new pages, no doorway cities, no invented traffic claims, no Lovable credits / CloudAgent.

### Shipped
- **Champion 76 — `/blog/chest-infection-arthritis-frailty-uk`:** full rewrite of the broken frailty template (Wales filler, "several joints", empty heading, OA advice, vitamin D / falls cites on a chest-infection page) into "chest infections and arthritis: self-care, warning signs and recovery". Covers NHS symptoms and 7–10 day course, home self-care, ibuprofen only if told it is safe, see a GP early on steroids / methotrexate / biologics / JAK inhibitors or if over 65, never stop or pause arthritis medicines yourself, never stop steroids suddenly, antibiotics and interaction check, protecting sore ribs and back when coughing, GP / urgent GP or 111 / 999 tiers from the NHS chest infection, pneumonia and sepsis pages, signs in older people, rebuilding strength, flu / pneumococcal / COVID-19 / RSV vaccines. Hands off early to the gold-pass winter viruses guide. **Pending clinical review**
- **Champion 77 — `/blog/ice-snow-arthritis-frailty-uk`:** full rewrite (Northern Ireland filler, template copy) into "ice and snow with arthritis: staying steady and what to do if you fall". Covers when to stay in (Met Office warnings, deliveries, stocking up on medicines), shoes / ice grips / ferrules / walking aids, how to walk on ice, keeping strength and balance indoors (NHS twice-weekly), the NHS steps for getting up after a fall, 999 tiers (cannot get up, head / neck / back / hip, broken hip signs, head-injury signs), NHS 111 for a head knock on blood thinners, do not lift someone yourself, after-fall falls services (NICE NG249) and bone health. **Pending clinical review**
- **Champion 78 — `/blog/ra-steroids-frailty-infection-watch-uk`:** full rewrite (OA "core care" advice on an RA steroid page, Northern Ireland filler) into "steroids and infection with rheumatoid arthritis: what to watch for". Uses the NHS prednisolone infection signs (call a doctor / 111 straight away), sepsis 999 signs, notes that older people may not run a fever, chickenpox / shingles / measles contact, never stop steroids suddenly, sick-day questions, blue and red steroid cards, non-live vaccines, bones / falls / blood sugar / mood / eye checks, and a carer checklist. **Pending clinical review**
- **Trust spot-check:** no "Clinical Review Board", "Clinical Advisory Panel" or "Dr. Hannah Clarke" left in any page or post. **23 pending posts** said "reviewed by our clinical team", which their review status contradicts; each now reads "by the Living With Arthritis editorial team and is pending clinical review". The `/self-help` virtual-physio section said its myths were "reviewed by our HCPC-registered physiotherapists" (plural, unverifiable); it now says "summarised by our editorial team from NICE, NHS and peer-reviewed sources (pending clinical review)". No literal empty `<h2></h2>` anywhere. The template's "heading followed straight away by a heading" defect is still in 239 template posts and is queued, not mass-edited
- **`docs/M2-FRAILTY-TEMPLATE-TRIAGE.md`:** 245 template posts left (248 before today), grouped into 12 topics, next 10 Champions (79–88) picked by season, inbound links from gold-pass pages / the flare action plan, and harm. B₁ GSC shows only 3 template posts with any impressions (≤4, 0 clicks), so re-rank when Louis sends a fresh export. Mechanical sweep option proposed for Louis to decide
- **`topicClusters.ts`:** treatments fronts chest infection + steroids-infection (+ chest infection / pneumonia / prednisolone triggers); exercises fronts ice and snow (+ icy pavements / snow and ice)
- **Chatbot KB:** steroids `related` + steroid card / steroids infection keywords; DMARDs `related` + chest infection; weather-cold `related` + ice and snow + chest infection (+ chest infection / icy pavements / slipped on ice keywords)
- Sitemap `lastmod` **2026-10-14** on the three URLs + sitemap-index; llms.txt / ai.txt preferred cites + Q&A lines
- Catalog / head data / content stats / search index regenerated; review-status test now expects Champions 62–78 pending
- **Tests:** `src/lib/__tests__/gsc-champions-76-78-14-oct.test.ts` (also checks that no post claims a clinical-team review); full Vitest suite green (114 files / 720 tests); typecheck + blog catalog check clean

### Still blocked on Louis
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply
- First 15 partner outreaches (`docs/M2-FIRST-15-OUTREACH-SEND-SHEET.md`); NHS / clinic intros (`docs/HCP-CLINIC-PACK-DISTRIBUTION.md`); live social posts (no new Facebook posts / ads without asking)
- Clinical review: pending Champions 62–78 (esp. today's antibiotic / sick-day / steroid-card wording and the falls 999 / 111 tiers), the 74 swept posts, the 23 posts fixed today and the four `/expert-articles` pieces; then `npm run blog:mark-reviewed -- <slug>`
- Decide on the mechanical frailty-template sweep (remove the empty heading, "10 million" line and random-nation sentence across 239–245 posts in one PR) vs Champion-by-Champion only
- **Lovable publish** of latest GitHub `main`, then GSC URL Inspection on the three URLs
- Fresh GSC Pages/Queries + GA4 export (needed to measure the M2 traffic KPI honestly and to re-rank the triage list)
- Approve research-fund creative before campaign posts
- Host: www→apex 301, true HTTP 404 (SPA limitation) — still open

### Next 3 digital actions (GTM)
1. ~~Champions 79–81 from the triage doc~~ **done 15 Oct:** `steroid-emergency-card-frail-arthritis-uk` (linked from the flare action plan), `shingles-vaccine-arthritis-frailty-uk` (linked from gold-pass winter viruses), `uti-confusion-arthritis-frailty-uk`
2. Champions 82–84 sleep / steroid spokes linked from gold-pass pages: `sleeping-tablets-falls-arthritis-frailty-uk`, `sleep-apnoea-arthritis-frailty-uk`, `bone-protection-steroids-arthritis-frailty-uk`
3. If Louis approves: one mechanical trust sweep PR across the remaining template posts (empty heading, "10 million" line, random-nation sentence; everything stays pending). Otherwise re-rank the triage list as soon as a fresh GSC export lands

---

## Daily log — 13 Oct 2026 (M2 day 2, weekday run)

**Programme month:** M2 (12 Oct – ~11 Nov 2026). Tracker next-3 from 12 Oct: Champions 74–75 on the last broken frailty-template winter gout spoke and the overlapping night-pain sleep post. Rewrites, not redirects; no URLs removed, no new pages, no doorway cities, no invented traffic claims, no Lovable credits / CloudAgent.

### Shipped
- **Champion 74 — `/blog/gout-winter-dehydration-frailty-uk`:** full rewrite of broken frailty template into "gout in winter: dehydration, uric acid and flares": NHS dehydration / alcohol / illness triggers, winter drinks plan, flare self-care (fluids, ice, rest), keep urate-lowering medicines during a flare unless advised otherwise, festive alcohol and sugary drinks, when a hot joint + fever needs urgent help; hand-offs to `/conditions/gout`, treatment, medication, diet and older-adult hydration spokes; **pending clinical review**
- **Champion 75 — `/blog/sleep-and-pain-management-arthritis`:** full rewrite into a distinct overnight **pain toolkit** job (evening pain-relief timing with pharmacist/GP, heat vs cold, gentle evening movement, pressure-off bed tips, when night pain means daytime disease control needs review); hands off early to `/blog/how-to-sleep-with-arthritis-uk` and differentiates from the cycle/diary and cause-checklist sleep posts; **pending clinical review**
- **`topicClusters.ts`:** treatments fronts gout winter; pain fronts night-pain toolkit (+ gout / uric acid / night-pain triggers)
- **Chatbot KB:** gout `related` + winter/dehydration keywords; sleep `related` + overnight/night-pain keywords
- Sitemap `lastmod` **2026-10-13** on the two URLs + sitemap-index; llms.txt / ai.txt preferred cites + Q&A lines
- Catalog / head data / review index regenerated; review-status test now expects Champions 62–75 pending
- **Tests:** `src/lib/__tests__/gsc-champions-74-75-13-oct.test.ts`

### Still blocked on Louis
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply
- First 15 partner outreaches; NHS intros; live social posts (no new Facebook posts / ads without asking)
- Clinical review: pending Champions 62–75 plus the 74 swept posts and the four `/expert-articles` pieces; then `npm run blog:mark-reviewed -- <slug>`
- **Lovable publish** of latest GitHub `main`, then GSC URL Inspection
- Fresh GSC Pages/Queries + GA4 export (needed to measure the M2 traffic KPI honestly)
- Approve research-fund creative before campaign posts
- Host: www→apex 301, true HTTP 404 (SPA limitation) — still open

### Next 3 digital actions (GTM)
1. ~~Frailty-template triage / next seasonal spokes~~ **done 14 Oct:** `docs/M2-FRAILTY-TEMPLATE-TRIAGE.md` + Champions 76–78
2. ~~Leftover trust/accuracy pass~~ **done 14 Oct:** 23 posts + `/self-help` virtual-physio line (see 14 Oct log)
3. ~~HCP clinic-pack distribution prep doc~~ **done 13 Oct:** `docs/HCP-CLINIC-PACK-DISTRIBUTION.md` (#189)

---

## Daily log — 12 Oct 2026 (M2 day 1, weekday run)

**Programme month:** M2 (12 Oct – ~11 Nov 2026). The 8 Oct next-3 listed Champions 74+ and a sweep of the unnamed "Clinical Advisory Panel" / "Clinical Review Board" labels. `vitamin-d-arthritis-uk` was already rewritten on 10 Oct outside this routine, so it was dropped from the list. A repo scan found the "Clinical Review Board" sentence in **74 blog posts, every one of them marked pending**, so the page claimed a review that the review status contradicts. `/expert-articles` also listed a consultant rheumatologist, registered dietitian and clinical psychologist (with degrees) as contributors we cannot name or verify. Fixing that affects far more readers than three more rewrites, so the sweep went first. No URLs removed, no new pages, no Lovable credits / CloudAgent.

### Shipped
- **74 blog posts:** "reviewed by our Clinical Review Board" replaced with an honest line (prepared by the Living With Arthritis editorial team using NICE / NHS / peer-reviewed sources; pending clinical review). Content otherwise untouched; no repo page now claims an unnamed review board or panel
- **`/expert-articles`:** removed the unverifiable four-clinician contributor panel and per-article clinician roles; byline is now "Living With Arthritis editorial team — Pending clinical review"; added a "Who writes these articles" block (charity 1218461, founded by Louis Maxwell, HCPC PH128483, link to the editorial claims policy); removed first-person clinician lines ("In my clinical practice", "I recommend"); title / meta / OG / JSON-LD no longer say "clinician-written" or "by UK clinicians". URL unchanged
- Catalog / head data / content stats / search index regenerated
- **Tests:** `src/lib/__tests__/m2-trust-sweep-12-oct.test.ts` (no unnamed panel anywhere in posts or `/expert-articles`, pending status matches the line, no private addresses)
- **M2 first-15 outreach send sheet:** `docs/M2-FIRST-15-OUTREACH-SEND-SHEET.md` (public routes only; Louis sends)

### Still blocked on Louis
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply
- First 15 partner outreaches; NHS intros; live social posts (no new Facebook posts / ads without asking)
- Clinical review: the twelve pending Champions 62–73 plus the 74 swept posts and the four `/expert-articles` pieces; then `npm run blog:mark-reviewed -- <slug>`
- **Lovable publish** of latest GitHub `main`, then GSC URL Inspection
- Fresh GSC Pages/Queries + GA4 export (needed to measure the M2 traffic KPI honestly)
- Approve research-fund creative before campaign posts
- Host: www→apex 301, true HTTP 404 (SPA limitation) — still open

### Next 3 digital actions (GTM)
1. ~~Champions 74–75~~ **done 13 Oct:** `gout-winter-dehydration-frailty-uk` + `sleep-and-pain-management-arthritis` gold-pass
2. Frailty-template sweep plan: 243 posts still open with the same "a smaller group also live with frailty" template; triage by a fresh GSC export when Louis supplies it, otherwise by October/November seasonal relevance
3. ~~M2 outreach prep~~ **done 12 Oct (afternoon):** `docs/M2-FIRST-15-OUTREACH-SEND-SHEET.md` — 15 public contact routes, copy-paste email, asset angles; Louis sends

---

## Daily log — 8 Oct 2026 (M1, weekday run)

**Programme month:** M1 (11 Sep – ~11 Oct 2026; M2 starts ~12 Oct). Tracker next-3 from 7 Oct: Champions 71+ on the remaining frailty-template winter spokes and the overlapping sleep posts, triaged by GSC impressions. The only GSC export in the repo (`docs/exports/year0-2026-09-15/`, B₁ window) shows no impressions for any of the five candidates, so triage fell back to the most broken copy plus October relevance: vitamin D (NHS autumn/winter advice starts in October; broken frailty template) and the two sleep posts carrying fake reviewer labels and an unsourced "up to 80%" claim. Rewrites, not redirects; no URLs removed, no new pages, no doorway cities, no invented traffic claims, no Lovable credits / CloudAgent.

### Shipped
- **Champion 71 — `/blog/vitamin-d-winter-arthritis-frailty-uk`:** full rewrite of broken frailty template into "vitamin D in autumn and winter with arthritis": NHS advice (consider 10 micrograms / 400 IU a day October to early March), who should take it all year (frail / housebound / care home / covered skin / dark skin), what it can and cannot do (bones and muscles, not an arthritis treatment), steroids and bone protection (never stop steroids suddenly), falls, safe limits (no more than 100 micrograms a day; follow a prescribed dose), food sources, carers, when to see a GP / 999 / NHS 111; **pending clinical review**
- **Champion 72 — `/blog/sleep-quality-arthritis-pain`:** full rewrite removing "up to 80%", vague journal claims, the "Dr. Hannah Clarke, Consultant Rheumatologist" line and the "Clinical Advisory Panel" label; narrower job: how pain and poor sleep feed each other, breaking the cycle from the pain / sleep (NHS insomnia self-help) / daytime sides, a two-week sleep and pain diary for the GP, CBT for insomnia (NICE MTG70 Sleepio), Talking Therapies, Samaritans; hands off to `/blog/how-to-sleep-with-arthritis-uk`; **pending clinical review**
- **Champion 73 — `/blog/arthritis-and-sleep-problems`:** full rewrite removing "up to 80%", the "10 million" line, the "Clinical Advisory Panel" label, mattress brands / prices / "replace every 7–10 years"; narrower job: a cause-by-cause checklist (night pain, more active inflammatory arthritis, medicines incl. NHS prednisolone-in-the-morning advice, toilet trips, restless legs, sleep apnoea, worry / low mood, fibromyalgia, bedroom habits) with who to ask, GP appointment prep, never change prescribed medicines yourself; hands off to `/blog/how-to-sleep-with-arthritis-uk`; **pending clinical review**
- **`topicClusters.ts`:** pain fronts the two sleep posts; diet fronts vitamin D in winter
- **Chatbot KB:** sleep `related` links both sleep URLs (+ "keeping me awake", "sleep diary" keywords); supplements `related` links vitamin D in winter, vitamin D line now matches NHS advice (+ "vitamin d winter", "vitamin d supplement" keywords)
- Sitemap `lastmod` **2026-10-08** on the three URLs + sitemap-index; llms.txt / ai.txt preferred cites + Q&A lines
- Catalog / head data / review index regenerated; review-status test now expects the twelve pending Champions 62–73
- **Tests:** `src/lib/__tests__/gsc-champions-71-73-08-oct.test.ts` (full Vitest suite green: 103 files / 593 tests; typecheck + blog catalog check clean)

### Still blocked on Louis
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply
- First partner outreach wave; NHS intros; live social posts (no new Facebook posts / ads without asking)
- Clinical review of the twelve pending guides (Champions 62–73), esp. vitamin D dose / steroid bone-protection wording and the sleep-cause checklist (medicines, restless legs, sleep apnoea); then `npm run blog:mark-reviewed -- <slug>`
- **Lovable publish** of latest GitHub `main`, then GSC URL Inspection on the three URLs
- Fresh GSC Pages/Queries export (the repo only holds the 14 Sep B₁ export), so Champions triage can use current impressions
- Approve research-fund creative before campaign posts
- Host: www→apex 301, true HTTP 404 (SPA limitation) — still open

### Next 3 digital actions (GTM)
1. Louis: Lovable publish of this `main` + GSC URL Inspection on `/blog/vitamin-d-winter-arthritis-frailty-uk`, `/blog/sleep-quality-arthritis-pain`, `/blog/arthritis-and-sleep-problems`
2. Month 1 close-out (Fri 9 Oct): M1 must-dos vs plan, set M2 priorities (first 15 outreaches need Louis; donate/GoFundMe CRO; HCP pack distribution prep)
3. Champions 74+: `gout-winter-dehydration-frailty-uk` (last frailty-template winter spoke), `vitamin-d-arthritis-uk` (overlaps the new vitamin D guide; "Clinical Review Board" label and "every UK patient should test" title conflict with NHS advice), `sleep-and-pain-management-arthritis` (third overlapping sleep post); then sweep the remaining posts still carrying the unnamed "Clinical Advisory Panel" / "Clinical Review Board" labels

---
## Daily log — 7 Oct 2026 (M1, weekday run)

**Programme month:** M1 (11 Sep – ~11 Oct 2026; M2 starts ~12 Oct). Tracker next-3 from 6 Oct: Champions 68+ on the remaining broken frailty-template winter spokes and the overlapping sleep posts. Chose a rewrite (not a redirect) for `best-sleep-positions-joint-pain` so it answers the narrower "which position" job and hands off to the main sleep guide; no URLs removed. No new pages, no doorway cities, no invented traffic claims, no Lovable credits / CloudAgent.

### Shipped
- **Champion 68 — `/blog/covid-winter-arthritis-frailty-uk`:** full rewrite of broken frailty template into "winter viruses and arthritis medicines": who needs extra care, vaccines to check (flu / COVID-19 / pneumococcal / shingles / RSV, without hard-coding yearly eligibility), a sick-day plan to agree with the rheumatology team (never stop or pause medicines yourself; never stop steroids suddenly; COVID-19 antiviral eligibility and lateral flow tests per the NHS page), urgent routes (999 / NHS 111 / hot swollen joint), rebuilding strength afterwards; **pending clinical review**
- **Champion 69 — `/blog/winter-arthritis-frailty-cold-houses-uk`:** full rewrite into "cold home: keep warm and keep moving": heat rooms you use (NHS 18°C), hourly movement, a five-minute warm-up, safer moving at home, GOV.UK Winter Fuel Payment / Cold Weather Payment / Warm Home Discount (devolved rules signposted), benefits links, hypothermia warning signs; **pending clinical review**
- **Champion 70 — `/blog/best-sleep-positions-joint-pain`:** full rewrite removing generic template, "25% less pain interference", "2–3 weeks" timelines and the "Clinical Review Board" label; positions by joint (knees / hips / back / shoulders / neck and hands), pillow tips, when to see a GP, CBT-I before sleeping tablets; hands off to `/blog/how-to-sleep-with-arthritis-uk`; **pending clinical review**
- **`topicClusters.ts`:** pain fronts cold home + sleep positions; treatments fronts winter viruses
- **Chatbot KB:** sleep, medicines and weather-cold `related` link the three URLs; keywords for cold house / heating costs / covid winter
- Sitemap `lastmod` **2026-10-07** on the three URLs + sitemap-index; llms.txt / ai.txt preferred cites + Q&A lines
- Catalog / head data / review index regenerated; review-status test now expects the nine pending Champions 62–70
- **Tests:** `src/lib/__tests__/gsc-champions-68-70-07-oct.test.ts` (full Vitest suite green: 102 files / 582 tests; typecheck + blog catalog check clean)

### Still blocked on Louis
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply
- First partner outreach wave; NHS intros; live social posts (no new Facebook posts / ads without asking)
- Clinical review of the nine pending guides (Champions 62–70), esp. sick-day medicine wording, COVID-19 antiviral routes and sleep-position advice; then `npm run blog:mark-reviewed -- <slug>`
- **Lovable publish** of latest GitHub `main`, then GSC URL Inspection on the three URLs
- Approve research-fund creative before campaign posts
- Host: www→apex 301, true HTTP 404 (SPA limitation) — still open

### Next 3 digital actions (GTM)
1. Louis: Lovable publish of this `main` + GSC URL Inspection on `/blog/covid-winter-arthritis-frailty-uk`, `/blog/winter-arthritis-frailty-cold-houses-uk`, `/blog/best-sleep-positions-joint-pain`
2. Month 1 close-out (Fri 9 Oct): M1 must-dos vs plan, set M2 priorities (first 15 outreaches need Louis; donate/GoFundMe CRO; HCP pack distribution prep)
3. Champions 71+: remaining frailty-template winter spokes (e.g. `vitamin-d-winter-arthritis-frailty-uk`, `gout-winter-dehydration-frailty-uk`) and the other overlapping sleep posts (`sleep-quality-arthritis-pain`, `sleep-and-pain-management-arthritis`, `arthritis-and-sleep-problems`) — triage by GSC impressions

---
## Daily log — 6 Oct 2026 (M1, weekday run)

**Programme month:** M1 (11 Sep – ~11 Oct 2026; M2 starts ~12 Oct). Tracker next-3 from 5 Oct: Champions 65+ on thin seasonal / high-intent spokes (staying active in winter, depression-when-to-seek-help). Swapped best-sleep-positions for the flu jab because October is flu-jab booking season and the old page was broken template copy; sleep positions stays as a consolidation candidate toward the gold-pass sleep URL. No new pages, no doorway cities, no invented traffic claims, no Lovable credits / CloudAgent.

### Shipped
- **Champion 65 — `/blog/staying-active-arthritis-winter-uk`:** full rewrite (removed "20–30% drop", "up to 90%" buoyancy claim, outdated Public Health England reference, product prices and a direct answer that was about vitamin D); **pending clinical review** (not reviewed by Louis Maxwell yet); CTR meta; NHS activity guidelines (older adults + 19–64) / sitting exercises / falls / keep warm / vitamin D + NICE NG226 cites; links → exercise hub, seated tai chi, knee/hip exercise guides, swimming hip OA, walking + shoes, falls prevention, pacing, flare guide, cold weather, sleep, mental health, pain relief, newly diagnosed
- **Champion 66 — `/blog/depression-arthritis-when-to-seek-help`:** full rewrite (removed "up to 1 in 3" and "25% less pain interference" claims plus generic template); **pending clinical review**; crisis callout (999 / NHS 111 mental health option / Samaritans 116 123 / Shout 85258); NHS depression + Talking Therapies (England self-referral; devolved nations via GP) + urgent mental health help / NICE CG91 + NG222 cites; links → mental health hub + guide, sleep, pacing, fatigue, flare action plan, exercises, PIP, carer's assessment, newly diagnosed
- **Champion 67 — `/blog/flu-jab-arthritis-frailty-uk`:** full rewrite of broken frailty template ("If you live in a GP surgery…") into a flu-season customer job; eligibility mirrors the NHS flu vaccine page (65+, weakened immunity incl. steroid tablets, carers / Carer's Allowance, household contacts); non-live adult jab on DMARDs/biologics; never stop medicines without advice; other vaccines signposted without hard-coding yearly eligibility; NHS flu / flu vaccine / pneumococcal / COVID-19 / shingles + UKHSA Green Book cites; links → vaccines on DMARDs guide, biologics infection guide, RA hub, DMARDs explainer, Carer's Allowance + carer's assessment, cold weather, winter activity, flare guide
- **`topicClusters.ts`:** exercises fronts winter activity; flare-ups fronts depression; treatments fronts flu jab + vaccines-on-DMARDs guide
- **Chatbot KB:** mental-health, exercise-general, DMARDs and weather-cold `related` link the three gold-pass URLs; keywords for talking therapies, winter exercise, flu jab / flu vaccine
- Sitemap `lastmod` **2026-10-06** on the three URLs + sitemap-index; llms.txt / ai.txt preferred cites + Q&A lines
- Catalog / head data / review index regenerated
- **Tests:** `src/lib/__tests__/gsc-champions-65-67-06-oct.test.ts` (full Vitest suite green: 100 files / 559 tests; blog guards + typecheck clean)

### Still blocked on Louis
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply
- First partner outreach wave; NHS intros; live social posts (no new Facebook posts / ads without asking)
- Clinical review (guides are `reviewStatus: pending` until done; then `npm run blog:mark-reviewed -- <slug>`) (winter activity / depression / flu jab — esp. flu eligibility wording, medicine-timing advice, Talking Therapies routes)
- **Lovable publish** of latest GitHub `main`, then GSC URL Inspection on the three URLs
- Approve research-fund creative before campaign posts
- Host: www→apex 301, true HTTP 404 (SPA limitation) — still open
- Optional Scenario C moonshot media budget paper

### Next 3 digital actions (GTM)
1. Louis: Lovable publish of this `main` + GSC URL Inspection on `/blog/staying-active-arthritis-winter-uk`, `/blog/depression-arthritis-when-to-seek-help`, `/blog/flu-jab-arthritis-frailty-uk`
2. Month 1 close-out (~9 Oct): M1 must-dos vs plan, set M2 priorities (first 15 outreaches need Louis; winter spokes; donate/GoFundMe CRO; HCP pack distribution prep)
3. Champions 68+: remaining broken frailty-template winter spokes (`covid-winter-arthritis-frailty-uk`, `winter-arthritis-frailty-cold-houses-uk`; about 70 posts still carry the same template lines such as "If you live in a GP surgery" / "several joints prefer" — triage by GSC impressions) and consolidate overlapping sleep posts (`best-sleep-positions-joint-pain`, `sleep-quality-arthritis-pain`) toward the gold-pass sleep URL

---
## Daily log — 5 Oct 2026 (M1, weekday run)

**Programme month:** M1 (11 Sep – ~11 Oct 2026; M2 starts ~12 Oct). Tracker next-3 from 2 Oct: Champions 62+ on remaining thin high-intent spokes (night pain / sleep / mental health). Added cold-weather because October is when winter-pain searches start. No new doorway cities. No invented traffic claims. No Lovable credits / CloudAgent.

### Shipped
- **Champion 62 — `/blog/how-to-sleep-with-arthritis-uk`:** full rewrite (removed unsourced "80% of people" claim and duplicated template blocks); **pending clinical review** (not reviewed by Louis Maxwell yet); CTR meta; NHS insomnia / how to get to sleep / sleep apnoea + NICE NG226 cites; settle-pain-before-bed, pillows by joint, 3am waking, CBT-I-before-tablets; dense links → pain relief, fatigue, pacing, flare guide + action plan, exercises, walking, mental health, newly diagnosed, PIP
- **Champion 63 — `/blog/arthritis-and-mental-health-uk`:** full rewrite (removed unsourced "2-3 times more likely" claim); **pending clinical review**; CTR meta; crisis callout (999 / Samaritans 116 123 / NHS 111); NHS Talking Therapies (England self-referral; devolved nations via GP) / NHS depression + GAD / NICE CG91 / Samaritans cites; dense links → mental health hub, sleep, fatigue, pacing, flare action plan, carer's assessment, work, PIP
- **Champion 64 — `/blog/cold-weather-arthritis-uk-winter`:** full rewrite (removed unsourced "25% less pain interference" and generic template); **pending clinical review**; CTR meta; honest "research is mixed" framing; NHS keep warm keep well / vitamin D / older-adult activity / Raynaud's + GOV.UK Winter Fuel + Cold Weather Payment cites; links → pain relief, exercises, walking, winter activity, flare guide, sleep, Attendance Allowance, PIP
- **`topicClusters.ts`:** pain fronts sleep + cold weather; flare-ups fronts mental-health blog + sleep
- **Chatbot KB:** sleep / mental-health / heat-cold `related` now point at the three gold-pass URLs; sleep + winter/cold-weather keywords
- Sitemap `lastmod` **2026-10-05** on the three URLs + sitemap-index; llms.txt / ai.txt preferred cites + Q&A lines
- Catalog / head data / review index regenerated
- **Tests:** `src/lib/__tests__/gsc-champions-62-64-05-oct.test.ts` (full Vitest suite green: 99 files / 551 tests)

### Still blocked on Louis
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply
- First partner outreach wave; NHS intros; live social posts (no new Facebook posts / ads without asking)
- Clinical review (guides are `reviewStatus: pending` until done; then `npm run blog:mark-reviewed -- <slug>`) (sleep / mental health / cold-weather blogs — esp. CBT-I, Talking Therapies routes, vitamin D wording)
- **Lovable publish** of latest GitHub `main`, then GSC URL Inspection on the three URLs
- Approve research-fund creative before campaign posts
- Host: www→apex 301, true HTTP 404 (SPA limitation) — still open
- Optional Scenario C moonshot media budget paper

### Next 3 digital actions (GTM)
1. Louis: Lovable publish of this `main` + GSC URL Inspection on `/blog/how-to-sleep-with-arthritis-uk`, `/blog/arthritis-and-mental-health-uk`, `/blog/cold-weather-arthritis-uk-winter`
2. Month 1 close-out (~9 Oct): summarise M1 must-dos vs plan and set M2 priorities (winter-season spokes, donate/GoFundMe CRO, HCP pack distribution prep)
3. Champions 65+ on remaining thin seasonal / high-intent spokes (e.g. staying active in winter, best sleep positions, depression-when-to-seek-help) — consolidate overlapping sleep posts toward the gold-pass URL rather than adding new pages

---
## Daily log — 2 Oct 2026 (M1, weekday run)

**Programme month:** M1 (11 Sep – ~11 Oct 2026). Tracker next-3 from 1 Oct: Champions 59+ (attendance-allowance / flare-up / fatigue polish if still thin); continue M3 pillar spoke density once live. No new doorway cities. No invented traffic claims. No Lovable credits / CloudAgent. `OsteoarthritisHub.tsx` fake stats left untouched (not routed).

### Shipped
- **Champion 59 — `/blog/attendance-allowance-arthritis-frailty-uk`:** rewritten for UK-wide Attendance Allowance jobs (not Wales frailty template); clinical review **2026-10-02** (Louis Maxwell HCPC PH128483); CTR `meta_title`/`meta_description`; GOV.UK Attendance Allowance + eligibility + PIP + NHS OA / NICE NG226 cites; dense customer-job links (PIP hub/FAQ/blog, Carer's Allowance, carer's assessment, evidence diary, newly diagnosed, pain, joint protection); charity 1218461 education line
- **Champion 60 — `/blog/arthritis-flare-up-what-to-do`:** review **2026-10-02**; CTR meta; Arthritis UK flare-ups / NHS RA + OA / NICE NG226 / NHS sleep cites; denser links → flare guide, flare action plan, pain, pacing, joint protection, exercises, walking, newly diagnosed, PIP
- **Champion 61 — `/blog/arthritis-fatigue-management-uk`:** review **2026-10-02**; CTR meta; Arthritis UK fatigue / NHS sleep / NICE NG226 / NHS OT / NHS RA cites; denser links → pacing, pain, exercises, flares, joint protection, newly diagnosed, Access to Work, PIP
- **`topicClusters.ts`:** pip fronts attendance-allowance; pain + flare-ups front flare-up + fatigue (without stealing PIP ownership of benefits spokes)
- Light **chatbot KB** refresh: benefits/access-to-work related + flare + fatigue → three gold-pass URLs; attendance allowance keyword
- Sitemap `lastmod` **2026-10-02** on the three URLs + sitemap-index; llms.txt / ai.txt preferred cites + Q&A lines
- Catalog meta/`last_reviewed` synced for the three slugs
- **Tests:** `src/lib/__tests__/gsc-champions-59-61-02-oct.test.ts`

### Still blocked on Louis
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply
- First partner outreach wave; live social posts (no new Facebook posts / ads without asking)
- Clinical spot-check (attendance-allowance / flare-up / fatigue blogs)
- **Lovable publish** of latest GitHub `main`
- **GSC URL Inspection** after publish (three Champions 59–61 URLs + prior Champions/pillars)
- FormSubmit activate if newsletter still pending
- Approve research-fund creative before campaign posts
- Host: www→apex 301, true HTTP 404 (SPA limitation) — still open
- Optional Scenario C moonshot media budget paper
- NHS intros / partner outreach still Louis-only

### Next 3 digital actions (GTM)
1. Louis: Lovable publish of this `main` + GSC URL Inspection on `/blog/attendance-allowance-arthritis-frailty-uk`, `/blog/arthritis-flare-up-what-to-do`, `/blog/arthritis-fatigue-management-uk`
2. Champions 62+ from next GSC refresh / remaining thin high-intent spokes (e.g. night-pain / sleep / mental-health polish if still thin; no doorway cities)
3. Continue M3 pillar spoke density once live HTML confirms — outreach / Ad Grants / Regulator still blocked-on-Louis

---
## Daily log — 1 Oct 2026 (M1, weekday run)

**Programme month:** M1 (11 Sep – ~11 Oct 2026). Tracker next-3 from 30 Sep: Champions 56+ (carers-assessment polish if still thin); continue M3 pillar spoke density once live. No new doorway cities. No invented traffic claims. No Lovable credits / CloudAgent. `OsteoarthritisHub.tsx` fake stats left untouched (not routed).

### Shipped
- **Champion 56 — `/blog/carers-assessment-arthritis-frailty-uk`:** rewritten for UK-wide carer's assessment jobs (not frailty-Scotland template); clinical review **2026-10-01** (Louis Maxwell HCPC PH128483); CTR `meta_title`/`meta_description`; NHS carer's assessments / social care + GOV.UK Carer's Allowance + NICE NG226 cites; dense customer-job links (Carer's Allowance, PIP hub/FAQ/blog, sick-pay, Access to Work, newly diagnosed, pain); charity 1218461 education line
- **Champion 57 — `/blog/energy-management-and-pacing-arthritis`:** review **2026-10-01**; CTR meta; NHS sleep/tiredness / NICE NG226 / Arthritis UK managing symptoms / NHS OT cites; denser links → pain, exercise, joint protection, walking, flares, newly diagnosed, Access to Work, PIP
- **Champion 58 — `/blog/arthritis-and-work-uk`:** review **2026-10-01**; CTR meta; GOV.UK Equality Act / Access to Work / flexible working + Acas + Arthritis UK work cites; denser links → Access to Work, sick-pay, work guide, pacing, PIP hub/FAQ, newly diagnosed, pain
- **`topicClusters.ts`:** pip fronts carers-assessment + arthritis-at-work; pain + flare-ups front pacing
- Light **chatbot KB** refresh: access-to-work related + fatigue related → three gold-pass URLs; carers-assessment / pacing keywords
- Sitemap `lastmod` **2026-10-01** on the three URLs + sitemap-index; llms.txt / ai.txt preferred cites + Q&A lines
- Catalog meta/`last_reviewed` synced for the three slugs
- **Tests:** `src/lib/__tests__/gsc-champions-56-58-01-oct.test.ts`

### Still blocked on Louis
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply
- First partner outreach wave; live social posts (no new Facebook posts / ads without asking)
- Clinical spot-check (carers-assessment / pacing / work blogs)
- **Lovable publish** of latest GitHub `main`
- **GSC URL Inspection** after publish (three Champions 56–58 URLs + prior Champions/pillars)
- FormSubmit activate if newsletter still pending
- Approve research-fund creative before campaign posts
- Host: www→apex 301, true HTTP 404 (SPA limitation) — still open
- Optional Scenario C moonshot media budget paper
- NHS intros / partner outreach still Louis-only

### Next 3 digital actions (GTM)
1. Louis: Lovable publish of this `main` + GSC URL Inspection on `/blog/carers-assessment-arthritis-frailty-uk`, `/blog/energy-management-and-pacing-arthritis`, `/blog/arthritis-and-work-uk`
2. Champions 59+ from next GSC refresh / remaining thin high-intent spokes (e.g. attendance-allowance / flare-up / fatigue polish if still thin; no doorway cities)
3. Continue M3 pillar spoke density once live HTML confirms — outreach / Ad Grants / Regulator still blocked-on-Louis

---
## Daily log — 30 Sep 2026 (M1, weekday run)

**Programme month:** M1 (11 Sep – ~11 Oct 2026). Tracker next-3 from 29 Sep: Champions 53+ (sick-pay / carers / joint-protection polish); continue M3 pillar spoke density once live. No new doorway cities. No invented traffic claims. No Lovable credits / CloudAgent. `OsteoarthritisHub.tsx` fake stats left untouched (not routed).

### Shipped
- **Champion 53 — `/blog/sick-pay-fit-notes-time-off-work-arthritis`:** clinical review **2026-09-30** (Louis Maxwell HCPC PH128483); CTR `meta_title`/`meta_description`; GOV.UK SSP / sick leave / Equality Act / PIP citations; denser customer-job links (Access to Work, PIP hub/FAQ/blog, carers, newly diagnosed, pain, work guide); charity 1218461 education line
- **Champion 54 — `/blog/carers-allowance-help-if-you-care-for-someone`:** review **2026-09-30**; CTR meta; GOV.UK Carer's Allowance / NHS carer's assessments / PIP cites; denser links → PIP hub/FAQ, carers assessment, sick-pay, Access to Work, newly diagnosed, pain
- **Champion 55 — `/blog/joint-protection-easier-everyday-tasks`:** review **2026-09-30**; CTR meta; NHS OT / NICE NG226 / Versus Arthritis cites; denser links → OA hub, pain, exercise hub, walking, swimming hip OA, pacing, newly diagnosed, PIP
- **`topicClusters.ts`:** pip cluster fronts sick-pay + carers (+ Access to Work); osteoarthritis + pain front joint-protection (without stealing PIP ownership of work/benefits spokes)
- Light **chatbot KB** refresh: access-to-work related links + sick-pay/carers keywords; oa-general → joint-protection
- Sitemap `lastmod` **2026-09-30** on the three URLs + sitemap-index; llms.txt / ai.txt preferred cites + SSP/carers Q&A lines
- Catalog meta/`last_reviewed` synced for the three slugs
- **Tests:** `src/lib/__tests__/gsc-champions-53-55-30-sep.test.ts`

### Still blocked on Louis
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply
- First partner outreach wave; live social posts (no new Facebook posts / ads without asking)
- Clinical spot-check (sick-pay / carers / joint-protection blogs)
- **Lovable publish** of latest GitHub `main`
- **GSC URL Inspection** after publish (three Champions 53–55 URLs + prior Champions/pillars)
- FormSubmit activate if newsletter still pending
- Approve research-fund creative before campaign posts
- Host: www→apex 301, true HTTP 404 (SPA limitation) — still open
- Optional Scenario C moonshot media budget paper
- NHS intros / partner outreach still Louis-only

### Next 3 digital actions (GTM)
1. Louis: Lovable publish of this `main` + GSC URL Inspection on `/blog/sick-pay-fit-notes-time-off-work-arthritis`, `/blog/carers-allowance-help-if-you-care-for-someone`, `/blog/joint-protection-easier-everyday-tasks`
2. Champions 56+ from next GSC refresh / remaining thin high-intent spokes (e.g. carers-assessment polish if still thin; no doorway cities)
3. Continue M3 pillar spoke density once live HTML confirms — outreach / Ad Grants / Regulator still blocked-on-Louis

---
## Daily log — 29 Sep 2026 (M1, weekday run)

**Programme month:** M1 (11 Sep – ~11 Oct 2026). Tracker next-3 from 28 Sep: Champions 49+ from remaining thin high-impression / customer-job URLs; continue M3 pillar spoke density. No new doorway cities. No invented traffic claims. No Lovable credits / CloudAgent. `OsteoarthritisHub.tsx` fake stats left untouched (not routed).

### Shipped
- **Champion 49 — `/about`:** CTR title/meta for customer-job trust (not vanity); `EducationalDisclaimerBox` **2026-09-29**; above-fold “Start with what you need today” links → newly diagnosed / pain / OA / exercise / PIP / disability FAQ / symptom checker / diet; Gift Aid honesty retained; no private address
- **Champion 50 — `/guides/newly-diagnosed`:** `lastReviewed` **2026-09-29**; denser customer-job hubs (OA, disability FAQ, Access to Work, walking, swimming hip OA, joint protection, symptom checker); visible NHS / NICE NG226 / NG100 / Versus Arthritis cites; TopicClusterNav retained; next-step grid refreshed
- **Champion 51 — `/blog/access-to-work-scheme-arthritis-guide`:** clinical review **2026-09-29** (Louis Maxwell HCPC PH128483); CTR `meta_title`; GOV.UK Access to Work / Equality Act / reasonable adjustments / PIP citations; customer-job internal links (PIP hub/FAQ, sick-pay, carers, newly diagnosed, pain, library Access to Work)
- **Champion 52 — `/blog/walking-with-arthritis-start-build-up-keep-going`:** review **2026-09-29**; denser links → exercise hub / swimming hip OA / walking shoes / OA / pain / newly diagnosed / joint protection / PIP
- **`topicClusters.ts` (symptoms):** fronted OA / pain / exercise / walking / joint-protection spokes without stealing PIP ownership of Access to Work / disability FAQ
- Light **chatbot KB** refresh: newly-diagnosed intent now links `/guides/newly-diagnosed` + pain / PIP / Access to Work
- Sitemap `lastmod` **2026-09-29** on the four URLs + sitemap-index; llms.txt / ai.txt Access to Work blog cite
- **Tests:** `src/lib/__tests__/gsc-champions-49-52-29-sep.test.ts` (6 passing locally)

### Still blocked on Louis
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply
- First partner outreach wave; live social posts (no new Facebook posts / ads without asking)
- Clinical spot-check (about CRO + newly-diagnosed + Access to Work / walking blogs)
- **Lovable publish** of latest GitHub `main`
- **GSC URL Inspection** after publish (four Champions 49–52 URLs + prior pillars)
- FormSubmit activate if newsletter still pending
- Approve research-fund creative before campaign posts
- Host: www→apex 301, true HTTP 404 (SPA limitation) — still open
- Optional Scenario C moonshot media budget paper

### Next 3 digital actions (GTM)
1. Louis: Lovable publish of this `main` + GSC URL Inspection on `/about`, `/guides/newly-diagnosed`, `/blog/access-to-work-scheme-arthritis-guide`, `/blog/walking-with-arthritis-start-build-up-keep-going`
2. Champions 53+ from next GSC refresh / remaining thin high-intent spokes (sick-pay / carers / joint-protection polish if still thin; no doorway cities)
3. Continue M3 pillar spoke density once live HTML confirms — outreach / Ad Grants / Regulator still blocked-on-Louis

---

## Daily log — 28 Sep 2026 (M1, weekday run)

**Programme month:** M1 (11 Sep – ~11 Oct 2026). Tracker next-3 from 24 Sep: Champions 47+ + early M3 pillar deepen (pain / OA / exercise / PIP cross-linking gold-passed FAQ/blog). CEO M3 must-do pulled early: 4 pillars to gold standard. No new doorway cities. No invented traffic claims. No Lovable credits / CloudAgent. `OsteoarthritisHub.tsx` fake stats left untouched (not routed).

### Shipped
- **OA pillar deepen** (`/conditions/osteoarthritis`): `lastReviewed` **2026-09-28**; customer-job nav + denser ContextualLinks → pain hub, exercise hub, swimming hip OA, walking-with-arthritis, walking shoes, knee supplements (honest no-rebuild framing), joint-protection, benefits-PIP hub + disability benefits FAQ; NHS/NICE cites retained
- **Pain pillar deepen** (`/guides/arthritis-pain-relief`): `lastReviewed` **2026-09-28**; strengthened links to swimming / walking / OA hub / exercise hub / PIP FAQ+hub / omega-3 + RA diet
- **Exercise pillar deepen** (`/exercises`): `lastReviewed` **2026-09-28**; swimming hip OA + walking-with-arthritis surfaced in additionalActivities, ContextualLinks and customer-job strip
- **PIP pillar deepen** (`/benefits-pip`): `lastReviewed` **2026-09-28**; Access to Work blog + sick-pay/fit-notes + Carer's Allowance blogs (published URLs); Gift Aid / money claims stay honest
- **`topicClusters.ts`**: fronted walking / joint-protection / gold-pass B₁ paths in OA / exercises / pain / PIP `supportingPaths` (without stealing PIP/diet ownership of FAQ/omega-3)
- Light **chatbot KB** related-link refresh (oa-general, oa-exercise, pain, pip-benefits, access-to-work)
- Optional: sitemap `lastmod` **2026-09-28** on the four pillar URLs + sitemap-index
- **Tests:** `src/lib/__tests__/gsc-champions-47-48-28-sep.test.ts`

### Still blocked on Louis
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply
- First partner outreach wave; live social posts
- Clinical spot-check (pillar deepen wording + PIP/work/carer blogs)
- **Lovable publish** of latest GitHub `main`
- **GSC URL Inspection** after publish (four pillars + prior Champions gold-pass URLs)
- FormSubmit activate if newsletter still pending
- Approve research-fund creative before campaign posts
- Host: www→apex 301, true HTTP 404 (SPA limitation) — still open
- Optional Scenario C moonshot media budget paper

### Next 3 digital actions (GTM)
1. Louis: Lovable publish of this `main` + GSC URL Inspection on `/conditions/osteoarthritis`, `/guides/arthritis-pain-relief`, `/exercises`, `/benefits-pip` (and prior Champions)
2. Champions 49+ from next GSC refresh / remaining thin high-impression URLs (no doorway cities)
3. Continue M3 pillar spoke density once live HTML confirms — outreach / Ad Grants / Regulator still blocked-on-Louis

---

## Daily log — 24 Sep 2026 (evening) — Tony Jung checklist polish (M1)

**Programme month:** M1 (11 Sep – ~11 Oct 2026). Code-side gaps from Louis’s Tony Jung Video A/B checklists. No new city doorway pages. No Wordfence (Vite/React SPA). No invented traffic / Bing / GBP Place ID. No Lovable `send_message` for code. No Cursor CloudAgent.

### Shipped (this PR)
- **Breadcrumbs:** `PageBreadcrumb` (+ BreadcrumbList JSON-LD) on Contact, Guides hub, Benefits & PIP hub, LibraryTopic, FaqArticle (migrated off duplicate injectJsonLd breadcrumb). Confirmed already present: ConditionPageTemplate / ConditionSubpagePage, ExerciseHub, DietHub, SymptomChecker, Understanding Pain. BlogPost already had UI + BreadcrumbList — left as-is to avoid JSON-LD collision.
- **Indexing docs:** `docs/seo/INDEXING-CHECKLIST.md` — submit sitemap, GSC inspect after Lovable publish, www→301 note, Bing empty-safe path, GBP map env, backups, SPA security headers (not Wordfence), city doorways explicitly **not** a growth lever.
- **GBP map hook:** conditional `GbpMapSection` on Contact — iframe only when `VITE_GBP_MAPS_EMBED_URL` is an allowlisted Maps embed URL; otherwise UK contact + “Map goes live once Google Business Profile is verified”. areaServed GB; no street address / no Oswestry.
- **Bing:** `VITE_BING_SITE_VERIFICATION` → `msvalidate.01` via `SeoDefaults` when set (no invented token / no BingSiteAuth.xml).
- **CSP:** Maps hosts added to `frame-src` in `public/_headers`, `index.html`, `.htaccess` so the embed can load once Louis sets the env.
- **Security:** confirmed repo `_headers` already has HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, CSP `frame-ancestors` — documented; Cloudflare may still send a subset live.
- **Tests:** `src/config/__tests__/gbpMaps.test.ts`, `src/components/contact/__tests__/GbpMapSection.test.tsx`, `src/lib/__tests__/tony-jung-checklist-24-sep.test.ts`
- **Skipped on purpose:** new city doorway pages; Wordfence; thin new service spam pages; title churn on gold-passed hubs; invented GSC/Bing tokens.

### Still blocked on Louis
- Verify / optimize **Google Business Profile**; paste Maps embed URL into `VITE_GBP_MAPS_EMBED_URL` after verify
- Bing Webmaster claim → set `VITE_BING_SITE_VERIFICATION`
- **Lovable publish** of latest GitHub `main`
- **GSC URL Inspection** after publish (Champions + any soft-404 fixes)
- Host: **www→apex 301**, true HTTP 404 (SPA limitation)
- Prior open: Fundraising Regulator, Gift Aid HMRC, Ad Grants, outreach/social, clinical spot-check

### Next 3 digital actions (GTM)
1. Louis: Lovable publish + GSC inspect + www 301 confirm
2. Louis: GBP verify → embed URL env; Bing code → env
3. Champions 47+ from next GSC refresh (no doorway cities)

---

## Daily log — 24 Sep 2026 (M1, weekday run)

**Programme month:** M1 (11 Sep – ~11 Oct 2026). Tracker next-3 from 23 Sep: Champions 45+ from GSC refresh — B₁ thin FAQ `/faq/arthritis-disability-benefits-uk` (#3 clicks) + `/blog/anti-inflammatory-diet-rheumatoid-arthritis` (#10). No new doorway cities. No invented traffic claims. No Lovable credits / CloudAgent.

### Shipped
- **Champions 45–46:** gold-pass `/faq/arthritis-disability-benefits-uk` — per-article CTR `seoTitle`/`metaDescription`, `lastReviewed` **2026-09-24**, GOV.UK (+ mygov.scot ADP) citations rendered on FAQ page, Access to Work + benefits-PIP hub / PIP blog / disability support / pain / newly-diagnosed links; cluster nav already wired
- **Champions 45–46:** gold-pass `/blog/anti-inflammatory-diet-rheumatoid-arthritis` — unique CTR meta/OG, Louis Maxwell HCPC review **2026-09-24**, NHS/NICE/Versus Arthritis citations, food-first / not-a-cure framing, customer-job links (pain / newly diagnosed / PIP / diet) + RA condition + omega-3 + supplements caution
- Light chatbot KB related-link refresh (PIP FAQ + RA diet article); sitemap `lastmod` + `llms.txt` / `ai.txt` preferred cites
- **Tests:** `src/lib/__tests__/gsc-champions-45-46-24-sep.test.ts`

### Still blocked on Louis
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply
- First partner outreach wave; live social posts
- Clinical spot-check (PIP FAQ wording + RA diet / methotrexate alcohol caution)
- **Lovable publish** of latest GitHub `main`
- **GSC URL Inspection** after publish (disability benefits FAQ + RA diet blog + prior gold-pass URLs)
- FormSubmit activate if newsletter still pending
- Approve research-fund creative before campaign posts
- Host: www→apex 301, true HTTP 404 (SPA limitation) — still open
- Optional Scenario C moonshot media budget paper

### Next 3 digital actions (GTM)
1. Louis: Lovable publish of this `main` + GSC URL Inspection on FAQ disability benefits + RA diet blog (and prior Champions)
2. Champions 47+ from next GSC refresh / thin high-impression URLs still without gold-pass chrome (no doorway cities)
3. Early M3 pillar deepen (pain / OA / exercise / PIP hubs cross-linking gold-passed FAQ/blog) once live HTML confirms — outreach / Ad Grants / Regulator still blocked-on-Louis

---

## Daily log — 23 Sep 2026 (evening polish) (M1)

**Programme month:** M1 (11 Sep – ~11 Oct 2026).

### Shipped
- **Sitemap crawl-budget (#78 merged):** visitor-job URLs kept; thin utility/SKU shells de-advertised; real `<lastmod>` only; JSON-LD audit no longer forces missing `/product/comp-1` prerender HTML
- **Evening polish PR (this branch):** gold-pass next B₁ thin blogs `/blog/pip-for-arthritis-uk` + `/blog/omega-3-foods-for-joints` — unique meta, Louis Maxwell HCPC review **2026-09-23**, GOV.UK/NHS/NICE/Versus Arthritis citations, customer-job links (pain / newly diagnosed / PIP / diet + Access to Work on PIP; supplements hubs + food-first limits on omega-3); Vitest gate; homepage AEO `updatedAt`; mobile nav focus/`aria-controls`; Listen control ring contrast
- Honest note: **rankings will not jump overnight** — GSC inspect + Semrush recrawl + Lovable publish still needed after merge

### Still open / Louis
- PR #70 foot/ankle + Access to Work + falls (updated on branch; merge when CI green)
- PR #73 Understanding Pain (ai-head-data fix pushed; merge when CI green)
- Host: www→apex 301, real HTTP 404 (SPA limitation)
- GSC URL inspect / sitemap resubmit; Semrush recrawl; Lovable publish of main

### Next 3 digital actions (GTM)
1. Merge visitor-job hubs (#70) + Understanding Pain (#73) when checks clear
2. Lovable publish + GSC inspect of gold-passed blogs
3. Champions 45+ from next GSC refresh (no doorway cities)

## Daily log — 23 Sep 2026 (M1, weekday run)

**Programme month:** M1 (11 Sep – ~11 Oct 2026). Morning growth routine had failed earlier today; resumed with shippable GSC blog gold-pass (no Louis blockers). Soft-404 alias PR #76 still open separately. No new doorway cities. No invented traffic claims.

### Shipped
- **Champions 43–44 (B₁ GSC top-click blogs):** gold-pass `/blog/swimming-exercises-hip-osteoarthritis` (#1 clicks) and `/blog/best-supplement-for-knee-joint` (#2 clicks) — unique CTR title/meta/OG, Louis Maxwell HCPC review **2026-09-23**, real NHS/NICE/Versus Arthritis citations, customer-job links (pain relief / newly diagnosed / PIP / diet), OA+exercise hubs on swimming, supplements hubs + honest “no rebuild” framing on knee supplements; removed invented clinician bylines risk; sitemap `lastmod` + `llms.txt` / `ai.txt` preferred cites refreshed
- **Tests:** `src/lib/__tests__/gsc-blog-gold-pass-23-sep.test.ts`

### Still blocked on Louis
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply
- First partner outreach wave; live social posts (incl. swimming + knee-supplement blogs + prior hubs)
- Clinical spot-check (aquatic exercise wording + supplement caution)
- **Lovable publish** of latest GitHub `main` (includes Listen fix #75 + this gold-pass once merged)
- **GSC URL Inspection** after publish (swimming + knee-supplement blogs, prior sprint URLs)
- FormSubmit activate if newsletter still pending
- Approve research-fund creative before campaign posts
- Soft-404 alias PR #76 merge + Semrush re-crawl after publish (host 404/www-301 still need Hostinger/CF)
- Optional Scenario C moonshot media budget paper

### Next 3 digital actions (GTM)
1. Merge soft-404 PR #76 when CI green; Louis: Lovable publish + GSC inspect swimming/knee-supplement + social posts with real links
2. Gold-pass next B₁ GSC blogs still thin: `/blog/pip-for-arthritis-uk`, `/blog/omega-3-foods-for-joints` (and anti-inflammatory RA diet if impressions hold)
3. Early M3 pillar deepen (pain / OA / exercise / PIP cross-links + FAQ density) once publish confirms live HTML — still no Louis-only outreach/Ad Grants/Regulator

---

## Daily log — 21 Sep 2026 (M1, weekday run)

**Programme month:** M1 (11 Sep – ~11 Oct 2026). Next-3 from 20 Sep: symptom-checker / FAQ CRO (shippable without Louis). No new doorway cities. No invented traffic claims. No 100M visitor promises.

### Shipped
- **M1 conversion KPI — Checker→email CTA live:** post-results `EmailSignupForm` on `/symptom-checker` (`sequence="symptom-checker"`, PECR copy, charity 1218461, educational-not-diagnostic). Soft extras (chat / guides / donate) unchanged.
- **FAQ hub CRO:** customer-job high-intent strip (pain now, newly diagnosed, symptom checker, PIP FAQ/blog, exercises); optional PECR email band (`sequence="faq-hub"`); hero subtitle reframed for patients/carers; clinical review **2026-09-21** on FAQ hub + symptom checker.
- **Tests:** `src/lib/__tests__/checker-faq-email-cro.test.ts`

### Still blocked on Louis
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply
- First partner outreach wave; live social posts (incl. shoes/turmeric + hubs)
- Clinical spot-check (checker email CTA wording + FAQ hub CTAs; prior turmeric/footwear)
- **Lovable publish** of latest GitHub `main` (includes branded search + homepage title fix + this CRO)
- **GSC URL Inspection** after publish (homepage, about, sprint blogs/hubs, `/symptom-checker`, `/faq`)
- FormSubmit activate if newsletter still pending
- Approve research-fund creative before campaign posts
- Optional Scenario C moonshot media budget paper

### Next 3 digital actions (GTM)
1. Louis: Lovable publish + GSC inspect + first social posts with real links
2. Early M3 pillar gold deepen (pain / OA / exercise / PIP) once publish confirms live HTML
3. Partner outreach / Ad Grants / Regulator / Gift Aid (still blocked-on-Louis)

## Daily log — 20 Sep 2026 (M1, weekend visibility sprint)

**Programme month:** M1 (11 Sep – ~11 Oct 2026). Champions 41–42 from 18 Sep next-3 (blog walking-shoes + turmeric gold-pass + customer-job hub polish). No new doorway cities. No invented traffic claims.

### Shipped
- **Blog gold-pass:** `/blog/best-walking-shoes-arthritis-uk` and `/blog/turmeric-for-arthritis` — unique title/meta/OG, Louis Maxwell HCPC review, real NHS/NICE/Versus Arthritis/GOV.UK citations, internal links to diet / exercise / pain relief / newly-diagnosed / PIP, `lastReviewed` via `updated_at` **2026-09-20**; removed duplicate filler and invented “Dr Anil Patel” line on turmeric
- **Customer-job hubs:** above-fold clarity + next-step CTAs on `/guides/arthritis-pain-relief`, `/guides/newly-diagnosed`, `/benefits-pip` (review **2026-09-20**)
- **Crawl/AI:** URLs already in sitemap; IndexNow list adds pain-relief; `llms.txt` / `ai.txt` preferred pages mention pain-relief + PIP hub; blog-head-data regenerated for share packaging
- **Tests:** `src/lib/__tests__/visibility-sprint-shoes-turmeric.test.ts`


### Evening visibility pass (20 Sep 2026, Europe/London)
- **Static head sync:** Helmet CTR titles for homepage, pain-relief, newly-diagnosed, benefits-PIP, Mediterranean diet and turmeric supplement now match `scripts/ai-head-data.json` (crawlers no longer see stale/homepage titles on those URLs). Added `/supplements/turmeric` curated head + visible FAQ pairs for AEO.
- **Internal links:** Cross-links between customer-job hubs and walking-shoes / turmeric / Mediterranean spokes; `TopicClusterNav` on turmeric supplement.
- **Crawl:** Sitemap `lastmod` 2026-09-20 on the hubs; IndexNow list + `llms.txt` / `ai.txt` / `.well-known` preferred cites refreshed. Robots still allows them. Soft-404: unknown slugs stay noindex; real hubs not noindex.
- **Tests:** `src/lib/__tests__/evening-visibility-pass.test.ts` (+ existing seo-identity).
- **Louis next:** Lovable publish of this `main` SHA, then GSC URL Inspection on the URL list in the PR.

### Still blocked on Louis
- Fundraising Regulator pathway + Gift Aid HMRC registration before live reclaim copy
- Google Ad Grants / Google for Nonprofits apply
- First partner outreach wave; live social posts linking the two blogs + hubs
- Clinical spot-check (turmeric safety / footwear advice)
- **Lovable publish** of latest GitHub `main`
- **GSC URL Inspection** on the gold-passed blog + hub URLs after publish
- FormSubmit activate if newsletter still pending

### Next 3 digital actions (GTM)
1. Louis: Lovable publish + GSC inspect the sprint URLs + social posts with real links
2. Symptom-checker / FAQ CRO using next GSC refresh (no invented KPIs)
3. Partner outreach / Ad Grants (still blocked-on-Louis)

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
1. ~~Cluster density / gold-pass on blog walking-shoes + turmeric~~ — **done 20 Sep** (Champions 41–42)
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


### 23 Oct 2026 — blog clinical audit complete

- Louis Maxwell (HCPC PH128483) clinically audited all published blog guides. The blog pending-review state and `blog:mark-reviewed` script were removed; every guide shows Louis Maxwell as author and reviewer, and a "Download this guide (PDF)" button sits under every post. Earlier "then `npm run blog:mark-reviewed`" notes above are historical.
