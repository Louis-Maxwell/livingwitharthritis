# Goal

Make sure every email a patient or customer touches — confirmations they receive, and the replies/notifications staff receive — lands in the single shared inbox **info@livingwitharthritis.org.uk**.

Today the system sends from `noreply@livingwitharthritis.org.uk` with no Reply-To, so when a patient hits "Reply" on a confirmation email, the reply disappears into a noreply mailbox no one monitors. This plan fixes that.

---

## What changes for patients

1. Every transactional email (contact confirmations, appointment confirmations, fundraising acknowledgements, donation receipts, auth emails) will:
   - Still send **from** `Living With Arthritis <noreply@livingwitharthritis.org.uk>` (technically required for deliverability via the verified sender subdomain).
   - Add a **Reply-To: info@livingwitharthritis.org.uk** header so any reply lands directly in the info inbox.
2. Admin notifications (contact form, fundraising form, appointment bookings) continue to be addressed to `info@livingwitharthritis.org.uk` — this is already the case and will be verified.
3. The contact-confirmation email template already lists `info@livingwitharthritis.org.uk` as the contact address — no change needed there.

## What changes behind the scenes

1. **`send-transactional-email` edge function** — add a `REPLY_TO = "info@livingwitharthritis.org.uk"` constant and include it in the email payload sent to the queue.
2. **`auth-email-hook` edge function** — same treatment, so password-reset / magic-link replies also reach info@.
3. **`process-email-queue` edge function** — forward the `reply_to` field through to the Lovable Email API call.
4. **Audit existing admin recipients** — confirm `submit-contact`, `submit-fundraising`, and `book-appointment` all notify `info@livingwitharthritis.org.uk` (already true based on a code scan; will re-verify before shipping).
5. **Deploy** the three edge functions above.

## Email-domain cleanup (pending DNS)

There are currently two half-configured Lovable email subdomains in the project:

- `info.livingwitharthritis.org.uk` — pending DNS, not used.
- `notify.www.livingwitharthritis.org.uk` — pending DNS, not used (wrong subdomain — has a stray `www`).

The active, working sender subdomain is `notify.livingwitharthritis.org.uk`. The two pending ones are noise and should be removed from **Cloud → Emails → Manage Domains** so the dashboard isn't misleading. I'll flag this for you to remove via the dashboard after the code changes ship — Lovable can't delete domains for you.

> Note: `info@livingwitharthritis.org.uk` is your **inbox** (hosted by your mail provider — e.g. Google Workspace / Microsoft 365 / your registrar). It is not a Lovable sender domain and doesn't need DNS setup here. As long as that mailbox exists and can receive mail, the Reply-To routing will work.

---

## Technical details

Files touched:

```
supabase/functions/send-transactional-email/index.ts   (+ REPLY_TO, payload field)
supabase/functions/auth-email-hook/index.ts            (+ REPLY_TO, payload field)
supabase/functions/process-email-queue/index.ts        (forward reply_to to email API)
```

Verification after deploy:
- Submit the contact form with a test address → confirm the patient receives the email and that hitting Reply pre-fills `info@livingwitharthritis.org.uk`.
- Confirm `info@` receives the admin notification copy.
- Trigger a password reset → same Reply-To check.

No database migrations. No new templates. No changes to the verified sender domain (`notify.livingwitharthritis.org.uk` stays as-is).

---

## Out of scope

- Setting up `info.livingwitharthritis.org.uk` as a sender subdomain — not needed; Reply-To handles the inbox routing.
- Migrating away from `notify.livingwitharthritis.org.uk` — it's verified and working; changing it would require fresh DNS and risk downtime.
- Inbox-side rules inside the `info@` mailbox (filters, auto-responders) — manage those in your mail provider.
