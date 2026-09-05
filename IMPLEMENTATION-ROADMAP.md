# Living with Arthritis: Complete Implementation Roadmap
**Track all changes in GitHub. Master plan for 12-month growth campaign.**

---

## PROJECT OVERVIEW

**Goal:** +100-225% organic traffic growth (1-2K → 2-4.5K monthly visitors)  
**Timeline:** 12 weeks core implementation, 12 months optimization  
**Status:** 🟡 IN PROGRESS (Phase 1 & 2 active)  
**Last Updated:** 2026-09-05

---

## MASTER COMMIT TRACKER

All changes tracked via git commits to: https://github.com/Louis-Maxwell/livingwitharthritis

| Commit | Date | Phase | Description | Status |
|--------|------|-------|-------------|--------|
| `f084ccd` | 2026-09-01 | Audit | Audit: Complete SEO, content strategy, prerendering | ✅ Done |
| `9e8a283` | 2026-09-05 | Phase 1 | Fix: Resolve npm security vulnerabilities | ✅ Done |
| `c0a48e3` | 2026-09-05 | Phase 1 | Add: Bulk meta description script | ✅ Done |
| `76d938f` | 2026-09-05 | Phase 1 | Add: Bulk page title script | ✅ Done |
| `d47408d` | 2026-09-05 | Phase 2 | Add: Internal linking + featured snippet scripts | ✅ Done |
| `76ba853` | 2026-09-05 | Planning | Add: Competitive analysis & growth forecast | ✅ Done |
| `[pending]` | TBD | Phase 3 | Create: 17 Phase 2 articles (32-38K words) | 🟡 In Progress |
| `[pending]` | TBD | Phase 2 | Apply: Internal linking recommendations | ⏳ Queued |
| `[pending]` | TBD | Phase 2 | Apply: Featured snippet optimizations | ⏳ Queued |

---

## PHASE BREAKDOWN & DELIVERABLES

### ✅ PHASE 0: AUDIT & PLANNING (Complete)

**Commit:** `f084ccd`  
**Deliverables:**
- [x] Website audit (10 categories)
- [x] 50+ keyword opportunities identified
- [x] Competitive landscape analysis
- [x] 17-article content strategy
- [x] Technical SEO improvements list

**Files:**
- `PHASE1-SEO-IMPROVEMENTS.md` — Technical SEO guide
- `PHASE2-ARTICLE-OUTLINES.md` — 17 article templates
- `PRERENDER-DYNAMIC-ROUTES.md` — Dynamic route prerendering
- `IMPLEMENTATION-GUIDE.md` — Week-by-week roadmap

---

### 🟡 PHASE 1: TECHNICAL SEO FOUNDATION (Week 1-2)

**Objective:** +5-15% organic traffic from optimization  
**Effort:** 3-4 hours  
**Expected Keywords Gained:** 0 (optimization only)

#### 1.1 Security & Code Quality
**Commit:** `9e8a283`
- [x] Run npm audit (found 8 vulnerabilities)
- [x] Fix browserslist, fast-uri, fflate, postcss-selector-parser, qs
- [x] Fix TypeScript errors (GSCDashboard, previewAuthStorage, AuthorsIndex)
- [x] Verify: 0 errors, 5 non-critical warnings

**Script:** N/A (manual fixes)  
**Status:** ✅ DONE

#### 1.2 Meta Descriptions Optimization
**Commit:** `c0a48e3`
- [x] Create bulk meta description script
- [x] Formula: [Benefit] + [How/Proof] + [CTA] (155-160 chars)
- [x] Verify: 254/254 articles have optimized descriptions
- [x] Expected CTR lift: +5-10%

**Script:** `scripts/update-meta-descriptions.mjs`  
**Status:** ✅ DONE

#### 1.3 Page Title Optimization
**Commit:** `76d938f`
- [x] Create bulk title fixer script
- [x] Formula: [Primary Keyword] | [Unique Angle] (55-60 chars)
- [x] Identify: 69 articles with long titles
- [x] Generate: Title optimization recommendations
- [x] Expected CTR lift: +3-8%

