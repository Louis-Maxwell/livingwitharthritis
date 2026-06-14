## Goal

Audit and harden the existing Supabase backend. **No new tables, no data model changes, no frontend changes.** Only RLS, GRANTs, function permissions, and a public-bucket fix.

## Current state (verified)

- **52 tables**, RLS enabled on all 52. ✅
- **Sensitive write/read policies look correct**: donations, contact_inquiries, newsletter_subscriptions, fundraising_inquiries, volunteer_signups, pain_journal_entries, triage_assessments, buddy_profiles, profiles, forum_topics, blog_articles, conditions all scope reads/writes properly via `is_admin()` or `auth.uid()`.
- **26 linter warnings** to resolve:
  - 1× extension installed in `public` schema
  - 1× `exercise-videos` public bucket allows arbitrary listing
  - 12× SECURITY DEFINER functions callable by `anon` that shouldn't be
  - 12× SECURITY DEFINER functions callable by `authenticated` that shouldn't be

## Plan (single migration, four areas)

### 1. Lock down SECURITY DEFINER function EXECUTE grants

Trigger functions and internal helpers must not be callable through the Data API.

- **Revoke `EXECUTE` from `anon` and `authenticated`** on internal-only functions:
  - `buddy_matches_guard_participant_updates`, `forum_replies_guard_updates`, `forum_topics_guard_admin_fields`, `handle_new_forum_reply` (trigger functions — never call directly)
  - `move_to_dlq`, `read_email_batch`, `delete_email`, `enqueue_email` (email queue internals — service-role / cron only)
- **Keep** EXECUTE for legitimate client-callable functions:
  - `has_role(uuid, app_role)` — used by RLS
  - `get_public_profile(uuid)` — public-by-design read
  - `increment_blog_view(text)` — anon-callable view counter
  - `increment_visitor_count()` — anon-callable counter

### 2. Fix `exercise-videos` public bucket listing

The bucket is public-read (correct for embedded videos) but currently allows any client to enumerate every file. Replace the broad `storage.objects` SELECT policy with one that allows public **GET-by-path** only (no `list`). Listing remains restricted to `service_role` / admins.

### 3. Audit + tighten remaining policy gaps

- **`newsletter_subscriptions`**: INSERT policy is wide-open for anon (needed for signup), but confirm no `WITH CHECK` allows `unsubscribed_at`/admin-only columns to be set on insert. Add a `WITH CHECK` clause that pins `status` to a default and forbids setting admin fields.
- **`donations` INSERT**: same — add `WITH CHECK` that forces `status='pending'`, blocks setting `user_id` to anyone other than `auth.uid()` (or NULL for anon), and blocks setting Stripe IDs from the client.
- **`contact_inquiries` / `fundraising_inquiries` / `volunteer_signups` INSERTs**: add `WITH CHECK` to forbid setting `status` or admin-only response fields from the client.
- **`forum_topics` INSERT**: scope `to authenticated` (currently `public`) and add `WITH CHECK (auth.uid() = user_id AND status IN ('draft','published'))`.
- **`profiles` INSERT/UPDATE**: scope both `to authenticated` and add `WITH CHECK (auth.uid() = user_id)`.

### 4. Extension-in-public warning

The `vector` extension is installed in `public`. Document as **accepted** (moving it requires recreating every embedding column and is high-risk). Mark the linter finding as ignored with an explanation; do not migrate.

## Out of scope

- No new tables, no column changes, no data backfill.
- No frontend wiring changes.
- No Stripe / Resend / edge function rewrites.
- No content seeding (blog_articles, conditions, etc. content is a separate task).
- No changes to `auth.*`, `storage.*` schemas beyond the one bucket policy.

## Deliverable

**One migration file** containing all REVOKE / GRANT / DROP POLICY / CREATE POLICY statements, plus one storage policy replacement. After it runs I'll re-run the linter and the security scan; target is 0 SECURITY DEFINER warnings, 0 public-bucket warning, extension warning explicitly ignored with rationale.

## Risks

- Revoking EXECUTE on `enqueue_email` could break email sending if any edge function calls it with the anon key instead of the service-role key. Mitigation: I'll grep edge functions before applying and confirm all callers use the service role.
- Tightening `WITH CHECK` on INSERT policies could reject existing client payloads that send extra fields. Mitigation: I'll read the current insert call sites for donations/contact/newsletter/fundraising/volunteer before writing the policy and only restrict columns the client never sends.

Approve and I'll prepare the migration + the call-site checks in one pass.