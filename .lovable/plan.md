## Plan: Homepage SEO Teaser Section

### Overview
Create a new editorial section on the homepage containing three condensed teaser cards. Each card summarises one of the ~500-word SEO sections already added to inner pages, and links directly to that page so visitors can read the full depth.

### Placement
Insert between `<OpenSourceEthosBand />` and `<BlogPreview />` in `src/pages/Index.tsx` — this positions the teasers after the ethos/impact bands and before the blog, creating a natural "explore deeper topics" beat in the page scroll.

### Component: `src/components/landing/SEOTeaserSection.tsx`

New component with the following structure:
- Section wrapper: `py-20 sm:py-24 bg-background`, `aria-labelledby="seo-teaser-heading"`
- Heading row: kicker label + h2 "Go deeper on the topics that matter"
- 3-column grid of cards (responsive: 1 col mobile → 3 col desktop)

Each card contains:
1. **Tag/pill** (e.g. "Movement")
2. **Title** — the exact H2 from the target page's SEO section
3. **2-sentence teaser** — condensed from the opening paragraph of the SEO section
4. **CTA link** — "Read the full guide →" linking to the target page

Card destinations and copy:

| Card | Tag | Title | Teaser | Link |
|------|-----|-------|--------|------|
| 1 | Movement | Chair-based movement for older adults | Short, accessible chair routines meet people where they are — removing the intimidation of long gym sessions while reducing falls and supporting heart health. | `/exercises` |
| 2 | Pain relief | Evidence-based management of arthritis and chronic pain | Managing osteoarthritis, fibromyalgia and back pain well requires a combined approach: medical input, physiotherapy and steady lifestyle change. | `/arthritis-flare-ups` |
| 3 | Medication | Medications and supplements for joint health | When exercise and physiotherapy are not enough, understanding the real benefits and risks of drugs like allopurinol and options like turmeric helps people make safer choices. | `/self-help` |

### Styling rules
- Use Tailwind semantic tokens only (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `ring-border`, `text-primary`, `bg-primary/5`)
- Cards: `rounded-2xl`, `bg-card`, `ring-1 ring-border`, `shadow-sm`, hover `shadow-lg hover:-translate-y-1 transition-all`
- Headings: `font-display` (Playfair Display via project token)
- Body: `text-muted-foreground`
- Links: `text-primary` on hover, `inline-flex items-center gap-1`
- No images (user already chose to skip images)
- Editorial tone: UK English, no NHS mentions, no promotional badges

### Files to modify
- `src/pages/Index.tsx` — import the new component and insert it in the main flow
- `src/components/landing/SEOTeaserSection.tsx` — new file (the component)

### No new routes needed
The section links to existing routes already in `App.tsx`:
- `/exercises`
- `/arthritis-flare-ups`
- `/self-help`

### Verification
After implementation, check that:
- The section renders on the homepage preview
- All three links navigate correctly
- Cards are responsive across mobile, tablet, and desktop
- No build errors or type errors