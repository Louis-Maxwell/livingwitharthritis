# Living With Arthritis — 90-day visibility plan

**Source brief:** Priority 2–9 SEO strategy (topic clusters, trust consistency, internal linking, snippets, 30 champions, backlinks, posters, positioning).  
**Repo truth as of 2026-09-07:** **505** published blog posts (`blogArticles` 238 + frailty-batch 250 + phase2 17). Cover map 505/505.  
**Constraints:** GitHub-only code edits (`Louis-Maxwell/livingwitharthritis`); no Lovable credits for edits; no invented visitor/impact metrics; keep charity **1218461**, independent of Arthritis UK, HCPC **PH128483**; Oswestry registered address stays off site; Cloudflare stays removed unless Louis asks.

---

## 0. Source of truth (Priority 3) — do first

Public claims today are inconsistent and some are unverifiable:

| Claim | Where | Status |
|---|---|---|
| “500+ clinically reviewed articles” | `Index.tsx` | Roughly true (505) but not CMS-driven |
| “120+ Expert articles / Resources” | `AboutSection`, `ContentDepthSection`, `HowItWorksSection`, `ParticleNetworkSection` | **Stale / wrong** |
| “50+ free guides & resources” | `CommunityHub` | Unclear definition |
| “50+ Specialists” | `ParticleNetworkSection` | **Not true** for a young charity |
| “10,000+ people supported” | `ImpactStories`, `LivedExperiences`, `HowItWorksSection` | **Not verified — remove or replace** |
| “4.2 pages per session” | `ImpactStories` | **False** (Lovable analytics ≈ **2** pages/visit) |
| “40+ articles” | `TrustCredibility` | Stale |

### Single source of truth

Add `src/config/contentInventory.ts` (generated or hand-maintained, updated in CI):

```ts
export const CONTENT_INVENTORY = {
  blogArticles: 505,           // auto from catalog length
  clinicalGuides: /* count pillar+guides+condition hubs */,
  exerciseProgrammes: /* count exercise routes */,
  downloads: /* DownloadableResources length */,
} as const;
```

**Public wording rules:**
- Prefer exact counts or “hundreds of articles” only when auto-synced.
- Never invent people-supported, specialists, or engagement rates.
- Impact page: qualitative stories + charity number; drop fake percentages unless surveyed.

**Owner:** GTM (code) + Louis (sign-off on which labels are “guides” vs “blog”).

---

## 1. Eight topic clusters (Priority 2)

Map every URL into one primary cluster. Pillars already in repo (strengthen, don’t rebuild from scratch):

| # | Cluster | Pillar URL (candidate) | Supporting hubs / examples already present |
|---|---|---|---|
| 1 | Arthritis Pain | `/guides/arthritis-pain-relief` (`ArthritisPainRelief.tsx`) | Shoulder pain relief, flare-ups page, painkillers/NSAIDs pillar |
| 2 | Osteoarthritis | `/conditions/osteoarthritis` + OA hubs | Knee/Hip/Hand condition pages, hip OA exercises guide |
| 3 | Arthritis Exercises | `/exercises` + `/pillar` ExerciseGuide | Joint exercise pages, chair/tai chi routes, flare-safe exercise posts |
| 4 | Arthritis Diet | `/diet` + DietGuide pillar | Anti-inflammatory / Mediterranean / omega-3 blogs |
| 5 | Arthritis Symptoms | New or expand symptoms hub | Early signs, stiffness, swollen joints posts → link to GP/NHS pathways |
| 6 | Arthritis Treatments | SteroidsGuide + Painkillers + surgery pillars | DMARDs, physio, injections, knee replacement guide |
| 7 | Flare-Ups | `/arthritis-flare-ups` | Flare blogs + pain cluster cross-links |
| 8 | Benefits & PIP | `/pillar/benefits-pip` (`BenefitsPIPGuide.tsx`) | Disability support guide, Access to Work blogs |

**Cluster rules:**
- One **pillar** = comprehensive, referenced, reviewed, FAQ + howTo schema, 20+ internal links out.
- Supporting pages always link **up** to pillar + **across** to 2–4 siblings + **one tool** (exercises / self-help / search).
- Kill cannibalisation: one primary keyword per URL; consolidate thin near-duplicates into the pillar or a single supporting page.

---

## 2. Internal linking system (Priority 4)

**Ship as product rules, not one-off edits:**

1. **BlogPost template:** always render  
   - Parent pillar (from cluster map)  
   - 2–4 related (already partly done)  
   - One exercise or tool CTA  
   - One “next step” (GP / flare / PIP / newly diagnosed)
2. **Cluster map file:** `src/data/topicClusters.ts` — slug → `{ cluster, pillarPath, relatedSlugs[], toolPath }`
3. **Hub pages:** each pillar lists all supporting URLs in a visible “In this topic” nav.
4. **QA:** vitest that every published slug has a cluster + pillar link target that exists.

---

## 3. Featured snippets & AI answers (Priority 5)

For each of **100–200** high-value questions (start with champions):

- `direct_answer` / speakable intro (many posts already have fields)
- FAQ block with real questions from the page (schema already partially present)
- Format: definition → steps → when to seek help (UK / NHS)

**Do not** auto-generate medical advice; Louis/HCPC review for treatment claims.

---

## 4. Thirty SEO Champions (Priority 6)

Initial shortlist (refine with GSC queries when connected):

