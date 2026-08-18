# Database Article Optimization Guide — Phase 3
**For:** Content Team (Supabase Editorial Updates)  
**Date:** 2026-08-18  
**Scope:** Priority 1-24 blog_articles requiring meta and content optimization

---

## Overview

This guide lists database-driven articles (`blog_articles` table in Supabase) that need optimization for the Phase 3 content enhancement. These updates require direct Supabase editing — not code changes.

**Total Articles:** 15+  
**Effort:** ~1-2 hours per article (varies by scope)  
**Timeline:** Can be done in parallel with code changes

---

## Instructions for Content Team

### How to Update Articles in Supabase

1. **Access Supabase Dashboard:**
   - URL: https://app.supabase.com/
   - Project: livingwitharthritis
   - Table: `blog_articles`

2. **Find the article by slug** (see table below)

3. **Update these fields:**
   - `meta_title` — SEO title (50-60 chars)
   - `meta_description` — SEO description (120-160 chars)
   - `title` — Article headline  
   - `content` — Full article text (markdown)
   - `excerpt` — Short summary (for listings)
   - `author` — Author name (or leave blank for "Clinical Review Board")
   - `author_credentials` — Author job title
   - `reviewed_by` — Reviewer name (recommend: "Maxwell")
   - `reviewer_credentials` — Reviewer job title (recommend: "First Contact Practitioner")

4. **Publish:** Set `is_published = true`

5. **Test:** Visit `/blog/{slug}` and verify changes appear

---

## PRIORITY-RANKED DATABASE ARTICLES

### 🔴 CRITICAL: Priority 4 — Anti-Inflammatory Diet

**Slug:** `anti-inflammatory-diet`  
**Current Status:** 272 impressions, position 44.89 (MAJOR REBUILD NEEDED)  
**Effort:** 3-4 hours

**Current Title:** (unknown — likely needs complete rewrite)  
**Target Title:** "Anti-Inflammatory Diet for Arthritis: Mediterranean Recipes, Foods & Evidence | Living With Arthritis UK"

**New Meta Description (157 chars, max 160):**
"Discover the anti-inflammatory Mediterranean diet for arthritis. Foods to eat & avoid, weight management, recipes, and evidence-based strategies for UK patients."

**Key Content Sections to Build:**
1. **What is an anti-inflammatory diet?** (definition, why it matters for arthritis)
2. **Evidence for effectiveness** (cite: Mediterranean diet studies, NICE guidance)
3. **The Mediterranean diet** (overview, why it works for arthritis)
4. **Foods to eat** (with evidence):
   - Oily fish (omega-3s)
   - Colorful vegetables (antioxidants)
   - Berries (anthocyanins)
   - Olive oil (oleocanthal)
   - Nuts & seeds
   - Whole grains
   - Spices (turmeric, ginger)
5. **Foods to limit** (pro-inflammatory):
   - Processed foods
   - Added sugars
   - Red & processed meats
   - Refined carbs
   - Alcohol
6. **Weight management** (connection to joint pain)
7. **Supplements** (mention of glucosamine, omega-3, turmeric with evidence)
8. **Meal planning & recipes** (if possible, or link to)
9. **FAQ:**
   - How quickly will diet changes help?
   - Is it expensive?
   - Can I eat meat?
   - What about dairy?
10. **Internal links:** `/diet/foods-to-avoid-with-arthritis`, `/supplements`, `/diet/mediterranean-diet-for-arthritis`, `/blog/anti-inflammatory-diet-rheumatoid-arthritis`

**Author/Reviewer:** Maxwell (HCPC PH128483)

---

### 🟠 HIGH: Priority 3 — Cycling with Arthritis

**Slug:** `arthritis-and-cycling-uk`  
**Current Status:** 84 impressions, position 6.57 (goal: top 3)  
**Effort:** 1-2 hours

**New Title:** "Cycling With Arthritis: Benefits, Safety, Tips & Bike Setup | Living With Arthritis UK"

**New Meta Description (158 chars):**
"Can you cycle with arthritis? Yes. Learn safe cycling techniques, bike setup tips, progression, exercise bikes, and benefits for knee and hip arthritis pain relief."

**Key Sections:**
1. **Benefits of cycling for arthritis** (low-impact, joint-friendly)
2. **Safety tips** (start slow, warm up, proper form)
3. **Bike setup** (seat height, handlebar position, pedal alignment)
4. **Types of cycling** (outdoor, stationary, recumbent bikes)
5. **Exercise bike options** (brands, features for arthritis users)
6. **Progression** (how to gradually increase duration)
7. **When NOT to cycle** (acute flares, red flags)
8. **FAQ:**
   - Is cycling bad for knees?
   - How long should I cycle?
   - Stationary vs outdoor?
