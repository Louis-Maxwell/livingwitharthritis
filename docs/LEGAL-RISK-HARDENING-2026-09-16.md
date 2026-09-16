# Legal-risk hardening memo — Living With Arthritis UK

**Date:** 16 September 2026 (Europe/London)  
**Charity:** Living With Arthritis — CIO, Charity Commission **1218461**  
**Clinical lead:** Louis Maxwell, HCPC **PH128483**  
**Repo / ship:** site hardenings in the same change set as this memo  

> **Not formal legal advice.** This note is an operational risk memo for trustees and the clinical lead. It does **not** create solicitor–client privilege, does **not** replace insurance, and does **not** eliminate lawsuit or regulatory risk. Instruct a solicitor regulated in England & Wales before relying on Privacy, Terms, fundraising wording, or clinical indemnity positions.

---

## 1. Residual risk (what you cannot eliminate)

Anyone can start a claim. A clear disclaimer, charitable status, and careful wording **reduce** some exposures; they do **not** make the organisation “fireproof.”

Residual risk that remains after this PR includes:

| Residual risk | Why it remains |
|---|---|
| Claim that a reader followed educational content and came to harm | Disclaimers help framing; facts, causation and clinical governance still decide outcomes |
| MHRA / ASA challenge on medicines or health claims | Softened dose language helps; ongoing monitoring of ads and pages still needed |
| Charity Commission or Fundraising Regulator concern | Honest Gift Aid status helps; registration, appeals and reporting are trustee duties |
| GDPR / PECR / ICO complaint | Mailto-light model lowers surface; analytics, email and future backends still need DPIA / policies |
| Equality Act accessibility claim | Toolbar and a11y work help; WCAG is ongoing, not “done” |
| Defamation / invented patient stories | Named testimonials stripped from live path; future user content must stay governed |
| Copyright / image claims | Credits pages help; licensing hygiene must continue |
| Gift Aid / tax reclaim errors | Site no longer implies live Gift Aid; HMRC process is still yours to complete correctly |
| Cyber / XSS / data incident | See `docs/SECURITY-REVIEW-2026-09-16.md` — sanitizeHtml + no secrets help; residual host/CSP gaps remain |

**Insurance and governance are not optional substitutes for copy changes.** Trustees should maintain appropriate cover (including charity / trustee liability and clinical or professional indemnity where relevant) and a clinical governance trail for YMYL content.

---

## 2. Top lawsuit / regulatory vectors (UK-focused)

### 2.1 Clinical negligence-style claims from “advice”

**Vector:** Reader treats a guide, chatbot answer or symptom-checker result as personal treatment advice; alleged harm follows.

**Mitigations in this PR:** Sitewide short strip + full `/disclaimer`; educational framing on tools/chat; medicines dose language softened toward “ask rheumatology / SmPC / BNF.”

**Still owned by Louis/board:** Clinical review cadence (`docs/CLINICAL-REVIEW-CHECKLIST.md`), indemnity, escalation SOPs for red-flag content, decision whether chat should stay purely educational.

### 2.2 MHRA / ASA — medicines and health advertising

**Vector:** Pages or ads that look like directing treatment, dosing, or unsubstantiated cure claims.

**Mitigations:** Softened ibuprofen/naproxen/paracetamol/febuxostat/azathioprine/supplement dose-as-instruction language; citations retained; no invented drugs.

**Still owned:** Pre-publication clinical sign-off on medicines pages; ad creative review; no “approved by MHRA/ASA” claims (we make none).

### 2.3 Charity Commission / Fundraising Regulator

**Vector:** Misleading fundraising (fake progress meters, pressure urgency, Gift Aid before registration, unclear use of funds).

**Mitigations:** Campaign meter only when verified; Exercise Circuit campaign no longer shows invented £12,500 / “125 of 500”; Gift Aid meta and Zakat copy no longer claim live +25%; donate page clarifies registration in progress.

**Still owned:** Complete HMRC Gift Aid registration before collecting declarations; consider Fundraising Regulator registration; keep research-fund messaging aligned with `docs/RESEARCH-FUND-CAMPAIGN-CREATIVE.md` (draft until approved).

### 2.4 GDPR / PECR

**Vector:** Privacy text that claims server-side form/appointment databases, Gift Aid processing, or selling data — while the live model is largely mailto + consent-gated analytics.

**Mitigations:** Privacy updated (Sept 2026) to describe mailto-heavy processing and Gift Aid-not-yet-live; cookies banner remains consent-gated for GA.

**Still owned:** Solicitor review of Privacy / Cookies; DPIA as tools grow; PECR rules for any marketing email.

### 2.5 Equality Act — accessibility

**Vector:** Disabled users unable to access key information or donate paths.

**Mitigations:** Existing a11y tooling and Week-1 polish remain; disclaimer components use semantic `role="note"` / links.

