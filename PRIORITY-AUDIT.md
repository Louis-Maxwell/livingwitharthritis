# Living With Arthritis — Priority 1-24 Audit
**Date:** 2026-08-18  
**Status:** Phase 3 Content Enhancement  
**Owner:** Technical SEO + Content Team

---

## Executive Summary

All 24 priorities from master prompt mapped to actual content. Key findings:
- **3 critical redirects needed:** Knee exercise consolidation (verified in Phase 1)
- **12 database articles** needing meta optimization (title, description, content)
- **7 hardcoded pages** ready for SEO enhancement
- **2 missing pages** that may need creation or slug reconciliation
- **Quick wins identified:** 4 pages currently #1-6 position needing minor tweaks

---

## PRIORITY 1-24 MAPPING TABLE

### PRIORITY 1: Knee Exercise Consolidation ⭐ CRITICAL

| Item | URL | Type | Status | GSC Data | Action |
|------|-----|------|--------|----------|--------|
| Master | `/blog/knee-arthritis-exercises-uk` | Redirect target | **Missing** | 934 impr, pos 42.5 | Create 301 in hosting layer (Phase 2) |
| Source 1 | `/blog/knee-osteoarthritis-exercises` | Hardcoded component | ✅ Exists | 241 impr, pos 35.8 | **DONE** — Optimized in Phase 1 |
| Source 2 | `/blog/knee-exercises-arthritis` | Redirect source | **Missing** | 200 impr, pos 24.0 | Create 301 in hosting layer (Phase 2) |
| Alt | `/blog/knee-exercises-for-arthritis` | Database article | ✅ In DB | Unknown | Consider: redirect or consolidate |

**Status:** Phase 1 complete (code level). Phase 2 needed (hosting level 301s).

---

### PRIORITY 2: Osteoarthritis Authority Hub ⭐ HIGH VALUE

| Item | URL | Type | Status | GSC Data | Keywords |
|------|-----|------|--------|----------|----------|
| Main | `/conditions/osteoarthritis` | Hardcoded component | ✅ Exists | ~107 impr, pos 2.31 | osteoarthritis, treatment, symptoms |

**Action:** ✅ QUICK WIN — Already high-ranking. Audit & optimize:
- [ ] Verify H1 is "Osteoarthritis" or better
- [ ] Check meta description length (50-160 chars)
- [ ] Ensure internal links to: knee OA, hip OA, hand OA, exercises, treatment, medication, diet, supplements
- [ ] Add schema: MedicalWebPage + FAQPage if applicable
- [ ] Verify breadcrumbs
- [ ] Check for missing sections: symptoms, treatment, exercises, diet, UK-specific resources

**Estimated Effort:** 1-2 hours (code review + enhancements)

---

### PRIORITY 3: Cycling with Arthritis

| Item | URL | Type | Status | GSC Data |
|------|-----|------|--------|----------|
| Main | `/blog/arthritis-and-cycling-uk` | Database article | ✅ In DB | 84 impr, pos 6.57 |

**Target Keywords:** cycling with arthritis, cycling and arthritis, is cycling good for arthritis, cycling with knee arthritis, cycling with osteoarthritis, exercise bike for arthritis

**Current:** Position 6.57 — Goal: Top 3

**Action Required:** Database article meta optimization
- [ ] Title: "Cycling With Arthritis: Benefits, Safety & Tips | Living With Arthritis UK"
- [ ] Meta: Evidence-based benefits, safety precautions, exercise bike mention
- [ ] Content: Safety, bike setup, progression, low-impact benefits
- [ ] Internal links: to knee exercises, hip exercises, exercise hub, cycling guide if exists

**Change Type:** Supabase `blog_articles` table update (meta_title, meta_description, content)

**Estimated Effort:** 30 mins editing + review

---

### PRIORITY 4: Anti-Inflammatory Diet Rebuild

| Item | URL | Type | Status | GSC Data |
|------|-----|------|--------|----------|
| Main | `/blog/anti-inflammatory-diet` | Database article | ✅ In DB | 272 impr, pos 44.89 |
| Related | `/blog/anti-inflammatory-diet-rheumatoid-arthritis` | Database article | ✅ In DB | Unknown |
| Foods | `/diet/foods-to-avoid-with-arthritis` | Database article | ✅ In DB | Unknown |

**Target Keywords:** anti-inflammatory diet for arthritis, arthritis diet UK, best diet for arthritis, Mediterranean diet arthritis

**Current:** Position 44.89 — Goal: Top 3

**Critical Issue:** Position 44.89 suggests poor content match or weak metadata. Likely needs comprehensive rebuild.

