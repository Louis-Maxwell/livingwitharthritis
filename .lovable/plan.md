

## Plan: Upgrade Chatbot Icon to a Premium, Modern Design

The current robot PNG icon looks slightly cartoonish and doesn't match the site's premium £150M aesthetic. We'll replace it with a sleek, modern SVG icon that feels more like a Wellcome Trust / Gates Foundation-tier design element.

### Approach

Keep the red robot identity (per user preference) but make it significantly more refined — think clean geometric shapes, subtle gradients, and a more sophisticated silhouette.

### Changes

**1. `src/components/icons/RobotIcon.tsx`** — Redesign the SVG
- Sleeker, more geometric robot head with softer proportions
- Add a subtle red-to-darker-red gradient instead of flat fill for depth
- Refined eye design with inner glow effect
- Thinner antenna with a more elegant ball tip
- Remove the chunky body/ears — keep it as a clean head-only icon
- Add a subtle drop shadow via SVG filter for a floating effect

**2. `src/components/ChatBotWidget.tsx`** — Use new RobotIcon SVG
- Replace the `robot-assistant.png` import with the new `RobotIcon` component
- Add a subtle pulse animation ring around the button to draw attention
- Slightly larger icon (44px) for better visibility
- Add a small "Chat" label tooltip on hover

**3. `src/pages/Chat.tsx`** — Update Chat page header
- Replace the PNG with the new `RobotIcon` at 64px
- Keep the white background per user preference

### Files Changed

| File | Action |
|------|--------|
| `src/components/icons/RobotIcon.tsx` | Redesign — premium geometric SVG with gradient |
| `src/components/ChatBotWidget.tsx` | Swap PNG for RobotIcon, add pulse ring animation |
| `src/pages/Chat.tsx` | Swap PNG for RobotIcon |

No backend changes.

