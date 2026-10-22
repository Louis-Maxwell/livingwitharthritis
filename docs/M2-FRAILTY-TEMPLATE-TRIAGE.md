# M2 frailty-template triage (written 14 Oct 2026)

**Programme month:** M2 (12 Oct – ~11 Nov 2026), weekday routine day 3.
**Purpose:** plan which of the remaining broken frailty-template blog posts to rewrite next as SEO Champions, without mass-rewriting hundreds of pages in one go.

## The fingerprint

These posts all came from the same generator in early September 2026. They share the same faults:

- The line "Around 10 million people in the UK live with arthritis; a smaller group also live with frailty as a clinical syndrome"
- "several joints" pasted in as if it were a condition name ("sore several joints", "today's several joints")
- "If you live in a GP surgery" / "If you live in a home" filler
- A UK nation chosen at random (Wales, Scotland, Northern Ireland, England) in the intro, keywords and service paragraph, even when the topic has nothing to do with that nation
- An empty heading ("The wider health picture around …") followed straight away by another heading
- Osteoarthritis exercise advice ("NICE is clear that exercise is core care for osteoarthritis") on pages about other conditions, such as gout, RA steroids or chest infections
- A quick answer that just repeats the intro and does not answer the question

## Count (repo scan, 14 Oct 2026, after Champions 76–78)