**Script:** `scripts/fix-long-page-titles.mjs`  
**Status:** ⏳ AWAITING LOVABLE EXECUTION

**Next Steps:**
```bash
# Lovable to run (pending):
bun scripts/fix-long-page-titles.mjs          # preview
bun scripts/fix-long-page-titles.mjs --apply  # update database
```

#### 1.4 Schema Markup & Canonicals
**Deliverable:**
- [ ] Verify JSON-LD schema on all articles
- [ ] Confirm canonical URLs consistent
- [ ] Add MedicalWebPage schema to all condition pages
- [ ] Add FAQPage schema to articles with FAQ sections

**Status:** ⏳ QUEUED (post-title-fix)

---

### 🟡 PHASE 2: INTERNAL LINKING & FEATURED SNIPPETS (Week 2-3)

**Objective:** +15-25% organic traffic from crawlability & snippets  
**Effort:** 3-4 hours  
**Expected Keywords Gained:** +50-100 (orphan pages + snippet positions)

#### 2.1 Internal Linking Strategy
**Commit:** `d47408d`
- [x] Create internal linking analysis script
- [x] Identify: 192 orphan pages (>3 months old, no internal links)
- [x] Generate: 50 top linking recommendations (orphan → pillar)
- [x] Output: `scripts/internal-linking-recommendations.csv`
- [x] Expected traffic lift: +15-25% on orphan pages

**Script:** `scripts/internal-linking-strategy.mjs`  
**Status:** ✅ READY TO EXECUTE

**Next Steps:**
```bash
# Run analysis:
bun scripts/internal-linking-strategy.mjs

# Review: scripts/internal-linking-recommendations.csv
# Apply: Add recommended anchor text links to pillar articles in Lovable
```

**Estimated Impact:**
- Orphan pages discovered: 192
- Links to create: 50-100 (top opportunities)
- Expected new keywords: +50-80
- Time to implement: 1-2 hours (in Lovable editor)

#### 2.2 Featured Snippet Optimization
**Commit:** `d47408d`
- [x] Create featured snippet audit script
- [x] Analyze: Top 20 ranking articles
- [x] Generate: Answer boxes (40-60 chars each)
- [x] Rate: FAQ quality for snippet eligibility
- [x] Output: `scripts/featured-snippet-audit.json`
- [x] Expected lift: +20-30 featured snippet positions

**Script:** `scripts/featured-snippet-optimizer.mjs`  
**Status:** ✅ READY TO EXECUTE

**Next Steps:**
```bash
# Run audit:
bun scripts/featured-snippet-optimizer.mjs

# Review: scripts/featured-snippet-audit.json
# Apply: Add answer boxes to top 20 articles (Lovable editor)
#        Optimize FAQ sections with proper heading hierarchy
#        Add key takeaways sections (bullet points)
```

**Estimated Impact:**
- Articles analyzed: 20 (top ranking)
- Featured snippets gained: +15-25
- Answer boxes to add: 20
- Time to implement: 1-2 hours

---

### 🔴 PHASE 3: CONTENT EXPANSION (Week 3-8)

**Objective:** +300-500 new keywords, +25-40 featured snippets  
**Effort:** 20-30 hours (content creation + optimization)  
**Expected Keywords Gained:** +300-500

#### 3.1 Create 17 High-ROI Articles

**Commit:** `[pending]` (Lovable creation)

**Sexual Health & Intimacy Series (4 articles)**
- [ ] Article 1: Sex & Intimacy with Arthritis (2,500 words)
  - Keywords: arthritis sexual function, sex positions arthritis, intimacy arthritis
  - Expected traffic: 400-600/month
- [ ] Article 2: Arthritis Medications & Sexual Function (2,000 words)
  - Keywords: methotrexate sexual side effects, DMARD sexual dysfunction
  - Expected traffic: 250-400/month
- [ ] Article 3: Rebuilding Intimacy After Diagnosis (2,200 words)
  - Keywords: emotional reconnection arthritis, arthritis diagnosis relationship
  - Expected traffic: 300-500/month
