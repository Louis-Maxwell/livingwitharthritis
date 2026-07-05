# Legal risk & compliance checklist — Living With Arthritis UK
### The things that actually get websites sued, and how to close each one.
*(Prepared by an AI assistant. This is practical guidance, not legal advice —
have a solicitor review before relying on it. Charity law: consider a free
consult via LawWorks or your local pro-bono clinic.)*

## 1. Copyright — the #1 way big companies sue small websites
- [ ] **Image audit.** Every image on the site must be (a) your own, (b) properly
  licensed stock (Unsplash/Pexels licences are fine — keep a record of source URLs),
  or (c) used with written permission. Getty/Alamy/PA images without a licence are
  the classic demand-letter trigger. Keep a spreadsheet: image → source → licence.
- [ ] **NHS / NICE / GOV.UK content** is reusable under the **Open Government
  Licence v3 — but attribution is mandatory.** Add to the Credits page:
  "Contains public sector information licensed under the Open Government Licence v3.0."
  Link NICE guidance rather than reproducing large extracts.
- [ ] **Never copy text from Versus Arthritis, Arthritis Foundation, Mayo Clinic,
  WebMD etc.** Their content is fully copyrighted. Same-topic original writing is fine.
- [ ] **Exercise videos/music:** only use music you have licences for; YouTube embeds
  are fine, re-hosted copies are not.
- [ ] Add a **notice-and-takedown contact** (SECURITY.md pattern): "If you believe
  content on this site infringes your rights, email info@ and we will respond
  within 5 working days." Fast, good-faith takedown defuses most claims.

## 2. Trademarks & passing off
- [ ] Never imply affiliation with, endorsement by, or equivalence to **Versus
  Arthritis, Arthritis Foundation, the NHS, or NICE**. Naming them factually
  ("unlike X, our services are free") is lawful nominative use; using their logos,
  straplines, or "as recommended by" phrasing is not.
- [ ] **NHS branding is protected by law** — never use the NHS logo or lozenge.
  "Aligned with NICE guidance" is fine; "NHS approved" is NOT unless you hold a
  written approval.
- [ ] Consider registering **"Living With Arthritis"** as a UK trade mark (£170,
  gov.uk/ipo) — cheap insurance both ways.

## 3. Data protection (UK GDPR) — where regulators and group claims come from
- [ ] **Pay the ICO data protection fee** (tier 1, £40-60/yr for most charities) and
  put the ZA number into the privacy policy TODO. Processing without registration
  is itself an offence.
- [ ] Deploy the upgraded **PrivacyPolicy.NEW.tsx** (covers Article 9 health data,
  named processors, transfers, AI chat disclosure — all previously missing).
- [ ] **Explicit consent checkbox** wherever health data is collected (quiz, buddy
  profile, chat first-use notice): "I consent to Living With Arthritis processing
  the health information I provide in order to deliver this service. I can
  withdraw consent at any time." Store the consent timestamp.
- [ ] Complete a short **DPIA** (data protection impact assessment) for the buddy
  service and AI chat — required for large-scale special-category processing;
  ICO has a free template.
- [ ] Keep a **Record of Processing Activities** (Art 30): a one-tab spreadsheet —
  purpose, data types, lawful basis, processor, retention. Populate from §5/§7
  of the new policy.
- [ ] **Data processing agreements**: confirm DPAs are in place (Supabase, Stripe,
  PayPal, Resend, Google — all offer standard DPAs; keep copies).
- [ ] **Breach plan**: who calls whom, ICO 72-hour reporting rule.

## 4. Medical liability — health content risk
- [ ] Keep the sitewide disclaimer on every clinical page (the static injector now
  adds it automatically): general information, not personal medical advice,
  see a GP / NHS 111 / 999.
- [ ] Never publish dosage instructions, drug-switching advice, or "stop taking X".
- [ ] Keep the named-clinician review + dates visible (already implemented) — it is
  both an E-E-A-T signal and evidence of reasonable care.
- [ ] **Insurance**: get **public liability + professional indemnity** cover that
  explicitly includes online health information and any virtual physiotherapy
  triage (~£150-400/yr for a small charity; brokers: PolicyBee, Markel).
  Trustee indemnity insurance for the board is also cheap and standard.

## 5. User-generated content (community, lived experiences, buddy chat)
- [ ] Terms must state: users are responsible for what they post; we may remove
  content; zero tolerance for defamatory, infringing or harmful posts.
- [ ] Moderate before publishing lived-experience stories (defamation risk sits
  with the publisher — you — once notified).
- [ ] Under the **Online Safety Act 2023**, a site with user-to-user features
  (buddy chat, community) needs: a complaints route, terms covering illegal
  content, and a completed **Ofcom illegal-content risk assessment** (small
  low-risk services have light duties, but the assessment itself is mandatory —
  Ofcom publishes a free tool).

## 6. Fundraising & charity law
- [ ] Register with the **Fundraising Regulator** and display the badge.
- [ ] Only claim **Gift Aid** once HMRC recognition is confirmed (privacy policy
  and donate page both reference it).
- [ ] Donation pages: state charity number, what donations fund, refund policy.
- [ ] Annual return + accounts filed on time with the Charity Commission.

## 7. Accessibility & consumer law
- [ ] Keep the WCAG 2.2 AA work maintained — Equality Act claims against
  inaccessible sites are rising.
- [ ] Cookie banner must make "reject" as easy as "accept" (PECR; ICO is actively
  enforcing this in 2025-26). Verify the current banner passes.

## Priority order (if you do nothing else)
1. ICO fee + registration number (an offence otherwise; 10 minutes).
2. Image/copyright audit + OGL attribution line (the actual big-company suit vector).
3. Explicit-consent checkbox on health-data collection + deploy new privacy policy.
4. Insurance (public liability + professional indemnity + trustee indemnity).
5. Ofcom illegal-content risk assessment for the buddy/community features.
