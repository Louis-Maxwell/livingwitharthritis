## Email Integrity Improvement Plan

Investigation surfaced three concrete problems and a missing visibility layer. Here is the fix.

### 1. Critical: Sender domain mismatch (root cause of all failures)

The verified Lovable email subdomain is:
```
notify.www.livingwitharthritis.org.uk
```

But the code is configured for:
```
notify.livingwitharthritis.org.uk   ← does NOT exist / not verified
```

Every send for the last several weeks went to the dead-letter queue with `Emails disabled for this project`. Two files need updating:

- `supabase/functions/send-transactional-email/index.ts` — `SENDER_DOMAIN`
- `supabase/functions/auth-email-hook/index.ts` — `SENDER_DOMAIN`

`FROM_DOMAIN` (the visible From address, `noreply@livingwitharthritis.org.uk`) stays as-is — that is cosmetic only.

Then re-enable Lovable Emails for the project (the "Emails disabled" error indicates the project-level toggle is off) and redeploy both edge functions.

### 2. Template design refresh — Aevolve / "Living with Arthritis" branding

All 6 auth templates and 4 transactional templates currently use the scaffold defaults (black buttons, Arial). Refresh them to match the site:

- Crimson primary (`hsl(355 78% 42%)`) buttons with white text
- Playfair Display headings (web-safe fallback: Georgia, serif)
- Inter / system-ui body
- Logo / wordmark at top of each email
- White body background (required), generous padding, footer with charity registration line

Templates to restyle:
- Auth: `signup`, `magic-link`, `recovery`, `invite`, `email-change`, `reauthentication`
- Transactional: `contact-confirmation`, `contact-admin-notification`, `donation-confirmation`, `fundraising-admin-notification`

### 3. Reliability hardening

- Add a small DLQ requeue helper (manual SQL flow documented inline) — the 10 stuck DLQ messages from the misconfigured period can stay archived; new sends will flow correctly.
- Add input-validation logging to the two submit functions (`submit-contact`, `submit-fundraising`) so failures surface in the dashboard instead of silently dropping.
- Confirm the `process-email-queue` cron job still exists and is firing.

### 4. New: Admin email monitoring dashboard

Add `/admin/emails` (admin-role gated via existing `is_admin()` RPC) with:

- Time-range filter (24h / 7d / 30d / custom)
- Template filter (multi-select from distinct `template_name` values)
- Status filter (Sent / Failed / Suppressed / All) with colour-coded badges
- Summary stat cards: total unique emails, sent, failed, suppressed (deduped by `message_id`)
- Paginated log table: Template · Recipient · Status · Timestamp · Error (50/page, sorted desc)
- All queries use `DISTINCT ON (message_id) … ORDER BY message_id, created_at DESC` to dedupe pending→sent rows.

Link the dashboard from the existing admin nav.

### Technical Details

- No DB schema changes required — `email_send_log`, `suppressed_emails`, and `email_unsubscribe_tokens` already exist from earlier setup.
- No new edge functions; only edits to existing ones.
- Redeploy required for: `send-transactional-email`, `auth-email-hook`, plus all 10 template files (templates are bundled into the functions at deploy time).
- Dashboard fetches via the Supabase client with RLS — will add a select policy on `email_send_log` restricted to `is_admin()`.

### Out of Scope

- Switching providers (Resend/SendGrid) — Lovable Emails stays.
- Marketing / newsletter sends — not supported, would require a separate tool.
- Changing the `notify` subdomain — requires a fresh DNS setup; current verified one will be used.