**Still owned:** Ongoing WCAG 2.2 AA programme (`docs/strategy/04-ACCESSIBILITY-WCAG-22-AA.md`); real user testing.

### 2.6 Defamation / fake stories

**Vector:** Invented named patients or unverifiable impact quotes.

**Mitigations verified:** `TestimonialDisplay` loads an empty list (no invented patients on the home path); Lived Experiences / Impact copy already disclaims named patients.

**Still owned:** Written consent workflow before any named story goes live.

### 2.7 Copyright — images

**Vector:** Unlicensed stock or scraped images.

**Mitigations:** Existing credits / gallery paths; no image restore of Oswestry or unrelated assets in this PR.

**Still owned:** Licence audit for blog/hero assets.

### 2.8 Gift Aid before registration

**Vector:** Collecting or implying Gift Aid reclaim before HMRC registration.

**Mitigations:** `CHARITY.giftAidRegistered: false`; donate/Zakat/meta copy corrected; Terms updated.

**Still owned:** Flip the flag and wording only after registration is confirmed live.

---

## 3. What we changed in this PR (code / docs)

1. **`docs/LEGAL-RISK-HARDENING-2026-09-16.md`** — this memo.  
2. **Shared disclaimer helpers** — `src/lib/medicalDisclaimer.ts` (+ Vitest).  
3. **`MedicalDisclaimerStrip`** + full page **`/disclaimer`** (`MedicalDisclaimer.tsx`).  
4. **`EducationalDisclaimerBox`** now uses shared short copy and links to `/disclaimer`.  
5. **`GuideLayout`** shows the short strip on wrapped guide pages.  
6. **Symptom checker, Chat page, ChatBot footer, BlogPost** surface educational / escalation wording.  
7. **Medicines / supplements framing softened** on painkillers/NSAIDs, febuxostat, azathioprine, diet/turmeric FAQs — educational + ask clinician / SmPC / BNF; citations kept.  
8. **Fundraising honesty** — CampaignBand meter only when verified; Exercise Circuit fake progress removed; Donate + Zakat Gift Aid overclaims fixed.  
9. **Footer** — Charity Commission number retained; links to medical disclaimer, complaints, contact.  
10. **Privacy / Terms** — aligned closer to mailto-only reality; Gift Aid not live; health disclaimer strengthened with link to `/disclaimer`.  
11. **Security (brief fold-in):** Prior review (`docs/SECURITY-REVIEW-2026-09-16.md`) already notes sanitizeHtml on HTML sinks and no committed secrets. No restore of Supabase/Vercel/Cloudflare. Host CSP / Permissions-Policy gaps remain a trustee/host action (liability-adjacent but not blocking this YMYL pass).

**Explicitly not claimed:** “No lawsuits,” MHRA/ASA/Charity Commission approval, fake insurance certificates, or restoration of heavy backends. No Oswestry address restored.

---

## 4. What Louis / the board must still do

Ranked — **these are not optional “nice to haves” if lawsuit resilience is the goal:**

1. **Trustee indemnity / charity insurance** — confirm cover (and clinical/professional indemnity for HCPC practice vs charity educational role).  
2. **Clinical governance** — run `docs/CLINICAL-REVIEW-CHECKLIST.md` on medicines, red-flag and exercise champions; keep `lastReviewed` honest.  
3. **Solicitor review** of Privacy, Cookies, Terms, `/disclaimer`, and donate/Gift Aid wording before major fundraising push.  
4. **HMRC Gift Aid registration** — complete before any Gift Aid tick-box or reclaim; then set `giftAidRegistered: true` and update copy.  
5. **Fundraising Regulator** — decide registration / Code compliance for public fundraising.  
6. **Complaints & safeguarding** — ensure `/complaints` and `/safeguarding` match real trustee procedures (not just pages).  
7. **Named testimonials** — written consent + verification before publishing any; keep empty until then.  
8. **Campaign meters** — only publish raised totals from bank/Stripe books.  
9. **Accessibility remediation plan** — schedule and budget, not one-off.  
10. **Security host headers** — align live CSP / Permissions-Policy with `public/_headers` intent (see security review).  
11. **Do not put a public Oswestry (or any incorrect) registered address** on the site until Charity Commission details are settled and intentionally published.

---

## 5. Ranked residual risks Louis must own (after this ship)

1. **Clinical content causing alleged patient harm** (highest) — indemnity + clinical review.  
2. **Medicines advertising / dose-direction residual** — keep reviewing BNF/SmPC drift.  
3. **Fundraising / Gift Aid compliance** until HMRC + Regulator positions are closed.  
4. **Privacy / PECR** as email and analytics grow.  
5. **Accessibility complaints**.  
6. **User-generated or future testimonial defamation**.  
7. **Image copyright**.  
8. **Host/security header gaps** (medium operational; lower than YMYL for most visitors).

---

*Prepared for Living With Arthritis UK internal use — 16 September 2026.*
