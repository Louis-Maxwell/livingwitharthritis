## Plan: Add 3 SEO content sections to existing pages

Append each subheading (lightly edited for UK voice, neutrality, and brand tone) to the most topically relevant existing page as a new SEO content section. Text-only, no images.

### Mapping

1. **Subheading 1 — Senior Mobility / Chair Exercises** → `src/pages/ExerciseHub.tsx`
   - New section: *"Chair-based movement for older adults"*
   - ~500 words on low-impact chair exercise, fall prevention, cardiovascular benefits, sarcopenia, ADLs.

2. **Subheading 2 — Arthritis, Fibromyalgia & Chronic Pain Management** → `src/pages/ArthritisFlareUps.tsx`
   - New section: *"Evidence-based management of arthritis and chronic musculoskeletal pain"*
   - ~500 words covering osteoarthritis, TENS, fibromyalgia central sensitisation, back pain rehab.

3. **Subheading 3 — Medications & Natural Supplements** → `src/pages/SelfHelpTool.tsx`
   - New section: *"Medications and supplements for joint health"*
   - ~500 words covering allopurinol, corticosteroids, turmeric/curcumin, bioavailability, holistic combination.

### Implementation rules

- Plain HTML/JSX section component inline in each page, semantic markup (`<section>`, `<h2>`, `<h3>`, `<p>`), Tailwind tokens only (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`).
- Editorial tone consistent with project memory: UK English, neutral, no "NHS" mentions, no political content, no promotional badges. Fix the "one do not need" grammar slip from source.
- Add a brief disclaimer line at end of each section: *"This is general information, not medical advice. Speak to a GP, rheumatologist or pharmacist before changing medication or starting new exercise."*
- Use existing typography rhythm (Playfair Display headings via prose classes already present on these pages).
- No new routes, no schema/JSON-LD changes, no sitemap regeneration needed (pages already indexed).
- Skip images entirely per user choice.

### Files to read first (to match section styling)

- `src/pages/ExerciseHub.tsx`
- `src/pages/ArthritisFlareUps.tsx`
- `src/pages/SelfHelpTool.tsx`