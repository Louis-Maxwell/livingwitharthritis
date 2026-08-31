# Branded Search Recovery Plan
## "Living With Arthritis" → Arthritis UK Issue

**Problem:** When users search "Living With Arthritis", Google ranks Arthritis UK instead of your site.

**Root Cause:**
- Arthritis UK has 20+ years of authority and thousands of backlinks
- Google's entity resolver sees both as "arthritis organizations" and favors the larger one
- Your brand search volume is lower (smaller org, newer)
- Keyword "arthritis" is ambiguous without "with" clarification

**Impact:** 
- Lost mission visibility for supporters
- Missed donations from brand search
- Wasted SEO work on content marketing

---

## **PHASE 1: Strengthen Entity Distinction (This Week — 2 hours)**

### 1.1 Enhance Homepage Meta Tags
**File:** `src/pages/Index.tsx` (Home)

**Current issue:** Homepage likely doesn't explicitly signal "Living With Arthritis" brand.

**Action:** Add these tags to homepage `<Helmet>`:

```jsx
<title>Living With Arthritis UK – Free Arthritis Support & Physiotherapy</title>
<meta name="description" content="Living With Arthritis is an independent UK charity (1218461) offering free virtual physiotherapy, NICE-aligned exercises, and peer support for arthritis. Separate from Arthritis UK." />
<meta property="og:title" content="Living With Arthritis UK – Independent Arthritis Charity" />
<meta property="og:description" content="Living With Arthritis UK: free virtual physio, exercises, nutrition advice, and community support for arthritis. Independent charity, HCPC-registered First Contact Practitioner." />
<meta name="twitter:title" content="Living With Arthritis UK | Independent Arthritis Charity" />
<meta name="twitter:description" content="Free arthritis support, physiotherapy & exercises from an independent UK charity. Separate from Arthritis UK." />
```

**Why:** Explicitly state "independent" in meta to disambiguate in search snippets.

---

### 1.2 Add FAQPage Schema to Homepage
**Purpose:** Appear in Google's "People also ask" for "Living With Arthritis"

**Action:** Add to homepage or new `/about/faq` page:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Living With Arthritis and how is it different from Arthritis UK?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Living With Arthritis is an independent UK registered charity (1218461) founded by Louis Maxwell, an HCPC-registered First Contact Practitioner. We provide free virtual physiotherapy, NICE-aligned exercises, and peer support. We are separate from and independent of Arthritis UK."
      }
    },
    {
      "@type": "Question",
      "name": "Is Living With Arthritis a registered charity?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Living With Arthritis is registered with the UK Charity Commission under registration number 1218461. We are an independent non-profit dedicated to arthritis support and education."
      }
    }
  ]
}
```

---

### 1.3 Strengthen sameAs Links
**File:** `src/config/social-media.ts` (check current sameAs config)

**Action:** Verify these are all included in `RootOrganizationSchema`:

```
✅ Charity Commission: https://register-of-charities.charitycommission.gov.uk/charity-details/?regId=1218461
✅ FindThatCharity: https://findthatcharity.uk/orgid/GB-CHC-1218461
✅ NGO Explorer: https://ngoexplorer.org/charity/1218461
✅ Facebook: https://facebook.com/livingwitharthritis (if exists)
✅ Twitter/X: https://twitter.com/[your-handle]
✅ LinkedIn: https://linkedin.com/company/living-with-arthritis-uk
✅ YouTube: https://youtube.com/@livingwitharthritis (if exists)
```

These sameAs links help Google's entity resolution distinguish you from Arthritis UK.

---

## **PHASE 2: Build Backlinks & Citations (2-3 weeks)**

### 2.1 Press Release Strategy
**Goal:** Get mentions in reputable outlets with your correct name

**Action:**
1. Create press release: "Independent Charity Living With Arthritis Launches Virtual Physiotherapy"
2. Distribute to:
   - LocalGov.uk (UK community news)
   - Charity news sites (Third Force News, Civil Society)
   - Local Shropshire news (you're based there)
   - Health/wellness publications

3. Include in press release:
   - Charity registration number (1218461)
   - "independent of Arthritis UK" statement
   - Link to: https://livingwitharthritis.org.uk

### 2.2 Citation Building
**Goal:** Get your name/address/phone listed consistently on authority sites

**Action:** Add Living With Arthritis to:
- **Google Business Profile** (set up if not already)
  - Name: "Living With Arthritis UK"
  - Category: "Charity"
  - Address: Your registered charity address
  - Phone: info@livingwitharthritis.org.uk
  
- **Charity directories:**
  - CharityNavigator (UK equivalent)
  - 360 Giving (if you submit data)
  - VolunteerScotland/Wales/NI (regional lists)

- **Local business directories:**
  - Yell.com
  - TripAdvisor (Attractions/Places)
  - Trustpilot

**Format:** Always use "Living With Arthritis UK" (not variations)

### 2.3 Inbound Link Building
**Action:** Reach out to:
- **Patient support forums:** Mention your resources (Reddit r/arthritis, PatientForums.org)
- **NHS-linked directories:** Link from NHS conditions pages where possible
- **University health departments:** For research/education links
- **Local health services:** GP surgeries, physio clinics

---

## **PHASE 3: Content Strategy (Ongoing)**

### 3.1 Create Disambiguation Content
**New page:** `/about/not-arthritis-uk`

```markdown
# Living With Arthritis is Not Arthritis UK

