import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { getServiceClient, isSupabaseConfigError } from "../_shared/supabase-client.ts";

// Stripe webhooks come from Stripe's servers, not browsers — CORS isn't needed
// but we keep minimal headers for consistency
const corsHeaders = {
  "Access-Control-Allow-Origin": "https://livingwitharthritis.lovable.app",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, stripe-signature, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    if (!stripeKey || !webhookSecret) {
      console.error("Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET");
      return new Response(JSON.stringify({ error: "Server misconfigured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Verify Stripe webhook signature
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      console.error("No stripe-signature header");
      return new Response(JSON.stringify({ error: "Missing signature" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.text();
    let event: Stripe.Event;
    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown";
      console.error("Webhook signature verification failed:", msg);
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`[WEBHOOK] Received event: ${event.type} (${event.id})`);

    // Only handle checkout.session.completed
    if (event.type !== "checkout.session.completed") {
      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const session = event.data.object as Stripe.Checkout.Session;
    console.log(`[WEBHOOK] Processing session: ${session.id}`);

    // Extract metadata from the checkout session
    const metadata = session.metadata || {};
    const fundType = metadata.fundType || "general";
    const donorName = metadata.donorName || "Anonymous";
    const giftAid = metadata.giftAid === "yes";
    const recurring = metadata.recurring === "monthly";

    // Get amount (convert from smallest unit back to major unit)
    const amountTotal = session.amount_total ?? 0;
    const amount = amountTotal / 100;
    const currency = (session.currency || "gbp").toUpperCase();

    // Get customer details from session
    const customerEmail = session.customer_details?.email || session.customer_email || null;
    const customerName = session.customer_details?.name || donorName;
    const address = session.customer_details?.address;

    // Insert into Supabase using service role
    const supabase = getServiceClient("process-donation");

    // Idempotency: Stripe retries webhook delivery on timeout/non-2xx/slow
    // response, which is normal. Without this check a retry would insert a
    // second donation row and send a second confirmation email for the same
    // payment. Check for an existing record before inserting.
    const { data: existing, error: existingLookupError } = await supabase
      .from("donations")
      .select("id")
      .eq("stripe_session_id", session.id)
      .maybeSingle();

    if (existingLookupError) {
      console.error("[WEBHOOK] Failed to check for existing donation:", existingLookupError);
      return new Response(JSON.stringify({ error: "Lookup failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (existing) {
      console.log(`[WEBHOOK] Duplicate delivery for session ${session.id}, already recorded as ${existing.id}`);
      return new Response(JSON.stringify({ received: true, donationId: existing.id, duplicate: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: donationRecord, error: insertError } = await supabase
      .from("donations")
      .insert({
        amount,
        currency,
        fund_type: fundType,
        donor_name: customerName,
        donor_email: customerEmail,
        donor_country: address?.country || null,
        donor_city: address?.city || null,
        donor_postcode: address?.postal_code || null,
        donor_address_line1: address?.line1 || null,
        donor_address_line2: address?.line2 || null,
        gift_aid: giftAid,
        status: "completed",
        stripe_session_id: session.id,
        payment_intent_id: typeof session.payment_intent === "string"
          ? session.payment_intent
          : null,
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("[WEBHOOK] Failed to insert donation:", insertError);
      // Return 200 anyway so Stripe doesn't retry (we logged the error)
      return new Response(JSON.stringify({ received: true, error: "Insert failed" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`[WEBHOOK] Donation recorded: ${donationRecord.id} — £${amount} from ${customerName}`);

    // Send donation confirmation email if we have a donor email
    if (customerEmail) {
      try {
        const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
        const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
        const emailRes = await fetch(`${supabaseUrl}/functions/v1/send-transactional-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${supabaseServiceKey}`,
          },
          body: JSON.stringify({
            templateName: 'donation-confirmation',
            recipientEmail: customerEmail,
            idempotencyKey: `donation-confirm-${donationRecord.id}`,
            templateData: {
              donorName: customerName,
              amount: amount.toFixed(2),
              currency,
              fundType,
              giftAid,
            },
          }),
        });
        const emailBody = await emailRes.text();
        if (!emailRes.ok) {
          console.error("[WEBHOOK] Failed to send confirmation email:", emailRes.status, emailBody);
        } else {
          console.log(`[WEBHOOK] Confirmation email queued for ${customerEmail}`);
        }
      } catch (emailErr) {
        console.error("[WEBHOOK] Email invocation error:", emailErr);
      }
    }

    return new Response(
      JSON.stringify({ received: true, donationId: donationRecord.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[WEBHOOK] Unhandled error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
