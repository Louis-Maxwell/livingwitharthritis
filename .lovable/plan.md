## Goal
Make `src/pages/TrustCredibility.NEW.tsx` safe to ship by removing all `TODO:` placeholders — using verified data from `src/config/charity.ts` where possible and hiding sub-sections we can't substantiate. This matches project memory ("no placeholder registration numbers", strict neutrality) and honours the user's instruction: *safe placeholders + hide unverified sections*.

## Confirmed verified facts (already in the codebase)
From `src/config/charity.ts` and `TrustCredibility.tsx`:
- Charity name: **Living With Arthritis**
- Charity number (E&W): **1218461**
- Type: **Charitable Incorporated Organisation (CIO)**
- Regulator + register URL
- Postal address is intentionally blank (`hasCharityAddress()` gates rendering)
- Contact: `info@livingwitharthritis.org.uk`

## Edits to `src/pages/TrustCredibility.NEW.tsx`

1. **Import** `CHARITY` from `@/config/charity` and use `CHARITY.number` / `CHARITY.registerUrl` instead of hard-coded values, so the page can't drift.

2. **"Our legal status" section** — remove Companies House and "Ltd" paragraphs entirely (lines 102–118). Reason: charity is a **CIO** per our config, so there is no separate Companies House entity to disclose. Replace with one factual paragraph stating we're a CIO regulated solely by the Charity Commission, linked to the live register.

3. **"How our health content is reviewed"** — drop the *"(TODO: reviewer name, HCPC registration number)"* aside. Keep the substantive claim that guides are reviewed by HCPC-registered clinicians and that every page shows a "Medically reviewed by" line + date (both already true on the live site via `MedicallyReviewed` component per memory).

4. **"How your donations are used"** — remove the Gift Aid paragraph entirely until HMRC recognition is confirmed. Remove the *"(TODO: Fundraising Regulator registration)"* aside from the final paragraph but keep the Code of Fundraising Practice reference (public code, not a claim of registration).

5. **"Governance & accountability"** — drop the *"(TODO: list trustee names…)"* aside. Point readers to `/governance` (already listed) and the Charity Commission register (which publishes the current trustee list).

6. **JSON-LD** — no changes needed; it already only references verified fields.

7. **File status** — leave the filename as `.NEW.tsx` (not routed). This continues to be a drop-in replacement candidate for `/trust` when the user is ready.

## Not doing
- Not touching the live `TrustCredibility.tsx` (already uses verified data).
- Not integrating any of the other `.NEW.tsx` files, generated data, sitemaps, or `.md` plans from the bundle — per the user's Scope answer.
- Not adding trustee names, Companies House numbers, HCPC IDs, Gift Aid refs, or Fundraising Regulator IDs anywhere.

## Verification
- `rg -n "TODO" src/pages/TrustCredibility.NEW.tsx` returns nothing.
- Build succeeds; file is still not imported/routed (unchanged behaviour on `/trust`).