# 90-day growth playbook — Living With Arthritis UK
### How to actually move Authority Score, referring domains and organic traffic
*(Written with honesty: none of these numbers move because of code. They
move because people do outreach and publish reviewed content. Below is the
minimum viable schedule that will genuinely start closing the gap on
Arthritis Action UK's 40-year lead.)*

## The competitor benchmark (from your screenshot)
Arthritis Action UK, in one screenshot: **Authority Score 55, 9,300
referring domains, 164,000 organic monthly visits, 221,000 total visits,
5:30 average visit duration**. They are a **1985 charity**. Every one of
those numbers is a lagging indicator of ~40 years of relationships,
citations and content.

**Your realistic 12-month target:** Authority Score 15–25, 300–800
referring domains, 8,000–25,000 organic monthly visits. That would be a
top-decile trajectory for a year-old charity site.

## The three levers that actually move the numbers

### Lever 1 — Referring domains (compounds Authority Score)
The single biggest gap. Every one of the below actions typically wins 1–5
referring domains for ~1 hour of effort. Do 3–5 a week and you gain
150–250 referring domains in a year — enough to lift AS from 0–5 to 15–25.

- [ ] **Register with 15 UK health directories** in month 1: NHS.uk
  patient information partners, Patient.info local link, HealthUnlocked
  community listings, Carers UK partner list, Age UK partner list, Rich
  Text Foundation health directory, gov.uk local resource lists,
  Charity Commission "find a charity" (already), Charities Aid Foundation
  profile, JustGiving charity page, Give as You Live, Easyfundraising.
- [ ] **Guest posts on health blogs.** One a fortnight. Sources:
  HARO (Help a Reporter Out), Response Source, Journalism.co.uk requests.
  Search "arthritis" or "chronic pain" on each. Reply within an hour;
  journalists pick the fastest expert.
- [ ] **University reciprocal links.** UK physiotherapy, occupational
  therapy and rheumatology courses often maintain patient-resource lists.
  Email 5 course leaders per week with a plain-English resource offer.
- [ ] **Partner with 10 UK NHS trusts' patient info teams.** They add
  external self-management resources to their arthritis leaflets — offer
  free QR-code posters they can print.

### Lever 2 — Content velocity (compounds organic traffic)
Target: **20 new pages/month** in months 1-3, then 10/month sustaining.

- [x] **60 city support pages** — added to this bundle (see below).
- [ ] **Condition-specific city pages** (osteoarthritis London,
  rheumatoid arthritis Manchester, etc.) — the 30k keyword dataset
  already includes them; wire the template.
- [ ] **30 comparison guides** — "paracetamol vs ibuprofen for arthritis",
  "physio vs surgery for knee OA" — these earn AI citations.
- [ ] **A glossary of 100 arthritis terms** — AI answer engines
  disproportionately cite glossary entries.
- [ ] **10 "newly diagnosed with X" hub pages** — high commercial intent,
  high dwell time.

### Lever 3 — Programme + email
This is what lifted Arthritis Action UK's visit duration to 5:30.

- [ ] **Weekly email newsletter.** Start now, even at 20 subscribers.
  Compounds — every future backlink drops readers into a growing list.
- [ ] **Free 7-day arthritis email course.** Highest-converting lead
  magnet in the health space. Auto-drip via Resend + Supabase.
- [ ] **Monthly live Q&A** with your reviewing clinician — even 20
  attendees create 5-10 backlinks each time (event listings).

## What is in this bundle for you today (Claude credits only)

- **60 city support pages** with schema, breadcrumbs, NHS-linked local
  rheumatology/MSK trust references and FAQPage data — added to
  `scripts/ai-head-data.json`. On next publish, these will each ship as
  a proper static route via `inject-canonicals.mjs`.
- **`src/data/city-routes.generated.ts`** — plug into your sitemap
  generator and prerender routes so the 60 pages get crawled + indexed.
- The 30,000-keyword dataset (previous v3 bundle) already maps target
  pages for hundreds of these city × condition combinations.

## What NOT to spend money on (yet)
- Paid link building services (Google penalises; wastes months).
- Semrush Pro until you have 500+ referring domains to analyse.
- Programmatic city×condition doorway pages before you have unique
  content for each — Google's Helpful Content update penalises them.

## The honest timeline
- **Month 3:** AS 5-8, 30-60 referring domains, 500-1,500 organic visits.
- **Month 6:** AS 10-15, 100-200 referring domains, 3,000-8,000 visits.
- **Month 12:** AS 15-25, 300-800 referring domains, 8,000-25,000 visits.
- **Year 3:** realistic path to AS 35-45, 2,000-4,000 referring domains.
  Matching Arthritis Action UK's 55 / 9,300 requires a decade of
  compounding, and that is true whether or not you follow this plan.

Nothing here is a trick. It is what every charity that has grown online
has done. Do it consistently for 90 days and you will see the first curve.