**Action Required:** Major content rebuild
- [ ] Title: "Anti-Inflammatory Diet for Arthritis: Mediterranean Recipes & Evidence | Living With Arthritis UK"
- [ ] Meta: Mediterranean diet, foods to eat/avoid, weight management, evidence-based
- [ ] Content sections:
  - Definition of anti-inflammatory diet
  - Evidence for effectiveness
  - Mediterranean diet (primary)
  - Foods to eat (with evidence)
  - Foods to limit
  - Weight management
  - Supplements (glucosamine, omega-3, turmeric)
  - Condition-specific considerations
  - References/sources
- [ ] Internal links: to foods-to-avoid, Mediterranean diet page, supplements, conditions
- [ ] Schema: Article + FAQPage if Q&A present

**Change Type:** Supabase rebuild + possibly new/expanded content

**Estimated Effort:** 2-3 hours content creation/editing

---

### PRIORITY 5: Arthritis Pain Management

| Item | URL | Type | Status |
|------|-----|------|--------|
| Main | `/blog/arthritis-pain-management` | Database article | ✅ In DB |

**Target Keywords:** arthritis pain management, arthritis pain relief, how to manage arthritis pain, UK context

**Sections to Build:**
- Movement/exercise as pain management
- Heat/cold therapy
- Physiotherapy
- Medication (paracetamol, NSAIDs, topicals)
- Pacing techniques
- Sleep improvement
- Flare-up management
- When to seek medical help
- NHS services

**Change Type:** Supabase content optimization + expansion

**Estimated Effort:** 2-3 hours

---

### PRIORITY 6: Foods to Avoid with Arthritis

| Item | URL | Type | Status |
|------|-----|------|--------|
| Main | `/diet/foods-to-avoid-with-arthritis` | Database article | ✅ In DB |

**Action:** Evidence-based language, no unsupported claims

**Change Type:** Supabase content review + metadata

---

### PRIORITY 7: Gout ⭐ PROTECT

| Item | URL | Type | Status | GSC Data |
|------|-----|------|--------|----------|
| Main | `/conditions/gout` | Hardcoded component | ✅ Exists | ~25 impr, pos 7.8 |

**Action:** PROTECT — Don't change unnecessarily. Minor tweaks only:
- [ ] Verify H1, title, meta are optimal
- [ ] Check internal links (gout diet, gout treatment, when to see GP)
- [ ] Ensure breadcrumbs
- [ ] Verify schema

**Estimated Effort:** 30 mins audit only

---

### PRIORITY 8: Polymyalgia Rheumatica Treatment

| Item | URL | Type | Status |
|------|-----|------|--------|
| Main | `/conditions/polymyalgia-rheumatica/treatment` | Subpage | ✅ Likely exists |

**YMYL Content Requirements:**
- [ ] Named medical reviewer (full name, credentials, registration)
- [ ] Review date displayed
- [ ] Treatment options (steroids, monitoring, tapering)
- [ ] Safety information
- [ ] Red flags/when to seek help
- [ ] NHS links
- [ ] Evidence-based language

**Change Type:** Code + Supabase

---

### PRIORITY 9: Tai Chi for Arthritis ⭐ QUICK WIN

| Item | URL | Type | Status | GSC Data |
|------|-----|------|--------|----------|
| Main | `/exercises/tai-chi-for-arthritis` | Hardcoded component | ✅ Exists | Unknown |

**Target Keywords:** tai chi for arthritis, tai chi arthritis, tai chi for joint pain, tai chi for older adults, tai chi for balance, tai chi rheumatoid arthritis

**Sections:**
- Beginner guidance
- Safety
- Balance benefits
- OA-specific modifications
- RA-specific modifications
- Evidence (peer-reviewed)
- Practical routine with steps
- Video support (if available)
- Printable routine

**Change Type:** Code enhancement

---

### PRIORITY 10: Joint Replacement Surgery

| Item | URL | Type | Status |
|------|-----|------|--------|
| Main | `/blog/joint-replacement-surgery` | Database article | ✅ In DB |

**Title:** "Joint Replacement for Arthritis: When Is Surgery Considered?"

**Supporting Pages Needed:**
- `/guides/knee-replacement-surgery` — Already exists ✅
- Consider: `/guides/hip-replacement-surgery`, `/guides/recovery-after-joint-replacement`

**Change Type:** Supabase optimization + possibly new guide pages

---

### PRIORITY 11: Supplements — Glucosamine

| Item | URL | Type | Status |
|------|-----|------|--------|
| Main | `/supplements/glucosamine` | Hardcoded component | ✅ Exists |

