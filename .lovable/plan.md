# Plan: Self Help Tool fix + site-wide spell sweep + backend audit

Goal: keep credit use as low as possible. I will **report** backend findings rather than rewrite anything backend-side unless a real bug is found.

---

## 1. Self Help Tool — make the joint diagram actually work

**Bugs visible in your screenshot:**
- Labels (`Shoulders`, `Elbows`, `Wrists & Hands`, `Knees`, `Spine & Back`) are clipped because the SVG `viewBox` is `0 0 200 360` but the labels sit at `x=22` (left) and `x=178` (right) — they overflow on narrow containers.
- The donation toast floats over the bottom-left of the diagram.

**Fixes (frontend only, `src/components/JointExerciseSection.tsx`):**
- Widen the SVG `viewBox` from `0 0 200 360` → `-60 0 320 360` so label text has room on both sides. Body anatomy coordinates stay identical; only the canvas grows.
- Add `overflow: visible` on the `<svg>` as a safety net.
- Wrap each `<text>` label in a `<g>` with `text-anchor` already set; verify font-size scales on mobile (use `clamp` via CSS).
- Verify joint click → exercise-panel flow still works end-to-end (clicks update `activeSelectionId`, panel renders exercises for that joint). Walk through `neck`, `knee`, `spine`, and one paired joint (`shoulder-left`).
- Donation toast: it's a global widget; I'll add `pointer-events-none` styling to its container only on the `/self-help` route OR shift it via existing toast positioning so it doesn't overlap the diagram (whichever is cheaper to wire up — I'll pick on inspection).

---

## 2. Spelling & wording sweep (site-wide)

Run a scripted scan for common UK-English typos and the awkward NHS-removal artefacts.

**Definitely fixing:**
- `"the health service Aligned"` → `"Aligned with national clinical guidance"`
- `"the health service, NICE & Cochrane Review"` → `"NICE & Cochrane Review"`
- Any other lingering `"the health service"` literal strings that read awkwardly in UI copy.

**Spell-check approach (cheap):**
- Run `rg` for a curated list of common typos (`recieve`, `seperate`, `occured`, `accomodate`, `wich`, `thier`, `definately`, etc.) across `src/**/*.{ts,tsx}`.
- Fix any hits inline. I'm **not** running a full dictionary spell-check on every prose file — that would be expensive and noisy on medical terminology.

NHS-removal memory rule is preserved: I do not reintroduce "NHS".

---

## 3. Backend audit (report-first, fix only critical issues)

Run the cheap, automated checks:
1. `supabase--linter` — surfaces missing RLS, exposed columns, permissive policies.
2. `security--run_security_scan` — same, plus exposed PII.
3. `supabase--db_health` — connection saturation, OOM kills, DB size sanity.
4. Quick read of edge-function deploy state for the functions you actually call from the app (`submit-triage`, `submit-contact`, `book-appointment`, `create-donation-checkout`, `chat`).

**What I will do with the results:**
- Hand you a short table: **finding → severity → 1-line fix recommendation → estimated credit cost**.
- Fix **only** critical security issues automatically in this loop (missing RLS on a PII table, exposed service key, etc.). Anything medium/low becomes a follow-up you can approve individually.

This keeps the loop bounded to 1 frontend file + maybe 1 migration. If the audit comes back clean, no backend changes happen at all.

---

## Files I expect to touch

```text
src/components/JointExerciseSection.tsx   (viewBox + labels)
src/components/VirtualPhysioSection.tsx   (2 phrasing fixes)
src/pages/SelfHelpTool.tsx                (1 phrasing fix: "the health service Aligned")
maybe: src/components/<DonationToast>.tsx (positioning, only if it's a quick win)
maybe: 1 supabase migration (only if a critical security finding requires it)
```

## Out of scope (to keep credits low)

- No re-architecture of the backend.
- No new tables, no new edge functions.
- No global UX rewrite of the Self Help Tool — only the bugs in your screenshot.
- No prose rewrite of pages — only typos and the leftover NHS phrasings.

## Estimated credit cost: ~1 credit total

Approve and I'll execute in one pass.