## Change Media Contact email to info@livingwitharthritis.org.uk

The "Media Contact" block on `/press` currently shows `press@livingwitharthritis.org.uk`. Swap it for `info@livingwitharthritis.org.uk`.

### Change
- `src/pages/Press.tsx` — replace the 3 uses of `CONTACT_EMAILS.press` (lines 123, 179, 181) with `CONTACT_EMAILS.info`.

### Not changing
- `src/config/contact.ts` — keep `press` key intact so the address remains available if needed later and tests stay green.
- No other file references `CONTACT_EMAILS.press`.