**Requirements:**
- [ ] Rigorous evidence-based language
- [ ] Evidence section (clarity on strength of evidence)
- [ ] Uncertainty clearly labeled
- [ ] Safety section
- [ ] Drug interactions
- [ ] Who should avoid
- [ ] Alternatives listed
- [ ] No promotional medical claims

**Change Type:** Code review + content accuracy

---

### PRIORITY 12: Medication Guide Hub

| Item | URL | Type | Status |
|------|-----|------|--------|
| Main | `/blog/arthritis-medication-guide` | Database article | ✅ In DB |

**Hub Links to:**
- NSAIDs, Paracetamol, Steroids, DMARDs, Biologics, Topical treatments
- Related pages likely exist but need linking

**Change Type:** Supabase content + internal linking structure

---

### PRIORITY 13: TENS Machines

| Item | URL | Type | Status |
|------|-----|------|--------|
| Main | `/blog/tens-machines-arthritis-uk` | Database article | ✅ In DB |

**Content:** Evidence, how it works, safety, pacemaker contraindications, usage, when to stop

**Change Type:** Supabase review

---

### PRIORITY 14: Enthesitis

| Item | URL | Type | Status |
|------|-----|------|--------|
| Main | `/glossary/enthesitis` | Glossary term | ✅ Likely exists |

**Links to:** Psoriatic arthritis, ankylosing spondylitis, spondyloarthritis

**Change Type:** Code linking + glossary content review

---

### PRIORITY 15: Sarcopenia

| Item | URL | Type | Status |
|------|-----|------|--------|
| Main | `/blog/sarcopenia-muscle-loss-how-to-combat` | Database article | ✅ In DB |

**Connection:** Links to falls, strength, balance, mobility, frailty

**Change Type:** Supabase content + internal linking

---

### PRIORITY 16: Building Strength & Frailty

| Item | URL | Type | Status |
|------|-----|------|--------|
| Main | `/blog/building-strength-resilience-exercise-frailty-prevention` | Database article | ✅ In DB |

**Target:** Protect existing ranking (already good position per master prompt)

**Change Type:** Audit only (Phase 3 Task 8)

---

### PRIORITY 17: Hip Exercises for OA ⭐ PROTECT

| Item | URL | Type | Status | GSC Data |
|------|-----|------|--------|----------|
| Main | `/guides/hip-exercises-for-osteoarthritis` | Hardcoded component | ✅ Exists | Pos ~1 (GOLD) |

**CRITICAL:** Do not change URL. Do not radically rewrite.

**Only Optimize:**
- [ ] Internal links to: knee exercises, shoulder, general exercise
- [ ] Reviewer information (if not present)
- [ ] References/sources
- [ ] Title/meta if genuinely low-CTR (but be cautious)
- [ ] Related exercise links

**Change Type:** Code review + minimal enhancement

---

### PRIORITY 18: Shoulder Pain Relief ⭐ PROTECT

| Item | URL | Type | Status | GSC Data |
|------|-----|------|--------|----------|
| Main | `/guides/shoulder-pain-relief` | Hardcoded component | ✅ Exists | Pos ~3 |

**Action:** Similar to Priority 17 — protect ranking, minor tweaks only.

**Change Type:** Code review + minimal enhancement

---

### PRIORITY 19: Paracetamol vs Ibuprofen ⭐ PROTECT

| Item | URL | Type | Status | GSC Data |
|------|-----|------|--------|----------|
| Main | `/guides/paracetamol-vs-ibuprofen-for-arthritis` | Hardcoded component | ✅ Exists | Pos ~4 |

**Action:** Protect. Ensure safety/contraindication information is clear.

**Change Type:** Code review + safety audit

---

### PRIORITY 20: Psoriatic Arthritis

| Item | URL | Type | Status |
|------|-----|------|--------|
| Main | `/conditions/psoriatic-arthritis` | Hardcoded component | ✅ Exists |

**Supporting Pages Needed:**
- Symptoms, Treatment, Exercise, Fatigue, Enthesitis, Diet, Mental health

**Check:** Internal linking to these sub-topics

**Change Type:** Code review + linking structure

---

### PRIORITY 21: Rheumatoid Arthritis

| Item | URL | Type | Status |
|------|-----|------|--------|
| Main | `/conditions/rheumatoid-arthritis` | Hardcoded component | ✅ Exists |

**Target Keywords:** rheumatoid arthritis, symptoms, treatment, exercises, UK context

**Action:** Build as major condition hub

**Change Type:** Code enhancement

---

### PRIORITY 22: Mental Health & Arthritis

