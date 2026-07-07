## Plan: Black scrollbar styling

### What we’ll change
Update the global custom scrollbar in `src/index.css` so the thumb is black instead of the current muted-foreground tint, while keeping the transparent track and 8px width from the previous update.

### Proposed CSS update
```css
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: hsl(0 0% 0% / 0.35);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: hsl(0 0% 0% / 0.55);
}
```

### Rationale
- Black thumb aligns with the project’s black-on-white visual identity.
- 35% opacity keeps the scrollbar subtle when idle; 55% on hover provides clear feedback without becoming visually heavy.
- Track stays transparent so it doesn’t add visual noise against white backgrounds.
- No change to width (remains 8px as previously requested).

### Verification
- Open any scrollable area (e.g., the “Managing Arthritis” header dropdown on a short viewport) and confirm the scrollbar thumb renders black.
- Hover the thumb to confirm the colour darkens.

### Files affected
- `src/index.css`