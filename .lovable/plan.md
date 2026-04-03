

## Plan: Replace AI Chatbot Icon with a Sleeker Robot SVG

Currently the floating chat button and the `/chat` page header use a generated PNG image (`src/assets/robot-assistant.png`). We'll replace it with a custom inline SVG robot icon that's crisp at any size, lightweight, and styled to match the red/white brand.

### Changes

**1. `src/components/ChatBotWidget.tsx`**
- Remove the `robotImg` PNG import
- Replace the `<img>` with a custom inline SVG of a sleek, modern robot head (rounded helmet, antenna, glowing eyes) using `currentColor` and the site's primary red

**2. `src/pages/Chat.tsx`**
- Remove the `robotImg` PNG import
- Replace the `<img>` in the header with the same SVG robot icon (larger, 64px)

**3. Create `src/components/icons/RobotIcon.tsx`**
- Reusable SVG component with `size` and `className` props
- Modern minimalist robot design: rounded head, two circular eyes, small antenna, subtle smile line — all vector, no raster dependency

### Files Changed

| File | Action |
|------|--------|
| `src/components/icons/RobotIcon.tsx` | New — reusable SVG robot icon |
| `src/components/ChatBotWidget.tsx` | Swap PNG for RobotIcon |
| `src/pages/Chat.tsx` | Swap PNG for RobotIcon |

No backend changes.