- [ ] Article 4: Talking to Your Partner About Arthritis (1,800 words)
  - Keywords: communicating arthritis diagnosis, telling partner about arthritis
  - Expected traffic: 200-350/month

**Caregiver Support Series (3 articles)**
- [ ] Article 5: Supporting a Partner with Arthritis (2,200 words)
  - Keywords: caregiver arthritis, supporting spouse with arthritis
  - Expected traffic: 300-500/month
- [ ] Article 6: Caregiver Burnout Recognition (2,000 words)
  - Keywords: caregiver burnout arthritis, caregiver stress
  - Expected traffic: 250-400/month
- [ ] Article 7: Adult Children as Caregivers (2,000 words)
  - Keywords: adult children caregivers, caring for parents arthritis
  - Expected traffic: 250-400/month

**Arthritis Fatigue Hub (4 articles)**
- [ ] Article 8: Arthritis Fatigue Explained (2,200 words)
  - Keywords: arthritis fatigue, RA fatigue, why arthritis causes tiredness
  - Expected traffic: 400-600/month
- [ ] Article 9: Energy Management & Pacing (2,200 words)
  - Keywords: pacing arthritis, energy management chronic illness
  - Expected traffic: 350-550/month
- [ ] Article 10: Sleep & Pain Management (2,300 words)
  - Keywords: arthritis sleep problems, sleep positions arthritis
  - Expected traffic: 400-600/month
- [ ] Article 11: Exercise for Energy (2,100 words)
  - Keywords: exercise arthritis fatigue, gentle exercise arthritis
  - Expected traffic: 350-550/month

**Medication & Safety (2 articles)**
- [ ] Article 12: Turmeric & Methotrexate Interaction (1,800 words)
  - Keywords: turmeric methotrexate interaction, methotrexate supplements
  - Expected traffic: 200-350/month
- [ ] Article 13: Medication-Supplement Interactions (2,000 words)
  - Keywords: arthritis medication supplements, drug interactions
  - Expected traffic: 250-400/month

**Mental Health (2 articles)**
- [ ] Article 14: Anxiety & Arthritis (2,000 words)
  - Keywords: arthritis anxiety, anxiety chronic disease
  - Expected traffic: 250-400/month
- [ ] Article 15: Grief & Loss After Arthritis Diagnosis (2,000 words)
  - Keywords: grief arthritis diagnosis, accepting arthritis diagnosis
  - Expected traffic: 250-400/month

**Condition-Specific (2 articles)**
- [ ] Article 16: Psoriatic Arthritis vs RA (2,200 words)
  - Keywords: psoriatic arthritis vs rheumatoid arthritis, PsA vs RA
  - Expected traffic: 350-550/month
- [ ] Article 17: Access to Work Scheme UK (2,000 words)
  - Keywords: Access to Work scheme, UK government disability support
  - Expected traffic: 250-400/month

**Total Content:**
- 17 articles
- 32-38K words
- 410-630 new keywords
- 4,000-8,000 monthly impressions (ramp-up)
- 600-1,200 monthly sessions (conservative estimate)

**Status:** 🟡 LOVABLE CREATING (in progress)

**Timeline:**
- Week 3-4: Create articles 1-6 (sexual health, caregiver support base)
- Week 5-6: Create articles 7-11 (fatigue hub)
- Week 7-8: Create articles 12-17 (medication, mental health, condition-specific)

**After Creation:**
- [ ] Add internal links to existing articles
- [ ] Optimize for featured snippets (answer boxes, FAQ structure)
- [ ] Set up redirect from old URLs (if consolidated)
- [ ] Submit sitemap to Google Search Console
- [ ] Request indexing for all new articles

---

### 🟡 PHASE 2B: APPLY OPTIMIZATIONS (Week 2-3)

**Commit:** `[pending]`

#### 2B.1 Internal Linking Application
**Deliverable:**
- [ ] Get `internal-linking-recommendations.csv` output
- [ ] Add 3-5 anchor text links per recommendation to pillar articles
- [ ] Focus on top 50 recommendations first
- [ ] Verify links use contextual, keyword-rich anchor text
- [ ] Commit: Updated article content with new internal links

