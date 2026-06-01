## Goal
Earn ~20 high-quality backlinks to livingwitharthritis.org.uk by (a) maximising the structured-data signals that directories, aggregators, and AI engines use to auto-cite the site, and (b) shipping a ready-to-submit outreach pack covering 20 UK charity, health, and MSK directories.

## Part A — Code: enrich structured data so directories pick us up

These are the on-site changes a senior dev would make. All injected via the existing manual-`useEffect` JSON-LD pattern (per memory), no Helmet changes.

1. **Expand sitewide Organization schema** in `index.html`
   - Upgrade `Organization` → `NGO` + `MedicalOrganization` (multi-type array)
   - Add: `logo`, `sameAs` (social profiles), `address` (27 Old Gloucester St), `contactPoint` (info@), `areaServed: GB`, `knowsAbout` (osteoarthritis, MSK, etc.), `medicalSpecialty: Rheumatology`
   - Add `WebSite` schema with `potentialAction: SearchAction` (enables Google sitelinks search box)

2. **Add `BreadcrumbList` JSON-LD** to all pillar/hub/condition pages via a small shared `useBreadcrumbSchema` hook — directories and Google use this for richer cards.

3. **Add `MedicalWebPage` / `Article` schema** to:
   - `ArthritisStarterGuide`, `DietHub`, `ExerciseHub`, all `/conditions/*`, all `/pillar/*`, `/diet/*`, `/myths/*` pages
   - Includes `lastReviewed`, `reviewedBy` (HCPC physio), `audience: Patient` — these fields are what NHS/NICE-style aggregators look for.

4. **Add `FAQPage` schema** to the FAQ page and any page with a Q&A block (Starter Guide, condition pages).

5. **Add `HowTo` schema** to the exercise pages (`SeatedTaiChi`, `TaiChiForBeginners`, etc.) — Tai Chi steps already exist in copy.

6. **Verification files for directory submissions** — scaffold empty placeholders in `public/` for the three commonly-required ones:
   - `BingSiteAuth.xml` (placeholder, user pastes token)
   - existing `google6403cab80af896ec.html` already present ✅
   - A short note in README explaining where to drop new verification files.

7. **`public/.well-known/security.txt`** — small file most charity directories scan for as a "real org" signal.

8. **Update `llms.txt`** to advertise the site to AI search engines (Perplexity, ChatGPT browsing, Claude) with a clean topic index — drives AI-citation backlinks.

## Part B — Outreach pack: 20 UK directories/registers to submit to

Generated as a single markdown file at `/mnt/documents/backlink-outreach-pack.md` so it's downloadable. Each entry includes: URL, link type (do-follow / no-follow / citation), submission process, what they ask for, and a pre-written submission blurb tailored to the charity.

Tier 1 — Authority / regulator citations (high trust, mostly no-follow but huge E-E-A-T weight):
1. Charity Commission for England & Wales — register listing
2. NCVO member directory
3. Charity Excellence Framework
4. Charity Choice (charitychoice.co.uk)
5. UK Fundraising directory
6. Small Charities Coalition
7. GOV.UK "Find a charity" page
8. OpenCharities.org

Tier 2 — Health & MSK-specific (topical relevance = strongest SEO value):
9. Patient.info partner directory
10. Health Unlocked communities
11. HealthTalk.org resources
12. Carers UK directory
13. AgeUK local services hub
14. Disability Rights UK resource list
15. Self Management UK partner list

Tier 3 — Wellness / lifestyle (do-follow, broader reach):
16. Trustpilot business profile
17. Google Business Profile (charity category)
18. Yell.com health & wellbeing
19. UK Health Radio guest-spot directory
20. The Conversation UK — pitch as expert contributor (earns editorial in-content links)

For each: ready-to-paste submission blurb (50–80 words), the exact email/form URL, and the keyword-anchor request ("Living With Arthritis — UK osteoarthritis & MSK self-management charity").

## Part C — Tracking

Add a small admin-only page `src/pages/AdminBacklinks.tsx` (gated by existing `useAdmin` hook) listing the 20 targets with a status column (Not started / Submitted / Live / Rejected). Backed by a new `backlink_submissions` table with RLS so only admins can read/write. Lets the team see progress and a link-velocity count.

## Technical details
- Schema injected via `useEffect` (per memory `mem://tech/seo/on-page`) — never Helmet, to avoid the known crash.
- All new JSON-LD validated mentally against schema.org; can run `scripts/validate-jsonld.mjs` after.
- No design changes, no visible UI changes except the admin tracker page.
- New table:
  ```
  backlink_submissions(id, target_name, target_url, tier, status, submitted_at, live_at, notes)
  ```
  with `GRANT`s for `authenticated` + `service_role`, RLS policy `has_role(auth.uid(), 'admin')`.

## What this won't do
- It can't *force* 20 backlinks to appear — directories review submissions. Realistic expectation: 12–16 of the 20 go live within 4–8 weeks if the submission pack is sent.
- No paid link-building, no PBNs, no link exchanges — those violate Google guidelines and would risk the charity's domain.

## Files (estimate)
- edit `index.html` (expand JSON-LD)
- new `src/hooks/useStructuredData.ts` (shared schema injector)
- new `src/lib/schemas/` (typed schema builders: breadcrumb, medicalWebPage, faqPage, howTo)
- edits to ~10 page files to call the hook
- new `public/.well-known/security.txt`, `public/BingSiteAuth.xml.example`
- edit `public/llms.txt`
- new `src/pages/AdminBacklinks.tsx` + route in `src/App.tsx`
- new migration for `backlink_submissions` table
- new `/mnt/documents/backlink-outreach-pack.md` (the 20-target submission pack)