9. **Internal links:** `/blog/knee-osteoarthritis-exercises`, `/blog/knee-arthritis-exercises-uk`, `/exercises/`, `/guides/hip-exercises-for-osteoarthritis`

**Author/Reviewer:** Maxwell

---

### 🟠 HIGH: Priority 5 — Arthritis Pain Management

**Slug:** `arthritis-pain-management`  
**Current Status:** Unknown impressions (likely low)  
**Effort:** 2-3 hours

**New Title:** "Arthritis Pain Management: Evidence-Based Strategies & Relief Methods | Living With Arthritis UK"

**New Meta Description (158 chars):**
"How to manage arthritis pain: exercise, heat/cold, physiotherapy, medication, pacing, sleep. UK-focused self-management and medical approaches for chronic pain relief."

**Key Sections:**
1. **Movement & exercise** (reduces pain, builds strength)
2. **Heat & cold therapy** (when to use each)
3. **Physiotherapy** (manual therapy, exercises)
4. **Medication** (paracetamol, NSAIDs, topical treatments)
5. **Pacing techniques** (activity management)
6. **Sleep & rest** (importance for pain management)
7. **Flare-up management** (what to do during acute episodes)
8. **Psychological approaches** (mindfulness, coping)
9. **Assistive devices** (sticks, braces, splints)
10. **When to seek medical help** (red flags)
11. **NHS services** (GP, rheumatology, physiotherapy availability)

**Author/Reviewer:** Maxwell

---

### 🟡 MEDIUM: Priority 6 — Foods to Avoid with Arthritis

**Slug:** `foods-to-avoid-with-arthritis`  
**Status:** Diet cluster content  
**Effort:** 1-2 hours

**Optimize:**
- Ensure titles and meta are clear
- Link to `/blog/anti-inflammatory-diet`
- Evidence-based language only
- No unsupported medical claims
- Include "Foods to eat instead" section

---

### 🟡 MEDIUM: Priority 10 — Joint Replacement Surgery

**Slug:** `joint-replacement-surgery`  
**Status:** Hub page  
**Effort:** 2-3 hours

**New Title:** "Joint Replacement Surgery for Arthritis: When, Options & Recovery Guide | Living With Arthritis UK"

**Key Sections:**
1. **When is joint replacement considered?** (indications)
2. **Types of replacement** (knee, hip, hand, shoulder)
3. **Benefits & risks**
4. **Preparation** (pre-op assessment)
5. **Recovery timeline**
6. **Exercises after surgery**
7. **Questions to ask your surgeon**
8. **Internal links:** `/guides/knee-replacement-surgery`, `/guides/hip-replacement-surgery`, `/blog/hip-replacement-arthritis-uk`

**Support Pages Needed:**
- Create or verify: `/guides/hip-replacement-surgery`
- Create or verify: `/guides/recovery-after-joint-replacement`

---

### 🟡 MEDIUM: Priority 12 — Medication Guide Hub

**Slug:** `arthritis-medication-guide`  
**Status:** Hub/index page  
**Effort:** 1-2 hours

**Key Sections:**
1. **Overview** (medication types, when prescribed)
2. **NSAIDs** (paracetamol, ibuprofen, naproxen)
3. **Steroids** (short-term use, injections)
4. **DMARDs** (disease-modifying, for RA)
5. **Biologics** (newer treatments for RA/PsA)
6. **Topical treatments** (gels, creams)
7. **Side effects & interactions**
8. **Internal links:** `/guides/paracetamol-vs-ibuprofen-for-arthritis`, `/guides/steroids-for-arthritis`, `/supplements/`

---

### 🟡 MEDIUM: Priority 13 — TENS Machines

**Slug:** `tens-machines-arthritis-uk`  
**Effort:** 1 hour

