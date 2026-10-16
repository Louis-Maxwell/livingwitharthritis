# Expansion roadmap: UK → India → USA

**Status: planning only.** Living With Arthritis is a UK charity (England and
Wales, charity 1218461). It has **no** registered entity, office, branch,
clinician or partner in India or the USA. Nothing on the site may say or
imply otherwise until the matching gate below is passed and recorded.

What exists in code today: the help chat lets a visitor choose UK / India /
USA so it shows that country's **public national** emergency numbers
(`src/lib/chatbot/emergencyContacts.ts`). That is safety signposting only,
not a service in those countries.

## Phase 0 — UK foundations (now)

- Finish clinical review of pending guides and source the 322 unsourced ones
  (`docs/audits/editorial-qa.json`, `docs/audits/priority-50-checklist.json`).
- Resolve picture licence gaps (`docs/audits/blog-asset-provenance.json`).
- Pass every gate in `docs/PUBLICATION-CHECKLIST.md`.
- Exit gate: UK content governance is repeatable (named reviewer + date per guide).

## Phase 1 — Decide and set up legally (per country, human-led)

| Item | India | USA |
|---|---|---|
| Legal vehicle | Take advice: Section 8 company, trust or society; FCRA rules if UK money is sent | Take advice: US 501(c)(3) or a fiscal sponsor; state charity registration for fundraising |
| Fundraising | No India donations until registered (and 80G/12A if offering tax relief) | No US tax-deductible claims until IRS determination |
| Privacy | Digital Personal Data Protection Act 2023 review | State privacy laws (e.g. CCPA/CPRA); HIPAA likely not applicable but confirm |
| Health content | Local registered doctor/physio for review | US-licensed clinician for review |

Exit gate: entity registered, trustees/board named, legal sign-off recorded.
Until then no country page, address, phone number or "branch" wording.

## Phase 2 — Locale-aware content architecture (code, no launch)

- Routes: keep UK at `/` (canonical URLs unchanged). Future locales under
  `/in/` and `/us/`, never by rewriting UK slugs.
- Content: `src/content/blog/posts/<slug>.json` stays the UK source. Locale
  variants as `src/content/blog/locales/<locale>/<slug>.json`, carrying their
  own citations, reviewer, review date and `reviewStatus`. A locale guide
  without its own review is **not published**.
- Per-locale facts (medicine names, benefits, emergency numbers, regulators)
  live in config, never hard-coded in shared copy. Example: PIP/NHS content
  is UK-only and must not appear on `/in/` or `/us/`.
- SEO: `hreflang` (`en-GB`, `en-IN`, `en-US`, plus `x-default`) only for pages
  that really exist in each locale; separate sitemaps per locale; canonical
  points to self.
- Spelling and units by locale (UK English stays the default).
- Tests: a locale page cannot render without locale citations and reviewer.

## Phase 3 — Pilot (per country, after Phase 1 exit)

- 10–20 guides adapted and reviewed by a local clinician, behind `noindex`
  until sign-off.
- Local helplines verified from official government sources and dated.
- Exit gate: clinical, legal and privacy sign-off; publication checklist passed.

## Phase 4 — Launch and monitor

- Remove `noindex`, submit locale sitemaps, monitor errors and complaints.
- Review numbers and guidance every 6 months.

## Never

- Invent local offices, partners, clinicians or registration numbers.
- Reuse UK benefit/NHS advice for other countries.
- Show reviewed status without a named reviewer and date.
