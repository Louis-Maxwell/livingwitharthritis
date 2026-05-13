## Plan: Turn `/exercises/tai-chi-for-arthritis` into a true topical hub

The page exists as a guide but doesn't yet act as a hub — it needs to surface and link **every** Tai Chi asset on the site so Google sees a tightly clustered topic. Inventory found:

- **3 dedicated pages**: hub itself, Tai Chi for Balance, Seated Tai Chi for Arthritis
- **8 dynamic joint pages** auto-generated from `exerciseJointMatrix.ts` (knee, hip, hand, wrist, shoulder, back, foot, ankle)
- **35 short clips** in `src/assets/`: 5 named (`tai-chi-brush-knee`, `cloud-hands`, `rooted-stance`, `weight-shift`, `closing-posture`) + 30 numbered variants (`tc-brush-1..6`, `tc-close-1..6`, `tc-cloud-1..6`, `tc-rooted-1..6`, `tc-shift-1..6`)
- **1 article**: "Tai Chi for Joint Health" in `articles.ts`
- **1 component**: `TaiChiAnimations.tsx`

### What I'll build

**1. New hub sections inside `TaiChiForArthritis.tsx`** (between the existing intro and FAQ):

- **"Tai Chi by joint"** — 8-card grid linking to each `/exercises/tai-chi-for-{joint}-arthritis` page, with the joint name + 1-line benefit pulled from the matrix.
- **"Related Tai Chi guides"** — 2 prominent cards: Tai Chi for Balance (fall prevention) and Seated Tai Chi (chair-based). Each with 1-sentence "best for…" framing.
- **"Movement video library"** — 5 grouped tiles (Brush Knee, Cloud Hands, Rooted Stance, Weight Shift, Closing Posture). Each tile shows the named hero clip and lists the 6 numbered angle variants beneath, all using the existing `<video>` pattern from the page. Lazy-loaded.
- **"Read more"** — link to the "Tai Chi for Joint Health" article in `articles.ts` and to the Exercise Hub.

**2. SEO authority signal** — Add `ItemList` JSON-LD (alongside existing MedicalWebPage + FAQPage) enumerating all linked Tai Chi URLs in topical order. Injected via the same `useEffect` pattern.

**3. Reciprocal back-links** — Add a small "Part of: Tai Chi for Arthritis" breadcrumb-style chip linking back to the hub on:
- `TaiChiForBalance.tsx`
- `SeatedTaiChiForArthritis.tsx`
- `ExerciseJointPage.tsx` (only when `exercise === "tai-chi"`)

**4. Discovery surface** — In `ExerciseHub.tsx`, promote the Tai Chi Guide tile to a slightly larger "Topic hub" card (visual cue only) so users land on the hub before drilling into a joint page.

### Files touched
- `src/pages/exercises/TaiChiForArthritis.tsx` (new sections + ItemList schema)
- `src/pages/exercises/TaiChiForBalance.tsx` (back-link chip)
- `src/pages/exercises/SeatedTaiChiForArthritis.tsx` (back-link chip)
- `src/pages/exercises/ExerciseJointPage.tsx` (conditional back-link chip)
- `src/pages/ExerciseHub.tsx` (Topic-hub card treatment)

### Out of scope
- No new routes, no sitemap changes (all destinations already indexed).
- Won't deduplicate the 30 numbered clips — they're distinct angles and useful as a video library.
- No backend/data changes; this is presentation + internal linking only.