| Item | URL | Type | Status |
|------|-----|------|--------|
| Main | `/arthritis-mental-health` | Hardcoded component | ✅ Exists (per routes) |

**Content:** Pain, fatigue, sleep, isolation, anxiety, depression, support, professional help

**Important:** Do not diagnose. Link to professional help.

**Change Type:** Code review + content verification

---

### PRIORITY 23: Morning Stretches ⭐ UPGRADE

| Item | URL | Type | Status |
|------|-----|------|--------|
| Current | `/daily-tips/morning-stretches` | Short tip | ✅ Exists |
| Goal | Upgrade to full article | Full guide | Plan | - |

**New Title:** "Morning Stretches for Arthritis: A Gentle 10-Minute Routine"

**Target Keywords:** morning stretches arthritis, morning exercises arthritis, arthritis morning stiffness exercises, stretches for stiff joints

**Action:** Upgrade from short tip to comprehensive guide with:
- Routine steps
- Safety
- Modifications
- Evidence
- Printable routine
- Video support if possible

**Change Type:** Code enhancement or new component

---

### PRIORITY 24: Walking ⭐ PROTECT + MINOR TWEAKS

| Item | URL | Type | Status | GSC Data |
|------|-----|------|--------|----------|
| Main | `/daily-tips/walk-20-minutes` | Daily tip | ✅ Exists | Good ranking |

**Target Keywords:** walking with arthritis, walking for arthritis, is walking good for arthritis, walking osteoarthritis

**Action:** Protect ranking. Minor internal links:
- [ ] Exercise hub
- [ ] Cycling
- [ ] Knee exercises
- [ ] Hip exercises

**Change Type:** Code linking only

---

## EFFORT ESTIMATES & PRIORITY MATRIX

### By Change Type

**Quick Wins (0.5-1 hour each):**
- Priority 2: Osteoarthritis hub (audit + 2-3 enhancements)
- Priority 7: Gout (protect, audit only)
- Priority 17: Hip exercises (minimal tweaks)
- Priority 18: Shoulder pain (minimal tweaks)
- Priority 19: Paracetamol vs Ibuprofen (safety audit)
- Priority 24: Walking (internal links)

**Medium Effort (1-2 hours each):**
- Priority 3: Cycling (database meta + content)
- Priority 9: Tai Chi (code enhancement)
- Priority 11: Glucosamine (accuracy audit)
- Priority 16: Strength & Frailty (audit)
- Priority 20: Psoriatic arthritis (linking structure)
- Priority 21: Rheumatoid arthritis (code review)
- Priority 22: Mental health (content verification)

**Major Effort (2-4 hours each):**
- Priority 4: Anti-inflammatory diet (rebuild)
- Priority 5: Pain management (expansion)
- Priority 6: Foods to avoid (optimization)
- Priority 8: PMR treatment (YMYL compliance)
- Priority 10: Joint replacement (hub structure)
- Priority 12: Medication guide (hub structure)
- Priority 13: TENS (accuracy + linking)
- Priority 14: Enthesitis (glossary + linking)
- Priority 15: Sarcopenia (linking + optimization)
- Priority 23: Morning stretches (upgrade to full article)

### By Impact (GSC Data)

| Priority | Impressions | Current Position | Impact Level |
|----------|-------------|------------------|--------------|
| 1 (Knee) | 1,375 | 24-42.5 | 🔴 CRITICAL |
| 2 (OA) | ~107 | 2.31 | 🟠 HIGH - protect |
| 3 (Cycling) | 84 | 6.57 | 🟡 MEDIUM |
| 4 (Diet) | 272 | 44.89 | 🟡 MEDIUM - high vol |
| 7 (Gout) | ~25 | 7.8 | 🟡 MEDIUM |
| 17 (Hip) | Unknown | ~1 | 🟠 HIGH - protect |
| 18 (Shoulder) | Unknown | ~3 | 🟠 HIGH - protect |
| 19 (Paracetamol) | Unknown | ~4 | 🟠 HIGH - protect |

---

## RECOMMENDED EXECUTION ORDER (Phase 3)

### Round 1: Quick Wins (2-3 hours)
1. Priority 2: Osteoarthritis (audit + optimize)
2. Priority 7: Gout (protect)
3. Priority 17: Hip exercises (protect)
4. Priority 18: Shoulder (protect)
5. Priority 19: Paracetamol (protect)
6. Priority 24: Walking (internal links)

### Round 2: Database Optimizations (Content team)
Send to content/editorial team for Supabase updates:
1. Priority 3: Cycling (title + meta)
2. Priority 4: Anti-inflammatory diet (major rebuild)
3. Priority 5: Pain management (expansion)
4. Priority 6: Foods to avoid (review)