**Key Sections:**
1. **How TENS works** (electrical stimulation)
2. **Evidence** (what research shows)
3. **Safe usage** (duration, frequency)
4. **Contraindications** (pacemakers, pregnancy)
5. **When to stop** (signs it's not helping)
6. **Recommended models** (UK suppliers)
7. **Professional advice** (when to see physiotherapist)

---

### 🟡 MEDIUM: Priority 14 — Enthesitis (Glossary + Linking)

**Slug:** `enthesitis` (or in glossary table)  
**Effort:** 1 hour

**Key Content:**
- **Definition:** Inflammation of tendons/ligaments at bone attachment
- **Conditions:** Psoriatic arthritis, ankylosing spondylitis, spondyloarthritis
- **Symptoms:** Pain, swelling, stiffness
- **Treatment:** Physical therapy, anti-inflammatories, biologics
- **Internal links:** `/conditions/psoriatic-arthritis`, `/conditions/ankylosing-spondylitis`

---

### 🟡 MEDIUM: Priority 15 — Sarcopenia

**Slug:** `sarcopenia-muscle-loss-how-to-combat`  
**Effort:** 1-2 hours

**Key Sections:**
1. **What is sarcopenia?** (age-related muscle loss)
2. **Why it matters for arthritis** (mobility, strength, falls)
3. **Strength exercises** (resistance training, progressive)
4. **Nutrition** (protein requirements, nutrients)
5. **Balance & mobility** (tai chi, walking)
6. **Internal links:** `/guides/fall-prevention-older-adults`, `/blog/building-strength-resilience-exercise-frailty-prevention`, `/guides/balance-exercises`

---

## QUICK-WINS (Under 30 minutes each)

These articles likely have good content but need metadata polish:

| Priority | Slug | Current Content | Action | 
|----------|------|-----------------|--------|
| 11 | `glucosamine` (hardcoded, not DB) | Good | Audit only |
| 13 | `tens-machines-arthritis-uk` | Exists | Meta review |
| 16 | `building-strength-resilience-...` | Exists | Meta review |
| 24 | `walk-20-minutes` (daily tip) | Exists | Verify meta |

---

## Meta Title/Description Template

### Title Formula (58-65 chars max)
`[Topic]: [Benefit/Action] For Arthritis | Living With Arthritis UK`

**Example:** "Cycling With Arthritis: Benefits, Safety & Tips | Living With Arthritis UK"

### Description Formula (120-160 chars)
`[Action/Question]. [Key benefit]. [Key section topics]. [UK-specific or evidence]`

**Example:** "Discover how an anti-inflammatory diet helps arthritis. Mediterranean foods, recipes, evidence, and weight management strategies for UK patients."

---

## Medical Content Standards

### NEVER Include:
- ❌ Unsupported medical claims
- ❌ Fabricated statistics
- ❌ Invented credentials
- ❌ Prescription drug recommendations without caveat
- ❌ Diagnosis statements ("If you have...")

### ALWAYS Include:
- ✅ "Consult your GP if..." warning
- ✅ Named, verified reviewer (Maxwell: HCPC PH128483)
- ✅ "Please seek medical help if..." red flags
- ✅ Evidence sources (NICE, NHS, peer-reviewed)
- ✅ UK-specific context where relevant
- ✅ Review date

---

## Internal Linking Rules

**For each article, add links to:**

1. **Parent/Hub pages:**
   - `/conditions/osteoarthritis`
   - `/blog` (blog hub)
   - Relevant condition page

2. **Related content (3-5 links):**
   - Cross-linked articles on similar topics
   - Complementary health resources
   - Preventive measures

3. **External authority links (2-3):**
   - NHS pages (where applicable)
   - NICE guidance
   - Versus Arthritis

**Link Format:** Use `[anchor text](#)` in markdown; avoid over-linking

---

## Validation Checklist

Before publishing each article, verify:

- [ ] Title is unique (no duplicates in blog_articles table)
- [ ] H1 matches article intent
- [ ] Meta description is 120-160 characters
- [ ] Author/reviewer names match medical-authors.json
- [ ] No placeholder credentials
- [ ] Content is evidence-based
- [ ] Internal links are functional (test after deploy)
- [ ] No fabricated statistics
- [ ] Breadcrumbs are present
- [ ] Medical safety warnings included where needed

---

## Publishing Workflow

1. **Draft:** Update article in Supabase draft mode
2. **Review:** Check meta titles, descriptions, medical accuracy
3. **Link Check:** Test internal links work
4. **Publish:** Set `is_published = true`
5. **Test:** Visit `/blog/{slug}` on live site
6. **Verify:** Ensure article appears in `/blog` listing
7. **Submit to GSC:** (Optional) Request re-crawl if major content change

---

## Estimated Timeline

| Task | Effort | Priority | Sequence |
|------|--------|----------|----------|
| Priority 4 (Diet) | 3-4h | 🔴 Critical | #1 |
| Priority 5 (Pain) | 2-3h | 🟠 High | #2 |
| Priority 3 (Cycling) | 1-2h | 🟠 High | #3 |
| Priority 6 (Foods) | 1-2h | 🟡 Medium | #4 |
| Priority 10-15 | 1h each | 🟡 Medium | #5-10 |
| Quick-wins | 0.5h each | 🟡 Low | Parallel |

**Total:** ~20-25 hours over 2-3 weeks at 1-2 articles/week

---

## Questions?

Reference these documentation files:
- `PRIORITY-AUDIT.md` — Full 24-priority breakdown
- `SEO-REMEDIATION.md` — Technical SEO requirements
- `AUTHOR-REVIEWER-SYSTEM.md` — Author/reviewer system

---

**Document Version:** 1.0  
**Last Updated:** 2026-08-18  
**Status:** Ready for content team handoff
