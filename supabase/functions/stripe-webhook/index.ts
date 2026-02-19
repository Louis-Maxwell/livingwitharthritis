import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

serve(async (req) => {
  // Stripe webhooks must NOT have CORS headers on non-OPTIONS requests
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200 });
  }

  const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

  if (!stripeKey) {
    console.error("STRIPE_SECRET_KEY not configured");
    return new Response("Configuration error", { status: 500 });
  }

  const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

  // Verify the webhook signature
  const signature = req.headers.get("stripe-signature");
  if (!signature || !webhookSecret) {
    console.error("Missing stripe-signature header or STRIPE_WEBHOOK_SECRET");
    return new Response("Unauthorized", { status: 401 });
  }

  let event: Stripe.Event;
  try {
    const body = await req.text();
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  // Only handle checkout.session.completed
  if (event.type !== "checkout.session.completed") {
    return new Response(JSON.stringify({ received: true }), { status: 200 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // Skip if not paid
  if (session.payment_status !== "paid") {
    return new Response(JSON.stringify({ received: true }), { status: 200 });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const metadata = session.metadata || {};

    // Check for duplicate (idempotency)
    const { data: existing } = await supabase
      .from("donations")
      .select("id")
      .eq("stripe_session_id", session.id)
      .maybeSingle();

    if (existing) {
      console.log("Duplicate webhook event — already recorded:", session.id);
      return new Response(JSON.stringify({ received: true, duplicate: true }), { status: 200 });
    }

    // Amount from session is in smallest currency unit (pence/cents)
    const amount = (session.amount_total ?? 0) / 100;
    const currency = (session.currency ?? "gbp").toUpperCase();

    const donationRecord = {
      amount,
      currency,
      fund_type: metadata.fundType || "general",
      donor_name: metadata.donorName || session.customer_details?.name || "Anonymous",
      donor_email: session.customer_details?.email || null,
      status: "completed",
      payment_intent_id: typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id || null,
      stripe_session_id: session.id,
      // Gift Aid fields from metadata
      gift_aid: metadata.giftAid === "true",
      donor_address_line1: metadata.addressLine1 || null,
      donor_address_line2: metadata.addressLine2 || null,
      donor_city: metadata.city || null,
      donor_postcode: metadata.postcode || null,
    };

    const { error } = await supabase.from("donations").insert(donationRecord);

    if (error) {
      console.error("Failed to insert donation:", error);
      return new Response("Database error", { status: 500 });
    }

    console.log("Donation recorded successfully:", session.id, amount, currency);
    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (err) {
    console.error("Error processing webhook:", err);
    return new Response("Internal error", { status: 500 });
  }
});
