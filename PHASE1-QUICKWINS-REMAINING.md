# PHASE 1: QUICK WINS — REMAINING (Session 2)

**Status**: Ready to execute  
**Estimated Time**: 2-3 hours  
**Priority**: All 5 are protective (protect high rankings, minimal changes)

---

## Quick-Win Pages Remaining

All 5 remaining quick wins are **protective in nature** — they're already ranking well (positions 1-4), so the goal is to ensure they stay there with minor optimizations.

### **Priority 7: Gout** ⭐ PROTECT
- **URL**: `/conditions/gout`
- **Current Rank**: Position 7.8 (~25 GSC impressions)
- **Type**: Hardcoded React component
- **Task**: Minimal audit (0.5h)
  - [ ] Verify H1 = "Gout" (or equivalent)
  - [ ] Check title is optimal for CTR
  - [ ] Verify meta description is compelling
  - [ ] Ensure breadcrumbs are present
  - [ ] Check medical reviewer badge
  - [ ] Verify internal links to gout diet, gout treatment (if applicable)
  - [ ] Validate JSON-LD schema (MedicalWebPage)
  - [ ] **No major rewrites**

**Expected Change**: None (protective only)

---

### **Priority 17: Hip Exercises for Osteoarthritis** 🏆 GOLD
- **URL**: `/guides/hip-exercises-for-osteoarthritis`
- **Current Rank**: Position ~1 (GOLD)
- **Type**: Hardcoded React component
- **Task**: Minimal audit (0.5h)
  - [ ] Verify H1 and title are optimal
  - [ ] Check meta description length (50-160 chars)
  - [ ] Ensure medical reviewer info is prominent
  - [ ] Verify internal links to:
     - Knee exercises
     - Shoulder exercises
     - General exercise hub
     - Osteoarthritis condition page
  - [ ] Check breadcrumbs
  - [ ] Validate schema
  - [ ] **NO URL CHANGES. NO RADICAL REWRITES.**

**Expected Change**: Minimal (maintain current dominance)

---

### **Priority 18: Shoulder Pain Relief** 🥉 HIGH
- **URL**: `/guides/shoulder-pain-relief`
- **Current Rank**: Position ~3
- **Type**: Hardcoded React component
- **Task**: Minimal audit (0.5h)
  - [ ] Verify title and meta are optimal
  - [ ] Check reviewer credentials visible
  - [ ] Verify breadcrumbs present
  - [ ] Check for obvious internal linking gaps
  - [ ] Validate schema
  - [ ] Minimal tweaks only (no rewrite)

**Expected Change**: None to minimal (protect current ranking)

---

### **Priority 19: Paracetamol vs Ibuprofen for Arthritis** 🥈 HIGH
- **URL**: `/guides/paracetamol-vs-ibuprofen-for-arthritis`
- **Current Rank**: Position ~4
- **Type**: Hardcoded React component
- **Task**: Safety audit (0.5h)
  - [ ] Verify safety/contraindication information is clear
  - [ ] Check for:
     - Kidney disease warnings
     - GI bleeding risks
     - Drug interactions mentioned
     - When NOT to use each drug
  - [ ] Ensure medical reviewer badge is prominent
  - [ ] Verify links to:
     - Arthritis medication guide
     - NSAIDs info (if separate page)
     - When to seek help
  - [ ] Validate schema
  - [ ] **Safety-first review (no marketing language)**

**Expected Change**: Possibly add missing safety info if identified; otherwise protect

---

### **Priority 24: Walking (Daily Tip)** 👟 GOOD RANKING
- **URL**: `/daily-tips/walk-20-minutes`
- **Current Rank**: Good ranking (exact position unknown)
- **Type**: Daily tip component
- **Task**: Add internal links (0.5h)
  - [ ] Verify H1 and title are compelling
  - [ ] Add contextual links to:
     - Exercise hub
     - Cycling with arthritis
     - Knee exercises
     - Hip exercises
     - Osteoarthritis condition page
  - [ ] Ensure medical info is accurate
  - [ ] Check breadcrumbs if applicable
  - [ ] Validate schema

