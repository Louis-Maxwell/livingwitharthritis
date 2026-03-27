

## Plan: Make the Website Feel Like a Public-Facing Charity

### Summary
Transform the site from an informational health platform into an emotionally engaging, donation-driven charity website through 7 focused changes.

---

### 1. Add Persistent "Donate" Button to Header
**File:** `src/components/Header.tsx`
- Add a prominent red/coral "Donate" button to the right side of the navigation bar
- Always visible on desktop; in mobile nav as a highlighted item
- Links to the donation modal or `/zakat-appeal`

### 2. Redesign Hero for Emotional Impact
**File:** `src/components/HeroSection.tsx`
- Replace the feature-card grid with a mission-first layout:
  - Large headline: "1 in 6 people in the UK live with arthritis. We're here for every one of them."
  - Subtext: Brief mission statement
  - Two CTAs: "Get Free Support" (primary) + "Donate Now" (secondary, outlined)
  - Below: a small patient quote with name/location
- Keep the TrustBadge and stats row but move feature cards into QuickAccessSection

### 3. Add Campaign Banner Component
**New file:** `src/components/CampaignBanner.tsx`
**Edit:** `src/pages/Index.tsx`
- Dismissible banner below the header with a current campaign (e.g. "Arthritis Awareness Month — Help us reach 1,000 new supporters")
- Links to a donation or sign-up page
- Stores dismissal in sessionStorage

### 4. Add "Your Impact" Donation Calculator
**New file:** `src/components/landing/DonationImpactSection.tsx`
**Edit:** `src/pages/Index.tsx`
- Interactive section: slider or preset amounts (£10, £25, £50, £100)
- Shows what each amount funds: "£25 = 3 guided physio sessions", "£50 = a month of community support"
- CTA button to donate that amount

### 5. Add Beneficiary Spotlight Section
**New file:** `src/components/landing/BeneficiarySpotlight.tsx`
**Edit:** `src/pages/Index.tsx`
- Carousel of 3-4 representative patient stories with name, age, location, condition, and a short quote
- Uses stock/illustration images (Unsplash) — not real patient photos
- "Read their full story" links to Impact Stories page

### 6. Add "Ways to Help" Page
**New file:** `src/pages/WaysToHelp.tsx`
**Edit:** `src/App.tsx` (add route)
- Cards for: Donate, Volunteer, Fundraise for Us, Corporate Partnerships, Leave a Legacy
- Each with description and CTA
- Link from header navigation

### 7. Reframe Stats for Emotional Resonance
**File:** `src/components/HeroSection.tsx`
- Change "10,000,000+" → "1 in 6 people" 
- Change "100+ types" → "Every type of arthritis"
- Change "50,000+" → "50,000 lives changed"
- Change "97%" → "97% say we helped"

---

### Technical Details
- No database changes needed
- No new dependencies
- All new components use existing Tailwind design tokens and shadcn/ui primitives
- Campaign banner uses `sessionStorage` for dismissal state
- Donation impact calculator reuses existing Stripe donation modal

### Files Changed/Created
| File | Action |
|------|--------|
| `src/components/Header.tsx` | Add Donate button |
| `src/components/HeroSection.tsx` | Redesign for mission-first messaging + reframe stats |
| `src/components/CampaignBanner.tsx` | New — dismissible campaign strip |
| `src/components/landing/DonationImpactSection.tsx` | New — interactive impact calculator |
| `src/components/landing/BeneficiarySpotlight.tsx` | New — patient story carousel |
| `src/pages/WaysToHelp.tsx` | New — engagement pathways page |
| `src/pages/Index.tsx` | Add campaign banner, impact section, beneficiary spotlight |
| `src/App.tsx` | Add `/ways-to-help` route |

