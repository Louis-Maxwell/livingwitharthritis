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
