## Plan: New "Tai Chi for Beginners" entry page

Target keyword: **tai chi for beginners** — 4,400/mo UK, KDI 36 (possible). Bigger than the hub head-term and clearly informational; the page should be the **easiest possible on-ramp** that funnels into the existing arthritis hub.

### What I'll build

**New route**: `/exercises/tai-chi-for-beginners` → `src/pages/exercises/TaiChiForBeginners.tsx`

Page structure (mirrors existing tai chi pages for consistency):

1. **Hero** — H1 "Tai Chi for Beginners: Your First 7 Days", subtitle framing it as a UK-friendly start that's especially gentle for people with arthritis or stiff joints. Two CTAs: "Start Day 1" + "Got arthritis? See the arthritis guide" (links to hub).

2. **What is tai chi?** — 3-card primer: what it is, what it isn't (not karate / not yoga), why beginners pick it. Plain English, no jargon.

3. **What you need to start** — Zero-equipment list (flat shoes or socks, 2m of floor, water). Reinforces the "free, accessible" angle.

4. **Your first 7 days** — Day-by-day card grid, each ~5–10 min, building from Wuji stance → weight shift → Cloud Hands → Brush Knee → Closing. Reuses the existing `TAI_CHI_ANIMATIONS` videos so day cards have inline demos. Day 7 = "string it together" mini-form.

5. **Common beginner mistakes** — 5 short list items (locked knees, holding breath, rushing, looking down, practising on carpet).

6. **Where to go next** — 3-card branching:
   - "I have arthritis" → `/exercises/tai-chi-for-arthritis`
   - "I want a 15-min routine" → `/exercises/tai-chi-for-balance`
   - "I can't stand for long" → `/exercises/seated-tai-chi-for-arthritis`

7. **FAQ** (8 questions, FAQPage JSON-LD): how long until results, how often, alone vs class, age, fitness level, free YouTube vs paid class, best style for beginners, do I need an instructor.

8. **JSON-LD**: `Course` schema (beginner-level, 7-day duration) + `FAQPage`. Injected via the same `useEffect` pattern as the other tai chi pages.

### Wire-up

- **`src/App.tsx`** — add lazy import + `<Route>` *before* the catch-all `/exercises/:slug`.
- **`public/sitemap.xml`** — add entry, priority 0.85, weekly changefreq (highest-traffic page in the cluster).
- **`src/pages/exercises/TaiChiForArthritis.tsx`** (hub) — add a prominent "New to tai chi? Start with our 7-day beginner guide" callout near the top of the page, plus include the new URL in the existing `ItemList` JSON-LD.
- **`src/pages/exercises/TaiChiForBalance.tsx`** + **`SeatedTaiChiForArthritis.tsx`** — small "Brand new to tai chi?" link in the hero/intro pointing to the beginner page.
- **`src/pages/ExerciseHub.tsx`** — add a tile next to the existing tai chi tiles.

### SEO meta
- `<title>`: "Tai Chi for Beginners (UK): Your First 7 Days" (≤60 chars)
- `<meta description>`: "A free 7-day UK guide to learning tai chi at home. Gentle on arthritic joints, no equipment, ~10 minutes a day. Start Day 1 today." (≤160 chars)
- Keywords meta: tai chi for beginners, tai chi at home UK, free tai chi for beginners, beginner tai chi arthritis

### Files touched
- **New:** `src/pages/exercises/TaiChiForBeginners.tsx`
- **Edit:** `src/App.tsx`, `public/sitemap.xml`, `src/pages/exercises/TaiChiForArthritis.tsx` (callout + ItemList), `src/pages/exercises/TaiChiForBalance.tsx`, `src/pages/exercises/SeatedTaiChiForArthritis.tsx`, `src/pages/ExerciseHub.tsx`

### Out of scope
- Won't add a video shoot — reuse existing `TAI_CHI_ANIMATIONS` clips.
- Won't add a backend day-tracker (could be a follow-up if you want users to mark days complete).
- No NHS references in copy (per project rule).