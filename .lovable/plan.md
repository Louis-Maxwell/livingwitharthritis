

## Plan: Press/Media Kit, Partner With Us, Downloadable PDFs & Outreach Templates

Four deliverables to support the backlink building strategy.

---

### 1. Press & Media Kit Page (`/press`)

**New file:** `src/pages/Press.tsx`

A professional press/media page containing:
- Hero section with "Press & Media Kit" heading and intro text
- **Key Facts & Statistics** cards (10M+ UK adults with arthritis, free service, HCPC-registered team, NHS-aligned)
- **About the Charity** summary with mission statement and founding story
- **Expert Spokespeople** section with bios and headshot placeholders for media contact
- **Brand Assets** section with downloadable logo guidelines (colour palette, usage rules)
- **Press Releases / News** placeholder section for future updates
- **Media Contact** card with press email (press@livingwitharthritis.org.uk)
- SEO meta tags optimised for press coverage queries

**Route:** Add lazy import and `/press` route in `App.tsx`

---

### 2. Partner With Us Page (`/partners`)

**New file:** `src/pages/Partners.tsx`

Distinct from the existing Corporate Giving page (which focuses on donations). This page targets health charities, NHS bodies, GPs, community groups:
- Hero with "Partner With Us" heading
- **Why Partner** section — mutual benefits for health orgs, charities, GP practices
- **Partnership Types** cards: Resource sharing, co-branded guides, cross-referral, joint events, research collaboration
- **Current Partners / Affiliations** placeholder grid
- **Partnership Enquiry Form** — name, organisation, type of partnership (dropdown), message — submitted via existing `submit-contact` edge function with a "partnership" tag
- SEO meta tags for partnership-related queries

**Route:** Add lazy import and `/partners` route in `App.tsx`

---

### 3. Downloadable PDF Assets

**Update:** `src/lib/generatePdf.ts`

Add 3 new link-worthy PDF generators using the existing jsPDF pattern:
- **generateArthritisFactSheet()** — UK arthritis statistics infographic-style PDF (prevalence, economic impact, key facts)
- **generateShoppingListPdf()** — Anti-inflammatory grocery shopping list (organised by food group, with notes)
- **generateSelfAssessmentPdf()** — Simple joint pain self-assessment printable tracker

**New file:** `src/components/DownloadableResources.tsx`

A section/component (used on Press page and potentially other pages) with download buttons for all available PDFs, presented as attractive cards with icons and descriptions.

---

### 4. Outreach Email Templates

**Generated artifact:** A DOCX file saved to `/mnt/documents/` containing 4 ready-to-use, professionally formatted email templates:
1. **Resource Page Outreach** — pitch to add livingwitharthritis.org.uk to health resource pages
2. **Guest Post Pitch** — offer to write expert arthritis content for health blogs
3. **Broken Link Replacement** — suggest replacing dead links with your free guides
4. **Partnership Inquiry** — outreach to complementary health charities/orgs

Each template includes subject line, body with merge fields (e.g., `[Site Name]`, `[Contact Name]`), and a brief usage note.

---

### Files Changed

| File | Action |
|------|--------|
| `src/pages/Press.tsx` | New — Press & Media Kit page |
| `src/pages/Partners.tsx` | New — Partner With Us page |
| `src/components/DownloadableResources.tsx` | New — PDF download cards component |
| `src/lib/generatePdf.ts` | Add 3 new PDF generators |
| `src/App.tsx` | Add `/press` and `/partners` routes |
| `/mnt/documents/outreach-email-templates.docx` | Generated outreach templates document |

No database changes required.

