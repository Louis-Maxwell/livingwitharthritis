## Goal
Add a Playwright test that opens the desktop **Managing Arthritis** header dropdown and verifies (a) the scroll container is scrollable when the viewport can't fit all 13 items, and (b) every item is reachable by scrolling.

## Where the behaviour lives
- `src/components/Header.tsx` lines 132–150 — the "Managing Arthritis" nav link with 13 sub-items.
- Lines 399–435 — the dropdown container uses `max-h-[calc(100vh-8rem)] overflow-y-auto` with `role="menu"` / `aria-label="Managing Arthritis submenu"` and each item has `role="menuitem"`.

## Test plan

New file: `tests/visual/managing-arthritis-dropdown.spec.ts`

1. **Short viewport that forces overflow.** Set viewport to `1280 × 600` (desktop width so the mobile drawer doesn't take over, short height so `max-h-[calc(100vh-8rem)]` = ~416px can't fit 13 rows).
2. **Open the dropdown.** Navigate to `/`, then click the top-nav button `Managing Arthritis` (`page.getByRole("button", { name: "Managing Arthritis" })`).
3. **Locate scroll container.** `page.getByRole("menu", { name: /Managing Arthritis submenu/i }).locator("> div")` — this is the element with `overflow-y-auto`.
4. **Assert scrollability.** Read `scrollHeight` and `clientHeight` via `evaluate` and assert `scrollHeight > clientHeight` (proves the scrollbar is warranted).
5. **Assert all 13 items exist.** `expect(menu.getByRole("menuitem")).toHaveCount(13)`.
6. **Assert last item reachable by scrolling.**
   - Locate the last item (`Treatment Access & Costs`).
   - Confirm it is *not* fully in view initially: compare its `boundingBox().y + height` against the container's bottom.
   - Call `lastItem.scrollIntoViewIfNeeded()` on the item within the scroll container.
   - Re-read positions and assert the item's bottom is now within the container's visible area.
7. **Assert first item still reachable by scrolling back.** Scroll container back to `scrollTop = 0` and confirm the first item (`Newly Diagnosed`) is fully visible again.

## CI hookup
No workflow change needed — `.github/workflows/tests.yml` already runs `bunx playwright test tests/visual/` on every PR, so the new spec is picked up automatically.

## Out of scope
- Mobile menu variant (separate drawer component, different DOM).
- Visual/screenshot regression for the dropdown (can be added later if desired).
- Keyboard-only scroll flow (arrow-key traversal) — the current dropdown uses `role="menu"` but doesn't implement roving tabindex, so keyboard scroll semantics would be a component change, not a test.

## Deliverable
One new file: `tests/visual/managing-arthritis-dropdown.spec.ts`. No production code changes.