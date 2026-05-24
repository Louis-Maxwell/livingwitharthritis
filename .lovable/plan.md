## Goal
Ensure every piece of text in the donation popup (StripeDonationModal) renders as solid black (`#0F0F0F`) so nothing appears grey or faint against the light modal background.

## Current State
The modal currently mixes `text-foreground` (near-black) and `text-muted-foreground` (dark grey, ~18% lightness). On the soft tinted backgrounds inside the modal, the muted grey can read as low-contrast.

## Changes
In `src/components/StripeDonationModal.tsx`, override every instance of `text-muted-foreground` with `text-foreground` (or explicit black) so:
- Dialog description
- "Donation Amount" / "Monthly Amount" label
- "You give / HMRC adds / We receive" labels
- Gift Aid legal copy
- Security footer text
all render as pure black.

No other components or design tokens will be touched.
