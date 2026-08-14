# Plan: "Website currently updating" banner

## Goal
Add a dismissible announcement banner at the very top of every page stating the website is currently being updated, so visitors are aware and there are no conflicts while work is in progress.

## Approach
Insert a thin banner as the **first child of the sticky header wrapper** in `src/components/Header.tsx` — above the existing `DonationQuickBar`. The header is used by ~110 pages, so this one edit covers the entire site.

### Banner details
- **Component:** New `src/components/SiteAnnouncementBanner.tsx` (lightweight, client-side).
- **Copy:** "We're currently updating this website — please bear with us while we make improvements. You may notice changes as you browse."
- **Styling:** `bg-primary text-primary-foreground` (brand red, white text) — matches the existing `DonationQuickBar` treatment and the project's red-accent design system. Thin (`py-2`), centered, small text (`text-xs sm:text-sm`), full-width.
- **Dismissible:** An `X` button (lucide `X`) that sets `localStorage.lwa_update_banner_dismissed = "1"` and hides the banner. Returning visitors won't see it again until localStorage is cleared.
- **Accessibility:** `role="status"`, `aria-live="polite"`, dismiss button has `aria-label="Dismiss update notice"`. Respects 44px touch target on the close button.
- **No conflicts:** Because it sits inside the existing sticky header wrapper (`sticky top-0 z-50`), it inherits the header's hide-on-scroll-down behavior and won't overlap or fight the sticky nav. It simply appears at the very top when the header is visible.

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
(Import added at top of file.)

## Files to change
1. **Create** `src/components/SiteAnnouncementBanner.tsx` — the banner component.
2. **Edit** `src/components/Header.tsx` — import + render `<SiteAnnouncementBanner />` as first child of the sticky wrapper.

## Verification
- `tsgo` typecheck passes.
- Build passes.
- Visual check via preview: banner visible at top of homepage, dismissible, doesn't overlap the donation bar or nav.