### Round 3: Code Enhancements (2-4 hours)
1. Priority 9: Tai Chi (content enhancement)
2. Priority 11: Glucosamine (accuracy audit)
3. Priority 23: Morning stretches (upgrade)

### Round 4: YMYL/Specialist
1. Priority 8: PMR treatment (medical review compliance)
2. Priority 10-12: Hub structures (navigation)
3. Priority 14-15: Linking structures

---

## Summary Table: All 24 Priorities

| P | Title | URL | Type | Status | GSC | Action | Effort |
|---|-------|-----|------|--------|-----|--------|--------|
| 1 | Knee Exercises | `/blog/knee-*` | Redirect | Partial | 1375 | 301 redirect (hosting) | - |
| 2 | Osteoarthritis | `/conditions/osteoarthritis` | Code | ✅ | 107 | Optimize | 1h |
| 3 | Cycling | `/blog/arthritis-and-cycling-uk` | DB | ✅ | 84 | Meta + content | 1h |
| 4 | Anti-inflammatory Diet | `/blog/anti-inflammatory-diet` | DB | ✅ | 272 | Major rebuild | 3h |
| 5 | Pain Management | `/blog/arthritis-pain-management` | DB | ✅ | - | Expand | 2h |
| 6 | Foods to Avoid | `/diet/foods-to-avoid-with-arthritis` | DB | ✅ | - | Review | 1h |
| 7 | Gout | `/conditions/gout` | Code | ✅ | 25 | Protect | 0.5h |
| 8 | PMR Treatment | `/conditions/polymyalgia-rheumatica/treatment` | Code/DB | ✅ | - | YMYL review | 2h |
| 9 | Tai Chi | `/exercises/tai-chi-for-arthritis` | Code | ✅ | - | Enhance | 1.5h |
| 10 | Joint Replacement | `/blog/joint-replacement-surgery` | DB | ✅ | - | Hub structure | 2h |
| 11 | Glucosamine | `/supplements/glucosamine` | Code | ✅ | - | Audit | 1h |
| 12 | Medication Guide | `/blog/arthritis-medication-guide` | DB | ✅ | - | Hub structure | 2h |
| 13 | TENS | `/blog/tens-machines-arthritis-uk` | DB | ✅ | - | Optimize | 1h |
| 14 | Enthesitis | `/glossary/enthesitis` | Code/DB | ✅ | - | Linking | 1h |
| 15 | Sarcopenia | `/blog/sarcopenia-muscle-loss-how-to-combat` | DB | ✅ | - | Linking | 1h |
| 16 | Strength | `/blog/building-strength-resilience-exercise-frailty-prevention` | DB | ✅ | - | Audit | 0.5h |
| 17 | Hip Exercises | `/guides/hip-exercises-for-osteoarthritis` | Code | ✅ | Pos 1 | Protect | 0.5h |
| 18 | Shoulder | `/guides/shoulder-pain-relief` | Code | ✅ | Pos 3 | Protect | 0.5h |
| 19 | Paracetamol vs Ibuprofen | `/guides/paracetamol-vs-ibuprofen-for-arthritis` | Code | ✅ | Pos 4 | Protect | 0.5h |
| 20 | Psoriatic Arthritis | `/conditions/psoriatic-arthritis` | Code | ✅ | - | Linking | 1h |
| 21 | Rheumatoid Arthritis | `/conditions/rheumatoid-arthritis` | Code | ✅ | - | Hub | 2h |
| 22 | Mental Health | `/arthritis-mental-health` | Code | ✅ | - | Verify | 1h |
| 23 | Morning Stretches | `/daily-tips/morning-stretches` | Code | ✅ | - | Upgrade | 2h |
| 24 | Walking | `/daily-tips/walk-20-minutes` | Code | ✅ | Good | Links | 0.5h |

**Total Effort:** ~35-40 hours across:
- Code enhancements: ~15-18 hours
- Database optimizations (content team): ~10-12 hours
- Audits/reviews: ~8-10 hours

---

## Next Steps

### Immediate (This Session)
1. ✅ Complete Task 6 (this document)
2. Start Task 7: Build author/reviewer profile system
3. Start Task 8: Optimize high-priority hardcoded pages (Quick Wins)
4. Document Task 9 recommendations for content team

### For Content Team (Supabase)
Send Priority 3-6, 10-15 list with meta recommendations

### For Phase 2 (Hosting)
Implement 301 redirects per SEO-REMEDIATION.md

---

**Document Version:** 1.0  
**Last Updated:** 2026-08-18  
**Status:** Ready for Phase 3 execution
