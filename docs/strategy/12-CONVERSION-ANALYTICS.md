# 12 — Conversion & analytics

**GA4 property:** `G-ZLLSD3PXZ9` (sole measurement ID per `docs/GA4-CONVERSIONS.md`).  
**Year 0 baseline:** **LOCKED** as `Y0-28d-2026-08-18` (export 15 Sep 2026) — see `docs/YEAR-0-ANALYTICS-BASELINE.md` (888 sessions / 108 GSC clicks in last ~28d).

---

## Primary funnels

### 1) Donate

```text
Landing (Home/Donate CTA)
  → donation_click
  → /donate (amount + Gift Aid)
  → begin_checkout (Stripe session)
  → /donation-result/success
  → donate + purchase events
```

**Friction to fix (Phase 1):** competing appeals; unclear research vs general fund; mobile sticky bar vs content.

**A/B ideas (after baseline):** default amounts; monthly vs one-time primacy; empathy copy length; research meter placement.

### 2) Newsletter

```text
Form view → submit success → generate_lead / sign_up / newsletter_signup
  → (future) newsletter_confirmed
```

**Needs:** welcome series (`docs/EMAIL-WELCOME-SERIES.md`); double opt-in honesty; segment by interest (exercise, RA, PIP).

### 3) Volunteer / contact / HCP enquiry

```text
Page → form submit → contact_form_submit / generate_lead
```

**Phase 1:** replace mailto where it blocks event fidelity and spam control.

### 4) Help engagement

```text
chat_start → (optional) helpful feedback admin
file_download (clinic pack / guides)
```

---

## Key events checklist (GA4 Admin)

Mark as key events when visible: `generate_lead`, `sign_up`, `donate`, optionally `chat_start`, `newsletter_confirmed`.

---

## Exploration templates

1. Landing pages performance (canonical set).  
2. Funnel: `page_view` → engaged session → `generate_lead` or `donate`.  
3. Content engagement time buckets.  
4. Scroll depth by Champion URL.

UTM conventions: follow `docs/UTM-CONVENTIONS.md`.

---

## Reporting cadence

| Cadence | Artefact |
|---|---|
| Weekly | GSC coverage anomalies; donate event sanity |
| Monthly | Board KPI strip from [14-KPI-DASHBOARD.md](./14-KPI-DASHBOARD.md) |
| Quarterly | A/B retrospective; content ROI |

**Rule:** No public marketing claims of traffic/donation totals without Louis sign-off and sourced exports.

*Next: [13-IMPLEMENTATION-BACKLOG.md](./13-IMPLEMENTATION-BACKLOG.md)*
