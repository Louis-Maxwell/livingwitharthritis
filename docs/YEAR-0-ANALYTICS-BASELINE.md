# Year 0 analytics baseline SOP

**Purpose:** Replace planning envelopes with real baselines before any A/B growth multiples are reported.  
**GA4 measurement ID:** `G-ZLLSD3PXZ9`  
**Site:** https://livingwitharthritis.org.uk  
**As-of window for “Year 0”:** last complete 28 days before kickoff **and** calendar YTD — Louis chooses one primary window and sticks to it for M1–M6 reporting.

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

## Louis fills this table

| Metric | Window (dates) | Value | Source file / note |
|---|---|---|---|
| Sessions | | | GA4 |
| Engaged sessions | | | GA4 |
| Active users | | | GA4 |
| Avg engagement time | | | GA4 |
| Key events / conversions | | | GA4 |
| Organic search sessions | | | GA4 |
| GSC total clicks | | | GSC |
| GSC total impressions | | | GSC |
| GSC average CTR | | | GSC |
| GSC average position | | | GSC |
| Top 10 champion URL clicks | | | GSC Pages |

**Baseline ID (B₁):** once filled, all Month N traffic multiples are vs this row — never vs Scenario C fantasy.

---

## Reporting rule

Public pages and press must **not** quote GA4/GSC figures as marketing claims without Louis sign-off. Internal board packs may use them with the export date labelled (Europe/London).
