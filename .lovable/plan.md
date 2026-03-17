
# Revamp Humanoid Diagram: Clean Look with Visible Joints

## What Changes

### 1. Replace the body mannequin image with a clean SVG silhouette
- Remove the `body-mannequin.png` image import
- Build a new inline SVG humanoid using a **soft teal/slate blue** colour (instead of navy) -- clean, modern, medical-aesthetic
- Use a subtle gradient for depth (lighter at edges, slightly darker at centre)
- White/transparent background (no grey `bg-accent` or `bg-background` tinting)

### 2. Add visible joint indicators directly into the SVG
- Draw small **white circles with a subtle border** at each of the 14 joint locations inside the SVG itself
- These act as permanent anatomical landmarks so users can clearly see where joints are, even before interacting
- The interactive dot markers overlay on top and "light up" when hovered/clicked

### 3. Update section background
- Remove the grey background from the section (`bg-background` stays, which is white)
- Ensure the diagram area has a clean, borderless, minimal look

## Technical Details

**File: `src/components/JointExerciseSection.tsx`**

- Replace `BodyImage` component (currently renders `body-mannequin.png`) with a new `BodySVG` component
- SVG colour: a cool slate-teal gradient (e.g. `#5B8A9A` to `#3D6B7E`) -- clean, professional, not navy
- Embed 14 small white/light circles at anatomical joint positions within the SVG paths to make joints visually obvious
- Add subtle drop shadow filter for depth
- Recalibrate `jointMarkers` coordinates if needed to align with new SVG proportions
- Keep all existing exercise data, panel logic, and interactivity unchanged
