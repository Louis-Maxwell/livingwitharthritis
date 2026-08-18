# SESSION 2 START GUIDE — PHASE 1 Quick Wins Round 2

**Start Date**: [Next Session]  
**Estimated Duration**: 2-3 hours  
**Goal**: Complete 5 protective quick-win audits (Priorities 7, 17-19, 24)

---

## 🎯 Objective

Execute 5 protective audits on high-ranking pages. These pages are already ranking well (positions 1-4), so the goal is **minimal changes, maximum protection**.

**All changes are protective** — no major rewrites, no URL changes, no risky modifications.

---

## 📋 Task Checklist

### **Priority 7: Gout** (0.5h)
**URL**: `/conditions/gout` | **Rank**: 7.8 | **Type**: Hardcoded React component

```
Quick Audit Checklist:
[ ] Open src/pages/conditions/Gout.tsx
[ ] Verify H1 tag (should be "Gout" or similar)
[ ] Check <title> tag in Helmet (50-60 chars, compelling)
[ ] Verify meta description (50-160 chars)
[ ] Ensure <MedicalReviewBadge /> is present and visible
[ ] Check breadcrumbs (PageBreadcrumb component)
[ ] Verify JSON-LD schema (MedicalWebPage in Helmet)
[ ] Look for internal links to: gout diet, gout treatment, gout medications
[ ] If links missing: Add 2-3 contextual links only (don't overdo)
[ ] No major rewrites or changes
```

**Commit Message When Done**:
```
PHASE 1: Priority 7 — Gout audit and protection
- Verified H1, title, meta description optimal
- Ensured medical review badge visible
- Checked breadcrumbs and schema
- [If changes made]: Added X contextual links
Position 7.8 protected.
```

---

### **Priority 17: Hip Exercises for Osteoarthritis** (0.5h)
**URL**: `/guides/hip-exercises-for-osteoarthritis` | **Rank**: ~1 🏆 GOLD | **Type**: Hardcoded React component

```
Protection Checklist (MINIMAL CHANGES ONLY):
[ ] Open src/guides/HipExercisesForOsteoarthritis.tsx (or similar name)
[ ] Verify H1 is optimal
[ ] Check title and meta description
[ ] Ensure reviewer credentials visible
[ ] Verify breadcrumbs present
[ ] Check internal links to:
    - Knee exercises
    - Shoulder exercises
    - General exercise hub
    - Osteoarthritis condition page
[ ] Verify JSON-LD schema
[ ] ⚠️ DO NOT CHANGE URL
[ ] ⚠️ DO NOT REWRITE CONTENT
[ ] ⚠️ MINIMAL CHANGES ONLY
```

**Commit Message When Done**:
```
PHASE 1: Priority 17 — Hip exercises audit and protection
- Verified optimal SEO metadata (title, meta, H1)
- Ensured reviewer credentials visible
- Checked internal linking structure
- Validated schema
Position ~1 (GOLD) protected. No major changes.
```

---

### **Priority 18: Shoulder Pain Relief** (0.5h)
**URL**: `/guides/shoulder-pain-relief` | **Rank**: ~3 | **Type**: Hardcoded React component

```
Quick Audit Checklist:
[ ] Open src/guides/ShoulderPainRelief.tsx (or similar)
[ ] Verify H1, title, meta description
[ ] Check reviewer badge visible
[ ] Ensure breadcrumbs present
[ ] Look for obvious linking gaps
[ ] Verify schema (MedicalWebPage)
[ ] Minimal tweaks only (no content rewrite)
[ ] Add 1-2 contextual links if obviously missing
```

**Commit Message When Done**:
```
PHASE 1: Priority 18 — Shoulder pain audit and protection
- Verified metadata optimal
- Ensured reviewer info visible
- Checked schema and breadcrumbs
- [If changes]: Added X contextual links
Position ~3 protected.
```

---

### **Priority 19: Paracetamol vs Ibuprofen** (0.5h)
**URL**: `/guides/paracetamol-vs-ibuprofen-for-arthritis` | **Rank**: ~4 | **Type**: Hardcoded React component

```
Safety-First Audit Checklist:
[ ] Open src/guides/ParacetamolVsIbuprofen.tsx (or similar)
[ ] Check title, meta, H1 optimal
[ ] CRITICAL: Verify safety warnings present:
    [ ] Kidney disease contraindications
    [ ] GI bleeding/ulcer warnings
    [ ] Drug interaction mentions
    [ ] When NOT to use each drug
    [ ] Dosage guidance
[ ] Ensure medical reviewer badge visible
[ ] Check links to:
    - Arthritis medication guide
    - When to seek help
    - GP contact info if needed
[ ] Verify schema
[ ] NO promotional language
```

**Commit Message When Done**:
```
PHASE 1: Priority 19 — Paracetamol vs Ibuprofen safety audit
- Verified all safety warnings present
- Ensured proper contraindication info
- Checked reviewer credentials visible
- Validated schema and links
Position ~4 protected with safety-first review.
```

---

### **Priority 24: Walking (Daily Tip)** (0.5h)
**URL**: `/daily-tips/walk-20-minutes` | **Rank**: Good | **Type**: Daily tip component

```
Internal Linking Enhancement:
[ ] Open src/daily-tips/Walk20Minutes.tsx (or similar)
[ ] Verify H1 and title compelling
[ ] Add contextual internal links to:
    [ ] Exercise hub (/exercises)
    [ ] Cycling with arthritis (/blog/arthritis-and-cycling-uk)
    [ ] Knee exercises (/blog/knee-arthritis-exercises-uk)
    [ ] Hip exercises (/guides/hip-exercises-for-osteoarthritis)
    [ ] Osteoarthritis (/conditions/osteoarthritis)
[ ] Ensure medical info accurate
[ ] Check breadcrumbs if applicable
[ ] Verify schema
```