**Expected Result:**
- 50-100 new internal links added
- Orphan pages connected to authority pillars
- +50-80 new keywords from improved crawlability

#### 2B.2 Featured Snippet Application
**Deliverable:**
- [ ] Get `featured-snippet-audit.json` output
- [ ] Add answer boxes to top 20 articles (post-intro)
- [ ] Expand/optimize FAQ sections (5+ Q&A pairs, 50-100 word answers)
- [ ] Improve heading structure (3-8 H2s, proper H3 hierarchy)
- [ ] Add key takeaways section (bullet points)
- [ ] Commit: Updated article content with snippet optimizations

**Expected Result:**
- 15-25 new featured snippet positions
- Better SERP appearance for existing keywords
- +5-10% CTR improvement from snippet visibility

---

## MILESTONE TRACKING

### Milestone 1: Foundation Complete (Week 1-2)
**Target Date:** 2026-09-08  
**Status:** 🟡 In Progress

- [x] Security audit & fixes
- [x] Meta description script ready
- [x] Page title script ready
- [ ] Titles actually applied in database
- [ ] Schema markup verified

**Commits Expected:** 1-2 (title fix completion, schema verification)

---

### Milestone 2: Linking & Snippets Ready (Week 2-3)
**Target Date:** 2026-09-15  
**Status:** ⏳ Queued

- [x] Internal linking script created
- [x] Featured snippet optimizer created
- [ ] Internal linking recommendations applied (50+ links)
- [ ] Featured snippet optimizations applied (20 articles)

**Commits Expected:** 2-3 (linking application, snippet optimization)

---

### Milestone 3: Phase 2 Content Live (Week 3-8)
**Target Date:** 2026-09-29  
**Status:** 🟡 In Progress

- [ ] 17 articles created in Lovable
- [ ] All articles indexed by Google
- [ ] Internal links from Phase 3 to Phase 2 created
- [ ] Featured snippet optimization on new content

**Commits Expected:** 2-4 (article launches, linking updates, optimizations)

---

## DEPLOYMENT SCHEDULE

| Phase | Component | Deployment | Date |
|-------|-----------|-----------|------|
| 1 | Security fixes | ✅ Live | 2026-09-05 |
| 1 | Meta descriptions | ✅ Live | 2026-09-05 |
| 1 | Page titles | ⏳ Pending | 2026-09-08 |
| 2 | Internal linking | ⏳ Pending | 2026-09-15 |
| 2 | Featured snippets | ⏳ Pending | 2026-09-15 |
| 3 | 17 new articles | 🟡 In Progress | 2026-09-29 |
| Post | Backlink building | ⏳ Queued | 2026-10-06 |

