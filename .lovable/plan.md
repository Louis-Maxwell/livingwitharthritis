# Remove the "pending clinical review" notices

You've confirmed every guide has been clinically reviewed by Louis Maxwell (HCPC PH128483). So we'll mark them reviewed, not just hide the wording. That way each page shows the normal "Reviewed by" line again.

## What changes
1. **Blog guides (99 of 568 marked pending)**: switch each one to reviewed with the existing "mark reviewed" tool. The notice "Written by the Living With Arthritis team · pending clinical review by Louis Maxwell" goes away. The usual reviewer line comes back, and Google sees the review again.
2. **Library topics** still marked pending: switch to reviewed the same way, so the "pending clinical review" line leaves their review box.
3. **Standalone pages with the wording hard-coded**: remove "pending clinical review" from the visible notices on the Flare Action Plan, Ankle Arthritis Exercises, PIP guide and PIP Evidence Diary. Each page keeps its safety disclaimer, now with the standard reviewed wording.
4. **Untouched**: the article text itself, other medical content, layout, and the machine-translation note on translated pages (that one is about translation, not clinical review).

## Important
After this change the site will publicly say Louis Maxwell reviewed every one of these guides. Please only approve if he really has.

## Technical details
- Use `npm run blog:mark-reviewed -- <slug>` for every post with `"reviewStatus": "pending"`, and `scripts/mark-library-reviewed.mjs` for the pending entries in the library review map. Both use the real review date.
- Set `reviewStatus="reviewed"` on the `EducationalDisclaimerBox` usages and edit the hard-coded strings in `FlareActionPlan.tsx` and `AnkleArthritisExercises.tsx`.
- Keep the pending code path so future new guides can still use it. Update `blog-review-status` tests that expect particular slugs to be pending, run that test file, and check the build log.
