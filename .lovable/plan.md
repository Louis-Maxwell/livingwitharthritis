

## Plan: Premium Landing Page Redesign

The current landing page has good content but feels busy — too many visual patterns (dot grids, DNA graphics, gradient orbs), inconsistent spacing, and competing visual elements. The goal is a **luxurious, editorial, high-end charity aesthetic** — think Médecins Sans Frontières meets Apple.

### Design Principles
- **Whitespace as luxury** — generous breathing room between sections
- **Restrained palette** — use color sparingly for maximum impact
- **Typography-led** — let the serif headings and clean body text do the work
- **Fewer decorative elements** — remove dot patterns, DNA graphics, blur orbs, noise textures
- **Consistent section rhythm** — uniform padding, dividers, and transitions

### Changes

#### 1. Hero Section — Refined & Cinematic
**`src/components/HeroSection.tsx` + `src/components/HeroSection.css`**
- Remove noise texture overlay, floating orbs, and gradient background complexity
- Use a clean white/warm background with a single subtle gradient wash
- Simplify to: badge → headline → subtext → 2 CTAs → stats row
- Remove the patient quote from hero (move social proof to testimonials)
- Remove trust badge row (4 pills) — redundant with QuoteSection credentials
- Make stats more elegant: thin dividers between them, no glassmorphism cards
- Tone down CTA pulse animation — replace with subtle hover glow only
- Remove scroll indicator

#### 2. Quick Access Section — Cleaner Card Grid
**`src/components/landing/QuickAccessSection.tsx`**
- Replace framer-motion with CSS animations
- Remove dot-grid background pattern and radial glow
- Simplify to a clean 3-column grid (equal weight) instead of asymmetric 2+3 layout
- Remove emoji decorations and shine sweep effects
- Cards: white bg, subtle border, icon + title + one-line description + arrow
- Minimal, scannable — like a premium service directory

#### 3. About Section — Streamlined
**`src/components/AboutSection.tsx`**
- Remove framer-motion, DNA graphic, blur orbs
- Simplify to: left column (heading + mission text) + right column (milestone stats in 2x2 grid)
- Remove the "Did you know?" card and embedded quote (redundant with QuoteSection)
- Use CSS fade-in animations

#### 4. Services Grid — Lighter Touch
**`src/components/ServicesGrid.tsx`**
- Remove framer-motion
- Simplify card styling: remove `card-gradient-border`, `hover-icon-bounce`, `premium-card` classes
- Clean cards with subtle hover elevation only

#### 5. Quote Section — Already Good, Minor Polish
**`src/components/landing/QuoteSection.tsx`**
- Reduce padding slightly, refine typography weight
- Keep as-is structurally — this is the strongest section

#### 6. How It Works — Simplified Steps
**`src/components/landing/HowItWorksSection.tsx`**
- Remove dot pattern, blur orbs
- Clean numbered steps with thin connecting line
- Remove AnimatedCounter from steps (over-engineered for this context)

#### 7. Testimonials — Refined Cards
**`src/components/landing/TestimonialsSection.tsx`**
- Show 3 testimonials max (not 6) — curate the best
- Remove tint background, simplify card borders
- Cleaner layout with more whitespace

#### 8. Donation Impact — Polish
**`src/components/landing/DonationImpactSection.tsx`**
- Already clean — minor spacing refinements

#### 9. FAQ, Newsletter, GetInTouch — Remove framer-motion
**`src/components/landing/FAQSection.tsx`**, **`NewsletterSection.tsx`**, **`GetInTouchSection.tsx`**
- Replace framer-motion with CSS `animate-in` classes (already used elsewhere)

#### 10. Global CSS Polish
**`src/index.css`**
- Add a `.section-spacer` utility for consistent `py-24 lg:py-32` rhythm
- Add `.luxury-fade-in` CSS animation to replace all framer-motion `whileInView`

#### 11. Index Page — Tighten Section Order
**`src/pages/Index.tsx`**
- Remove CampaignBanner (clutters top)
- Reorder: Hero → Quick Access → How It Works → Services → Quote → Testimonials (3 cards) → Donation Impact → FAQ → Newsletter → Get In Touch → Footer
- Remove the tabbed "Explore" mega-section — it's overwhelming. The Quick Access cards already link to those hubs.

### Files Modified (11 files)
| File | Change |
|------|--------|
| `src/components/HeroSection.tsx` | Simplify layout, remove quote/trust badges/orbs |
| `src/components/HeroSection.css` | Remove orbs, noise, pulse; add refined hover |
| `src/components/landing/QuickAccessSection.tsx` | Clean 3-col grid, remove framer-motion |
| `src/components/AboutSection.tsx` | Remove DNA/orbs/framer-motion, streamline |
| `src/components/ServicesGrid.tsx` | Remove framer-motion, simplify cards |
| `src/components/landing/QuoteSection.tsx` | Minor polish |
| `src/components/landing/HowItWorksSection.tsx` | Remove decorations, clean steps |
| `src/components/landing/TestimonialsSection.tsx` | Show 3 best, cleaner cards |
| `src/components/landing/GetInTouchSection.tsx` | Remove framer-motion |
| `src/components/landing/NewsletterSection.tsx` | Remove framer-motion |
| `src/pages/Index.tsx` | Remove tabbed section + campaign banner, reorder |

### Technical Notes
- All framer-motion usage on the landing page will be replaced with CSS `animate-in` classes (already in the design system)
- This reduces JS bundle size and improves LCP/FID scores
- No database changes needed
- No new dependencies

