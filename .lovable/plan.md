
The user wants step-by-step instructions for integrating Stripe payments for donations. Looking at the codebase, **Stripe is already integrated** — I can see:
- `src/hooks/useDonation.ts` calls `create-donation-checkout` edge function
- `supabase/functions/create-donation-checkout/index.ts` exists
- `supabase/functions/process-donation/index.ts` exists
- `STRIPE_WEBHOOK_SECRET` secret is already set
- `donations` table exists with proper RLS
- `StripeDonationModal.tsx` and `DonationSuccess.tsx` pages exist
- Memory: `mem://tech/integrations/stripe` confirms self-managed Stripe Checkout

So the user either (a) wants a refresher on how the existing flow works, or (b) wants to migrate to Lovable's built-in Stripe Payments (no API key needed), or (c) is asking generically.

Since they asked for **step-by-step integration instructions**, I'll present this as a guide covering the existing setup + how it works + what to verify, rather than rebuilding. I'll also flag the built-in option per platform guidance.

## Step-by-Step Stripe Donations Guide

### Current State
Your project **already has** a working Stripe donations integration:
- Donate page → `useDonation` hook → `create-donation-checkout` edge function → Stripe Checkout → `process-donation` webhook → `donations` table → success page.
- `STRIPE_WEBHOOK_SECRET` is already configured.

### Step 1 — Add your Stripe Secret Key (if not already set)
1. Go to [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
2. Copy your **Secret key** (starts with `sk_test_…` for test mode or `sk_live_…` for live)
3. Add it as a project secret named `STRIPE_SECRET_KEY` via Lovable Cloud settings

### Step 2 — Configure the Stripe Webhook
1. In Stripe Dashboard → **Developers → Webhooks → Add endpoint**
2. Endpoint URL: `https://nfijkdoifihbgomcnbnb.supabase.co/functions/v1/process-donation`
3. Select events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copy the **Signing secret** (`whsec_…`) → already saved as `STRIPE_WEBHOOK_SECRET` ✅

### Step 3 — How the donation flow works
```text
User clicks "Donate £25"
   ↓
useDonation.processDonation({ amount, currency, fundType })
   ↓
supabase.functions.invoke("create-donation-checkout")
   ↓
Edge function creates Stripe Checkout Session → returns URL
   ↓
Browser redirects to Stripe-hosted checkout page
   ↓
User pays → Stripe redirects to /donation-success
   ↓
Stripe webhook → process-donation function → updates donations table (status='completed')
```

### Step 4 — Test the flow
1. Use Stripe test card `4242 4242 4242 4242`, any future expiry, any CVC
2. Visit `/donate` or `/zakat-appeal`, click a donation amount
3. Complete checkout → confirm redirect to `/donation-success`
4. Check `donations` table — row should appear with `status = 'completed'`

### Step 5 — Go live
1. Toggle Stripe Dashboard from **Test mode → Live mode**
2. Get your live secret key (`sk_live_…`) and update `STRIPE_SECRET_KEY`
3. Recreate the webhook in live mode → update `STRIPE_WEBHOOK_SECRET`
4. Verify with a small £1 real donation

### Alternative: Lovable Built-in Stripe Payments
Lovable also offers a **zero-setup Stripe integration** (no API key needed, no Stripe account required to start). Trade-offs:
- ✅ Faster setup, no key management
- ❌ Would replace existing custom flow — donations table schema, Gift Aid fields, Zakat-specific fund types may need rework
- Recommendation: **Keep your current integration** — it's tailored to your charity needs (Gift Aid, fund types, donor address capture for HMRC).

### What I'd verify next
- That `STRIPE_SECRET_KEY` secret is set (only `STRIPE_WEBHOOK_SECRET` shows in available secrets — the secret key may be missing)
- Test a £1 donation end-to-end in test mode
