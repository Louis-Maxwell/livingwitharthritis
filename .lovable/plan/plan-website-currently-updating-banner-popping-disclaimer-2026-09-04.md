# Plan: "Website currently updating" banner (popping disclaimer)

## Goal
Add a visually striking, dismissible announcement banner at the very top of every page telling visitors the website is currently being updated — a "popping disclaimer" that grabs attention without disrupting the header layout.

## Approach
Create a new lightweight `SiteAnnouncementBanner` component and render it as the **first child of the sticky header wrapper** in `src/components/Header.tsx`, above the existing `DonationQuickBar`. The header is used site-wide, so this one insertion covers every page.

### Banner details
- **Component:** New `src/components/SiteAnnouncementBanner.tsx` (client-side, no backend).
- **Copy:** "We're currently updating this website — please bear with us while we make improvements. You may notice changes as you browse."
- **"Popping" styling:** A high-contrast band using `bg-primary text-primary-foreground` (brand red / white) with a subtle pulsing dot or sparkle icon and a gentle slide-in/fade animation on mount (`animate-fade-in-up`) so it draws the eye on first paint. Thin (`py-2`), centered, small text (`text-xs sm:text-sm`), full-width.
- **Dismissible:** An `X` button (lucide `X`) that sets `localStorage.lwa_update_banner_dismissed = "1"` and hides the banner. Returning visitors won't see it again until localStorage is cleared.
- **Accessibility:** `role="status"`, `aria-live="polite"`, dismiss button has `aria-label="Dismiss update notice"` and a 44px touch target.
- **No layout conflicts:** Sits inside the existing sticky wrapper (`sticky top-0 z-50`), so it inherits the header's hide-on-scroll-down behaviour and won't overlap or fight the sticky nav — it simply appears at the very top when the header is visible.

### Placement in Header.tsx
Inside the sticky wrapper `<div className="sticky top-0 z-50 ...">`, before:
```tsx
<Suspense fallback={<div className="bg-primary h-[52px]" />}>
  <DonationQuickBar />
</Suspense>
```
Insert:
```tsx
<SiteAnnouncementBanner />
```
(Add the import at the top of `Header.tsx`.)

## Files to change
1. **Create** `src/components/SiteAnnouncementBanner.tsx` — the banner component.
2. **Edit** `src/components/Header.tsx` — import + render `<SiteAnnouncementBanner />` as the first child of the sticky wrapper.

## Verification
- `tsgo` typecheck passes.
- Build passes.
- Visual check via preview: banner visible at top of homepage, pops in on load, dismissible, does not overlap the donation bar or nav.
