Update the global WebKit scrollbar styling in `src/index.css` to make scrollbars easier to grab.

Change:
- `::-webkit-scrollbar` width from `4px` to `8px`
- Optionally increase `::-webkit-scrollbar-thumb` border-radius from `2px` to `4px` so the thumb keeps a rounded pill shape proportional to the new width.

Scope: global CSS only; no component or layout changes.

Verification: open any scrollable area (e.g., the "Managing Arthritis" header dropdown on a short viewport) and confirm the scrollbar thumb is visibly wider.