# Palestine & Gaza giving: empathy-led donation experience

Deepen the existing donation pages so Muslim donors have a clear, emotionally honest
place to give — inspired by MATW Project's structure (urgent appeal, Islamic giving
categories, impact tiers, 100% promise, scholar trust signals) but built on what this
charity can genuinely claim: funding physiotherapy and rehabilitation for war and
trauma survivors.

No new routes. Work stays on `/zakat-appeal`, `/donate`, and the homepage.

## What changes

### 1. `/zakat-appeal` becomes the Palestine & Gaza appeal
Rebuilt as the flagship Islamic giving page, keeping the existing Stripe flow and
Zakat calculator untouched.

- **Emotive hero** — full-bleed image, "Gaza: rebuilding bodies broken by war",
  a short human paragraph about amputation, shattered joints and untreated pain,
  and a single strong Donate CTA. Explicit Palestine/Gaza solidarity framing.
- **Impact tiers** — reframe the existing £25–£1,000 grid as concrete outcomes
  ("£50 funds a pain-management consultation for a survivor in Gaza"), each with
  a short line rather than the current generic labels.
- **Islamic giving strip** — three cards: Zakat, Sadaqah, Sadaqah Jariyah, each
  explaining eligibility in plain English and linking to the same donate flow with
  the fund pre-selected.
- **Empathy story block** — a narrative section on what rehabilitation means after
  a blast injury, with a Qur'an verse and hadith on relieving hardship.
- **Trust row** — Shariah-compliant, scholar-guided distribution, Gift Aid +25%,
  UK charity registration badge, transparent reporting. Only claims already made
  elsewhere on the site; nothing invented.
- **FAQ** — extend the existing accordion with Gaza-specific questions (where the
  money goes, is my Zakat valid here, can I give Sadaqah instead, Gift Aid on Zakat).
- **Urgency, honestly** — no fake countdowns, fake raised totals or fake supporter
  counts. Urgency comes from the need, not fabricated numbers.

### 2. `/donate`
- Add a Palestine & Gaza appeal card at the top of the ways-to-give area, linking
  to `/zakat-appeal`.
- Add Zakat / Sadaqah to the fund options so Muslim donors see themselves on the
  main page too.

### 3. Homepage
- A prominent appeal band placed after the hero region: full-width image, headline,
  two-sentence empathy copy, "Donate now" and "Give your Zakat" buttons, linking to
  `/zakat-appeal`. Lazy-loaded through the existing `ViewportSection` pattern so it
  does not affect load performance.

### 4. Tracking & metadata
- Fire the existing `trackDonationClick` helper from every new CTA with a distinct
  `source` (`gaza_home_band`, `gaza_hero`, `gaza_tier_50`, …) so you can see which
  placement converts.
- Update the page title, meta description and social copy on `/zakat-appeal` to
  target Muslim giving searches (Zakat, Sadaqah, Gaza appeal, 100% Gift Aid).

## Honesty guardrails

Everything published is limited to what you confirmed: you fund rehabilitation for
Gaza and war/trauma survivors. Not published unless you later confirm it in writing:
a "100% donation policy", named delivery partners, beneficiary numbers, amounts
raised, or testimonials from beneficiaries.

## Technical notes

- Files touched: `src/pages/ZakatAppeal.tsx`, `src/pages/Donate.tsx`,
  `src/pages/Index.tsx`, plus new components
  `src/components/appeal/GazaAppealBand.tsx`, `GazaImpactTiers.tsx`,
  `IslamicGivingCards.tsx` under the existing component conventions.
- Reuses `StripeDonationModal`, `ZakatCalculator`, `CharityRegBadge`, and the
  design tokens — no new colours, no layout system changes, no nav changes.
- Imagery: dignified rehabilitation and human-solidarity photography sourced through
  the existing centralised image module; no graphic injury imagery.
- Adds a `DonateAction` + `FAQPage` JSON-LD update on the appeal page.
- The stored "strict political neutrality" memory rule will be updated to record
  that explicit Palestine/Gaza humanitarian solidarity is now approved.
