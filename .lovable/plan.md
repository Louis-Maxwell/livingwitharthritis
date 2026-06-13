## Goal
Make the `/self-help` mannequin look realistic, with minimum credit spend. Skip the vague "improvise whole frontend/backend" — that contradicts your repeated minimal-credits constraint and there's no concrete issue to fix.

## Scope — 2 files, 1 generated image

### 1. Generate ONE realistic anatomical figure
`src/assets/anatomy-figure.png` — premium-quality, front-facing, neutral grey anatomical reference figure (subtle muscle definition, medical-illustration style, plain white background, no text, no labels). 3:4 aspect.

This is the only image generated. No video, no extra angles.

### 2. Rewrite mannequin visuals in `src/components/JointExerciseSection.tsx`
- Replace the hand-drawn SVG body shapes (head ellipse, torso rect, limb paths, etc.) with the generated PNG as a background `<img>` inside a `relative` container.
- Keep the entire existing `<svg>` overlay coordinate system, but strip the body-shape `<ellipse>`/`<rect>`/`<path>` primitives — keep ONLY the clickable joint circles + their pulse/active states + side-paired logic.
- The joint markers (circles with crimson glow on hover/active) sit on top of the realistic figure, aligned over each anatomical joint.
- All existing data, state, selection, keyboard handlers, and exercise panel logic untouched.
- Re-tune the ~14 joint coordinates so circles land correctly on the new image (neck, shoulders L/R, elbows L/R, wrists L/R, spine, hips L/R, knees L/R, ankles L/R).

### 3. Out of scope (skipped to save credits)
- No backend/edge-function work — none requested specifically, no concrete bug.
- No data-model changes.
- No other page edits.
- No second image (back view, female figure, etc.) unless you ask later.

## Verification
Visit `/self-help` after build. Confirm:
- Realistic anatomical figure renders crisply.
- All 14 joint markers visible, aligned over correct anatomy.
- Hover/click states still glow crimson; selecting a joint still loads its exercise plan in the right-hand panel.
- Mobile layout still works (figure scales inside its container).

Approve to proceed.