**Expected Change**: Strengthen internal linking (minor content enhancement)

---

## Execution Strategy

### Session 2 Approach
1. **Start with the quickest audits** (Priority 7, 17, 18, 19 — inspection only, 2-3 mins each)
2. **Identify any gaps** (safety warnings, missing reviewer info, etc.)
3. **Make minimal fixes** (add missing reviewer badge, safety warnings, internal links)
4. **Priority 24 last** (add internal links to strengthen the tip)
5. **Batch commit** all 5 updates together

### What NOT to Do
- ❌ Don't rewrite entire pages
- ❌ Don't change URLs
- ❌ Don't add promotional language
- ❌ Don't remove working content
- ❌ Don't alter the ranking-successful structure

### What TO Do
- ✅ Add missing reviewer credentials if visible elsewhere on site
- ✅ Add safety warnings if they're missing
- ✅ Ensure breadcrumbs are present
- ✅ Add contextual internal links where relevant
- ✅ Fix broken links if found
- ✅ Validate schema

---

## Commit Strategy for Session 2

Single commit for all 5 updates:
```
PHASE 1: Quick-Win Protective Audits — Priorities 7, 17-19, 24

All 5 high-ranking pages audited and minimally enhanced:
- Priority 7 (Gout): Verified optimal metadata, schema, links
- Priority 17 (Hip exercises): GOLD protection — minimal changes, strong links
- Priority 18 (Shoulder): Position ~3 — verified and protected
- Priority 19 (Paracetamol): Safety audit — enhanced contraindication info
- Priority 24 (Walking): Added contextual internal links

All changes are protective in nature — maintain current rankings while
ensuring optimal metadata, schema, and internal linking structure.

No URL changes. No radical rewrites. Minimal enhancement only.
```

---

## After Quick Wins Complete

| Next Phase | Timeline | Effort |
|-----------|----------|--------|
| **PHASE 2** | Parallel work | 4-6h (DevOps: hosting redirects + 404s) |
| **PHASE 3** | Parallel work | 20-25h (Content team: database articles) |
| **PHASE 4-9** | Sequential | 30-40h (clusters, performance, testing) |

**Estimated Total**: 4-6 weeks with parallel execution

---

## Quick Reference: File Locations

```
Priority 7 (Gout):
  src/pages/conditions/Gout.tsx

Priority 17 (Hip exercises):
  src/guides/HipExercisesForOsteoarthritis.tsx
  (or similar path — search codebase)

Priority 18 (Shoulder):
  src/guides/ShoulderPainRelief.tsx
  (or similar path — search codebase)

Priority 19 (Paracetamol vs Ibuprofen):
  src/guides/ParacetamolVsIbuprofen.tsx
  (or similar path — search codebase)

Priority 24 (Walking):
  src/daily-tips/Walk20Minutes.tsx
  (or similar path — search codebase)
```

---

## Success Criteria (Session 2)

When all 5 are complete:

- [ ] All pages have optimal meta titles (50-60 chars)
- [ ] All pages have compelling meta descriptions (150-160 chars)
- [ ] All pages have appropriate H1 (exactly one per page)
- [ ] All pages have valid medical review badges (if applicable)
- [ ] All pages have breadcrumbs
- [ ] All pages have valid JSON-LD schema
- [ ] No broken internal links
- [ ] No ranking-harming changes made
- [ ] Git commit clean and descriptive
- [ ] Deployed to production

Once complete, you'll have:
- ✅ Knee exercises consolidated (Priority 1)
- ✅ Osteoarthritis hub enhanced (Priority 2)
- ✅ All top-ranking pages protected (Priorities 7, 17-19, 24)
- 🎯 Ready to move to PHASE 2 (DevOps) and PHASE 3 (Content team)

