# Medical Author/Reviewer System — Living With Arthritis
**Date:** 2026-08-18  
**Status:** ✅ Well-implemented, verified in Phase 3

---

## System Overview

The site has a robust medical credibility system that displays healthcare professional information on articles and condition pages. This provides critical E-E-A-T (Expertise, Experience, Authoritativeness, Trustworthiness) signals for YMYL healthcare content.

---

## Current Architecture

### 1. Data Layer: `src/data/medical-authors.json`

**Currently Defined:**
- **maxwell** (author/reviewer)
  - Name: Maxwell
  - Role: First Contact Practitioner
  - Credentials: HCPC PH128483
  - Organization: CSP Member (Chartered Society of Physiotherapy)
  - Specialties: Arthritis Management, Joint Pain Relief, Exercise Prescription, Patient Education
  - Bio: 20+ years clinical experience
  - Verified: ✅ Real HCPC registration number

**Structure:**
```json
{
  "slug": "maxwell",
  "kind": "author|reviewer",
  "name": "Maxwell",
  "title": "First Contact Practitioner",
  "credential": "HCPC PH128483",
  "organization": "CSP Member",
  "specialties": [...],
  "bio": "...",
  "credentials": [...],
  "image": null,
  "sameAs": []
}
```

### 2. Display Components

#### MedicalReviewBadge (`src/components/MedicalReviewBadge.tsx`)
- **Purpose:** Display reviewer credentials on articles and pages
- **Features:**
  - Links to `/authors/:slug` or `/reviewers/:slug` bio pages
  - Two variants: standard (sidebar) and compact (inline)
  - Automatic lookup in medical-authors.json
  - Shows: name, title, credential, organization, review date
  - Links to Editorial Standards page
- **Integration:**
  - Used in 15+ hardcoded condition/guide pages
  - Used in BlogPost component for database articles
  - Used in specialized pages (Knee OA, Arthritis Mental Health, etc.)

#### AuthorProfile (`src/pages/AuthorProfile.tsx`)
- **Purpose:** Render `/authors/:slug` and `/reviewers/:slug` profile pages
- **Features:**
  - Reads from medical-authors.json
  - Displays full bio and credentials
  - Generates Person schema JSON-LD
  - Handles placeholders (marks unfinished bios as [PLACEHOLDER])
  - Does NOT emit placeholder fields into schema (safety feature)
- **Routing:**
  - `/authors/maxwell` → Author profile
  - `/reviewers/maxwell` → Reviewer profile
  - (Route differentiated by `kind` field in JSON)

### 3. Schema Integration

#### BlogPost Component (`src/pages/BlogPost.tsx`)
- Reads from database fields:
  - `author` → author name
  - `author_credentials` → author job title
  - `reviewed_by` → reviewer name
  - `reviewer_credentials` → reviewer job title
- Generates MedicalWebPage schema with author/reviewer
- Falls back to "Clinical Review Board" if not specified
- Hardcoded Maxwell schema when reviewer is Maxwell (can be improved)

#### Hardcoded Pages (Conditions, Guides)
- Use MedicalReviewBadge directly with props
- Pass: reviewer name, title, credential, date, authorSlug
- Generates proper links to bio pages

---

## Current Coverage

### Pages with Medical Review Badge

| Page | Component | Reviewer | Status |
|------|-----------|----------|--------|
| `/blog/knee-osteoarthritis-exercises` | Hardcoded | Maxwell | ✅ Phase 1 updated |
| `/conditions/arthritis` | Arthritis.tsx | Maxwell | ✅ Displays |
| `/conditions/elbow-arthritis` | ElbowArthritis.tsx | Maxwell | ✅ Compact |
| `/conditions/hand-arthritis` | HandArthritis.tsx | Maxwell | ✅ Compact |
| `/conditions/hip-arthritis` | HipArthritis.tsx | Maxwell | ✅ Compact |
| `/conditions/knee-arthritis` | KneeArthritis.tsx | Maxwell | ✅ Compact |
| `/conditions/osteoarthritis` | Osteoarthritis.tsx | Maxwell | ✅ Compact |
| `/blog/[database]` | BlogPost.tsx | From DB | ✅ Dynamic |
| `/arthritis-mental-health` | ArthritisMentalHealth.tsx | Maxwell (default) | ✅ Displays |
| + 5 more condition pages | Various | Maxwell | ✅ |

**Total:** 15+ pages with medical review badges

### Database Articles
- All database articles read `reviewed_by` and `reviewer_credentials` from `blog_articles` table
- Blog Post component dynamically displays based on database values
- Falls back to "Clinical Review Board" if not specified

---

## Phase 3 Improvements Made

### ✅ Completed

1. **Fixed Knee OA Page Linking** (`KneeOsteoarthritisExercises.tsx`)
   - Added explicit `authorSlug="maxwell"` parameter
   - Ensures proper link generation to `/authors/maxwell`
   - Schema now properly references author profile

2. **Verified Schema Generation**
   - MedicalWebPage schema with author/reviewer properly emitted
   - Person schema for Maxwell bio page functional
   - No fabricated credentials in schema

3. **Reviewed All Current Usage**
   - All references point to verified Maxwell profile
   - No placeholder credentials in production pages
   - All hardcoded pages using consistent pattern

---

## Recommendations for Future Expansion

### 1. Add Additional Reviewers (When Available)
If future reviewers are added, update `medical-authors.json`:

```json
{
  "maxwell": { /* existing */ },
  "jane-smith": {
    "slug": "jane-smith",
    "kind": "reviewer",
    "name": "Dr Jane Smith",
    "title": "Consultant Rheumatologist",
    "credential": "[DO NOT FABRICATE - get real registration]",
    "organization": "NHS Hospital",
    "specialties": ["Rheumatoid Arthritis", "Biologic Therapy"],
    "bio": "...",
    "credentials": ["Consultant Rheumatologist", "GMC #..."],
    "image": null,
    "sameAs": [] // Only fill with verified URLs
  }
}
```

**Important:** Never fabricate credentials. Only add reviewers with verified:
- Real name
- Real registration number (GMC, HCPC, etc.)
- Real organization
- Willing to be publicly credited

### 2. Enhance `sameAs` Links
Currently empty but can include verified professional profiles:
- HCPC register listing
- GMC listing (for doctors)
- LinkedIn profile (if public-facing)
- ORCID (for researchers)
- University faculty page

Do NOT add fabricated URLs.

### 3. Improve BlogPost Schema Generation
Current: Hardcoded Maxwell schema  
Recommended: Look up reviewer in medical-authors.json and generate schema dynamically

```typescript
// In BlogPost.tsx - could be improved
const reviewer = reviewerName === "Maxwell" 
  ? authors.maxwell 
  : authors[slugify(reviewerName)]; // fallback

const reviewedBySchema = reviewer 
  ? { ...reviewer.schema }
  : { "@type": "Person", "name": reviewerName };
```

### 4. Add Reviewer Badges to Guides
High-value guides (Priority 17-19) could display reviewer info:
- `/guides/hip-exercises-for-osteoarthritis`
- `/guides/shoulder-pain-relief`
- `/guides/paracetamol-vs-ibuprofen-for-arthritis`

Currently these are guide pages without explicit reviewer badges. Adding would strengthen E-E-A-T.

---

## Testing Checklist ✅

### All items verified in Phase 3:

- [x] MedicalReviewBadge component renders correctly
- [x] Bio links work (`/authors/maxwell` accessible)
- [x] Schema is valid JSON-LD
- [x] No placeholder credentials in production output
- [x] Credentials match verified Maxwell registration
- [x] Bio page shows all specialties
- [x] All hardcoded pages link properly
- [x] Database articles read reviewer fields
- [x] Compact variant displays on condition pages
- [x] Editorial standards link present

---

## Schema Examples

### Author/Reviewer Profile (Person)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Maxwell",
  "jobTitle": "First Contact Practitioner",
  "url": "https://livingwitharthritis.org.uk/authors/maxwell",
  "mainEntityOfPage": "https://livingwitharthritis.org.uk/authors/maxwell",
  "knowsAbout": ["Arthritis Management", "Joint Pain Relief", ...],
  "identifier": "HCPC PH128483",
  "hasCredential": [
    "HCPC Registered First Contact Practitioner (PH128483)",
    "CSP Member (Chartered Society of Physiotherapy)",
    ...
  ],
  "affiliation": {
    "@type": "Organization",
    "name": "Chartered Society of Physiotherapy"
  }
}
```

### Blog Article with Author/Reviewer
```json
{
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "headline": "...",
  "author": {
    "@type": "Person",
    "name": "Maxwell",
    "jobTitle": "First Contact Practitioner"
  },
  "reviewedBy": {
    "@type": "Person",
    "name": "Maxwell",
    "jobTitle": "First Contact Practitioner"
  }
}
```

---

## Content Team Notes

### For Database Articles
When updating blog articles in Supabase, fill:
- `author` — Author name (leave blank for "Clinical Review Board")
- `author_credentials` — Job title (optional)
- `reviewed_by` — Reviewer name (currently: "Maxwell")
- `reviewer_credentials` — Reviewer title (currently: "First Contact Practitioner")

**Important:** Do NOT fabricate credentials. Use real names and verified registration numbers only.

### For New Articles
1. Determine if expert review is needed (yes for medical content)
2. Ask Maxwell or appropriate reviewer to verify content
3. Add their credentials to database fields
4. Verify against official registration (HCPC, GMC, etc.)
5. Create author profile in medical-authors.json if new person
6. Test bio page renders correctly

---

## Accessibility & Trust Signals

This system provides:
- **Transparency:** Clear display of who wrote/reviewed content
- **Accountability:** Named reviewers with verifiable credentials
- **Trust:** HCPC/CSP badges signal professional standing
- **Linking:** Direct path to full reviewer bio and credentials
- **Schema:** Machine-readable credentials for search engines

**Result:** Supports Google's YMYL evaluation criteria for healthcare websites.

---

## Summary: System Status ✅ READY

**Implemented:** ✅ Fully  
**Tested:** ✅ Working correctly  
**Schema:** ✅ Valid JSON-LD  
**Coverage:** ✅ 15+ pages  
**Credentials:** ✅ Verified (Maxwell HCPC PH128483)  
**Expansion Ready:** ✅ Template available  

**Recommendations:**
1. Keep system as-is (working well)
2. Add additional verified reviewers when available
3. Update BlogPost schema generation to be dynamic
4. Consider adding reviewer badges to existing guides

**No urgent fixes needed.** System is well-designed and functional.

---

**Document Version:** 1.0  
**Created:** 2026-08-18  
**Status:** ✅ Phase 3 Task 7 Complete
