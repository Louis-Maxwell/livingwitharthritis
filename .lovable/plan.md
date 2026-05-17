## Goal

Turn the uploaded `health-topics.html` (65 plain-English topics covering conditions, medications, supplements, and treatments) into a first-class, searchable Library inside the site — so visitors can find any topic from the homepage search and read it on its own SEO-friendly page.

## What I'll build

### 1. Data layer — `src/data/healthTopics.ts`
A parsed, typed dataset generated from the uploaded HTML. One entry per topic:

```ts
type HealthTopic = {
  slug: string;            // e.g. "naproxen"
  title: string;           // "Naproxen"
  subtitle: string;        // "A common anti-inflammatory painkiller"
  category: "Condition" | "Medication" | "Supplement" | "Treatment" | "Symptom" | "Support";
  keywords: string[];      // for search (title, synonyms, body terms)
  sections: { heading: string; body: string; bullets?: string[] }[];
  disclaimer: string;
};
```

I'll run a one-off Node script against `/tmp/h.html` to parse all 65 `<div class="topic">` blocks into this structure, dedupe near-duplicates (e.g. "aspirin" vs "aspirin2", "carpal-tunnel" vs "carpal-tunnel2") and write the `.ts` file. Categories will be auto-assigned via a slug → category map.

### 2. Library hub page — `/library` (`src/pages/Library.tsx`)
- Hero + intro
- Search box (filters by title, keywords, body text — instant client-side)
- Category filter chips (Conditions / Medications / Supplements / Treatments / Symptoms / Support)
- A–Z grid of topic cards, each linking to its detail page
- Uses existing Crimson/White institutional styling (Playfair Display headings, semantic tokens — no hard-coded colors)

### 3. Topic detail page — `/library/:slug` (`src/pages/LibraryTopic.tsx`)
- Renders the topic's sections, bullets, and disclaimer
- Breadcrumb back to Library
- SEO: `<title>{topic} | Living With Arthritis UK</title>`, meta description from subtitle, JSON-LD `MedicalWebPage` injected via `useEffect`
- "Related topics" rail (same category)
- 404 fallback if slug not found

### 4. Site-wide discoverability
- Add both routes to `src/App.tsx`
- Add "Library" link to the main `Header` nav
- Add the 65 entries to `public/sitemap.xml` (via the existing `scripts/generate-sitemap.ts`) and to `public/llms.txt`
- If the existing homepage has a search/lookup component, wire it to also match library entries; otherwise the dedicated `/library` search covers it

### 5. Cross-linking (light touch, no business logic changes)
Where a topic duplicates an existing condition page (osteoarthritis, RA, PsA, gout, AS, fibromyalgia, lupus), the library entry will link out to the canonical condition page instead of duplicating — keeps SEO clean and avoids cannibalisation.

## Out of scope
- No backend tables / Supabase changes — this is static content, fastest and cheapest as a TS data file.
- No rewording of medical copy — content imported verbatim from the upload.
- No changes to existing condition pages or donation flow.

## Technical notes
- Parsing happens once locally (script in `/tmp`), output committed as plain TS — no runtime HTML parsing.
- All colors via semantic tokens (`bg-background`, `text-foreground`, `text-primary`, etc.) per project memory.
- External links use `<a target="_blank">` per project rule.
- No Framer Motion AnimatePresence on the route.

## Files

Created:
- `src/data/healthTopics.ts`
- `src/pages/Library.tsx`
- `src/pages/LibraryTopic.tsx`

Edited:
- `src/App.tsx` (2 routes)
- `src/components/Header.tsx` (nav link)
- `public/llms.txt` (Library section)
- `scripts/generate-sitemap.ts` (include library slugs)
