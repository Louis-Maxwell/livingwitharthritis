## Remove the "Impact Ledger" segment

The block titled **"The Impact Ledger — Every figure published. Every pound accounted for."** (with the year-end ledger stats and the "Per £1 received" allocation) will be fully removed from the landing page.

### Changes
1. **`src/pages/Index.tsx`** — remove the lazy import of `ImpactLedger` and remove the `<ImpactLedger />` render in the landing sequence.
2. **`src/components/landing/ImpactLedger.tsx`** — delete the file.
3. **`src/App.tsx`** — remove the stale code comment that references `ImpactLedger`.

### Out of scope
- No other landing sections, copy, or styling will change.
- No backend / database changes.
