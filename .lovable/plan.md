## Goal
Add a new pillar guide page at `/guides/hip-exercises-for-osteoarthritis` (~1,500 words) with FAQs, JSON-LD, and clear next steps — matching the existing guide pattern.

## Files to create
1. `src/pages/guides/HipExercisesForOsteoarthritis.tsx` — new guide page component:
   - `SeoHead` (title, meta description, keywords, canonical)
   - Injected JSON-LD via `useEffect`: `MedicalWebPage`, `BreadcrumbList`, `FAQPage`, and `ExercisePlan`/`HowTo` for the routine
   - Sections (~1,500 words total):
     1. Hero + intro (why hip OA needs specific work)
     2. How exercise helps hip osteoarthritis (evidence + benefits)
     3. Before you start (safety, pain rules, when to see a GP/physio)
     4. Warm-up (2–3 mins)
     5. Core routine — 8 exercises with sets/reps and technique cues:
        - Hip abduction (side-lying)
        - Clamshell
        - Glute bridge
        - Standing hip extension
        - Sit-to-stand
        - Mini squat
        - Standing hip flexion / marching
        - Hamstring stretch + hip flexor stretch (cool-down)
     6. Weekly programme (2–3× / week + walking)
     7. Modifications for flare-ups and pre/post hip-replacement notes
     8. Progression signals and red flags
     9. FAQs (6 questions — e.g. "Does walking help hip OA?", "Should I exercise through pain?", "Is cycling safe?", "How long until I feel better?", "Can exercise delay hip replacement?", "Best exercise if I have severe hip OA?")
     10. Next steps: link to `/guides/exercise`, `/guides/knee-replacement-surgery` (as related joint-replacement info), `/exercises/hip`, `/guides/can-exercise-make-osteoarthritis-worse`, `/chat`
   - `MedicalReviewBadge`, `SocialShareButtons`, medical disclaimer, `PageBreadcrumb`

2. `src/App.tsx` — register lazy import + route:
   ```
   const HipExercisesForOsteoarthritis = lazy(() => import("./pages/guides/HipExercisesForOsteoarthritis"));
   <Route path="/guides/hip-exercises-for-osteoarthritis" element={<GuideLayout currentPath="/guides/hip-exercises-for-osteoarthritis"><HipExercisesForOsteoarthritis /></GuideLayout>} />
   ```

3. `src/lib/guideRegistry.ts` — add an entry (cluster: `msk`) so the onward-journey blocks surface it:
   ```
   { path: "/guides/hip-exercises-for-osteoarthritis", title: "Hip exercises for osteoarthritis",
     description: "A safe, physio-aligned hip OA routine with warm-up, strength work and progression.",
     cluster: "msk" }
   ```

4. `public/sitemap.xml` — add `<url>` entry for the new path so it's discoverable.

## Content style
- UK English, plain language, evidence-based (aligned with NICE NG226 / GDG hip OA advice — exercise as core treatment)
- No NHS references (per project memory)
- Editorial voice, black text on white, red accents for CTAs
- Uses existing Tailwind + shadcn components; no new deps

## Out of scope
- No new imagery generation (uses existing icons only)
- No CMS/DB changes
- Not touching prerender scripts beyond sitemap