| Priority | URL focus | Primary intent |
|---|---|---|
| 1 | Osteoarthritis guide / condition | osteoarthritis UK |
| 2 | Arthritis pain relief guide | arthritis pain relief |
| 3 | Arthritis flare-ups | arthritis flare-up |
| 4 | Benefits & PIP guide | PIP arthritis |
| 5 | Knee OA / knee exercises | knee arthritis exercises |
| 6 | Hip OA / hip exercises | hip arthritis exercises |
| 7 | Hand arthritis | hand osteoarthritis |
| 8 | Anti-inflammatory diet | anti-inflammatory diet arthritis |
| 9 | Mediterranean diet post | Mediterranean diet arthritis |
| 10 | Newly diagnosed guide | newly diagnosed arthritis |
| 11 | Steroids guide | steroid injection arthritis |
| 12 | Exercise hub | arthritis exercises |
| 13 | Diet hub | arthritis diet |
| 14 | Disability / benefits support | arthritis disability benefits |
| 15 | Waiting list / NHS pathway content | arthritis waiting list |
| 16–30 | Top GSC landing URLs by impressions with low CTR or position 8–20 | — fill from GSC |

**80% of SEO engineering time** goes to these 30 until they are: title/H1 aligned, meta clean, pillar links, FAQ, references, review box, CWV OK, indexed.

---

## 5. Backlinks (Priority 7) — authority only

**No** cheap PBNs / random guest posts.

Pipeline (Grant writer + Louis outreach):

1. List UK MSK / physio / OT / rheumatology / patient groups / universities  
2. Offer: free resource pages, student projects, poster packs for waiting rooms  
3. One “linkable asset” per quarter (e.g. PIP plain-English checklist, flare action plan PDF)  
4. Track in a simple sheet: org → contact → asset → outcome  

---

## 6. Posters → traffic (Priority 8)

Social Media / content creations already use HQ posters. Systematise:

| Poster theme | Must land on |
|---|---|
| Signs / symptoms | Symptoms or newly diagnosed pillar |
| Exercise | `/exercises` or joint-specific exercise page |
| Diet | `/diet` or anti-inflammatory pillar |
| PIP / benefits | PIP guide |
| Flare | `/arthritis-flare-ups` |
| You are not alone | `/community` or About + helpline |

Every poster brief includes: **primary URL + UTM** (`docs/UTM-CONVENTIONS.md`).

---

## 7. Positioning (Priority 9)

Lean into: **practical, plain-English, evidence-based UK guidance for everyday living with arthritis.**

Content angles to prioritise in champions + new pieces:

- What do I do today / during a flare?  
- What should I ask my GP?  
- What can I safely start exercising?  
- How does PIP work?  
- Work with arthritis / Access to Work  
- Waiting for NHS treatment  

Avoid competing head-on with Arthritis UK on brand terms; win on **tasks + UK pathways**.

---

## 8. 90-day calendar

### Days 1–30 — Foundation

| Week | Work |
|---|---|
| 1 | Content inventory SOT + remove/replace false claims (10k, 50+ specialists, 4.2 pages, stale 120+) |
| 1 | Trustee / clinical reviewer honesty pass (Louis PH128483 only — no invented board) |
| 2 | `topicClusters.ts` + map existing pillars; flag keyword cannibalisation |
| 2 | Pick final Top 30 with GSC (impressions × opportunity) |
| 3 | Internal linking template on BlogPost + hub “In this topic” |
| 3 | Technical: indexing soft-404 strategy (hard 404s), publish GitHub → live, IndexNow |
| 4 | Title/meta audit on Top 30; push frailty double-when leftover if not already live |

### Days 31–60 — Authority

| Week | Work |
|---|---|
| 5–6 | Deepen 8 pillars (FAQ, references, review box, CTAs) |
| 6–7 | Improve Top 30 body + snippet answers |
| 7–8 | Structured data pass (Article, FAQ, HowTo where real) |
| 8 | Fill cluster gaps (symptoms hub if missing; treatment index) |

### Days 61–90 — Off-site authority

| Week | Work |
|---|---|
| 9 | Partnership outreach list + 10 first emails |
| 10 | Poster campaign tied to 5 champion URLs |
| 11 | One linkable asset (PIP or flare checklist) |
| 12 | Review GSC deltas; re-prioritise next 30 |

---

## 9. Roles

| Who | Owns |
|---|---|
| **GTM** | Plan, inventory SOT, clusters code, internal linking, trust-copy fixes, GitHub pushes |
| **SEO Manager** | Keyword map, cannibalisation, Top 30 briefs, GSC reporting |
| **Semrush** | Cluster keyword lists / gaps when asked |
| **content creations / Social** | Poster → URL engine + UTMs |
| **Grant writer** | Partnership / university outreach drafts |
| **Louis** | Clinical sign-off, trustee copy, partnership intros, Lovable publish |

---

## 10. Success metrics (honest)

- Public count claims = inventory (zero contradictory numbers)  
- Top 30: indexed, self-consistent title/H1, ≥1 pillar + ≥2 related links  
- GSC: impressions/CTR/position on Top 30 (baseline week 1 → week 12)  
- Lovable/GA: pages/visit and duration as **diagnostics**, never marketing claims  
- Backlinks: count of **relevant** referring domains only  

---

## 11. Immediate next actions (this week)

1. Approve this plan (or edit cluster pillar URLs).  
2. Implement `contentInventory` + strip false Impact/About/Community numbers.  
3. Push leftover frailty `when…when` audit fix if still uncommitted.  
4. Build `topicClusters.ts` v1 for the 8 pillars.  
5. Pull GSC Top queries → lock the final 30 champions.

