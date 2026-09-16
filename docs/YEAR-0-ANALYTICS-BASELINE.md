# Year 0 analytics baseline SOP

**Purpose:** Replace planning envelopes with real baselines before any A/B growth multiples are reported.  
**GA4 measurement ID:** `G-ZLLSD3PXZ9`  
**Site:** https://livingwitharthritis.org.uk  
**As-of window for “Year 0”:** last complete 28 days before kickoff **and** calendar YTD — Louis chooses one primary window and sticks to it for M1–M6 reporting.

**Baseline ID (B₁):** `Y0-28d-2026-08-18` — **LOCKED 15 Sep 2026 (Europe/London)**  
**Primary window:** last 28 days ending mid-Sep 2026 (GA4 **18 Aug–14 Sep 2026**; GSC chart **17 Aug–13 Sep 2026**). Use this row for all M1–M6 traffic multiples — never Scenario C fantasy.

---

## How to export GA4

1. Sign in to Google Analytics → property linked to `G-ZLLSD3PXZ9`.
2. **Reports → Acquisition → Traffic acquisition** — export CSV (sessions, engaged sessions, channels).
3. **Reports → Engagement → Pages and screens** — top landing pages (export).
4. **Reports → Engagement → Events** — confirm `donation_click`, `generate_lead`, newsletter events if configured (`docs/GA4-CONVERSIONS.md`).
5. **Admin → Data streams** — confirm web stream URL is production HTTPS.
6. Paste headline numbers into the table below (do not invent).

## How to export Google Search Console

1. Open Search Console for `livingwitharthritis.org.uk` (Domain or URL-prefix property).
2. **Performance → Search results** — last 28 days + previous period.
3. Export: Queries, Pages, Countries (United Kingdom filter), Devices.
4. Note index coverage: valid / excluded reasons for champion URLs.

---

## Baseline table (B₁) — filled 15 Sep 2026

| Metric | Window (dates) | Value | Source file / note |
|---|---|---|---|
| Sessions | 18 Aug–14 Sep 2026 | **888** | GA4 Traffic acquisition (channels sum ≈887; UI 888). CSV: `docs/exports/year0-2026-09-15/ga4-traffic-acquisition.csv` |
| Engaged sessions | 18 Aug–14 Sep 2026 | **212** | GA4 Traffic acquisition |
| Active users | 18 Aug–14 Sep 2026 | **843** | GA4 |
| Avg engagement time | 18 Aug–14 Sep 2026 | **~20s** / active user (Pages); **~19s** / session (Traffic acquisition) | GA4 |
| Key events / conversions | 18 Aug–14 Sep 2026 | `donation_click` **6**; `chat_start` **1**; `donate` **0**; `generate_lead` **0**; `sign_up` **0**; `purchase` **0** | GA4 Events (named). Traffic-acquisition “Key events” column is higher across channels — treat named events above as the conversion truth for B₁ |
| Organic search sessions | 18 Aug–14 Sep 2026 | **59** | GA4 channel Organic Search |
| GSC total clicks | ~17 Aug–13 Sep 2026 (last 28d) | **108** | GSC Performance |
| GSC total impressions | same | **8.73K** | GSC Performance |
| GSC average CTR | same | **1.2%** | GSC Performance |
| GSC average position | same | **27.2** | GSC Performance |
| Top 10 champion URL clicks | same | see list below | GSC Pages |
| Index coverage (snapshot) | 15 Sep 2026 | **551** indexed / **378** not indexed | GSC Page indexing |
| Data stream | — | `https://livingwitharthritis.org.uk/` · `G-ZLLSD3PXZ9` | GA4 Admin → Data streams |

### Channel mix (GA4 sessions, 18 Aug–14 Sep 2026)

| Channel | Sessions | Engaged sessions |
|---|---:|---:|
| Organic Social | 768 | 122 |
| Organic Search | 59 | 47 |
| Direct | 46 | 31 |
| Unassigned | 12 | 10 |
| AI Assistant | 1 | 1 |
| Referral | 1 | 1 |

### Top 10 pages by GSC clicks (last 28d)

1. `/blog/swimming-exercises-hip-osteoarthritis` — 21 clicks, 597 impressions  
2. `/blog/best-supplement-for-knee-joint` — 15, 694  
3. `/faq/arthritis-disability-benefits-uk` — 14, 605  
4. `/conditions/osteoarthritis` — 7, 238  
5. `/about` — 7, 78  
6. `/` — 5, 215  
7. `/blog/pip-for-arthritis-uk` — 4, 152  
8. `/arthritis-support/sheffield/rheumatoid-arthritis` — 3, 74  
9. `/blog/omega-3-foods-for-joints` — 2, 425  
10. `/blog/anti-inflammatory-diet-rheumatoid-arthritis` — 2, 178  

Raw exports: `docs/exports/year0-2026-09-15/` — **files pending** (Louis may add GA4 CSV + GSC Performance zip later); headline B₁ figures above are locked from the 15 Sep UI exports.

**Baseline ID (B₁):** `Y0-28d-2026-08-18` — all Month N traffic multiples are vs this row — never vs Scenario C fantasy.

---

## Reporting rule

Public pages and press must **not** quote GA4/GSC figures as marketing claims without Louis sign-off. Internal board packs may use them with the export date labelled (Europe/London).
