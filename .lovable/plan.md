

# Add Donation Confirmation Email

## Overview

Send an automated "thank you" email to donors immediately after their payment is recorded by the Stripe webhook. This is a transactional (app) email — triggered by a specific donor action.

## Prerequisites

No email domain is configured yet. The first step is setting up a sender domain so emails come from your brand (e.g. `donations@notify.yourdomain.com`).

## Plan

### Step 1 — Set up email domain
You will be prompted to configure a sender domain. This tells email providers the emails are legitimately from you, improving deliverability.

### Step 2 — Set up email infrastructure
Create the backend queue, retry system, and supporting database tables that ensure emails are delivered reliably (with automatic retries if something goes wrong).

### Step 3 — Scaffold transactional email system
Create the core email-sending backend function, suppression handling (bounces/complaints), and unsubscribe support.

### Step 4 — Create donation confirmation template
A branded React Email template with:
- Donor's name and donation amount
- Fund type (General, Zakat, etc.)
- Gift Aid confirmation (if applicable, noting the 25% HMRC bonus)
- Charity registration number for trust
- Warm thank-you messaging matching the site's red/white brand

### Step 5 — Wire into the Stripe webhook
After the donation is successfully recorded in the database, the `process-donation` webhook will trigger the confirmation email using the donor's email, name, amount, fund type, and Gift Aid status from the Stripe session.

### Step 6 — Create unsubscribe page
A simple branded page at `/email-unsubscribe` for compliance — lets recipients opt out of future emails.

### Step 7 — Deploy all backend functions

## Technical Details

- **Template file**: `supabase/functions/_shared/transactional-email-templates/donation-confirmation.tsx`
- **Registry update**: Add `donation-confirmation` to the TEMPLATES map in `registry.ts`
- **Webhook update**: `supabase/functions/process-donation/index.ts` — add `supabase.functions.invoke('send-transactional-email', ...)` call after successful donation insert, using `idempotencyKey: donation-confirm-${donationRecord.id}`
- **Unsubscribe page**: New route component at `src/pages/EmailUnsubscribe.tsx`
- **Brand colors**: Primary red (`hsl(0, 85%, 50%)`), white background, dark foreground text

