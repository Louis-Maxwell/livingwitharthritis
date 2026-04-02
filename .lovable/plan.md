## Plan: £100M Premium Overhaul — Phase 1

Given the massive scope (all pages + backend), we'll tackle this in focused batches. Phase 1 delivers the highest-impact visual and structural upgrades.

---

### Batch 1: Global Design System Polish

**`src/index.css`** — Refine the design tokens:
- Increase base spacing scale for more generous whitespace
- Add premium shadow tokens (`--shadow-editorial`, `--shadow-card-hover`)
- Add subtle gradient tokens for section backgrounds
- Refine border-radius tokens (softer, more institutional)

**`tailwind.config.ts`** — Extend with:
- Custom `max-w-editorial` (1200px) for tighter, more focused content widths
- Premium box-shadow utilities
- Refined letter-spacing scale for section labels

**`src/components/ui/PageHero.tsx`** — Standardise all page heroes:
- Consistent height, typography hierarchy, subtle gradient overlay
- Breadcrumb integration
- Clean red accent line under heading

---

### Batch 2: Homepage Sections Refinement

**`src/components/HeroSection.tsx`** — Polish:
- Ensure the split layout feels cinematic with proper image sizing
- Refine stat cards with premium shadows and micro-borders
- Ensure trust badges are crisp and aligned

**`src/components/ServicesGrid.tsx`** — Upgrade cards:
- Add hover lift with editorial shadow
- Tighten card padding and typography
- Add subtle red accent on hover

**`src/components/landing/FAQSection.tsx`** — Clean up:
- Premium accordion styling with smooth transitions
- Section label with tracked uppercase

**`src/components/landing/TestimonialsSection.tsx`** — Refine:
- Larger quote marks, better typography
- Subtle card backgrounds

---

### Batch 3: Key Hub Pages

**`src/pages/ExerciseHub.tsx`** — Premium layout:
- Better card grid with consistent imagery
- Section dividers and editorial spacing

**`src/pages/DietHub.tsx`** — Same treatment

**`src/pages/Chat.tsx`** — Polish chat interface:
- Cleaner message bubbles
- Better empty state

**`src/pages/SelfHelpTool.tsx`** — Upgrade tool UI:
- Premium form styling
- Better result cards

---

### Batch 4: Backend Data Quality

- Seed richer content into `physio_myths` table (add 2-3 more myths)
- Ensure `services` table has compelling, detailed descriptions
- Verify all CMS content reads as professional and evidence-based

---

### Files Changed (Phase 1)

| File | Change |
|------|--------|
| `src/index.css` | Add premium shadow/gradient tokens |
| `tailwind.config.ts` | Add editorial utilities |
| `src/components/ui/PageHero.tsx` | Standardise premium hero |
| `src/components/HeroSection.tsx` | Polish hero layout |
| `src/components/ServicesGrid.tsx` | Premium card styling |
| `src/components/landing/FAQSection.tsx` | Clean accordion design |
| `src/components/landing/TestimonialsSection.tsx` | Refine typography |
| `src/pages/ExerciseHub.tsx` | Premium hub layout |
| `src/pages/DietHub.tsx` | Premium hub layout |
| `src/pages/SelfHelpTool.tsx` | Upgrade tool UI |

No database schema changes. Potential data seeding for richer content.