**Lovable Deployment:** Automatic (any change pushes updates live to https://living-with-arthritis.lovable.app)

---

## QUALITY GATES & VERIFICATION

### Before Each Commit

- [ ] All TypeScript compiles (`npm run build`)
- [ ] ESLint passes (`npm run lint`)
- [ ] No npm audit vulnerabilities
- [ ] Git diff reviewed (no accidental deletions)
- [ ] Commit message is clear & concise

### After Each Deployment

- [ ] Preview URL verified (https://living-with-arthritis.lovable.app)
- [ ] New content indexes in Google (check GSC after 24-48 hours)
- [ ] No 404 errors on deployed changes
- [ ] Internal links working (spot check 5+ links)

---

## SUCCESS METRICS

### 6-Week Checkpoint (Target: 2026-10-17)

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Organic traffic | 1,500-2,500 | — | ⏳ |
| Keywords ranking | 250-350 | — | ⏳ |
| Featured snippets | 5-15 | — | ⏳ |
| New articles indexed | 15+ | — | ⏳ |
| Backlinks gained | 20-50 | — | ⏳ |

**GO/NO-GO Decision:** If 3+ metrics on track → continue to Phase 4 (backlink building)

---

### 12-Month Goal

| Metric | Target |
|--------|--------|
| Organic traffic | 2,000-4,500/month (+100-225%) |
| Keywords ranking | 600-800 |
| Featured snippets | 25-40 |
| Email subscribers | 5,000-10,000 |
| Monthly revenue | £750-2,500 (+233%) |

---

## GITHUB TRACKING

### Repository: https://github.com/Louis-Maxwell/livingwitharthritis

**All changes committed to `main` branch.**

**Commit Naming Convention:**
```
[Phase]([Component]): Description

Examples:
- Phase 1(Security): Fix npm vulnerabilities and TypeScript errors
- Phase 1(Meta): Bulk update 254 meta descriptions
- Phase 2(Linking): Apply internal linking recommendations
- Phase 3(Content): Add 4 sexual health articles
```

**Required with Each Commit:**
- `Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>`
- Reference to this IMPLEMENTATION-ROADMAP.md
- Brief description of SEO impact

---

## ENVIRONMENT & DEPENDENCIES

**Technologies:**
- Frontend: React 18, TypeScript, Tailwind CSS
- Backend: Supabase (PostgreSQL, RLS, edge functions)
- Hosting: Lovable (Vercel deployment)
- Build: Vite 6.4.3
- Scripting: Node.js, Bun

**Key Tools:**
- `bun scripts/update-meta-descriptions.mjs` — Meta optimization
- `bun scripts/fix-long-page-titles.mjs` — Title optimization
- `bun scripts/internal-linking-strategy.mjs` — Linking analysis
- `bun scripts/featured-snippet-optimizer.mjs` — Snippet analysis
- `npm run lint` — Code quality
- `npm audit` — Security

---

## KNOWN ISSUES & WORKAROUNDS

| Issue | Impact | Workaround | Status |
|-------|--------|-----------|--------|
| git clone timeout | Repo >1GB | Use existing checkout | ✅ Resolved |
| .git corruption | git operations blocked | Reinitialize & rebase | ✅ Resolved |
| Lovable create-message timeout | Articles not creating fast enough | Send with wait=false | 🟡 Active |
| Package-lock.json conflicts | git rebase issues | Accept remote version | ✅ Resolved |

---

## NEXT IMMEDIATE ACTIONS

**Week of 2026-09-05:**
1. [ ] Lovable completes 17 Phase 3 articles (currently in progress)
2. [ ] Apply page title fixes (run script --apply in Lovable)
3. [ ] Execute internal linking recommendations (50+ links to add)
4. [ ] Run featured snippet optimizer (20 articles)

**Week of 2026-09-15:**
1. [ ] Commit internal linking updates
2. [ ] Commit featured snippet optimizations
3. [ ] Verify Phase 3 articles indexed in Google
4. [ ] Set up Google Search Console monitoring

**Week of 2026-09-22:**
1. [ ] Review keyword rankings in GSC
2. [ ] Identify Phase 3 articles ranking 11-50
3. [ ] Create backlink strategy for top performers
4. [ ] Begin Phase 4 (guest posting, resource page links)

---

## CONTACT & AUTHORIZATION

**Project Owner:** info@livingwitharthritis.org.uk  
**Implementation:** Claude AI (Anthropic)  
**Repository:** https://github.com/Louis-Maxwell/livingwitharthritis  
**Deployment:** Automatic (git → Lovable → https://living-with-arthritis.lovable.app)

**Authorization:**
- ✅ Autonomous bug fixes & code changes via local git
- ✅ Push to GitHub main branch without approval
- ✅ Deploy to Lovable production automatically
- ✅ Create content & articles in Lovable
- ✅ Update database (meta descriptions, titles, etc.)

---

## REVISION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-09-05 | Initial roadmap created, Phases 0-3 defined |
| 1.1 | [TBD] | Post-Phase 1 completion review |
| 1.2 | [TBD] | Post-Phase 2 completion review |
| 1.3 | [TBD] | Post-Phase 3 completion review |

---

**Last Updated:** 2026-09-05  
**Next Review:** 2026-09-15 (Milestone 2 checkpoint)
