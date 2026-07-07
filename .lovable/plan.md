## Add scroll to header dropdown menus

The "Managing Arthritis" dropdown has 13 items and can extend below the viewport on shorter screens, making the last entries (Symptom Checker, Find a Specialist, Treatment Access & Costs) hard or impossible to reach. Same risk applies to "About Arthritis" (10 items) as the viewport shrinks.

### Change
In `src/components/Header.tsx`, on the desktop dropdown panel (line 401), cap the panel height to the available viewport space and enable vertical scrolling when the list overflows.

- Add `max-h-[calc(100vh-8rem)] overflow-y-auto overscroll-contain` to the inner dropdown container.
- Keep the existing styling (border, shadow, padding, notch) unchanged.
- No changes to the sub-item list or the mobile menu — mobile already scrolls the full sheet.

### Result
All items in every navigation dropdown (Managing Arthritis, About Arthritis, etc.) remain reachable via a scrollbar when the list is taller than the viewport, on any screen height.