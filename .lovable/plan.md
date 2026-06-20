## Charity Registration Integration (static, no live API)

Surface Charity 1218461 consistently across the site, schema, and donation receipts. Single source of truth, no Charity Commission API call.

### 1. Single source of truth
Create `src/config/charity.ts`:
```ts
export const CHARITY = {
  number: '1218461',
  legalName: 'Living With Arthritis',
  type: 'CIO',
  regulator: 'Charity Commission for England and Wales',
  registerUrl: 'https://register-of-charities.charitycommission.gov.uk/charity-search/-/charity-details/<id>/1218461',
  address: { street: 'Oswestry Health Centre, Thomas Savin Road, Off Gobowen Road', locality: 'Oswestry', postalCode: 'SY11 1GA', country: 'GB' },
} as const;
```
Refactor Footer, AboutUs, Governance, Complaints to import from it (removes hardcoded strings, prevents drift).

### 2. Reusable verified badge
New `src/components/CharityRegBadge.tsx` — small pill: shield icon + "Registered Charity No. 1218461" + external link to Charity Commission register. Two variants: `inline` (footer-style) and `card` (boxed for About / Donate / Trust pages with regulator name + address).

Drop into:
- `src/pages/AboutUs.tsx` (replace the existing manual "Charity Name" block)
- `src/pages/Donate.tsx` near the donate form
- `src/pages/Trust.tsx`
- `src/pages/Governance.tsx`

### 3. JSON-LD schema (NGO + Charity)
Update `index.html` site-wide Organization JSON-LD to add:
```json
"identifier": [
  { "@type": "PropertyValue", "propertyID": "UK Charity Commission Registration", "value": "1218461" }
],
"nonprofitStatus": "Nonprofit501c3" → use "NonprofitType": "UKCharity",
"taxID": "1218461",
"address": { ... },
"founder"/"foundingDate" if available
```
Add a `buildCharitySchema()` helper to `src/lib/jsonLd.ts` returning a dedicated `@type: "NGO"` block with `legalName`, `taxID`, `address`, regulator URL. Inject on `/about`, `/donate`, `/governance`, `/trust` via existing `PageSchema` pattern.

### 4. Donation receipts + Gift Aid
- Edit `supabase/functions/_shared/transactional-email-templates/donation-confirmation.tsx` to add a footer line: *"Living With Arthritis is a Registered Charity in England & Wales (No. 1218461). Gift Aid increases your donation by 25p for every £1 at no extra cost — declaration on file applies to this and future donations until you tell us otherwise."* with link to register.
- Update `src/components/GiftAidDeclaration.tsx` (or the form section in `Donate.tsx`, whichever exists) so the consent text quotes the charity number and full legal name.
- No DB or edge-function logic changes — just template + UI copy.

### 5. Build & verify
- Type-check passes (auto).
- Manually skim updated pages in preview to confirm badge renders and footer still reads correctly.
- Validate emitted JSON-LD with `scripts/validate-jsonld.mjs` if present.

### Out of scope
- Live Charity Commission API lookup (skipped per your answer).
- Edge function / DB migration / new secrets — none required.

### Files touched
- new: `src/config/charity.ts`, `src/components/CharityRegBadge.tsx`
- edit: `src/components/Footer.tsx`, `src/pages/AboutUs.tsx`, `src/pages/Governance.tsx`, `src/pages/Donate.tsx`, `src/pages/Trust.tsx`, `src/pages/Complaints.tsx`, `src/lib/jsonLd.ts`, `index.html`, `src/components/GiftAidDeclaration.tsx` (if present), `supabase/functions/_shared/transactional-email-templates/donation-confirmation.tsx`

Approve and I'll implement.