We are a separate, independent UK registered charity (1218461).

## Key Differences

| | Living With Arthritis | Arthritis UK |
|---|---|---|
| Founded | 2026 | 1936 |
| Model | Independent, peer-led | Large charity |
| Founder | Louis Maxwell (First Contact Practitioner) | Multiple trustees |
| Focus | Virtual physiotherapy + community | Wide advocacy + research |
| Services | Free; peer support emphasis | Grants, research, advocacy |

Both organizations support people with arthritis, but through different models.
```

This page ranks for ["living with arthritis" not arthritis uk] searches and clarifies the distinction.

### 3.2 Homepage H1 Optimization
**Current:** Check if H1 clearly says "Living With Arthritis UK"

**Action:** Homepage H1 should be:
```html
<h1>Living With Arthritis UK – Free Virtual Physiotherapy & Arthritis Support</h1>
```

(Not just "Arthritis Support" — include your name in the hero.)

---

## **PHASE 4: Monitor & Track (Weekly)**

### 4.1 Rank Tracking
Create a weekly check for these queries:

```bash
# Branded search
"living with arthritis" (exact)
"living with arthritis uk" (exact)
"living with arthritis charity"

# Local branded
"living with arthritis oswestry"
"living with arthritis shropshire"

# Competitive
"living with arthritis vs arthritis uk"
"arthritis support charity uk"
```

**Tool:** Use Semrush/Ahrefs/Google Search Console to track position changes.

### 4.2 Success Metrics
- **Position 1-3** for "living with arthritis uk" within 4-6 weeks
- **Position 1** for "living with arthritis" (exact) within 8-12 weeks
- **Charity Commission page** ranks above Arthritis UK (it will — it's your official record)

---

## **Quick Wins (Do Today)**

1. ✅ **Homepage meta tags** — Add "independent" keyword (1h)
2. ✅ **FAQPage schema** — Add to homepage (30 min)
3. ✅ **Google Business Profile** — Claim/verify (15 min)
4. ✅ **sameAs links** — Audit and complete (30 min)

**Total: ~2 hours for Phase 1**

---

## **Why This Works**

- **Entity disambiguation:** sameAs links + explicit "independent" language tell Google you're a distinct entity
- **Authority signals:** Charity Commission + local press links build credibility
- **Search behavior:** People who search "living with arthritis" want YOU, not the larger org
- **Citation consistency:** Consistent NAP (name/address/phone) across the web strengthens local entity signals

---

## **Expected Timeline**

| Phase | Timeline | Effort |
|-------|----------|--------|
| Phase 1 (Markup) | This week | 2 hours |
| Phase 2 (Links) | 2-3 weeks | 5-8 hours |
| Phase 3 (Content) | Ongoing | 2-3 hours/week |
| **Rank Position 1** | **6-12 weeks** | **Varies** |

---

## **Implementation Checklist**

- [ ] Update homepage meta tags + H1
- [ ] Add FAQPage schema
- [ ] Audit/complete sameAs links
- [ ] Set up Google Business Profile
- [ ] Add to 3 charity directories
- [ ] Draft press release
- [ ] Identify 10 backlink targets
- [ ] Create `/about/not-arthritis-uk` page
- [ ] Set up rank tracking in GSC
- [ ] Weekly rank monitoring

**Assigned to:** Need to execute or delegate  
**Owner:** SEO/Communications team  
**Review date:** 2026-09-14