**Commit Message When Done**:
```
PHASE 1: Priority 24 — Walking tip internal linking enhancement
- Added 5 contextual links to related exercise and condition pages
- Verified medical info accurate
- Enhanced user navigation from tip to full resources
Good ranking protected with improved internal structure.
```

---

## 🔄 Execution Flow

### **Step 1: Open the Handoff Document**
```bash
cat PHASE1-QUICKWINS-REMAINING.md
```
This has detailed specs for each page.

### **Step 2: Work Through Each Priority in Order**
- Start with Priority 7 (easiest)
- Move to 17, 18, 19, 24 in sequence
- Spend ~0.5h per page

### **Step 3: Make Changes Locally**
- Use Edit tool to modify React components
- Test in dev server if possible
- Keep changes minimal and protective

### **Step 4: Git Workflow**

**Option A: Batch Commit (Recommended)**
```bash
git status  # See all 5 files modified
git add src/pages/conditions/Gout.tsx \
        src/guides/HipExercisesForOsteoarthritis.tsx \
        src/guides/ShoulderPainRelief.tsx \
        src/guides/ParacetamolVsIbuprofen.tsx \
        src/daily-tips/Walk20Minutes.tsx

git commit -m "PHASE 1: Quick-Win Protective Audits — Priorities 7, 17-19, 24

All 5 high-ranking pages audited and optimized:
- Priority 7 (Gout): Verified metadata, schema, links [detail]
- Priority 17 (Hip exercises): GOLD protection — minimal changes [detail]
- Priority 18 (Shoulder): Position ~3 — verified and protected [detail]
- Priority 19 (Paracetamol): Safety audit complete [detail]
- Priority 24 (Walking): Enhanced internal linking [detail]

All changes protective in nature (maintain rankings, minimal enhancement).
No URL changes. No radical rewrites.

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"

git push origin main
```

**Option B: Individual Commits**
```bash
# Commit each priority separately
# Then push all at once
git push origin main
```

### **Step 5: Deploy**
```bash
# Call Lovable deploy
mcp__claude_ai_lovable__deploy_project with project_id: 0b2fd6ca-4e21-4ac7-99fa-d741e996f45e
```

### **Step 6: Verify**
```bash
# Check preview URL while build is pending
https://id-preview--0b2fd6ca-4e21-4ac7-99fa-d741e996f45e.lovable.app
```

---

## 🎯 Success Criteria

When all 5 are complete:

- ✅ All 5 pages have optimal meta titles
- ✅ All 5 pages have compelling meta descriptions  
- ✅ All 5 pages have exactly one H1
- ✅ All medical reviewer badges present and visible
- ✅ All breadcrumbs present
- ✅ All JSON-LD schemas valid
- ✅ No broken internal links introduced
- ✅ No ranking-harming changes made
- ✅ Git commit clean and descriptive
- ✅ Deployed to production

---

## 📁 File Locations to Search

If component file names differ from what's listed, use these search patterns:

```bash
# Find Gout component
grep -r "const Gout" src/pages/

# Find Hip exercises component
grep -r "Hip.*[Oo]steoarthritis\|hip.*exercise" src/ --include="*.tsx"

# Find Shoulder component
grep -r "Shoulder.*[Pp]ain\|shoulder" src/pages/ --include="*.tsx"

# Find Paracetamol vs Ibuprofen
grep -r "paracetamol\|ibuprofen" src/ --include="*.tsx" | grep -i guide

# Find Walking daily tip
grep -r "walk.*20\|daily.*tip" src/ --include="*.tsx"
```

---

## 💡 Quick Tips

**What to Look For**:
- Missing `<MedicalReviewBadge />` → Add it
- Broken internal links → Fix them
- Missing breadcrumbs → Add `<PageBreadcrumb />`
- No schema → Verify `<Helmet>` has `<script type="application/ld+json">`
- Weak SEO title → Improve it (50-60 chars, compelling, searchable)

**What NOT to Change**:
- URLs (never change these)
- Content structure (keep existing sections)
- Page type/component (don't refactor)
- Design or layout (only content/metadata)
- Medical claims (only add safety info if missing)

**Common Patterns You'll See**:
- `<Helmet>` for SEO metadata
- `<MedicalReviewBadge />` for reviewer info
- `<PageBreadcrumb />` for breadcrumbs
- JSON-LD schema in `<script>` tags
- `<Link to="..." />` for internal links

---

## 🚀 What Comes After

Once all 5 quick wins are complete:

| Phase | Work | Effort | Owner |
|-------|------|--------|-------|
| **PHASE 2** | Hosting-layer 301 redirects + 404 status codes | 4-6h | DevOps |
| **PHASE 3** | Database article optimizations (anti-inflammatory diet, pain management, etc.) | 20-25h | Content Team |
| **PHASES 4-9** | Topic clusters, performance, accessibility, regression testing | 30-40h | You + Team |

---

## 📞 If You Get Stuck

**Common Issues**:
- Can't find component file → Use grep commands above
- Not sure if link is correct → Test it in dev server (`npm run dev`)
- Unsure about wording → Keep it simple and searchable
- Need to verify schema → Use Schema.org validator

**Remember**: These are protective audits. Minimal changes. The goal is to keep these pages ranking well while moving forward with larger priorities.

---

## 🎬 When Ready to Start

1. Review this document ✅
2. Open terminal and run: `git log --oneline | head -5` (verify you're at latest commit)
3. Start with Priority 7 audit
4. Work through the checklist
5. Make minimal changes only
6. Commit when all 5 complete
7. Deploy
8. Update memory when done
9. Move to PHASE 2 or 3

**Estimated Session Duration**: 2-3 hours including commits/deployment

Good luck! 🚀