| Marker | Posts |
|---|---|
| "a smaller group also live with frailty" (main fingerprint) | **245** (248 before today's three rewrites) |
| Empty heading followed straight away by another heading | 239 |
| OA "core care" paragraph | 154 |
| "If you live in a GP surgery" | 8 |

All 245 are already `reviewStatus: pending`, so none of them claims a clinical review. Since 12 Oct no post carries an unnamed review board or panel. The 14 Oct spot-check also removed "reviewed by our clinical team" from 23 pending posts that are not template posts.

## GSC signal (honest limit)

The only Search Console export in the repo is B₁ (`docs/exports/year0-2026-09-15/`, window ending 14 Sep 2026). Only three template posts appear in it, all with 0 clicks: `chair-yoga-elderly-arthritis-stiffness` (4 impressions), `arthritis-relationships-honest-conversations` (3) and `gene-therapy-and-arthritis-where-are-we-in-2026` (1). Most template posts were published after that window, so **B₁ cannot rank them**. Until Louis supplies a fresh GSC Pages export, triage uses:

1. **Season**: October–November relevance (winter infection, sick days, dark evenings, icy pavements, vaccines)
2. **Internal links**: how many non-template pages (especially gold-pass Champions and linkable assets such as the flare action plan) send readers to the broken page
3. **Harm**: medicines and safety pages first, because wrong-condition or garbled advice there matters most

**When a fresh GSC export arrives:** re-rank this list by impressions on these URLs over the last 28 days, then by position 8–20 (quick wins). Keep the seasonal picks only if they still show impressions.

## Groups (245 posts)

Grouped by slug keywords. A few posts could sit in more than one group.

### Nation pages (consolidation candidates) (5)

`frailty-older-people-arthritis-wales-uk`, `frailty-services-arthritis-scotland-uk`, `free-arthritis-support-northern-ireland`, `nhs-frailty-pathway-arthritis-england`, `older-adults-arthritis-frailty-northern-ireland-uk`

### Winter infection, vaccines and steroid sick days (15)

`bone-protection-steroids-arthritis-frailty-uk`, `copd-arthritis-frailty-breathlessness-uk`, `delirium-hospital-arthritis-frailty-uk`, `heart-failure-arthritis-frailty-overlap-uk`, `lymphoedema-arthritis-frailty-uk`, `methotrexate-older-frail-adults-uk`, `pmr-frailty-morning-stiffness-uk`, `pmr-steroid-taper-frailty-weakness-uk`, `ra-monitoring-older-frail-adults-uk`, `shingles-vaccine-arthritis-frailty-uk`, `skin-pressure-care-arthritis-frailty-uk`, `steroid-emergency-card-frail-arthritis-uk`, `swelling-legs-arthritis-frailty-uk`, `uti-confusion-arthritis-frailty-uk`, `wound-care-reaching-arthritis-frailty-uk`

### Falls, alarms and getting up (25)

`anxiety-about-falling-arthritis-uk`, `balance-painful-feet-frailty-arthritis-uk`, `big-toe-osteoarthritis-frailty-shoes-balance-uk`, `blood-pressure-tablets-falls-arthritis-uk`, `codeine-drowsiness-falls-arthritis-uk`, `community-alarm-arthritis-frailty-uk`, `confidence-after-fall-arthritis-frailty-uk`, `falls-clinic-arthritis-what-to-expect-uk`, `falls-response-service-arthritis-uk`, `fear-of-falling-hip-oa-frailty-uk`, `hearing-balance-arthritis-frailty-uk`, `knee-oa-frailty-outdoor-pavements-uk`, `knee-osteoarthritis-frailty-staying-steady-home-uk`, `living-alone-falls-plan-arthritis-uk`, `neck-osteoarthritis-frailty-balance-looking-down-uk`, `night-lights-arthritis-falls-frailty-uk`, `outdoor-steps-handrails-arthritis-uk`, `paramedic-fall-lift-arthritis-uk`, `pendant-alarm-arthritis-swollen-fingers-uk`, `sit-to-stand-practice-frail-arthritis-uk`, `sleeping-tablets-falls-arthritis-frailty-uk`, `tai-chi-balance-arthritis-frailty-uk`, `threshold-ramps-arthritis-frailty-uk`, `vision-falls-arthritis-frailty-uk`, `vitamin-d-and-falls-arthritis-uk`

### Medicines safety and pain relief (18)

`anticholinergic-load-arthritis-frailty-uk`, `ckd-nsaids-arthritis-frailty-uk`, `cognition-arthritis-frailty-remembering-tablets-uk`, `constipation-pain-medicines-frailty-arthritis-uk`, `dosette-boxes-arthritis-frailty-hands-uk`, `gabapentinoids-unsteadiness-arthritis-frailty-uk`, `heat-packs-frail-arthritis-uk`, `heat-versus-ice-frail-arthritis-uk`, `injections-knee-frail-adults-uk`, `nsaids-kidneys-heart-frail-arthritis-uk`, `painkillers-older-adults-arthritis-caution-uk`, `paracetamol-older-frail-arthritis-uk`, `pharmacist-medication-review-frail-arthritis-uk`, `polypharmacy-arthritis-frailty-review-uk`, `post-op-constipation-arthritis-frailty-uk`, `repeat-prescriptions-arthritis-frailty-uk`, `tens-machine-older-frail-arthritis-uk`, `topical-nsaids-frail-hand-knee-oa-uk`

### Sleep, night and continence (9)

`commode-night-arthritis-frailty-uk`, `continence-night-trips-arthritis-frailty-uk`, `evening-routine-arthritis-frailty-uk`, `morning-stiffness-frailty-routine-uk`, `naps-versus-inactivity-arthritis-frailty-uk`, `restless-nights-joint-pain-frailty-uk`, `sleep-apnoea-arthritis-frailty-uk`, `sleep-arthritis-frailty-night-pain-uk`, `splints-night-hand-oa-frailty-uk`

### Hospital, surgery and NHS services (43)

`anaesthetic-risk-arthritis-frailty-uk`, `bed-exercises-hospital-arthritis-frailty-uk`, `blood-test-transport-arthritis-frailty-uk`, `bone-clinic-arthritis-frailty-uk`, `community-matron-arthritis-frailty-uk`, `community-ot-waiting-arthritis-frailty-uk`, `community-physio-wait-frail-arthritis-uk`, `community-strength-classes-frail-oa-uk`, `community-transport-arthritis-frailty-uk`, `comprehensive-geriatric-assessment-arthritis-uk`, `cppd-pseudogout-frailty-sudden-hot-joint-uk`, `dental-care-arthritis-frailty-hands-uk`, `discharge-planning-arthritis-frailty-uk`, `eye-clinic-day-arthritis-frailty-uk`, `foot-ankle-osteoarthritis-frailty-indoor-walking-uk`, `fried-frailty-phenotype-painful-joints-uk`, `geriatric-clinic-plus-arthritis-uk`, `gp-frailty-register-arthritis-uk`, `gp-home-visit-arthritis-frailty-uk`, `hand-therapy-frail-ra-uk`, `hospital-appointments-frailty-arthritis-uk`, `hospital-deconditioning-arthritis-stay-uk`, `hospital-parking-walking-frail-arthritis-uk`, `hospital-stay-arthritis-frailty-what-to-pack-uk`, `intermediate-care-arthritis-frailty-uk`, `joint-replacement-decision-frailty-uk`, `midfoot-osteoarthritis-frailty-standing-time-uk`, `nine-nine-nine-vs-111-arthritis-frailty-uk`, `occupational-therapist-kitchen-visit-frailty-uk`, `ot-assessment-arthritis-frailty-uk`, `pain-clinic-older-frail-arthritis-uk`, `physiotherapy-home-visit-frail-oa-uk`, `podiatry-footcare-arthritis-frailty-uk`, `podiatry-nails-diabetes-arthritis-uk`, `post-hip-replacement-frailty-home-uk`, `post-knee-replacement-frailty-rehab-uk`, `prefrailty-osteoarthritis-early-action-uk`, `prehabilitation-frail-arthritis-before-surgery-uk`, `reablement-after-discharge-arthritis-uk`, `reablement-team-arthritis-home-practice-uk`, `remote-gp-apps-arthritis-frailty-uk`, `rheumatology-clinic-frail-older-adult-uk`, `rockwood-clinical-frailty-scale-arthritis-uk`

### Social care, housing, money and planning (28)

`advance-care-planning-arthritis-frailty-uk`, `care-home-life-arthritis-pain-frailty-uk`, `carer-burnout-arthritis-frailty-uk`, `carers-how-to-help-without-taking-over-uk`, `direct-payments-arthritis-frailty-uk`, `disabled-facilities-grant-arthritis-frailty-uk`, `dnacpr-conversations-arthritis-frailty-uk`, `downstairs-living-arthritis-frailty-uk`, `end-of-life-joint-pain-frailty-uk`, `extra-care-housing-arthritis-frailty-uk`, `family-meetings-arthritis-frailty-uk`, `high-rise-flat-arthritis-frailty-lifts-uk`, `hoist-conversations-family-carers-uk`, `knee-oa-frailty-stairs-banisters-uk`, `lasting-power-of-attorney-arthritis-frailty-uk`, `local-wheelchair-service-arthritis-uk`, `meal-times-care-home-arthritis-uk`, `mobility-scooter-arthritis-frailty-uk`, `nursing-home-arthritis-pain-review-uk`, `pip-arthritis-frailty-honest-uk`, `respite-care-arthritis-frailty-carers-uk`, `second-hand-equipment-arthritis-frailty-uk`, `sheltered-housing-arthritis-frailty-uk`, `short-term-equipment-loans-arthritis-uk`, `social-care-needs-assessment-arthritis-uk`, `stair-assessments-arthritis-frailty-uk`, `stairlifts-arthritis-frailty-uk-home`, `wheelchair-for-distance-arthritis-frailty-uk`

### Home equipment and daily tasks (38)

`allotment-identity-arthritis-frailty-uk`, `bed-lever-arthritis-frailty-uk`, `bunions-arthritis-frailty-shoes-uk`, `calluses-pressure-spots-frail-arthritis-uk`, `compression-stockings-hand-oa-frailty-uk`, `cooking-with-hand-oa-frailty-uk`, `elbow-osteoarthritis-frailty-kitchen-tasks-uk`, `footwear-indoor-slippers-frailty-arthritis-uk`, `garden-raised-beds-arthritis-frailty-uk`, `grab-rails-arthritis-frailty-home-uk`, `hand-oa-frailty-opening-packaging-uk`, `hand-osteoarthritis-frailty-dressing-cooking-uk`, `hip-and-knee-oa-frailty-transfers-uk`, `hip-oa-frailty-bed-mobility-uk`, `hip-oa-frailty-getting-into-car-uk`, `hip-osteoarthritis-frailty-chair-rise-uk`, `indoor-walking-frame-arthritis-frailty-uk`, `kettle-safety-arthritis-frailty-uk`, `kitchen-adaptations-arthritis-frailty-uk`, `knee-oa-frailty-rising-from-low-sofa-uk`, `nordic-poles-arthritis-frailty-uk`, `orthotics-insoles-arthritis-frailty-uk`, `pressure-cushion-arthritis-frailty-uk`, `rise-recline-chair-arthritis-frailty-uk`, `shopping-online-arthritis-frailty-uk`, `shoulder-oa-frailty-high-cupboards-uk`, `shoulder-osteoarthritis-frailty-washing-dressing-uk`, `smart-speakers-arthritis-frailty-uk`, `sofa-height-arthritis-frailty-uk`, `spine-oa-frailty-gardening-pacing-uk`, `thumb-base-osteoarthritis-frailty-daily-grip-uk`, `toilet-frame-arthritis-frailty-uk`, `transfer-board-arthritis-frailty-uk`, `two-walking-aids-arthritis-frailty-uk`, `walking-stick-vs-frame-arthritis-frailty-uk`, `wet-rooms-arthritis-frailty-washing-uk`, `wrist-hand-oa-frailty-self-care-uk`, `wrist-osteoarthritis-frailty-walking-aids-uk`

### Exercise, pacing and activity (21)

`activity-diary-arthritis-frailty-uk`, `chair-based-exercise-ra-frailty-uk`, `chair-yoga-elderly-arthritis-stiffness`, `chair-yoga-frailty-inflammatory-arthritis-uk`, `deconditioning-after-arthritis-flare-uk`, `goal-setting-tiny-wins-arthritis-frailty-uk`, `hydrotherapy-frail-arthritis-uk`, `motivation-after-setback-arthritis-frailty-uk`, `pacing-housework-arthritis-frailty-uk`, `pacing-visitors-arthritis-frailty-uk`, `pets-arthritis-frailty-walking-dogs-uk`, `polyarticular-oa-frailty-pacing-several-joints-uk`, `resistance-bands-seated-frail-oa-uk`, `seated-strength-frail-osteoarthritis-uk`, `slow-walking-groups-arthritis-frailty-uk`, `spinal-osteoarthritis-frailty-standing-pacing-uk`, `spinal-stenosis-oa-frailty-walking-stops-uk`, `static-bike-frail-osteoarthritis-uk`, `swimming-frail-arthritis-changing-rooms-uk`, `volunteering-seated-arthritis-frailty-uk`, `walking-sport-too-much-frail-arthritis-uk`

### Diet and hydration (12)

`appetite-loss-arthritis-frailty-uk`, `calcium-foods-arthritis-frailty-uk`, `gout-older-people-frailty-hydration-uk`, `heatwave-arthritis-frailty-hydration-uk`, `hydration-gout-frailty-older-adults-uk`, `meal-delivery-arthritis-frailty-uk`, `mediterranean-eating-frail-osteoarthritis-uk`, `oily-fish-arthritis-frailty-simple-meals-uk`, `protein-painful-joints-frailty-uk`, `soft-foods-jaw-arthritis-frailty-uk`, `speech-swallowing-meals-arthritis-frailty-uk`, `widowhood-meals-arthritis-frailty-uk`

### Mood, loneliness and relationships (17)

`arthritis-relationships-honest-conversations`, `befriending-arthritis-frailty-uk`, `bereavement-arthritis-frailty-living-alone-uk`, `day-centres-arthritis-frailty-uk`, `depression-osteoarthritis-frailty-uk`, `faith-groups-arthritis-frailty-access-uk`, `grandparenting-arthritis-frailty-uk`, `holiday-at-home-arthritis-frailty-uk`, `libraries-arthritis-frailty-getting-out-uk`, `loneliness-arthritis-frailty-social-contact-uk`, `mindfulness-pain-arthritis-frailty-uk`, `rural-living-arthritis-frailty-uk`, `short-breaks-accessible-arthritis-frailty-uk`, `social-prescribing-arthritis-frailty-uk`, `spiritual-care-arthritis-frailty-uk`, `talking-therapies-pain-older-arthritis-uk`, `weekend-plan-arthritis-frailty-uk`

### Condition overviews and off-topic posts that picked up the template (14)

`arthritis-fatigue-explained`, `diabetes-arthritis-frailty-feet-uk`, `flare-versus-frailty-arthritis-uk`, `gene-therapy-and-arthritis-where-are-we-in-2026`, `generalised-oa-frailty-whole-body-day-uk`, `inflammatory-arthritis-frailty-flare-week-uk`, `late-onset-ra-frailty-first-months-uk`, `longevity-habits-arthritis-patients`, `multimorbidity-arthritis-frailty-whole-picture-uk`, `osteoporosis-arthritis-frailty-bone-joint-uk`, `psoriatic-arthritis-later-life-frailty-uk`, `ra-fatigue-frailty-energy-envelope-uk`, `ra-frailty-older-adults-daily-rhythm-uk`, `sarcopenia-knee-oa-frailty-overlap-uk`

## Recommended next 10 (Champions 79–88)

**Progress:** all ten done. 88 done 20 Oct 2026 (pending clinical review), alongside 89–90 from the re-ranked list below; 233 template posts left (repo scan for the main "a smaller group also live with frailty" fingerprint, 20 Oct).

| # | Slug | Why now | Suggested job |
|---|---|---|---|
| 79 ✅ 15 Oct | `steroid-emergency-card-frail-arthritis-uk` | 6 inbound links, including the printable **flare action plan** (`flareActionPlanContent.ts`); pairs with Champion 78 | Red and blue steroid cards, sick-day steps, when to show the card (NHS prednisolone page) |
| 80 ✅ 15 Oct | `shingles-vaccine-arthritis-frailty-uk` | Linked from gold-pass `covid-winter-arthritis-frailty-uk`; vaccine season | NHS shingles eligibility, non-live vaccine on DMARDs/biologics, how to book |
| 81 ✅ 15 Oct | `uti-confusion-arthritis-frailty-uk` | Winter infection plus sudden confusion in older people | NHS UTI signs, delirium red flags, 111/999 routes, fluids, carers |
| 82 ✅ 16 Oct | `sleeping-tablets-falls-arthritis-frailty-uk` | 6 inbound, including gold-pass `arthritis-and-sleep-problems` and `best-sleep-positions-joint-pain`; long nights | Sleeping tablets and night falls, CBT for insomnia first, never stop prescribed medicines yourself |
| 83 ✅ 16 Oct | `sleep-apnoea-arthritis-frailty-uk` | 4 inbound from three gold-pass sleep posts | NHS sleep apnoea signs, referral, how it links to daytime tiredness and pain |
| 84 ✅ 16 Oct | `bone-protection-steroids-arthritis-frailty-uk` | Linked from gold-pass vitamin D winter guide; pairs with 78 | Bone protection on steroids, vitamin D/calcium, bone scans, falls |
| 85 ✅ 19 Oct | `deconditioning-after-arthritis-flare-uk` | 7 inbound (most-linked template post); winter illness and flare recovery | Rebuilding strength after a flare or illness week; pacing; physio routes |
| 86 ✅ 19 Oct | `confidence-after-fall-arthritis-frailty-uk` | Winter falls; pairs with Champion 77 | Fear of falling after a fall, falls services, graded return to walking |
| 87 ✅ 19 Oct | `pharmacist-medication-review-frail-arthritis-uk` | 5 inbound; medicines safety | NHS Structured Medication Review / New Medicine Service, what to bring, questions to ask |
| 88 ✅ 20 Oct | `vitamin-d-and-falls-arthritis-uk` | Linked from both vitamin D posts; overlaps the gold-pass winter vitamin D guide | Narrow to vitamin D and falls/bones; hand off early to `vitamin-d-winter-arthritis-frailty-uk` |

**Reserves:** `chair-yoga-elderly-arthritis-stiffness` (6 inbound; the only template post with more than 3 B₁ impressions), `delirium-hospital-arthritis-frailty-uk`, `copd-arthritis-frailty-breathlessness-uk`, `painkillers-older-adults-arthritis-caution-uk`, `living-alone-falls-plan-arthritis-uk`, `knee-oa-frailty-outdoor-pavements-uk` (could merge into Champion 77).

## Re-ranked next 10 (Champions 89–98), 20 Oct 2026

**Method (honest limit):** still no fresh GSC export, so this ranking uses inbound links from non-template pages (repo scan, 20 Oct), then October–February season, then harm (medicines first). Nation pages stay out of the one-by-one queue (see below). Re-rank again when a fresh GSC Pages export lands.

| # | Slug | Inbound (non-template) | Why now | Suggested job |
|---|---|---|---|---|
| 89 ✅ 20 Oct | `chair-yoga-elderly-arthritis-stiffness` | 6 | Most-linked template post left; the only one with more than 3 B₁ impressions | Gentle seated routine from NHS sitting exercises, cautions after hip replacement / RA neck / osteoporosis, finding a class |
| 90 ✅ 20 Oct | `sit-to-stand-practice-frail-arthritis-uk` | 4 | Pairs with Champions 85–86 (strength after a flare, confidence after a fall) | NHS sit-to-stand step by step, easier / harder versions, chair height and OT equipment, carer safety |
| 91 ✅ 21 Oct | `knee-osteoarthritis-frailty-staying-steady-home-uk` | 4 (+7 template) | Winter falls at home; heavily cross-linked | Staying steady at home with knee OA: strength, balance, home hazards, walking aids |
| 92 ✅ 21 Oct | `seated-strength-frail-osteoarthritis-uk` | 4 | Overlaps chair exercises; risk of duplicate intent | Narrowed (not consolidated): how to make seated exercise build strength (effort, five moves, progression), handing off early to the 20-minute chair routine for the routine itself |
| 93 ✅ 21 Oct | `painkillers-older-adults-arthritis-caution-uk` | 3 | Medicines harm | Paracetamol / NSAID / codeine cautions in later life, falls and constipation, medication review, never change doses yourself |
| 94 ✅ 22 Oct | `methotrexate-older-frail-adults-uk` | 3 | Medicines harm; winter infections | Monitoring blood tests, infection and sick-day questions, vaccines, never change your dose yourself (once-weekly safety from the MHRA; no doses) |
| 95 ✅ 22 Oct | `late-onset-ra-frailty-first-months-uk` | 3 (+8 template) | Newly-diagnosed customer job | First months after an RA diagnosis later in life: what to expect (NICE NG100), monitoring, staying active |
| 96 ✅ 22 Oct | `ra-monitoring-older-frail-adults-uk` | 3 | Pairs with 94–95 | Blood tests, reviews, what to report between appointments; kept distinct from 94 (disease activity / annual review vs the methotrexate routine) and cross-linked |
| 97 | `night-lights-arthritis-falls-frailty-uk` | 3 | Dark evenings; linked from gold-pass falls posts | Night-time route to the toilet, lighting, getting up slowly, continence |
| 98 | `topical-nsaids-frail-hand-knee-oa-uk` | 3 | NICE first-line option for knee and hand OA | Topical NSAIDs: who they suit, how to use, skin and safety, ask a pharmacist. Check overlap with `topical-nsaids-often-overlooked-often-effective` first (narrow to hands and frail skin, or consolidate) |

**Progress (22 Oct):** 89–96 done (pending clinical review); 227 template posts left (repo scan for the main fingerprint, 22 Oct; #247 consolidated none of 94–96). Next re-rank should start with the RA template posts 94–96 now link to: `blood-test-transport-arthritis-frailty-uk`, `rheumatology-clinic-frail-older-adult-uk`, `chair-based-exercise-ra-frailty-uk`, `ra-fatigue-frailty-energy-envelope-uk`.

**Reserves:** `delirium-hospital-arthritis-frailty-uk`, `copd-arthritis-frailty-breathlessness-uk`, `living-alone-falls-plan-arthritis-uk`, `flare-versus-frailty-arthritis-uk`, `community-physio-wait-frail-arthritis-uk`, `protein-painful-joints-frailty-uk`, `disabled-facilities-grant-arthritis-frailty-uk`.

## Not to rewrite one by one

- **Nation pages (5):** `frailty-older-people-arthritis-wales-uk`, `frailty-services-arthritis-scotland-uk`, `free-arthritis-support-northern-ireland`, `older-adults-arthritis-frailty-northern-ireland-uk`, `nhs-frailty-pathway-arthritis-england`. Decide whether to keep each as a real "services in this nation" page (NHS Wales / NHS Scotland / HSC NI routes) or 301 it to a UK-wide hub. Do not turn them into doorway pages.
- **Off-topic posts that picked up the template** (e.g. `gene-therapy-and-arthritis-where-are-we-in-2026`, `longevity-habits-arthritis-patients`, `arthritis-fatigue-explained`): check them against the gold-pass hub on the same topic and consolidate where they overlap.

## A sweep option for Louis to decide on

At 3 Champions a weekday, the 245 posts take about 16 weeks. A **mechanical trust sweep**, like the 12 Oct reviewer-label sweep, could remove the worst lines from every template post in one PR without rewriting them:

- delete the empty "The wider health picture around …" heading (239 posts)
- delete the "Around 10 million … smaller group also live with frailty" sentence
- delete the random-nation sentence in the intro

The OA "core care" paragraph on non-OA pages (154) needs judgement, so it should stay with the Champion rewrites. Everything in the sweep stays `pending clinical review`. Not done on 14 Oct (routine scope: no mass edits). **Proposed for a later routine day once Louis agrees.**

## Rewrite checklist (same as Champions 62–78)

Full rewrite into a distinct customer job · CTR `meta_title` (≤60) / `meta_description` (≤155) with "(UK)" and never "for/with Arthritis UK" · `reviewStatus: pending`, `reviewed_by: null`, "Pending clinical review." in the disclaimer · real NHS / NICE / GOV.UK / UKHSA / Versus Arthritis citations, no invented stats · never-stop / never-change-medicines framing · 999 / NHS 111 routes · crisis routes on mental-health pages · dense links to gold-pass hubs and spokes · `topicClusters.ts` + chatbot KB · sitemap `lastmod` + sitemap-index · llms.txt / ai.txt cites · regenerate catalog / head data / search index · Vitest gate `gsc-champions-NN-NN-<date>.test.ts` · add slugs to `blog-review-status.test.tsx` pending list.
