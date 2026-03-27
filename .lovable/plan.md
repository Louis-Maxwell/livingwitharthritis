

## Plan: Remove Charity Registration Number References Site-Wide

### Summary
Remove all mentions of "Charity Registration Number" (and its variations) along with the placeholder number "1234567" from 6 files across the website.

### Files & Changes

1. **`src/components/Footer.tsx`** (line 158)
   - Remove "Registered Charity No. 1234567 ·" from the bottom bar text, keeping only the address

2. **`src/pages/AboutUs.tsx`** (lines 119-122, 244-251)
   - Remove the "Reg. Charity No. 1234567" badge
   - Remove the "Registered Charity Details" section (heading + registration number block)

3. **`src/pages/Governance.tsx`** (lines 83-86, 157, 188-190, 215-218)
   - Remove "Registered Charity Number: 1234567" from the constitution text
   - Remove it from the meta description
   - Remove the "Reg. No. 1234567" badge
   - Remove the "Charity Registration Number" definition list entry

4. **`src/pages/Finances.tsx`** (lines 65-68)
   - Remove "Charity Registration Number: 1234567" from the annual accounts text

5. **`src/pages/TrustCredibility.tsx`** (lines 90-92)
   - Remove the "UK Registered Charity No. 1234567" badge/pill

6. **`src/components/landing/FundraisingProgressSection.tsx`** (line 316)
   - Remove the "Reg. #1234567" trust indicator span

