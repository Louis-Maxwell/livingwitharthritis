## Fix: Two accessibility-tree audit failures

### 1. Sticky donate bar — `aria-hidden="true"` on container with focusable button
**File:** `src/components/landing/StickyDonateBar.tsx`

The mobile bar and desktop card use `aria-hidden={!visible}` while still containing a focusable `<button>` / `<a>`. Axe flags this because keyboard users can still tab into hidden controls.

**Fix:** Replace `aria-hidden` with the `inert` attribute (modern browsers + React 19 support it). `inert` removes the subtree from the a11y tree *and* prevents focus — the correct primitive for "off-screen sticky UI". Apply on both the mobile wrapper (line 57-62) and desktop wrapper (line 97-102).

```tsx
<div
  {...(!visible ? { inert: "" as unknown as undefined } : {})}
  className={`fixed inset-x-0 bottom-0 ...`}
>
```

### 2. Blog preview — image links with no discernible text
**File:** `src/components/landing/BlogPreview.tsx`

- **Featured card (line 103):** `<Link to={...} className="md:w-1/2 block">` wraps an `alt=""` image — no accessible name. Add `aria-label={featured.title}`.
- **Grid cards (line 125):** already use `tabIndex={-1} aria-hidden="true"` on a focusable `<Link>` — same pattern axe flags. Add `aria-label={a.title}` and drop the `aria-hidden` (the heading link below still provides the primary semantic link; the image link becomes a duplicate but is named).

### Verification
After the edits, reload the homepage and rerun the AI-readiness audit; both rows should clear.